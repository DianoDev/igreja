<template>
    <LayoutPrincipal>
        <div class="container mx-auto p-6">
            <!-- Cabeçalho -->
            <div class="mb-6">
                <button
                    @click="voltar"
                    class="btn btn-secondary mb-4"
                >
                    <i class="fa fa-arrow-left mr-2"></i>
                    Voltar
                </button>

                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-800 mb-2">
                                {{ comissao.nome }}
                            </h1>
                            <p class="text-gray-600 text-lg">
                                <i class="fa fa-calendar mr-2"></i>
                                Ano: {{ comissao.ano }}
                            </p>
                        </div>
                        <div class="text-right">
                            <span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                                <i class="fa fa-users mr-2"></i>
                                {{ integrantesComissao.length }} integrantes
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Grid Principal: Integrantes -->
            <div class="grid grid-cols-1 gap-8">
                <!-- Integrantes da Comissão -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold">Integrantes da Comissão</h3>
                    </div>
                    <div class="card-body">
                        <!-- Formulário para adicionar integrante -->
                        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-semibold mb-3">Adicionar Integrante</h4>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <!-- Pessoa -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1 required">
                                        Pessoa
                                    </label>
                                    <Autocomplete
                                        v-model="novoIntegrante.id_pessoa"
                                        :fetch-suggestions="buscarPessoas"
                                        display-key="nome"
                                        value-key="id"
                                        placeholder="Digite o nome..."
                                        @update:model-value="onPessoaSelecionada"
                                    />
                                    <p v-if="errors.id_pessoa" class="mt-1 text-sm text-red-600">
                                        {{ errors.id_pessoa }}
                                    </p>
                                </div>

                                <!-- Cargo -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1 required">
                                        Cargo
                                    </label>
                                    <select
                                        v-model="novoIntegrante.id_cargo"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecione um cargo</option>
                                        <option v-for="cargo in cargos" :key="cargo.id" :value="cargo.id">
                                            {{ cargo.nome }}
                                        </option>
                                    </select>
                                    <p v-if="errors.id_cargo" class="mt-1 text-sm text-red-600">
                                        {{ errors.id_cargo }}
                                    </p>
                                </div>

                                <!-- Botão Adicionar -->
                                <div class="flex items-end">
                                    <button
                                        @click="adicionarIntegrante"
                                        :disabled="processing"
                                        class="btn btn-primary w-full"
                                    >
                                        <i class="fa fa-plus mr-2"></i>
                                        Adicionar Integrante
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Lista de integrantes -->
                        <div class="space-y-2">
                            <h4 class="font-semibold mb-3">Integrantes Cadastrados</h4>
                            <div
                                v-for="integrante in integrantesComissao"
                                :key="integrante.id"
                                class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <p class="font-medium">{{ integrante.pessoa.nome }}</p>
                                    <p class="text-sm text-gray-600">{{ integrante.cargo.nome }}</p>
                                </div>
                                <button
                                    @click="removerIntegrante(integrante.id)"
                                    class="text-red-600 hover:text-red-800"
                                    title="Remover"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            <div v-if="integrantesComissao.length === 0" class="text-center text-gray-500 py-4">
                                Nenhum integrante cadastrado ainda
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import Autocomplete from '@/Components/AutoCompletePessoa.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    comissao: {
        type: Object,
        required: true
    },
    cargos: {
        type: Array,
        required: true
    }
});

const toast = useToast();
const processing = ref(false);
const errors = ref({});

const integrantesComissao = ref([]);
const novoIntegrante = ref({
    id_pessoa: null,
    id_cargo: '',
    id_comissao: props.comissao.id
});

// Carregar integrantes ao montar
onMounted(() => {
    recarregarIntegrantes();
});

// Buscar pessoas
async function buscarPessoas(query) {
    try {
        const response = await axios.get('/admin/comissao-pessoa/buscar-pessoa', {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
        return [];
    }
}

function onPessoaSelecionada(pessoa) {
    novoIntegrante.value.id_pessoa = pessoa ? pessoa.id : null;
}

// Adicionar integrante
async function adicionarIntegrante() {
    errors.value = {};

    if (!novoIntegrante.value.id_pessoa) {
        errors.value.id_pessoa = 'Selecione uma pessoa';
        return;
    }

    if (!novoIntegrante.value.id_cargo) {
        errors.value.id_cargo = 'Selecione um cargo';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.post('/admin/comissao-pessoa/adicionar', novoIntegrante.value);

        if (response.data.success) {
            toast.success(response.data.message);
            await recarregarIntegrantes();
            novoIntegrante.value = {
                id_pessoa: null,
                id_cargo: '',
                id_comissao: props.comissao.id
            };
        }
    } catch (error) {
        toast.error('Erro ao adicionar integrante');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Remover integrante
async function removerIntegrante(id) {
    processing.value = true;

    try {
        const response = await axios.delete(`/admin/comissao-pessoa/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await recarregarIntegrantes();
        }
    } catch (error) {
        toast.error('Erro ao remover integrante');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Recarregar lista de integrantes
async function recarregarIntegrantes() {
    try {
        const response = await axios.get(`/admin/comissao-pessoa/comissao/${props.comissao.id}`);
        integrantesComissao.value = response.data;
    } catch (error) {
        console.error('Erro ao recarregar integrantes:', error);
    }
}

// Voltar para a lista
function voltar() {
    router.visit('/admin/comissao');
}
</script>

<style scoped>
.required::after {
    content: " *";
    color: red;
}

.card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
}

.card-header {
    @apply bg-gray-100 px-6 py-4 border-b;
}

.card-body {
    @apply p-6;
}

.btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
}

.btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed;
}

.btn-secondary {
    @apply bg-gray-600 text-white hover:bg-gray-700;
}
</style>
