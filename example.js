var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');
var fs = require('fs');

// fs.readFile('./25319.mvt', function(err, data) {
fs.readFile('./streets.mvt', function(err, data) {
	// console.info(data);

	var tile = new VectorTile(new Protobuf(data));

	// console.info(tile);

	var contour = tile.layers.contour;


	var contour = tile.layers.contour;

	var landuse = tile.layers.landuse;

	// // Amount of features in this layer
	// landuse.length;

	// // Returns the first feature
	// landuse.feature(0);


	console.info(landuse)
	console.info(tile.layers.landcover)
	var feat = landuse.feature(0);
	console.info(feat);
	// console.info(feat.loadGeometry());
	// console.info(contour)

	// var feat = contour.feature(0);
	// console.info(feat);
	// console.info(feat.loadGeometry());

	var heightmap = [];

});
