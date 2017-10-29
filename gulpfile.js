'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var suffix = require('gulp-rename');
var rigger = require('gulp-rigger');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rimraf = require('rimraf');
var removeHtmlComments = require('gulp-remove-html-comments');
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var gulpsync = require('gulp-sync')(gulp);

var path = {
  build: {
  html: 'build/',
  js: 'build/js/',
  css: 'build/css/',
  img: 'build/img/',
  fonts: 'build/fonts/'
},
src: {
  html: 'src/*.html',
  js: 'src/js/registration.js',
  jquery: 'src/js/jquery-3.2.1.min.js',
  style: 'src/css/registration.css',
  bootstrap: 'src/css/bootstrap.min.css',
  img: 'src/img/**/*.*',
  fonts: 'src/fonts/**/*.*'
},
watch: {
  html: 'src/**/*.html',
  js: 'src/js/**/*.js',
  style: 'src/css/**/*.css',
  img: 'src/img/**/*.*',
  fonts: 'src/fonts/**/*.*'
},
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8080,
  logPrefix: "Artes2517"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html)
  .pipe(rigger())
  .pipe(gulp.dest(path.build.html))
  .on('end', function () {
    gulp.src(path.build.html + 'index.html')
    .pipe(inject(gulp.src('./build/js/*.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src('./build/css/*.css', {read: false}), {relative: true}))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest(path.build.html));
  })
  .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
  .pipe(rigger())
  .pipe(uglify())
  .pipe(suffix({suffix: '.min'}))
  .pipe(gulp.dest(path.build.js))
  .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
  .pipe(sass())
  .pipe(prefixer())
  .pipe(cssmin())
  .pipe(suffix({suffix: '.min'}))
  .pipe(gulp.dest(path.build.css))
  .pipe(reload({stream: true}));
});

gulp.task('move:jquery', function(){
  gulp.src(path.src.jquery)
  .pipe(gulp.dest(path.build.js))
});

gulp.task('move:boostrap', function(){
  gulp.src(path.src.bootstrap)
  .pipe(gulp.dest(path.build.css))
});