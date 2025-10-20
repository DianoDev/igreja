<template>
    <Modal
        :show="isOpen"
        :max-width="modalSize"
        :closeable="true"
        @close="close"
    >
        <!-- Header with improved spacing and cleaner design -->
        <div class="px-6 py-4 bg-gray-700 border-b">
            <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-100" id="modal-title">
                    {{ title }}
                </h3>
                <button
                    type="button"
                    class="rounded-md p-1.5 text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-700"
                    @click="close"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Body with improved spacing and handling of component loading -->
        <div class="min-h-[200px] max-h-[80vh] bg-white p-6 overflow-y-auto">
            <!-- Loading indicator -->
            <div v-if="isLoading" class="flex items-center justify-center h-40">
                <div class="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
            </div>

            <!-- Error message if component fails to load -->
            <div v-else-if="componentError" class="p-4 rounded-md bg-red-900/20">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-200">Erro ao carregar componente</h3>
                        <div class="mt-2 text-sm text-red-300">
                            {{ componentError }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Component render -->
            <component
                v-else-if="componentToRender"
                :is="componentToRender"
                v-bind="data"
                :id="id"
                :data="data"
                @close="close"
            />
        </div>
    </Modal>
</template>

<script setup>
import { ref, computed, onMounted, inject, onBeforeUnmount, markRaw } from 'vue';
import Modal from './Modal.vue';

// Pre-load all possible components using Vite's import.meta.glob
// This creates a map of components that can be loaded dynamically
const adminComponents = import.meta.glob('../Pages/Admin/**/*.vue');
const cidadaoComponents = import.meta.glob('../Pages/Cidadao/**/*.vue');
const genericComponents = import.meta.glob('../Components/*.vue');

// Inject event emitter
const events = inject('events');

// State
const isOpen = ref(false);
const componentToRender = ref(null);
const id = ref(null);
const data = ref(null);
const title = ref(null);
const size = ref('md');
const isLoading = ref(false);
const componentError = ref(null);

// Component cache to prevent reloading components
const componentCache = new Map();

// Computed prop to convert size to Tailwind Modal format
const modalSize = computed(() => {
    switch (size.value) {
        case 'sm': return 'sm';
        case 'md': return 'md';
        case 'lg': return 'lg';
        case 'xl': return 'xl';
        case '2xl': return '2xl';
        case '3xl': return '3xl';
        case '4xl': return '4xl';
        case '5xl': return '5xl';
        case '6xl': return '6xl';
        case 'full': return 'full';
        default: return 'md';
    }
});

/**
 * Resolves a component by name, with proper path resolution and error handling
 */
 const resolveComponent = async (componentName) => {
    if (componentCache.has(componentName)) {
        return componentCache.get(componentName);
    }

    try {
        const folderName = componentName.replace(/Form$|Grid$|List$|Index$|Detail$/, '');

        const possiblePatterns = [
            `../Pages/Admin/${folderName}/${componentName}.vue`,
            `../Pages/Cidadao/${folderName}/${componentName}.vue`,
            `../components/${componentName}.vue`,
        ];

        let componentModule = null;
        let foundComponent = false;

        for (const pattern of possiblePatterns) {
            if (adminComponents[pattern]) {
                componentModule = adminComponents[pattern];
                foundComponent = true;
                
                break;
            } else if (cidadaoComponents[pattern]) {
                componentModule = cidadaoComponents[pattern];
                foundComponent = true;
                
                break;
            } else if (genericComponents[pattern]) {
                componentModule = genericComponents[pattern];
                foundComponent = true;
                
                break;
            }
        }

        // Busca ampla, caso nenhum pattern tenha batido
        if (!foundComponent) {
            const allPaths = [
                ...Object.keys(adminComponents),
                ...Object.keys(cidadaoComponents),
                ...Object.keys(genericComponents),
            ];

            const matchingPath = allPaths.find(path => {
                return path.endsWith(`/${componentName}.vue`);
            });

            if (matchingPath) {
                componentModule =
                    adminComponents[matchingPath] ||
                    cidadaoComponents[matchingPath] ||
                    genericComponents[matchingPath];
                foundComponent = true;
                
            }
        }

        if (!foundComponent) {
            throw new Error(`Component ${componentName} could not be found in any location`);
        }

        const loadedComponent = await componentModule();
        const registeredComponent = markRaw(loadedComponent.default);
        componentCache.set(componentName, registeredComponent);
        return registeredComponent;
    } catch (error) {
        console.error(`Failed to load component: ${componentName}`, error);
        componentError.value = `Não foi possível carregar o componente "${componentName}". Verifique o console para mais detalhes.`;
        return null;
    }
};


/**
 * Opens the popup with the specified component
 */
const open = async (evt) => {
    // Reset state
    isLoading.value = true;
    componentError.value = null;
    componentToRender.value = null;

    // Set popup properties
    id.value = evt.id || 'component-popup';
    title.value = evt.title || 'Sem título';
    size.value = evt.size || 'lg';
    data.value = evt.data ? markRaw(evt.data) : null;
    isOpen.value = true;

    try {
        // Load component
        componentToRender.value = await resolveComponent(evt.component);
    } catch (error) {
        componentError.value = `Erro ao carregar o componente: ${error.message}`;
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

/**
 * Closes the popup and resets state
 */
const close = () => {
    isOpen.value = false;
    

    // Reset state after animation completes
    setTimeout(() => {
        componentToRender.value = null;
        id.value = null;
        data.value = null;
        title.value = null;
        componentError.value = null;
    }, 300);
};

// Event listeners
onMounted(() => {
    events.on('popup', open);
    events.on('popup-close', close);
});

onBeforeUnmount(() => {
    events.off('popup', open);
    events.off('popup-close', close);
});
</script>
