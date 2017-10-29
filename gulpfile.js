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