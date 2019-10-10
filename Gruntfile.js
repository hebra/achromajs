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
		imageEmbed: {
			dist: {
				src: ["src/filters/filters.css"],
				dest: "src/common/filters.css",
				options: {
					deleteAfterEncoding: false,
					preEncodeCallback: function (filename) { return true; }
				}
			}
		},
		copy: {
			assets: {
				files: [
					{ expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromeatic/assets/' },
					{ expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromafox/assets/' },
					{ expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromajs/assets/' },
				]
			},
			common: {
				files: [
					{ expand: true, cwd: 'src/common', src: '**', dest: 'dist/achromeatic/' },
					{ expand: true, cwd: 'src/common', src: '**', dest: 'dist/achromafox/' },
					{ expand: true, cwd: 'src/common', src: '**', dest: 'dist/achromajs/' },
				]
			},

			// Chrome Extension
			achromeatic: {
				expand: true,
				cwd: 'src/chrome',
				src: '**',
				dest: 'dist/achromeatic/',
			},
			// Firefox Extension
			achromafox: {
				expand: true,
				cwd: 'src/firefox',
				src: '**',
				dest: 'dist/achromafox/',
			},
			// Independent Javascript library
			achromajs: {
				expand: true,
				cwd: 'src/library',
				src: '**',
				dest: 'dist/achromajs/',
			},
			// This is the last task to be executed
			// It will copy the dist/achromajs folder to test
			tests: {
				expand: true,
				cwd: 'dist',
				src: 'achroma.js',
				dest: 'test/',
			}
		},
		replace: {
			// Populate version and author placeholders
			placeholders: {
				src: ['dist/achromeatic/manifest.json'],
				overwrite: true,
				replacements: [{
					from: '%PROJECT_VERSION%',
					to: "<%= pkg.version %>"
				}, {
					from: '%AUTHOR_NAME%',
					to: '<%= pkg.author.name %>'
				}]
			},
			// Add a #filter to each of the generates base64 SVG filters
			fix_css_embedded: {
				src: ['dist/**/filters.css'],
				overwrite: true,
				replacements: [{
					from: ');;',
					to: '#Filter);'
				}]
			}
		},



		concat: {
			javascript: {
				src: ['dist/achromajs/*js'],
				dest: 'dist/achroma.js'
			},
			css: {
				src: ['dist/achromajs/*css'],
				dest: 'dist/achromajs/combined.css'
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'dist/achromajs/',
					src: ['combined.css'],
					dest: 'dist/achromajs',
					ext: '.min.css'
				}]
			}
		},

		// Embed the AchromaJS library CSS into the generated achrom.js file
		'string-replace': {
			inline: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: 'achroma.js',
					dest: 'dist'
				}], 
				options: {
					replacements: [
						{
							pattern: 'MINIFIED_CSS',
							replacement: "<%= grunt.file.read('dist/achromajs/combined.min.css') %>"
						}
					]
				}
			}
		},


		// uglify: {
		// 	options: {
		// 		banner: '<%= banner %>'
		// 	},
		// 	dist: {
		// 		src: '<%= concat.dist.dest %>',
		// 		dest: 'dist/achroma.min.js'
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

	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks("grunt-image-embed");
	grunt.loadNpmTasks("grunt-image-embed");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-string-replace');

	// Default task.
	grunt.registerTask('default',
		['imageEmbed',
			'copy:assets',
			'copy:common',
			'copy:achromeatic',
			'copy:achromafox',
			'copy:achromajs',
			'replace',
			'concat',
			'cssmin',
			'string-replace',
			'copy:tests']);

};
