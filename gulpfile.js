/* portions of this file were copied from
 * https://github.com/mondora/asteroid-todo/blob/master/angular/gulpfile.js
 */

// dependencies
var _	= require('lodash');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var crypto = require('crypto');
var gulp = require('gulp');
var http = require('http'); // no npm module?
var mkdirp = require('mkdirp');
var minifyCSS = require('gulp-minify-css');
var open = require('open');
var preprocess = require('gulp-preprocess');
var Q = require('q');
var static = require('node-static');
var uglify = require('gulp-uglify');
var WebSocket	= require('faye-websocket');

// paths
var mainFile = 'src/js/main.js';
var paths = {
  html:'src/index.html',
  style:'src/style/*.css',
  script:'src/js/**/*.js'
}

gulp.task('clean',function(){
  gulp.src('dist/',{read:false})
    .pipe(clean());
});

// app functions
var appHtml = function(dest,target){
	console.log('Building app html');
	var deferred = Q.defer();
	gulp.src('src/index.html')
		.pipe(preprocess({context: {TARGET: target}}))
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

var appScripts = function(dest){
	console.log('Building app scripts');
	var deferred = Q.defer();
	gulp.src('src/js/main.js')
    .pipe(browserify({transform:'reactify'}))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

var appStyles = function(dest){
	console.log('Building app styles');
	var deferred = Q.defer();
	gulp.src('src/style/*.css')
		.pipe(concat('app.min.css'))
    .pipe(minifyCSS())
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

// vendor functions
var vendorScripts = function(dest,target){
	console.log('Building vendor scripts');
	var deferred = Q.defer();
  // TODO try to use npm in place of bower
	var sources = [
		'bower_components/bower-sockjs-client/sockjs.js',
		'bower_components/q/q.js',
		'bower_components/ddp.js/src/ddp.js'
	];
	if (target === 'browser') {
		sources.push('bower_components/asteroid/dist/asteroid.browser.js');
	}
	if (target === 'cordova') {
		sources.push('bower_components/asteroid/dist/asteroid.cordova.js');
	}
	sources.push('bower_components/asteroid/dist/plugins/github-login.js');
	gulp.src(sources)
		.pipe(concat('vendor.min.js'))
    .pipe(uglify())
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

var vendorStyles = function(dest){
	console.log('Building vendor styles');
	var deferred = Q.defer();
	var sources = [
		'node_modules/bootstrap/dist/css/bootstrap.css'
	];
	gulp.src(sources)
		.pipe(concat('vendor.min.css'))
    .pipe(minifyCSS())
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

var vendorFonts = function(dest){
	console.log('Building vendor fonts');
	var deferred = Q.defer();
	var sources = [
		'node_modules/bootstrap/fonts/*'
	];
	gulp.src(sources)
		.pipe(gulp.dest(dest))
		.on('end',function(){
			deferred.resolve();
		});
	return deferred.promise;
};

// build functions
var buildBrowser = function(reload){
	console.log('BUILDING FOR BROWSER');
	// create directories if needed
	mkdirp.sync('dist/');
	mkdirp.sync('dist/style/');
	mkdirp.sync('dist/js/');
	mkdirp.sync('dist/fonts/');
	return Q.all([
		appHtml('dist/'),
		appScripts('dist/js/'),
		appStyles('dist/style/'),
		vendorScripts('dist/js/','browser'),
		vendorStyles('dist/style/'),
		vendorFonts('dist/fonts/')
	]).then(function(){
    console.log('finished running app');
		if (reload){
			return reload();
		}
		console.log('BROWSER BUILD FINISHED');
	});
};

// server setup
var serve = function(){
	// websocket server to automatically reload the page on changes
	var ws = {
		sockets: {},
		send: function(msg){
			_.forEach(this.sockets,function(socket){
				socket.send(msg);
			});
		}
	};
	// web server
	var file = new static.Server('./dist/', {cache: false});
  // start servers
	http
		.createServer()
		.on('request',function(req,res){
			req.on('end',function(){
				file.serve(req,res);
			});
			req.resume();
		})
		.on('upgrade',function(req,sock,body){
			if(req.url !== '/websocket' || !WebSocket.isWebSocket(req)){
				return;
			}
			var key = crypto.randomBytes(16).toString('hex');
			ws.sockets[key] = new WebSocket(req,sock,body).on('close',function(){
				delete ws.sockets[key];
			});
		})
		.listen(8080,'0.0.0.0');
	return function reload(){
		ws.send('reload');
	};
};

// build tasks
gulp.task('buildBrowser',function(){
	return buildBrowser();
});

// main task
gulp.task('default',['buildBrowser'],function(){
	var reload = serve();
	var building = false;
	gulp.watch([
    'src/index.html',
    'src/js/**/*.js',
    'src/style/*.css'
	]).on('change',function(){
		if(building){
			return;
		}
		Q()
			.then(function(){
				building = true;
				return buildBrowser(reload);
			})
			.then(function(){
				buidling = false;
			});
	});
	open('http://localhost:8080/');
});
