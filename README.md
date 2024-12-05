# D3 Funnel Graph 

![Latest LTS version](https://img.shields.io/npm/v/d3-funnel-graph/lts)
![npm](https://img.shields.io/npm/v/d3-funnel-graph.svg)
![GitHub file size in bytes](https://img.shields.io/github/size/lastboy/funnel-graph-js/dist/js/funnel-graph.min.js.svg)
![GitHub](https://img.shields.io/github/license/lastboy/funnel-graph-js.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/lastboy/funnel-graph-js.svg)
[![Changelog](https://img.shields.io/badge/Changelog-View%20History-blue)](https://github.com/lastboy/funnel-graph-js/blob/master/CHANGELOG.md)


Funnel Graph JS is a library for generating funnel charts using SVG, utilizing [D3 JS](https://d3js.org/)  
It supports horizontal and vertical funnel charts, offers options for solid colors and gradients, and can generate two-dimensional funnel charts.


This project is a fork of the [funnel-graph-js](https://github.com/greghub/funnel-graph-js) project initiated by greghub. It has been entirely refactored using [D3.js](https://d3js.org/), although the core code that creates the paths remains unchanged.   
The funnel graph is created as a single SVG unit, without combining any HTML elements except for the tooltip. This approach ensures a single responsive graph that can be dynamically updated and resized without needing to recreate the graph.   

### New Features

- **Graph Update without Recreation**  
  The graph can now be updated without needing to recreate it.

- **Fully Responsive Graph**  
  The graph, including text information and dividers, is now fully responsive.

- **Toggle Text Information**  
  Text information can be dynamically displayed or hidden.

- **Tooltip Support**  
  Tooltips are available over each area path for additional context.

- **Clickable Paths**  
  Paths within the graph are now clickable, with configurable callback functionality.

- **Clickable Labels**  
  Support has been introduced for adding click handlers to the label area.

- **Label and Tooltip Formatting**  
  Handlers have been added to customize the formatting of labels and tooltip displays.

  
[![Demo](https://i.imgur.com/mmb1xCr.gif)](https://codepen.io/arik-test/pen/qBGYjyG)

## Support for Vue, React, and Other Frameworks
* [Vue2 example](https://codepen.io/arik-test/pen/PwYZJVy){:target="_blank"}
* [Vue3 example](https://codepen.io/arik-test/pen/vEBLpNB){:target="_blank"}
* [React example](https://codepen.io/arik-test/pen/OPLMOzK){:target="_blank"}


## Build
```
> yarn
> yarn build 
```

## Installation

```
npm i d3-funnel-graph
```

JS:
```js
import FunnelGraph from 'd3-funnel-graph';
// or import "d3-funnel-graph/dist/css/funnel-graph.min.css"
```

SCSS:
```
@import "d3-funnel-graph/dist/scss/variables.scss"
@import "d3-funnel-graph/dist/scss/mixin.scss"
@import "d3-funnel-graph/dist/scss/d3.scss"
```

## Usage

```js
var graph = new FunnelGraph({
    container: '.funnel',
    gradientDirection: 'horizontal',
    data: {...},
    displayPercent: true,
    direction: 'horizontal',
    width: 800,
    height: 300,
    callbacks: {
        click: (event, metadata) => {
            console.log(metadata);
        }
    },
    margin: { top: 120, right: 60, bottom: 60, left: 60, text: { left: 10, top: 0 } }
});

graph.draw();
// use graph.destroy() for cleanup
```
## FunnelGraph Class Configuration

- **container**  
  Selector name (e.g., `.selector`).

- **width**  
  The width of the chart in pixels (e.g., `600`).

- **height**  
  The height of the chart in pixels (e.g., `400`).

- **labels**  
  Labels to be displayed on each section (e.g., `['Impressions', ...]`).

- **subLabels**  
  Used in the tooltip for two-dimensional charts (e.g., `['Direct', ...]`).

- **colors**  
  Overrides the default colors (e.g., `[ ['#000', ... ], ]`).

- **values**  
  The values of the graph (e.g., `[ [3500, ...], ]`).

- **margin**  
  Margins for the info text (e.g., `{ top?, right?, bottom?, left?, text: { left?, top? } }`).

- **gradientDirection**  
  Direction of the gradient (`'vertical' | 'horizontal'`).

- **callbacks**  
  Object for handling user actions (e.g., `{ 'click': () => {} }`).

  - **click**  
    Callback function for click events.

    - **Signature**:  
      `({ index, value, label, subLabel, sectionIndex }) => {}`

    - **Parameters**:  
      - **index**: The index of the path item that was clicked.  
      - **sectionIndex**: The index of the section containing the clicked path item.  
      - **value**: The value associated with the clicked item.  
      - **label**: The label of the clicked item.  
      - **subLabel**: The sub-label of the clicked item (if applicable).

  - **tooltip**  
    Callback function for tooltip events, overriding the default implementation.  

    - **Signature**:  
      `(event, { label, value }) => {}`

  - **label**  
    Callback function for label events.  

    - **Signature**:  
      `(event, { index, value, label, subLabel, sectionIndex }) => {}`

- **format**  
  Formatting options for text display.

  - **value**  
    Callback function to format values.  

    - **Signature**:  
      `({ value }) => {}`

  - **tooltip**  
    Callback function to format tooltip content.  

    - **Signature**:  
      `(opts) => {}`

- **displayPercent**  
  Whether percentages should be displayed (`true | false`).

- **details**  
  Whether details should be displayed (`true | false`).

- **tooltip**  
  Whether the tooltip should be displayed (`true | false`).  

  **Note:** Tooltip display depends on the details display for range calculations according to the dividers.

- **resize**  
  Configuration for resizing the graph's paths based on container dimensions.

  - **factor**  
    Adjustment factors for dimensions.

    - **width**: The width factor (default `0.4`).  
    - **height**: The height factor (default `0.4`).  
    - **wait**: The wait time (in milliseconds) before invoking the resize callback.

- **responsive**  
  When `true`, the SVG's width and height are set to `100%`. The configured width and height are set in the `viewBox`.  

  **Note:** Ensure the parent `DIV` elements are set to `100%` for a properly resized graph.

- **responsiveWidth**  
  Enables exclusive responsive width.

- **responsiveHeight**  
  Enables exclusive responsive height.


## Other Download and Import Options

Go to the code section of the repository and download the ZIP file.    
Then, Use the provided resources according to your environment. You can use them directly in plain HTML or by importing (ES6+) them into your project.

CDN:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/lastboy/funnel-graph-js@master/dist/css/funnel-graph.min.css">

<script src="https://cdn.jsdelivr.net/gh/lastboy/funnel-graph-js@master/dist/js/funnel-graph.min.js"></script>
```

CSS:
```html
<link rel="stylesheet" type="text/css" href="../dist/css/funnel-graph.min.css">
```

JS:
```html
<script src="../dist/js/funnel-graph.min.js"></script>
```

## Responsive Graph

### Using the Responsive Flag

- To create a responsive graph, the wrapper `div` elements must have a width and height set to `100%`.
- Set the `responsive` flag to `true`. This ensures the SVG's width and height are set to `100%` of the wrapper dimensions.
- Adjust the graph's width and height to maintain an appropriate aspect ratio that fits your page layout. This will define the `viewBox` dimensions (e.g., `800/200`, `100/100`, etc.).


### Resize Configuration

This section can be used with the `responsive` flag or as a standalone solution. 
By setting the `Resize` configuration with the `factor` properties (`width` and `height`), you can make the graph responsive to window resizing and position it precisely as needed.
