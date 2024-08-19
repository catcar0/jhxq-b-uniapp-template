// src/stores/websocketStore.ts
import { defineStore } from 'pinia';
import { WebSocketService } from '@/package_nzgx/services/WebSocketService';
import { useMemberStore } from "@/package_nzgx/stores"
const memberStore = useMemberStore()
const token = memberStore.profile?.token
const roomId = memberStore.roomId
const virtualRoleId = memberStore.virtualRoleId
export const useWebSocketStore = defineStore('webSocket', {
    state: () => ({
        webSocketService: new WebSocketService(`token=${token}`), // 替换为你的 WebSocket URL
        gameWebSocketService: new WebSocketService(`token=${token}&room_id=${roomId}&virtual_role_id=${virtualRoleId}`), // 替换为你的 WebSocket URL
        messages: [],
        info: []
    }),
    actions: {
        gameAddMessage(newInfo: any) {
            this.info = newInfo;
            memberStore.setInfo(this.info)
        },
        gameConnect() {
            this.gameWebSocketService.connect();
        },
        gameSend(info: any) {
            this.gameWebSocketService.send(JSON.stringify({
                type: 'update_status',
                status_key: 'info',
                status_value: info,
                virtual_role_id: 'allinfo'
            }));
        },
        gameplayerFirstSend() {
            this.gameWebSocketService.send(JSON.stringify({
                type: 'update_status',
                status_key: 'first',
                status_value: '',
                virtual_role_id: 'first'
            }));
        },
        kickplayer(id:any){
            this.gameWebSocketService.send(JSON.stringify({
                type: 'kick_player',
                user_id:19691,
                virtual_role_id: id
            }));
        },
        updateInfo (nickname:string,avatar:string) {
            this.gameWebSocketService.send(JSON.stringify({
                type: 'update_player_info',
                updated_data: {
                    nickname: nickname,
                    avatar: avatar
                    },
                virtual_role_id: memberStore.virtualRoleId
            }));
        },
        getPlayerInfo () {
            this.gameWebSocketService.send(JSON.stringify({
                type: 'get_all_players_info'
            }));
        },
        closeRoom(){
            this.gameWebSocketService.send(JSON.stringify({
                type: 'close_room'
            }));
        },
        gameClose() {
            this.gameWebSocketService.close();
        },
        addMessage(message: any) {
            memberStore.setPlayerInfo(message)
            memberStore.playerInfo = message
            if (message.type && message.type === 'error') {
                this.messages.push(message);
                return
            }
        },
        connect() {
            this.webSocketService.connect();
        },
        send(message: any) {
            this.webSocketService.send(message);
        },
        close() {
            this.webSocketService.close();
        },
    },
});
