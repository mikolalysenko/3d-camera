3d-camera
=========
An easy-to-use 3D camera for interactive graphical applications.

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


## Basic interface

Updates to the camera state are synchronized at tick boundaries.

#### `camera.tick()`

#### `camera.width`

#### `camera.height`

#### `camera.shape`

#### `camera.delay`

#### `camera.dirty`


## Coordinate transformations

### Compound transformations

```javascript
```


### Projection matrix

```javascript
var projection = camera.projection
```

#### `projection.matrix`

#### `projection.mode`

#### `projection.fovX`

#### `projection.fovY`

#### `projection.zNear`

#### `projection.zFar`

### View matrix

```javascript
var view = camera.view
```

#### `view.matrix`

#### `view.mode`

#### `view.up`

#### `view.center`

#### `view.eye`

#### `view.distance`

#### `view.lookAt(eye, center, up)`

#### `view.rotate(dx, dy)`

#### `view.pan(dx, dy)`

#### `view.zoom(dr)`



### Model matrix

```javascript
var model = camera.model
```

#### `model.matrix`

#### `model.mode`

# License
(c) 2015 Mikola Lysenko. MIT License