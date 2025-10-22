<template>
    <div class="p-6">
        <div v-if="loading" class="flex justify-center items-center py-8">
            <i class="fa fa-spinner fa-spin text-3xl text-blue-600"></i>
        </div>

        <div v-else>
            <!-- Informações do valor total -->
            <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-lg font-semibold text-blue-900">
                    Valor Total do Evento: R$ {{ formatarValor(valorTotal) }}
                </p>
            </div>

            <!-- Lista de cardápios com checkboxes -->
            <div class="space-y-3 max-h-96 overflow-y-auto">
                <div
                    v-for="cardapio in cardapios"
                    :key="cardapio.id"
                    class="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    :class="{
                        'bg-blue-50 border-blue-300': cardapiosSelecionados.includes(cardapio.id),
                        'bg-white border-gray-200': !cardapiosSelecionados.includes(cardapio.id)
                    }"
                >
                    <input
                        :id="`cardapio-${cardapio.id}`"
                        type="checkbox"
                        :value="cardapio.id"
                        v-model="cardapiosSelecionados"
                        @change="calcularValorTotal"
                        class="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        :for="`cardapio-${cardapio.id}`"
                        class="ml-3 flex-1 cursor-pointer"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <p class="font-semibold text-gray-900">{{ cardapio.nome }}</p>
                                <p v-if="cardapio.descricao" class="text-sm text-gray-600 mt-1">
                                    {{ cardapio.descricao }}
                                </p>
                            </div>
                            <div class="ml-4 text-right">
                                <p class="font-bold text-green-600">
                                    R$ {{ formatarValor(cardapio.valor_total) }}
                                </p>
                            </div>
                        </div>
                    </label>
                </div>

                <div v-if="cardapios.length === 0" class="text-center text-gray-500 py-8">
                    <i class="fa fa-utensils text-4xl mb-3"></i>
                    <p>Nenhum cardápio cadastrado</p>
                </div>
            </div>

            <!-- Mensagem de erro -->
            <div v-if="errors.cardapios" class="mt-3 text-sm text-red-600">
                {{ errors.cardapios }}
            </div>

            <!-- Botões de ação -->
            <div class="mt-6 flex justify-end space-x-3">
                <button
                    type="button"
                    @click="fechar"
                    class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    :disabled="processing"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    @click="salvar"
                    class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
                    :disabled="processing || cardapiosSelecionados.length === 0"
                >
                    <i v-if="processing" class="fa fa-spinner fa-spin mr-2"></i>
                    <i v-else class="fa fa-save mr-2"></i>
                    {{ processing ? 'Salvando...' : 'Salvar Cardápios' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    data: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['close']);

const toast = useToast();
const events = inject('events');

const loading = ref(true);
const processing = ref(false);
const errors = ref({});
const cardapios = ref([]);
const cardapiosSelecionados = ref([]);
const valorTotal = ref(0);

// Calcular valor total baseado nos cardápios selecionados
function calcularValorTotal() {
    valorTotal.value = cardapios.value
        .filter(c => cardapiosSelecionados.value.includes(c.id))
        .reduce((total, c) => total + parseFloat(c.valor_total || 0), 0);
}

// Carregar dados do evento
async function carregarDados() {
    loading.value = true;
    try {
        const response = await axios.get(`/admin/cardapio-evento/${props.data.id}/edit`);
        cardapios.value = response.data.cardapios;
        cardapiosSelecionados.value = response.data.selecionados;
        valorTotal.value = response.data.valor_total;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar os cardápios');
    } finally {
        loading.value = false;
    }
}

// Salvar cardápios selecionados
async function salvar() {
    if (cardapiosSelecionados.value.length === 0) {
        errors.value.cardapios = 'Selecione pelo menos um cardápio';
        return;
    }

    processing.value = true;
    errors.value = {};

    try {
        const response = await axios.post(`/admin/cardapio-evento/${props.data.id}`, {
            cardapios: cardapiosSelecionados.value
        });

        if (response.data.success) {
            toast.success(response.data.message);
            events.emit('datatable-reload', 'eventos');
            fechar();
        }
    } catch (error) {
        console.error('Erro ao salvar:', error);

        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors;
        } else {
            toast.error('Erro ao salvar os cardápios');
        }
    } finally {
        processing.value = false;
    }
}

// Fechar modal
function fechar() {
    emit('close');
}

// Formatar valor
function formatarValor(valor) {
    return parseFloat(valor || 0).toFixed(2).replace('.', ',');
}

onMounted(() => {
    console.log(props.id)
    carregarDados();
});
</script>

<style scoped>
/* Customização do checkbox */
input[type="checkbox"]:checked {
    background-color: #2563eb;
    border-color: #2563eb;
}

/* Scroll customizado */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
