<template>
    <div class="m-2" v-if="ready">
        <form @submit.prevent="submit">
            <div class="mb-4">
                <InputLabel for="ano" value="Ano" class="required"/>
                <TextInput
                    id="ano"
                    class="w-full"
                    v-model="form.ano"
                    :disabled="readOnly"
                />
                <InputError :message="errors.ano"/>
            </div>

            <div class="mb-4">
                <InputLabel for="id_pessoa" value="Id Pessoa" class="required"/>
                <TextInput
                    id="id_pessoa"
                    class="w-full"
                    v-model="form.id_pessoa"
                    :disabled="readOnly"
                />
                <InputError :message="errors.id_pessoa"/>
            </div>

            <div class="mb-4">
                <InputLabel for="id_cargo" value="Id Cargo" class="required"/>
                <TextInput
                    id="id_cargo"
                    class="w-full"
                    v-model="form.id_cargo"
                    :disabled="readOnly"
                />
                <InputError :message="errors.id_cargo"/>
            </div>

            <div class="w-full pt-4 mt-4 border-t border-gray-200">
                <div class="flex justify-center" v-if="readOnly">
                    <button
                        type="button"
                        class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        @click="close"
                    >
                        <i class="mr-1 fa fa-close"></i> Sair
                    </button>
                </div>
                <div class="flex justify-center space-x-2" v-if="!readOnly">
                    <button
                        type="submit"
                        class="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-500-hover"
                        :disabled="processing"
                    >
                        <i v-if="!processing" class="mr-1 fa fa-check"></i>
                        <i v-else class="mr-1 fa fa-spinner fa-spin"></i>
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
const acao = ref('/admin/comissao/');
const events = inject('events');
const toast = useToast();
const errors = ref({});
const processing = ref(false);
const ready = ref(false);
const readOnly = ref(false);

const form = ref({
    ano: '',
    id_pessoa: '',
    id_cargo: '',
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
                const message = data.message || "Ocorreu um erro ao salvar  Comissao.";
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
        toast.success(" Comissao editado com sucesso!");
    } else {
        toast.success(" Comissao criado com sucesso!");
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
        toast.error('Não foi possível recuperar os dados do  Comissao.');
    } finally {
        ready.value = true;
    }
}

const close = () => {
    events.emit('popup-close', true);
}

onMounted(async () => {
    if (props.data?.id) {
        acao.value = `/admin/comissao/${props.data.id}`;
        await loadData();
    } else {
        ready.value = true;
    }
});
</script>
