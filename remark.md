### grunt基础知识	[英语不过关只能白话文]()

* `npm install -g grunt-cli` 是用命令操作grunt
* grunt 是一个支持插件的平台,这个平台可以结合插件做一些连贯的操作,压缩js,js语法检查,css压缩,less编译...
* 压缩JS 这个操作被看成是一个任务(task)的一部分
* 一个任务就是一系列操作
* 怎么启动这些任务呢,就要用到grunt-cli里面的 `grunt <参数>` 的命令
* 怎么控制压缩那个JS?合并JS到那个文件?逻辑在根目录的gruntfile.js
* 任务可以写多个,`grunt`执行的默认任务是default这个任务相当于运行`grunt default`
* 任务怎么写呢? 在gruntfile.js文件中写入,这个就是默认任务，只有一个压缩JS的任务
```
grunt.registerTask('default',[uglify']);
```
* 可以写多个任务像我想试一试grunt输出信息到控制台
```
//	>grunt test		只写这个还不能运行,下面介绍gruntfile.js
grunt.registerTask('test','log some stuff',function(){
	grunt.log.write('test grunt ...\n').ok();
});
```

### gruntfile.js主要有三部分组成

* 初始化grunt配置文件
<pre>
grunt.initConfig({
	pkg : grunt.file.readJSON( 'package.json' )
	//todo
});
</pre>
* 引入下载的uglify插件`npm install grunt-contrib-uglify --save-dev`
<pre>
grunt.loadNpmTasks('grunt-contrib-uglify');
</pre>
* 配置默认任务
<pre>
grunt.registerTask('default',['watch','uglify','less','cssmin']);
</pre>
* 附加部分四,插件逻辑部分	*这些写在grunt初始化配置文件todo里面*
<pre>
uglify : {
	options:{
		banner : '/*!create by <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	},
	my_target : {
		files :{
			'dist/index.min.js':'src/js/index.js',
			'dist/fun.min.js':'src/js/fun.js',
			'dist/main.min.js':['src/js/index.js','src/js/fun.js']
		}
	}
}
</pre>
* 附加部分五,nodeJS导出模块的方法	*上面的都要写在四个部分写在Todo*
<pre>
module.exports = function(grunt){
	//todo
}
</pre>

### 插件逻辑详解	[官网的配置详解](https://gruntjs.com/configuring-tasks)

```
less: {
  development: {	//grunt.registerTask('less',['less:development']);是less任务的一个分任务,如果写['less']会遍历分任务执行(好像是这样的)
    options: {		//默认都有一个options设置对象，可以把设置写在这里
      paths: ['assets/css']
    },
    files: {	//files对象是文件输出，文件输入路径对象
      'path/to/result.css': 'path/to/source.less'
    },
    tasks: ['cssmin'] 	//这里举个例子,less:development执行之后在执行cssmin,
  },
  production: {
    options: {		//生产环境有许多要设置的，自己解释吧[师傅只能帮到这里](我也不懂)
      paths: ['assets/css'],
      plugins: [
        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
        new (require('less-plugin-clean-css'))(cleanCssOptions)
      ],
      modifyVars: {
        imgPath: '"http://mycdn.com/path/to/images"',
        bgColor: 'red'
      }
    },
    files: {
      'path/to/result.css': 'path/to/source.less'
    }
  }
}
```

### 插件介绍

* [gruntjs.com/plugins](https://gruntjs.com/plugins)
	* grunt官网查询插件，带星的是官方插件
* 'npm install grunt-contrib-uglify --save-dev'
	* 压缩js代码的插件

* `npm install grunt-contrib-jshint --save-dev`
	* JS语法检查
* 'npm install grunt-contrib-connect --save-dev'
	* 启动一个后台服务,*不用刷新浏览的额*
* 'npm install grunt-contrib-less --save-dev'
	* 编译LESS
* 'npm install grunt-contrib-watch --save-dev'
	* 监控文件变化
* 'npm install load-grunt-tasks --save-dev'
	* 每一个插件使用都要引入到gruntfile.js,会有很多要写`grunt.loadNpmTasks('grunt-contrib-uglify');`
	* 现在只需要一行 `require('load-grunt-tasks')(grunt);`
	* 个别插件需要require,不是全部的都不用引入
	* [www.npmjs.com/package/load-grunt-tasks](https://www.npmjs.com/package/load-grunt-tasks)
* ...

### 1.0.0