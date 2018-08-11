let gulp = require('gulp'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  usemin = require('gulp-usemin'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify');
  rev = require('gulp-rev');

  gulp.task('deleteDistFolder', function () {
    return del('./docs');
  });

  gulp.task('optimizeImages', ['deleteDistFolder'], function () {
    return gulp.src(['./app/assets/images/**/*.jpg', './app/assets/images/**/*.png', './app/assets/images/**/*.gif'])
      .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 })]))
      .pipe(gulp.dest('./docs/assets/images'))
  });

  gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function () {
    return gulp.src('./app/index.html')
      .pipe(usemin({
        css: [function () {return rev()}, function () {return cssnano()}],
        js: [function () {return rev()}, function () {return uglify()}]
      }))
      .pipe(gulp.dest('./docs'))
  });

  gulp.task('copyDataFiles', function () {
    return gulp.src(['./app/home.html', './app/portfolio.html'])
      .pipe(gulp.dest('./docs'));
  });
  gulp.task('copyFonts', function () {
    return gulp.src('./app/temp/fonts/*')
      .pipe(gulp.dest('./docs/assets/fonts'));
  });

  gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin'], function () {
    gulp.start('copyDataFiles');
    gulp.start('copyFonts');
  });