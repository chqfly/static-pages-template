# static-pages-template

### 项目介绍
该项目适合前后端未分离，前端仅写静态页面，然后交给后端套模版使用。

支持:
* 使用gulp打包
* 通过gulp-file-include插件可以实现公共部分复用
* less与处理器
* postcss样式处理器的使用
* browser-sync实现保存即刷新页面
* 其它功能均可自由添加

#### 项目启动
* npm install
* gulp

### 项目部署

静态资源上传到腾讯云
* npm run deploy

### 目录说明

* pages-页面html文件,可以使用@@include引入widgets中的模块代码
* widgets-可复用的模块html代码文件, 比如footer、header
* libs-三方库文件
* assets-图片等其它资源文件
* scripts-js代码
* style-样式文件
* dist-为代码输出文件，最后交付给后端的是该目录文件的代码