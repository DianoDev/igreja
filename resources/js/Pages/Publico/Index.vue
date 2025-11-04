<template>
    <LayoutPublico>
        <!-- Banner Principal com Imagem da Igreja -->
        <div class="relative h-[500px] overflow-hidden">
            <!-- Imagem de fundo -->
            <div class="absolute inset-0">
                <img :src="`/images/1-grande.jpg`"
                     alt="Paróquia São Benedito"
                     class="w-full h-full object-cover"
                     @error="imagemErro">
                <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
            </div>

            <!-- Conteúdo do Banner -->
            <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div class="text-gray-800 max-w-3xl">
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="font-family: Georgia, serif;">
                        Bem-vindo festeiros da <span class="text-amber-400 ">Paróquia São Benedito</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-white mb-8 leading-relaxed text-gray-700">
                        Uma comunidade de fé, amor e transparência.<br>
                        Acompanhe nossos eventos, atividades.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <Link href="/publico/eventos"
                              class="group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300">
        <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Ver Eventos
        </span>
                        </Link>
                        <Link href="/publico/sobre"
                              class="group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300">
        <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Sobre Nós
        </span>
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
        <div v-if="avisos && avisos.length > 0" class="mt-4">
            <div class="text-center">
                <div class="inline-block">
                    <h2 class="text-4xl font-bold text-gray-700 mb-3 relative" style="font-family: Georgia, serif;">
                        <span class="relative z-10"> Avisos Importantes</span>
                        <div class="absolute bottom-0 left-0 w-full h-3 bg-red-200 opacity-50 -z-0"></div>
                    </h2>
                    <p class="text-gray-500 italic">Fique por dentro das últimas notícias e comunicados</p>
                </div>
            </div>

            <div class="container mx-auto px-4 py-6">
                <!-- MURAL DE AVISOS COM IMAGEM - Layout em Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <!-- Coluna de Avisos (2/3 da largura) -->
                    <div class="lg:col-span-3">
                        <div class="space-y-3">
                            <div v-for="aviso in avisos" :key="aviso.id"
                                 class="bg-amber-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                                <div class="flex items-start justify-between gap-4">
                                    <!-- Conteúdo -->
                                    <div class="flex-1 min-w-0">
                                        <h3 class="font-bold text-gray-900 mb-1 text-lg">
                                            {{ aviso.nome }}
                                        </h3>
                                        <p class="text-gray-700 text-sm leading-relaxed">
                                            {{ aviso.descricao }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Coluna da Imagem (1/3 da largura) -->
                    <div class="lg:col-span-1">
                        <div class="sticky top-4">
                            <div class=" overflow-hidden">
                                <img
                                    src="/images/jesus-2.png"
                                    alt="Jesus Cristo"
                                    class="border bg-white rounded-xl shadow-lg items-center w-60 h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Próximos Eventos em Destaque -->
        <div class="container mx-auto px-4 py-12">
            <!-- Título da Seção -->
            <div class="text-center mb-12">
                <div class="inline-block">
                    <h2 class="text-4xl font-bold text-gray-700 mb-3 relative" style="font-family: Georgia, serif;">
                        <span class="relative z-10">Próximos Eventos</span>
                        <div class="absolute bottom-0 left-0 w-full h-3 bg-amber-200 opacity-50 -z-0"></div>
                    </h2>
                    <p class="text-gray-500 italic">Participe das celebrações e atividades da nossa equipe</p>
                </div>
            </div>

            <div v-if="proximosEventos && proximosEventos.length > 0">
                <!-- Eventos Principais Divididos por Período (Manhã e Noite) -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <!-- Evento da Manhã -->
                    <div v-if="eventoManha"
                         class="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-blue-200"
                         @click="verEvento(eventoManha.id)">

                        <!-- Header com Período -->
                        <div class="bg-gradient-to-r from-blue-400 to-sky-400 p-4 text-white">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <span class="text-2xl">☀️</span>
                                    <span class="font-bold text-lg">EVENTO DE DIA</span>
                                </div>
                                <span class="bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                    {{ diasAteEvento(eventoManha.data) }}
                                </span>
                            </div>
                        </div>

                        <!-- Imagem do Evento -->
                        <div class="relative h-48">
                            <img :src="getImagemEvento(eventoManha, 2)"
                                 alt="Evento da Manhã"
                                 class="w-full h-full object-cover"
                                 @error="(e) => imagemEventoErro(e, 2)">
                            <div
                                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/70 to-transparent p-4">
                                <div class="text-white">
                                    <div class="text-3xl font-bold mb-1">{{ getDia(eventoManha.data) }}</div>
                                    <div class="text-sm">{{ getMesAno(eventoManha.data) }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Conteúdo -->
                        <div class="p-6">
                            <h3 class="text-2xl font-bold text-gray-800 mb-4" style="font-family: Georgia, serif;">
                                {{ eventoManha.nome }}
                            </h3>

                            <div class="space-y-2 mb-4">
                                <div class="flex items-center text-gray-600">
                                    <span class="text-blue-500 mr-3">📅</span>
                                    <span>{{ formatarData(eventoManha.data) }}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <span class="text-blue-500 mr-3">🕐</span>
                                    <span class="font-medium">{{ eventoManha.hora }}</span>
                                </div>
                            </div>

                            <button
                                class="w-full bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md">
                                Ver Detalhes →
                            </button>
                        </div>
                    </div>

                    <!-- Evento da Noite -->
                    <div v-if="eventoNoite"
                         class="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-indigo-200"
                         @click="verEvento(eventoNoite.id)">

                        <!-- Header com Período -->
                        <div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <span class="text-2xl">🌙</span>
                                    <span class="font-bold text-lg">EVENTO DE NOITE</span>
                                </div>
                                <span class="bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                    {{ diasAteEvento(eventoNoite.data) }}
                                </span>
                            </div>
                        </div>

                        <!-- Imagem do Evento -->
                        <div class="relative h-48">
                            <img :src="getImagemEvento(eventoNoite, 3)"
                                 alt="Evento da Noite"
                                 class="w-full h-full object-cover"
                                 @error="(e) => imagemEventoErro(e, 3)">
                            <div
                                class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/70 to-transparent p-4">
                                <div class="text-white">
                                    <div class="text-3xl font-bold mb-1">{{ getDia(eventoNoite.data) }}</div>
                                    <div class="text-sm">{{ getMesAno(eventoNoite.data) }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Conteúdo -->
                        <div class="p-6">
                            <h3 class="text-2xl font-bold text-gray-800 mb-4" style="font-family: Georgia, serif;">
                                {{ eventoNoite.nome }}
                            </h3>

                            <div class="space-y-2 mb-4">
                                <div class="flex items-center text-gray-600">
                                    <span class="text-indigo-500 mr-3">📅</span>
                                    <span>{{ formatarData(eventoNoite.data) }}</span>
                                </div>
                                <div class="flex items-center text-gray-600">
                                    <span class="text-indigo-500 mr-3">🕐</span>
                                    <span class="font-medium">{{ eventoNoite.hora }}</span>
                                </div>
                            </div>

                            <button
                                class="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md">
                                Ver Detalhes →
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Eventos Secundários (Cards Menores) -->
                <div v-if="outrosEventos.length > 0">
                    <h3 class="text-2xl font-bold text-gray-700 mb-6 flex items-center"
                        style="font-family: Georgia, serif;">
                        <span class="mr-2">📌</span>
                        Outros Eventos Próximos
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div v-for="(evento, index) in outrosEventos"
                             :key="evento.id"
                             class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-gray-100 hover:border-amber-300"
                             @click="verEvento(evento.id)">

                            <!-- Imagem -->
                            <div class="relative h-32">
                                <img :src="getImagemEvento(evento, index + 4)"
                                     alt="Evento"
                                     class="w-full h-full object-cover"
                                     @error="(e) => imagemEventoErro(e, index + 4)">
                                <div
                                    class="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/30 to-transparent p-3">
                                    <span
                                        class="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
                                        {{ diasAteEvento(evento.data) }}
                                    </span>
                                </div>
                            </div>

                            <!-- Conteúdo -->
                            <div class="p-4">
                                <h4 class="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]">
                                    {{ evento.nome }}
                                </h4>

                                <div class="space-y-2 mb-4">
                                    <div class="flex items-center text-sm text-gray-600">
                                        <span class="text-amber-500 mr-2">📅</span>
                                        <span>{{ formatarDataCurta(evento.data) }}</span>
                                    </div>
                                    <div class="flex items-center text-sm text-gray-600">
                                        <span class="text-amber-500 mr-2">🕐</span>
                                        <span>{{ evento.hora }}</span>
                                    </div>
                                </div>

                                <button
                                    class="w-full bg-gray-50 hover:bg-amber-400 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
                                    Ver mais →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-16">
                <div class="text-6xl mb-4">📅</div>
                <p class="text-xl text-gray-500">Nenhum evento próximo agendado no momento.</p>
            </div>
        </div>
        <!-- Comissão do Ano -->
        <div v-if="comissao" class="bg-white rounded-xl  p-8 mb-8">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-700 mb-2" style="font-family: Georgia, serif;">
                    <span class="mr-2">👥</span>
                    {{ comissao.nome }}
                </h2>
                <p class="text-lg text-gray-600">Ano {{ comissao.ano }}</p>
            </div>

            <div v-if="comissao.integrantes && comissao.integrantes.length > 0"
                 class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="integrante in comissao.integrantes"
                     :key="integrante.id"
                     class="bg-gradient-to-br  rounded-lg p-6 border-l-4 border-amber-500 shadow hover:shadow-md transition-shadow">
                    <div class="flex items-center mb-3">
                        <div
                            class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl mr-4">
                            <i class="fa fa-user"></i>
                        </div>
                        <div>
                            <p class="font-bold text-gray-800 text-lg">
                                {{ integrante.pessoa.nome }}
                            </p>
                            <p class="text-sm text-amber-600 font-medium">
                                {{ integrante.cargo.nome }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
                <p>Nenhum integrante cadastrado para esta comissão.</p>
            </div>
        </div>
        <!-- Cards de Acesso Rápido -->
        <div class="">
            <div class="container mx-auto px-4">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold text-gray-700" style="font-family: Georgia, serif;">
                        Transparência e Informação
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/publico/atas" class="group">
                        <div
                            class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-300">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">📝</div>
                            <h3 class="text-2xl font-bold text-gray-700 mb-3" style="font-family: Georgia, serif;">
                                Atas</h3>
                            <p class="text-gray-500">Acesse as atas das reuniões e assembleias da paróquia</p>
                        </div>
                    </Link>

                    <Link href="/publico/regimes-internos" class="group">
                        <div
                            class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-300">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                            <h3 class="text-2xl font-bold text-gray-700 mb-3" style="font-family: Georgia, serif;">
                                Regimento Interno</h3>
                            <p class="text-gray-500">Consulte nossos regimentos e normas institucionais</p>
                        </div>
                    </Link>

                    <Link href="/publico/estatutos" class="group">
                        <div
                            class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-green-300">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">⚖️</div>
                            <h3 class="text-2xl font-bold text-gray-700 mb-3" style="font-family: Georgia, serif;">
                                Estatuto</h3>
                            <p class="text-gray-500">Veja nosso estatuto e documentos oficiais</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import {Link, router} from '@inertiajs/vue3';
import {computed} from 'vue';

const props = defineProps({
    proximosEventos: {
        type: Array,
        default: () => []
    },
    comissao: {
        type: Object,
        default: null
    },
    avisos: {
        type: Object,
        default: null
    }
});

// Função para determinar se é manhã ou noite baseado no horário
const ehManha = (hora) => {
    if (!hora) return false;
    const horaNum = parseInt(hora.split(':')[0]);
    return horaNum >= 6 && horaNum < 18; // Manhã/Tarde: 6h às 17h59
};

// Computed para separar eventos por período
const eventoManha = computed(() => {
    return props.proximosEventos.find(evento => ehManha(evento.hora));
});

const eventoNoite = computed(() => {
    return props.proximosEventos.find(evento => !ehManha(evento.hora));
});

const outrosEventos = computed(() => {
    const eventosExibidos = [eventoManha.value?.id, eventoNoite.value?.id].filter(Boolean);
    return props.proximosEventos
        .filter(evento => !eventosExibidos.includes(evento.id))
        .slice(0, 4);
});

const getImagemEvento = (evento, numero) => {
    return `/images/${numero}-grande.jpg`;
};

const imagemErro = (e) => {
    e.target.src = '/images/1-grande.jpg';
};

const imagemEventoErro = (e, numero) => {
    e.target.src = `/images/${numero % 10 || 1}.jpg`;
};

const formatarData = (data) => {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });
};

const formatarDataCurta = (data) => {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
    });
};

const getDia = (data) => {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.getDate();
};

const getMesAno = (data) => {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });
};

const formatarValor = (valor) => {
    return parseFloat(valor || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const diasAteEvento = (data) => {
    if (!data) return '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataEvento = new Date(data + 'T00:00:00');
    const diffTime = dataEvento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays < 0) return 'Realizado';
    if (diffDays <= 7) return `Em ${diffDays} dias`;
    return `Em ${diffDays} dias`;
};

const verEvento = (id) => {
    router.visit(`/publico/eventos/${id}`);
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0) translateX(-50%);
    }
    50% {
        transform: translateY(10px) translateX(-50%);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}
</style>
