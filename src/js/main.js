/* eslint-disable no-trailing-spaces */
/* global HTMLElement */
import { roundPoint, formatNumber } from './number';
import {
    generateLegendBackground, getDefaultColors, setAttrs, removeAttrs
} from './graph';

import { getCrossAxisPoints, getPathDefinitions } from './path'
import { createRootSVG, getRootSvg, rotateSVG, getRootSvgGroup, getContainer, applyGradient } from './d3'
import { select } from 'd3-selection';
import { interpolateString } from 'd3-interpolate';
import { nanoid } from 'nanoid';


class FunnelGraph {
    constructor(options) {
        this.id = nanoid();
        this.containerSelector = options.container;
        this.gradientDirection = (options.gradientDirection && options.gradientDirection === 'vertical')
            ? 'vertical'
            : 'horizontal';
        this.direction = (options.direction && options.direction === 'vertical') ? 'vertical' : 'horizontal';
        this.labels = FunnelGraph.getLabels(options);
        this.subLabels = FunnelGraph.getSubLabels(options);
        this.values = FunnelGraph.getValues(options);
        this.percentages = this.createPercentages();
        this.colors = options.data.colors || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2);
        this.displayPercent = options.displayPercent || false;
        this.data = options.data;
        this.height = options.height;
        this.width = options.width;
        this.subLabelValue = options.subLabelValue || 'percent';

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

    getDataSize() {
        return this.values.length;
    }

    getSubDataSize() {
        return this.values[0].length;
    }

