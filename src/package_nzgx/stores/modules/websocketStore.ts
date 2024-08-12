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
        webSocketService: new WebSocketService(`ws://132.232.57.64:8010/?token=${token}`), // 替换为你的 WebSocket URL
        gameWebSocketService: new WebSocketService(`ws://132.232.57.64:8030/?token=${token}&room_id=${roomId}&virtual_role_id=${virtualRoleId}`), // 替换为你的 WebSocket URL
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
        gameClose() {
            this.gameWebSocketService.close();
        },
        addMessage(message: any) {
            this.messages.push(message);
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
