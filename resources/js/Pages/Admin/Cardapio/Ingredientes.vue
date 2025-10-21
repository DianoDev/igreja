<template>
    <LayoutPrincipal>
        <div class="max-w-6xl mx-auto p-6">
            <div class="bg-white rounded-lg shadow-md p-6">
                <!-- Cabeçalho -->
                <div class="mb-6 pb-4 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800">
                        Ingredientes - {{ props.cardapio?.nome }}
                    </h2>
                    <p class="text-sm text-gray-600 mt-1">{{ props.cardapio?.descricao }}</p>
                </div>

                <!-- Lista de Ingredientes -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold text-gray-700 me-5">Lista de Ingredientes</h3>
                        <button
                            type="button"
                            class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                            @click="adicionarIngrediente"
                        >
                            <i class="ms-1 fa fa-plus"></i> Adicionar Ingrediente
                        </button>
                    </div>

                    <!-- Mensagem quando não há ingredientes -->
                    <div v-if="ingredientes.length === 0" class="text-center py-8 text-gray-500">
                        <i class="fa fa-inbox text-4xl mb-2"></i>
                        <p>Nenhum ingrediente adicionado ainda.</p>
                    </div>

                    <!-- Cards de Ingredientes -->
                    <div v-else class="space-y-4">
                        <div
                            v-for="(ingrediente, index) in ingredientes"
                            :key="index"
                            class="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                            <div class="flex justify-between items-start mb-3">
                                <h4 class="text-md font-semibold text-gray-700">
                                    Ingrediente {{ index + 1 }}
                                </h4>
                                <button
                                    type="button"
                                    class="text-red-600 hover:text-red-800"
                                    @click="removerIngrediente(index)"
                                    title="Remover ingrediente"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <!-- Nome -->
                                <div class="lg:col-span-2">
                                    <InputLabel :for="'nome_' + index" value="Nome" class="required"/>
                                    <TextInput
                                        :id="'nome_' + index"
                                        class="w-full"
                                        v-model="ingrediente.nome"
                                        placeholder="Ex: Farinha de trigo"
                                    />
                                    <InputError :message="errors[`ingredientes.${index}.nome`]"/>
                                </div>

                                <!-- Quantidade -->
                                <div>
                                    <InputLabel :for="'quantidade_' + index" value="Quantidade"/>
                                    <TextInput
                                        :id="'quantidade_' + index"
                                        class="w-full"
                                        type="number"
                                        step="0.01"
                                        v-model="ingrediente.quantidade"
                                        @input="calcularValorTotal(index)"
                                        placeholder="0.00"
                                    />
                                    <InputError :message="errors[`ingredientes.${index}.quantidade`]"/>
                                </div>

                                <!-- Unidade de Medida -->
                                <div>
                                    <InputLabel :for="'unidade_' + index" value="Unidade" class="required"/>
                                    <select
                                        :id="'unidade_' + index"
                                        class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        v-model="ingrediente.unidade_medida"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="kg">Quilograma (kg)</option>
                                        <option value="g">Grama (g)</option>
                                        <option value="l">Litro (l)</option>
                                        <option value="ml">Mililitro (ml)</option>
                                        <option value="un">Unidade (un)</option>
                                        <option value="cx">Caixa (cx)</option>
                                        <option value="pct">Pacote (pct)</option>
                                    </select>
                                    <InputError :message="errors[`ingredientes.${index}.unidade_medida`]"/>
                                </div>

                                <!-- Valor Unitário -->
                                <div>
                                    <InputLabel :for="'valor_unitario_' + index" value="Valor Unit. (R$)" class="required"/>
                                    <TextInput
                                        :id="'valor_unitario_' + index"
                                        class="w-full"
                                        type="number"
                                        step="0.01"
                                        v-model="ingrediente.valor_unitario"
                                        @input="calcularValorTotal(index)"
                                        placeholder="0.00"
                                    />
                                    <InputError :message="errors[`ingredientes.${index}.valor_unitario`]"/>
                                </div>

                                <!-- Valor Total (readonly) -->
                                <div>
                                    <InputLabel :for="'valor_total_' + index" value="Valor Total (R$)"/>
                                    <TextInput
                                        :id="'valor_total_' + index"
                                        class="w-full bg-gray-100"
                                        type="number"
                                        step="0.01"
                                        v-model="ingrediente.valor_total"
                                        readonly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Resumo Total -->
                <div v-if="ingredientes.length > 0" class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-semibold text-gray-700">Valor Total do Cardápio:</span>
                        <span class="text-2xl font-bold text-blue-600">
                            R$ {{ valorTotalCardapio.toFixed(2).replace('.', ',') }}
                        </span>
                    </div>
                </div>

                <!-- Botões de Ação -->
                <div class="flex justify-center space-x-2 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        class="px-6 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition"
                        :disabled="processing || ingredientes.length === 0"
                        @click="salvar"
                    >
                        <i v-if="!processing" class="mr-1 fa fa-check"></i>
                        <i v-else class="mr-1 fa fa-spinner fa-spin"></i>
                        {{ processing ? 'Salvando...' : 'Salvar Ingredientes' }}
                    </button>
                    <button
                        type="button"
                        class="px-6 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition"
                        @click="voltar"
                    >
                        <i class="mr-1 fa fa-arrow-left"></i> Voltar
                    </button>
                </div>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import { useToast } from 'vue-toastification';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    cardapio: {
        type: Object,
        default: null,
        required: false
    },
});

