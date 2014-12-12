'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    project: {
      app: ['app'],
      server: ['server'],
      scss: ['<%= project.app %>/sass/style.scss'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: ['<%= project.app %>/js/**/*.js', '<%= project.server %>/**/*.js']
    },

    jshint: {
      all: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['tests/**/*.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);

};
