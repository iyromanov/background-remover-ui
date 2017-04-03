const gulp = require('gulp');
// const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', () => {
    return browserify({ entries: 'src/app.js' })
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);