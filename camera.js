'use strict'

var createCoordRelations = require('3d-camera-core')

var IDENTITY = [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
function MatrixController() {
  this.matrix = IDENTITY.slice()
  this.isDirty = true
}
var cproto = MatrixController.prototype
cproto.get = function(m) {
  var n = this.matrix
  for(var i=0; i<16; ++i) {
    m[i] = n[i]
  }
  this.isDirty = false
  return m
}
cproto.dirty = function() {
  return this.isDirty
}

function createCamera(options) {
  options = options || {}

  //Model matrix
  var modelController = new MatrixController()
  var model = {}
  Object.defineProperties(model, {
    mode: {
      get: function() {
        return 'matrix'
      },
      set: function(m) {
        return 'matrix'
      },
      enumerable: true
    },
    matrix: {
      get: function() {
        return modelController.matrix
      },
      set: function(m) {
        var mm = modelController.matrix
        for(var i=0; i<16; ++i) {
          mm[i] = m[i]
        }
        return modelMatrix
      },
      enumerable: true
    }
  })

  //View matrix
  var viewController = new MatrixController()
  var view = {
    lookAt: function(eye, center, up) {
    },
    rotate: function(dx, dy, dz) {
    },
    zoom: function(dr) {
    },
    pan: function(dx, dy, dz) {
    },
    translate: function(dx, dy, dz) {
    },
    zoom: function(dx, dy, dz) {
    }
  }
  Object.defineProperties(view, {
    mode: {
    },
    matrix: {
    },
    eye: {
    },
    up: {
    },
    center: {
    },
    distance: {
    }
  })

  //Projection matrix
  var projectionController = new MatrixController()
  var projection = {}
  Object.defineProperties(projection, {
    mode: {
    },
    matrix: {
    },
    fovX: {
    },
    fovY: {
    },
    zNear: {
    },
    zFar: {
    }
  })


  //Core camera object
  var coords = createCoordRelations({
    model:      modelController,
    view:       viewController,
    projection: projectionController
  })
  var camera = {

    model:      model,
    view:       view,
    projection: projection,

    data:       coords.data,
    world:      coords.world,
    camera:     coords.camera,
    clip:       coords.clip,

    tick: function() {
    }
  }
  Object.defineProperties(camera, {
    width: {
      get: function() {
      },
      set: function(w) {
      },
      enumerable: true
    },
    height: {
      get: function() {
      },
      set: function(h) {
      },
      enumerable: true
    },
    shape: {
      get: function() {
      },
      set: function(s) {
      },
      enumerable: true
    },
    delay: {
      get: function() {
      },
      set: function(d) {
      },
      enumerable: true
    }
  })

  return camera
}