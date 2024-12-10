import { select } from 'd3-selection';
import 'd3-transition';
import { easePolyInOut } from "d3-ease"
import debounce from 'lodash.debounce';
import { addMouseEventIfNotExists, addLabelMouseEventIfNotExists, removeClickEvent } from "./d3-handlers";
import { formatNumber } from './number';

/**
 * Get the main root SVG element
 */
const getRootSvg = (id) => {
    return select(`#${id}`);
};

/**
 * Get the graph group [create if not exists]
 */
const getRootSvgGroup = (id, margin) => {
    const svg = getRootSvg(id);
    const groupId = `${id}_graph`;
    let group = svg.select(`#${groupId}`);

    if (group.empty()) {
        group = svg.append('g')
            .attr('id', groupId)
        if (margin) {
            group.attr('transform', `translate(${margin.left}, ${margin.top})`);
        }
    }

    return group;
};

/**
 * Get the info group [create if not exists]
 */
const getInfoSvgGroup = (id, margin) => {
    const svg = getRootSvg(id);
    const groupId = `${id}_info`;
    let group = svg.select(`#${groupId}`);

    if (group.empty()) {
        group = svg.append('g').attr('id', groupId);
        if (margin) {
            // TODO: evaluate - delete if not in use
            // group.attr('transform', `translate(${margin.left}, 0)`);
        }
    }

    return group;
};

/**
 * Get he main container div according to the selector
 */
const getContainer = (containerSelector) => {
    return select(containerSelector);
}

/**
 * Create the main SVG element 
 */
