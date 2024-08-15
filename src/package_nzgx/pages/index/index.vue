<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import dm from "@/package_nzgx/pages/dm/dm.vue";
</script>
<!-- const wsService = new WebSocketService(`ws://132.232.57.64:8030/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`); -->
<!-- 进入房间连接ws需要 token,roomId,virtualRoleId = 'gm'  对应DM进入房间 -->
  <!-- 所有游戏业务逻辑都在前端进行处理 后端逻辑非常简单 逻辑是七个人共同更新一个对象数组(像共享文档都可以编辑)  /services/initInfo.ts 
   开发时间非常有限 需要功能基本实现 代码待优化 -->
<template>
    <dm></dm>
    <DMTabBar></DMTabBar>
</template>

<style scoped></style>