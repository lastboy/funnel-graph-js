# Changelog

## [1.1.3] - 2025-01-01

## Fixed
- Initial configuration for Vertical direction is not working (Issue #31)

## [1.1.2] - 2024-12-10

## Added 
- Tooltip support for top label sections, now configurable as a general setting. This feature can be enabled or disabled using the tooltipLabel property.
* Formatting Support: The tooltip for top labels supports the standard format configuration for customizing display values.
* Callback for Custom Behavior: A new tooltipLabel callback is available to override the default behavior, providing full control over tooltip content and interactions.

## [1.1.1] - 2024-12-08

## Fixed
- Resize Handler Bug:
Fixed an issue where the resize handler was not properly destroyed, causing it to persist in the DOM after being disabled or when staying on the same page. (Issue #24)

- Click Label Handler Bug:
Fixed missing path section index in the click label handler, enabling proper mapping of interactions to graph section (Issue #25)

## [1.1.0] - 2024-12-05

## Added 
- There is a simple "responsive" flag to enable responsive behavior by assigning 100% width/height to the SVG root element.  
This new resize functionality recreates the path dynamically and improving the accuracy of the graph visualization.

- Label and Tooltip Formatting  
Added support for handlers to customize the formatting of labels and tooltip displays.

- Label Click Handler  
Introduced support for adding click handlers to the label area

## Fixed
- Resolved issue: #17 which had been reopened due to unresolved problems.
- Fixed an issue where small values were not being rendered with a line.


## [1.0.14] - 2024-12-03

### Fixed
- Rebuild dist

### Known Regressions
- This version may introduce instability in certain edge cases, specifically around the path creation.

## [1.0.13] - 2024-12-03

### Fixed
- Resolved an issue where the overridden SCSS variable was not applying correctly. (Issue: #19)

### Known Regressions
- This version may introduce instability in certain edge cases, specifically around the path creation.


## [1.0.12] - 2024-12-01

### Added

- Boolean property to enable or disable SVG resizing.
- Specific `responsiveWidth` and `responsiveHeight` properties. (Issue: #15)
- Text margins: `top` and `left` properties for controlling the text offset display.
- SCSS variables for better customization.
- Support for click configuration so that labels can be clicked.

### Changed

- None

### Fixed

- An issue where graph paths were incorrectly drawn when values were closed or equal. (Issue: #17)
- An issue where the chart sometimes failed to draw lines for very small values.

### Deprecated

- The use of SCSS variables that do not have a `-color` suffix (e.g., `$tooltip`).

