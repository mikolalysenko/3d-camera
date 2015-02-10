3d-camera
=========
An easy-to-use 3D camera for real-time interactive graphical applications.

# Example

```javascript
var createCamera = require('3d-camera')

```

# Install

```
npm i 3d-camera
```

# API

## Constructor

#### `var camera = require('3d-camera')([options])`
Creates a new 3D camera object.  `options` is an optional JSON object which determines the initial values for the following properties:

* `options.width`
* `options.height`
* `options.zNear`
* `options.zFar`
* `options.delay`
* `options.fovX`
* `options.fovY`
* ... TODO

**Returns** A new 3D camera object

## Basic interface

Updates to the camera state are synchronized at calls to `tick()`.  This is necessary to ensure that camera state is smoothly interpolated between successive updates.  

#### `camera.tick()`
**This must be called at the start of each frame**.  It applies any pending updates to the camera and performs interpolation between previous camera motions.

**Returns** `true` if the state of the camera changed since the last call to `tick()`, `false` if the camera is at a steady state.

#### `camera.width`
This is the width of the view port which is being rendered.

#### `camera.height`
This is the height of the view port which is being rendered.

#### `camera.shape`
As an alternative to directly accessing the width/height properties, it is also possible to access the shape of the camera viewport directly as a vector.  For some applications this may be more convenient.

#### `camera.delay`
The amount of delay to apply to the camera when interpolating between previous states.  This delay is applied in millisecond and is based on the wall clock time.  No delay means that camera updates are not smoothed.

## Coordinate transformations

The main function of the camera is to keep track of coordinate transformations.  By convention, in computer graphics we define 4 coordinate systems:

* **Data coordinates**: Which are the coordinates where the geometry to be rendered is defined
* **World coordinates**: Which is a common coordinate system in which all objects are rendered
* **Camera coordinates**: A coordinate system in the world with the camera at the center
* **Clip coordinates**: The normalized device coordinates 

These coordinate transformations are generated by 3 different matrices which transform each coordinate system to the next:

* **Model matrix**: *Data* -> *World*
* **View matrix**: *World* -> *Camera*
* **Projection matrix**: *Camera* -> *Clip*

Coordinate transformation updates are synchronized on calls to `tick()`, so any changes to these matrices have to wait until the next call to `tick()` before they become visible.

### Conventions on coordinate systems

In WebGL and in this module, we use the following conventions for the coordinate axes for camera/clip coordinates:

* **x-axis**: negative = left, positive = right
* **y-axis**: negative = down, positive = up
* **z-axis**: negative = backward (away from screen), positive = forward (toward screen)

It is good practice to use `y` for "up" in world coordinates, though this is an application specific consideration.

### Compound transformations

For convenience, the camera object provides a number of methods for getting transformations between the standard coordinate systems:

```javascript
camera.data.toClip   // a 4x4 homogeneous transformation matrix mapping 
                     // data coordinates to clip coordinates

camera.clip.toWorld  // a transformation mapping clip coordinates to world
```

The general pattern of these transformations is:

```javascript
camera[SOURCE]['to' + TARGET]  // transform from SOURCE to TARGET coords
```

Possible coordinate systems include `data`, `world`, `camera` and `clip`.

The origin of the camera coordinates in any system can be found by accessing the `.origin` property of the camera, for example:

```javascript
camera.world.origin  // the origin of the camera in world coordinates
```

The state of these transformations is computed from the constituent `model`, `view` and `projection` matrices of the camera, which are controlled by the following interfaces.

### Projection matrix
The projection matrix determines the relation between camera coordinates and clip coordinates.

```javascript
var projection = camera.projection
```

#### `projection.matrix`
The current projection matrix.  You can assign to this property to change it dynamically.

#### `projection.mode`
The interaction mode for the projection matrix.  Currently supported modes are:

* `"perspective"` makes the camera behave as a perspective transformation, [based on this module](https://github.com/mikolalysenko/perspective-camera-controller)
* `"ortho"` makes the camera behave as an orthogonal camera
* `"matrix"` allows for direct matrix manipulation of the camera controller

#### `projection.fovX`
The horizontal field of view

#### `projection.fovY`
The vertical field of view

#### `projection.zNear`
The distance of the near clip plane

#### `projection.zFar`
The distance of the far clip plane

### View matrix

```javascript
var view = camera.view
```

#### `view.matrix`
The contents of the view matrix.  Assigning to this value directly changes the view matrix.

#### `view.mode`
The interaction mode for the view matrix.  Currently supported modes are:

* `"turntable"` a turntable based interaction, [based on this module](https://github.com/mikolalysenko/turntable-camera-controller).
* `"orbit"` a freely orbiting trackball camera controller, [based on this module](https://github.com/mikolalysenko/orbit-camera-controller)
* `"fps"` a first person style camera (like Quake/Doom)
* `"matrix"` unconstrained matrix based camera interactions

#### `view.up`
The up vector for the view coordinate system in 

#### `view.eye`
The position of the camera in world coordinates (similar `camera.world.origin`)`

#### `view.center`
For `turntable` and `orbit` mode, this is the center of the camera coordinate system.

#### `view.distance`
The distance from the camera to the center

#### `view.lookAt(eye, center, up)`
Sets the orientation of the camera

* `eye` is the eye vector of the viewer (or `view.eye` if unspecified)
* `center` is the target of the camera (or `view.center` if unspecified)
* `up` is the up vector for the camera (or `view.up` if unspecified)

#### `view.rotate(dx, dy, dz)`
Apply an incremental rotation in screen coordinates.

* `dx` is the amount to rotate horizontally/yaw (in radians)
* `dy` is the amount to rotate vertically/pitch (in radians)
* `dz` is the amount to roll (in radians)

#### `view.zoom(dr)`
Modify the distance to the camera by a factor of `dr`

* `dr` is a scale factor which is `>0` determining the zoom amount

#### `view.pan(dx, dy)`
Pan the camera within the viewing plane

* `dx` is the amount to pan horizontally (in world units)
* `dy` is the amount to pan vertically (in world units)

#### `view.translate(dx, dy, dz)`
Translates the camera in absolute (world) coordinates

* `dx,dy,dz` are the component-wise transformations in world units

#### `view.move(dx, dy, dz)`
Translates the camera in relative (camera) coordinates

* `dx,dy,dz` are the component-wise component transformations in camera units

### Model matrix

```javascript
var model = camera.model
```

#### `model.matrix`
The model matrix of the camera

#### `model.mode`
Interaction mode for the model matrix.  Currently supported modes are:

* `"matrix"` direct matrix based access for the model matrix

# License
(c) 2015 Mikola Lysenko. MIT License