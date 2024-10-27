import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@react-pdf/renderer'],
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
})
