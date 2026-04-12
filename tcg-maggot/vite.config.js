import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-cards',
      configureServer(server) {
        server.middlewares.use('/cards', (req, res, next) => {
          // req.url will be like /base1/base1_001_alakazam_holorare.png
          const cardsRoot = path.resolve(__dirname, 'src/data/cards')
          const filePath = path.join(cardsRoot, req.url)
          
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'image/png')
            res.setHeader('Cache-Control', 'public, max-age=31536000')
            fs.createReadStream(filePath).pipe(res)
          } else {
            next()
          }
        })
      }
    }
  ]
})
