var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var sourcemaps = require('gulp-sourcemaps');
var watchLess = require('gulp-watch-less');
var watch = require('gulp-watch');
var rigger = require('gulp-rigger');
var livereload = require('gulp-livereload');

gulp.task('watch', ['build'], function () {
    // livereload.listen({
    //     host: 'http://cpt.dev'
    // });

    watch(['./less/**/*.less', './html/**/*.html'], function() {
        gulp.run('build');
    });
});

gulp.task('less', function () {
    return gulp.src('./less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
        //.pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('./html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./dist'));
        //.pipe(livereload());
});

gulp.task('build', function () {
    gulp.start(['html', 'less']);
});

gulp.task('default', function () {
    gulp.start(['build']);
});