module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON( 'package.json' ),
		uglify : {
			options:{
				banner : '/*!create by <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target : {
				files :{
					'dist/main.min.js':['src/js/index.js','src/js/fun.js']
				}
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['uglify']);
}