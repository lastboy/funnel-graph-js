import { select } from 'd3-selection';
import 'd3-transition';
import { timeout } from 'd3-timer';
import { easePolyInOut } from "d3-ease"

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

const getTooltipElement = () => {
    return select(`#d3-funnel-js-tooltip`);
}

/**
 * Create the main SVG element 
 */
const createRootSVG = ({ context }) => {

    const id = context.getId();
    const width = context.getWidth();
    const height = context.getHeight();
    const margin = context.getMargin();
    const containerSelector = context.getContainerSelector()

    const container = select(containerSelector);
    container.append('div')
        .attr('id', "d3-funnel-js-tooltip")
        .attr('class', 'd3-funnel-js-tooltip')

    const d3Svg = container
        .append('svg')
        .attr('class', 'd3-funnel-js')
        .attr('id', id)
        .attr('width', width)
        .attr('height', height)
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
const updateRootSVG = ({ id, width, height, rotateFrom, rotateTo }) => {

    const d3Svg = id ? getRootSvg(id) : undefined;

    if (d3Svg) {
        const root = d3Svg
            .transition()
            .delay(500)
            .duration(1000)

        if (!isNaN(width) && !isNaN(height)) {
            d3Svg.attr("width", width);
            d3Svg.attr("height", height);
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

const mouseInfoHandler = ({ context, handler, metadata, tooltip }) => function (event) {

    const width = context.getWidth(false);
    const height = context.getHeight(false);
    const isVertical = context.isVertical();
    const linePositions = context.getLinePositions();

    const clickPoint = { x: event.offsetX, y: event.offsetY };

    // Determine the area between the lines
    let areaIndex = linePositions.findIndex((pos, i) => {

        if (!isVertical) {
            return clickPoint.x > pos && clickPoint.x < (linePositions[i + 1] || width);
        } else {
            return clickPoint.y > pos && clickPoint.y < (linePositions[i + 1] || height);
        }
    });

    // values are -1, 0, ...
    areaIndex++

    const dataInfoItem = JSON.parse(this.getAttribute('data-info'));
    let dataInfoItemForArea = {};
    const dataInfoValues = dataInfoItem?.values || [];
    const dataInfoLabels = dataInfoItem?.labels || [];
    const dataInfoSubLabels = dataInfoItem?.subLabels || [];
    const index = metadata.hasOwnProperty("index") ? metadata.index : -1;

    dataInfoItemForArea = { 
        value: dataInfoValues?.[areaIndex],
        label: dataInfoLabels?.[areaIndex],
        subLabel:dataInfoSubLabels?.[index],
        sectionIndex: areaIndex
    }

    metadata = { 
        ...metadata,
        ...dataInfoItemForArea
    };

    if (!tooltip) {
        handler(event, metadata);
    }

    return metadata;
};

const addMouseEventIfNotExists = ({ context }) => (pathElement, handler, metadata) => {

    const clickEventExists = !!pathElement?.on('click');
    if (!clickEventExists) {
        pathElement?.on('click', mouseInfoHandler({ context, handler, metadata}));
    }

    if (!context.showDetails() || !context.showTooltip()) {
            pathElement?.on('mouseover', null);
            pathElement?.on('mousemove', null);
            pathElement?.on('mouseout', null);
        return;
    }

    const overEventExists = !!pathElement.on('mouseover');
    if (!overEventExists) {
        let tooltipTimeout;

        function updateTooltip(event) {
            const is2d = context.is2d();
            const mouseHandler = mouseInfoHandler({ context, handler, metadata, tooltip: true }).bind(this);
            const handlerMetadata = mouseHandler(event);
            if (handlerMetadata) {
                const tooltipElement = getTooltipElement();
                if (tooltipTimeout) tooltipTimeout.stop();
                tooltipTimeout = timeout(() => {
                    let label = handlerMetadata.label || "Value";
                    label = is2d ? handlerMetadata.subLabel || label : label
                    const tooltipText = `${label}: ${handlerMetadata.value}`;
                    tooltipElement
                        .style("left", (event.clientX + 10) + "px")
                        .style("top", (event.clientY + 10) + "px")
                        .text(tooltipText)
                        .style("opacity", "1")
                        .style("display", "flex");
                }, 500);
            }
        }

        pathElement.on('mouseover', updateTooltip);

        pathElement.on('mousemove', updateTooltip);

        pathElement.on('mouseout', () => {

            if (tooltipTimeout) tooltipTimeout.stop();
            const tooltipElement = getTooltipElement();
            tooltipElement
                .style("opacity", "0")
                .style("display", "none")
                .text("");
            
        });
    }
}

const removeClickEvent = (pathElement) => {
    pathElement.on('click', null);
}

/**
 * Apply the color / gradient to each path
 */
const onEachPathHandler = ({ context }) => function (d, i, nodes) {

    // id, is2d, width, height, isVertical, colors, gradientDirection, callbacks

    const id = context.getId();
    const is2d = context.is2d();
    const colors = context.getColors();
    const gradientDirection = context.getGradientDirection();
    const callbacks = context.getCallBacks();
    const d3Path = select(nodes[i]);
    const color = (is2d) ? colors[i] : colors;
    const fillMode = (typeof color === 'string' || color.length === 1) ? 'solid' : 'gradient';

    if (fillMode === 'solid') {
        d3Path
            .attr('fill', color)
            .attr('stroke', color);
    } else if (fillMode === 'gradient') {
        applyGradient(id, d3Path, color, i + 1, gradientDirection);
    }

    if (typeof callbacks?.click === 'function') {
        const addMouseHandler = addMouseEventIfNotExists({ context }) ;
        addMouseHandler(d3Path, callbacks.click, { index: i });
    }
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

    return `{ "values": ${JSON.stringify(infoItemValues)}, "labels": ${JSON.stringify(infoItemLabels)}, "subLabels": ${JSON.stringify(infoItemSubLabels)} }`;
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
        id,
        width: context.getWidth(),
        height: context.getHeight()
    })

    if (definitions && rootSvg) {

        const paths = rootSvg.selectAll('path')
            .data(definitions.paths);

        const pathHandler = onEachPathHandler({ context });
        const getDataInfoHandler = getDataInfo({ context });
        
        // paths creation
        const enterPaths = paths.enter()
            .append('path')
            .attr('d', d => d.path)
            .attr('data-info', getDataInfoHandler)
            .attr('opacity', 0)
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(1000)
            .attr('opacity', 1)
            .each(pathHandler)
            

        // Update existing paths
        paths.merge(enterPaths)
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(1000)
            .attr('d', d => d.path)
            .attr('data-info', getDataInfoHandler)
            .attr('opacity', 1)
            .each(pathHandler);

        // Exit and remove old paths
        paths.exit()
            .transition()
            .ease(easePolyInOut)
            .delay((d, i) => i * 100)
            .duration(1000)
            .attr('opacity', 0)
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

        if (!offset.value) {
            offset.value = +select(this).attr('y');
        }

        const newValue = bbox.height + offset.value + padding;

        select(this)
            .attr('y', newValue);

        offset.value += bbox.height + padding;

    };
};

// Function to update line positions
const updateLinePositions = ({ context }) => (info, vertical, margin, noMarginSpacing) => {
    context.setLinePositions(info.map((d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top)));
}

/**
 * Handle the SVG text display on the graph
 */
const drawInfo = ({
    context,
    info
}) => {

    const id = context.getId();
    const margin = context.getMargin();

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
        const calcTextPos = (i) => ((noMarginSpacing * i) + (!vertical ? margin.left : margin.top) + (noMarginSpacing / textGap))

        const updateLinePositionsHandler = updateLinePositions({ context });

        getInfoSvgGroup(id, margin).selectAll('g.label__group')
            .data(info)
            .join(
                enter => {

                    return enter.append("g")
                        .attr("class", "label__group")
                        .each(function (d, i) {
                            const x = !vertical ? calcTextPos(i) : margin.text;
                            const y = !vertical ? margin.text : calcTextPos(i);

                            const offsetValue = { value: 0 };
                            const textHandlerValue = onEachTextHandler({ offset: offsetValue });

                            const g = select(this);
                            g.append("text")
                                .attr("class", "label__value")
                                .attr('x', x)
                                .attr('y', y)
                                .text(d => d.value)
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
                        })


                },

                update => update.each(function (d, i) {

                    const x = !vertical ? calcTextPos(i) : margin.text;
                    const y = !vertical ? margin.text : calcTextPos(i);

                    const offsetValue = { value: 0 };
                    const textHandlerValue = onEachTextHandler({ offset: offsetValue });
                    select(this).select(".label__value")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.value)
                        .style('opacity', 0.5)
                        .transition()
                        .duration(400)
                        .ease(easePolyInOut)
                        .style('opacity', 1)

                        .each(textHandlerValue);

                    const textHandlerTitle = onEachTextHandler({ offset: offsetValue });
                    select(this).select(".label__title")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.label)
                        .each(textHandlerTitle);

                    const textHandlerPercentage = onEachTextHandler({ offset: offsetValue });
                    select(this).select(".label__percentage")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.percentage)
                        .each(textHandlerPercentage);

                }),
                exit => exit.remove()
            );

        // Update line positions initially
        updateLinePositionsHandler(info, vertical, margin, noMarginSpacing);

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
            .transition()
            .duration(500)
            .attr(`${!vertical ? 'x' : 'y'}1`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}1`, 0)
            .attr(`${!vertical ? 'x' : 'y'}2`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top))
            .attr(`${!vertical ? 'y' : 'x'}2`, !vertical ? height : width);

        // Exit selection
        lines.exit()
            .transition()
            .duration(500)
            .attr('stroke-opacity', 0)
            .remove();
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
    const numberOfColors = colors.length;
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

    const svg = getRootSvg(context.getId());

    if (svg) {
        // Stop any ongoing transitions
        svg.selectAll('*').interrupt();

        // Remove all SVG elements
        svg.selectAll('*').remove();
        svg.remove();
    }
}

export { createRootSVG, updateRootSVG, getRootSvg, getContainer, drawPaths, gradientMakeVertical, gradientMakeHorizontal, drawInfo, destroySVG };