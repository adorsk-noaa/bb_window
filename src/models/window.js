define([
	"backbone",
], 
function(Backbone){

	var WindowModel = Backbone.Model.extend({
		defaults: {
			"title": ""
		},
	});

	return WindowModel;
});

