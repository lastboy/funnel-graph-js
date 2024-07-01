# D3 Funnel Graph 

![npm](https://img.shields.io/npm/v/d3-funnel-graph.svg)
![GitHub file size in bytes](https://img.shields.io/github/size/lastboy/funnel-graph-js/dist/js/funnel-graph.min.js.svg)
![GitHub](https://img.shields.io/github/license/lastboy/funnel-graph-js.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/lastboy/funnel-graph-js.svg)

Funnel Graph JS is a library for generating funnel charts using SVG, utilizing [D3 JS](https://d3js.org/)  
It supports horizontal and vertical funnel charts, offers options for solid colors and gradients, and can generate two-dimensional funnel charts.


This project is a fork of the [funnel-graph-js](https://github.com/greghub/funnel-graph-js) project initiated by greghub. It has been entirely refactored using [D3.js](https://d3js.org/), although the core code that creates the paths remains unchanged.   
The funnel graph is created as a single SVG unit, without combining any HTML elements except for the tooltip. This approach ensures a single responsive graph that can be dynamically updated and resized without needing to recreate the graph.   

New features have been added:  
* No need to recreate the graph on update
* Responsive graph including the text informations and dividers
* Text information can be displayed or hidden
* Tooltip over each area path
* Clickable areas with configurable callbacks
  
[![Demo](https://i.imgur.com/mmb1xCr.gif)](https://codepen.io/arik-test/pen/KKLZrVe)

## Support for Vue, React, and Other Frameworks
There's no need to use the specific Vue project: [vue-funnel-graph-js](https://github.com/greghub/vue-funnel-graph-js)  
This project supports dynamic data and configuration updates and is very simple to integrate with any front-end JavaScript framework, including Vue, React, and others.

Vue2 Example: https://codepen.io/arik-test/pen/qBGYjyG

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
    margin: { top: 120, right: 60, bottom: 60, left: 60, text: 10 }
});

graph.draw();
// use graph.destroy() for cleanup
```

## FunnelGraph Class Configuration

* **container** selector name (e.g. ".selector")
* **width** of the chart in pixels (e.g. 600)
* **height** of the chart in pixels(e.g. 400)
* **labels** to be displayed on each section (e.g ['Impressions', ...])
* **subLabels** to used in the tooltip for two dimentions chart (e.g. ['Direct', ...])
* **colors** overrides the defaults [ ['#000', ... ], ]
* **values** of the graph (e.g. [ [3500, ...], ])
* **margin** for the info text (e.g { ?top, ?right, ?bottom, ?left, text })
* **gradientDirection** ('vertical' | 'horizontal')
* **callbacks** object for handling user actions (e.g. { 'click': () => {} })
    * **click** callback function for click events
    * **Signature**: `({ index, value, label, subLabel, sectionIndex }) => {}`
        * **Parameters**:
            * **index**: The index of the item that was clicked.
            * **sectionIndex**: The index of the section that contains the clicked item.
            * **value**: The value associated with the clicked item.
            * **label**: The label of the clicked item.
            * **subLabel**: The sub-label of the clicked item (if applicable).
* **displayPercent** should be displayed  [true | false],
* **details** should be displayed [ true | false ]
* **tooltip** should be displayed [ true | false ]  
    **Note:** The tooltip display depends on the details display so it can calculate its range according to the dividers.
* **responsive** when true the SVG's width and height will be set to 100%. And the configured width and height will be set in the viewBox.
    Make sure to set the parent DIVs elements to be 100% as well for resized graph

## Updatable FunnelGraph configuration
* width
* height
* margin
* values
* labels
* subLabels
* colors
* details
* tooltip


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
* In order to have a responsive graph the wrapper DIVs should have width/height of 100%
* The "responsive" flag should be set to true (the SVG width/height will be set to 100%/100%)
* The graph width/height should be at a ratio that fits your page - that will set the viewBox. (e.g. 800/200 100/100 etc...)
