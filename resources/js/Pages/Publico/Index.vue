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
                <div class="text-white max-w-3xl">
                    <h1 class="text-5xl md:text-6xl font-bold mb-4" style="text-shadow: 3px 3px 6px rgba(0,0,0,0.8); font-family: Georgia, serif;">
                        Bem-vindo à <span class="text-amber-300">Paróquia São Benedito</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 leading-relaxed" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                        Uma comunidade de fé, amor e transparência.<br>
                        Acompanhe nossos eventos, atividades e a vida paroquial.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <Link href="/publico/eventos" class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transform transition hover:scale-105">
                            📅 Ver Eventos
                        </Link>
                        <Link href="/publico/sobre" class="bg-white/20 backdrop-blur hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl border-2 border-white/50 transform transition hover:scale-105">
                            ℹ️ Sobre Nós
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>

        <!-- Próximos Eventos em Destaque -->
        <div class="container mx-auto px-4 py-12">
            <!-- Título da Seção -->
            <div class="text-center mb-12">
                <div class="inline-block">
                    <h2 class="text-4xl font-bold text-gray-800 mb-3 relative" style="font-family: Georgia, serif;">
                        <span class="relative z-10">Próximos Eventos</span>
                        <div class="absolute bottom-0 left-0 w-full h-3 bg-amber-300 opacity-30 -z-0"></div>
                    </h2>
                    <p class="text-gray-600 italic">Participe das celebrações e atividades da nossa comunidade</p>
                </div>
            </div>

            <div v-if="proximosEventos && proximosEventos.length > 0">
                <!-- Evento Principal (Destaque Grande) -->
                <div v-if="proximosEventos[0]" class="mb-8">
                    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-4 border-amber-400"
                         @click="verEvento(proximosEventos[0].id)">
                        <div class="grid md:grid-cols-2">
                            <!-- Imagem do Evento -->
                            <div class="relative h-80 md:h-auto">
                                <img :src="getImagemEvento(proximosEventos[0], 2)"
                                     alt="Evento em destaque"
                                     class="w-full h-full object-cover"
                                     @error="(e) => imagemEventoErro(e, 2)">
                                <div class="absolute top-4 left-4">
                                    <span class="bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                                        🌟 DESTAQUE
                                    </span>
                                </div>
                                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <div class="text-white">
                                        <div class="text-5xl font-bold mb-1">{{ getDia(proximosEventos[0].data) }}</div>
                                        <div class="text-xl">{{ getMesAno(proximosEventos[0].data) }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Conteúdo -->
                            <div class="p-8">
                                <div class="mb-4">
                                    <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                        {{ diasAteEvento(proximosEventos[0].data) }}
                                    </span>
                                </div>

                                <h3 class="text-3xl font-bold text-gray-800 mb-4" style="font-family: Georgia, serif;">
                                    {{ proximosEventos[0].nome }}
                                </h3>

                                <div class="space-y-3 mb-6">
                                    <div class="flex items-center text-gray-600">
                                        <span class="text-amber-500 mr-3 text-xl">📅</span>
                                        <span class="text-lg">{{ formatarData(proximosEventos[0].data) }}</span>
                                    </div>
                                    <div class="flex items-center text-gray-600">
                                        <span class="text-amber-500 mr-3 text-xl">🕐</span>
                                        <span class="text-lg">{{ proximosEventos[0].hora }}</span>
                                    </div>
                                </div>

                                <!-- Financeiro -->
                                <div class="grid grid-cols-2 gap-4 mb-6">
                                    <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                        <p class="text-xs text-green-700 font-medium mb-1">Arrecadado</p>
                                        <p class="text-2xl font-bold text-green-900">
                                            R$ {{ formatarValor(proximosEventos[0].valor_arrecadado || 0) }}
                                        </p>
                                    </div>
                                    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                        <p class="text-xs text-red-700 font-medium mb-1">Gasto</p>
                                        <p class="text-2xl font-bold text-red-900">
                                            R$ {{ formatarValor(proximosEventos[0].valor_gasto || 0) }}
                                        </p>
                                    </div>
                                </div>

                                <button class="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                    Ver Detalhes →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Eventos Secundários (4 Cards Menores) -->
                <div v-if="proximosEventos.length > 1">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                        <span class="mr-2">📌</span>
                        Outros Eventos Próximos
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div v-for="(evento, index) in proximosEventos.slice(1, 5)"
                             :key="evento.id"
                             class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-gray-100 hover:border-amber-400"
                             @click="verEvento(evento.id)">

                            <!-- Imagem -->
                            <div class="relative h-20">
                                <img :src="getImagemEvento(evento, index + 3)"
                                     alt="Evento"
                                     class="w-full h-full object-cover"
                                     @error="(e) => imagemEventoErro(e, index + 3)">
                                <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-3">
                                    <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
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

                                <button class="w-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                    Ver mais →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-16">
                <div class="text-6xl mb-4">📅</div>
                <p class="text-xl text-gray-600">Nenhum evento próximo agendado no momento.</p>
            </div>
        </div>

        <!-- Cards de Acesso Rápido -->
        <div class="bg-gradient-to-b from-gray-50 to-white py-12">
            <div class="container mx-auto px-4">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold text-gray-800" style="font-family: Georgia, serif;">
                        Transparência e Informação
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/publico/atas" class="group">
                        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-500">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">📝</div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-3" style="font-family: Georgia, serif;">Atas</h3>
                            <p class="text-gray-600">Acesse as atas das reuniões e assembleias da paróquia</p>
                        </div>
                    </Link>

                    <Link href="/publico/regimes-internos" class="group">
                        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-500">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-3" style="font-family: Georgia, serif;">Regimes Internos</h3>
                            <p class="text-gray-600">Consulte nossos regimentos e normas institucionais</p>
                        </div>
                    </Link>

                    <Link href="/publico/estatutos" class="group">
                        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-500">
                            <div class="text-6xl mb-4 group-hover:scale-110 transition-transform">⚖️</div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-3" style="font-family: Georgia, serif;">Estatutos</h3>
                            <p class="text-gray-600">Veja nossos estatutos e documentos oficiais</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { Link, router } from '@inertiajs/vue3';

const props = defineProps({
    proximosEventos: {
        type: Array,
        default: () => []
    }
});

const getImagemEvento = (evento, numero) => {
    // Usa as imagens em public/images/
    return `/images/${numero}-grande.jpg`;
};

const imagemErro = (e) => {
    // Fallback para imagem padrão se não encontrar
    e.target.src = '/images/1-grande.jpg';
};

const imagemEventoErro = (e, numero) => {
    // Fallback para imagem padrão
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

    if (diffDays === 0) return '🔴 Hoje';
    if (diffDays === 1) return '⭐ Amanhã';
    if (diffDays < 0) return '✅ Realizado';
    if (diffDays <= 7) return `🔥 Em ${diffDays} dias`;
    return `📅 Em ${diffDays} dias`;
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
