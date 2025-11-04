<template>
    <div class="">

        <form @submit.prevent="submit">
            <div class="space-y-4">
                <!-- Nome -->
                <div>
                    <InputLabel for="nome" value="Nome da Comissão" class="required" />
                    <TextInput
                        id="nome"
                        v-model="form.nome"
                        type="text"
                        class="mt-1 block w-full"
                        :disabled="readOnly"
                        placeholder="Ex: Comissão de Festas"
                    />
                    <InputError :message="errors.nome ? errors.nome[0] : ''" class="mt-2" />
                </div>

                <!-- Ano -->
                <div>
                    <InputLabel for="ano" value="Ano" class="required" />
                    <TextInput
                        id="ano"
                        v-model="form.ano"
                        type="number"
                        class="mt-1 block w-full"
                        :disabled="readOnly"
                        placeholder="Ex: 2025"
                        min="2000"
                        max="2100"
                    />
                    <InputError :message="errors.ano ? errors.ano[0] : ''" class="mt-2" />
                </div>

                <!-- Botões -->
                <div class="flex justify-center gap-3 pt-4">
                    <button
                        v-if="!readOnly"
                        type="submit"
                        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        :disabled="processing"
                    >
                        <i class="mr-1 fa fa-save"></i>
                        {{ processing ? 'Salvando...' : 'Salvar' }}
                    </button>
                    <button
                        type="button"
                        class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        @click="close"
                    >
                        <i class="mr-1 fa fa-close"></i> Cancelar
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
    data: {
        type: Object,
        default: null,
        required: false
    }
});

const emit = defineEmits(['close']);
const acao = ref('/admin/comissao/create');
const events = inject('events');
const toast = useToast();
const errors = ref({});
const processing = ref(false);
const ready = ref(false);
const readOnly = ref(false);

const form = ref({
    nome: '',
    ano: new Date().getFullYear(),
});

function submit() {
    processing.value = true;
    axios.post(acao.value, form.value)
        .then(response => {
            events.emit('table-reload');
            handleSuccess();
            processing.value = false;
        })
        .catch(error => {
            processing.value = false;

            if (error.response) {
                const data = error.response.data;

                if (data.errors) {
                    errors.value = data.errors;
                }
                const message = data.message || "Ocorreu um erro ao salvar a comissão.";
                handleError(message);
            } else {
                handleError("Erro de conexão com o servidor.");
            }
        })
        .finally(() => {
            processing.value = false;
        });
}

function handleSuccess() {
    if(props.data?.id) {
        toast.success("Comissão editada com sucesso!");
    } else {
        toast.success("Comissão criada com sucesso!");
    }
    close();
}

function handleError(msg) {
    toast.error(msg);
}

const loadData = async () => {
    try {
        const response = await axios.get(`/admin/comissao/${props.data.id}`);
        Object.keys(form.value).forEach(key => {
            if (response.data[key] !== undefined) {
                form.value[key] = response.data[key];
            }
        });
        readOnly.value = Boolean(props.data.readOnly);
    } catch (err) {
        console.error('Error loading data:', err);
        toast.error('Não foi possível recuperar os dados da comissão.');
    } finally {
        ready.value = true;
    }
};

const close = () => {
    emit('close');
};

onMounted(() => {
    if (props.data?.id) {
        acao.value = `/admin/comissao/${props.data.id}`;
        loadData();
    } else {
        ready.value = true;
    }
});
</script>

<style scoped>
.required::after {
    content: " *";
    color: red;
}
</style>
