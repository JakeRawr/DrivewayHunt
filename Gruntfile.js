'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    project: {
      app: ['app'],
      server: ['server'],
      scss: ['<%= project.app %>/sass/**/*.scss'],
      css: ['<%= project.app %>/**/*.css', '!<%= project.app %>/sass/**/*.*'],
      html: ['<%= project.app %>/**/*.html'],
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
          'app/sass/style.css': '<%= project.app %>/sass/style.scss'
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
    },

    browserify: {
      dev: {
        src: ['<%= project.app %>/js/**/*.js'],
        dest: 'build/app_bundle.js',
        options: {
          transform: ['debowerify']
        }
      },

      test: {
        src: ['tests/app/**/*.js'],
        dest: 'tests/angular_test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    clean: {
      src: ['build/']
    },

    copy: {
      dev: {
        cwd: 'app',
        expand: true,
        src: ['index.html', 'js/templates/**/*.html', 'sass/style.css', 'img/**/*.*', 'fonts/**/*.*'],
        dest: 'build/'
      }
    }
  });

  grunt.registerTask('sass:watch', ['watch:sass', 'watch:livereload']);
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'sass', 'browserify:dev', 'browserify:test', 'copy:dev']);

};
