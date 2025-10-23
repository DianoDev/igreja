<template>
    <LayoutPublico>
        <div class="space-y-6">
            <!-- Botão Voltar -->
            <Link href="/publico/atas" class="inline-flex items-center text-blue-600 hover:text-blue-700">
                ← Voltar para Atas
            </Link>

            <!-- Conteúdo da Ata -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="mb-6">
                    <h1 class="text-3xl font-bold text-gray-800 mb-3">{{ ata.nome }}</h1>
                    <div class="text-sm text-gray-500 mb-4">
                        Publicada em: {{ formatarDataHora(ata.created_at) }}
                    </div>
                    <div v-if="ata.updated_at !== ata.created_at" class="text-sm text-gray-500">
                        Última atualização: {{ formatarDataHora(ata.updated_at) }}
                    </div>
                </div>

                <div v-if="ata.descricao" class="prose prose-lg max-w-none">
                    <div class="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Descrição</h3>
                        <p class="text-gray-700 whitespace-pre-wrap">{{ ata.descricao }}</p>
                    </div>
                </div>

                <!-- Área de Conteúdo Principal -->
                <div class="border-t pt-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            📄 O conteúdo completo desta ata está disponível nos arquivos oficiais da paróquia.
                            Para mais informações, entre em contato conosco.
                        </p>
                    </div>

                    <!-- Se houver campos adicionais no futuro, podem ser exibidos aqui -->
                </div>

                <!-- Rodapé da Ata -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600">
                            <strong>Nota:</strong> Esta ata foi publicada para promover a transparência das atividades da paróquia.
                            Todas as informações aqui contidas são oficiais e foram aprovadas em reunião.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    ata: {
        type: Object,
        required: true
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
</script>

<style scoped>
.prose {
    color: #374151;
}
</style>
