<template>
    <div class="m-2" v-if="ready">
        <form @submit.prevent="submit">
            <div class="mb-4">
                <InputLabel for="nome" value="Nome" class="required"/>
                <TextInput
                    id="nome"
                    class="w-full"
                    v-model="form.nome"
                    :disabled="readOnly"
                />
                <InputError :message="errors.nome"/>
            </div>

            <div class="mb-4">
                <InputLabel for="descricao" value="Descrição" class="required"/>
                <TextInput
                    id="descricao"
                    class="w-full"
                    v-model="form.descricao"
                    :disabled="readOnly"
                />
                <InputError :message="errors.descricao"/>
            </div>

            <!-- Seção de Upload de Arquivo -->
            <div class="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50" v-if="!readOnly">
                <h3 class="text-lg font-semibold mb-3 text-gray-700">
                    <i class="fa fa-paperclip mr-2"></i>Anexar Arquivo
                </h3>

                <!-- Exibir arquivo existente -->
                <div v-if="arquivoExistente && !arquivoRemovido && !selectedFile"
                     class="mb-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-green-800">
                                <i class="fa fa-file-pdf mr-2"></i>
                                <strong>Arquivo atual:</strong> {{ arquivoExistente.nome }}
                            </p>
                            <p class="text-xs text-green-600 mt-1">
                                Tamanho: {{ formatFileSize(arquivoExistente.tamanho) }} |
                                Enviado em: {{ formatDate(arquivoExistente.created_at) }}
                            </p>
                        </div>
                        <button
                            type="button"
                            @click="removerArquivoExistente"
                            class="text-red-600 hover:text-red-800 text-sm"
                            title="Remover arquivo"
                        >
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>

                <!-- Mensagem de arquivo marcado para remoção -->
                <div v-if="arquivoRemovido" class="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div class="flex items-center justify-between">
                        <p class="text-sm text-yellow-800">
                            <i class="fa fa-exclamation-triangle mr-2"></i>
                            <strong>Arquivo será removido ao salvar</strong>
                        </p>
                        <button
                            type="button"
                            @click="cancelarRemocao"
                            class="text-blue-600 hover:text-blue-800 text-sm"
                            title="Cancelar remoção"
                        >
                            <i class="fa fa-undo"></i> Desfazer
                        </button>
                    </div>
                </div>

                <div class="mb-3" v-if="!arquivoExistente || arquivoRemovido">
                    <InputLabel for="arquivo" value="Arquivo (Opcional)"/>

                    <!-- Input file customizado -->
                    <div class="mt-1">
                        <label for="arquivo"
                               class="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                            <div class="text-center">
                                <i class="fa fa-upload text-gray-400 text-2xl mb-2"></i>
                                <p class="text-sm text-gray-600">
                                    <span class="font-semibold text-blue-600">Clique para selecionar</span> ou arraste o
                                    arquivo aqui
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX (máx. 10MB)
                                </p>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="arquivo"
                            @change="handleFileChange"
                            accept=".pdf,.doc,.docx"
                            class="hidden"
                        />
                    </div>

                    <!-- Exibir arquivo selecionado -->
                    <div v-if="selectedFile" class="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fa fa-file text-blue-600 mr-2"></i>
                                <span class="text-sm text-blue-800">{{ selectedFileName }}</span>
                            </div>
                            <button
                                type="button"
                                @click="limparArquivoSelecionado"
                                class="text-red-600 hover:text-red-800 text-sm"
                                title="Remover arquivo"
                            >
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <InputError :message="errors.arquivo"/>
                </div>

                <!-- Título do Arquivo -->
                <div class="mb-3" v-if="selectedFile || (arquivoExistente && !arquivoRemovido)">
                    <InputLabel for="titulo_arquivo" value="Título do Arquivo (Opcional)"/>
                    <TextInput
                        id="titulo_arquivo"
                        class="w-full"
                        v-model="form.titulo_arquivo"
                        placeholder="Se não informado, será usado o nome original do arquivo"
                    />
                    <p class="mt-1 text-sm text-gray-500">
                        Se não informado, será usado o nome original do arquivo
                    </p>
                    <InputError :message="errors.titulo_arquivo"/>
                </div>
            </div>

            <!-- Exibir arquivo no modo somente leitura -->
            <div v-if="readOnly && arquivoExistente" class="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 class="text-lg font-semibold mb-3 text-gray-700">
                    <i class="fa fa-paperclip mr-2"></i>Arquivo Anexo
                </h3>
                <div class="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p class="text-sm text-blue-800">
                        <i class="fa fa-file-pdf mr-2"></i>
                        <strong>{{ arquivoExistente.titulo || arquivoExistente.nome }}</strong>
                    </p>
                    <p class="text-xs text-blue-600 mt-1">
                        Tamanho: {{ formatFileSize(arquivoExistente.tamanho) }}
                    </p>
                </div>
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
                        class="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
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
import {inject, onMounted, ref} from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import {useToast} from 'vue-toastification';

