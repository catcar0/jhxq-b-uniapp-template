// import { createPinia } from 'pinia'
// import persist from 'pinia-plugin-persistedstate'

// // 创建 pinia 实例
// const pinia_nzgx = createPinia()
// // 使用持久化存储插件
// pinia_nzgx.use(persist)

// // 默认导出，给 main.ts 使用
// export default pinia_nzgx

// 模块统一导出
export * from './modules/characters'
export * from './modules/member'
export * from './modules/websocketStore'