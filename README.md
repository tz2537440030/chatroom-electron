# React + TypeScript + Vite

- 项目采用React + TypeScript + Vite搭建，数据store层使用redux管理，使用websocket进行前后端消息同步，模仿的微信移动端界面，目前完成了好友，聊天，朋友圈，个人资料等页面的还原

- npm run dev：本地开发时使用，后端接口配置文件为.env.development
- npm run build -- --mac：打包为macos的包，使用的配置文件为.env.production，打出来的dmg在release目录下，调试打包文件，可直接点击/release/mac-arm64/MyApp.app/Contents/MacOS/MyApp
- npm run build -- --win：打包windows平台，同上
- 需要使用redux-devtools调试的话，请自行到谷歌商店下载打包，并在根目录下创建devtools-extensions/redux-devtools文件夹，将插件内容copy进去
