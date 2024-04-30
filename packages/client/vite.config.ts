import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
        __SERVER_PORT__: process.env.SERVER_PORT,
        __EXTERNAL_SERVER_PATH__: JSON.stringify(
            process.env.EXTERNAL_SERVER_PATH
        ),
        __SERVER_URL__: JSON.stringify(process.env.SERVER_URL),
        // ts-jest не воспринимает import.meta.env.DEV
        __NODE_ENV__: JSON.stringify(mode),
    },
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@types': path.resolve(__dirname, './src/types'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@store': path.resolve(__dirname, './src/store'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@api': path.resolve(__dirname, './src/api'),
            '@game-core': path.resolve(__dirname, './src/game-core'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    },
    build: {
        outDir: path.join(__dirname, 'dist/client'),
    },
    ssr: {
        format: 'cjs',
    },
}))
