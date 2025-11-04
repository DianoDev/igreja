<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <!-- Header com estilo de igreja -->
        <header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl relative overflow-hidden">
            <!-- Padrão decorativo -->


            <div class="container mx-auto px-4 py-6 relative z-10">
                <div class="flex items-center justify-between">
                    <!-- Logo e Nome da Paróquia -->
                    <div class="flex items-center space-x-4">
                        <div class="flex flex-col items-baseline">
                            <div class="logo-container mx-auto">
                                <div class="logo">
                                    <i class="fas fa-cross"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-3xl font-bold text-amber-300" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                Paróquia São Benedito
                            </h1>
                            <p class="text-blue-100 text-sm italic">
                                Arquidiocese de Cuiabá - Nossa Senhora do Rosário e São Benedito
                            </p>
                        </div>
                    </div>

                    <!-- Menu Desktop -->
                    <nav class="hidden lg:flex space-x-1">
                        <Link href="/"
                              :class="isActive('/publico') ? 'bg-amber-500 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            🏠 Início
                        </Link>
                        <Link href="/publico/eventos"
                              :class="isActive('/publico/eventos') ? 'bg-amber-300 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            📅 Eventos
                        </Link>
                        <Link href="/publico/atas"
                              :class="isActive('/publico/atas') ? 'bg-amber-500 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            📝 Atas
                        </Link>
                        <Link href="/publico/regimes-internos"
                              :class="isActive('/publico/regimes-internos') ? 'bg-amber-500 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            📋 Regimento Interno
                        </Link>
                        <Link href="/publico/estatutos"
                              :class="isActive('/publico/estatutos') ? 'bg-amber-500 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            ⚖️ Estatuto
                        </Link>
                        <Link href="/publico/sobre"
                              :class="isActive('/publico/sobre') ? 'bg-amber-500 text-white' : 'text-blue-100 hover:bg-blue-700'"
                              class="px-4 py-2 rounded transition-all duration-200">
                            ℹ️ Sobre
                        </Link>
                    </nav>

                    <!-- Botão Menu Mobile -->
                    <button @click="menuMobileAberto = !menuMobileAberto" class="lg:hidden bg-blue-700 hover:bg-blue-600 p-3 rounded-lg">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <!-- Menu Mobile -->
                <nav v-if="menuMobileAberto" class="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
                    <Link href="/" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        🏠 Início
                    </Link>
                    <Link href="/publico/eventos" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        📅 Eventos
                    </Link>
                    <Link href="/publico/atas" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        📝 Atas
                    </Link>
                    <Link href="/publico/regimes-internos" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        📋 Regimento Interno
                    </Link>
                    <Link href="/publico/estatutos" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        ⚖️ Estatuto
                    </Link>
                    <Link href="/publico/sobre" class="block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all">
                        ℹ️ Sobre
                    </Link>
                </nav>
            </div>
        </header>

        <!-- Linha decorativa dourada -->
        <div class="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>

        <!-- Main Content -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer estilo igreja -->
        <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-12">
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
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const menuMobileAberto = ref(false);
const page = usePage();

const isActive = (path) => {
    const currentPath = page.url;
    if (path === '/publico' && currentPath === '/publico') return true;
    if (path !== '/publico' && currentPath.startsWith(path)) return true;
    return false;
};
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}

/* Fonte mais elegante para textos de igreja */
h1, h2, h3 {
    font-family: 'Georgia', serif;
}

.logo-container {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
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


/* Responsivo */
@media (max-width: 640px) {
    .login-card {
        border-radius: 16px;
    }

    .login-header {
        padding: 30px 20px;
    }

    .logo {
        width: 75px;
        height: 75px;
    }

    .logo i {
        font-size: 38px;
    }

    .login-title {
        font-size: 24px;
    }

    .login-body {
        padding: 30px 20px;
    }

    .login-footer {
        padding: 20px;
    }
}
</style>
