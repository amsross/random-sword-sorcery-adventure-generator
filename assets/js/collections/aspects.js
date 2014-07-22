/*global Backbone */
var Generator = Generator || {};

(function () {
	'use strict';

	// Aspect Collection
	// ---------------

	// The collection of aspects is backed by *localStorage* instead of a remote
	// server.
	var Aspects = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Generator.Aspect,

		// Save all of the aspect items under the `"aspects"` namespace.
		localStorage: new Backbone.LocalStorage('aspects-backbone'),

		// We keep the Aspects in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next result number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('result') + 1 : 1;
		},

		// Aspects are sorted by their original insertion result.
		comparator: 'result'
	});

	// Create our global collection of **Aspects**.
	Generator.aspects = new Aspects();
})();
