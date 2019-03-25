var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var sassLint = require('gulp-sass-lint');

var ls = 2;

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('scss/voltaire.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    // .pipe(browserSync.reload({
    //   stream: true
    // }))
});


gulp.task('sass-lint', function () {
  return gulp.src('scss/**/*.s+(a|c)ss')
    .pipe(sassLint({
      options: {
        formatter: 'stylish'
      },
      rules: {
        'empty-line-between-blocks': ls,
        'no-misspelled-properties': ls,
        'no-trailing-whitespace': ls,
        'quotes': ls,
        'trailing-semicolon': ls,
        'declarations-before-nesting': ls,
        'variable-name-format': ls,
        'no-color-literals': ls,
        'leading-zero': ls,
        'attribute-quotes': ls,
        'border-zero': ls,
        'declarations-before-nesting': ls,
        'force-attribute-nesting': ls,
        'force-element-nesting': ls,
        'force-pseudo-nesting': ls,
        'space-after-colon': ls,
        'space-after-comma': ls,
				'indentation': 0,
        'clean-import-paths': 0,
        'property-sort-order': 0,
        'nesting-depth': 0,
        'class-name-format': 0,
        'no-duplicate-properties': 0,
        'no-vendor-prefixes': 0,
        'final-newline': 0,
        'empty-line-between-blocks': 0,
        'no-transition-all': 0,
        'no-ids': 0,
        'no-important': 0,
        'no-css-comments': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});




// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('css/voltaire.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('js/voltaire.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))

  gulp.src(['node_modules/js-offcanvas/dist/**/*','node_modules/js-offcanvas/vendor/*'])
    .pipe(gulp.dest('vendor/js-offcanvas'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))

  gulp.src(['node_modules/jquery-scrollify/*.js'])
    .pipe(gulp.dest('vendor/jquery-scrollify'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'))
})

// Default task
gulp.task('default', ['sass-lint', 'sass', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['sass-lint', 'sass', 'minify-css', 'minify-js', 'browserSync'], function() {
  gulp.watch('scss/*.scss', ['sass-lint', 'sass']);
  gulp.watch('css/voltaire.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
