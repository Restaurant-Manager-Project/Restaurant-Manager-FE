import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [], 
  },
  server: {
    host: '0.0.0.0', // Lắng nghe trên mọi IP
    port: process.env.PORT || 3000, // Sử dụng cổng mà Render cấp (hoặc cổng mặc định là 3000)
    historyApiFallback: true,
  },
});

