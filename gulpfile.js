// Gulp
var gulp      = require('gulp');
var sass      = require('gulp-sass'); // Sass/CSS stuff
var prefix    = require('gulp-autoprefixer'); // Sass/CSS stuff
var minifycss = require('gulp-minify-css'); // Sass/CSS stuff
var size      = require('gulp-size'); // Stats and Things

// compile all your Sass
gulp.task('sass', function (){
	gulp.src(['./dev/sass/*.scss', '!./dev/sass/_variables.scss'])
		.pipe(sass({ 
			includePaths: ['./dev/sass'], 
			outputStyle: 'expanded' 
		}))
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest('./dev/css'))
		.pipe(minifycss())
		.pipe(gulp.dest('./src/css'));
});

// Stats and Things
gulp.task('stats', function () {
	gulp.src('./src/**/*')
		.pipe(size())
		.pipe(gulp.dest('./src'));
});

// A watcher that runs tasks when any specified files are changed
gulp.task('watch', function() {
  	gulp.watch('./dev/sass/**/*.scss', ['sass','stats']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','sass','stats']);