const createRootSVG = ({ context }) => {

    const id = context.getId();
    const responsive = context.getResponsive();
    const width = context.getWidth();
    const height = context.getHeight();
    const margin = context.getMargin();
    const containerSelector = context.getContainerSelector()

    const container = select(containerSelector);

    const bodySelection = select("body");
    const tooltipParentElement = bodySelection.empty() ? container : bodySelection;

    // add tooltip element
    tooltipParentElement.append('div')
        .attr('id', "d3-funnel-js-tooltip")
        .attr('class', 'd3-funnel-js-tooltip')

    const d3Svg = container
        .append('svg')
        .attr('class', 'd3-funnel-js')
        .attr('id', id)
        .attr('width', responsive?.width ? "100%" : width)
        .attr('height', responsive?.height ? "100%" : height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMin meet');

    getRootSvgGroup(id, margin);

    return d3Svg;
}


const updateSVGGroup = (id, margin) => {
    const group = getRootSvgGroup(id);
    group?.attr('transform', `translate(${margin.left}, ${margin.top})`);
};

/**
 * Update the root SVG [demnsions, transform] 
 */
const updateRootSVG = ({ context, rotateFrom, rotateTo }) => {

    const id = context.getId();
    const responsive = context.getResponsive();
    const width = context.getWidth();
    const height = context.getHeight();
    const d3Svg = id ? getRootSvg(id) : undefined;

    if (d3Svg) {
        const root = d3Svg
            // .transition()
            // .delay(500)
            // .duration(1000)

        if (!isNaN(width) && !isNaN(height)) {
            if (responsive?.width) {
                d3Svg.attr("width", "100%");
            } else {
                d3Svg.attr("width", width);
            }

            if (responsive?.height) {
                d3Svg.attr("height", "100%");
            } else {
                d3Svg.attr("height", height);
            }

            d3Svg.attr('viewBox', `0 0 ${width} ${height}`);
        }

        if (!isNaN(rotateTo) && !isNaN(rotateTo)) {

            const centerX = 0;
            const centerY = 0;

            root.attrTween('transform', () => {
                return t => `rotate(${(1 - t) * rotateFrom + t * rotateTo} ${centerX} ${centerY})`;
            })
                .on('end', () => { });

        }
    }
};

const gradientMakeVertical = ({
    id
}) => {

    const gradients = getRootSvg(id)?.select('defs')
        ?.selectAll('linearGradient');

    if (gradients) {
        gradients.attr('x1', '0')
            .attr('x2', '0')
            .attr('y1', '0')
            .attr('y2', '1');
    }
};

const gradientMakeHorizontal = ({
    id
}) => {

    const gradients = getRootSvg(id)?.select('defs')
        ?.selectAll('linearGradient');

    if (gradients) {
        gradients.attr('x1', null)
            .attr('x2', null)
            .attr('y1', null)
            .attr('y2', null);
    }

};

/**
 * Apply the color / gradient to each path
 */
const onEachPathHandler = ({ context }) => function (d, i, nodes) {

    const id = context.getId();
    const is2d = context.is2d();
    const colors = context.getColors();
    const gradientDirection = context.getGradientDirection();
    const d3Path = select(nodes[i]);

    const color = (is2d) ? colors[i] : colors;
    const fillMode = (typeof color === 'string' || color?.length === 1) ? 'solid' : 'gradient';

    if (fillMode === 'solid') {
        d3Path
            .attr('fill', color)
            .attr('stroke', color);
    } else if (fillMode === 'gradient') {
        applyGradient(id, d3Path, color, i + 1, gradientDirection);
    }
};

const onEachPathCallbacksHandler = ({ context }) => function (d, i, nodes) {

    const callbacks = context.getCallBacks();
    const d3Element = select(nodes[i]);

    const addMouseHandler = addMouseEventIfNotExists({ context, updateLinePositions });
    addMouseHandler(
        d3Element,
        (typeof callbacks?.click === 'function') ? callbacks.click : undefined,
        (typeof callbacks?.tooltip === 'function') ? callbacks.tooltip : undefined,
        { index: i }
    );
};

const onEachGroupLabelsCallbacksHandler = ({ context }) => function (d, i, nodes) {

    const callbacks = context.getCallBacks();
    const d3Element = select(nodes[i]);

    const addMouseHandler = addMouseEventIfNotExists({ context, updateLinePositions });
    addMouseHandler(
        d3Element,
        null,
        (typeof callbacks?.tooltipLabel === 'function') ? callbacks.tooltipLabel : undefined,
        { index: i }
    );
};

/**
 * Get the data nfo for each path
 */
const getDataInfo = ({ context }) => (d, i) => {

    const is2d = context.is2d();
    const data = {
        values: context.getValues(),
        labels: context.getLabels(),
        subLabels: context.getSubLabels()
    };
    const infoItemValues = is2d ? data.values.map(array => array[i]) || [] : data.values || [];
    const infoItemLabels = data.labels || [];
    const infoItemSubLabels = data?.subLabels || [];

    return `{ "mouseOnTooltip": true, "values": ${JSON.stringify(infoItemValues)}, "labels": ${JSON.stringify(infoItemLabels)}, "subLabels": ${JSON.stringify(infoItemSubLabels)} }`;
}

/**
 * Get the data nfo for each path
 */
const getGroupLabelDataInfo = ({ context }) => (d, i) => {

    const is2d = context.is2d();
    const data = {
        values: context.getValues(),
        labels: context.getLabels(),
        subLabels: context.getSubLabels()
    };

    const infoItemValues = data.values.map(item => is2d ? item.reduce((acc, current) => acc + current, 0) : item ) || [];
    const infoItemLabels = data.labels || [];

    const sectionDetailsAvailable = (data.subLabels?.length && is2d);
    const sectionsDetailsObject = sectionDetailsAvailable ? data.values.map(arr => arr.map( (nestedArr, index) => ( { value: nestedArr, name: data.subLabels?.[index] || "NA" } ))) : undefined;
    const sectionsDetails = sectionDetailsAvailable ? `, "sectionsDetails": ${JSON.stringify(sectionsDetailsObject)}` : ""; 

    return `{ "mouseOnTooltipLabel": true ,"values": ${JSON.stringify(infoItemValues)}, "labels": ${JSON.stringify(infoItemLabels)} ${sectionsDetails} }`;
}

/**
 * Draw the SVG paths
 */
const drawPaths = ({
    context,
    definitions
}) => {

    const id = context.getId();
    const rootSvg = getRootSvgGroup(id);
    updateRootSVG({
        context
    })

    if (definitions && rootSvg) {

        const paths = rootSvg.selectAll('path')
            .data(definitions.paths);

        const pathCallbackHandler = onEachPathCallbacksHandler({ context });
        const pathHandler = onEachPathHandler({ context });
        const getDataInfoHandler = getDataInfo({ context });

        // paths creation
        const enterPaths = paths.enter()
            .append('path')
            .style("pointer-events", "none")
            .attr('d', d => d.path)
            .attr('data-info', getDataInfoHandler)
            .attr('opacity', 0)
            .attr("stroke-width", '0')
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(550)
            .attr('opacity', 1)
            .each(pathHandler)
            .on("end", function (d, i, nodes) {
                const pathElement = select(this);
                pathElement.style("pointer-events", "all");
                pathCallbackHandler(d, i, nodes);
            });


        // Update existing paths
        paths.merge(enterPaths)
            .style("pointer-events", "none")
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(550)
            .attr('d', d => d.path)
            .attr('data-info', getDataInfoHandler)
            .attr("stroke-width", '0')
            .attr('opacity', 1)
            .each(pathHandler)
            .on("end", function (d, i, nodes) {
                const pathElement = select(this);
                pathElement.style("pointer-events", "all");
                pathCallbackHandler(d, i, nodes);
            });

        // Exit and remove old paths
        paths.exit()
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(550)
            .attr('opacity', 0)
            .attr("stroke-width", '0')
            .each(function () {
                const path = select(this);
                path.on('end', () => {
                    removeClickEvent(path);
                });
            })
            .remove();

        return paths;
    }
}

/**
 * SVG texts positioning according to the selected direction
 */
const onEachTextHandler = ({ offset }) => {

    return function (d, i) {

        const padding = 5;
        const bbox = this.getBBox();
        const element = select(this);

        if (!offset.value) {
            offset.value = +element.attr('y');
        }

        const newValue = bbox.height + offset.value + padding;

        element.attr('y', newValue);
        offset.value += bbox.height + padding;

    };
};

/**
 * Update Line positions
 */
const updateLinePositions = ({ context }) => {

    const { width, height, xFactor, yFactor } = context.getDimensions({ context, margin: false })

    const margin = context.getMargin();
    const info = context.getInfo();
    const vertical = context.isVertical();

    const noMarginHeight = height - (margin.top * yFactor) - (margin.bottom * yFactor);
    const noMarginWidth = width - (margin.left * xFactor) - (margin.right * xFactor);
    const noMarginSpacing = (!vertical ? noMarginWidth : noMarginHeight) / (info.length);

    context.setLinePositions(info.map((d, i) => noMarginSpacing * (i + 1) + (!vertical ? (margin.left * xFactor) : (margin.top * yFactor))));
}

/**
 * Handle the SVG text display on the graph
 */
const drawInfo = ({
    context
}) => {

    const id = context.getId();
    const margin = context.getMargin();
    const info = context.getInfo();

    updateSVGGroup(id, margin);

    if (!context.showDetails()) {
        getInfoSvgGroup(id, margin).selectAll('g.label__group').remove();
        getInfoSvgGroup(id, margin).selectAll('.divider').remove();
        return;
    }

    if (info) {
        const width = context.getWidth();
        const height = context.getHeight();
        const vertical = context.isVertical();
        const textGap = (info.length + 1);
        const noMarginHeight = height - margin.top - margin.bottom;
        const noMarginWidth = width - margin.left - margin.right;
        const noMarginSpacing = (!vertical ? noMarginWidth : noMarginHeight) / (info.length);
        const addGroupLabelHandler = addLabelMouseEventIfNotExists({ context });
        const calcTextPos = (i) => ((noMarginSpacing * i) + (!vertical ? margin.left + margin.text.left : margin.top + margin.text.left) + (noMarginSpacing / textGap))
        const format = context.getFormat();
        let labelFormatCallback = opt => formatNumber(opt?.value);
        if (typeof format?.value === "function") {
            labelFormatCallback = format.value;
        }

        const groupLabelsCallbackHandler = onEachGroupLabelsCallbacksHandler({ context });
        const getDataInfoHandler = getGroupLabelDataInfo({ context });

        getInfoSvgGroup(id, margin).selectAll('g.label__group')
            .data(info)
            .join(
                enter => {

                    return enter.append("g")
                        .attr("class", "label__group")
                        .attr('data-info', getDataInfoHandler)
                        .each(function (d, i) {
                            const x = !vertical ? calcTextPos(i) : margin.text.left;
                            const y = !vertical ? margin.text.top : calcTextPos(i);

                            const offsetValue = { value: 0 };
                            const textHandlerValue = onEachTextHandler({ offset: offsetValue });

                            const g = select(this);
                            g.append("text")
                                .attr("class", "label__value")
                                .attr('x', x)
                                .attr('y', y)
                                .text(d => labelFormatCallback({ ...d, index: i }))
                                .each(textHandlerValue);

                            const textHandlerTitle = onEachTextHandler({ offset: offsetValue });
                            g.append("text")
                                .attr("class", "label__title")
                                .attr('x', x)
                                .attr('y', y)
                                .text(d => d.label)
                                .each(textHandlerTitle);

                            const textHandlerPercentage = onEachTextHandler({ offset: offsetValue });
                            g.append("text")
                                .attr("class", "label__percentage")
                                .attr('x', x)
                                .attr('y', y)
                                .text(d => d.percentage)
                                .each(textHandlerPercentage);

                            removeClickEvent(g);
                            addGroupLabelHandler(g, i);

                        })
                        .transition() 
                        .duration(400) 
                        .on("end", function (d, i, nodes) {
                            const pathElement = select(this);
                            pathElement.style("pointer-events", "all");
                            groupLabelsCallbackHandler(d, i, nodes);
                        });
                },

                update => update
                .attr('data-info', getDataInfoHandler)
                .each(function (d, i) {

                    const x = !vertical ? calcTextPos(i) : margin.text.left;
                    const y = !vertical ? margin.text.top : calcTextPos(i);

                    const offsetValue = { value: 0 };
                    const textHandlerValue = onEachTextHandler({ offset: offsetValue });

                    const g = select(this);
                    g.select(".label__value")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => labelFormatCallback({ ...d, index: i }))
                        .style('opacity', 0.5)
                        .transition()
                        .duration(400)
                        .ease(easePolyInOut)
                        .style('opacity', 1)

                        .each(textHandlerValue);

                    const textHandlerTitle = onEachTextHandler({ offset: offsetValue });
                    g.select(".label__title")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.label)
                        .each(textHandlerTitle);

                    const textHandlerPercentage = onEachTextHandler({ offset: offsetValue });
                    g.select(".label__percentage")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.percentage)
                        .each(textHandlerPercentage);

                    removeClickEvent(g);
                    addGroupLabelHandler(g, i);
                })
                .transition() 
                .duration(400) 
                .on("end", function (d, i, nodes) {
                    const pathElement = select(this);
                    pathElement.style("pointer-events", "all");
                    groupLabelsCallbackHandler(d, i, nodes);
                })
                ,exit => exit
                    .each(function () {
                       const g = select(this);
                       removeClickEvent(g);
                    })
                    .remove()
            );

        // display graph dividers
        const infoCopy = info.slice(0, -1);
        const lines = getInfoSvgGroup(id, margin).selectAll('.divider')
            .data(infoCopy);

        // Enter selection
        const enterLines = lines.enter()
            .append('line')
            .attr('class', 'divider')
            .attr(`${!vertical ? 'x' : 'y'}1`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}1`, (d, i) => 0)
            .attr(`${!vertical ? 'x' : 'y'}2`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}2`, !vertical ? height : width);

        // Update selection
        lines.merge(enterLines)
            // .transition()
            // .duration(550)
            .attr(`${!vertical ? 'x' : 'y'}1`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}1`, 0)
            .attr(`${!vertical ? 'x' : 'y'}2`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}2`, !vertical ? height : width);

        // Exit selection
        lines.exit()
            // .transition()
            // .duration(550)
            .attr('stroke-opacity', 0)
            .remove();

        // Update line positions initially
        updateLinePositions({ context });

    } else {
        getInfoSvgGroup(id, margin).selectAll('g.label__group').remove();
        getInfoSvgGroup(id, margin).selectAll('.divider').remove();
    }
}

