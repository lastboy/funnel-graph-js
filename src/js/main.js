/* eslint-disable no-trailing-spaces */
/* global HTMLElement */
import { roundPoint } from './number';
import { getDefaultColors } from './colors';
import { getCrossAxisPoints, getPathDefinitions } from './path'
import { createRootSVG, updateRootSVG, getContainer, drawPaths, gradientMakeVertical, gradientMakeHorizontal, drawInfo, destroySVG, getRootSvg, updateEvents } from './d3'
import { nanoid } from 'nanoid';
import { normalizeArray } from "./utils"
import { getLogger } from './logger';

const logger = getLogger({ module: "Main" });

/**
 * Funnel graph class
 * 
 * @param options {
 * 
 *      container: '.selector'
 *      width: ...
 *      height: ...
 *      labels: ['Impressions', ...],
 *      subLabels: ['Direct', ...],
 *      colors: [
 *          ['#000', ...
 *      ],
 *      values: [
 *          [3500, ...
 *      ],
 *      displayPercent: false,
 *      margin: { ?top, ?right, ?bottom, ?left, text },
 *      gradientDirection: 'vertical',
 * 
 *      -- callbacks definitions 
 *      callbacks: {
 *          -- funnel area handler
 *          'click': ({ index, value, label, subLabel, sectionIndex }) => {},
 *          -- override for the OOTB tooltip (funnel areas)
 *          'tooltip': (event, { label, value }) => {},
 *          -- top label handler
 *          label: (event, { index, value, label, subLabel, sectionIndex }) => {}
 *      },
 * 
 *      format: {
 *          -- format the label values
            value: ({ value }) => {}`
 *          -- format the tooltip values
            tooltip: `(opts) => {}`
 *      }
 * 
 *      -- display the OOTB tooltip - on / off
 *      tooltip: true,
 * 
 *      -- remove the text - only graph will be display
 *      details: false,
 * 
 *      -- resize the SVG using handler 
 *      resize: {
 *          factor: {
 *              width: 0.1
 *              height: 0.5,
 *              debounce: 0
 *          }
 *      },
 * 
 *      -- responsive SVG using 100% for the width / height
 *      responsive: false,
 *      responsiveWidth: false,
 *      responsiveHeight: false,
 * 
 * }
 *  TODO: outlines: for two dimensions graph display
 */
class FunnelGraph {
    constructor(options) {

        this.id = this.generateId(),
            this.containerSelector = options.container;
        this.gradientDirection = (options.gradientDirection && options.gradientDirection === 'vertical')
            ? 'vertical'
            : 'horizontal';

        this.setDetails(options.hasOwnProperty('details') ? options.details : true);
        this.setTooltip(options.hasOwnProperty('tooltip') ? options.tooltip : true);
        this.getDirection(options?.direction);
        this.setValues(options?.data?.values || []);
        this.setLabels(options?.data?.labels || []);
        this.setSubLabels(options?.data?.subLabels || []);

        this.setResize(options?.resize);
        this.setResponsive(options?.responsive, options?.responsiveWidth, options?.responsiveHeight);

        this.percentages = this.createPercentages();
        this.colors = options?.data?.colors || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2);
        this.displayPercent = options.displayPercent || false;

        this.margin = { top: 120, right: 60, bottom: 60, left: 60, text: { left: 0, top: 10 } };
        this.setMargin(options?.margin);

        let height = options.height || getContainer(this.containerSelector).node().clientHeight;
        let width = options.width || getContainer(this.containerSelector).node().clientWidth;

        this.callbacks = options?.callbacks;
        this.format = options?.format;

        this.height = height;
        this.width = width;

        this.origHeight = height;
        this.origWidth = width;

        this.subLabelValue = options.subLabelValue || 'percent';

        if (this.isVertical()) {
            this.makeVertical(true);
        } else {
            this.makeHorizontal(true)
        }

