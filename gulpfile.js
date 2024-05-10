const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const livereload = require('gulp-livereload')
const concat = require('gulp-concat')
const terser = require('gulp-terser')

gulp.task('sass', function () {
	gulp
		.src(['node_modules/swiper/swiper-bundle.css'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('libs.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())

	return gulp
		.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
})

gulp.task('script', function () {
	gulp
		.src(['node_modules/swiper/swiper-bundle.js'])
		.pipe(concat('libs.min.js'))
		.pipe(terser())
		.pipe(gulp.dest('dist/js'))

	return gulp
		.src('src/js/main.js') // Путь к вашему файлу main.js
		.pipe(concat('main.min.js')) // Минимизированный файл будет называться main.min.js
		.pipe(terser())
		.pipe(gulp.dest('dist/js'))
})

// Task for minifying HTML and moving it to dist
gulp.task('html', function () {
	return gulp
		.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true })) // Minification of HTML files
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
})

async function optimizeImages() {
	const imagemin = (await import('gulp-imagemin')).default
	const gifsicle = (await import('imagemin-gifsicle')).default
	const mozjpeg = (await import('imagemin-mozjpeg')).default
	const optipng = (await import('imagemin-optipng')).default
	const svgo = (await import('imagemin-svgo')).default

	return gulp
		.src('assets/**/*.{png,jpg,gif,svg}')
		.pipe(
			imagemin([
				gifsicle({ interlaced: true }),
				mozjpeg({ quality: 75, progressive: true }),
				optipng({ optimizationLevel: 5 }),
				svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(gulp.dest('dist/assets'))
}
gulp.task('images', optimizeImages)

gulp.task('watch', function () {
	livereload.listen()
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'))
	gulp.watch('src/*.html', gulp.series('html'))
	gulp.watch('src/js/main.js', gulp.series('script')) // Следить за изменениями в main.js

	// Add other files you need to keep an eye on here
})

// Task to run BrowserSync
gulp.task('serve', function () {
	browserSync.init({
		server: './dist',
	})

	// We monitor HTML files in src and all subfolders
	gulp.watch('src/**/*.html', gulp.series('html'))

	gulp.watch('src/sass/**/*.scss', gulp.series('sass'))

	// Monitor changes in dist and update the browser
	gulp.watch('dist/**/*').on('change', browserSync.reload)

	gulp.watch('src/js/main.js', gulp.series('script')) // Watch changes in main.js
})

// Task to copy .mp4 files
gulp.task('copyMp4', function () {
	return gulp
		.src('assets/**/*.mp4') // Select all .mp4 files in the assets folder and subfolders
		.pipe(gulp.dest('dist/assets')) // Copy them to dist/assets maintaining the same folder structure
})

gulp.task('assets', gulp.series('images', 'copyMp4'))

// Default task
gulp.task('default', gulp.series('sass', 'script', 'html', 'copyMp4', 'serve'))
