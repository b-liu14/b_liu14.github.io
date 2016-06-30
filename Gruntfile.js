// 包装函数
module.exports = function(grunt) {

  // 任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    		//压缩css
           cssmin: {
               //文件头部输出信息
               options: {
                   banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                   //美化代码
                   beautify: {
                       //中文ascii化，非常有用！防止中文乱码的神配置
                       ascii_only: true
                   }
               },
               my_target: {
                   files: [
                       {
                           expand: true,
                           //相对路径
                           cwd: 'src/css/',
                           src: '*.css',
                           dest: 'build/css/',
                           rename: function (dest, src) {
                                   var folder = src.substring(0, src.lastIndexOf('/'));
                                   var filename = src.substring(src.lastIndexOf('/'), src.length);
                                   //  var filename=src;
                                   filename = filename.substring(0, filename.lastIndexOf('.'));
                                   var fileresult=dest + folder + filename + '.min.css';
                                   grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);

                                   return fileresult;
                                 //return  filename + '.min.js';
                                   }
                       }
                   ]
               }
           }

  });

  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('default', ['cssmin']);

};