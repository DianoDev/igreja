<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Header -->
        <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div class="container mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <!-- Logo e Nome -->
                    <div class="flex items-center space-x-4">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <span class="text-3xl">⛪</span>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold">Paróquia São Benedito</h1>
                            <p class="text-blue-100 text-sm">Transparência e Fé</p>
                        </div>
                    </div>

                    <!-- Menu Desktop -->
                    <nav class="hidden md:flex space-x-6">
                        <Link href="/publico" class="hover:text-blue-200 transition-colors">
                            Início
                        </Link>
                        <Link href="/publico/eventos" class="hover:text-blue-200 transition-colors">
                            Eventos
                        </Link>
                        <Link href="/publico/atas" class="hover:text-blue-200 transition-colors">
                            Atas
                        </Link>
                        <Link href="/publico/regimes-internos" class="hover:text-blue-200 transition-colors">
                            Regimes Internos
                        </Link>
                        <Link href="/publico/estatutos" class="hover:text-blue-200 transition-colors">
                            Estatutos
                        </Link>
                        <Link href="/publico/sobre" class="hover:text-blue-200 transition-colors">
                            Sobre
                        </Link>
                    </nav>

                    <!-- Botão Menu Mobile -->
                    <button @click="menuMobileAberto = !menuMobileAberto" class="md:hidden">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <!-- Menu Mobile -->
                <nav v-if="menuMobileAberto" class="md:hidden mt-4 pb-4 space-y-2">
                    <Link href="/publico" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Início
                    </Link>
                    <Link href="/publico/eventos" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Eventos
                    </Link>
                    <Link href="/publico/atas" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Atas
                    </Link>
                    <Link href="/publico/regimes-internos" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Regimes Internos
                    </Link>
                    <Link href="/publico/estatutos" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Estatutos
                    </Link>
                    <Link href="/publico/sobre" class="block py-2 hover:bg-blue-700 rounded px-2 transition-colors">
                        Sobre
                    </Link>
                </nav>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 container mx-auto px-4 py-8">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Paróquia São Benedito</h3>
                        <p class="text-gray-300 text-sm">
                            Arquidiocese de Cuiabá<br>
                            Paróquia de Nossa Senhora do Rosário e São Benedito
                        </p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Contato</h3>
                        <p class="text-gray-300 text-sm">
                            📍 Endereço da Paróquia<br>
                            📞 (00) 0000-0000<br>
                            ✉️ contato@paroquiasaobento.org
                        </p>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Transparência</h3>
                        <p class="text-gray-300 text-sm">
                            Este portal tem como objetivo promover a transparência
                            das atividades e finanças da nossa paróquia.
                        </p>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    © {{ new Date().getFullYear() }} Paróquia São Benedito - Todos os direitos reservados
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

const menuMobileAberto = ref(false);
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui se necessário */
</style>
