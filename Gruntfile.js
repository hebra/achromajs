/* global module:false */
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig( {
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: [ 'src/achroma.js', 'src/achroma-webkit-filter-svg-path-fix.js' ],
				dest: 'dist/achroma.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/achroma.min.js'
			}
		},
		cssmin: {
			target: {
				files: [ {
					expand: true,
					cwd: 'src',
					src: [ '*.css' ],
					dest: 'dist',
					ext: '.min.css'
				} ]
			}
		},
		xmlmin: {
			dist: {
				files: {
					'dist/color-filters.svg': 'src/color-filters.svg'
				}
			}
		},
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
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: [ 'jshint:gruntfile' ]
			}
		}
	} );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-xmlmin' );

	// Default task.
	grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify', 'cssmin', 'xmlmin' ] );

};
