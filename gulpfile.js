const gulp = require("gulp");
const terser = require("gulp-terser");
const del = require("del");
const ts = require("gulp-typescript");

function clean() {
  return del(["dist"]);
}

function config() {
  return gulp.src("./src/config/index.env").pipe(gulp.dest("./dist/config/"));
}

function dependencies() {
  return gulp.src("./package*.json").pipe(gulp.dest("./dist/"));
}

function server() {
  return gulp
    .src("./src/**/*.ts")
    .pipe(
      ts({
        target: "es5",
        module: "commonjs",
        strict: true,
        noImplicitAny: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("./dist/"));
}

function watch() {
  gulp.watch("./src/**/*.ts", server);
  gulp.watch("./src/data/**/*", data);
}

const build = gulp.series(clean, gulp.parallel(config, server));
const deploy = gulp.series(clean, gulp.parallel(config, server, dependencies));

exports.watch = watch;
exports.deploy = deploy;
exports.default = build;
