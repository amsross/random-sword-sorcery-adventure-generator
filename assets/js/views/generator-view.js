/*global Backbone, jQuery */
var Generator = Generator || {};

(function () {
	'use strict';

	// The Generator
	// ---------------

	// Our overall **GeneratorView** is the top-level piece of UI.
	Generator.GeneratorView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the Generator already present in the HTML.
		el: '#aspectGenerator',

		events: {},

		initialize: function () {

			this.$main = this.$('#main');

			// Suppresses 'add' events with {reset: true} and prevents the Generator view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			Generator.aspects.fetch({reset: true});
		},

		render: function () {}
	});
})(jQuery);
