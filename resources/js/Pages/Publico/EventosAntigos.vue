<template>
    <LayoutPublico>
        <div class="p-8">
            <!-- Hero Section -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-4">
                    Bem-vindo à Paróquia São Benedito
                </h1>
                <p class="text-lg text-gray-600 mb-6">
                    Acompanhe nossos eventos, atas das reuniões e documentos oficiais.
                    Promovemos a transparência em todas as atividades da nossa comunidade.
                </p>
            </div>

            <!-- Próximos Eventos -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                        <span class="fa fa-calendar-minus mr-4"></span>
                        Eventos Antigos
                    </h2>
                </div>

                <div v-if="eventos && eventos.length > 0" class="space-y-4">
                    <div v-for="evento in eventos" :key="evento.id"
                         class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                         @click="$inertia.visit(`/publico/eventos/${evento.id}`)">
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
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-8 text-gray-500">
                    <p>Nenhum evento próximo agendado no momento.</p>
                </div>
            </div>

            <!-- Cards de Acesso Rápido -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Link href="/publico/atas" class="card-link">
                    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div class="text-4xl mb-4">📝</div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Atas</h3>
                        <p class="text-gray-600">Acesse as atas das reuniões e assembleias</p>
                    </div>
                </Link>

                <Link href="/publico/regimes-internos" class="card-link">
                    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div class="text-4xl mb-4">📋</div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Regimento Interno</h3>
                        <p class="text-gray-600">Consulte nossos regimentos e normas</p>
                    </div>
                </Link>

                <Link href="/publico/estatutos" class="card-link">
                    <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div class="text-4xl mb-4">⚖️</div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">Estatuto</h3>
                        <p class="text-gray-600">Veja nossos estatutos oficiais</p>
                    </div>
                </Link>
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

const diasAteEvento = (data) => {
    if (!data) return '';
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataEvento = new Date(data + 'T00:00:00');
    const diffTime = dataEvento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays < 0) return 'Passou';
    return `${diffDays} dias`;
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
