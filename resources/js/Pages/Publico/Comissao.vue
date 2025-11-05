<template>
    <LayoutPublico>
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <span class="mr-3">👥</span>
                Comissão de Festeiros
            </h1>

            <p class="text-gray-600 mb-8">
                Conheça os membros da comissão responsável pela organização das festividades da Paróquia São Benedito.
            </p>

            <!-- Informações da Comissão -->
            <div v-if="comissao" class="mb-8">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500">
                    <div class="text-center">
                        <h2 class="text-4xl font-bold text-gray-800 mb-3" style="font-family: Georgia, serif;">
                            {{ comissao.nome }}
                        </h2>
                        <div class="inline-block">
                            <span class="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold">
                                Ano {{ comissao.ano }}
                            </span>
                        </div>
                        <p v-if="comissao.descricao" class="text-gray-700 mt-4 max-w-3xl mx-auto">
                            {{ comissao.descricao }}
                        </p>
                    </div>
                </div>
                <div  class="mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        Pároco
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-green-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div class="flex items-start gap-4">
                                <!-- Avatar -->
                                <div class="flex-shrink-0">
                                    <div class="w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                        <i class="fa fa-user"></i>
                                    </div>
                                </div>

                                <!-- Informações -->
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight">
                                        Pe. Pedro Canísio Schroeder sj
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="comissao.integrantes && comissao.integrantes.filter(i => i.cargo.nome !== 'Festeiro de Promessa').length > 0" class="mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        Integrantes da Comissão
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="integrante in comissao.integrantes.filter(i => i.cargo.nome !== 'Festeiro de Promessa')"
                             :key="integrante.id"
                             class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-amber-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div class="flex items-start gap-4">
                                <!-- Avatar -->
                                <div class="flex-shrink-0">
                                    <div class="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                        <i class="fa fa-user"></i>
                                    </div>
                                </div>

                                <!-- Informações -->
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight">
                                        {{ integrante.pessoa.nome }}
                                    </h4>
                                    <p class="text-gray-900 font-semibold text-sm mb-2">
                                        {{ integrante.cargo.nome }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Grid de Integrantes -->
                <div v-if="comissao.integrantes && comissao.integrantes.filter(i => i.cargo.nome === 'Festeiro de Promessa').length > 0" class="mb-10">
                    <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        Festeiros de Promessa
                    </h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="integrante in comissao.integrantes.filter(i => i.cargo.nome === 'Festeiro de Promessa')"
                             :key="integrante.id"
                             class="bg-gradient-to-br  rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                            <div class="flex items-start gap-4">
                                <!-- Avatar -->
                                <div class="flex-shrink-0">
                                    <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                                        <i class="fa fa-user"></i>
                                    </div>
                                </div>

                                <!-- Informações -->
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight">
                                        {{ integrante.pessoa.nome }}
                                    </h4>
                                    <p class="text-purple-800 font-semibold text-sm mb-2">
                                        {{ integrante.cargo.nome }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Demais Integrantes da Comissão -->


                <!-- Mensagem quando não há integrantes -->
                <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
                    <div class="text-gray-400 text-5xl mb-4">
                        <i class="fa fa-users"></i>
                    </div>
                    <p class="text-gray-600">
                        Nenhum integrante cadastrado para esta comissão.
                    </p>
                </div>
            </div>

            <!-- Mensagem quando não há comissão -->
            <div v-else class="text-center py-16">
                <div class="text-gray-400 text-6xl mb-4">
                    <i class="fa fa-users-slash"></i>
                </div>
                <p class="text-gray-500 text-lg mb-2">
                    Comissão não disponível no momento.
                </p>
                <p class="text-gray-400">
                    As informações da comissão atual serão publicadas em breve.
                </p>
            </div>

            <!-- Informação adicional -->
            <div class="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                    <i class="fa fa-info-circle mr-2 text-blue-600"></i>
                    Sobre a Comissão
                </h4>
                <p class="text-gray-700">
                    A Comissão de Festeiros é responsável pela organização e coordenação de todas as festividades
                    e eventos da Paróquia São Benedito. Cada membro desempenha um papel fundamental para o sucesso
                    das celebrações e atividades comunitárias.
                </p>
            </div>
        </div>
    </LayoutPublico>
</template>

<script setup>
import LayoutPublico from '@/Layouts/LayoutPublico.vue';

// Props recebidas do controller
defineProps({
    comissao: {
        type: Object,
        default: null
    }
});
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
