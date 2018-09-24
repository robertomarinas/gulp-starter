const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Important Gulp Functions:
// gulp.task - defines a task
// gulp.src - points to the source files
// gulp.dest - points to folder
// gulp.watch - watch files and folder for changes

// Task for copying HTML files for distribution
gulp.task('html', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

// Task for optimizing images for web
gulp.task('imagemin', function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
})

// Task for optimizing js files
gulp.task('minifyjs', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// Task for compiling SASS files
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
})

// Task for concatenating JS files to a single file
gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
})

// Task to serve app
gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
});

// Do all tasks by default
gulp.task('default', ['html', 'imagemin', 'sass', 'scripts']);

// Serve app and Watch files for changes
gulp.task('serve', ['html', 'imagemin', 'sass', 'scripts'], function(){
	browserSync.init({
		server: "./dist"
	});

	gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
	gulp.watch('src/images/*', ['imagemin']).on('change', browserSync.reload);
	gulp.watch('src/sass/*.scss', ['sass']).on('change', browserSync.reload);
	gulp.watch('src/js/*.js', ['scripts']).on('change', browserSync.reload);
});