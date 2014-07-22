/*global Backbone */
var Generator = Generator || {};

(function () {
	'use strict';

	// Aspect Model
	// ----------

	Generator.Aspect = Backbone.Model.extend({
		defaults: {
			result: 0,
			text: ''
		}
	});
})();
