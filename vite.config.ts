import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import svgr from 'vite-plugin-svgr'
import { generateSitemap } from './generate-sitemap'
import { generateRSS } from './generate-rss'


export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
        },
    },
    server: {
        port: 5174
    },
    define: {
        'process.env': process.env
    },
    plugins: [
        react(),
        svgr(
            {
                svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
                include: "**/*.svg",
            }
        ),
        {
            name: 'vite-plugin-sitemap',
            apply: 'build',
            closeBundle: generateSitemap,
        },
        {
            name: 'vite-plugin-generate-rss',
            apply: 'build',
            closeBundle: async () => {
                await generateRSS()
            }
        }
    ],
    build: {
        rollupOptions:
            {
                output: {
                    manualChunks: ( id ) => {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString()
                        }
                    }
                }
            },
    },
    preview: {
        host: true,
        port: 8080,
    },
})
