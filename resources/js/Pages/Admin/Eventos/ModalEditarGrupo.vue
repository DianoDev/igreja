<template>
    <div class="space-y-6">
        <h3 class="text-xl font-semibold">Editar Grupo</h3>

        <!-- Nome do Grupo -->
        <div>
            <InputLabel for="nome" value="Nome do Grupo" class="required" />
            <TextInput
                id="nome"
                v-model="form.nome"
                type="text"
                class="mt-1 block w-full"
                placeholder="Ex: Equipe de Cozinha"
                required
            />
            <InputError :message="errors.nome" class="mt-2" />
        </div>

        <!-- Lista de Pessoas no Grupo -->
        <div>
            <h4 class="font-semibold mb-3">Pessoas no Grupo</h4>

            <!-- Adicionar Pessoa -->
            <div class="mb-4 flex gap-2">
                <div class="flex-1">
                    <AutocompletePessoa
                        v-model="pessoaSelecionada"
                        placeholder="Buscar pessoa para adicionar..."
                    />
                </div>
                <button
                    @click="adicionarPessoa"
                    :disabled="!pessoaSelecionada || processing"
                    class="btn btn-primary"
                >
                    <i class="fa fa-plus mr-2"></i>
                    Adicionar
                </button>
            </div>

            <!-- Lista de Pessoas -->
            <div class="space-y-2">
                <div
                    v-for="pessoa in grupo.pessoas"
                    :key="pessoa.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                    <div>
                        <p class="font-medium">{{ pessoa.pessoa?.nome }}</p>
                        <p class="text-sm text-gray-600">CPF: {{ formatarCPF(pessoa.pessoa?.cpf) }}</p>
                    </div>
                    <button
                        @click="removerPessoa(pessoa.id)"
                        :disabled="processing"
                        class="text-red-600 hover:text-red-800"
                        title="Remover pessoa"
                    >
                        <i class="fa fa-trash"></i>
                    </button>
                </div>

                <div v-if="!grupo.pessoas || grupo.pessoas.length === 0" class="text-center text-gray-500 py-4">
                    Nenhuma pessoa adicionada ao grupo
                </div>
            </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end gap-3 pt-4">
            <button
                @click="$emit('close')"
                :disabled="processing"
                class="btn btn-secondary"
            >
                Cancelar
            </button>
            <button
                @click="salvar"
                :disabled="processing"
                class="btn btn-primary"
            >
                <i class="fa fa-save mr-2"></i>
                Salvar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import AutocompletePessoa from '@/Components/AutoCompletePessoa.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['close']);
const events = inject('events');
const toast = useToast();

const processing = ref(false);
const errors = ref({});
const grupo = ref({
    pessoas: []
});
const pessoaSelecionada = ref(null);

const form = reactive({
    nome: '',
});

onMounted(() => {
    carregarGrupo();
});

async function carregarGrupo() {
    try {
        console.log(props.id,'iddddddddddddddd')
        const response = await axios.get(`/admin/grupo-evento/detalhes/${props.id}`);
        grupo.value = response.data;
        form.nome = grupo.value.nome;
    } catch (error) {
        toast.error('Erro ao carregar grupo');
        console.error(error);
    }
}

async function adicionarPessoa() {
    if (!pessoaSelecionada.value) return;

    processing.value = true;

    try {
        const response = await axios.post('/admin/grupo-evento/adicionar-pessoa', {
            id_grupo_evento: props.id,
            id_pessoa: pessoaSelecionada.value.id
        });

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarGrupo();
            pessoaSelecionada.value = null;
        }
    } catch (error) {
        const mensagem = error.response?.data?.message || 'Erro ao adicionar pessoa';
        toast.error(mensagem);
        console.error(error);
    } finally {
        processing.value = false;
    }
}

async function removerPessoa(idPessoaGrupo) {
    if (!confirm('Deseja realmente remover esta pessoa do grupo?')) return;

    processing.value = true;

    try {
        const response = await axios.delete(`/admin/grupo-evento/pessoa/${idPessoaGrupo}`);

        if (response.data.success) {
            toast.success(response.data.message);
            await carregarGrupo();
        }
    } catch (error) {
        toast.error('Erro ao remover pessoa');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

async function salvar() {
    errors.value = {};

    if (!form.nome) {
        errors.value.nome = 'O nome do grupo é obrigatório';
        return;
    }

    processing.value = true;

    try {
        const response = await axios.put(`/admin/grupo-evento/${props.id}`, form);

        if (response.data.success) {
            toast.success(response.data.message);
            events.emit('recarrega-evento');
            emit('close');
        }
    } catch (error) {
        toast.error('Erro ao atualizar grupo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

function formatarCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
</script>
