/*global Backbone */
var Generator = Generator || {};

(function () {
	'use strict';

	// Aspect Router
	// ----------
	var AspectRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			Generator.AspectFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Aspect view items
			Generator.aspects.trigger('filter');
		}
	});

	Generator.AspectRouter = new AspectRouter();
	Backbone.history.start();
})();
