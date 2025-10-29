<template>
    <div class="">
        <!-- Search input with icon -->
        <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
            </div>
            <input
                type="text"
                class="w-full pl-10 pr-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Buscar..."
                v-model="keyword"
                @keyup="handleKeypress"
            />
            <button
                v-if="keyword"
                @click="reset"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <i class="fas fa-times-circle"></i>
            </button>
        </div>

        <!-- Action buttons -->
        <div class="flex space-x-1">
            <button
                type="button"
                class="flex-1 px-3 py-1.5  text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                @click="apply"
            >
                <i class="fas fa-filter mr-2"></i> Aplicar
            </button>
            <button
                type="button"
                class="flex-1  px-3 py-1.5  text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                @click="reset"
            >
                <i class="fas fa-times mr-2"></i> Limpar
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTableFilters } from '../../../table-filters.js';
import { onMounted, ref } from "vue";
const emit = defineEmits(['updated']);

const props = defineProps({
    table: { default: null },
    name: { default: null },
    filter: { default: null }
});

const keyword = ref(null);
const filterStore = useTableFilters();
const { setFilter } = filterStore;

const apply = () => {
    setFilter(props.table, props.filter.name ?? props.name, keyword.value);
    emit('updated', true);
}

const reset = () => {
    keyword.value = null;
    setFilter(props.table, props.filter.name ?? props.name, null);
    emit('updated', true);
}

const handleKeypress = (evt) => {
    if(evt.keyCode === 13) apply();
}

onMounted(() => {

})
</script>
