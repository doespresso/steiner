module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        bootstrap_folder:'dev/component/bootstrap_get',
        sass: {
            dist: {
                files: {
                    'assets/js/vendor/mmenu/src/css/jquery.mmenu.all.css':'assets/js/vendor/mmenu/src/scss/jquery.mmenu.all.scss'
                }
            },
        },
        less:{
            development:{
                options:{
                    compress:true,
                    cleancss:true,
                    optimization:2
                },
                files:{
                    "assets/css/app.min.css":[
                        "dev/component/less/global.less",
//                        "dev/component/bootstrap-jasny/less/bootstrap.less",
//                        "dev/component/swiper/dev/idangerous.swiper.css",
//                        "dev/component/pace/themes/pace-theme-flat-top.css",
                    ],
                }
            }
        },
        copy: {
            lightbox_js:{src:'dev/component/magnific-popup/dist/jquery.magnific-popup.min.js',dest:'assets/js/vendor/magnific-popup/jquery.magnific-popup.min.js'},
            lightbox_css:{src:'dev/component/magnific-popup/dist/magnific-popup.css',dest:'assets/js/vendor/magnific-popup/magnific-popup.css'},
            swiper_css:{src:'dev/component/swiper/dist/idangerous.swiper.css',dest:'dev/component/less/sliders/idangerous.swiper.less'},
            swiper3dflow_css:{src:'dev/component/swiper-3d-flow/dist/idangerous.swiper.3dflow.css',dest:'dev/component/less/sliders/idangerous.swiper.3dflow.less'},
            swiper_smooth_progress_js:{src:'dev/component/swiper-smooth-progress/dist/idangerous.swiper.progress.min.js',dest:'assets/js/vendor/swiper/idangerous.swiper.progress.min.js'},
            swiper_3dflow_js:{src:'dev/component/swiper-3d-flow/dist/idangerous.swiper.3dflow.min.js',dest:'assets/js/vendor/swiper/idangerous.swiper.3dflow.min.js'},
            swiper_scrollbar_js:{src:'dev/component/swiper-scrollbar/dist/idangerous.swiper.scrollbar.min.js',dest:'assets/js/vendor/swiper/idangerous.swiper.scrollbar.min.js'},
            mmenu_js:{src:'dev/component/jQuery.mmenu/src/js/jquery.mmenu.min.all.js',dest:'assets/js/vendor/mmenu/src/js/jquery.mmenu.min.all.js'},
        },
        concat:{
            app:{
                src:['dev/component/modernizr/modernizr.full.js', 'dev/src/app/starter.js'],
                dest:'dev/src/app/starter-with-modernizr.js'
            },

            bootstrap:{
                src:[
                    '<%= bootstrap_folder %>/js/transition.js',
                    '<%= bootstrap_folder %>/js/alert.js',
                    '<%= bootstrap_folder %>/js/button.js',
                    '<%= bootstrap_folder %>/js/carousel.js',
                    '<%= bootstrap_folder %>/js/collapse.js',
                    '<%= bootstrap_folder %>/js/dropdown.js',
                    '<%= bootstrap_folder %>/js/modal.js',
                    '<%= bootstrap_folder %>/js/tooltip.js',
                    '<%= bootstrap_folder %>/js/popover.js',
                    '<%= bootstrap_folder %>/js/scrollspy.js',
                    '<%= bootstrap_folder %>/js/tab.js',
                    '<%= bootstrap_folder %>/js/affix.js',
                ],
                dest:'<%= bootstrap_folder %>/bootstrap.js'
            },
        },


        uglify:{
            pace:{files:{'assets/js/vendor/pace/pace.min.js':['dev/component/pace/pace.js']}},
            jquery:{files:{'assets/js/vendor/jquery/jquery.min.js':['dev/component/jquery/dist/jquery.js']}},
            bootstrap:{files:{'assets/js/vendor/bootstrap/bootstrap.min.js':['<%= concat.bootstrap.dest %>']}},
            underscore:{files:{'assets/js/vendor/underscore/underscore.min.js':['dev/component/underscore/underscore.js']}},
            app:{files:{'assets/js/app/starter.min.js':['dev/src/app/starter-with-modernizr.js']}},
            backbone:{files:{'assets/js/vendor/backbone/backbone.min.js':['dev/component/backbone/backbone.js']}},
            marionette:{files:{'assets/js/vendor/backbone/marionette.min.js':['dev/component/backbone.marionette/lib/backbone.marionette.js']}},
            snap_svg:{files:{'assets/js/vendor/snap.svg/snapsvg.min.js':['dev/component/Snap.svg/dist/snap.svg.js']}},
            swiper:{files:{'assets/js/vendor/swiper/swiper.min.js':['dev/component/swiper/dist/idangerous.swiper.js']}},
//            swiper_progress:{files:{'assets/js/vendor/swiper/swiper_progress.min.js':['dev/component/swiper/plugins/smooth-progress/idangerous.swiper.progress.js']}},
            switchery:{files:{'assets/js/vendor/switchery/switchery.min.js':['dev/component/switchery/dist/switchery.js']}},
//            mmenu:{files:{'assets/js/vendor/mmenu/src/js/jquery.mmenu.min.all.js':['dev/component/jQuery.mmenu/src/js/jquery.mmenu.min.all.js']}},
        },


        jshint:{
            options:{
                smarttabs:true
            }
        },

        watch:{
            options: {
                  livereload: true,
                },
            styles:{
                files:[
                    'dev/component/less/global.less',
                    'dev/component/less/*.less',
                    'dev/component/less/**/*.less',
                    'dev/component/**/**/*.less',
                    'assets/js/vendor/mmenu/src/scss/*.scss',
                    'assets/js/vendor/mmenu/src/scss/**/*.scss',
                ],
                tasks:[
                    'copy',
                    'sass',
                    'less',
                ],
                options:{
                    nospawn:true
                }
            },
            scripts:{
                files:[
                    'gruntfile.js',
                    'dev/src/**/*.js',
                    'dev/component/**/*.js',
                    'assets/js/app/social-snap.js',
                ],
                tasks:[
                    'concat',
                    'copy',
                    'uglify',
//                    'less'
                ]
            }
        }

    });
//    grunt.loadNpmTasks('grunt-contrib-requirejs');
//    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-csso');
//    grunt.loadNpmTasks('grunt-jslint');
//    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [
        'sass',
        'copy',
        'concat',
        'less',
        'uglify',
//        'watch'
    ]);
};