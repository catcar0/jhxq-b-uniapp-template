import { defineStore } from 'pinia'
import { ref } from 'vue'

type characters = {
    name: string,
    avatar: string,
    user:string,
    score:number
}
export const charactersStore = defineStore('characters', () => {
    const characters = ref<characters[]>([
        {
            name: '陈敏',
            avatar: 'http://159.138.147.87/statics/avatar/chenmin.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '白鹭',
            avatar: 'http://159.138.147.87/statics/avatar/bailu.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '尹萍',
            avatar: 'http://159.138.147.87/statics/avatar/yinpin.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '林佳',
            avatar: 'http://159.138.147.87/statics/avatar/linjia.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '李梦',
            avatar: 'http://159.138.147.87/statics/avatar/limeng.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '何阑',
            avatar: 'http://159.138.147.87/statics/avatar/helan.svg',
            user:'未知选手',
            score: 300
        }

    ])

    return {characters}
})