const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

// gulp.task('default', () => {
//   return gulp.src('public/javascripts/*.js')
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(gulp.dest('public/dist'))
// });

gulp.task('default', () => {
  return gulp.src('public/stylesheets/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/dist/css'))
});
