var pluginsNS = "BOOMR.plugins";

function flattenParms(iParms) {
	var parms = [];
	for(var x in iParms) {
		parms.push(flattenParm(iParms[x]));
	}

	return parms;
}

function flattenParm(parm) {
	return {
		name: parm.name,
		description: parm.description,
		type: parm.type ? parm.type.names : []
	}
}

function Extractor(memberof, taffyData, publisher) {
  this.memberof = memberof;
  this.taffyData = taffyData;
	this.publisher = publisher;
} 

Extractor.implNS = "impl";

Extractor.prototype.getConfig = function() {
	return this.taffyData({
		memberof: [this.memberof, Extractor.implNS].join("."),
		pluginConfig: {
			is: true
		}
	}).map(function(record) {
		return {
			type: record.type.names,
			name: record.name,
			description: record.description,
			examples: record.examples
		};
	}.bind(this));
};

Extractor.prototype.getBeaconParams = function() {
	return this.taffyData({
		longname: this.memberof
	}).map(function(record) {
		if (record.boomerang && record.boomerang.beaconParams) {
			return record.boomerang.beaconParams;
		}
	});
}

Extractor.prototype.getDescription = function() {
	return this.taffyData({
		longname: this.memberof
	}).map(function(record) {
		return record.description
	})[0];
}

Extractor.prototype.getConstants = function() {
	return this.taffyData({
		memberof: this.memberof,
		kind: "constant"
	}).map(function(record) {
		return {
			name: record.name,
			type: record.type && record.type.names,
			description: record.description
		};
	}.bind(this));
}

Extractor.prototype.getEvents = function() {
	return this.taffyData({
		memberof: this.memberof,
		kind: "event"
	}).map(function(record) {

		return {
			name: record.name,
			description: record.description,
			properties: record.properties ? record.properties.map(flattenParm) : [],
			type: record.type
		};
	}.bind(this));
}

Extractor.prototype.getFunctions = function() {
	return this.taffyData({
		memberof: [this.memberof, Extractor.implNS],
		kind: "function"
	}).map(function (record) {
		return {
			name: record.name,
			description: record.description,
			params: flattenParms(record.params),
			listens: record.listens
		};
	});
};

Extractor.prototype.getTypeDefs = function() {
	return this.taffyData({
		kind: "typedef"
	}).map(function(record) {
		return { 
			name: record.name,
			type: record.type ? record.type.name : "",
			description: record.description,
			properties: record.properties ? record.properties.map(flattenParm) : []
		}
	});
};

module.exports = Extractor;
