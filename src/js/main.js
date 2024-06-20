/* eslint-disable no-trailing-spaces */
/* global HTMLElement */
import { roundPoint, formatNumber } from './number';
import { getDefaultColors } from './colors';
import { getCrossAxisPoints, getPathDefinitions } from './path'
import { createRootSVG, updateRootSVG, getContainer, drawPaths, gradientMakeVertical, gradientMakeHorizontal, drawInfo, destroySVG } from './d3'
import { nanoid } from 'nanoid';

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
 *      callbacks: {
 *          'tooltip': () => {},
 *          'click': () => {}
 *      }
 *      details: false
 *      tooltip: true
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
        this.setLabels(options);
        this.setSubLabels(options);
        this.setValues(options);
        this.percentages = this.createPercentages();
        this.colors = options.data.colors || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2);
        this.displayPercent = options.displayPercent || false;

        this.margin = { top: 100, right: 80, bottom: 80, left: 80, text: 20 };
        this.setMargin(options?.margin);

        let height = options.height || getContainer(this.containerSelector).clientHeight;
        let width = options.width || getContainer(this.containerSelector).clientWidth;

        this.callbacks = options?.callbacks;

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

    getContainerSelector(){
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

    /**
     * Get the margin object { top: , right: , bottom: , left:  }
     */
    getMargin() {
        return this.margin;
    }

    setMargin(margin) {
        if (margin && typeof margin === 'object') {
            this.margin = { ...this.margin, ...margin };
        }
    }

    getDataSize() {
        return this.values.length;
    }

    getSubDataSize() {
        return this.values[0].length;
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

    setLinePositions(position) {
        this.linePositions = position || [];
    }

    getLinePositions() {
        return this.linePositions;
    }

    getValues2d() {
        const values = [];

        this.values.forEach((valueSet) => {
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

    setSubLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.subLabels === 'undefined') return [];

        this.subLabels = data.subLabels;
    }

    setLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.labels === 'undefined') return [];

        this.labels = data.labels;
    }

    setValues(options) {
        let values = [];

        const { data } = options;

        if (typeof data === 'object') {
            values = data.values;
        }

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
            id: this.id,
            width: this.getWidth(),
            height: this.getHeight(),
        })

        this.updateData();
    }

    makeHorizontal(force = false) {
        if (!force && this.direction === 'horizontal') return true;

        this.setDirection('horizontal');
        this.setWidth(this.origWidth);
        this.setHeight(this.origHeight);

        updateRootSVG({
            id: this.id,
            width: this.getWidth(),
            height: this.getHeight()
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
            infoItem.value = formatNumber(valueNumber);

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

        const info = this.getInfo();

        drawInfo({
            context: this.getContext(),
            info
        });
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
            if (typeof d.width !== 'undefined') {
                this.setWidth(d.width);
            }   

            if (typeof d.height !== 'undefined') {
                this.setHeight(d.height);
            }  

            if (typeof d.margin !== 'undefined') {
                this.setMargin(d.margin);
            }   

            if (typeof d.details !== 'undefined') {
                this.setDetails(d.details);
            }   

            if (typeof d.tooltip !== 'undefined') {
                this.setTooltip(d.tooltip);
            }   

            if (typeof d.values !== 'undefined') {
                // Update values
                this.setValues({ data: d });
            }

            if (typeof d.labels !== 'undefined') {
                // Update labels if specified in the new data
                this.setLabels({ data: d });
            }

            if (typeof d.colors !== 'undefined') {
                // Update colors if specified, or use default colors as a fallback
                this.colors = d.colors || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2);
            }

            // Calculate percentages for the graph based on the updated or existing values
            this.percentages = this.createPercentages();

            if (typeof d.subLabels !== 'undefined') {
                // Update subLabels if specified in the new data
                this.setSubLabels({ data: d });
            }
        }

        this.drawGraph();
    }
}

export default FunnelGraph;
