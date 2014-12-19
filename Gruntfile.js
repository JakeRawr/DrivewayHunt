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
  grunt.loadNpmTasks('grunt-mongoimport');

  grunt.initConfig({
    project: {
      app: ['app'],
      server: ['server'],
      scss: ['<%= project.app %>/sass/**/*.scss',  'app/sass/**/*.sass'],
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
      src: ['tests/api/*.js']
    },

    mongoimport: {
      options: {
        db: 'gsale_development',
        host: 'localhost',
        port: '27017',
        stopOnError: true,
        collections: [
          {
            name: 'items',
            type: 'json',
            file: 'tests/test_data/items.json',
            jsonArray: true,
            upsert: true,
            drop: true
          },
          {
            name: 'sales',
            type: 'json',
            file: 'tests/test_data/sales.json',
            jsonArray: true,
            upsert: true,
            drop: true
          },
          {
            name: 'users',
            type: 'json',
            file: 'tests/test_data/users.json',
            jsonArray: true,
            upsert: true,
            drop: true
          }
        ]
      }
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
        files: '<%= project.scss %>',//['<%= project.scss %>','<%= project.css %>', 'sass/**/*.sass', '<%= project.html %>'],
        tasks: ['sass'],
        options: {
          reload: true,
          livereload: 3000
        }
      },
      livereload: {
        files: 'app/sass/style.css',
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
        src: ['index.html', 'js/templates/**/*.html', 'sass/style.css', 'img/**/*.*', 'fonts/**/*.*', 'sass/style.css.map'],
        dest: 'build/'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.registerTask('sass:watch', ['watch:sass', 'watch:livereload']);
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha', 'browserify:test', 'karma:unit']);
  grunt.registerTask('build', ['clean', 'sass', 'browserify:dev', 'browserify:test', 'copy:dev']);
  grunt.registerTask('build:basic', ['clean', 'sass', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test:client', ['browserify:test', 'karma:unit']);
};
