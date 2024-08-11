// src/utils/websocket.ts
import { useWebSocketStore } from '@/package_nzgx/stores';
export class WebSocketService {
    private url: string;
    private reconnectInterval: number;
    private socketTask: UniApp.SocketTask | null = null;
  
    constructor(url: string, reconnectInterval: number = 5000) {
      this.url = url;
      this.reconnectInterval = reconnectInterval;
    }
  
    public connect() {
      if (this.socketTask) {
        console.warn('WebSocket already connected');
        return;
      }
  
      this.socketTask = uni.connectSocket({
        url: this.url,
        success: () => {
          console.log('WebSocket connected');
        },
        fail: (error) => {
          console.error('WebSocket connection failed:', error);
        },
      });
  
      this.socketTask.onOpen(() => {
        console.log('WebSocket connection opened');
      });
  
      this.socketTask.onMessage((event) => {
        // console.log('WebSocket message received:', event.data);
        // 处理消息
        const websocketStore = useWebSocketStore();
        if (JSON.parse(event.data).type === 'scores') {
          websocketStore.gameAddMessage(JSON.parse(event.data).data.statuses.allinfo.info);
        } else {
          websocketStore.addMessage(JSON.parse(event.data));
        }
      });
  
      this.socketTask.onError((error) => {
        console.error('WebSocket error:', error);
      });
  
      this.socketTask.onClose(() => {
        console.log('WebSocket connection closed, reconnecting...');
        this.socketTask = null;
        setTimeout(() => this.connect(), this.reconnectInterval);
      });
    }
  
    public send(message: string) {
      if (this.socketTask) {
        this.socketTask.send({
          data: message,
          success: () => {
            console.log('Message sent');
          },
          fail: (error) => {
            console.error('Message sending failed:', error);
          },
        });
      } else {
        console.warn('WebSocket is not open');
      }
    }
  
    public close() {
      if (this.socketTask) {
        this.socketTask.close({
          success: () => {
            console.log('WebSocket connection closed');
          },
          fail: (error) => {
            console.error('WebSocket close failed:', error);
          },
        });
      }
    }
  }
  