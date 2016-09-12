'use strict';

var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    testConfig = require('./config/env/test'),
    fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            }

        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: defaultAssets.client.views,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: defaultAssets.client.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: defaultAssets.client.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            },
            clientSCSS: {
                files: defaultAssets.client.sass,
                tasks: ['sass', 'csslint'],
                options: {
                    livereload: true
                }
            },
            clientLESS: {
                files: defaultAssets.client.less,
                tasks: ['less', 'csslint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: {
                src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e),
                options: {
                    jshintrc: true,
                    node: true,
                    mocha: true

                }
            }
        },
        eslint: {
            options: {},
            target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e)
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: defaultAssets.client.css
            }
        },

        'node-inspector': {
            custom: {
                options: {
                    'web-port': 3000,
                    'web-host': 'localhost',
                    'debug-port': 50823,
                    'save-live-edit': true,
                    'no-preload': true

                }
            }
        },
        mochaTest: {
            src: testAssets.tests.server,
            options: {
                reporter: 'spec',
                timeout: 10000
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }

    });

    // Connect to the MongoDB instance and load the models
    grunt.task.registerTask('mongoose', 'Task that connects to the MongoDB instance and loads the application models.', function () {
        // Get the callback
        var done = this.async();

        // Use mongoose configuration
        var mongoose = require('./config/lib/mongoose.js');

        // Connect to database
        mongoose.connect(function (db) {
            done();
        });
    });

    // Drops the MongoDB database, used in e2e testing
    grunt.task.registerTask('dropdb', 'drop the database', function () {
        // async mode
        var done = this.async();

        // Use mongoose configuration
        var mongoose = require('./config/lib/mongoose.js');

        mongoose.connect(function (db) {
            db.connection.db.dropDatabase(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully dropped db: ', db.connection.db.databaseName);
                }
                db.connection.db.close(done);
            });
        });
    });

    grunt.task.registerTask('server', 'Starting the server', function () {
        // Get the callback
        var done = this.async();

        var path = require('path');
        var app = require(path.resolve('./config/lib/app'));
        var server = app.start(function () {
            done();
        });
    });


    // Run the project tests
    grunt.registerTask('test', ['env:test', 'lint', 'mkdir:upload', 'copy:localConfig', 'server', 'mochaTest', 'karma:unit', 'protractor']);
    grunt.registerTask('test:server', ['env:test', 'lint', 'server', 'mochaTest']);
    // Run the project in development mode
    grunt.registerTask('default', ['env:dev', 'lint', 'mkdir:upload', 'copy:localConfig', 'concurrent:default']);

    // Run the project in debug mode
    grunt.registerTask('debug', ['env:dev', 'lint', 'mkdir:upload', 'copy:localConfig', 'concurrent:debug']);

}


