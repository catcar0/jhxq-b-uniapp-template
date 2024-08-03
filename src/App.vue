<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import url("./package_nzgx/static/fonts/stylesheet.css");
@import url("./package_nzgx/styles/common.css");
page{
  background-color: #F9F9F9;
  font-family: 'SiYuan';
  font-weight: 500;
}
.almm{
  font-family: 'Alimama ShuHeiTi';
}
.hyshtj{
  font-family: 'hyshtj';
}

</style>