const applyGradient = (id, d3Path, colors, index, gradientDirection) => {

    const gradientId = `funnelGradient-${index}`;
    const d3Svg = getRootSvgGroup(id);
    let d3Defs = d3Svg.select('defs');

    if (d3Defs.empty()) {
        d3Defs = d3Svg.append('defs');
    }

    // Check if the gradient already exists, if not create a new one
    let d3Gradient = d3Defs.select(`#${gradientId}`);
    if (d3Gradient.empty()) {
        d3Gradient = d3Defs.append('linearGradient')
            .attr('id', gradientId);
    } else {
        // Clear existing stops before adding new ones
        d3Gradient.selectAll('stop').remove();
    }

    if (gradientDirection === 'vertical') {
        d3Gradient
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '0')
            .attr('y2', '1');
    } else {
        // Assuming horizontal gradient as a default or alternative
        d3Gradient
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '1')
            .attr('y2', '0');
    }

    // Set color stops
    const numberOfColors = colors?.length || 0;
    for (let i = 0; i < numberOfColors; i++) {
        d3Gradient.append('stop')
            .attr('offset', `${Math.round(100 * i / (numberOfColors - 1))}%`)
            .attr('stop-color', colors[i]);
    }

    // Apply the gradient to the path
    d3Path
        .attr('fill', `url("#${gradientId}")`)
        .attr('stroke', `url("#${gradientId}")`);

}

