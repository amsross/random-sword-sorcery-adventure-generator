'use strict';
module.exports = function(grunt) {
	// Load all tasks
	require('load-grunt-tasks')(grunt);
	// Show elapsed time
	require('time-grunt')(grunt);

	var jsFileList = [
		'assets/vendor/jquery/dist/jquery.js',
		'assets/vendor/underscore/underscore.js',
		'assets/vendor/backbone/backbone.js',
		'assets/vendor/backbone.localStorage/backbone.localStorage.js',
		'assets/js/models/aspect.js',
		'assets/js/collections/aspects.js',
		'assets/js/views/generator-view.js',
		'assets/js/routers/router.js',
		'assets/js/app.js'
	];

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/**/*.js',
				'!assets/**/*.min.*'
			]
		},
		jst: {
			compile: {
				options: {
					templateSettings: {
						variable: 'data'
					}
				},
				files: {
					'assets/js/templates.js': ['assets/js/templates/**/*.ejs']
				}
			}
		},
		less: {
			dev: {
				files: {
					'assets/css/main.min.css': [
						'assets/less/main.less'
					]
				},
				options: {
					compress: false,
					// LESS source map
					// To enable, set sourceMap to true and update sourceMapRootpath based on your install
					sourceMap: true,
					sourceMapFilename: 'assets/css/main.min.css.map',
					sourceMapRootpath: ''
				}
			},
			build: {
				files: {
					'assets/css/main.min.css': [
						'assets/less/main.less'
					]
				},
				options: {
					compress: true
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [jsFileList],
				dest: 'assets/js/scripts.min.js',
			},
		},
		uglify: {
			dist: {
				files: {
					'assets/js/scripts.min.js': [jsFileList]
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
			},
			dev: {
				options: {
					map: {
						prev: 'assets/css/'
					}
				},
				src: 'assets/css/main.min.css'
			},
			build: {
				src: 'assets/css/main.min.css'
			}
		},
		watch: {
			less: {
				files: [
					'assets/less/*.less',
					'assets/less/**/*.less'
				],
				tasks: ['less:dev', 'autoprefixer:dev']
			},
			js: {
				files: [
					jsFileList,
					'<%= jshint.all %>'
				],
				tasks: ['jshint', 'concat']
			},
			jst: {
				options: {
					templateSettings: {
						variable: 'data'
					}
				},
				files: [
					'assets/js/templates/**/*.ejs'
				],
				tasks: ['jst']
			},
			livereload: {
				options: {
					livereload: false
				},
				files: [
					'assets/js/scripts.min.js',
					'assets/js/templates.min.js'
				]
			}
		}
	});

	// Register tasks
	grunt.registerTask('createDefaultTemplate', function () {
		grunt.file.write('assets/js/templates.min.js', 'this.JST = this.JST || {};');
	});
	grunt.registerTask('default', [
		'dev'
	]);
	grunt.registerTask('dev', [
		'createDefaultTemplate',
		'jst',
		'jshint',
		'less:dev',
		'autoprefixer:dev',
		'concat'
	]);
	grunt.registerTask('build', [
		'createDefaultTemplate',
		'jst',
		'jshint',
		'less:build',
		'autoprefixer:build',
		'uglify'
	]);
};
