// src/stores/websocketStore.ts
import { defineStore } from 'pinia';
import { WebSocketService } from '@/package_nzgx/services/WebSocketService';

export const useWebSocketStore = defineStore('webSocket', {
    state: () => ({
        webSocketService: new WebSocketService('ws://132.232.57.64:8010/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTcyNjM1NzUxNSwiYXZhdGFyIjoiaHR0cDovL2RlZmF1bHQudXJsL2RlZmF1bHQuanBnIiwidmlydHVhbFJvbGUiOiJkZWZhdWx0Um9sZSJ9.NK8wZ56tqIuGyDx6eJPuAI-iBYnYjyvahFs_1NRZFY0'), // 替换为你的 WebSocket URL
        messages: [],
    }),
    actions: {
        addMessage(message: string) {
            this.messages.push(message);
        },
        connect() {
            this.webSocketService.connect();
        },
        send(message: string) {
            this.webSocketService.send(message);
        },
        close() {
            this.webSocketService.close();
        },
    },
});
