/* global module:false */
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Run the Typescript compilation
		run: {
			tsc: {
				exec: 'npm run build:grunt'
			}
		},
		cssUrlEmbed: {
			encodeDirectly: {
				files: {
					'dist/achromajs/filters.css': ['src/filters/filters.css']
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
			chrome: {
				files: [
					{ expand: true, cwd: 'src/chrome', src: 'manifest.json', dest: 'dist/achromeatic/' },
					{ expand: true, cwd: 'src/chrome', src: 'popup.html', dest: 'dist/achromeatic/' },
					{ expand: true, cwd: 'src/chrome', src: 'style.css', dest: 'dist/achromeatic/' },
					{ expand: true, cwd: 'dist/achromajs', src: 'filters.css', dest: 'dist/achromeatic/' }
				]
			},
			// // This is the last task to be executed
			// // It will copy the dist/achromajs folder to test
			tests: {
				expand: true,
				cwd: 'dist/achromajs',
				src: 'achroma.js*',
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
					from: '");',
					to: '#Filter");'
				}]
			}
		},

		concat: {
			options: {
				separator: '\\n',
			},
			dist: {
				src: ['src/common/default.css', 'src/library/*.css', 'dist/achromajs/filters.css'],
				dest: 'dist/achromajs/combined.css',
			},
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
					cwd: 'dist/achromajs',
					src: 'achroma.js',
					dest: 'dist/achromajs'
				}],
				options: {
					replacements: [
						{
							pattern: 'PLACEHOLDER_FILTER_CSS',
							replacement: "<%= grunt.file.read('dist/achromajs/combined.min.css') %>"
						}
					]
				}
			}

		},
		watch: {
			sources: {
				files: 'src/**',
				tasks: ['default']
			}
		}
	});

	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-css-url-embed');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-string-replace');

	// Default task.
	grunt.registerTask('default',
		[
			'run',
			'cssUrlEmbed',
			'copy:assets',
			'copy:chrome',
			'replace',
			'concat',
			'cssmin',
			'string-replace',
			'copy:tests']);

};
