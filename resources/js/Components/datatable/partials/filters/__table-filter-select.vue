<template>
    <div class="">
        <!-- Select dropdown with icon -->
        <div class="relative mb-4">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-filter text-gray-400"></i>
            </div>
            <select
                v-model="selectedItem"
                @change="apply"
                class="w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
                <option value="">TODOS</option>
                <option
                    v-for="option of filter.options"
                    :key="filter.id ? option[filter.id] : option.id"
                    :value="filter.id ? option[filter.id] : option.id"
                >
                    {{ filter.label ? option[filter.label] : option.name }}
                </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="flex space-x-3">
            <button
                type="button"
                class="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                @click="apply"
            >
                <i class="fas fa-check mr-2"></i> Aplicar
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
import {onMounted, ref} from "vue";

const props = defineProps({
    table: { default: null },
    name: { default: null },
    filter: { type: Object }
});

const selectedItem = ref();
const emit = defineEmits(['updated']);
const filterStore = useTableFilters();
const { setFilter } = filterStore;

const apply = () => {
    setFilter(props.table, props.filter.name ?? props.name, selectedItem.value);
    emit('updated', true);
}

const reset = () => {
    selectedItem.value = null;
    setFilter(props.table, props.filter.name ?? props.name, null);
    emit('updated', true);
}

onMounted(() => {

})
</script>

<style scoped>
/* Custom scrollbar for long select lists */
select {
    max-height: 200px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

select::-webkit-scrollbar {
    width: 6px;
}

select::-webkit-scrollbar-track {
    background: transparent;
}

select::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
}
</style>
