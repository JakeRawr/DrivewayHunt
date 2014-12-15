'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    project: {
      app: ['app'],
      server: ['server'],
      scss: ['<%= project.app %>/sass/style.scss'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: ['<%= project.app %>/js/**/*.js', '<%= project.server %>/**/*.js']
    },

    jshint: {
      all: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js', 'tests/api/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js', 'tests/api/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      src: ['tests/**/*.js']
    },

    sass: {
      dist: {
        files: {
          'app/sass/style.css': '<%= project.scss %>'
        }
      }
    },

    watch: {
      sass: {
        files: ['<%= project.scss %>', 'sass/**/*.sass', 'views/**/*.html'],
        tasks: ['sass']
      },

      livereload: {
        files: ['<%= project.scss %>', 'views/**/*.html'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('sass', ['watch:sass', 'watch:livereload']);
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['sass']);

};
