'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/angular-material/angular-material.css'
			],
			js: [
				'public/lib/angular/angular.js',
                'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-material/angular-material.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/angular-file-upload.js',
				'public/lib/checklist-model/checklist-model.js',

                'public/lib/snap.svg/dist/snap.svg.js',
                'public/lib/gsap/src/uncompressed/plugins/SnapPlugin.js',
                'public/lib/gsap/src/uncompressed/plugins/CSSPlugin.js',
                'public/lib/gsap/src/uncompressed/plugins/ColorPropsPlugin.js',
                'public/lib/gsap/src/uncompressed/utils/Draggable.js',
                'public/lib/gsap/src/uncompressed/TimelineLite.js',
                'public/lib/gsap/src/uncompressed/TimelineMax.js',
                'public/lib/gsap/src/uncompressed/TweenLite.js',
                'public/lib/gsap/src/uncompressed/TweenMax.js',



                'public/lib/tinymce-dist/tinymce.js',
                'public/lib/angular-ui-tinymce/src/tinymce.js'
			],
			tests: ['public/lib/angular-mocks/angular-mocks.js']
		},
		css: [
			'modules/*/client/css/*.css',
			'modules/*/client/css/**/*.css'
		],
		less: [
			'modules/*/client/less/*.less'
		],
		sass: [
			'modules/*/client/css/*.scss',
			'modules/*/client/css/**/*.scss'
		],
		js: [
			'modules/core/client/app/config.js',
			'modules/core/client/app/init.js',
			'modules/*/client/*.js',
			'modules/*/client/**/*.js',
			'modules/*/client/***/**/*.js',
			'modules/*/client/****/***/**/*.js'
		],
		views: ['modules/*/client/views/**/*.html']
	},
	server: {
		allJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
		models: 'modules/*/server/models/**/*.js',
		routes: ['modules/*[!core]/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		sockets: 'modules/*/server/sockets/**/*.js',
		config: 'modules/*/server/config/*.js',
		policies: 'modules/*/server/policies/*.js',
		views: 'modules/*/server/views/*.html'
	}
};
