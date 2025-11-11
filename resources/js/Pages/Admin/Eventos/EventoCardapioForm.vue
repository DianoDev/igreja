<template>
    <div class="">
        <form @submit.prevent="salvar" class="space-y-4">
            <!-- Nome -->
            <div>
                <InputLabel for="nome" value="Nome" class="required" />
                <TextInput
                    id="nome"
                    v-model="form.nome"
                    type="text"
                    placeholder="Nome do cardápio"
                    class="mt-1 block w-full"
                    autofocus
                />
                <InputError :message="errors.nome" />
            </div>

            <!-- Descrição -->
            <div>
                <InputLabel for="descricao" value="Descrição" />
                <textarea
                    id="descricao"
                    v-model="form.descricao"
                    rows="3"
                    placeholder="Descrição do cardápio"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                ></textarea>
                <InputError :message="errors.descricao" />
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
                    {{ cardapio?.id ? 'Atualizar' : 'Salvar' }}
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
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    cardapio: {
        type: Object,
        default: null
    },
    idEvento: {
        type: Number,
        required: false
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
    descricao: '',
    ingredientes: []
});

onMounted(() => {
    if (props.cardapio) {
        form.value = {
            nome: props.cardapio.nome || '',
            descricao: props.cardapio.descricao || '',
            ingredientes: props.cardapio.ingredientes?.map(ing => ({
                id: ing.id,
                nome: ing.nome || '',
                quantidade: ing.quantidade || '',
                unidade_medida: ing.unidade_medida || '',
                valor_unitario: ing.valor_unitario || '',
            })) || []
        };
    }
});

function adicionarIngrediente() {
    form.value.ingredientes.push({
        nome: '',
        quantidade: '',
        unidade_medida: '',
        valor_unitario: '',
        id_pessoa: null
    });
}
async function salvar() {
    errors.value = {};

    // Validações
    if (!form.value.nome?.trim()) {
        errors.value.nome = 'O nome é obrigatório';
        return;
    }

    if (form.value.ingredientes.length === 0) {
        toast.warning('Adicione pelo menos um ingrediente');
        return;
    }

    // Validar ingredientes
    for (let i = 0; i < form.value.ingredientes.length; i++) {
        const ing = form.value.ingredientes[i];
        if (!ing.nome?.trim()) {
            toast.error(`Ingrediente ${i + 1}: Nome é obrigatório`);
            return;
        }
        if (!ing.quantidade || parseFloat(ing.quantidade) <= 0) {
            toast.error(`Ingrediente ${i + 1}: Quantidade inválida`);
            return;
        }
        if (!ing.unidade_medida) {
            toast.error(`Ingrediente ${i + 1}: Unidade de medida é obrigatória`);
            return;
        }
        if (!ing.valor_unitario || parseFloat(ing.valor_unitario) <= 0) {
            toast.error(`Ingrediente ${i + 1}: Valor unitário inválido`);
            return;
        }
    }

    processing.value = true;

    try {
        const dados = {
            ...form.value,
            id_evento: props.idEvento
        };

        let response;
        if (props.cardapio?.id) {
            // Editar
            response = await axios.put(`/admin/cardapio-evento/${props.cardapio.id}`, dados);
        } else {
            // Criar
            response = await axios.post('/admin/cardapio-evento', dados);
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
        toast.error(error.response?.data?.message || 'Erro ao salvar cardápio');
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
