<template>
    <div class="min-h-screen flex bg-gray-50">
        <!-- Sidebar Fixo (sempre visível no desktop) -->
        <aside
            :class="menuLateralAberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
            class="fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl z-50 transition-transform duration-300 overflow-y-auto flex flex-col"
        >
            <!-- Header do Sidebar -->
            <div class=" mt-3 ">
                <div class="flex items-center justify-between mb-4">
                    <!-- Botão fechar (apenas mobile) -->
                    <button
                        @click="menuLateralAberto = false"
                        class="lg:hidden text-amber-300 hover:text-amber-400 transition-colors"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Navegação do Sidebar -->
            <nav class="flex-1 p-4 space-y-2">
                <Link
                    href="/"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">🏠</span>
                    <span class="font-medium">Início</span>
                </Link>

                <Link
                    href="/publico/eventos"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/eventos') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">📅</span>
                    <span class="font-medium">Próximos Eventos</span>
                </Link>
                <Link
                    href="/publico/antigos"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/antigos') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="fa fa-calendar-minus"></span>
                    <span class="font-medium">Eventos Passados</span>
                </Link>
                <Link
                    href="/publico/atas"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/atas') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">📝</span>
                    <span class="font-medium">Atas</span>
                </Link>

                <Link
                    href="/publico/regimes-internos"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/regimes-internos') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">📋</span>
                    <span class="font-medium">Regimento Interno</span>
                </Link>

                <Link
                    href="/publico/estatutos"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/estatutos') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">⚖️</span>
                    <span class="font-medium">Estatuto</span>
                </Link>

                <Link
                    href="/publico/sobre"
                    @click="menuLateralAberto = false"
                    :class="isActive('/publico/sobre') ? 'bg-amber-500 text-white shadow-lg' : 'text-blue-100 hover:bg-blue-700'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                >
                    <span class="text-xl">ℹ️</span>
                    <span class="font-medium">Sobre</span>
                </Link>
            </nav>
        </aside>

        <!-- Overlay escuro (apenas mobile) -->
        <div
            v-if="menuLateralAberto"
            @click="menuLateralAberto = false"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
        ></div>

        <!-- Conteúdo Principal -->
        <div class="flex-1 flex flex-col min-h-screen">
            <!-- Header -->
            <header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl relative overflow-hidden sticky top-0 z-30">
                <div class="container mx-auto px-4 py-4 relative z-10">
                    <div class="flex items-center justify-between">
                        <!-- Botão Menu Mobile -->
                        <button
                            @click="menuLateralAberto = true"
                            class="lg:hidden bg-blue-700 hover:bg-amber-500 p-3 rounded-lg transition-all duration-200"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>

                        <!-- Logo e Nome da Paróquia -->
                        <div class="flex items-center space-x-4 flex-1 lg:flex-initial">
                            <div class="hidden lg:flex flex-col items-baseline">
                                <div class="logo-container mx-auto">
                                    <div class="logo">
                                        <i class="fas fa-cross"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 class="text-xl lg:text-2xl font-bold text-amber-300" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                    Paróquia São Benedito
                                </h1>
                                <p class="text-blue-100 text-xs italic hidden sm:block">
                                    Arquidiocese de Cuiabá - Nossa Senhora do Rosário e São Benedito
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Linha decorativa dourada -->
            <div class="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>

            <!-- Main Content -->
            <main class="flex-1 bg-gray-50">
                <slot />
            </main>

            <!-- Footer -->
            <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
                <!-- Linha decorativa -->
                <div class="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

                <div class="container mx-auto px-4 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Sobre -->
                        <div>
                            <div class="flex items-baseline mb-4">
                                <div class="logo-container mr-4">
                                    <div class="logo">
                                        <i class="fas fa-cross"></i>
                                    </div>
                                </div>
                                <h3 class="text-xl font-bold text-amber-300">Paróquia São Benedito</h3>
                            </div>
                            <p class="text-gray-300 text-sm leading-relaxed">
                                Arquidiocese de Cuiabá<br>
                                Paróquia de Nossa Senhora do Rosário e São Benedito<br>
                                Promovendo fé, comunidade e transparência.
                            </p>
                        </div>

                        <!-- Contato -->
                        <div>
                            <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center">
                                <span class="mr-2">📞</span> Contato
                            </h3>
                            <div class="space-y-2 text-gray-300 text-sm">
                                <p class="flex items-start">
                                    <span class="mr-2 text-amber-400">📍</span>
                                    <span>Cuiabá, Mato Grosso</span>
                                </p>
                                <p class="flex items-center">
                                    <span class="mr-2 text-amber-400">📞</span>
                                    <span>(00) 0000-0000</span>
                                </p>
                                <p class="flex items-center">
                                    <span class="mr-2 text-amber-400">✉️</span>
                                    <span>contato@paroquiasaobento.org</span>
                                </p>
                            </div>
                        </div>

                        <!-- Horários -->
                        <div>
                            <h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center">
                                <span class="mr-2">⏰</span> Horários de Missas
                            </h3>
                            <div class="text-gray-300 text-sm space-y-2">
                                <p><strong class="text-amber-300">Segunda a Sexta:</strong> 19h00</p>
                                <p><strong class="text-amber-300">Sábado:</strong> 18h00</p>
                                <p><strong class="text-amber-300">Domingo:</strong> 8h00, 10h00 e 19h00</p>
                            </div>
                        </div>
                    </div>

                    <!-- Copyright -->
                    <div class="border-t border-gray-800 mt-8 pt-6">
                        <div class="text-center text-gray-400 text-sm">
                            <p class="mb-2">
                                © {{ new Date().getFullYear() }} Paróquia São Benedito - Todos os direitos reservados
                            </p>
                            <p class="text-xs text-gray-500 italic">
                                "Fé, Esperança e Caridade" - Portal de Transparência Paroquial
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const menuLateralAberto = ref(false);
const page = usePage();

const isActive = (path) => {
    const currentPath = page.url;
    if (path === '/publico' && currentPath === '/publico') return true;
    if (path !== '/publico' && currentPath.startsWith(path)) return true;
    return false;
};
</script>

<style scoped>
/* Fonte mais elegante para textos de igreja */
h1, h2, h3 {
    font-family: 'Georgia', serif;
}

.logo-container {
    position: relative;
    z-index: 1;
}

.logo {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.3),
        0 0 0 6px rgba(251, 191, 36, 0.3);
    animation: pulse 2s ease-in-out infinite;
}

.logo i {
    font-size: 30px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 6px rgba(251, 191, 36, 0.3);
    }
    50% {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 8px rgba(251, 191, 36, 0.5);
    }
}
</style>
