var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('start', function () {
    nodemon({
        script: './dev/dev.js',
        env: { 'NODE_ENV': 'development', 'PORT': 8080 }
    });
    gulp.start(['watch-less']);
});

gulp.task('watch-less', function() {
    gulp.start(['less']);
    gulp.watch('./style/*.less', ['less']);
});

gulp.task('less', function () {
    return gulp.src('./style/style.less')
    .pipe(less())
    .pipe(gulp.dest('./style/'));
});