const destroySVG = ({ context }) => () => {

    const id = context.getId();
    const svg = getRootSvg(id);

    if (svg) {

        context.clearDebounce();

        select(window).on(`resize.${id}`, null);

        // destroy tooltip
        const tooltipElement = select("#d3-funnel-js-tooltip");
        if (tooltipElement) {
            tooltipElement.remove();
        }

        // destroy all in specific path listeners
        const paths = svg.selectAll('path');
        if (paths) {
            paths.on('.all', null);
        }

        // Stop any ongoing transitions
        svg.selectAll('*').interrupt();

        // remove all other listeners
        svg.selectAll('*').on('.all', null);

        // Remove all SVG elements
        svg.selectAll('*').remove();

        // remove the svg itself
        svg.remove();
    }
}

const updateEvents = ({ context, events }) => {
    // register resize handlers
    const id = context.getId();
    if (!id) {
        return;
    }

    const resizeEventExists = !!select(window)?.on(`resize.${id}`);
    const resize = context.getResize();

    if (resize && !resizeEventExists) {
        const wait = resize?.wait || 0;
        const onResize = events?.['onResize'];
        const debouncedResizeHandler = debounce(onResize, wait);
        context.setDebouncedResizeHandler(debouncedResizeHandler);

        debouncedResizeHandler();
        select(window).on(`resize.${id}`, debouncedResizeHandler);
    }

    if (!resize && resizeEventExists) {
        select(window).on(`resize.${id}`, null);   
    }
};

export { createRootSVG, updateRootSVG, getRootSvg, getContainer, drawPaths, gradientMakeVertical, gradientMakeHorizontal, drawInfo, destroySVG, updateEvents };