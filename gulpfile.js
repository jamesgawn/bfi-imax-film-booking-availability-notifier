let gulp = require('gulp');
let zip = require('gulp-zip');
let del = require('del');
let install = require('gulp-install');
let runSequence = require('run-sequence');
let awsLambda = require("node-aws-lambda");

gulp.task('clean', function() {
	return del(['./dist', './.nyc_output', 'dist-lambda.zip', 'dist-lambda']);
});

gulp.task('copy-lib', function() {
	return gulp.src('lib/**')
		.pipe(gulp.dest('dist/lib'));
});

gulp.task('node-mods', function() {
	return gulp.src('./package.json')
		.pipe(gulp.dest('dist/'))
		.pipe(install({production: true}));
});

gulp.task('copy-lambda', function() {
	return gulp.src('lambda.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('zip-lambda', function() {
	return gulp.src(['dist/**', '!dist/package.json', '!dist/package-lock.json'], {nodir: true})
		.pipe(zip('dist-lambda.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('build-lambda', function(callback) {
	return runSequence(
		['clean'],
		['copy-lib', 'copy-lambda'],
		['node-mods'],
		['zip-lambda'],
		callback
	);
});

gulp.task('upload-lambda', function(callback) {
	awsLambda.deploy('./dist-lambda.zip', require("./lambda-config.js"), callback);
});

gulp.task('deploy-alexa-lambda', function(callback) {
	return runSequence(
		['build-lambda'],
		['upload-lambda'],
		callback
	);
});