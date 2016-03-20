var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var exit = require('gulp-exit');

var paths = {
    sources: [
        './app/**/*.js'
    ],
    tests: [
        './tests/specs/**/*.js'
    ]
}

gulp.task('testConfig', function() {
    process.env.NODE_ENV = 'test';
});

gulp.task('test', ['testConfig'], function() {
    // return gulp.src('./app/**/*.js')
    return gulp.src(paths.sources)
        // Right there
        .pipe(istanbul({includeUntested: true}))
        // .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            // gulp.src(paths.tests, {
            gulp.src(paths.tests, {
                read: false
            })
            .pipe(mocha({
                recursive: true,
                reporter: 'spec',
                ui: 'bdd',
                timeout: 3000
            }))
            // Creating the reports after tests ran
            .pipe(istanbul.writeReports())
            // Enforce a coverage of at least 90%
            //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
            .pipe(exit())
            .on('error', gutil.log);
        });
});

gulp.task('default', ['test']);
