var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	sync = require('browser-sync');

gulp.task('preview', function()
{
	sync.init(
	{
		notify: false,
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('delfolder', ['icons'], function()
{
	return del(['./dist', './docs']);
});

gulp.task('copy-misc', ['delfolder'], function()
{
	var paths2copy =
	[
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]

	return gulp.src(paths2copy)
			.pipe(gulp.dest('./dist/'));
});

gulp.task('copy2docs', ['optimize'], function()
{
	return gulp.src('./dist/**')
			.pipe(gulp.dest('./docs/'));
});

gulp.task('optimize', ['delfolder'], function()
{
	return gulp.src(
			[
				'./app/assets/images/**/*',
				'!./app/assets/images/icons',
				'!./app/assets/images/icons/**/*'
			])
			.pipe(imagemin(
			{
				progressing: true,
				interlaced: true,
				multipass: true
			}))
			.pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('usemin-trigger', ['delfolder'], function()
{
	gulp.start('usemin');
});

gulp.task('usemin', ['process-css', 'scripts'], function()
{
	return gulp.src('./app/index.html')
			.pipe(usemin(
			{
				css:
				[
					function()
					{
						return rev()
					},
					function()
					{
						return cssnano()
					}
				],
				js:
				[
					function()
					{
						return rev()
					},
					function()
					{
						return uglify()
					}
				]
			}))
			.pipe(gulp.dest('./dist'));
});

gulp.task('build',
		[
			'delfolder',
			'copy-misc',
			'optimize',
			'usemin-trigger',
			'copy2docs'
		]);