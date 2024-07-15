import {defineStore} from "pinia";
import { ref } from "vue";
import { type BgAudio } from '@/services/play';

export const useBgmStore = defineStore('bgm',()=>{
	const BgmInstance = ref<any>(null);
	const CurrentBgm = ref<BgAudio>();
	const BgmStatus = ref<'playing'|'paused'>('paused');
	
	const InitBgm = () => {
		BgmInstance.value = wx.getBackgroundAudioManager();
	}
	
	const PlayBgm = (bgm:BgAudio) => {
		if(BgmInstance.value && BgmInstance.value.paused){
			BgmInstance.value.play();
		}
		BgmStatus.value = 'playing';
		CurrentBgm.value = bgm;
		BgmInstance.value.title = bgm.title;
		BgmInstance.value.epname = "顶流网红";
		BgmInstance.value.singer = "顶流网红";
		BgmInstance.value.coverImgUrl = "https://applet.cdn.wanjuyuanxian.com/whdz/achievement/logo.png";
		BgmInstance.value.src =  bgm.url;
		BgmInstance.value.onPlay(()=>{
			console.log('onPlay')
			BgmStatus.value = 'playing';
		})
		BgmInstance.value.onPause(()=>{
			console.log('onPause')
			BgmStatus.value = 'paused';
		})
		BgmInstance.value.onStop(()=>{
			console.log('onStop')
			BgmStatus.value = 'paused';
		})
		BgmInstance.value.onEnded(()=>{
			console.log('onEnded')
			BgmStatus.value = 'paused';
			if(bgm.loop){
				PlayBgm(bgm);
			}
		})
	}
	
	const PauseBgm = () => {
		if(BgmInstance.value){
			BgmInstance.value.pause();
		}
		BgmStatus.value = 'paused';
	}
	
	const StopBgm = () => {
		if(BgmInstance.value){
			BgmInstance.value.stop();
		}
		BgmStatus.value = 'paused';
	}
	return {
		CurrentBgm,
		BgmInstance,
		BgmStatus,
		InitBgm,
		PlayBgm,
		PauseBgm,
		StopBgm
	}
})