/**
 * Gulpfile
 * ---
 * Installation
 * yarn add gulp gulp-sass gulp-postcss gulp-sourcemaps autoprefixer postcss-reporter css-mqpacker del postcss-assets gulp-imagemin gulp-svgstore gulp-cheerio
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

var reporter = require('postcss-reporter');
var mqpacker = require('css-mqpacker');
var del = require('del');

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
       })
   ];

  return gulp.src('templates/src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('templates/css'));
    .pipe(notify({ message: 'Styles task complete' }));
});

/**
 * Scripts
 */
 gulp.task('scripts', function() {
   return gulp.src(['templates/src/js/**/*.js'])
     .pipe(gulp.dest('templates/js'))
     .pipe(notify({ message: 'Scripts task complete' }));
 });

/**
 * Images
 */
 gulp.task('images', function() {
   return gulp.src('templates/src/img/*')
     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
     .pipe(gulp.dest('templates/img'))
     .pipe(notify({ message: 'Images task complete' }));
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
     .pipe(notify({ message: 'Icons task complete' }));
 });

/**
 * Clean
 */
 gulp.task('clean', function() {
   return del(['templates/css/**', 'templates/js/**', 'templates/img/**']);
 });
