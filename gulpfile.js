const gulp = require('gulp');
const {parallel, series} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

function buildJs() {
  return gulp.src('public/javascripts/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/javascript'))
};

sass.compiler = require('node-sass');

function compileSass() {
  return gulp.src('public/sass/style.scss')
    .pipe(sass().on('Error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'))
}

function autoprefixerCss() {
  return gulp.src('public/stylesheets/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/dist/stylesheets'))
};

exports.default = parallel(buildJs, series(compileSass, autoprefixerCss));