/* global module:false */
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		copy: {
			// Chrome Extension
			chrome: {
				expand: true,
				cwd: 'src/chrome',
				src: '**',
				dest: 'dist/achromeatic/',
			},
			common_chrome: {
				expand: true,
				cwd: 'src/common',
				src: '**',
				dest: 'dist/achromeatic/',
			},
			assets_chrome: {
				expand: true,
				cwd: 'src/assets',
				src: '**',
				dest: 'dist/achromeatic/assets/',
			},
			// Firefox Extension
			assets_firefox: {
				expand: true,
				cwd: 'src/assets',
				src: '**',
				dest: 'dist/achromafox/assets/',
			},
			// Independent Javascript library
			assets_library: {
				expand: true,
				cwd: 'src/assets',
				src: '**',
				dest: 'dist/library/assets/',
			},

		},
		replace: {
			version: {
				src: ['dist/achromeatic/manifest.json'],
				overwrite: true,
				replacements: [{
					from: '%PROJECT_VERSION%',
					to: "<%= pkg.version %>"
				}, {
					from: '%AUTHOR_NAME%',
					to: '<%= pkg.author.name %>'
				}]
			}
		},

		// concat: {
		// 	options: {
		// 		banner: '<%= banner %>',
		// 		stripBanners: true
		// 	},
		// 	dist: {
		// 		src: ['src/achroma.js', 'src/achroma-webkit-filter-svg-path-fix.js'],
		// 		dest: 'dist/achroma.js'
		// 	}
		// },
		// uglify: {
		// 	options: {
		// 		banner: '<%= banner %>'
		// 	},
		// 	dist: {
		// 		src: '<%= concat.dist.dest %>',
		// 		dest: 'dist/achroma.min.js'
		// 	}
		// },
		// cssmin: {
		// 	target: {
		// 		files: [{
		// 			expand: true,
		// 			cwd: 'src',
		// 			src: ['*.css'],
		// 			dest: 'dist',
		// 			ext: '.min.css'
		// 		}]
		// 	}
		// },
		// xmlmin: {
		// 	dist: {
		// 		files: {
		// 			'dist/color-filters.svg': 'src/color-filters.svg'
		// 		}
		// 	}
		// },
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			}
		},
		watch: {
			sources: {
				files: 'src/**',
				tasks: ['default']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-xmlmin');
	grunt.loadNpmTasks('grunt-text-replace');

	// Default task.
	//grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'xmlmin']);
	grunt.registerTask('default', ['copy', 'replace']);

};
