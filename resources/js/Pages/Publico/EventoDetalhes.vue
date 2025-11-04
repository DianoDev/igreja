<template>
    <Head :title="`Evento: ${evento.nome}`"/>

    <LayoutPublico>
        <div class="container mx-auto px-4 py-8 max-w-7xl">

            <!-- Cabeçalho Moderno e Clean -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <!-- Barra Superior -->
                <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-2"></div>

                <!-- Conteúdo do Cabeçalho -->
                <div class="p-6 md:p-10">
                    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
                        <!-- Info do Evento -->
                        <div class="flex-1">
                            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style="font-family: Georgia, serif;">
                                {{ evento.nome }}
                            </h1>

                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center gap-2 text-gray-700">
                                    <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                        <i class="fa fa-calendar text-amber-600"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 font-medium">Data</p>
                                        <p class="font-semibold">{{ formatarData(evento.data) }}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-2 text-gray-700">
                                    <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                        <i class="fa fa-clock text-amber-600"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500 font-medium">Horário</p>
                                        <p class="font-semibold">{{ evento.hora }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botão Voltar -->
                        <Link
                            href="/publico/eventos"
                            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
                        >
                            <i class="fa fa-arrow-left"></i>
                            <span>Voltar</span>
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Cards Financeiros -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Valor Gasto -->
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1 font-medium">Valor Gasto</p>
                            <p class="text-2xl font-bold text-red-600">
                                {{ formatarMoeda(evento.valor_gasto) }}
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <i class="fa fa-arrow-down text-2xl text-red-500"></i>
                        </div>
                    </div>
                </div>

                <!-- Valor Arrecadado -->
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1 font-medium">Valor Arrecadado</p>
                            <p class="text-2xl font-bold text-green-600">
                                {{ formatarMoeda(evento.valor_arrecadado) }}
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                            <i class="fa fa-arrow-up text-2xl text-green-500"></i>
                        </div>
                    </div>
                </div>

                <!-- Saldo -->
                <div class="bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" :class="saldoCorBorda">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1 font-medium">Saldo</p>
                            <p class="text-2xl font-bold" :class="saldoCorTexto">
                                {{ formatarMoeda(saldo) }}
                            </p>
                        </div>
                        <div class="w-12 h-12 rounded-full flex items-center justify-center"
                             :class="saldo > 0 ? 'bg-blue-50' : saldo < 0 ? 'bg-yellow-50' : 'bg-gray-50'">
                            <i class="fa text-2xl" :class="[
                                saldo >= 0 ? 'fa-check-circle' : 'fa-exclamation-triangle',
                                saldoCorIcone
                            ]"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Comissão do Evento (quando não há cargos específicos) -->
            <div v-if="comissao && (!evento.cargos || evento.cargos.length === 0)" class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border border-amber-200">
                <div class="text-center mb-8">
                    <div class="inline-block bg-white rounded-full p-4 shadow-md mb-4">
                        <i class="fa fa-users text-4xl text-amber-600"></i>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2" style="font-family: Georgia, serif;">
                        {{ comissao.nome }}
                    </h2>
                    <p class="text-amber-700 font-medium">Ano {{ comissao.ano }}</p>
                </div>

                <div v-if="comissao.integrantes && comissao.integrantes.length > 0"
                     class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="integrante in comissao.integrantes"
                         :key="integrante.id"
                         class="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-amber-100">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                <i class="fa fa-user text-white text-xl"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-gray-800 text-base truncate">
                                    {{ integrante.pessoa.nome }}
                                </p>
                                <p class="text-sm text-amber-600 font-medium truncate">
                                    {{ integrante.cargo.nome }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8 text-gray-500">
                    <i class="fa fa-info-circle text-3xl mb-2"></i>
                    <p>Nenhum integrante cadastrado nesta comissão</p>
                </div>
            </div>

            <!-- Grid Principal: Cargos e Doações -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                <!-- Cargos Específicos do Evento -->
                <div v-if="evento.cargos && evento.cargos.length > 0" class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                        <span class="text-4xl mr-3">👥</span>
                        Cargos e Responsáveis
                    </h2>

                    <div class="space-y-4">
                        <div
                            v-for="cargo in evento.cargos"
                            :key="cargo.id"
                            class="border-l-4 border-amber-500 pl-5 py-4 bg-gradient-to-r from-amber-50 to-transparent rounded-r-lg hover:shadow-md transition-all"
                        >
                            <p class="font-bold text-lg text-gray-800 mb-1">
                                {{ cargo.cargo?.nome || 'Cargo não definido' }}
                            </p>
                            <p class="text-gray-700 flex items-center">
                                <i class="fa fa-user mr-2 text-amber-600"></i>
                                {{ cargo.pessoa?.nome || 'Pessoa não definida' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Doações -->
                <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                        <span class="text-4xl mr-3">🎁</span>
                        Doações Recebidas
                    </h2>

                    <div v-if="evento.doacoes && evento.doacoes.length > 0" class="space-y-4">
                        <div
                            v-for="doacao in evento.doacoes"
                            :key="doacao.id"
                            class="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-transparent border-l-4 border-green-500 rounded-r-lg hover:shadow-md transition-all"
                        >
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="fa fa-gift text-green-600"></i>
                                </div>
                                <p class="text-gray-800 font-medium">
                                    {{ doacao.pessoa?.nome || 'Doador não identificado' }}
                                </p>
                            </div>
                            <p class="text-xl font-bold text-green-600">
                                {{ formatarMoeda(doacao.valor) }}
                            </p>
                        </div>

                        <!-- Total de Doações -->
                        <div class="mt-6 pt-6 border-t-2 border-gray-200">
                            <div class="flex justify-between items-center bg-green-100 rounded-lg p-4">
                                <p class="text-lg font-semibold text-gray-800">Total em Doações:</p>
                                <p class="text-2xl font-bold text-green-600">
                                    {{ formatarMoeda(totalDoacoes) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-12 text-gray-500">
                        <div class="text-6xl mb-4">🎁</div>
                        <p class="text-lg">Nenhuma doação registrada para este evento.</p>
                    </div>
                </div>
            </div>

            <!-- Cardápio -->
            <div v-if="evento.cardapios && evento.cardapios.length > 0" class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                    <span class="text-4xl mr-3">🍽️</span>
                    Cardápio do Evento
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                        v-for="item in evento.cardapios"
                        :key="item.id"
                        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-orange-50 to-white"
                    >
                        <div class="flex items-center gap-3">
                            <div class="text-3xl">🍴</div>
                            <div class="flex-1">
                                <p class="font-semibold text-gray-800">
                                    {{ item.cardapio?.nome || 'Item não definido' }}
                                </p>
                                <p v-if="item.cardapio?.descricao" class="text-sm text-gray-600 mt-1">
                                    {{ item.cardapio.descricao }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Galeria de Fotos -->
            <div v-if="evento.fotos && evento.fotos.length > 0" class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                    <span class="text-4xl mr-3">📸</span>
                    Galeria de Fotos
                </h2>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div
                        v-for="foto in evento.fotos"
                        :key="foto.id"
                        class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md hover:shadow-xl"
                        @click="abrirModal(foto)"
                    >
                        <img
                            :src="getFotoUrl(foto)"
                            :alt="foto.descricao || 'Foto do evento'"
                            class="w-full h-full object-cover"
                        >
                    </div>
                </div>
            </div>

            <!-- Arquivos Anexos -->
            <div v-if="arquivos && arquivos.length > 0" class="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                    <span class="text-4xl mr-3">📎</span>
                    Arquivos do Evento
                </h2>

                <div class="space-y-3">
                    <a
                        v-for="arquivo in arquivos"
                        :key="arquivo.id"
                        :href="`/publico/arquivo/${arquivo.id}`"
                        target="_blank"
                        class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                    >
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                <i class="fa fa-file text-amber-600"></i>
                            </div>
                            <span class="font-medium text-gray-800">{{ arquivo.descricao || 'Documento' }}</span>
                        </div>
                        <i class="fa fa-download text-amber-600"></i>
                    </a>
                </div>
            </div>

        </div>

        <!-- Modal de Fotos -->
        <Teleport to="body">
            <div
                v-if="modalAberto"
                class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                @click="fecharModal"
            >
                <div class="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                    <!-- Botão Fechar -->
                    <button
                        @click.stop="fecharModal"
                        class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors z-10"
                    >
                        <i class="fa fa-times text-2xl"></i>
                    </button>

                    <!-- Imagem -->
                    <img
                        v-if="fotoSelecionada"
                        :src="getFotoUrl(fotoSelecionada)"
                        :alt="fotoSelecionada.descricao || 'Foto do evento'"
                        class="max-w-full max-h-full object-contain"
                        @click.stop
                    >

                    <!-- Navegação -->
                    <button
                        v-if="indiceAtual > 0"
                        @click.stop="fotoAnterior"
                        class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors"
                    >
                        <i class="fa fa-chevron-left text-2xl"></i>
                    </button>

                    <button
                        v-if="indiceAtual < evento.fotos.length - 1"
                        @click.stop="proximaFoto"
                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors"
                    >
                        <i class="fa fa-chevron-right text-2xl"></i>
                    </button>
                </div>
            </div>
        </Teleport>
    </LayoutPublico>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import LayoutPublico from '@/Layouts/LayoutPublico.vue';

const props = defineProps({
    evento: {
        type: Object,
        required: true
    },
    arquivos: {
        type: Array,
        default: () => []
    },
    comissao: {
        type: Object,
        default: null
    }
});

// Estado do modal de fotos
const modalAberto = ref(false);
const fotoSelecionada = ref(null);
const indiceAtual = ref(0);

// Computeds financeiros
const saldo = computed(() => {
    const arrecadado = parseFloat(props.evento.valor_arrecadado || 0);
    const gasto = parseFloat(props.evento.valor_gasto || 0);
    return arrecadado - gasto;
});

const saldoCorBorda = computed(() => {
    if (saldo.value > 0) return 'border-blue-400';
    if (saldo.value < 0) return 'border-yellow-400';
    return 'border-gray-300';
});

const saldoCorTexto = computed(() => {
    if (saldo.value > 0) return 'text-blue-600';
    if (saldo.value < 0) return 'text-yellow-600';
    return 'text-gray-600';
});

const saldoCorIcone = computed(() => {
    if (saldo.value > 0) return 'text-blue-500';
    if (saldo.value < 0) return 'text-yellow-500';
    return 'text-gray-400';
});

const totalDoacoes = computed(() => {
    if (!props.evento.doacoes) return 0;
    return props.evento.doacoes.reduce((total, doacao) => {
        return total + parseFloat(doacao.valor || 0);
    }, 0);
});

// Formatadores
function formatarData(data) {
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
}

function formatarMoeda(valor) {
    if (!valor && valor !== 0) return 'R$ 0,00';
    const numero = parseFloat(valor);
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numero);
}

// Funções da galeria
function getFotoUrl(foto) {
    if (!foto || !foto.hash) return '';
    const hash = foto.hash.replace('public/', '');
    return `/storage/${hash}`;
}

function abrirModal(foto) {
    fotoSelecionada.value = foto;
    indiceAtual.value = props.evento.fotos.findIndex(f => f.id === foto.id);
    modalAberto.value = true;
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    modalAberto.value = false;
    fotoSelecionada.value = null;
    document.body.style.overflow = '';
}

function proximaFoto() {
    if (indiceAtual.value < props.evento.fotos.length - 1) {
        indiceAtual.value++;
        fotoSelecionada.value = props.evento.fotos[indiceAtual.value];
    }
}

function fotoAnterior() {
    if (indiceAtual.value > 0) {
        indiceAtual.value--;
        fotoSelecionada.value = props.evento.fotos[indiceAtual.value];
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
.card-link {
    text-decoration: none;
    color: inherit;
}

.card-link:hover {
    text-decoration: none;
}
</style>
