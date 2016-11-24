var gulp = require( 'gulp' );
var server = require( 'gulp-server-livereload' );
var sass = require( 'gulp-sass' );
var prefix = require( 'gulp-autoprefixer' );

var img = require( 'gulp-imagemin' );
var destClean = require( 'gulp-dest-clean' );
var useref = require( 'gulp-useref' );
var gulpif = require( 'gulp-if' );
var csso = require( 'gulp-csso' );
var uglify = require( 'gulp-uglify' );

//server
gulp.task( 'start', function(){
    gulp.src('app')
        .pipe(server({
            livereload: true,
            port: 4000,
            open: true
    }));
});

//style
gulp.task('style', function () {
  gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 10 versions']
  }))
    .pipe(gulp.dest('app/css'))
})

//images
gulp.task( 'images', function(){
    gulp.src('app/img/**/*')
        .pipe(destClean('build/img'))
        .pipe(img({
        progressive: true
        }))
        .pipe(gulp.dest('build/img'));
})

//build
gulp.task( 'build', ['images'], function(){
    gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', csso()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('build'))
})

//replace
gulp.task( 'replaceFonts', function(){
    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
})

//watch
gulp.task( 'watch', function(){
    gulp.watch( 'app/sass/**/*.sass', ['style'] )
})

//default
gulp.task( 'default', ['start', 'watch'])
