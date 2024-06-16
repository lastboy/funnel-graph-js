import { select } from 'd3-selection';
import 'd3-transition';

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

/**
 * Create the main SVG element 
 */
const createRootSVG = ({ id, containerSelector, width, height, margin }) => {

    const d3Svg = select(containerSelector)

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

const onEachPathHandler = ({ id, is2d, colors, gradientDirection }) => (d, i, nodes) => {
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
};

const drawPaths = ({
    id,
    is2d,
    colors,
    gradientDirection,
    definitions
}) => {

    const rootSvg = getRootSvgGroup(id);
    if (definitions && rootSvg) {

        const paths = rootSvg.selectAll('path')
            .data(definitions.paths);

        const pathHandler = onEachPathHandler({ id, is2d, colors, gradientDirection });

        // paths creation
        const enterPaths = paths.enter()
            .append('path')
            .attr('d', d => d)
            .attr('opacity', 0)
            .each(pathHandler)
            .transition()
            .duration(500)
            .attr('opacity', 1);

        // Update existing paths
        paths.merge(enterPaths)
            .transition()
            .duration(500)
            .attr('d', d => d)
            .attr('opacity', 1)
            .each(pathHandler);

        // Exit and remove old paths
        paths.exit()
            .transition()
            .duration(500)
            .attr('opacity', 0)
            .remove();
    }
}

const onEachTextHandler = ({ offset }) => {

    return function (d, i) {

        const padding = 20;
        const bbox = this.getBBox();

    
        offset.value = +select(this).attr('y');
       
        const newValue =  bbox.height / 2 + offset.value + padding;

        select(this)
            .attr('y', newValue);

        offset.value += bbox.height + padding;

    };
};

const drawInfo = ({
    id,
    info,
    width,
    height,
    margin,
    vertical
}) => {

    if (info) {

        const textGap = (info.length + 1);
        const noMarginHeight = height - margin.top - margin.bottom;
        const noMarginWidth = width - margin.left - margin.right;
        const noMarginSpacing = (!vertical ? noMarginWidth : noMarginHeight) / (info.length);
        const calcTextPos = (i) => ((noMarginSpacing * i) + (!vertical ? margin.left : margin.top) + (noMarginSpacing / textGap))

        getInfoSvgGroup(id, margin).selectAll('g.label__group')
            .data(info)
            .join(
                enter => {

                    const offset = { value: 0 };
                    const textHandler = onEachTextHandler({ offset });
                    
                    const g = enter.append('g').attr('class', 'label__group');
                    const xHandler = (d, i) => !vertical ? calcTextPos(i) : 0;
                    const yHandler = (d, i) => !vertical ? 20 : calcTextPos(i);
                    // Append main value text
                    g.append("text")
                        .attr("class", "label__value")
                        .attr('x', xHandler)
                        .attr('y', yHandler)
                        .attr('fill', 'white')
                        .text(d => d.value)

                    g.append("text")
                        .attr("class", "label__title")
                        .attr('x', xHandler)
                        .attr('y', yHandler)
                        .attr('fill', 'white')
                        .text(d => d.label)
                        .each(textHandler);

                    // TODO: add sub label
                    // g.append("text")
                    //     .attr("class", "label__title")
                    //     .attr('x', xHandler)
                    //     .attr('y', yHandler)
                    //     .attr('fill', 'white')
                    //     .text(d => d.subLabel)

                },

                update => update.each(function (d, i) {

                    const offset = { value: 0 };
                    const textHandler = onEachTextHandler({ vertical, offset });

                    const x = !vertical ? calcTextPos(i) : 0;
                    const y = !vertical ? 20 : calcTextPos(i);

                    select(this).select(".label__value")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.value)

                    select(this).select(".label__title")
                        .attr('x', x)
                        .attr('y', y)
                        .text(d => d.label)
                        .each(textHandler);


                }),
                exit => exit.remove()
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
            .attr(`${!vertical ? 'y' : 'x'}2`, !vertical ? height : width)
            .attr('stroke', 'grey')
            .attr('stroke-width', 1);

        // Update selection
        lines.merge(enterLines)
            .transition()
            .duration(500)
            .attr(`${!vertical ? 'x' : 'y'}1`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top) )
            .attr(`${!vertical ? 'y' : 'x'}1`, 0)
            .attr(`${!vertical ? 'x' : 'y'}2`, (d, i) => noMarginSpacing * (i + 1) + (!vertical ? margin.left : margin.top) )
            .attr(`${!vertical ? 'y' : 'x'}2`, !vertical ? height : width)
            .attr('stroke', 'grey')
            .attr('stroke-width', 1);

        // Exit selection
        lines.exit()
            .transition()
            .duration(500)
            .attr('stroke-opacity', 0)
            .remove();
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
        d3Gradient.selectAll('stop').remove(); // Clear existing stops before adding new ones
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

const updateRootSVG = ({ id, width, height, rotateFrom, rotateTo }) => {

    const d3Svg = id ? getRootSvg(id) : undefined;

    if (d3Svg) {
        const root = d3Svg
            .transition()
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
}

export { createRootSVG, updateRootSVG, getRootSvg, getContainer, drawPaths, gradientMakeVertical, gradientMakeHorizontal, drawInfo };