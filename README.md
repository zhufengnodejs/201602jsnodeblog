#项目
1. 生成项目
```
npm install express-generator -g
express -e blog
```
2. 安装依赖 
```
cd blog && npm install
```
3. 启动项目
```
SET DEBUG=blog:* & npm start
```


#安装bootstrap
```
touch .bowerrc            创建配置文件指定下载后的包的存放目录
bower init                初始化bower.json配置文件
bower install bootstrap --save   安装bootstrap
```

#实现发表文章的功能

#实现把会话放在数据库里

#用flash实现成功和失败的提示

#用中间件实现权限控制


#更新文章
1. 在详情页上增加一个更新的按钮
2. 点击按钮后提交到/articles/update/id的路由
3. 根据ID获取完整的文章对象内容，跳转到增加页面
4. 填写新的信息提交到/articles/add路由
5. 根据提交过来的对象是否有ID来判断是新增加文章还是修改，


# 评论
1. 在详情页绘制提交评论的表单
2. 当点击评论的时候要把此表单提交到 /articles/comment路由中
3. 把当评论内容添加到文章的评论数组中
4. 添加完成后渲染详情页，并在详情页中便利渲染我们的评论的列表
