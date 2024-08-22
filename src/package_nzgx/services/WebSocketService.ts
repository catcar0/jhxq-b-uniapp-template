import { useWebSocketStore } from '@/package_nzgx/stores';

export class WebSocketService {
  private url: string;
  private reconnectInterval: number;
  private socketTask: UniApp.SocketTask | null = null;
  
  // 定义 onOpen、onError 和 onClose 回调函数
  public onOpen: (() => void) | null = null;
  public onError: ((error: any) => void) | null = null;
  public onClose: (() => void) | null = null;

  constructor(url: string, reconnectInterval: number = 5000) {
    this.url = 'ws://mn.nzgx.api.wanjuyuanxian.com/ws/?' + url;
    // this.url = 'ws://132.232.57.64:8030/?' + url;
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
        // 调用 onError 回调函数（如果有）
        if (this.onError) {
          this.onError(error);
        }
      },
    });

    this.socketTask.onOpen(() => {
      console.log('WebSocket connection opened');
      // 调用 onOpen 回调函数（如果有）
      if (this.onOpen) {
        this.onOpen();
      }
    });

    this.socketTask.onMessage((event) => {
      // 处理消息
      const websocketStore = useWebSocketStore();
      const parsedData = JSON.parse(event.data);
      console.log(parsedData)
      if (parsedData.type === 'scores') {
        websocketStore.gameAddMessage(parsedData.data.statuses.allinfo.info);
      } else if(parsedData.players)  {
        websocketStore.addMessage(parsedData);
      } else if (parsedData.type === 'error') {
        websocketStore.addMessage(parsedData);
      }
    });

    this.socketTask.onError((error) => {
      console.error('WebSocket error:', error);
      // 调用 onError 回调函数（如果有）
      if (this.onError) {
        this.onError(error);
      }
    });

    this.socketTask.onClose(() => {
      console.log('WebSocket connection closed, reconnecting...');
      this.socketTask = null;
      // 调用 onClose 回调函数（如果有）
      if (this.onClose) {
        this.onClose();
      }
      // setTimeout(() => this.connect(), this.reconnectInterval);
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
          // 调用 onError 回调函数（如果有）
          if (this.onError) {
            this.onError(error);
          }
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
          // 调用 onError 回调函数（如果有）
          if (this.onError) {
            this.onError(error);
          }
        },
      });
    }
  }
}
