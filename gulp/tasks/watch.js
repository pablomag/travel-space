var gulp = require('gulp'),
	watch = require('gulp-watch'),
	sync = require('browser-sync');

gulp.task('watch', function()
{
	sync.init(
	{
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function()
	{
		console.log("Reloading browser...");

		sync.reload();
	});

	watch('./app/assets/styles/**/*.css', function()
	{
		gulp.start('css-inject');
	});

	watch('./app/assets/scripts/**/*.js', function()
	{
		gulp.start('scripts-refresh');
	});
});

gulp.task('css-inject', ['process-css'], function()
{
	console.log("Injecting CSS changes...");

	return gulp.src('./app/assets/styles/styles.css')
				.pipe(sync.stream());
});

gulp.task('scripts-refresh', ['scripts'], function()
{
	console.log("Compiling .js scripts...");

	sync.reload();
});