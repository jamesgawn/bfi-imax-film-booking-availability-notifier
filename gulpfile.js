let gulp = require('gulp');
let zip = require('gulp-zip');
let del = require('del');
let install = require('gulp-install');
let runSequence = require('run-sequence');
let awsLambda = require("node-aws-lambda");

const { series, parallel } = require('gulp');

function clean() {
	return del(['./dist', './.nyc_output', 'dist-lambda.zip', 'dist-lambda']);
}

function copyLib() {
	return gulp.src('lib/**')
		.pipe(gulp.dest('dist/lib'));
}

function installDependancies() {
	return gulp.src('./package.json')
		.pipe(gulp.dest('dist/'))
		.pipe(install({production: true}));
}

function copyLambda() {
	return gulp.src('lambda.js')
		.pipe(gulp.dest('dist/'));
}

function zipLambda() {
	return gulp.src(['dist/**', '!dist/package.json', '!dist/package-lock.json'], {nodir: true})
		.pipe(zip('dist-lambda.zip'))
		.pipe(gulp.dest('./'));
}

exports.buildLambda = series(clean, parallel(copyLib, copyLambda), installDependancies, zipLambda);

exports.uploadLambda = (callback) => {
	awsLambda.deploy('./dist-lambda.zip', require("./lambda-config.js"), callback);
};

exports.deployLambda = series(this.buildLambda, this.uploadLambda);