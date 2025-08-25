export {}; // 确保这是模块，避免全局污染

declare global {
  interface Window {
    electronAPI: {
      notify: (user: string, msg: string) => void;
    };
  }
}
