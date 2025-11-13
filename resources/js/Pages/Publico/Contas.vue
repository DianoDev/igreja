<template>
    <LayoutPublico>
        <div class="p-8">

            <!-- Próximos Eventos -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <span class="fa fa-dollar mr-4"></span>
                        Prestação de Contas
                    </h2>
                </div>

                <div v-if="eventos && eventos.length > 0" class="space-y-4">
                    <div v-for="evento in eventos" :key="evento.id"
                         class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                    {{ evento.nome }}
                                </h3>
                                <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span class="flex items-center">
                                    📅 {{ formatarData(evento.data) }}
                                </span>
                                    <span class="flex items-center">
                                    🕐 {{ evento.hora }}
                                </span>
                                </div>
                            </div>
                            <div class="text-right">
                                <a
                                    :href="`/publico/evento/${evento.id}/pdf`"
                                    target="_blank"
                                    class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
                                >
                                    <i class="fa fa-file-pdf"></i>
                                    <span>Baixar PDF</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8 text-gray-500">
                    <p>Nenhum evento próximo agendado no momento.</p>
                </div>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import {Link} from '@inertiajs/vue3';

const props = defineProps({
    eventos: {
        type: Array,
        default: () => []
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

</script>

<style scoped>
.btn-primary {
    @apply bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors;
}

.btn-secondary {
    @apply bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors;
}

.card-link {
    @apply block;
}
</style>
