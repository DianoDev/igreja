<template>
    <LayoutPublico>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="mr-3">📸</span>
                Galeria de Fotos
            </h1>

            <p class="text-gray-600 mb-2">
                Reviva os momentos especiais das festividades e eventos da Paróquia São Benedito.
            </p>

            <!-- Contador de fotos -->
            <div class="mb-8">
                <div class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <i class="fa fa-images mr-2"></i>
                    <span class="font-semibold">{{ totalFotos }} {{ totalFotos === 1 ? 'foto' : 'fotos' }} disponíveis</span>
                </div>
            </div>

            <!-- Eventos com fotos -->
            <div v-if="eventos && eventos.length > 0" class="space-y-12">
                <div v-for="evento in eventos" :key="evento.id" class="border-b border-gray-200 pb-10 last:border-b-0">
                    <!-- Cabeçalho do Evento -->
                    <div class="mb-6">
                        <div class="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800 mb-2">
                                    {{ evento.nome }}
                                </h2>
                                <div class="flex items-center gap-4 text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <i class="fa fa-calendar"></i>
                                        {{ formatarData(evento.data) }}
                                    </span>
                                    <span v-if="evento.hora" class="flex items-center gap-1">
                                        <i class="fa fa-clock"></i>
                                        {{ evento.hora }}
                                    </span>
                                    <span class="flex items-center gap-1 text-purple-600 font-semibold">
                                        <i class="fa fa-images"></i>
                                        {{ evento.fotos.length }} {{ evento.fotos.length === 1 ? 'foto' : 'fotos' }}
                                    </span>
                                </div>
                            </div>
                            <a :href="`/publico/eventos/${evento.id}`"
                               class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <i class="fa fa-eye"></i>
                                Ver Evento
                            </a>
                        </div>
                    </div>

                    <!-- Grid de Fotos -->
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div v-for="foto in evento.fotos" :key="foto.id"
                             class="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer"
                             @click="abrirModal(foto, evento.fotos)">
                            <!-- Imagem -->
                            <img
                                :src="getFotoUrl(foto)"
                                :alt="foto.titulo || foto.nome || 'Foto do evento'"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                            />

                            <!-- Overlay ao passar o mouse -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <p class="text-white font-semibold text-sm">
                                    {{ foto.titulo || foto.nome }}
                                </p>
                            </div>

                            <!-- Ícone de zoom -->
                            <div class="absolute top-2 right-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <i class="fa fa-search-plus text-gray-700"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mensagem quando não há fotos -->
            <div v-else class="text-center py-16">
                <div class="text-gray-400 text-6xl mb-4">
                    <i class="fa fa-image"></i>
                </div>
                <p class="text-gray-500 text-lg mb-2">
                    Nenhuma foto disponível no momento.
                </p>
                <p class="text-gray-400">
                    As fotos dos próximos eventos serão publicadas aqui.
                </p>
            </div>
        </div>

        <!-- Modal para visualização ampliada da foto -->
        <Teleport to="body">
            <div
                v-if="modalAberto"
                @click="fecharModal"
                class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
                <div class="relative max-w-7xl max-h-screen" @click.stop>
                    <!-- Botão fechar -->
                    <button
                        @click="fecharModal"
                        class="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
                    >
                        <i class="fa fa-times-circle"></i>
                    </button>

                    <!-- Navegação anterior -->
                    <button
                        v-if="indiceAtual > 0"
                        @click="fotoAnterior"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    >
                        <i class="fa fa-chevron-left"></i>
                    </button>

                    <!-- Imagem ampliada -->
                    <img
                        :src="getFotoUrl(fotoSelecionada)"
                        :alt="fotoSelecionada.titulo || fotoSelecionada.nome || 'Foto'"
                        class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    >

                    <!-- Navegação próxima -->
                    <button
                        v-if="indiceAtual < fotosAtuais.length - 1"
                        @click="proximaFoto"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 text-4xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                    >
                        <i class="fa fa-chevron-right"></i>
                    </button>

                    <!-- Informações da foto -->
                    <div class="mt-4 text-white text-center">
                        <p class="text-xl font-semibold">{{ fotoSelecionada.titulo || fotoSelecionada.nome }}</p>
                        <p v-if="fotoSelecionada.descricao" class="text-sm text-gray-300 mt-2">
                            {{ fotoSelecionada.descricao }}
                        </p>
                    </div>
                </div>
            </div>
        </Teleport>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { ref } from 'vue';

// Props recebidas do controller
defineProps({
    eventos: {
        type: Array,
        default: () => []
    },
    totalFotos: {
        type: Number,
        default: 0
    }
});

// Estados para o modal
const fotoSelecionada = ref(null);
const modalAberto = ref(false);
const indiceAtual = ref(0);
const fotosAtuais = ref([]);

// Função para obter URL da foto (igual ao EventoDetalhes)
function getFotoUrl(foto) {
    if (!foto || !foto.hash) return '';
    // Remove o prefixo 'public/' se existir
    const hash = foto.hash.replace('public/', '');
    return `/storage/${hash}`;
}

// Função para formatar datas
const formatarData = (data) => {
    if (!data) return '-';
    try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    } catch (e) {
        return data;
    }
};

// Função para abrir foto em modal
const abrirModal = (foto, fotos) => {
    fotoSelecionada.value = foto;
    fotosAtuais.value = fotos;
    indiceAtual.value = fotos.findIndex(f => f.id === foto.id);
    modalAberto.value = true;

    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
};

// Função para fechar modal
const fecharModal = () => {
    modalAberto.value = false;
    fotoSelecionada.value = null;
    fotosAtuais.value = [];

    // Restaurar scroll do body
    document.body.style.overflow = '';
};

// Navegação entre fotos
function proximaFoto() {
    if (indiceAtual.value < fotosAtuais.value.length - 1) {
        indiceAtual.value++;
        fotoSelecionada.value = fotosAtuais.value[indiceAtual.value];
    }
}

function fotoAnterior() {
    if (indiceAtual.value > 0) {
        indiceAtual.value--;
        fotoSelecionada.value = fotosAtuais.value[indiceAtual.value];
    }
}

// Atalhos de teclado para navegação no modal
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
        if (modalAberto.value) {
            if (e.key === 'Escape') fecharModal();
            if (e.key === 'ArrowRight') proximaFoto();
            if (e.key === 'ArrowLeft') fotoAnterior();
        }
    });
}
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
