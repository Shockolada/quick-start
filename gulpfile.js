'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const fileinclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const svgssprite = require('gulp-svgstore');
const del = require('del');
const debug = require('gulp-debug');
const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');

const dist = './build/',
  src = './source/';


/* HTML */
gulp.task('html', () => {
  return gulp.src(src + '*.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(fileinclude())
    .pipe(gulp.dest(dist));
});


/* STYLES */
gulp.task('styles', () => {
  return gulp.src(src + 'sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(server.stream())
    .pipe(sourcemaps.write('.'));
});


/* CSS */
gulp.task('css', () => {
  return gulp.src(src + 'css/**/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(minify())
    .pipe(gulp.dest(dist + 'css'))
    .pipe(server.stream());
});


/* JAVASCRIPT */
gulp.task('build-js', () => {
  return gulp.src(src + 'js/main.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'bundle.js'
      },
      watch: false,
      devtool: 'source-map',
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(src + 'js'));
    // .on('end', server.reload);
});

/* SCRIPTS */
gulp.task('concat', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    src + 'js/bundle.js',
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist + 'js'));
});

gulp.task('scripts', gulp.series('build-js', 'concat', done => {
  done();
}));


/* SERVER */
gulp.task('server', () => {
  server.init({
    server: './build/',
    notify: true,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(src + '**/*.html', gulp.parallel('html')).on('change', server.reload);
  gulp.watch([src + 'js/**/*.js', '!' + src + 'js/bundle.js'], gulp.series('scripts')).on('change', server.reload);
  gulp.watch(src + 'sass/**/*.{scss,sass}', gulp.parallel('styles'));
  gulp.watch(src + 'css/**/*.css', gulp.parallel('css'));
  gulp.watch([src + 'img/**/*.{png,jpg,svg}', '!src/img/svg/**/*.*'], gulp.parallel('imagesmin')).on('change', server.reload);
  gulp.watch(src + 'img/svg/**/*.svg', gulp.parallel('svgsprite'));
  gulp.watch(src + 'fonts/**/*.*', gulp.parallel('copy')).on('change', server.reload);
});


/* SVG SPRITES */
gulp.task('svgsprite', () => {
  return gulp.src(src + 'img/svg/**/*.svg')
    .pipe(svgssprite({
      inlineSvg: true
    }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(dist + 'img'));
});


/* MINIFY IMAGES */
gulp.task('imagesmin', async () => {
  gulp.src([src + 'img/**/*.{png,jpg,svg}', '!' + src + 'img/svg/**/*.*'])
    .pipe(newer(dist + 'img')) // Пропускает только новые изображения, или если дата модификации более поздняя
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(debug({
      title: 'imagesmin'
    }))
    .pipe(gulp.dest(dist + 'img'));
});


/* IMAGES */
gulp.task('images', gulp.series('svgsprite', 'imagesmin', done => {
  done();
}));


/* COPY FILES FROM SRC */
gulp.task('copy', () => {
  return gulp.src([
      src + 'fonts/**/*.{woff,woff2,otf,ttf,eot}',
      src + 'favicons/**/*.*',
    ], {
      base: 'src'
    }, {since: gulp.lastRun('copy')})
    .pipe(newer(dist)) // Сверяет файлы в исходной и конечной папке, 
    // пропуская если файла нет или дата модификации новее
    .pipe(debug({
      title: 'copy' // Показывает какие файлы скопированы
    }))
    .pipe(gulp.dest(dist));
});


/* On error message in plumber */
let onError = (err) => {
  notify.onError({
    title: err.plugin,
    message: err.message
  })(err);
  // this.emit('end');
};


/* REMOVE OLD dist */
gulp.task('clean', () => {
  return del(dist);
});


/* TASKS */
gulp.task('build', gulp.parallel('styles', 'copy', 'css', 'html', 'scripts', 'images'));
gulp.task('default', gulp.series('build', 'server'));


/* PRODUCTION */
/* JS */
gulp.task('build-js-prod', () => {
  return gulp.src(src + 'js/main.js')
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'main.js'
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(dist + 'js'));
});

/* STYLES */
gulp.task('styles-prod', () => {
  return gulp.src(src + 'sass/style.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dist + 'css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dist + 'css'));
});

gulp.task('build-prod', gulp.parallel('copy', 'styles-prod', 'html', 'css', 'build-js-prod', 'images'));

gulp.task('production', gulp.series('clean', 'build-prod'));
gulp.task('watch-production', gulp.series('clean', 'build-prod', 'server'));
