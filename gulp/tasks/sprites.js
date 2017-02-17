var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite');
	rename = require('gulp-rename'),
	del = require('del'),
	svg2png = require('gulp-svg2png');

var config =
{
	shape:
	{
		spacing:
		{
			padding: 2
		}
	},
	mode: {
		css: {
			variables:
			{
				svg2png: function()
				{
					return function(sprite, render)
					{
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
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

gulp.task('create-png', ['create-sprite'], function()
{
	return gulp.src('./app/temp/sprite/css/*.svg')
			.pipe(svg2png())
			.pipe(gulp.dest('./app/temp/sprite/css/'));
});

gulp.task('copy-sprite-svg', ['create-png'], function()
{
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
			.pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('icons',
	[
		'clean-start',
		'create-sprite',
		'create-png',
		'copy-sprite-css',
		'copy-sprite-svg'
	]);