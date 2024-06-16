import { roundPoint } from './number';

const getPathDefinitions = ({
    dataSize,
    isVertical,
    height,
    width,
    crossAxisPoints
}) => {
   
    const valuesNum = crossAxisPoints.length - 1;
    const paths = [];
    for (let i = 0; i < valuesNum; i++) {
        if (isVertical) {
            const X = crossAxisPoints[i];
            const XNext = crossAxisPoints[i + 1];
            const Y = getMainAxisPoints({
                dataSize,
                isVertical,
                height,
                width
            });

            const d = createVerticalPath(i, X, XNext, Y);
            paths.push(d);
        } else {
            const X = getMainAxisPoints({
                dataSize,
                isVertical,
                height,
                width
            });
            const Y = crossAxisPoints[i];
            const YNext = crossAxisPoints[i + 1];

            const d = createPath(i, X, Y, YNext);
            paths.push(d);
        }
    }

    return { paths, crossAxisPoints };
};


/**
An example of a two-dimensional funnel graph
#0..................
                   ...#1................
                                       ......
#0********************#1**                    #2.........................#3 (A)
                          *******************
                                              #2*************************#3 (B)
                                              #2+++++++++++++++++++++++++#3 (C)
                          +++++++++++++++++++
#0++++++++++++++++++++#1++                    #2-------------------------#3 (D)
                                       ------
                   ---#1----------------
#0-----------------
 Main axis is the primary axis of the graph.
 In a horizontal graph it's the X axis, and Y is the cross axis.
 However we use the names "main" and "cross" axis,
 because in a vertical graph the primary axis is the Y axis
 and the cross axis is the X axis.
 First step of drawing the funnel graph is getting the coordinates of points,
 that are used when drawing the paths.
 There are 4 paths in the example above: A, B, C and D.
 Such funnel has 3 labels and 3 subLabels.
 This means that the main axis has 4 points (number of labels + 1)
 One the ASCII illustrated graph above, those points are illustrated with a # symbol.
*/
const getMainAxisPoints = ({
    dataSize,
    isVertical,
    height,
    width
}) => {
    const size = dataSize;
    const points = [];
    const fullDimension = isVertical ? height : width;
    for (let i = 0; i <= size; i++) {
        points.push(roundPoint(fullDimension * i / size));
    }
    return points;
};

const getCrossAxisPoints = ({
    values,
    dataSize,
    subDataSize,
    values2d,
    percentages2d,
    isVertical,
    height,
    width,
    is2d
}) => {
    const points = [];
    const fullDimension = isVertical ? width : height;
    
    // get half of the graph container height or width, since funnel shape is symmetric
    // we use this when calculating the "A" shape
    const dimension = fullDimension / 2;
    if (is2d) {
        const totalValues = values2d;
        const max = Math.max(...totalValues);

        // duplicate last value
        totalValues.push([...totalValues].pop());
        // get points for path "A"
        points.push(totalValues.map(value => roundPoint((max - value) / max * dimension)));
        // percentages with duplicated last value
        const percentagesFull = percentages2d;
        const pointsOfFirstPath = points[0];

        for (let i = 1; i < subDataSize; i++) {
            const p = points[i - 1];
            const newPoints = [];

            for (let j = 0; j < dataSize; j++) {
                newPoints.push(roundPoint(
                    // eslint-disable-next-line comma-dangle
                    p[j] + (fullDimension - pointsOfFirstPath[j] * 2) * (percentagesFull[j][i - 1] / 100)
                ));
            }

            // duplicate the last value as points #2 and #3 have the same value on the cross axis
            newPoints.push([...newPoints].pop());
            points.push(newPoints);
        }

        // add points for path "D", that is simply the "inverted" path "A"
        points.push(pointsOfFirstPath.map(point => fullDimension - point));
    } else {
        // As you can see on the visualization above points #2 and #3 have the same cross axis coordinate
        // so we duplicate the last value
        const max = Math.max(...values);
        const aggregatedValues = [...values].concat([...values].pop());
        // if the graph is simple (not two-dimensional) then we have only paths "A" and "D"
        // which are symmetric. So we get the points for "A" and then get points for "D" by subtracting "A"
        // points from graph cross dimension length
        points.push(aggregatedValues.map(value => roundPoint((max - value) / max * dimension)));
        points.push(points[0].map(point => fullDimension - point));
    }

    return points;
};

const createCurves = (x1, y1, x2, y2) => ` C${roundPoint((x2 + x1) / 2)},${y1} `
    + `${roundPoint((x2 + x1) / 2)},${y2} ${x2},${y2}`;

const createVerticalCurves = (x1, y1, x2, y2) => ` C${x1},${roundPoint((y2 + y1) / 2)} `
    + `${x2},${roundPoint((y2 + y1) / 2)} ${x2},${y2}`;

/*
    A funnel segment is draw in a clockwise direction.
    Path 1-2 is drawn,
    then connected with a straight vertical line 2-3,
    then a line 3-4 is draw (using YNext points going in backwards direction)
    then path is closed (connected with the starting point 1).

    1---------->2
    ^           |
    |           v
    4<----------3

    On the graph on line 20 it works like this:
    A#0, A#1, A#2, A#3, B#3, B#2, B#1, B#0, close the path.

    Points for path "B" are passed as the YNext param.
 */

const createPath = (index, X, Y, YNext) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...X].pop()},${[...YNext].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createCurves(X[i], YNext[i], X[i - 1], YNext[i - 1]);
    }

    str += ' Z';

    return str;
};

/*
    In a vertical path we go counter-clockwise

    1<----------4
    |           ^
    v           |
    2---------->3
 */

const createVerticalPath = (index, X, XNext, Y) => {
    let str = `M${X[0]},${Y[0]}`;

    for (let i = 0; i < X.length - 1; i++) {
        str += createVerticalCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
    }

    str += ` L${[...XNext].pop()},${[...Y].pop()}`;

    for (let i = X.length - 1; i > 0; i--) {
        str += createVerticalCurves(XNext[i], Y[i], XNext[i - 1], Y[i - 1]);
    }

    str += ' Z';

    return str;
};

export {
    getCrossAxisPoints,
    getPathDefinitions 
};
