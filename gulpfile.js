'use strict';
var del = require('del');
var runSequence = require('run-sequence');
var psi = require('psi');
var ngrok = require('ngrok');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var jsMinify = require('gulp-minify');
var cssMinify = require('gulp-clean-css');
var htmlMinify = require('gulp-htmlmin');

// global constants
var portVal = 8000;
var site = '';

// default task
gulp.task('default', ['psi'], function () {
    process.exit();
});

gulp.task('start', ['build', 'watch']);

// Build dist
gulp.task('build', function (done) {
    runSequence(
        'clean',
        'minify.js',
        'minify.css',
        'minify.html',
        'copy',
        done
    );
});

gulp.task('clean', function (done) {
    cleanDir('dist', done);
});

gulp.task('minify.js', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(jsMinify({}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify.css', function () {
    return gulp.src(['src/**/*.css'])
        .pipe(cssMinify({}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify.html', function () {
    return gulp.src(['src/**/*.html'])
        .pipe(htmlMinify({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    return gulp.src([
        'src/**/*',
        '!src/**/*.js',
        '!src/**/*.css',
        '!src/**/*.html'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch([
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.html'
    ], ['build.dist']);
});

// test performance
gulp.task('browser-sync-psi', function() {
    browserSync({
        port: portVal,
        open: false,
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('ngrok', function(done) {
    return ngrok.connect(portVal, function (err, url) {
        site = url + '/index.html';
        console.log('serving your tunnel from: ' + site);
        done();
    });
});

gulp.task('desktop', function () {
    return psi(site, {
        nokey: 'true',
        strategy: 'desktop'
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

gulp.task('mobile', function () {
    return psi(site, {
        nokey: 'true',
        strategy: 'mobile'
    }).then(function (data) {
        console.log('Speed: ' + data.ruleGroups.SPEED.score);
        console.log('Usability: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('psi', function (done) {
    runSequence(
        'build',
        'browser-sync-psi',
        'ngrok',
        'desktop',
        'mobile',
        done
    );
});

// helper func to clean dir
function cleanDir(dir, done) {
    del(dir).then(function () {
        done();
    });
}