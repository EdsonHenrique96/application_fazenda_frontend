var gulp = require('gulp');
var {parallel, series} = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function buildJs(watch) {
  var bundler = watchify(browserify('public/javascripts/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('public/dist/javascripts'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return buildJs(true);
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
