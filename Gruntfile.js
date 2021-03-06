/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
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
        globals: {
          angular: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src_test: {
        src: ['src/**/*.js']
      }
    },
    tests: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src_test: {
        files: '<%= jshint.src_test.src %>',
        tasks: ['jshint:src_test']
      }
    },
    copy: {
      test: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            'src/<%= pkg.name %>.js',
          ],
          dest: 'test/fixtures',
          filter: 'isFile'
        }]
      },
      dropbox: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            'heroku/*',
            'test/fixtures/*',
          ],
          dest: '../../Dropbox/Apps/Heroku/<%= pkg.name %>',
          filter: 'isFile'
        }, {
          expand: true,
          cwd: 'test/fixtures/vendor',
          src: [
            '**/{angular,iscroll}.js',
          ],
          dest: '../../Dropbox/Apps/Heroku/<%= pkg.name %>/vendor',
          filter: 'isFile'
        }]
      }
    },
    protractor: {
      options: {
        configFile: "test/conf.js"
      },
      all: {},
    },
    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('test', ['copy:test', 'connect', 'protractor']);
  grunt.registerTask('copy-demo-to-dropbox', ['copy:test', 'copy:dropbox']);

};
