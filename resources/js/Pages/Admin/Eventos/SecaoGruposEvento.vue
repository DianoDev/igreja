<!-- ADICIONAR ESTA SEÇÃO NO ARQUIVO EventosInfo.vue -->

<!-- Adicionar no script setup: -->
<script setup>
// ... código existente ...

// Estados para Grupos
const gruposEvento = ref([]);
const gruposModelo = ref([]);
const grupoSelecionado = ref('');
const modalEditarGrupoAberto = ref(false);
const grupoEditando = ref(null);

// Carregar grupos ao montar
onMounted(() => {
    // ... chamadas existentes ...
    carregarGruposModelo();
    carregarGruposEvento();
});

// Adicionar estas funções:

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
            await carregarTudo();
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
function editarGrupo(grupo) {
    grupoEditando.value = grupo;
    events.emit('open-popup', {
        component: 'Admin/Eventos/ModalEditarGrupo',
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
            await carregarTudo();
        }
    } catch (error) {
        toast.error('Erro ao remover grupo');
        console.error(error);
    } finally {
        processing.value = false;
    }
}

// Atualizar função carregarTudo para incluir grupos
function carregarTudo() {
    carregarCardapiosEvento();
    carregarGruposEvento(); // ADICIONAR ESTA LINHA
    recarregarDoacoes();
    carregarEvento();
}
</script>

<!-- Template HTML - Adicionar esta seção após a seção de Cardápios -->
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
                        <span class="text-gray-500">- CPF: {{ formatarCPF(pessoa.pessoa?.cpf) }}</span>
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

<!-- Adicionar função helper no script se não existir -->
<script setup>
function formatarCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
</script>
