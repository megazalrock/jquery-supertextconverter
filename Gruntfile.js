'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('superTextConverter.jquery.json'),
    banner:'/*! <%= pkg.title %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' *  Vertion : <%= pkg.version %>\n'+
      ' *  Dependencies : jQuery <%= pkg.dependencies.jquery %>\n'+
      ' *  Author : <%= pkg.author.name %>\n'+
      ' *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
      ' *  License : <%= pkg.license %>*/\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    less:{
      options:{
        banner: '<%= banner %>',
      },
      dist:{
        src:['src/*.less'],
        dest: 'dist/<%= pkg.name %>.css'
      },
      demo:{
        src:['demo/style.less'],
        dest: 'demo/style.css'
      }
    },
    cssmin:{
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= less.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.css'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less:{
        files: '<%= less.dist.src %>',
        tasks:['less','cssmin']
      },
      demo:{
        files:'<%= less.demo.src %>',
        tasks:['demo']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify','less','cssmin']);
  grunt.registerTask('test',['jshint', 'qunit']);

};
