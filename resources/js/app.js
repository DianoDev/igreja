import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from 'ziggy-js';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import mitt from 'mitt';
import { createPinia } from 'pinia';
import { MaskInput } from 'vue-3-mask'; // Import the component

// Initialize
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const emitter = mitt();
const pinia = createPinia();

// Toast configuration
const toastOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
};
const cleanApp = () => {
    document.getElementById('app').removeAttribute('data-page');
};
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        // Register MaskInput as a global component
        app.component('MaskInput', MaskInput);

        app.use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .use(Toast, toastOptions);

        // Add events to global properties
        app.config.globalProperties.$events = emitter;

        // Provide events for composition API
        app.provide('events', emitter);

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
}).then(cleanApp);

