<template>
    <LayoutPrincipal>
        <div class="page-content">
            <!-- Cabeçalho com informações do evento -->
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-primary mb-2">{{ props.evento.nome }}</h2>
                <div class="text-gray-600">
                    <p><strong>Data:</strong> {{ formatarData(props.evento.data) }}</p>
                    <p><strong>Hora:</strong> {{ props.evento.hora }}</p>
                </div>
            </div>

            <!-- Grid com 2 colunas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Coluna 1: Cargos do Evento -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold">Cargos do Evento</h3>
                    </div>
                    <div class="card-body">
                        <!-- Formulário para adicionar cargo -->
                        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-semibold mb-3">Adicionar Cargo</h4>
                            <div class="space-y-3">
                                <!-- Autocomplete de Pessoa -->
                                <div>
                                    <InputLabel for="pessoa_cargo" value="Buscar Pessoa" class="required" />
                                    <AutocompletePessoa
                                        v-model="novoCargo.id_pessoa"
                                        placeholder="Digite o nome da pessoa..."
                                        @update:modelValue="onPessoaCargoSelecionada"
                                    />
                                    <InputError :message="errors.id_pessoa_cargo" />
                                </div>

                                <!-- Select de Cargo -->
                                <div>
                                    <InputLabel for="cargo" value="Cargo" class="required" />
                                    <select
                                        id="cargo"
                                        v-model="novoCargo.id_cargo"
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Selecione um cargo</option>
                                        <option v-for="cargo in props.cargos" :key="cargo.id" :value="cargo.id">
                                            {{ cargo.nome }}
                                        </option>
                                    </select>
                                    <InputError :message="errors.id_cargo" />
                                </div>

                                <!-- Botão Adicionar -->
                                <button
                                    @click="adicionarCargo"
                                    :disabled="processing"
                                    class="btn btn-primary w-full"
                                >
                                    <i class="fa fa-plus mr-2"></i>
                                    Adicionar Cargo
                                </button>
                            </div>
                        </div>

                        <!-- Lista de cargos atribuídos -->
                        <div class="space-y-2">
                            <h4 class="font-semibold mb-3">Cargos Atribuídos</h4>
                            <div
                                v-for="cargoEvento in cargosEvento"
                                :key="cargoEvento.id"
                                class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <p class="font-medium">{{ cargoEvento.pessoa.nome }}</p>
                                    <p class="text-sm text-gray-600">{{ cargoEvento.cargo.nome }}</p>
                                </div>
                                <button
                                    @click="removerCargo(cargoEvento.id)"
                                    class="text-red-600 hover:text-red-800"
                                    title="Remover"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            <div v-if="cargosEvento.length === 0" class="text-center text-gray-500 py-4">
                                Nenhum cargo atribuído ainda
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coluna 2: Doações do Evento -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold">Doações do Evento</h3>
                    </div>
                    <div class="card-body">
                        <!-- Formulário para adicionar doação -->
                        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-semibold mb-3">Registrar Doação</h4>
                            <div class="space-y-3">
                                <!-- Autocomplete de Pessoa -->
                                <div>
                                    <InputLabel for="pessoa_doacao" value="Buscar Pessoa" class="required" />
                                    <AutocompletePessoa
                                        v-model="novaDoacao.id_pessoa"
                                        placeholder="Digite o nome da pessoa..."
                                        @update:modelValue="onPessoaDoacaoSelecionada"
                                    />
                                    <InputError :message="errors.id_pessoa_doacao" />
                                </div>

                                <!-- Input de Valor -->
                                <div>
                                    <InputLabel for="valor" value="Valor (R$)" class="required" />
                                    <TextInput
                                        id="valor"
                                        v-model="novaDoacao.valor"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        class="mt-1 block w-full"
                                    />
                                    <InputError :message="errors.valor" />
                                </div>

                                <!-- Botão Adicionar -->
                                <button
                                    @click="adicionarDoacao"
                                    :disabled="processing"
                                    class="btn btn-primary w-full"
                                >
                                    <i class="fa fa-plus mr-2"></i>
                                    Registrar Doação
                                </button>
                            </div>
                        </div>

                        <!-- Lista de doações registradas -->
                        <div class="space-y-2">
                            <h4 class="font-semibold mb-3">Doações Registradas</h4>
                            <div
                                v-for="doacao in doacoesEvento"
                                :key="doacao.id"
                                class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <p class="font-medium">{{ doacao.pessoa.nome }}</p>
                                    <p class="text-sm text-green-600 font-semibold">
                                        R$ {{ formatarValor(doacao.valor) }}
                                    </p>
                                </div>
                                <button
                                    @click="removerDoacao(doacao.id)"
                                    class="text-red-600 hover:text-red-800"
                                    title="Remover"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            <div v-if="doacoesEvento.length === 0" class="text-center text-gray-500 py-4">
                                Nenhuma doação registrada ainda
                            </div>

                            <!-- Total de doações -->
                            <div v-if="doacoesEvento.length > 0" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p class="text-lg font-semibold text-green-800">
                                    Total de Doações: R$ {{ formatarValor(totalDoacoes) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botão Voltar -->
            <div class="mt-6">
                <button @click="voltar" class="btn btn-secondary">
                    <i class="fa fa-arrow-left mr-2"></i>
                    Voltar
                </button>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import AutocompletePessoa from '@/Components/AutoCompletePessoa.vue';
import { useToast } from 'vue-toastification';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

const props = defineProps({
    evento: {
        type: Object,
        required: true
    },
    cargos: {
        type: Array,
        default: () => []
    },
    cargosEvento: {
        type: Array,
        default: () => []
    },
    doacoesEvento: {
        type: Array,
        default: () => []
    }
});

const toast = useToast();
const events = inject('events');
const processing = ref(false);
const errors = ref({});

// Estado local para as listas
const cargosEvento = ref([...props.cargosEvento]);
const doacoesEvento = ref([...props.doacoesEvento]);

// Formulário novo cargo
const novoCargo = ref({
    id_pessoa: null,
    id_cargo: '',
    id_evento: props.evento.id
});

// Formulário nova doação
const novaDoacao = ref({
    id_pessoa: null,
    valor: '',
    id_evento: props.evento.id
});

// Computed para total de doações
const totalDoacoes = computed(() => {
    return doacoesEvento.value.reduce((total, doacao) => {
        return total + parseFloat(doacao.valor || 0);
    }, 0);
});

// Callbacks para seleção de pessoa
function onPessoaCargoSelecionada(pessoa) {
    novoCargo.value.id_pessoa = pessoa ? pessoa.id : null;
}

function onPessoaDoacaoSelecionada(pessoa) {
    novaDoacao.value.id_pessoa = pessoa ? pessoa.id : null;
}

// Adicionar cargo
async function adicionarCargo() {
    errors.value = {};

    if (!novoCargo.value.id_pessoa) {
        errors.value.id_pessoa_cargo = 'Selecione uma pessoa';
        return;
    }

    if (!novoCargo.value.id_cargo) {
        errors.value.id_cargo = 'Selecione um cargo';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.post('/admin/cargo-evento/adicionar', novoCargo.value);

        if (response.data.success) {
            toast.success(response.data.message);
            // Recarregar a lista
            await recarregarCargos();
            // Limpar formulário
            novoCargo.value = {
                id_pessoa: null,
                id_cargo: '',
                id_evento: props.evento.id
            };
        }
    } catch (error) {
        toast.error('Erro ao adicionar cargo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Remover cargo
async function removerCargo(id) {

    processing.value = true;

    try {
        const response = await axios.delete(`/admin/cargo-evento/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await recarregarCargos();
        }
    } catch (error) {
        toast.error('Erro ao remover cargo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Adicionar doação
async function adicionarDoacao() {
    errors.value = {};

    if (!novaDoacao.value.id_pessoa) {
        errors.value.id_pessoa_doacao = 'Selecione uma pessoa';
        return;
    }

    if (!novaDoacao.value.valor || parseFloat(novaDoacao.value.valor) <= 0) {
        errors.value.valor = 'Informe um valor válido';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.post('/admin/doacao-evento/adicionar', novaDoacao.value);

        if (response.data.success) {
            toast.success(response.data.message);
            // Recarregar a lista
            await recarregarDoacoes();
            // Limpar formulário
            novaDoacao.value = {
                id_pessoa: null,
                valor: '',
                id_evento: props.evento.id
            };
        }
    } catch (error) {
        toast.error('Erro ao registrar doação');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Remover doação
async function removerDoacao(id) {

    processing.value = true;

    try {
        const response = await axios.delete(`/admin/doacao-evento/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await recarregarDoacoes();
        }
    } catch (error) {
        toast.error('Erro ao remover doação');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Recarregar listas
async function recarregarCargos() {
    try {
        const response = await axios.get(`/admin/cargo-evento/evento/${props.evento.id}`);
        cargosEvento.value = response.data;
    } catch (error) {
        console.error('Erro ao recarregar cargos:', error);
    }
}

async function recarregarDoacoes() {
    try {
        const response = await axios.get(`/admin/doacao-evento/evento/${props.evento.id}`);
        doacoesEvento.value = response.data;
    } catch (error) {
        console.error('Erro ao recarregar doações:', error);
    }
}

// Formatadores
function formatarData(data) {
    if (!data) return '';
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatarValor(valor) {
    return parseFloat(valor || 0).toFixed(2).replace('.', ',');
}

// Voltar para a lista
function voltar() {
    router.visit('/admin/eventos');
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
