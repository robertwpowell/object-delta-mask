'use strict';

var config = require('./gulp.config')();
var del = require('del');
var path = require('path');

var tslint = require('tslint');
var tslintStylish = require('tslint-stylish');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var replace = require('gulp-replace');
var tsconfig = require('gulp-tsconfig-files');
var watch = require('gulp-watch');
var $ = require('gulp-load-plugins')({ lazy: true });

var tsProject = ts.createProject('./tsconfig.json', {
    rootDir: config.ts.src,
    outDir: config.ts.out
});

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing.withFilters(/:/, /internal/));
gulp.task('default', ['help']);

/**
 * Remove generated files
 */
gulp.task('clean', function () {
    return del(config.ts.out);
});

/**
 * Compile TypeScript
 */
gulp.task('internal-compile', [], function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));
console.log(tsProject.src());
    return tsResult.js
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: function (file) {
                 let depth = file.history[0].match(new RegExp('\\' + path.sep, 'g')).length;
                return ('..' + path.sep).repeat(depth) + 'src';
        }}))
        .pipe(gulp.dest(config.ts.out));
});

/**
 * Compile TypeScript
 */
gulp.task('build', [], function (cb) {
    gulpSequence(
        ['internal-tslint'],
        ['clean'],
        ['internal-compile'])(cb);
});

/**
 * Watch and compile TypeScript
 */
gulp.task('build:watch', ['build'], function () {
    return gulp.watch(config.ts.files, ['build']);
});

/**
 * Run specs once and exit
 */
gulp.task('test', [], function () {
    startTests(true /*singleRun*/);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 */
gulp.task('test:watch', [], function () {
    startTests(false /*singleRun*/);
});



/**
 * vet typescript code
 * @return {Stream}
 */
gulp.task('internal-tslint', function () {
    return gulp
        .src(config.ts.files)
        .pipe($.tslint())
        .pipe($.tslint.report(tslintStylish, {
            emitError: false,
            sort: true,
            bell: false
        }));
});

/**
 * Inject imports into system.js
 */
gulp.task('internal-imports-inject', function(){
    gulp.src(config.customBoot)
        .pipe($.inject(gulp.src(config.js.specs, {read: false}), {
            starttag: 'Promise.all([',
            endtag: '])',
            transform: function (filepath, file, i, length) {
                var importStatement = 'System.import(\'' + filepath + '\')';
                if (i !== length - 1) {
                    importStatement += ',';
                }
                return importStatement;
            }
        }))
        .pipe(gulp.dest('./util/', {overwrite: true}));
});

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @returns {undefined}
 */
function startTests(singleRun) {
    var Server = require('karma').Server;

    var server = new Server({
        configFile: __dirname + '/karma.conf.js',
        exclude: config.karma.exclude,
        singleRun: !!singleRun
    });

    server.start();
}

