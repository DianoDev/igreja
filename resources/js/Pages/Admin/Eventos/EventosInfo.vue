<template>
    <LayoutPrincipal>
        <div class="page-content">
            <!-- Cabeçalho com informações do evento -->
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-primary mb-2">{{ evento.nome }}</h2>
                <div class="text-gray-600 mb-4">
                    <p><strong>Data:</strong> {{ formatarData(evento.data) }}</p>
                    <p><strong>Hora:</strong> {{ evento.hora }}</p>
                </div>
                <!-- Card de resumo financeiro -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-sm text-red-700 font-medium">Valor Gasto</p>
                        <p class="text-2xl font-bold text-red-900">
                            R$ {{ formatarValor(evento.valor_gasto || 0) }}
                        </p>
                        <p class="text-xs text-red-600 mt-1">
                            Ingredientes sem responsável
                        </p>
                    </div>
                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p class="text-sm text-green-700 font-medium">Valor Arrecadado</p>
                        <p class="text-2xl font-bold text-green-900">
                            R$ {{ formatarValor(evento.valor_arrecadado || 0) }}
                        </p>
                    </div>
                    <div class="p-4 border rounded-lg" :class="saldoClass">
                        <p class="text-sm font-medium" :class="saldoTextClass">Saldo</p>
                        <p class="text-2xl font-bold" :class="saldoTextClass">
                            R$ {{ formatarValor(saldo) }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Grid com 2 colunas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Coluna 1: Cardápios do Evento -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold">Cardápios do Evento</h3>
                    </div>
                    <div class="card-body">
                        <!-- Formulário para importar cardápio -->
                        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-semibold mb-3">Importar Cardápio</h4>
                            <div class="space-y-3">
                                <!-- Select de Cardápio Modelo -->
                                <div>
                                    <InputLabel for="cardapio_modelo" value="Cardápio Modelo" class="required" />
                                    <select
                                        id="cardapio_modelo"
                                        v-model="cardapioSelecionado"
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Selecione um cardápio</option>
                                        <option
                                            v-for="cardapio in cardapiosModelo"
                                            :key="cardapio.id"
                                            :value="cardapio.id"
                                        >
                                            {{ cardapio.nome }}
                                        </option>
                                    </select>
                                    <InputError :message="errors.cardapio_modelo" />
                                </div>

                                <!-- Botão Importar -->
                                <button
                                    @click="importarCardapio"
                                    :disabled="processing || !cardapioSelecionado"
                                    class="btn btn-primary w-full"
                                >
                                    <i class="fa fa-download mr-2"></i>
                                    Importar Cardápio
                                </button>
                            </div>
                        </div>

                        <!-- Lista de cardápios importados -->
                        <div class="space-y-4">
                            <h4 class="font-semibold mb-3">Cardápios Importados</h4>
                            <div
                                v-for="cardapio in cardapiosEvento"
                                :key="cardapio.id"
                                class="p-4 bg-white border rounded-lg"
                            >
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex-1">
                                        <p class="font-medium text-lg">{{ cardapio.nome }}</p>
                                        <p v-if="cardapio.descricao" class="text-sm text-gray-600 mt-1">
                                            {{ cardapio.descricao }}
                                        </p>
                                        <p class="text-sm font-semibold text-blue-700 mt-2">
                                            Valor Total: R$ {{ formatarValor(cardapio.valor_total) }}
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button
                                            @click="editarCardapio(cardapio)"
                                            class="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button
                                            @click="removerCardapio(cardapio.id)"
                                            class="text-red-600 hover:text-red-800"
                                            title="Remover"
                                        >
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Lista de ingredientes -->
                                <div v-if="cardapio.ingredientes && cardapio.ingredientes.length > 0" class="mt-3 pt-3 border-t">
                                    <div class="flex items-center justify-between mb-2">
                                        <p class="text-sm font-medium text-gray-700">Ingredientes:</p>
                                        <button
                                            @click="adicionarIngredienteAoCardapio(cardapio.id)"
                                            class="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            <i class="fa fa-plus mr-1"></i>
                                            Adicionar Ingrediente
                                        </button>
                                    </div>
                                    <div class="space-y-2">
                                        <div
                                            v-for="ingrediente in cardapio.ingredientes"
                                            :key="ingrediente.id"
                                            class="p-3 bg-gray-50 rounded border"
                                            :class="ingrediente.id_pessoa ? 'border-green-200 bg-green-50' : 'border-gray-200'"
                                        >
                                            <div class="flex justify-between items-start mb-2">
                                                <div class="flex-1">
                                                    <p class="font-medium text-sm">{{ ingrediente.nome }}</p>
                                                    <p class="text-xs text-gray-600">
                                                        {{ ingrediente.quantidade }} {{ ingrediente.unidade_medida }}
                                                        × R$ {{ formatarValor(ingrediente.valor_unitario) }}
                                                    </p>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <p class="text-sm font-bold" :class="ingrediente.id_pessoa ? 'text-green-700' : 'text-gray-700'">
                                                        R$ {{ formatarValor(ingrediente.valor_total) }}
                                                    </p>
                                                    <button
                                                        @click="editarIngrediente(ingrediente, cardapio.id)"
                                                        class="text-blue-600 hover:text-blue-800"
                                                        title="Editar"
                                                    >
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button
                                                        @click="removerIngrediente(ingrediente.id)"
                                                        class="text-red-600 hover:text-red-800"
                                                        title="Remover"
                                                    >
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Associar Pessoa ao Ingrediente -->
                                            <div class="mt-2">
                                                <div class="flex items-center gap-2">
                                                    <div class="flex-1">
                                                        <AutocompletePessoa
                                                            :modelValue="ingrediente.id_pessoa"
                                                            placeholder="Pessoa responsável..."
                                                            @update:modelValue="(pessoa) => associarPessoaIngrediente(ingrediente.id, pessoa)"
                                                            class="text-sm"
                                                        />
                                                    </div>
                                                    <button
                                                        v-if="ingrediente.id_pessoa"
                                                        @click="removerPessoaIngrediente(ingrediente.id)"
                                                        class="text-red-600 hover:text-red-800 text-sm"
                                                        title="Remover pessoa"
                                                    >
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                </div>
                                                <div class="mt-1">
                                                    <p v-if="ingrediente.pessoa" class="text-xs text-green-600">
                                                        ✓ {{ ingrediente.pessoa.nome }} - Valor não entra no gasto do evento
                                                    </p>
                                                    <p v-else class="text-xs text-yellow-600">
                                                        ⚠️ Sem responsável - Valor entra no gasto do evento
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="text-sm text-gray-500 text-center py-2">
                                    Nenhum ingrediente neste cardápio
                                </div>
                            </div>
                            <div v-if="cardapiosEvento.length === 0" class="text-center text-gray-500 py-4">
                                Nenhum cardápio importado ainda
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
import { ref, inject, computed, onMounted } from 'vue';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import AutocompletePessoa from '@/Components/AutoCompletePessoa.vue';
import { useToast } from 'vue-toastification';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
const events = inject('events');
const props = defineProps({
    evento: {
        type: Object,
        required: true
    },
    doacoesEvento: {
        type: Array,
        default: () => []
    }
});

const toast = useToast();
const processing = ref(false);
const errors = ref({});

// Estado local para as listas
const cardapiosEvento = ref([]);
const evento = ref([]);
const cardapiosModelo = ref([]);
const doacoesEvento = ref([...props.doacoesEvento]);
const cardapioSelecionado = ref('');

// Modal de edição
const modalEditarAberto = ref(false);
const cardapioEditando = ref(null);

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

// Computed para saldo (arrecadado - gasto)
const saldo = computed(() => {
    const arrecadado = parseFloat(evento.value.valor_arrecadado || 0);
    const gasto = parseFloat(evento.value.valor_gasto || 0);
    return arrecadado - gasto;
});

// Classes CSS para o card de saldo
const saldoClass = computed(() => {
    if (saldo.value > 0) return 'bg-blue-50 border-blue-200';
    if (saldo.value < 0) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
});

const saldoTextClass = computed(() => {
    if (saldo.value > 0) return 'text-blue-900';
    if (saldo.value < 0) return 'text-yellow-900';
    return 'text-gray-900';
});

// Carregar dados ao montar componente
onMounted(() => {
    carregarCardapiosModelo();
    carregarCardapiosEvento();
    carregarEvento();
    events.on('recarrega-evento', carregarTudo);
});
async function removerIngrediente(idIngrediente) {
    processing.value = true;

    try {
        const response = await axios.delete(`/admin/cardapio-evento/ingrediente/${idIngrediente}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarTudo();
        }
    } catch (error) {
        toast.error('Erro ao remover ingrediente');
        console.error(error);
    } finally {
        processing.value = false;
    }
}
function carregarTudo() {
    carregarCardapiosEvento();
    recarregarDoacoes();
    carregarEvento();
}
// Carregar cardápios modelo
async function carregarCardapiosModelo() {
    try {
        const response = await axios.get('/admin/cardapio-evento/cardapios-modelo');
        cardapiosModelo.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar cardápios modelo:', error);
    }
}

async function carregarEvento() {
    try {
        const response = await axios.get(`/admin/eventos/${props.evento.id}`);
        evento.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar cardápios modelo:', error);
    }
}

// Carregar cardápios do evento
async function carregarCardapiosEvento() {
    try {
        const response = await axios.get(`/admin/cardapio-evento/evento/${props.evento.id}`);
        cardapiosEvento.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar cardápios do evento:', error);
    }
}

// Importar cardápio
async function importarCardapio() {
    errors.value = {};

    if (!cardapioSelecionado.value) {
        errors.value.cardapio_modelo = 'Selecione um cardápio';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.post('/admin/cardapio-evento/importar', {
            id_evento: props.evento.id,
            id_cardapio: cardapioSelecionado.value
        });

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarTudo();
            cardapioSelecionado.value = '';
        }
    } catch (error) {
        toast.error('Erro ao importar cardápio');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Associar pessoa ao ingrediente
async function associarPessoaIngrediente(idIngrediente, pessoa) {
    processing.value = true;

    try {
        const response = await axios.post(
            `/admin/cardapio-evento/ingrediente/${idIngrediente}/associar-pessoa`,
            {
                id_pessoa: pessoa ? pessoa.id : null
            }
        );

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarTudo();
        }
    } catch (error) {
        toast.error('Erro ao associar pessoa');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Remover pessoa do ingrediente
async function removerPessoaIngrediente(idIngrediente) {
    await associarPessoaIngrediente(idIngrediente, null);
    await carregarTudo();
}


// Fechar modal de edição
function fecharModalEditar() {
    modalEditarAberto.value = false;
    cardapioEditando.value = null;
}

// Salvar edição do cardápio
async function salvarEdicaoCardapio(cardapioAtualizado) {
    processing.value = true;

    try {
        const response = await axios.put(
            `/admin/cardapio-evento/${cardapioAtualizado.id}`,
            cardapioAtualizado
        );

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarCardapiosEvento();
            router.reload({ only: ['evento'] });
            fecharModalEditar();
        }
    } catch (error) {
        toast.error('Erro ao atualizar cardápio');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Remover cardápio
async function removerCardapio(id) {
    if (!confirm('Tem certeza que deseja remover este cardápio?')) {
        return;
    }

    processing.value = true;

    try {
        const response = await axios.delete(`/admin/cardapio-evento/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarTudo();
        }
    } catch (error) {
        toast.error('Erro ao remover cardápio');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Callbacks para seleção de pessoa (doação)
function onPessoaDoacaoSelecionada(pessoa) {
    novaDoacao.value.id_pessoa = pessoa ? pessoa.id : null;
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
            await carregarTudo();
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
function abrirNovoCardapio() {
    events.emit('popup', {
        title: 'Novo Cardápio',
        component: 'EventoCardapioForm',
        data: {
            idEvento: props.evento.id,
            onSuccess: () => {
                carregarCardapiosEvento();
            }
        },
        size: 'lg',
        id: 'form-cardapio'
    });
}

// Modificar a função editarCardapio
function editarCardapio(cardapio) {
    events.emit('popup', {
        title: 'Editar Cardápio',
        component: 'EventoCardapioForm',
        data: {
            cardapio: cardapio,
            idEvento: props.evento.id,
            onSuccess: () => {
                carregarCardapiosEvento();
            }
        },
        size: 'lg',
        id: 'form-cardapio'
    });
}

// Adicionar novo ingrediente a um cardápio
function adicionarIngredienteAoCardapio(cardapioId) {
    events.emit('popup', {
        title: 'Adicionar Ingrediente',
        component: 'EventoCardapioIngredienteForm',
        data: {
            idCardapioEvento: cardapioId,
            onSuccess: () => {
                carregarTudo();
            }
        },
        size: 'md',
        id: 'form-ingrediente'
    });
}

// Editar ingrediente
function editarIngrediente(ingrediente, cardapioId) {
    events.emit('popup', {
        title: 'Editar Ingrediente',
        component: 'EventoCardapioIngredienteForm',
        data: {
            ingrediente: ingrediente,
            idCardapioEvento: cardapioId,
            onSuccess: () => {
                carregarCardapiosEvento();}
        },
        size: 'md',
        id: 'form-ingrediente'
    });
}
// Formatar data
const formatarData = (data) => {
    if (!data) return '-';

    try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return data;
    }
};

// Remover doação
async function removerDoacao(id) {
    processing.value = true;

    try {
        const response = await axios.delete(`/admin/doacao-evento/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarTudo();
            router.reload({ only: ['evento'] });
        }
    } catch (error) {
        toast.error('Erro ao remover doação');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Recarregar doações
async function recarregarDoacoes() {
    try {
        const response = await axios.get(`/admin/doacao-evento/evento/${props.evento.id}`);
        doacoesEvento.value = response.data;
    } catch (error) {
        console.error('Erro ao recarregar doações:', error);
    }
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
