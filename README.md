# SASS

Resources
- [http://sass-lang.com/guide](http://sass-lang.com/guide)
- [https://github.com/gulpjs/gulp](https://github.com/gulpjs/gulp)

## windows setup 

- Install node [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Install gulp and gulp-sass

```sh
mkdir C:\Source\Repos\first-gulp-project
cd C:\Source\Repos\first-gulp-project
npm init --force
npm install gulp-cli -g
npm install gulp -D
npm install --save-dev gulp-sass
npm install --save-dev gulp-autoprefixer
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-size
mkdir dev\sass
mkdir dev\css
mkdir src\css
type nul > gulpfile.js
type nul > dev\sass\_variables.scss
type nul > dev\sass\main.scss
```
- Download Initializr (w/ bootstrap) & extract into \src folder. [http://www.initializr.com/](http://www.initializr.com/)

## Starter Files

###### \gulpfile.js

```js
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
```

###### \dev\sass\_variables.scss
```scss
$font-stack:    monospace, serif;
$primary-color: #db4226;
```

###### \dev\sass\main.scss
```css
// Base 
@import 'variables';

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

# Run your Gulp Tasks
```sh
cd C:\Source\Repos\first-gulp-project
gulp
```
- Use `[ctrl + c]` to stop watching for SCSS changes.