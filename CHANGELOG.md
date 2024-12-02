# Changelog
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