        /**
         * Helper for the dividers location 
         * Main use for the tooltip sections over the paths 
         */
        this.linePositions = [];

        logger.info("Initialized");
    }

    destroy() {
        const destroy = destroySVG({ context: this.getContext() });
        if (destroy) {
            destroy();
        }
    }

    getId() {
        return this.id;
    }

    showTooltip() {
        return this.tooltip;
    }

    showDetails() {
        return this.details;
    }

    getContainerSelector() {
        return this.containerSelector;
    }

    generateId() {
        return `id_${nanoid()}`;
    }

    getColors() {
        return this.colors;
    }

    getGradientDirection() {
        return this.gradientDirection;
    }

    getDirection(direction) {
        if (!direction || (direction && direction !== 'horizontal' && direction !== 'vertical')) {
            return 'horizontal';
        }

        return direction;
    }

    getGraphType() {
        return this.values && this.values[0] instanceof Array ? '2d' : 'normal';
    }

    is2d() {
        return this.getGraphType() === '2d';
    }

    isVertical() {
        return this.direction === 'vertical';
    }

    /**
        * Get the graph width
        * 
        * @param {*} margin included if true or else return the original width
        * @returns 
        */
    getWidth(margin = true) {
        const width = margin ? (this.margin.left + this.margin.right) : 0;
        return this.width + width;
    }

    /**
     * Get the graph height
     * 
     * @param {*} margin included if true or else return the original width
     * @returns 
     */
    getHeight(margin = true) {
        const height = margin ? (this.margin.top + this.margin.bottom) : 0;
        return this.height + height;
    }

    getDimensions({ context, margin = true }) {
        const id = context.getId();
        const d3Svg = getRootSvg(id);

        if (!d3Svg?.node()) {
            return {
                width: context.getWidth(margin),
                height: context.getHeight(margin)
            }
        }

        const boundingRect = d3Svg.node().getBoundingClientRect();

        // Calculate the scale factors
        const xFactor = boundingRect.width / context.getWidth(true);
        const yFactor = boundingRect.height / context.getHeight(true);

        let width = boundingRect.width;
        let height = boundingRect.height;

        const marginObj = context.getMargin();
        width += margin ? ((marginObj.left) + (marginObj.right)) : 0;
        height += margin ? ((marginObj.tooltip) + (marginObj.bottom)) : 0;

        return { width, height, xFactor, yFactor, left: boundingRect.left, top: boundingRect.top, x: boundingRect.x, y: boundingRect.y };
    }

    /**
     * Get the margin object { top: , right: , bottom: , left:  }
     */
    getMargin() {
        this.margin.text = this.margin.text || { left: 0, top: 0 };
        if (!isNaN(this.margin.text)) {
            this.margin.text = { top: this.margin.text, left: 0 }
        }

        return this.margin;
    }

    getDataSize() {
        return this.values.length;
    }

    getSubDataSize() {
        return this.values?.[0]?.length || 0;
    }

    getValues() {
        return this.values;
    }

    getLabels() {
        return this.labels;
    }

    getSubLabels() {
        return this.subLabels;
    }

    getCallBacks() {
        return this.callbacks;
    }

    getFormat() {
        return this.format;
    }

    setLinePositions(position) {
        this.linePositions = position || [];
    }

    getLinePositions() {
        return this.linePositions;
    }

    getResponsive() {
        return this.responsive;
    }

    getValues2d() {
        const values = [];

        (this.values || []).forEach((valueSet) => {
            values.push(valueSet.reduce((sum, value) => sum + value, 0));
        });

        return values;
    }

    getPercentages2d() {
        const percentages = [];

        this.values.forEach((valueSet) => {
            const total = valueSet.reduce((sum, value) => sum + value, 0);
            percentages.push(valueSet.map(value => (total === 0 ? 0 : roundPoint(value * 100 / total))));
        });

        return percentages;
    }

    getResize() {
        if (this.resize && (typeof this.resize?.factor !== "object")) {
            logger.warn("Resize is disabled, no valid configuration was found. see the docs for more information");
            this.resize = undefined;
        }
        return this.resize;
    }

    setResize(resize) {
        const resizeDefaultFactors = { factor: { width: 0.4, height: 0.4 } };
        if (resize && typeof resize === "boolean") {
            resize = resizeDefaultFactors;
        } 
        this.resize = resize;
    }

    setDirection(d) {
        this.direction = d;
    }

    setHeight(h) {
        this.height = h;
    }

    setWidth(w) {
        this.width = w;
    }

    setTooltip(bool) {
        this.tooltip = bool;
    }

    setDetails(bool) {
        this.details = bool;
    }

    setMargin(margin) {
        if (margin && typeof margin === 'object') {
            this.margin = { ...this.margin, ...margin };
        }
    }

    setResponsive(isResponsive, isResponsiveWidth, isResponsiveHeight) {
        const responsive = {};
        if (isResponsive) {
            responsive.width = true;
            responsive.height = true;
        }

        if (isResponsiveWidth) {
            responsive.width = true;
        }

        if (isResponsiveHeight) {
            responsive.height = true;
        }

        this.responsive = responsive;
    }

    setResponsiveWidth(isResponsive) {
        this.setResponsive(undefined, isResponsive);
    }

    setResponsiveHeight(isResponsive) {
        this.setResponsive(undefined, undefined, isResponsive);
    }

    setSubLabels(subLabels) {
        subLabels = normalizeArray(subLabels)
        this.subLabels = subLabels;
    }

    setLabels(labels) {
        labels = normalizeArray(labels)
        this.labels = labels;
    }

    setValues(values) {
        values = normalizeArray(values)
        this.values = values;
    }

    createPercentages() {
        let values = [];

        if (this.is2d()) {
            values = this.getValues2d();
        } else {
            values = [...this.values];
        }

        const max = Math.max(...values);
        return values.map(value => (value === 0 ? 0 : roundPoint(value * 100 / max)));
    }

    makeVertical(force = false) {
        if (!force && this.direction === 'vertical') return true;

        this.setDirection('vertical');
        this.setWidth(this.origHeight);
        this.setHeight(this.origWidth);

        updateRootSVG({
            context: this.getContext()
        })

        this.updateData();
    }

    makeHorizontal(force = false) {
        if (!force && this.direction === 'horizontal') return true;

        this.setDirection('horizontal');
        this.setWidth(this.origWidth);
        this.setHeight(this.origHeight);

        updateRootSVG({
            context: this.getContext()
        })

        this.updateData();
    }

    toggleDirection() {
        if (this.direction === 'horizontal') {
            this.makeVertical();
        } else {
            this.makeHorizontal();
        }
    }

    gradientMakeVertical() {
        if (this.gradientDirection === 'vertical') {
            return true;
        }
        this.gradientDirection = 'vertical';

        gradientMakeVertical({ id: this.id });

        return true;
    }

    gradientMakeHorizontal() {
        if (this.gradientDirection === 'horizontal') {
            return true;
        }
        this.gradientDirection = 'horizontal';

        gradientMakeHorizontal({ id: this.id });

        return true;
    }


    gradientToggleDirection() {
        if (this.gradientDirection === 'horizontal') {
            this.gradientMakeVertical();
        } else {
            this.gradientMakeHorizontal();
        }
    }

    /**
     * Get class context 
     */
    getContext() {
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(prop => typeof this[prop] === 'function' && prop !== 'constructor');

        const boundMethods = {};
        for (const method of methods) {
            boundMethods[method] = this[method].bind(this);
        }

        return boundMethods;
    }

    /**
     * Get the graph information 
     * 
     * @returns the information fot the graph object
     *  {label: , subLabel: , value: , percentage: } 
     */
    getInfo() {
        const data = this.percentages;
        return data.map((percentage, index) => {

            const infoItem = { label: undefined, subLabel: undefined, value: undefined, percentage: undefined };

            // update value 
            const valueNumber = this.is2d() ? this.getValues2d()[index] : this.values[index];
            infoItem.value = valueNumber;

            // update label
            infoItem.label = this.labels?.[index] || 'NA';

            // update percentage if set to true
            if (this.displayPercent) {
                infoItem.percentage = `${percentage.toString()}%`
            }

            return infoItem;

        });
    }

    /**
     * Calculate the paths and draw the svg elements
     * Get the info and draw the vertical svg lines with the relevant text
     */
    drawGraph() {

        const crossAxisPoints = getCrossAxisPoints({
            context: this.getContext()
        });

        const definitions = getPathDefinitions({
            context: this.getContext(),
            crossAxisPoints
        });

        drawPaths({
            context: this.getContext(),
            definitions,

        });

        drawInfo({
            context: this.getContext()
        });

        updateEvents({
            context: this.getContext(),
            events: { onResize: this.onResize.bind(this) }
        })
    }


    onResize() {
        const context = this;
        const container = getContainer(context.containerSelector);
        const resizeFactors = context.getResize()?.factor;
    
        if (container) {
    
            const containerNode = container.node();
    
            const width = context.getWidth()
            const height = context.getHeight()
            
            const adjustmentWidthFactor = resizeFactors.width || 0.1;
            const adjustmentHeightFactor = resizeFactors?.height || 0.5;
            let newWidth = +containerNode.clientWidth - (width * adjustmentWidthFactor);
            let newHeight = +containerNode.clientHeight - (height * adjustmentHeightFactor);

            const aspectRatio = 1 / 1
            
            newWidth = newWidth * aspectRatio;
            newHeight = newHeight * aspectRatio;

            context.setWidth(newWidth);
            context.setHeight(newHeight);

            context.drawGraph();
        }
    }
    /**
     * Create the main SVG and draw the graph
     */
    draw() {
        createRootSVG({
            context: this.getContext()
        });

        this.drawGraph();
    }

    /**
     * Redraw the graph and info according to the incoming data changes
     * 
     * @param {*} d {
     *      width: ...
     *      height: ...
     *      margin: ...
     *      values: ...
     *      labels: ...
     *      subLabels: ...
     *      colors: ...
     *      details: ...
     *      tooltip: ...
     * }
     */
    updateData(d) {

        if (d) {

            const validate = (arg) => typeof arg !== 'undefined'

            const mapMethods = [
                { key: "resize", fn: (arg) => this.setResize(arg) },
                { key: "responsive", fn: (arg) => this.setResponsive(arg) },
                { key: "responsiveWidth", fn: (arg) => this.setResponsiveWidth(arg) },
                { key: "responsiveHeight", fn: (arg) => this.setResponsiveHeight(arg) },
                { key: "width", fn: (arg) => this.setWidth(arg) },
                { key: "height", fn: (arg) => this.setHeight(arg) },
                { key: "margin", fn: (arg) => this.setMargin(arg) },
                { key: "details", fn: (arg) => this.setDetails(arg) },
                { key: "tooltip", fn: (arg) => this.setTooltip(arg) },
                { key: "values", fn: (arg) => this.setValues(arg) },
                { key: "labels", fn: (arg) => this.setLabels(arg) },
                { key: "subLabels", fn: (arg) => this.setSubLabels(arg) },
                { key: "colors", fn: (arg) => this.colors = arg || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2) },
            ]

            for (const method of mapMethods) {
                const key = method.key;
                const arg = d[key];
                if (validate(arg)) {
                    method.fn(arg);
                }
            }

            // Calculate percentages for the graph based on the updated or existing values
            this.percentages = this.createPercentages();
        }

        this.drawGraph();
    }
}

export default FunnelGraph;
