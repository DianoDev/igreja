<template>
    <LayoutPublico>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="mr-3">📝</span>
                Atas das Reuniões
            </h1>

            <p class="text-gray-600 mb-6">
                Acompanhe as atas de todas as reuniões e assembleias da paróquia.
                Promovemos a transparência em todas as nossas decisões.
            </p>

            <div v-if="atas && atas.length > 0" class="space-y-4">
                <div v-for="ata in atas" :key="ata.id"
                     class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                     @click="verDetalhes(ata.id)">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">
                                {{ ata.nome }}
                            </h2>
                            <p v-if="ata.descricao" class="text-gray-600 mb-3">
                                {{ ata.descricao }}
                            </p>
                            <div class="text-sm text-gray-500">
                                Publicada em: {{ formatarDataHora(ata.created_at) }}
                            </div>
                        </div>
                        <button class="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                            Ver ata →
                        </button>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-12 text-gray-500">
                <p class="text-lg">Nenhuma ata disponível no momento.</p>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    atas: {
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
    router.visit(`/publico/atas/${id}`);
};
</script>
