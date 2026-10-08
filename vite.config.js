import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'jacket-assets-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/assets/jacket/')) {
            req.url = req.url.replace('/assets/jacket/', '/jacket/');
          }
          next();
        });
      }
    }
  ],
  esbuild: {
    loader: "jsx",
    include: [
      /src\/.*\.js$/,
      /src\/.*\.jsx$/
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
