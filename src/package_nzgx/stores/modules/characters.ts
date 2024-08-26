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
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/chenmin.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '白鹭',
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/bailu.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '尹萍',
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/yinpin.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '林佳',
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/linjia.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '李梦',
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/limeng.svg',
            user:'未知选手',
            score: 300
        }, {
            name: '何阑',
            avatar: 'https://applet.cdn.wanjuyuanxian.com/nzgx/static/avatar/helan.svg',
            user:'未知选手',
            score: 300
        }

    ])

    return {characters}
})