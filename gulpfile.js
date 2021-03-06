const gulp = require('gulp');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglifyJS = require('gulp-uglify');
const terser = require("gulp-terser");
const pipeline = require('readable-stream').pipeline;
const sass = require('gulp-sass');
const css = require("gulp-css");
const concat = require('gulp-concat');
const minifyHTML = require('gulp-htmlmin');
const minifyCSS = require('gulp-clean-css');
const fontmin = require('gulp-fontmin');
const php_connect = require("gulp-connect-php");

/*
    --TOP LEVEL FUNCTIONS--
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.public - Points to folder to output
    gulp.watch - watch files and folders for changes
*/

//logs the message
gulp.task('message', (res) => {
    console.log('Gulp is running...');
    return res();
});

//copy all the html files
gulp.task('copyhtml', (res) => {
    gulp.src('src/html/*.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/html'));
    return res();
});

//copy index html
gulp.task('copyindex', (res) => {
    gulp.src('src/*.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
    return res();
});

//optimize/compress images
gulp.task('imagemin', (res) => {
    gulp.src('src/media/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/media/images'));
        return res();
});

//minify JS
gulp.task('minify', () => {
    return new Promise(function(resolve, reject) {
    gulp.src('src/js/*')
    .pipe(terser())
    .pipe(gulp.dest('public/js')); 
    console.log("HTTP server has started");
    resolve();
})});

//concat and uglify JS script files
gulp.task('concat', (res) => {
    gulp.src('src/js/*')
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(gulp.dest('public/js'));
    return res();
});

//JS vendor files
gulp.task('vendor', (res) => {
    gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('public/js/vendor'));
    return res();
});

//minify css
gulp.task("css", (res) => {
    gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'));
    return res();
})

//complile sass and minify CSS
gulp.task('sass', (res) => {
    gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    // .pipe(minifyCSS({debug: true, compatibility: 'ie8'}, (details) => {
    //     console.log(`${details.name}: ${details.stats.originalSize}`);
    //     console.log(`${details.name}: ${details.stats.minifiedSize}`);
    //   }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
    return res();
});

//minify main fonts 
gulp.task('fonts', (res) => {
    gulp.src("node_modules/font-awesome/scss/font-awesome.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minifyCSS({debug: true /*compatibility: 'ie8'*/}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(gulp.dest('public/css/fonts'));
    return res();
});

//copy all fontawesome fonts
gulp.task('copyfonts', (res) => {
    gulp.src(['node_modules/font-awesome/fonts/fontawesome-webfont.woff2', 'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/fontawesome-webfont.ttf', 'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot', 'node_modules/font-awesome/fonts/fontawesome.otf'])
    .pipe(gulp.dest('public/css/fonts'));
    return res();
});

//minify all font extensions
gulp.task('fontmin', (res) => {
     gulp.src(['public/css/fonts/*.eot', 'public/css/fonts/*.svg', 'public/css/fonts/*.ttf', 'public/css/fonts/*.woff',
     'public/css/fonts/*.woof2', 'public/css/fonts/*.otf'])
    .pipe(fontmin({
        text: 'text'
    }))
    .pipe(gulp.dest('public/css/fonts'));
    return res();
});

//watch for changes
gulp.task('watch', (res) => {
    gulp.watch('src/html/*.html', gulp.series('copyhtml'));
    gulp.watch('src/index.html', gulp.series('copyindex'));
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/js/*.js', gulp.series('minify'));
    gulp.watch('src/media/images/*', gulp.series('imagemin'));
    return res();
});

gulp.task('php', (res) => {
    php_connect.server({base:'./public', port: 8010, keepalive: true});
    return res();
});

//Sync and refresh browser
gulp.task('serve', (res) => {
    browserSync.init({
        injectChanges: true,
        server: './public'
    });
    gulp.watch('src/index.html').on('change', browserSync.reload);
    gulp.watch('src/html/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/*.css').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    return res();
});

//Watch and serve
gulp.task('watchserve', gulp.series(['message', 'watch', 'serve']));

//Compress and minify
gulp.task('minifycompress', gulp.series(['message', 'copyindex', 'copyhtml', 'css', 'imagemin', 'concat', 'vendor', 'fonts', 'copyfonts', 'fontmin']));

//Run all tasks
gulp.task('default', gulp.series(['message', 'copyindex', 'copyhtml', 'css', "minify", 'imagemin', 'watch', 'serve']));