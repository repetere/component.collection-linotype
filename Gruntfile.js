/*
 * linotype
 * http://github.com/typesettin/linotype
 *
 * Copyright (c) 2014 typesettin. All rights reserved.
 */
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jsbeautifier: {
      files: ["<%= jshint.all %>"],
      options: {
        "indent_size": 2,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "eval_code": false,
        "indent_case": false,
        "unescape_strings": false,
        "space_after_anon_function": true
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'config/**/*.js',
        'index.js',
        'lib/**/*.js',
        'routes/**/*.js',
        'test/**/*.js',
        'client/**/*.js',
      ]
    },
    jsdoc : {
        dist : {
            src: ['lib/*.js', 'test/*.js'],
            options: {
                destination: 'doc/html',
                configure: 'jsdoc.json'
            }
        }
    },
    browserify: {
      dist: {
        files: {
          'example/build/main.js': ['client/scripts/**/*.js'],
          'example/test/test.js': ['client/test/scripts/test_main.js'],
          'example/test/test-normalscroll.js': ['client/test/scripts/test_normalscroll.js'],
          'example/test/test-backgrounds.js': ['client/test/scripts/test_backgrounds.js'],
          'example/test/test-video.js': ['client/test/scripts/test_video.js'],
          'example/test/test-callback.js': ['client/test/scripts/test_callback.js'],
          'example/test/test-fixedheaders.js': ['client/test/scripts/test_fixedheaders.js'],
          'example/test/test-scroll.js': ['client/test/scripts/test_scroll.js'],
          // 'build/main.js': ['client/scripts/**/*.js', 'client/scripts/**/*.coffee'],
        },
        options: {
          // transform: ['coffeeify']
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["client/stylesheets"],
          yuicompress: true
        },
        files: {
          "example/build/linotype.css": ['client/stylesheets/**/*.less']
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          // {expand: true, src: ['assets/**'], dest: '../module/assets/'},

          // makes all src relative to cwd
          // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
        ]
      }
    },
    watch: {
      scripts: {
        // files: '**/*.js',
        files: [
          'Gruntfile.js',
          'config/**/*.js',
          'index.js',
          'lib/**/*.js',
          'client/**/*.js',
          'client/**/*.less',
          'test/**/*.js',
        ],
        tasks: ['lint','browserify',/*'doc',*/ 'test','less'],
        options: {
          interrupt: true
        }
      }
      // files: "./assets/stylesheets/less/*",
      // tasks: ["less"]
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('doc','jsdoc');
  grunt.registerTask('test', 'simplemocha');
};
