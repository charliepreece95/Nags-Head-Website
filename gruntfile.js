'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        watch: {
            php: {
                files: ['public/index.php']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: 'public/index.php'
                },
                options: {
                    proxy: '127.0.0.1:8010', //our PHP server
                    port: 8080, // our new port
                    open: true,
                    watchTask: true
                }
            }
        },
        php: {
            dev: {
                options: {
                    port: 8010,
                    base: 'public'
                }
            }
        }
    });

    grunt.registerTask('default', ['php', 'browserSync', 'watch']);
};