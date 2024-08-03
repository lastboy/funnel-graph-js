# D3 Funnel Graph 

Funnel Graph JS is a library for generating funnel charts using SVG, utilizing [D3 JS](https://d3js.org/)  
It supports horizontal and vertical funnel charts, offers options for solid colors and gradients, and can generate two-dimensional funnel charts.


This project is a fork of the [funnel-graph-js](https://github.com/lastboy/funnel-graph-js) project forked by lastboy. 
The funnel graph is created as a single SVG unit, without combining any HTML elements except for the tooltip. This approach ensures a single responsive graph that can be dynamically updated and resized without needing to recreate the graph.   



## Usage

```js
var graph = new FunnelGraph({
    container: '.funnel',
    gradientDirection: 'horizontal',
    data: {...},
    displayPercent: true,
    direction: 'horizontal',
    pctMode: 'max',
    width: 800,
    height: 300,
    callbacks: {
        click: (event, metadata) => {
            console.log(metadata);
        }
    },
    margin: { top: 120, right: 60, bottom: 60, left: 60, text: 10 },
    backgroundColor: 'transparent',
    titleColor: '#05df9d',
    labelColor: '#000000',
    percentageColor: '#592EC2',
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
                * **index**: The index of the path item that was clicked.
                * **sectionIndex**: The index of the section that contains the clicked path item.
                * **value**: The value associated with the clicked item.
                * **label**: The label of the clicked item.
                * **subLabel**: The sub-label of the clicked item (if applicable).
    * **tooltip** callback function for tooltip event - overrides the OOTB implementation
        * **Signature**: `(event, { label, value }) => {}`

* **displayPercent** should be displayed  [true | false],
* **details** should be displayed [ true | false ]
* **tooltip** should be displayed [ true | false ]  
    **Note:** The tooltip display depends on the details display so it can calculate its range according to the dividers.
* **responsive** when true the SVG's width and height will be set to 100%. And the configured width and height will be set in the viewBox.
    Make sure to set the parent DIVs elements to be 100% as well for resized graph
* **pctMode** specify how percentages are calculated for each stage in the funnel. `max` uses the highest stage value as denominator. `previous` uses the previous stage value as denominator. `first` uses the first stage value as denominator.
* **backgroundColor** specify the background color for the visualization.
* **titleColor** specify the text color for title labels (name of each stage).
* **labelColor** specify the text color for the value labels.
* **percentageColor** specify the text color for the percentage labels.

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
* pctMode
* backgroundColor
* titleColor
* percentageColor


## Responsive Graph
* In order to have a responsive graph the wrapper DIVs should have width/height of 100%
* The "responsive" flag should be set to true (the SVG width/height will be set to 100%/100%)
* The graph width/height should be at a ratio that fits your page - that will set the viewBox. (e.g. 800/200 100/100 etc...)
