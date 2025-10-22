<template>
    <div class="relative">
        <input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            :placeholder="placeholder"
            @input="onInput"
            @focus="showDropdown = true"
            @blur="onBlur"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <!-- Dropdown de resultados -->
        <div
            v-if="showDropdown && (loading || pessoas.length > 0)"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
            <!-- Loading -->
            <div v-if="loading" class="px-4 py-3 text-sm text-gray-500">
                <i class="fa fa-spinner fa-spin mr-2"></i>
                Buscando...
            </div>

            <!-- Lista de pessoas -->
            <div v-else>
                <button
                    v-for="pessoa in pessoas"
                    :key="pessoa.id"
                    type="button"
                    @mousedown.prevent="selecionarPessoa(pessoa)"
                    class="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                    <div class="font-medium">{{ pessoa.nome }}</div>
                    <div class="text-sm text-gray-600">
                        <span v-if="pessoa.cpf">CPF: {{ formatarCPF(pessoa.cpf) }}</span>
                        <span v-if="pessoa.telefone" class="ml-3">Tel: {{ pessoa.telefone }}</span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Pessoa selecionada -->
        <div
            v-if="pessoaSelecionada"
            class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between"
        >
            <div>
                <p class="font-medium text-blue-900">{{ pessoaSelecionada.nome }}</p>
                <p class="text-sm text-blue-700">
                    <span v-if="pessoaSelecionada.cpf">CPF: {{ formatarCPF(pessoaSelecionada.cpf) }}</span>
                    <span v-if="pessoaSelecionada.telefone" class="ml-3">Tel: {{ pessoaSelecionada.telefone }}</span>
                </p>
            </div>
            <button
                type="button"
                @click="limpar"
                class="text-blue-600 hover:text-blue-800"
                title="Limpar seleção"
            >
                <i class="fa fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    modelValue: {
        type: Number,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Digite para buscar...'
    }
});

const emit = defineEmits(['update:modelValue']);

const inputRef = ref(null);
const searchQuery = ref('');
const pessoas = ref([]);
const loading = ref(false);
const showDropdown = ref(false);
const pessoaSelecionada = ref(null);
let debounceTimeout = null;

// Buscar pessoas na API
async function buscarPessoas(query) {
    if (query.length < 2) {
        pessoas.value = [];
        return;
    }

    loading.value = true;

    try {
        const response = await axios.get('/admin/cargo-evento/buscar-pessoa', {
            params: { query }
        });
        pessoas.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        pessoas.value = [];
    } finally {
        loading.value = false;
    }
}

// Input com debounce
function onInput() {
    // Limpar seleção anterior ao digitar
    if (pessoaSelecionada.value) {
        limpar();
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        buscarPessoas(searchQuery.value);
    }, 300);
}

// Selecionar pessoa
function selecionarPessoa(pessoa) {
    pessoaSelecionada.value = pessoa;
    searchQuery.value = pessoa.nome;
    showDropdown.value = false;
    emit('update:modelValue', pessoa);
}

// Limpar seleção
function limpar() {
    pessoaSelecionada.value = null;
    searchQuery.value = '';
    pessoas.value = [];
    emit('update:modelValue', null);
}

// Fechar dropdown ao perder foco
function onBlur() {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200);
}

// Formatar CPF
function formatarCPF(cpf) {
    if (!cpf) return '';
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Watch para mudanças externas no modelValue
watch(() => props.modelValue, (newValue) => {
    if (!newValue && pessoaSelecionada.value) {
        limpar();
    }
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
