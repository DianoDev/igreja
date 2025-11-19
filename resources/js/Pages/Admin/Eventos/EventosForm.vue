<template>
    <div class="m-2" v-if="ready">
        <form @submit.prevent="submit">

            <div class="mb-10">
                <InputLabel
                    for="data_desejada"
                    value="Data Desejada"
                    class="required"
                    :class="{'text-gray-400': readOnly}"
                />
                <VueDatePicker
                    id="data_desejada"
                    v-model="form.data"
                    locale="pt-BR"
                    :disabled="readOnly"
                    format="dd/MM/yyyy"
                    :enable-time-picker="false"
                    auto-apply
                    :clearable="false"
                    placeholder="Selecione uma data"
                    :class="{'opacity-50': readOnly}"
                    class="w-full"
                />
                <InputError :message="errors.data"/>
            </div>

            <div class="mb-10">
                <InputLabel for="nome" value="Nome" class="required"/>
                <TextInput
                    id="nome"
                    class="w-full"
                    v-model="form.nome"
                    :disabled="readOnly"
                />
                <InputError :message="errors.nome"/>
            </div>

            <div class="mb-10">
                <InputLabel
                    for="hora"
                    value="Horário"
                    class="required"
                    :class="{'text-gray-400': readOnly}"
                />
                <select
                    id="hora"
                    v-model="form.hora"
                    :disabled="readOnly"
                    class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    :class="{'opacity-50 bg-gray-100': readOnly}"
                >
                    <option value="">Selecione um horário</option>
                    <option v-for="horario in horariosDisponiveis" :key="horario" :value="horario">
                        {{ horario }}
                    </option>
                </select>
                <InputError :message="errors.hora"/>
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
import { inject, onMounted, ref, computed } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useToast } from 'vue-toastification';

const props = defineProps({
    data: {
        type: Object,
        default: null,
        required: false
    }
});

const emit = defineEmits(['close']);
const acao = ref('/admin/eventos/create');
const events = inject('events');
const toast = useToast();
const errors = ref({});
const processing = ref(false);
const ready = ref(false);
const readOnly = ref(false);

const form = ref({
    nome: '',
    data: '',
    hora: '',
});

// Gerar horários de 30 em 30 minutos
const horariosDisponiveis = computed(() => {
    const horarios = [];
    for (let hora = 0; hora < 24; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 30) {
            const horaFormatada = String(hora).padStart(2, '0');
            const minutoFormatado = String(minuto).padStart(2, '0');
            horarios.push(`${horaFormatada}:${minutoFormatado}`);
        }
    }
    return horarios;
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
                const message = data.message || "Ocorreu um erro ao salvar Eventos.";
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
        toast.success("Eventos editado com sucesso!");
    } else {
        toast.success("Eventos criado com sucesso!");
    }
    close();
}

function handleError(msg) {
    toast.error(msg);
}

const loadData = async () => {
    try {
        const response = await axios.get(`/admin/eventos/${props.data.id}`);
        Object.keys(form.value).forEach(key => {
            if (response.data[key] !== undefined) {
                // Converter data string para objeto Date
                if (key === 'data' && response.data[key]) {
                    form.value[key] = new Date(response.data[key] + 'T00:00:00');
                } else {
                    form.value[key] = response.data[key];
                }
            }
        });
        readOnly.value = Boolean(props.data.readOnly);
    } catch (err) {
        console.error('Error loading data:', err);
        toast.error('Não foi possível recuperar os dados do Eventos.');
    } finally {
        ready.value = true;
    }
}

const close = () => {
    events.emit('popup-close', true);
}

onMounted(async () => {
    if (props.data?.id) {
        acao.value = `/admin/eventos/${props.data.id}`;
        await loadData();
    } else {
        ready.value = true;
    }
});
</script>
