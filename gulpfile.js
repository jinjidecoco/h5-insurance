'use strict';
// 引入gulp
var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    concat=require('gulp-concat'),
    change=require('gulp-changed'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    queue = require('gulp-sequence'),   
    css = './static/css',
    lessAll=['static/less/main.less'];

gulp.task("less",function(){
    return gulp.src(lessAll)
     // .pipe(sourcemaps.init() )
     .pipe(change(css))
     .pipe(less())
     // .pipe(concat('main.css'))
     .pipe( gulp.dest( css ) );
});

gulp.task("watch",function(event){
    var less_watch = lessAll.concat('./static/less/**/*');
    gulp.watch(less_watch,function(){
        queue('less')(function(){
            gulp.src('./').pipe(connect.reload());
        });
    }); 
    gulp.watch( './*.html', function(){
        gulp.src('./').pipe(connect.reload());
    });   
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 8090
    });
});
gulp.task("dev", function(cb){
    queue('less', 'connect', 'watch')(cb)
});
