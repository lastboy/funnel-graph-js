import { timeout } from 'd3-timer';
import { select, pointer } from 'd3-selection';
import { formatNumber } from './number';

/**
 * Add tooltip and path click handlers according to the configuration 
 */
export const addMouseEventIfNotExists = ({ context, updateLinePositions }) => (pathElement, clickHandler, tooltipHandler, metadata) => {

    const clickEventExists = !!pathElement?.on('click');
    if (!clickEventExists && clickHandler) {
        pathElement?.on('click', mouseInfoHandler({ context, clickHandler, metadata, updateLinePositions }));
    }

    if (!context.showDetails()) {
        pathElement?.on('mouseover', null);
        pathElement?.on('mousemove', null);
        pathElement?.on('mouseout', null);
        return;
    }

    const overEventExists = !!pathElement.on('mouseover');
    if (!overEventExists) {
        let tooltipTimeout;

        function updateTooltip(e) {
            const is2d = context.is2d();
            const mouseHandler = mouseInfoHandler({ context, handler: clickHandler, metadata, tooltip: true, updateLinePositions }).bind(this);
            const handlerMetadata = mouseHandler(e);

            if (handlerMetadata) {

                const tooltipElement = getTooltipElement();
                if (tooltipTimeout) tooltipTimeout.stop();
                tooltipTimeout = timeout(() => {

                    const path = select(this);
                    const isMouseOnTooltip = handlerMetadata?.mouseOnTooltip;
                    const isMouseOnTooltipLabel = handlerMetadata?.mouseOnTooltipLabel;

                    const showTooltip = (isMouseOnTooltip && context.showTooltip()) || (isMouseOnTooltipLabel && context.showTooltipLabel())

                    if (showTooltip && path && tooltipElement) {

                        const { index = -1 } = metadata;

                        // get the mouse point
                        const [x, y] = pointer(e, path);
                        const clickPoint = { x, y };

                        // set the tooltip with the relevant text
                        let label = handlerMetadata.label || "Value";
                        label = is2d ? handlerMetadata.subLabel || label : label;
                        const value = handlerMetadata.value;

                        const sectionDetails = handlerMetadata?.sectionsDetails?.[index];
                        if (tooltipHandler) {
                            tooltipHandler(e, { label, value, x, y, sectionDetails });
                        } else {

                            const format = context.getFormat();
                            let labelFormatCallback = opt => formatNumber(opt?.value);
                            if (typeof format?.tooltip === "function") {
                                labelFormatCallback = format.tooltip;
                            }

                            let tooltipText = `<div>${label}: ${labelFormatCallback(handlerMetadata)}</div>`;
                            if (sectionDetails) {
                                tooltipText = sectionDetails
                                    .map((item) => `<div><strong>${item?.name}</strong>: ${labelFormatCallback({ ...handlerMetadata, value: item?.value })}</div>`)
                                    .join("");
                            }
                            
                            tooltipElement
                                // TODO: when exceeding the document area - move the tooltip up/down or left/right
                                // according to the position (e.g. top /right window eƒxceeded or right) 
                                .style("left", (clickPoint.x + 10) + "px")
                                .style("top", (clickPoint.y + 10) + "px")
                                .style("display", "flex")
                                .style("align-items", sectionDetails ? "start" : "center")
                                .style("flex-direction", "column") 
                                .style("height", "auto") 
                                .style("gap", "10px") 
                                .style("padding", "4px")
                                .html(tooltipText)
                                .style("opacity", "1")
                        }
                    }
                }, 500);
            }

            if (e.type === "mouseover") {
                const pathElement = select(this);
                if (pathElement) {
                    const clickEventExists = !!pathElement?.on('click');
                    pathElement.transition()
                        .duration(500)
                        .attr("stroke-width", '4px');

                    if (clickEventExists) {
                        pathElement.style("cursor", "pointer");
                    }
                }
            }
        }

        pathElement.on('mouseover', updateTooltip);

        pathElement.on('mousemove', updateTooltip);

        pathElement.on('mouseout', (event) => {
            const pathElement = select(event.target);
            if (pathElement) {
                pathElement
                    .transition()
                    .duration(500)
                    .style("cursor", "pointer")
                    .attr("stroke-width", '0');
            }

            if (tooltipTimeout) tooltipTimeout.stop();
            const tooltipElement = getTooltipElement();
            if (tooltipElement) {
                tooltipElement
                    .style("opacity", "0")
                    .style("display", "none")
                    .text("");
            }

        });
    }
}

/**
 * Gather the path information and return the click area handler  
 */
export const mouseInfoHandler = ({ context, clickHandler, metadata, tooltip, updateLinePositions }) => function (e) {

    const { width, height } = context.getDimensions({ context, margin: false })
    const isVertical = context.isVertical();

    updateLinePositions({ context });
    const linePositions = context.getLinePositions();

    // Determine the area between the lines
    const clickPoint = { x: e.offsetX, y: e.offsetY };
    let areaIndex = linePositions.findIndex((pos, i) => {

        if (!isVertical) {
            return clickPoint.x >= pos && clickPoint.x <= (linePositions[i + 1] || width);
        } else {
            return clickPoint.y >= pos && clickPoint.y <= (linePositions[i + 1] || height);
        }
    });

    // values are -1, 0, ...
    areaIndex++

    const dataInfoItem = JSON.parse(this.getAttribute('data-info'));
    let dataInfoItemForArea = {};
    const dataInfoValues = dataInfoItem?.values || [];
    const dataInfoLabels = dataInfoItem?.labels || [];
    const dataInfoSubLabels = dataInfoItem?.subLabels || [];
    const sectionsDetails = dataInfoItem?.sectionsDetails;
    const mouseOnTooltipLabel = dataInfoItem?.mouseOnTooltipLabel;
    const mouseOnTooltip = dataInfoItem?.mouseOnTooltip;

    const index = metadata.hasOwnProperty("index") ? metadata.index : -1;

    dataInfoItemForArea = {
        value: dataInfoValues?.[areaIndex],
        label: dataInfoLabels?.[areaIndex],
        subLabel: dataInfoSubLabels?.[index],
        sectionIndex: areaIndex,
        sectionsDetails,
        mouseOnTooltipLabel,
        mouseOnTooltip
    }

    metadata = {
        ...metadata,
        ...dataInfoItemForArea
    };

    if (!tooltip && clickHandler) {
        clickHandler(e, metadata);
    }

    return metadata;
};

/**
 * Add label hander if mot exists 
 */
export const addLabelMouseEventIfNotExists = ({ context }) => (groupLabels, index) => {
    const callbacks = context.getCallBacks();
    const clickLabelHandler = (typeof callbacks?.label === "function");
    const groupLabelsExists = !!groupLabels?.on('click');
    if (!groupLabelsExists && clickLabelHandler) {
        groupLabels.on("click", (event, d) => callbacks.label(event, { ...d, index}));
        groupLabels.style("cursor", "pointer")
    }
}

export const removeClickEvent = (pathElement) => {
    pathElement?.on('click', null);
}

const getTooltipElement = () => {
    return select(`#d3-funnel-js-tooltip`);
}