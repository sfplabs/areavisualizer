# Area & Volume Visualization App
## Project Specification

### Project Overview
A web-based 3D visualization tool that helps users intuitively understand areas and volumes by comparing measurements to familiar objects at human scale.

### Core Problem Statement
People struggle to visualize area and volume measurements when presented numerically. While linear measurements like height are easy to grasp, squared and cubed units are not. This app provides instant visual understanding of these measurements.

### Primary Goals
1. Provide instant visual understanding of areas and volumes
2. Minimize user interaction steps required to generate visualizations
3. Offer comparative references at human scale
4. Maintain simplicity and focus in the user interface

### User Stories

**Primary Interaction Flow:**
1. User chooses mode (volume or area)
2. User enters a numeric measurement
3. User selects measurement units from dropdown
4. User sees instant visualization with appropriate reference model
5. User orbits and zooms to explore the visualization

**Additional Interactions:**
- If in volume mode, user toggles between sphere and cube visualization
- User can enter new measurements at any time to update visualization
- User can switch units at any time to see same measurement in different units
- User can switch modes at any time to compare area vs volume

### Technical Specifications

#### User Interface Components
1. **Mode Toggle**
   - Simple toggle button switching between "Area" and "Volume" modes
   - Positioned at the top of the viewport

2. **Measurement Input**
   - Numeric input field
   - Validates for numbers only (including decimals)
   - Positioned at the top of the viewport

3. **Units Dropdown**
   - Adjacent to measurement input
   - Contains initial set of common measurement units
   - For Area: square feet, square meters, square inches, etc.
   - For Volume: cubic feet, cubic meters, cubic inches, etc.

4. **Volume Shape Toggle** (Volume mode only)
   - Toggle between sphere and cube visualization

#### Visualization Specifications

1. **Environment**
   - Full viewport 3D scene
   - Black background
   - Three.js implementation
   - Standard orbit controls for camera manipulation

2. **Reference Models**
   Scale progression from smallest to largest:
   - Hand model (for small-scale measurements)
   - Human figure (default, ~6ft tall)
   - Sports field (football/soccer pitch)
   - Earth model (for massive scale measurements)

3. **Visualization Styling**
   - Bright colored outlines for measured areas/volumes
   - Semi-transparent fill
   - Areas displayed as squares under reference object
   - Volumes displayed as either spheres or cubes

### Scale Thresholds
The app automatically switches reference models based on measurement size:
- Microscopic to hand-sized: Hand model
- Room-sized to building-sized: Human figure
- Block-sized to neighborhood-sized: Sports field
- City-sized and larger: Earth model

### Technical Requirements
1. **Platform:** Web browser-based application
2. **Core Technology:** Three.js for 3D visualization
3. **Viewport:** Full-screen capable, responsive design
4. **Performance:** Must maintain smooth performance during orbit/zoom operations

### MVP Scope Limitations
1. Fixed 6ft human figure (no customization)
2. Limited initial set of measurement units
3. Basic black background environment
4. No additional reference objects beyond core set (hand, human, field, Earth)
5. Size range limited to fingernail-scale through solar-system-scale

### Future Consideration Notes
While not part of MVP, the following have been identified as potential future enhancements:
- Customizable human figure (height/gender)
- Additional reference objects (elephants, buses, etc.)
- Extended unit support
- Enhanced environment visualization
- Additional shape options for volume visualization
