<template>
    <LayoutPublico>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="mr-3">📋</span>
                Regimes Internos
            </h1>

            <p class="text-gray-600 mb-6">
                Consulte os regimentos internos e normas que regem as atividades da paróquia e dos festeiros.
            </p>

            <div v-if="regimesInternos && regimesInternos.length > 0" class="space-y-4">
                <div v-for="regime in regimesInternos" :key="regime.id"
                     class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                     @click="verDetalhes(regime.id)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">
                                {{ regime.nome }}
                            </h2>
                            <p v-if="regime.descricao" class="text-gray-600 mb-3">
                                {{ regime.descricao }}
                            </p>
                            <div class="text-sm text-gray-500">
                                Publicado em: {{ formatarDataHora(regime.created_at) }}
                            </div>
                        </div>
                        <button class="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                            Ver documento →
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-12 text-gray-500">
                <p class="text-lg">Nenhum regime interno disponível no momento.</p>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    regimesInternos: {
        type: Array,
        default: () => []
    }
});

const formatarDataHora = (dataHora) => {
    if (!dataHora) return '';
    const date = new Date(dataHora);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const verDetalhes = (id) => {
    router.visit(`/publico/regimes-internos/${id}`);
};
</script>
