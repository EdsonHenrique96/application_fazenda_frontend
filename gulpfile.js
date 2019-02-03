const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
  return gulp.src('public/javascripts/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
});
