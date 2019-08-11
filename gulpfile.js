const gulp = require('gulp')
const del = require('del');
const fileinclude = require('gulp-file-include')
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync')
const runSequence = require('run-sequence').use(gulp);
const url = require('url');
const path = require('path');
const fs = require('fs');


const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const fileMatch = {
  widgets: 'src/widgets/*.html',
  pages: 'src/pages/*.html',
  scripts: 'src/scripts/*.js',
  libs: 'src/libs/*',
  assets: 'src/assets/*',
  style: 'src/style/*.{css,less}',
}

gulp.task('clean', del.bind(null, ['dist/*', '!dist/.git'], {dot: true}));

// Images
gulp.task('images', function () {
  return gulp.src(fileMatch.assets)
    .pipe(gulp.dest('dist/assets'));
});

// libs
gulp.task('libs', function () {
  return gulp.src(fileMatch.libs)
    .pipe(gulp.dest('dist/libs'));
});

// scripts
gulp.task('scripts', function () {
  return gulp.src(fileMatch.scripts)
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('pages', function() {
  return gulp.src([fileMatch.pages])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'src/widgets',
      indent: true
    }))
    .pipe(gulp.dest('dist/pages'))
})

gulp.task('style', function() {
  return gulp.src([fileMatch.style])
    .pipe($.less())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/style'));
})

// Build
gulp.task('build', ['clean'], function (cb) {
  runSequence(['images', 'libs', 'pages', 'style', 'scripts'], cb);
});
    
/*
 *静态页面html实时预览
 */
gulp.task('server', ['build'], function(done) {
  browserSync({
    notify: false,
    server: {
      baseDir: './dist',
      middleware: function (req, res, cb) {
        var uri = url.parse(req.url);
        if (uri.pathname.length > 1 &&
          path.extname(uri.pathname) === '' &&
          fs.existsSync('./dist' + uri.pathname + '.html')) {
            req.url = uri.pathname + '.html' + (uri.search || '');
        }
        cb();
      }
    }
  });

  gulp.watch(fileMatch.images, ['images']);
  gulp.watch(fileMatch.style, ['style']);
  gulp.watch(fileMatch.libs, ['libs']);
  gulp.watch(fileMatch.scripts, ['scripts']);
  gulp.watch([fileMatch.widgets, fileMatch.pages, fileMatch.style], ['pages']);

  gulp.watch('./dist/**/*.*').on('change', function(path) {
    browserSync.reload()
  })
})

gulp.task('default', ['server']);