var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),//css合并
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    autoprefixer = require('gulp-autoprefixer');//增加后缀
// 合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src('public/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 5 versions','Android >= 4.0']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/dist/css'))
    .pipe(notify({ message: 'css task ok' }));
});