    static getSubLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.subLabels === 'undefined') return [];

        return data.subLabels;
    }

    static getLabels(options) {
        if (!options.data) {
            throw new Error('Data is missing');
        }

        const { data } = options;

        if (typeof data.labels === 'undefined') return [];

        return data.labels;
    }

    setValues(v) {
        this.values = v;
        return this;
    }

    setDirection(d) {
        this.direction = d;
        return this;
    }

    setHeight(h) {
        this.height = h;
        return this;
    }

    setWidth(w) {
        this.width = w;
        return this;
    }

    getWidth() {
        return this.width || getContainer(this.containerSelector).clientWidth;
    }

    getHeight() {
        return this.height || getContainer(this.containerSelector).clientHeight;
    }
    
    static getValues(options) {
        if (!options.data) {
            return [];
        }

        const { data } = options;

        if (typeof data === 'object') {
            return data.values;
        }

        return [];
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

    drawPaths({
        crossAxisPoints
    }) {
        const definitions = getPathDefinitions({
            dataSize: this.getDataSize(),
            isVertical: this.isVertical(),
            height: this.getHeight(),
            width: this.getWidth(),
            crossAxisPoints
        });

        const rootSvg = getRootSvgGroup(this.id);
        if (definitions && rootSvg) {
          
            const paths = rootSvg.selectAll('path')
                .data(definitions.paths);

                // const valuesNum = axisPointsSize - 1;

                // for (let i = 0; i < valuesNum; i++) {
                //     const d3Path = d3SvgGroup.append('path');
            
                //     const color = (is2d) ? colors[i] : colors;
                //     const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';
            
                //     if (fillMode === 'solid') {
                //         d3Path
                //             .attr('fill', color)
                //             .attr('stroke', color);
            
                //     } else if (fillMode === 'gradient') {
                //         applyGradient(d3SvgGroup, d3Path, color, i + 1, gradientDirection);
                //     }
                // }

            const enterPaths = paths.enter()
                .append('path')
                .attr('d', d => d)  // Set initial path data
                .attr('opacity', 0)  // Start with opacity 0 for a fade-in effect
                .each((d, i, nodes) => {
                    const d3Path = select(nodes[i]);
                    const color = (this.is2d()) ? this.colors[i] : this.colors;
                    const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';
            
                    if (fillMode === 'solid') {
                        d3Path
                            .attr('fill', color)
                            .attr('stroke', color);
                    } else if (fillMode === 'gradient') {
                        applyGradient(this.id, d3Path, color, i + 1, this.gradientDirection);
                    }
                })
                .transition()
                .duration(500)
                .attr('opacity', 1);  // Fade in new paths

            // Update existing paths
            paths.merge(enterPaths)
                .transition()
                .duration(500)
                .attr('d', d => d)  // Update the 'd' attribute
                .attr('opacity', 1)  // Ensure paths are visible
                .each((d, i, nodes) => {
                    const d3Path = select(nodes[i]);
                    const color = (this.is2d()) ? this.colors[i] : this.colors;
                    const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';
            
                    if (fillMode === 'solid') {
                        d3Path
                            .attr('fill', color)
                            .attr('stroke', color);
                    } else if (fillMode === 'gradient') {
                        applyGradient(this.id, d3Path, color, i + 1, this.gradientDirection);
                    }
                });

            // Exit and remove old paths
            paths.exit()
                .transition()
                .duration(500)
                .attr('opacity', 0)  // Fade out before removing
                .remove();
        }

    }

    draw() {

        debugger;
        const crossAxisPoints = getCrossAxisPoints({ 
            values: this.values,
            dataSize: this.getDataSize(),
            subDataSize: this.getSubDataSize(),
            values2d: this.is2d() ? this.getValues2d() : undefined,
            percentages2d:  this.is2d() ? this.getPercentages2d() : undefined,
            isVertical: this.isVertical(),
            height: this.getHeight(),
            width: this.getWidth(),
            is2d: this.is2d()
        });

        createRootSVG({
            id: this.id,
            containerSelector: this.containerSelector,
            axisPointsSize: crossAxisPoints?.length || 0,
            is2d: this.is2d(),
            colors: this.colors,
            gradientDirection: this.gradientDirection,
            width: this.getWidth(),
            height: this.getHeight()
        });

        this.drawInfo();

        this.drawPaths({
            crossAxisPoints
        });
    }

    makeVertical() {
        if (this.direction === 'vertical') return true;

        this.direction = 'vertical';
        rotateSVG({
            d3Svg: getRootSvg(this.id),
            rotateFrom: 0,
            rotateTo: 90
        })

        return true;
    }

    makeHorizontal() {
        if (this.direction === 'horizontal') return true;

        this.direction = 'horizontal';

        rotateSVG({
            d3Svg: getRootSvg(this.id),
            rotateFrom: 90,
            rotateTo: 0
        })

        return true;
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

        const gradients = getRootSvg(this.id)?.select('defs')
            ?.selectAll('linearGradient');

        if (gradients) {
            gradients.attr('x1', '0')
                .attr('x2', '0')
                .attr('y1', '0')
                .attr('y2', '1');
        }

        return true;
    }

    gradientMakeHorizontal() {
        if (this.gradientDirection === 'horizontal') {
            return true;
        }
        this.gradientDirection = 'horizontal';

        const gradients = getRootSvg(this.id)?.select('defs')
            ?.selectAll('linearGradient');

        if (gradients) {
            gradients.attr('x1', null)
                .attr('x2', null)
                .attr('y1', null)
                .attr('y2', null);
        }

        return true;
    }

    gradientToggleDirection() {
        if (this.gradientDirection === 'horizontal') {
            this.gradientMakeVertical();
        } else {
            this.gradientMakeHorizontal();
        }
    }

    drawInfo() {
        const data = this.percentages;

        if (data) {

            const info = data.map((percentage, index) => {

                const infoItem = { label: undefined, subLabel: undefined, value: undefined, percentage: undefined };

                // update value 
                const valueNumber = this.is2d() ? this.getValues2d()[index] : this.values[index];
                infoItem.value = formatNumber(valueNumber);

                // update label
                infoItem.label = this.labels[index] || 'NA';

                // update percentage if set to true
                if (this.displayPercent) {
                    infoItem.percentage = `${percentage.toString()}%`
                }

                return infoItem;

            });

            const width = this.getWidth();
            const height = this.getHeight()

            // Calculate the spacing based on the number of labels
            const gap = 2;
            const spacing = width / (info.length + gap);

            getRootSvg(this.id).selectAll('text.label__title')
                .data(info)
                .join(
                    enter => enter.append('text')
                        .attr('class', 'label__title')
                        .attr('x', (d, i) => (spacing / gap) + (i * spacing))
                        .attr('y', 10)
                        .attr('text-anchor', 'middle')
                        .attr('dominant-baseline', 'middle')
                        .attr('fill', 'white')
                        .text(d => d.value),
                    update => update
                        .attr('x', (d, i) => (spacing / gap) + (i * spacing))
                        .text(d => d.value),
                    exit => exit.remove()
                );

            // Bind data to the 'line' elements
            const lines = getRootSvg(this.id).selectAll('.divider')
                .data(info);

            // Enter selection: Handle new data elements that do not yet have corresponding DOM elements
            const enterLines = lines.enter()
                .append('line')
                .attr('class', 'divider')
                .attr('x1', (d, i) => spacing * (i + 1))
                .attr('y1', 0)
                .attr('x2', (d, i) => spacing * (i + 1))
                .attr('y2', height) // Assuming y2 is constant at the height of the SVG
                .attr('stroke', 'grey')
                .attr('stroke-width', 1);

            // Update selection: Update attributes for existing elements
            lines.merge(enterLines)
                .transition() // Apply transitions to smoothly update line positions
                .duration(500)
                .attr('x1', (d, i) => spacing * (i + 1))
                .attr('y1', 0)
                .attr('x2', (d, i) => spacing * (i + 1))
                .attr('y2', height)
                .attr('stroke', 'grey')
                .attr('stroke-width', 1);

            // Exit selection: Handle lines that no longer have corresponding data
            lines.exit()
                .transition()
                .duration(500)
                .attr('stroke-opacity', 0) // Fade out before removing
                .remove();
        }
    }

    // @TODO: refactor data update
    updateData(d) {

        if (typeof d.values !== 'undefined') {
            // Update values using the predefined function that processes data appropriately
            this.values = FunnelGraph.getValues({ data: d });
        }

        if (typeof d.labels !== 'undefined') {
            // Update labels if specified in the new data
            this.labels = FunnelGraph.getLabels({ data: d });
        }

        if (typeof d.colors !== 'undefined') {
            // Update colors if specified, or use default colors as a fallback
            this.colors = d.colors || getDefaultColors(this.is2d() ? this.getSubDataSize() : 2);
        }

        // Calculate percentages for the graph based on the updated or existing values
        this.percentages = this.createPercentages();

        if (typeof d.subLabels !== 'undefined') {
            // Update subLabels if specified in the new data
            this.subLabels = FunnelGraph.getSubLabels({ data: d });
        }

        // Redraw the information on the graph to reflect any changes
        this.drawInfo();

        if (typeof d.values !== 'undefined') {
            // Update values using the predefined function that processes data appropriately
            this.values = FunnelGraph.getValues({ data: d });

            const crossAxisPoints = getCrossAxisPoints({ 
                values: this.values,
                dataSize: this.getDataSize(),
                subDataSize: this.getSubDataSize(),
                values2d: this.is2d() ? this.getValues2d() : undefined,
                percentages2d: this.is2d() ? this.getPercentages2d() : undefined,
                isVertical: this.isVertical(),
                height: this.getHeight(),
                width: this.getWidth(),
                is2d: this.is2d()
            });
    
            this.drawPaths({
                crossAxisPoints
            });  // Redraw the paths based on the new values
        }

    }

}

export default FunnelGraph;
