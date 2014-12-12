module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'app/sass/**/*.sass': 'sass/app.sass',
          'stylesheets/other-app.css': 'sass/app.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['sass/**/*.sass', 'sass/**/*.scss', 'views/**/*.html', 'views/**/*.ejs'],
        tasks: ['sass']
      },
      livereload: {
        files: ['sass/**/*.sass', 'sass/**/*.scss', 'views/**/*.html', 'views/**/*.ejs'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['sass']);
};
