import {defineConfig, loadEnv} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'node:path';

export default defineConfig(({ command, mode }) => {
    const cwd = process.cwd();
    const env = {...loadEnv(mode, cwd, 'VITE_')};
    return {
        optimizeDeps: {
            exclude: []
        },
        server: {
            fs: {
                cachedChecks: false
            },
            host: true,
            strictPort: true,
            port: Number(env.VITE_PORT || '5173'),
            hmr: {
                host: env.VITE_HMR_HOST || "localhost",
            },
        },
        resolve: {
            alias: [
                {
                    find: /^~(.*)$/,
                    replacement: '$1',
                },
                { find: "@", replacement: resolve(__dirname, "./resources/js") }
            ]
        },
        plugins: [
            laravel({
                input: 'resources/js/app.js',
                ssr: 'resources/js/ssr.js',
                refresh: true,
            }),

            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ]
    }
});
