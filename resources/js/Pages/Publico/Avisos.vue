<template>
    <LayoutPublico>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="mr-3">📢</span>
                Mural de Avisos
            </h1>

            <p class="text-gray-600 mb-6">
                Acompanhe os comunicados e informações importantes da Paróquia São Benedito.
            </p>

            <!-- Lista de Avisos -->
            <div v-if="avisos && avisos.length > 0" class="space-y-4">
                <div v-for="aviso in avisos" :key="aviso.id"
                     class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between gap-4">
                        <!-- Ícone -->
                        <div class="flex-shrink-0">
                            <div class="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl">
                                <i class="fa fa-bullhorn"></i>
                            </div>
                        </div>

                        <!-- Conteúdo -->
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-gray-900 mb-2 text-xl">
                                {{ aviso.nome }}
                            </h3>
                            <p class="text-gray-700 leading-relaxed mb-3">
                                {{ aviso.descricao }}
                            </p>

                            <!-- Data de publicação e expiração -->
                            <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div class="flex items-center">
                                    <i class="fa fa-calendar mr-2"></i>
                                    Publicado em {{ formatarData(aviso.created_at) }}
                                </div>
                                <div v-if="aviso.data_expiração" class="flex items-center">
                                    <i class="fa fa-clock mr-2"></i>
                                    Válido até {{ formatarData(aviso.data_expiração) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mensagem quando não há avisos -->
            <div v-else class="text-center py-12">
                <div class="text-gray-400 text-6xl mb-4">
                    <i class="fa fa-inbox"></i>
                </div>
                <p class="text-gray-500 text-lg">
                    Não há avisos ativos no momento.
                </p>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Props recebidas do controller
defineProps({
    avisos: {
        type: Array,
        default: () => []
    }
});

// Função para formatar datas
const formatarData = (data) => {
    if (!data) return '';
    try {
        return format(parseISO(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
        return data;
    }
};
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
