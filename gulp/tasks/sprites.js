var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite');
	rename = require('gulp-rename'),
	del = require('del');

var config =
{
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './app/gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('clean-start', function()
{
	return del(['./app/temp/sprite', './app/assets/images/sprites'])
});

gulp.task('create-sprite', ['clean-start'], function()
{
	return gulp.src('./app/assets/images/icons/**/*.svg')
			.pipe(svgSprite(config))
			.pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copy-sprite-css', ['create-sprite'], function()
{
	return gulp.src('./app/temp/sprite/css/*.css')
			.pipe(rename('_sprite.css'))
			.pipe(gulp.dest('./app/assets/styles/modules/'));
});

gulp.task('copy-sprite-svg', ['create-sprite'], function()
{
	return gulp.src('./app/temp/sprite/css/**/*.svg')
			.pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('icons', ['clean-start', 'create-sprite', 'copy-sprite-css', 'copy-sprite-svg']);