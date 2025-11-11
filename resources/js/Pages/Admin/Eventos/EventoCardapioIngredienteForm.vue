<template>
    <div class="">
        <form @submit.prevent="salvar" class="space-y-4">
            <!-- Nome -->
            <div>
                <InputLabel for="nome" value="Nome do Ingrediente" class="required" />
                <TextInput
                    id="nome"
                    v-model="form.nome"
                    type="text"
                    placeholder="Ex: Arroz, Feijão, Carne..."
                    class="mt-1 block w-full"
                    autofocus
                />
                <InputError :message="errors.nome" />
            </div>

            <!-- Quantidade e Unidade -->
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <InputLabel for="quantidade" value="Quantidade" class="required" />
                    <TextInput
                        id="quantidade"
                        v-model="form.quantidade"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        class="mt-1 block w-full"
                    />
                    <InputError :message="errors.quantidade" />
                </div>

                <div>
                    <InputLabel for="unidade_medida" value="Unidade" class="required" />
                    <select
                        id="unidade_medida"
                        v-model="form.unidade_medida"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Selecione</option>
                        <option value="kg">kg (quilograma)</option>
                        <option value="g">g (grama)</option>
                        <option value="l">l (litro)</option>
                        <option value="ml">ml (mililitro)</option>
                        <option value="un">unidade</option>
                        <option value="cx">caixa</option>
                        <option value="pct">pacote</option>
                        <option value="dz">dúzia</option>
                        <option value="lata">lata</option>
                    </select>
                    <InputError :message="errors.unidade_medida" />
                </div>
            </div>

            <!-- Valor Unitário -->
            <div>
                <InputLabel for="valor_unitario" value="Valor Unitário (R$)" class="required" />
                <TextInput
                    id="valor_unitario"
                    v-model="form.valor_unitario"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    class="mt-1 block w-full"
                />
                <InputError :message="errors.valor_unitario" />
            </div>

            <!-- Valor Total (calculado) -->
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-sm text-blue-700 font-medium mb-1">Valor Total</p>
                <p class="text-2xl font-bold text-blue-900">
                    R$ {{ calcularValorTotal() }}
                </p>
                <p class="text-xs text-blue-600 mt-1">
                    {{ form.quantidade || 0 }} {{ form.unidade_medida || 'un' }} × R$ {{ formatarValor(form.valor_unitario) }}
                </p>
            </div>

            <!-- Botões -->
            <div class="flex justify-end gap-2 pt-4 border-t">
                <button
                    type="button"
                    @click="fechar"
                    class="btn btn-secondary"
                    :disabled="processing"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="processing"
                >
                    <i class="fa fa-save mr-2"></i>
                    {{ ingrediente?.id ? 'Atualizar' : 'Salvar' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import AutocompletePessoa from '@/Components/AutoCompletePessoa.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    ingrediente: {
        type: Object,
        default: null
    },
    idCardapioEvento: {
        type: Number,
        required: true
    },
    onSuccess: {
        type: Function,
        default: () => {}
    },
    onClose: {
        type: Function,
        default: () => {}
    }
});

const toast = useToast();
const processing = ref(false);
const errors = ref({});

const form = ref({
    nome: '',
    quantidade: '',
    unidade_medida: '',
    valor_unitario: '',
    id_pessoa: null
});

onMounted(() => {
    if (props.ingrediente) {
        form.value = {
            nome: props.ingrediente.nome || '',
            quantidade: props.ingrediente.quantidade || '',
            unidade_medida: props.ingrediente.unidade_medida || '',
            valor_unitario: props.ingrediente.valor_unitario || '',
            id_pessoa: props.ingrediente.id_pessoa || null
        };
    }
});

function calcularValorTotal() {
    const quantidade = parseFloat(form.value.quantidade) || 0;
    const valorUnitario = parseFloat(form.value.valor_unitario) || 0;
    const total = quantidade * valorUnitario;
    return formatarValor(total);
}

function formatarValor(valor) {
    return parseFloat(valor || 0).toFixed(2).replace('.', ',');
}

async function salvar() {
    errors.value = {};

    // Validações
    if (!form.value.nome?.trim()) {
        errors.value.nome = 'O nome do ingrediente é obrigatório';
        return;
    }

    if (!form.value.quantidade || parseFloat(form.value.quantidade) <= 0) {
        errors.value.quantidade = 'Informe uma quantidade válida';
        return;
    }

    if (!form.value.unidade_medida) {
        errors.value.unidade_medida = 'Selecione uma unidade de medida';
        return;
    }

    if (!form.value.valor_unitario || parseFloat(form.value.valor_unitario) <= 0) {
        errors.value.valor_unitario = 'Informe um valor unitário válido';
        return;
    }

    processing.value = true;

    try {
        const dados = {
            ...form.value,
            id_cardapio_evento: props.idCardapioEvento
        };

        let response;
        if (props.ingrediente?.id) {
            // Editar
            response = await axios.put(
                `/admin/cardapio-evento/ingrediente/${props.ingrediente.id}`,
                dados
            );
        } else {
            // Criar
            response = await axios.post('/admin/cardapio-evento/ingrediente', dados);
        }

        if (response.data.success) {
            toast.success(response.data.message);
            props.onSuccess();
            fechar();
        }
    } catch (error) {
        if (error.response?.data?.errors) {
            errors.value = error.response.data.errors;
        }
        toast.error(error.response?.data?.message || 'Erro ao salvar ingrediente');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

function fechar() {
    props.onClose();
}
</script>

<style scoped>
.required::after {
    content: " *";
    color: red;
}

.btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
}

.btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed;
}

.btn-secondary {
    @apply bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed;
}
</style>
