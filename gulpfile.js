/**
 * Gulpfile
 * ---
 * Installation
 * yarn add gulp gulp-sass gulp-postcss gulp-sourcemaps autoprefixer cssnano postcss-reporter css-mqpacker del gulp-plumber gulp-connect postcss-assets gulp-imagemin gulp-svgstore gulp-cheerio gulp-plumber inuitcss
 * During development run:
 * gulp
 *
 * Build your project before commit:
 * gulp build
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sorting = require('postcss-sorting');

var reporter = require('postcss-reporter');
var mqpacker = require('css-mqpacker');
var del = require('del');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect')

var assets  = require('postcss-assets');
var imagemin = require('gulp-imagemin');

var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');

/**
 * Styles
 */
gulp.task('styles', function() {

  /**
   * Setup PostCSS Proprocessors
   */
   var processors = [
     autoprefixer({ browsers: ['last 2 versions'] }),
     mqpacker,
     assets(
       {
         basePath: 'templates/src/',
         loadPaths: ['img/'],
         relative: true,
         cachebuster: true
        }),
     cssnano({
       discardComments: {
         removeAll: true
       }
     }),
     sorting({})
   ];

  return gulp.src('templates/src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('templates/css'))
    .pipe(connect.reload());
});

/**
 * Scripts
 */
 gulp.task('scripts', function() {
   return gulp.src(['templates/src/js/**/*.js'])
    .pipe(gulp.dest('templates/js'))
    .pipe(connect.reload());
 });

/**
 * Images
 */
 gulp.task('images', function() {
   return gulp.src('templates/src/img/*')
     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(gulp.dest('templates/img'))
 });

/**
 * SVG icons
 */
 gulp.task('icons', function () {
   return gulp.src('templates/src/icons/*')
     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
     .pipe(cheerio({
       run: function ($, file) {
           $('svg').addClass('hide');
           $('[fill]').removeAttr('fill');
           $('[stroke]').removeAttr('stroke');
       },
       parserOptions: { xmlMode: true }
     }))
     .pipe(gulp.dest('templates/img'))
 });

 /**
  * Connect
  */
  gulp.task('connect', function() {
    connect.server({
      root: 'templates',
      livereload: true
    });
  });

/**
 * Clean
 */
 gulp.task('clean', function() {
   return del(['templates/css/**', 'templates/js/**', 'templates/img/**']);
 });

/**
 * Watch Task
 */
 gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('templates/src/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('templates/src/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('templates/src/img/**/*', ['images']);

    // Watch icon files
    gulp.watch('templates/src/icons/*', ['icons']);

 });

/**
 * Default
 */
gulp.task('default', ['connect', 'styles', 'scripts', 'images', 'icons', 'watch']);
