var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	prefix = require('autoprefixer'),
	vars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	importer = require('postcss-import'),
	mixins = require('postcss-mixins'),
	hex = require('postcss-hexrgba');

gulp.task('process-css', function()
{
	console.log("Processing CSS files...");

	return gulp.src('./app/assets/styles/styles.css')
				.pipe(postcss([importer, mixins, nested, vars, hex, prefix]))
				.on('error', function(errorInfo)
				{
					console.log(errorInfo.toString());
					this.emit('end');
				})
				.pipe(gulp.dest('./app/temp/styles'));
});