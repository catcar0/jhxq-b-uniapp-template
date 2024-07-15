## 剧环星球 - 外包基础框架
### 说明:
此框架仅包含剧环星球B端的DM部分

注意:此框架不存在Player端，Player端和DM端为两个小程序，因为Player端没有公共部分，因此Player端无需基础框架，Player端房间结束直接退出Player端小程序即可，同DM小程序一样分包处理即可

```
# 技术栈
uniapp (unicli脚手架) + vue3 + ts + pinia
如不了解 unicli脚手架 请参考:
https://zh.uniapp.dcloud.io/quickstart-cli.html#install-vue-cli
```
```
# 开发
npm run dev:mp-weixin

# 打包
npm run build:mp-weixin
```
