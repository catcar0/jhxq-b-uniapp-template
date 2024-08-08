<script setup lang="ts">
import { GetTestOpenCode } from '@/services/script';
import { useScriptStore } from '@/stores/script';
import { LemToken } from '@/utils/auth';
import { Toast } from '@/utils/uniUtils';

const ScriptStore = useScriptStore();

const toDm = (name: 'hs' | 'nzgx') => {
  uni.navigateTo({
    url: `/package_${name}/pages/index/index`
  })
}

// 模拟开本
const toTest = async (script_id: 19 | 20) => {
  uni.navigateTo({
    url: `/package_nzgx/pages/test/test`
  })
  // LemToken.set('token_XrrLRTI9T9Rt0w2QsBQtd9Mgp26ZvimK');
  // uni.showLoading({ mask: true, title: "请稍等..." });
  // try {
  //   let res = await GetTestOpenCode(script_id);
  //   create(res.data.open_book_code, script_id);
  //   uni.hideLoading();
  // } catch (err: any) {
  //   console.log(err)
  //   Toast(err.message || "模拟开房失败");
  // }
}

// 创建跳转DM小程序
const create = (code: any, script_id: 19 | 20) => {
  ScriptStore.OpenBook(code, script_id);
}
</script>

<template>
  <view class="content">
    <button @click="toTest(19)">女子高校</button>
    <button @click="toTest(20)">花束</button>
  </view>
</template>

<style>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  justify-content: center;
  align-items: center;
}
</style>
