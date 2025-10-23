<template>
    <LayoutPublico>
        <div class="space-y-6">
            <!-- Botão Voltar -->
            <Link href="/publico/eventos" class="inline-flex items-center text-blue-600 hover:text-blue-700">
                ← Voltar para Eventos
            </Link>

            <!-- Cabeçalho do Evento -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ evento.nome }}</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="flex items-center text-gray-600">
                        <span class="mr-2 text-xl">📅</span>
                        <span class="text-lg">{{ formatarData(evento.data) }}</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <span class="mr-2 text-xl">🕐</span>
                        <span class="text-lg">{{ evento.hora }}</span>
                    </div>
                </div>

                <!-- Resumo Financeiro -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p class="text-sm text-red-700 font-medium mb-2">Valor Gasto</p>
                        <p class="text-2xl font-bold text-red-900">
                            R$ {{ formatarValor(evento.valor_gasto || 0) }}
                        </p>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p class="text-sm text-green-700 font-medium mb-2">Valor Arrecadado</p>
                        <p class="text-2xl font-bold text-green-900">
                            R$ {{ formatarValor(evento.valor_arrecadado || 0) }}
                        </p>
                    </div>
                    <div :class="saldoClass" class="border rounded-lg p-4">
                        <p class="text-sm font-medium mb-2">Saldo</p>
                        <p class="text-2xl font-bold">
                            R$ {{ formatarValor(saldo) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Cargos do Evento -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">👥</span>
                        Cargos do Evento
                    </h2>

                    <div v-if="evento.cargos && evento.cargos.length > 0" class="space-y-3">
                        <div v-for="cargo in evento.cargos" :key="cargo.id"
                             class="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded">
                            <p class="font-semibold text-gray-800">{{ cargo.cargo?.nome || 'Cargo não definido' }}</p>
                            <p class="text-gray-600">{{ cargo.pessoa?.nome || 'Pessoa não definida' }}</p>
                        </div>
                    </div>

                    <div v-else class="text-center py-8 text-gray-500">
                        <p>Nenhum cargo atribuído para este evento.</p>
                    </div>
                </div>

                <!-- Doações -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span class="mr-2">💰</span>
                        Doações
                    </h2>

                    <div v-if="evento.doacoes && evento.doacoes.length > 0" class="space-y-3">
                        <div v-for="doacao in evento.doacoes" :key="doacao.id"
                             class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-semibold text-gray-800">{{ doacao.pessoa?.nome || 'Anônimo' }}</p>
                                    <p class="text-sm text-gray-500">{{ doacao.tipo_doacao }}</p>
                                </div>
                                <p class="text-lg font-bold text-green-600">
                                    R$ {{ formatarValor(doacao.valor || 0) }}
                                </p>
                            </div>
                            <p v-if="doacao.descricao" class="text-sm text-gray-600 mt-2">
                                {{ doacao.descricao }}
                            </p>
                        </div>
                    </div>

                    <div v-else class="text-center py-8 text-gray-500">
                        <p>Nenhuma doação registrada para este evento.</p>
                    </div>
                </div>
            </div>

            <!-- Cardápio -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span class="mr-2">🍽️</span>
                    Cardápio do Evento
                </h2>

                <div v-if="evento.cardapios && evento.cardapios.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div v-for="item in evento.cardapios" :key="item.id"
                         class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 class="font-semibold text-gray-800 mb-2">{{ item.cardapio?.nome || 'Item não definido' }}</h3>
                        <div v-if="item.cardapio?.descricao" class="text-sm text-gray-600 mb-2">
                            {{ item.cardapio.descricao }}
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-sm text-gray-500">Quantidade:</span>
                            <span class="font-medium text-gray-800">{{ item.quantidade || 0 }}</span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8 text-gray-500">
                    <p>Nenhum item de cardápio definido para este evento.</p>
                </div>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    evento: {
        type: Object,
        required: true
    }
});

const formatarData = (data) => {
    if (!data) return '';
    const date = new Date(data + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
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

const saldo = computed(() => {
    return (props.evento.valor_arrecadado || 0) - (props.evento.valor_gasto || 0);
});

const saldoClass = computed(() => {
    if (saldo.value > 0) return 'bg-blue-50 border-blue-200 text-blue-900';
    if (saldo.value < 0) return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    return 'bg-gray-50 border-gray-200 text-gray-900';
});
</script>
