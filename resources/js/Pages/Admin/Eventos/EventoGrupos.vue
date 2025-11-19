<template>
    <LayoutPrincipal>
        <div class="page-content">
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
                                {{ evento.nome }}
                            </h1>
                            <p class="text-gray-600 text-lg">
                                <i class="fa fa-calendar mr-2"></i>
                                {{ formatarData(evento.data) }} às {{ evento.hora }}
                            </p>
                        </div>
                        <div class="text-right">
                            <span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                                <i class="fa fa-users mr-2"></i>
                                {{ gruposEvento.length }} grupo(s)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Grid Principal: Grupos -->
            <div class="grid grid-cols-1 gap-8">
                <!-- Grupos do Evento -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-xl font-semibold">Grupos do Evento</h3>
                    </div>
                    <div class="card-body">
                        <!-- Formulário para importar grupo -->
                        <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-semibold mb-3">Importar Grupo</h4>
                            <div class="space-y-3">
                                <!-- Select de Grupo Modelo -->
                                <div>
                                    <InputLabel for="grupo_modelo" value="Grupo Modelo" class="required" />
                                    <select
                                        id="grupo_modelo"
                                        v-model="grupoSelecionado"
                                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">Selecione um grupo</option>
                                        <option
                                            v-for="grupo in gruposModelo"
                                            :key="grupo.id"
                                            :value="grupo.id"
                                        >
                                            {{ grupo.nome }}
                                        </option>
                                    </select>
                                    <InputError :message="errors.grupo_modelo" />
                                </div>

                                <!-- Botão Importar -->
                                <button
                                    @click="importarGrupo"
                                    :disabled="processing || !grupoSelecionado"
                                    class="btn btn-primary w-full"
                                >
                                    <i class="fa fa-download mr-2"></i>
                                    Importar Grupo
                                </button>
                            </div>
                        </div>

                        <!-- Lista de grupos importados -->
                        <div class="space-y-4">
                            <h4 class="font-semibold mb-3">Grupos Importados</h4>
                            <div
                                v-for="grupo in gruposEvento"
                                :key="grupo.id"
                                class="p-4 bg-white border rounded-lg"
                            >
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex-1">
                                        <p class="font-medium text-lg">{{ grupo.nome }}</p>
                                        <p class="text-sm text-gray-600 mt-1">
                                            {{ grupo.pessoas?.length || 0 }} pessoa(s)
                                        </p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button
                                            @click="editarGrupo(grupo)"
                                            class="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button
                                            @click="removerGrupo(grupo.id)"
                                            class="text-red-600 hover:text-red-800"
                                            title="Remover"
                                        >
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Lista de Pessoas do Grupo -->
                                <div v-if="grupo.pessoas && grupo.pessoas.length > 0" class="mt-3 space-y-2">
                                    <div
                                        v-for="pessoa in grupo.pessoas"
                                        :key="pessoa.id"
                                        class="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm"
                                    >
                                        <i class="fa fa-user text-gray-400"></i>
                                        <span>{{ pessoa.pessoa?.nome }}</span>
                                        <span v-if="pessoa.pessoa?.cpf" class="text-gray-500">- CPF: {{ formatarCPF(pessoa.pessoa?.cpf) }}</span>
                                    </div>
                                </div>
                                <div v-else class="mt-3 text-sm text-gray-500 text-center py-2">
                                    Nenhuma pessoa neste grupo
                                </div>
                            </div>

                            <div v-if="!gruposEvento || gruposEvento.length === 0" class="text-center text-gray-500 py-8">
                                <i class="fa fa-users text-4xl mb-3"></i>
                                <p>Nenhum grupo importado ainda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { router } from '@inertiajs/vue3';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    evento: {
        type: Object,
        required: true
    }
});

const toast = useToast();
const events = inject('events');
const processing = ref(false);
const errors = ref({});

const gruposEvento = ref([]);
const gruposModelo = ref([]);
const grupoSelecionado = ref('');

// Carregar dados ao montar
onMounted(() => {
    carregarGruposModelo();
    carregarGruposEvento();

    // Escutar evento para recarregar
    events.on('recarrega-evento', () => {
        carregarGruposEvento();
    });
});

// Carregar grupos modelo
async function carregarGruposModelo() {
    try {
        const response = await axios.get('/admin/grupo-evento/grupos-modelo');
        gruposModelo.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar grupos modelo:', error);
    }
}

// Carregar grupos do evento
async function carregarGruposEvento() {
    try {
        const response = await axios.get(`/admin/grupo-evento/evento/${props.evento.id}`);
        gruposEvento.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar grupos do evento:', error);
    }
}

// Importar grupo
async function importarGrupo() {
    errors.value = {};

    if (!grupoSelecionado.value) {
        errors.value.grupo_modelo = 'Selecione um grupo';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.post('/admin/grupo-evento/importar', {
            id_evento: props.evento.id,
            id_grupo: grupoSelecionado.value
        });

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarGruposEvento();
            grupoSelecionado.value = '';
        }
    } catch (error) {
        toast.error('Erro ao importar grupo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Editar grupo
function editarGrupo(grupo) {console.log('oi')
    events.emit('popup', {
        id: grupo.id,
        component: 'Admin/Eventos/ModalEditarGrupo',
        title: 'Editar Grupo',
        size: 'xl',
        data: { id: grupo.id }
    });
}

// Remover grupo
async function removerGrupo(idGrupo) {
    if (!confirm('Deseja realmente remover este grupo?')) return;

    processing.value = true;

    try {
        const response = await axios.delete(`/admin/grupo-evento/${idGrupo}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarGruposEvento();
        }
    } catch (error) {
        toast.error('Erro ao remover grupo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Formatar CPF
function formatarCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Formatar data
function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
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
