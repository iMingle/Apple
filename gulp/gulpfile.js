var gulp = require('gulp'),
    less = require('gulp-less'),
    lr = require('tiny-lr'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/'))
        .pipe(notify({
            message: 'less completed'
        }));
});

gulp.task('watch', function () {
    browserSync.init({
        proxy: 'localhost:63343',
        files: ['src/less/*.less', 'src/**/*.html']
    });

    gulp.watch('src/less/*.less', ['less']);
});
