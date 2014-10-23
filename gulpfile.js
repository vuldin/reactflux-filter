var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var mainFile = 'src/js/main.js';
var paths = {
  html:'src/index.html',
  style:'src/style/*.css',
  script:'src/js/**/*.js'
}

gulp.task('script',function(){
  gulp.src(mainFile)
    .pipe(browserify({transform:'reactify'}))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('glyphicon',function(){
  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('bootstrap',['glyphicon'],function(){
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('src/style'));
});

//gulp.task('style',['bootstrap'],function(){
gulp.task('style',function(){
  gulp.src(paths.style)
    .pipe(concat('bundle.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/style'));
});

gulp.task('html',function(){
  gulp.src(paths.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('default',['script','style','html']);

gulp.task('watch',function(){
  gulp.watch('src/**/*.*',['default']);
});
