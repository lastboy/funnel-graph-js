import { select } from 'd3-selection';
import 'd3-transition';

import generateRandomIdString from './random';

const getRootSvg = (id) => {
    return select(`#${id}`);
};

const getRootSvgGroup = (id) => {
    return getRootSvg(id)?.select('g');
};

const getContainer = (containerSelector) => {
    return select(containerSelector);
}

const createRootSVG = ({ id, containerSelector, axisPointsSize = 0, is2d, colors, gradientDirection, width, height }) => {

    const margin = { top: 40, right: 20, bottom: 30, left: 40 };

    const d3Svg = select(containerSelector)

        .append('svg')
        .attr('class', 'd3-funnel-js')
        .attr('id', id)
        .style('width', '100%')
        .style('height', '100%')
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMidYMin slice');

    d3Svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    return d3Svg;
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

const rotateSVG = ({ d3Svg, rotateTo = 0, rotateFrom = 0 }) => {

    const centerX = 0;
    const centerY = 0;

    function animateRotation() {

        d3Svg
            .transition()
            .duration(1000)
            .attrTween('transform', function () {
                return t => `rotate(${(1 - t) * rotateFrom + t * rotateTo} ${centerX} ${centerY})`;
            })
            .on('end', () => {

            });
    }

    animateRotation();

}

export { createRootSVG, rotateSVG, getRootSvg, getRootSvgGroup, getContainer, applyGradient };