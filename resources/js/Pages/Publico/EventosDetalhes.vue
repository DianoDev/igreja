<template>
    <LayoutPublicoNovo>
        <div class="bg-gradient-to-b from-gray-50 to-white">
            <div class="container mx-auto px-4 py-8">
                <!-- Breadcrumb -->
                <nav class="mb-6">
                    <Link href="/publico/eventos" class="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
                        ← Voltar para Eventos
                    </Link>
                </nav>

                <!-- Header do Evento com Imagem -->
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                    <div class="relative h-80">
                        <img :src="`/images/${(evento.id % 10) || 1}.jpg`"
                             alt="Evento"
                             class="w-full h-full object-cover"
                             @error="imagemErro">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                        <!-- Título sobre a imagem -->
                        <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h1 class="text-4xl md:text-5xl font-bold mb-3" style="font-family: Georgia, serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                                {{ evento.nome }}
                            </h1>
                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                                    <span class="text-amber-300 mr-2 text-xl">📅</span>
                                    <span class="font-medium">{{ formatarData(evento.data) }}</span>
                                </div>
                                <div class="flex items-center bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                                    <span class="text-amber-300 mr-2 text-xl">🕐</span>
                                    <span class="font-medium">{{ evento.hora }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resumo Financeiro -->
                    <div class="p-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                            <span class="mr-2">💰</span>
                            Resumo Financeiro
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 shadow-md">
                                <p class="text-sm text-red-700 font-medium mb-2 flex items-center">
                                    <span class="mr-2">💸</span>
                                    Valor Gasto
                                </p>
                                <p class="text-3xl font-bold text-red-900">
                                    R$ {{ formatarValor(evento.valor_gasto || 0) }}
                                </p>
                            </div>
                            <div class="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded-xl p-6 shadow-md">
                                <p class="text-sm text-green-700 font-medium mb-2 flex items-center">
                                    <span class="mr-2">💵</span>
                                    Valor Arrecadado
                                </p>
                                <p class="text-3xl font-bold text-green-900">
                                    R$ {{ formatarValor(evento.valor_arrecadado || 0) }}
                                </p>
                            </div>
                            <div :class="saldoClass" class="border-l-4 rounded-xl p-6 shadow-md">
                                <p class="text-sm font-medium mb-2 flex items-center">
                                    <span class="mr-2">📊</span>
                                    Saldo
                                </p>
                                <p class="text-3xl font-bold">
                                    R$ {{ formatarValor(saldo) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Cargos do Evento -->
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                            <span class="mr-2">👥</span>
                            Cargos e Responsáveis
                        </h2>

                        <div v-if="evento.cargos && evento.cargos.length > 0" class="space-y-4">
                            <div v-for="cargo in evento.cargos" :key="cargo.id"
                                 class="border-l-4 border-amber-500 pl-5 py-3 bg-gradient-to-r from-amber-50 to-transparent rounded-r-lg hover:shadow-md transition-shadow">
                                <p class="font-bold text-lg text-gray-800">
                                    {{ cargo.cargo?.nome || 'Cargo não definido' }}
                                </p>
                                <p class="text-gray-600 flex items-center mt-1">
                                    <span class="mr-2">👤</span>
                                    {{ cargo.pessoa?.nome || 'Pessoa não definida' }}
                                </p>
                            </div>
                        </div>

                        <div v-else class="text-center py-12 text-gray-500">
                            <div class="text-5xl mb-3">👥</div>
                            <p>Nenhum cargo atribuído para este evento.</p>
                        </div>
                    </div>

                    <!-- Doações -->
                    <div class="bg-white rounded-xl shadow-lg p-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                            <span class="mr-2">🎁</span>
                            Doações Recebidas
                        </h2>

                        <div v-if="evento.doacoes && evento.doacoes.length > 0" class="space-y-4">
                            <div v-for="doacao in evento.doacoes" :key="doacao.id"
                                 class="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-gradient-to-r from-white to-green-50">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex-1">
                                        <p class="font-bold text-gray-800 flex items-center">
                                            <span class="mr-2">🙏</span>
                                            {{ doacao.pessoa?.nome || 'Doador Anônimo' }}
                                        </p>
                                        <p class="text-sm text-gray-500 mt-1">{{ doacao.tipo_doacao }}</p>
                                    </div>
                                    <p class="text-2xl font-bold text-green-600">
                                        R$ {{ formatarValor(doacao.valor || 0) }}
                                    </p>
                                </div>
                                <p v-if="doacao.descricao" class="text-sm text-gray-600 mt-2 italic border-t pt-2">
                                    "{{ doacao.descricao }}"
                                </p>
                            </div>
                        </div>

                        <div v-else class="text-center py-12 text-gray-500">
                            <div class="text-5xl mb-3">🎁</div>
                            <p>Nenhuma doação registrada para este evento.</p>
                        </div>
                    </div>
                </div>

                <!-- Cardápio -->
                <div class="mt-8 bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                        <span class="mr-2">🍽️</span>
                        Cardápio do Evento
                    </h2>

                    <div v-if="evento.cardapios && evento.cardapios.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="item in evento.cardapios" :key="item.id"
                             class="border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-amber-400 bg-gradient-to-br from-white to-amber-50">
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="font-bold text-lg text-gray-800 flex-1">
                                    {{ item.cardapio?.nome || 'Item não definido' }}
                                </h3>
                                <span class="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {{ item.quantidade || 0 }}x
                                </span>
                            </div>
                            <div v-if="item.cardapio?.descricao" class="text-sm text-gray-600 italic">
                                {{ item.cardapio.descricao }}
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-center py-12 text-gray-500">
                        <div class="text-5xl mb-3">🍽️</div>
                        <p>Nenhum item de cardápio definido para este evento.</p>
                    </div>
                </div>

                <!-- Arquivos Anexos -->
                <div v-if="arquivos && arquivos.length > 0" class="mt-8 bg-white rounded-xl shadow-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="font-family: Georgia, serif;">
                        <span class="mr-2">📎</span>
                        Documentos e Arquivos
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a v-for="arquivo in arquivos" :key="arquivo.id"
                           :href="`/publico/arquivo/${arquivo.id}`"
                           target="_blank"
                           class="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-lg transition-all bg-gradient-to-r from-white to-blue-50 group">
                            <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                <span class="text-2xl">📄</span>
                            </div>
                            <div class="flex-1">
                                <p class="font-medium text-gray-800 group-hover:text-amber-600 transition-colors">
                                    {{ arquivo.titulo || 'Documento' }}
                                </p>
                                <p class="text-xs text-gray-500">Clique para baixar</p>
                            </div>
                            <span class="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </LayoutPublicoNovo>
</template>

<script setup>
import LayoutPublicoNovo from '@/Layouts/LayoutPublicoNovo.vue';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    evento: {
        type: Object,
        required: true
    },
    arquivos: {
        type: Array,
        default: () => []
    }
});

const imagemErro = (e) => {
    e.target.src = '/images/1.jpg';
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

const formatarValor = (valor) => {
    return parseFloat(valor || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const saldo = computed(() => {
    return (props.evento.valor_arrecadado || 0) - (props.evento.valor_gasto || 0);
});

const saldoClass = computed(() => {
    if (saldo.value > 0) return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500 text-blue-900';
    if (saldo.value < 0) return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-500 text-yellow-900';
    return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-500 text-gray-900';
});
</script>
