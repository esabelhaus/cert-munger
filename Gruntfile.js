module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      files: ['./lib/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        maxdepth: 2,
        maxcomplexity: 4,
        strict: true,
        undef: false,
        eqeqeq: true
      },
    },
    plato: {
      coverage: {
        options: {
          maxdepth: 2,
          maxcomplexity: 4,
          strict: true,
          undef: false,
          eqeqeq: true
        },
        files: {
          'plato': ['lib/cert-munger.js']
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js'],
        options: {
          captureFile: 'mocha/results.txt'
        }
      }
    }
  });
  //grunt
  grunt.registerTask('default', ['jshint', 'mochaTest']);
  //individual testing tasks
  grunt.registerTask('plato', ['plato:coverage']);
  grunt.registerTask('mocha', ['mochaTest']);

  //load packages
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