const props = defineProps({
    data: {
        type: Object,
        default: null,
        required: false
    }
});

const emit = defineEmits(['close']);
const acao = ref('/admin/regime-interno/create');
const events = inject('events');
const toast = useToast();
const errors = ref({});
const processing = ref(false);
const ready = ref(false);
const readOnly = ref(false);
const selectedFile = ref(null);
const selectedFileName = ref('');
const arquivoExistente = ref(null);
const arquivoRemovido = ref(false);

const form = ref({
    nome: '',
    descricao: '',
    titulo_arquivo: '',
});

function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        // Validar tamanho do arquivo (10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB em bytes
        if (file.size > maxSize) {
            toast.error('O arquivo deve ter no máximo 10MB');
            event.target.value = '';
            selectedFile.value = null;
            selectedFileName.value = '';
            return;
        }

        selectedFile.value = file;
        selectedFileName.value = file.name;

        // Se não tiver título, sugere o nome do arquivo
        if (!form.value.titulo_arquivo) {
            form.value.titulo_arquivo = file.name;
        }
    } else {
        selectedFile.value = null;
        selectedFileName.value = '';
    }
}

function limparArquivoSelecionado() {
    selectedFile.value = null;
    selectedFileName.value = '';
    const fileInput = document.getElementById('arquivo');
    if (fileInput) {
        fileInput.value = '';
    }
}

function removerArquivoExistente() {
    arquivoRemovido.value = true;
}

function cancelarRemocao() {
    arquivoRemovido.value = false;
}

function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function submit() {
    processing.value = true;

    // Criar FormData para enviar arquivo
    const formData = new FormData();
    formData.append('nome', form.value.nome);
    formData.append('descricao', form.value.descricao);

    // Marcar para remover arquivo existente se solicitado
    if (arquivoRemovido.value) {
        formData.append('remover_arquivo', 'true');
    }

    // Adicionar arquivo se existir
    if (selectedFile.value) {
        formData.append('arquivo', selectedFile.value);

        // Adicionar título do arquivo se fornecido
        if (form.value.titulo_arquivo) {
            formData.append('titulo_arquivo', form.value.titulo_arquivo);
        }
    }

    axios.post(acao.value, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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
                const message = data.message || "Ocorreu um erro ao salvar Regime Interno.";
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
    if (props.data?.id) {
        toast.success("Regime Interno editado com sucesso!");
    } else {
        toast.success("Regime Interno criado com sucesso!");
    }
    close();
}

function handleError(msg) {
    toast.error(msg);
}

const loadData = async () => {
    try {
        const response = await axios.get(`/admin/regime-interno/${props.data.id}`);
        Object.keys(form.value).forEach(key => {
            if (response.data[key] !== undefined) {
                form.value[key] = response.data[key];
            }
        });

        // Carregar informações do arquivo existente
        if (response.data.arquivo) {
            arquivoExistente.value = response.data.arquivo;
            form.value.titulo_arquivo = response.data.arquivo.titulo || response.data.arquivo.nome;
        }

        console.log(response.data);
        readOnly.value = Boolean(props.data.readOnly);
    } catch (err) {
        console.error('Error loading data:', err);
        toast.error('Não foi possível recuperar os dados do Regime Interno.');
    }
};

const close = () => {
    emit('close');
};

onMounted(() => {
    if (props.data?.id) {
        acao.value = `/admin/regime-interno/${props.data.id}`;
        loadData();
    }
    ready.value = true;
});
</script>