const toast = useToast();
const events = inject('events');
const processing = ref(false);
const errors = ref({});
const ingredientes = ref([]);

// Computed para calcular o valor total do cardápio
const valorTotalCardapio = computed(() => {
    return ingredientes.value.reduce((total, ing) => {
        return total + (parseFloat(ing.valor_total) || 0);
    }, 0);
});

// Adicionar novo ingrediente
function adicionarIngrediente() {
    ingredientes.value.push({
        nome: '',
        quantidade: '',
        unidade_medida: '',
        valor_unitario: '',
        valor_total: '0.00',
    });
}

// Remover ingrediente
function removerIngrediente(index) {
    if (confirm('Deseja realmente remover este ingrediente?')) {
        ingredientes.value.splice(index, 1);
    }
}

// Calcular valor total do ingrediente
function calcularValorTotal(index) {
    const ingrediente = ingredientes.value[index];
    const quantidade = parseFloat(ingrediente.quantidade) || 0;
    const valorUnitario = parseFloat(ingrediente.valor_unitario) || 0;
    ingrediente.valor_total = (quantidade * valorUnitario).toFixed(2);
}

// Salvar ingredientes
async function salvar() {
    if (ingredientes.value.length === 0) {
        toast.warning('Adicione pelo menos um ingrediente antes de salvar.');
        return;
    }

    processing.value = true;
    errors.value = {};

    try {
        const response = await axios.post(
            `/admin/cardapio/${props.cardapio.id}/ingredientes`,
            {
                ingredientes: ingredientes.value,
                valor_total_cardapio: valorTotalCardapio.value
            }
        );

        toast.success('Ingredientes salvos com sucesso!');
        router.visit('/admin/cardapio');
    } catch (error) {
        processing.value = false;

        if (error.response) {
            const data = error.response.data;

            if (data.errors) {
                errors.value = data.errors;
            }

            const message = data.message || "Ocorreu um erro ao salvar os ingredientes.";
            toast.error(message);
        } else {
            toast.error("Erro de conexão com o servidor.");
        }
    } finally {
        processing.value = false;
    }
}

// Carregar ingredientes existentes
async function carregarIngredientes() {
    try {
        const response = await axios.get(`/admin/cardapio/${props.cardapio.id}/ingredientes/edit`);

        if (response.data && response.data.length > 0) {
            ingredientes.value = response.data.map(ing => ({
                id: ing.id,
                nome: ing.nome,
                quantidade: ing.quantidade,
                unidade_medida: ing.unidade_medida,
                valor_unitario: ing.valor_unitario,
                valor_total: ing.valor_total,
            }));
        }
    } catch (error) {
        console.error('Erro ao carregar ingredientes:', error);
        // Se não houver ingredientes ou der erro 404, não mostra erro
        if (error.response && error.response.status !== 404) {
            toast.error('Erro ao carregar ingredientes existentes.');
        }
    }
}

// Voltar para a lista
function voltar() {
    router.visit('/admin/cardapio');
}

onMounted(async () => {
    if (props.cardapio?.id) {
        await carregarIngredientes();
    }
});
</script>

<style scoped>
.required::after {
    content: " *";
    color: red;
}
</style>
