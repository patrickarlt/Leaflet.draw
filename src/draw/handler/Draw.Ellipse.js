L.Draw.Ellipse = L.Draw.SimpleShape.extend({
  statics: {
    TYPE: 'ellipse'
  },

  options: {
    shapeOptions: {
      stroke: true,
      color: '#f06eaa',
      weight: 4,
      opacity: 0.5,
      fill: true,
      fillColor: null, //same as color by default
      fillOpacity: 0.2,
      clickable: true
    }
  },

  initialize: function (map, options) {
    // Save the type so super can fire, need to do this as cannot do this.TYPE :(
    this.type = L.Draw.Ellipse.TYPE;

    L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
  },

  _initialLabelText: L.drawLocal.draw.handlers.ellipse.tooltip.start,

  _drawShape: function (latlng) {
    if (!this._shape) {
      this._shape = new L.Ellipse(this._startLatLng, this._startLatLng.distanceTo(latlng), this.options.shapeOptions);
      this._map.addLayer(this._shape);
    } else {
      this._shape.setRadius(this._startLatLng.distanceTo(latlng));
    }
  },

  _fireCreatedEvent: function () {
    var ellipse = new L.Ellipse(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
    L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, ellipse);
  },

  _onMouseMove: function (e) {
    var latlng = e.latlng,
      radius;

    this._tooltip.updatePosition(latlng);
    if (this._isDrawing) {
      this._drawShape(latlng);

      // Get the new radius (rouded to 1 dp)
      radius = this._shape.getRadius().toFixed(1);

      this._tooltip.updateContent({
        text: 'Release mouse to finish drawing.',
        subtext: 'Radius: ' + radius + ' m'
      });
    }
  }
});