## galmoe material

重写中...

完成度 40%

[Preview](http://47.94.16.206)

```
yarn install
```

使用vue cli 3调试

```js
// dev
npm run serve

// build production
npm run build
```
### 配置
配置scss GBK编码方式

```sh
cd C:\Ruby24\lib\ruby\gems\2.4.0\gems\sass-3.5.6\lib\
vim sass.rb
```

添加
```rb
require 'sass/media'
require 'sass/supports'
module Sass   
Encoding.default_external = Encoding.find('utf-8')
```