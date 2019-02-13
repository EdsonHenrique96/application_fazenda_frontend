var gulp = require('gulp');
var {series} = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

function compileSass() {
  return gulp.src('src/assets/sass/style.scss')
    .pipe(sass().on('Error', sass.logError))
    .pipe(gulp.dest('src/assets/stylesheets'))
}

function autoprefixerCss() {
  return gulp.src('src/assets/stylesheets/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/dist/stylesheets'))
};

exports.default = series(compileSass, autoprefixerCss);
