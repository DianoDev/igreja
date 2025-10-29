<template>
    <Head title="Galeria de Fotos"/>
    <LayoutPrincipal>
        <div class="py-6">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Área de Upload -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fa fa-upload mr-2 text-blue-600"></i>
                        Adicionar Fotos
                    </h3>

                    <div class="mb-4">
                        <label
                            for="fotos-upload"
                            class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                            @dragover.prevent
                            @drop.prevent="handleDrop"
                        >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <i class="fa fa-cloud-upload text-6xl text-gray-400 mb-3"></i>
                                <p class="mb-2 text-sm text-gray-500">
                                    <span class="font-semibold">Clique para selecionar</span> ou arraste as fotos aqui
                                </p>
                                <p class="text-xs text-gray-500">
                                    JPG, PNG, GIF, WEBP (máx. 10MB por foto - até 20 fotos por vez)
                                </p>
                            </div>
                        </label>
                        <input
                            id="fotos-upload"
                            type="file"
                            multiple
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            @change="handleFileSelect"
                            class="hidden"
                        />
                    </div>

                    <!-- Preview das fotos selecionadas -->
                    <div v-if="fotosParaUpload.length > 0" class="mt-4">
                        <div class="flex items-center justify-between mb-3">
                            <p class="text-sm font-semibold text-gray-700">
                                {{ fotosParaUpload.length }} foto(s) selecionada(s)
                            </p>
                            <button
                                @click="limparSelecao"
                                class="text-sm text-red-600 hover:text-red-700"
                            >
                                <i class="fa fa-times mr-1"></i>Limpar
                            </button>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            <div
                                v-for="(foto, index) in fotosParaUpload"
                                :key="index"
                                class="relative group"
                            >
                                <img
                                    :src="foto.preview"
                                    :alt="foto.file.name"
                                    class="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    @click="removerFotoSelecao(index)"
                                    class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <i class="fa fa-times text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mt-4 flex gap-2">
                            <button
                                @click="uploadFotos"
                                :disabled="uploading"
                                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                <i v-if="!uploading" class="fa fa-check mr-2"></i>
                                <i v-else class="fa fa-spinner fa-spin mr-2"></i>
                                {{ uploading ? 'Enviando...' : 'Enviar Fotos' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Estatísticas -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div class="flex items-center">
                                <i class="fa fa-images text-3xl text-blue-600 mr-3"></i>
                                <div>
                                    <p class="text-sm text-gray-600">Total de Fotos</p>
                                    <p class="text-2xl font-bold text-gray-800">{{ fotos.length }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div class="flex items-center">
                                <i class="fa fa-check-circle text-3xl text-green-600 mr-3"></i>
                                <div>
                                    <p class="text-sm text-gray-600">Selecionadas</p>
                                    <p class="text-2xl font-bold text-gray-800">{{ fotosSelecionadas.length }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div class="flex items-center">
                                <i class="fa fa-hdd text-3xl text-purple-600 mr-3"></i>
                                <div>
                                    <p class="text-sm text-gray-600">Tamanho Total</p>
                                    <p class="text-2xl font-bold text-gray-800">{{ tamanhoTotal }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ações em Lote -->
                <div v-if="fotosSelecionadas.length > 0" class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-semibold text-amber-800">
                            {{ fotosSelecionadas.length }} foto(s) selecionada(s)
                        </p>
                        <div class="flex gap-2">
                            <button
                                @click="deselecionarTodas"
                                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                            >
                                <i class="fa fa-times mr-1"></i>Desmarcar Todas
                            </button>
                            <button
                                @click="excluirSelecionadas"
                                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                            >
                                <i class="fa fa-trash mr-1"></i>Excluir Selecionadas
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Galeria de Fotos -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold flex items-center">
                            <i class="fa fa-images mr-2 text-purple-600"></i>
                            Fotos do Evento
                        </h3>
                        <div class="flex gap-2">
                            <button
                                v-if="fotos.length > 0"
                                @click="selecionarTodas"
                                class="text-sm text-blue-600 hover:text-blue-700"
                            >
                                <i class="fa fa-check-square mr-1"></i>Selecionar Todas
                            </button>
                        </div>
                    </div>

                    <div v-if="loading" class="flex items-center justify-center py-12">
                        <i class="fa fa-spinner fa-spin text-4xl text-gray-400"></i>
                    </div>

                    <div v-else-if="fotos.length === 0" class="text-center py-12">
                        <i class="fa fa-images text-6xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Nenhuma foto adicionada ainda</p>
                        <p class="text-sm text-gray-400 mt-2">Faça upload de fotos usando o campo acima</p>
                    </div>

                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div
                            v-for="foto in fotos"
                            :key="foto.id"
                            class="relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all"
                            :class="isSelecionada(foto.id) ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'"
                        >
                            <!-- Checkbox de seleção -->
                            <div class="absolute top-2 left-2 z-10">
                                <input
                                    type="checkbox"
                                    :checked="isSelecionada(foto.id)"
                                    @change="toggleSelecao(foto.id)"
                                    class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                            </div>

                            <!-- Imagem -->
                            <div @click="abrirModal(foto)" class="relative">
                                <img
                                    :src="getImageUrl(foto.hash)"
                                    :alt="foto.titulo"
                                    class="w-full h-48 object-cover"
                                    @error="handleImageError"
                                />
                                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                    <i class="fa fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                                </div>
                            </div>

                            <!-- Informações -->
                            <div class="p-3 bg-white">
                                <p class="text-sm font-semibold text-gray-800 truncate">
                                    {{ foto.titulo || foto.nome }}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    {{ formatFileSize(foto.tamanho) }} • {{ formatarDataHora(foto.created_at) }}
                                </p>
                            </div>

                            <!-- Ações -->
                            <div class="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    @click.stop="editarFoto(foto)"
                                    class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition"
                                    title="Editar"
                                >
                                    <i class="fa fa-edit text-xs"></i>
                                </button>
                                <button
                                    @click.stop="excluirFoto(foto.id)"
                                    class="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
                                    title="Excluir"
                                >
                                    <i class="fa fa-trash text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Visualização -->
        <div
            v-if="modalAberto"
            @click="fecharModal"
            class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
            <div class="relative max-w-6xl w-full">
                <button
                    @click="fecharModal"
                    class="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition z-10"
                >
                    <i class="fa fa-times"></i>
                </button>

                <div @click.stop class="bg-white rounded-lg overflow-hidden">
                    <img
                        :src="getImageUrl(fotoSelecionadaModal?.hash)"
                        :alt="fotoSelecionadaModal?.titulo"
                        class="w-full max-h-[70vh] object-contain bg-gray-100"
                    />
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">
                            {{ fotoSelecionadaModal?.titulo || fotoSelecionadaModal?.nome }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ formatFileSize(fotoSelecionadaModal?.tamanho) }} •
                            Enviado em {{ formatarDataHora(fotoSelecionadaModal?.created_at) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Edição -->
        <div
            v-if="modalEdicaoAberto"
            @click="fecharModalEdicao"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
            <div @click.stop class="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fa fa-edit mr-2 text-blue-600"></i>Editar Foto
                </h3>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                        v-model="fotoParaEditar.titulo"
                        type="text"
                        class="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Título da foto"
                    />
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Descrição (Opcional)</label>
                    <textarea
                        v-model="fotoParaEditar.descricao"
                        rows="3"
                        class="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Descrição da foto"
                    ></textarea>
                </div>

                <div class="flex gap-2 justify-end">
                    <button
                        @click="fecharModalEdicao"
                        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        <i class="fa fa-times mr-1"></i>Cancelar
                    </button>
                    <button
                        @click="salvarEdicao"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <i class="fa fa-check mr-1"></i>Salvar
                    </button>
                </div>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {Head, router} from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {useToast} from 'vue-toastification';
import LayoutPrincipal from "@/Layouts/LayoutPrincipal.vue";

const props = defineProps({
    idEvento: {
        type: Number,
        required: true
    },
    evento: {
        type: Object,
        required: true
    }
});

const toast = useToast();
const loading = ref(true);
const uploading = ref(false);
const fotos = ref([]);
const fotosParaUpload = ref([]);
const fotosSelecionadas = ref([]);
const modalAberto = ref(false);
const fotoSelecionadaModal = ref(null);
const modalEdicaoAberto = ref(false);
const fotoParaEditar = ref({});

const tamanhoTotal = computed(() => {
    const total = fotos.value.reduce((sum, foto) => sum + (foto.tamanho || 0), 0);
    return formatFileSize(total);
});

onMounted(() => {
    carregarGaleria();
});

async function carregarGaleria() {
    loading.value = true;
    try {
        const response = await axios.get(`/admin/evento/${props.idEvento}/galeria/list`);
        fotos.value = response.data.fotos;
    } catch (error) {
        console.error('Erro ao carregar galeria:', error);
        toast.error('Erro ao carregar galeria de fotos');
    } finally {
        loading.value = false;
    }
}

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    adicionarFotosParaUpload(files);
}

function handleDrop(event) {
    const files = Array.from(event.dataTransfer.files);
    adicionarFotosParaUpload(files);
}

function adicionarFotosParaUpload(files) {
    if (fotosParaUpload.value.length + files.length > 20) {
        toast.warning('Você pode enviar no máximo 20 fotos por vez');
        return;
    }

    files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
            toast.error(`A foto ${file.name} excede o tamanho máximo de 10MB`);
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error(`O arquivo ${file.name} não é uma imagem válida`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            fotosParaUpload.value.push({
                file: file,
                preview: e.target.result
            });
        };
        reader.readAsDataURL(file);
    });
}

function removerFotoSelecao(index) {
    fotosParaUpload.value.splice(index, 1);
}

function limparSelecao() {
    fotosParaUpload.value = [];
}

async function uploadFotos() {
    if (fotosParaUpload.value.length === 0) {
        toast.warning('Selecione pelo menos uma foto');
        return;
    }

    uploading.value = true;
    const formData = new FormData();

    fotosParaUpload.value.forEach((foto, index) => {
        formData.append(`fotos[${index}]`, foto.file);
    });

    try {
        const response = await axios.post(`/admin/evento/${props.idEvento}/galeria/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.success(response.data.message);
        fotosParaUpload.value = [];
        await carregarGaleria();
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('Erro ao fazer upload das fotos');
        }
    } finally {
        uploading.value = false;
    }
}

function toggleSelecao(id) {
    const index = fotosSelecionadas.value.indexOf(id);
    if (index > -1) {
        fotosSelecionadas.value.splice(index, 1);
    } else {
        fotosSelecionadas.value.push(id);
    }
}

function isSelecionada(id) {
    return fotosSelecionadas.value.includes(id);
}

function selecionarTodas() {
    fotosSelecionadas.value = fotos.value.map(f => f.id);
}

function deselecionarTodas() {
    fotosSelecionadas.value = [];
}

async function excluirSelecionadas() {
    if (fotosSelecionadas.value.length === 0) {
        toast.warning('Selecione pelo menos uma foto');
        return;
    }

    if (!confirm(`Deseja realmente excluir ${fotosSelecionadas.value.length} foto(s)?`)) {
        return;
    }

    try {
        await axios.post(`/admin/evento/${props.idEvento}/galeria/excluir-multiplas`, {
            ids: fotosSelecionadas.value
        });

        toast.success('Fotos excluídas com sucesso!');
        fotosSelecionadas.value = [];
        await carregarGaleria();
    } catch (error) {
        console.error('Erro ao excluir fotos:', error);
        toast.error('Erro ao excluir fotos');
    }
}

async function excluirFoto(id) {
    if (!confirm('Deseja realmente excluir esta foto?')) {
        return;
    }

    try {
        await axios.delete(`/admin/evento/${props.idEvento}/galeria/${id}`);
        toast.success('Foto excluída com sucesso!');
        await carregarGaleria();
    } catch (error) {
        console.error('Erro ao excluir foto:', error);
        toast.error('Erro ao excluir foto');
    }
}

function editarFoto(foto) {
    fotoParaEditar.value = {
        id: foto.id,
        titulo: foto.titulo || foto.nome,
        descricao: foto.descricao || ''
    };
    modalEdicaoAberto.value = true;
}

async function salvarEdicao() {
    try {
        await axios.put(`/admin/evento/${props.idEvento}/galeria/${fotoParaEditar.value.id}`, {
            titulo: fotoParaEditar.value.titulo,
            descricao: fotoParaEditar.value.descricao
        });

        toast.success('Foto atualizada com sucesso!');
        fecharModalEdicao();
        await carregarGaleria();
    } catch (error) {
        console.error('Erro ao atualizar foto:', error);
        toast.error('Erro ao atualizar foto');
    }
}

function fecharModalEdicao() {
    modalEdicaoAberto.value = false;
    fotoParaEditar.value = {};
}

function abrirModal(foto) {
    fotoSelecionadaModal.value = foto;
    modalAberto.value = true;
}

function fecharModal() {
    modalAberto.value = false;
    fotoSelecionadaModal.value = null;
}

function getImageUrl(hash) {
    if (!hash) return '';
    // Hash vem no formato: public/uploads/2024/01/15/uuid.jpg
    // Precisamos extrair: ano/mes/dia/hash
    const match = hash.match(/public\/uploads\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)/);
    if (match) {
        const [, ano, mes, dia, filename] = match;
        return `/storage/public/uploads/${ano}/${mes}/${dia}/${filename}`;
    }
    // Fallback caso o formato seja diferente
    return `/storage/${hash.replace('public/', '')}`;
}

function handleImageError(event) {
    event.target.src = '/images/placeholder.jpg';
}

function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatarData(data) {
    if (!data) return '';
    return new Date(data).toLocaleDateString('pt-BR');
}

function formatarDataHora(dataHora) {
    if (!dataHora) return '';
    return new Date(dataHora).toLocaleString('pt-BR');
}

function voltarParaEvento() {
    router.visit(`/admin/evento/${props.idEvento}/info`);
}
</script>

<style scoped>
/* Animações suaves */
.group-hover\:opacity-100 {
    transition: opacity 0.2s ease-in-out;
}

.group-hover\:bg-opacity-30 {
    transition: background-color 0.2s ease-in-out;
}
</style>
<style scoped>
/* Animações suaves */
.group-hover\:opacity-100 {
    transition: opacity 0.2s ease-in-out;
}

.group-hover\:bg-opacity-30 {
    transition: background-color 0.2s ease-in-out;
}
</style>
