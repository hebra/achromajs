/* global module:false */
/* eslint-disable */

const sass = require('sass');

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
        sass: {
            library: {
                options: {
                    implementation: sass,
                    sourceMap: true
                },
                files: {
                    'dist/achromajs/achromajs.css': 'src/library/achroma.scss',
                    'dist/achromajs/filters.css': 'src/filters/filters.scss'
                }
            }
        },
        copy: {
            assets: {
                files: [
                    {expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromeatic/assets/'},
                    {expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromafox/assets/'},
                    {expand: true, cwd: 'src/assets', src: '**', dest: 'dist/achromajs/assets/'},

                    {expand: true, cwd: 'src/filters', src: '**', dest: 'dist/achromeatic/'},
                    {expand: true, cwd: 'src/filters', src: '**', dest: 'dist/achromafox/'},
                    {expand: true, cwd: 'src/filters', src: '**', dest: 'dist/achromajs/'},
                ]
            },
            chrome: {
                files: [
                    {expand: true, cwd: 'src/chrome', src: 'manifest.json', dest: 'dist/achromeatic/'},
                    {expand: true, cwd: 'src/chrome', src: 'popup.html', dest: 'dist/achromeatic/'},
                    {expand: true, cwd: 'src/chrome', src: 'style.css', dest: 'dist/achromeatic/'},
                    {expand: true, cwd: 'dist/achromajs', src: 'filters.css', dest: 'dist/achromeatic/'}
                ]
            },
            firefox: {
                files: [
                    {expand: true, cwd: 'src/firefox', src: 'manifest.json', dest: 'dist/achromafox/'},
                    {expand: true, cwd: 'src/firefox', src: 'style.css', dest: 'dist/achromafox/'},
                    {expand: true, cwd: 'src/firefox', src: 'popup.html', dest: 'dist/achromafox/'},
                    {expand: true, cwd: 'dist/achromajs', src: 'filters.css', dest: 'dist/achromafox/'}
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
                src: ['dist/**/manifest.json'],
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
                src: ['src/common/default.css', 'dist/achromajs/achromajs.css', 'dist/achromajs/filters.css'],
                dest: 'dist/achromajs/combined.css',
            },
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
                            replacement: "<%= grunt.file.read('dist/achromajs/combined.css') %>"
                        }
                    ]
                }
            }
        },

        // Minify library JS
        terser: {
            library: {
                files: {
                    'dist/achromajs/achroma.min.js': ['dist/achromajs/achroma.js']
                }
            }
        },
        // zip-up release bundles
        compress: {
            achromajs: {
                options: {
                    archive: './release/achromajs-<%= pkg.version %>.zip',
                    mode: 'zip'
                },
                files: [{
                    src: ['**/*'],
                    cwd: 'dist/achromajs',
                    expand: true
                }]
            },
            achromeatic: {
                options: {
                    archive: './release/achromeatic-<%= pkg.version %>.zip',
                    mode: 'zip'
                },
                files: [{
                    src: ['**/*'],
                    cwd: 'dist/achromeatic',
                    expand: true
                }]
            },
            achromafox: {
                options: {
                    archive: './release/achromafox-<%= pkg.version %>.xpi',
                    mode: 'zip'
                },
                files: [{
                    src: ['**/*'],
                    cwd: 'dist/achromafox',
                    expand: true
                }]
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
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-terser');

    // Default task.
    grunt.registerTask('default',
        [
            'run',
            'sass:library',
            'copy:assets',
            'copy:chrome',
            'copy:firefox',
            'replace',
            'concat',
            'string-replace',
            'terser:library',
            'copy:tests']);

    grunt.registerTask('bundle',
        [
            'compress:achromajs',
            'compress:achromeatic',
            'compress:achromafox'
        ]);

};
