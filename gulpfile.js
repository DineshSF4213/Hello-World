const gulp = require('gulp');
const exec = require('child_process').exec;

// Task to update package.json with command line argument
gulp.task('update-package', function (cb) {
    const version = process.argv[4] || 'patch';
    console.log(process.argv[4]);
    exec(`npm version ${version}`, (err) => {
        if (err) return cb(err);
        cb();
    });
});


//Prerelease Package Update
gulp.task('prerelease-package', function (cb) {
    const version = process.argv[4];
    console.log(process.argv[4]);
    if (version != undefined) {
        exec(`npm version prerelease --preid=${version}`, (err) => {
            if (err) return cb(err);
            cb();
        });
    }
    else{
        exec(`npm version prerelease`, (err) => {
            if (err) return cb(err);
            cb();
        });
    }
});


// Task to build the npm package
gulp.task('build', function (cb) {
    exec('npm pack', function (err) {
        if (err) return cb(err);
        cb();
    });
});

// Task to publish the package to npmjs registry
gulp.task('publish', function (cb) {
    exec('npm publish', function (err) {
        if (err) return cb(err);
        cb();
    });
});

// Default task to run all tasks (patch, minor and major updates)
gulp.task('default', gulp.series('update-package', 'build', 'publish'));

// Default task to run all tasks (Alpha,Beta)
gulp.task('pre', gulp.series('prerelease-package', 'build', 'publish'));
