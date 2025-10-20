<template>
    <div class="relative inline-block text-left" ref="dropdownRef">
        <template v-if="hasSingleItem">
            <button type="button" @click="handleSingleItemAction(singleItem)" :data-tooltip="singleItem?.text" :class="[
                'tooltip tooltip--top',
                'inline-flex justify-center px-2 py-1 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm',
                singleItem.type === 'delete' ? 'text-red-500 hover:text-red-600' : 'text-primary hover:text-primary-hover',
                'hover:bg-gray-50'
            ]">
                <i :class="`fas ${singleItem.type === 'delete' ? 'fa-trash' : singleItem.icon}`"></i>
            </button>
        </template>


        <template v-else>
            <div>
                <button type="button" @click="toggleDropdown"
                    class="inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <i class="fas fa-ellipsis"></i>
                </button>
            </div>

            <div v-if="open"
                class="absolute right-0 z-10 mt-2 bg-[#fafafa] border border-gray-300 rounded-md shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
                <div class="py-1 text-sm text-gray-700">
                    <template v-for="(item, index) in items" :key="index">
                        <div v-if="item.disabled" :data-tooltip="item.disabledTooltip"
                            class="flex items-center px-6 py-3 text-gray-400 cursor-not-allowed tooltip-dropdown tooltip-dropdown--left">
                            <i :class="`w-4 mr-2 text-center fas ${item.icon || 'fa-ban'}`"></i>
                            {{ item.text }}
                        </div>

                        <template v-else>

                            <a v-if="item.type === 'anchor' && !item.openNewTab" href="#"
                                @click.prevent="inertiaRouter(item)"
                                class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary">
                                <i :class="`w-4 mr-2 text-center fas ${item.icon}`"></i> {{ item.text }}
                            </a>
                            <a v-if="item.type === 'anchor' && item.openNewTab" :href="item.href"
                                target='_blank'
                                class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary">
                                <i :class="`w-4 mr-2 text-center fas ${item.icon}`"></i> {{ item.text }}
                            </a>
                            <a v-else-if="item.type === 'modal'" href="javascript:;"
                                class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary"
                                @click="emitPopup(item)">
                                <i :class="`w-4 mr-2 text-center fas ${item.icon}`"></i> {{ item.text }}
                            </a>
                            <a v-else-if="item.type === 'confirmation'" href="javascript:;"
                                class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary"
                                @click="handleConfirmation(item)">
                                <i :class="`w-4 mr-2 text-center fas ${item.icon}`"></i> {{ item.text }}
                            </a>
                            <a v-else-if="item.type === 'delete'" href="javascript:;"
                                class="flex items-center px-6 py-3 hover:bg-gray-100 hover:text-red-500"
                                @click="handleDelete(item)">
                                <i :class="`w-4 mr-2 text-center fas fa-trash`"></i> {{ item.text }}
                            </a>
                        </template>

                        <div v-if="index < items.length - 1" class="dropdown-divider"></div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, inject, computed } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";
import { router } from '@inertiajs/vue3';

const props = defineProps({
    data: [String, Number, Object],
    reference: Object,
    items: Array
});

const events = inject('events');
const toast = useToast();
const open = ref(false);
const dropdownRef = ref(null);
const dropdownId = Symbol();
const hasSingleItem = computed(() => props.items?.length === 1);
const singleItem = computed(() => hasSingleItem.value ? props.items[0] : null);

const toggleDropdown = () => {
    const shouldOpen = !open.value;
    events.emit('close-dropdowns', dropdownId);
    open.value = shouldOpen;
};

const closeDropdown = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        open.value = false;
    }
};

const closeThisDropdown = (idToKeepOpen) => {
    if (dropdownId !== idToKeepOpen) {
        open.value = false;
    }
};

const emitPopup = (item) => {
    open.value = false;
    events.emit('popup', {
        component: item.dataComponent,
        data: item.dataJson,
        size: item.dataSize ?? null,
        title: item.dataTitle ?? null
    });
};

const handleDelete = (item) => {
    open.value = false;
    if (!item.deleteUrl) {
        console.error('Dropdown: a propriedade "deleteUrl" não foi definida para o item de exclusão.')
        return;
    }
    events.emit('confirmation', {
        title: item.dataTitle || 'Confirmação',
        message: item.dataMessage || 'Você deseja realmente excluir este registro?',
        event: async () => {
            events.emit('loading', true);
            try {
                await axios.delete(item.deleteUrl);
                toast.success("Registro removido com sucesso!");
                events.emit('table-reload');
            } catch (err) {
                const message = err.response?.data?.message || "Ocorreu um erro ao remover o registro.";
                toast.error(message);
                console.error("Erro ao excluir:", err);
            } finally {
                events.emit('loading', false);
            }
        }
    });
};

const handleConfirmation = (item) => {
    open.value = false;
    if (!item.confirmationUrl) {
        console.error('Dropdown: a propriedade "confirmationUrl" não foi definida para o item de exclusão.')
        return;
    }
    events.emit('confirmation', {
        title: item.dataTitle || 'Confirmação',
        message: item.dataMessage || 'Você deseja realmente excluir este registro?',
        event: async () => {
            events.emit('loading', true);
            try {
                await axios.post(item.confirmationUrl, { id: item?.dataJson?.id });
                toast.success(item.confirmationSuccess);
                events.emit('table-reload');
            } catch (err) {
                const message = err.response?.data?.message || "Ocorreu um erro ao remover o registro.";
                toast.error(message);
                console.error("Erro ao excluir:", err);
            } finally {
                events.emit('loading', false);
            }
        }
    });
};

const inertiaRouter = (item) => {
    if (item.href) {
        const isInertia = item.useInertia ?? true;

        if (isInertia) {
            router.visit(item.href);
        } else {
            window.location.href = item.href;
        }
    }
};


const handleSingleItemAction = (item) => {
    if (item.disabled) return;

    switch (item.type) {
        case 'modal':
            emitPopup(item);
            break;
        case 'confirmation':
            handleConfirmation(item);
            break;
        case 'delete':
            handleDelete(item);
            break;
        case 'anchor':
            inertiaRouter(item);
            break;
        default:
            console.warn("Tipo de item não tratado:", item);
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdown);
    events.on('close-dropdowns', closeThisDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
    events.off('close-dropdowns', closeThisDropdown);
});
</script>

<style scoped>
.tooltip-dropdown {
    position: relative;
    display: inline-block;
    cursor: default;
}

.tooltip-dropdown::before {
    content: attr(data-tooltip);
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    margin-right: 12px;
    padding: 8px 12px;
    white-space: nowrap;
    background-color: #EFEF7E;
    color: #000;
    border-radius: 6px;
    font-size: 0.875rem;
    line-height: 1.2;
    box-shadow: 0 4px 8px rgba(80, 80, 80, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
    z-index: 2;
}

.tooltip-dropdown::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    margin-right: 5px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid #EFEF7E;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
    z-index: 3;
}

.tooltip-dropdown:hover::before,
.tooltip-dropdown:hover::after {
    opacity: 1;
    visibility: visible;
}



.dropdown-divider {
    height: 1px;
    background: #E5E7EB;
}
</style>
