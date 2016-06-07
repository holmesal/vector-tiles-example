import { VectorTile } from 'vector-tile';
import ProtoBuf from 'pbf';
import fs from 'fs';
import _ from 'lodash';
import sm from 'sphericalmercator';

const merc = new sm({});

class TerrainTile {

	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;

		// The VectorTile
		this.tile = null;
	}

	fetch() {
		// For nnow, just return hardcoded tile
		fs.readFile('./25319.mvt', (err, data) => {
			this.tile = new VectorTile(new ProtoBuf(data));
			this.parse();
		});
	}

	parse() {
		const parsed = {
			contours: this.getContours(),
			meta: this.getMeta()
		};
		console.info(parsed);

		fs.writeFile('./parsed.json', JSON.stringify(parsed));
	}

	getContours() {
		const contourLayer = this.tile.layers.contour;
		const contourFeatures = [];
		//console.log(contourLayer.length, contourLayer._values.length);
		//console.log(contourLayer.feature(0));
		//console.log(contourLayer.feature(1).loadGeometry());
		for(let i = 0; i < contourLayer.length; i++) {
			const feature = contourLayer.feature(i);

			const feat = _.pick(feature, 'properties', 'extent', 'type');
			feat.geometry = feature.loadGeometry();
			contourFeatures.push(feat);
			//console.log(feat);
		}
		return contourFeatures;
	}

	getMeta() {
		return {
			coordinates: {
				tile: {
					x: this.x,
					y: this.y,
					z: this.z
				},
				bboxWSEN: merc.bbox(this.x, this.y, this.z)
			}
		}
	}
}

const tile = new TerrainTile(10471, 25319, 16);
tile.fetch();