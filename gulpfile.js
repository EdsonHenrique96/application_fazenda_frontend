var gulp = require('gulp');
var {parallel} = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

function compileSass() {
  return gulp.src('src/assets/sass/style.scss')
    .pipe(sass().on('Error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'))
}

function autoprefixerCss() {
  return gulp.src('src/stylesheets/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/dist/stylesheets'))
};

exports.default = parallel(compileSass, autoprefixerCss);
