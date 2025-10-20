<template>
    <div class="app-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <SidebarMenu ref="sidebarRef" @collapse-changed="onSidebarCollapse" @toggle-changed="onSidebarToggle"
            @submenu-clicked="handleSubmenuClick" />
        <div class="main-content">

            <header class="app-header">
                <div class="header-container">
                    <div class="flex">

                        <button @click="toggleCollapse" class="collapse-btn">
                            <i class="fa fa-chevron-left" v-if="!sidebarCollapsed"></i>
                            <i class="fa fa-chevron-right" v-else></i>
                        </button>

                        <h1 class="page-title">{{ pageTitle }}</h1>
                    </div>
                </div>
            </header>

            <!-- Content wrapper ajustado para footer colado -->
            <main class="content-wrapper">
                <div class="main-slot-container">
                    <confirmation-popup></confirmation-popup>
                    <popup></popup>
                    <slot></slot>
                </div>
            </main>
        </div>

        <div @click="closeSidebar" :class="['overlay', { 'active': sidebarVisible }]">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import SidebarMenu from './SidebarMenu.vue';
import Popup from "@/Components/Popup.vue";
import ConfirmationPopup from "@/Components/ConfirmationPopup.vue";
import { usePage } from '@inertiajs/vue3';
import axios from 'axios'
import { router } from '@inertiajs/vue3'
const page = usePage();

const inertiaPage = usePage();
const sidebarCollapsed = ref(false);
const sidebarVisible = ref(false);
const sidebarRef = ref(null);

const props = defineProps({
    pageTitle: {
        type: String,
        default: 'Início'
    }
});

const urlTitles = {
    '/dashboard': 'Dashboard',
    '/categorias': 'Categorias de Serviços',
    '/servicos': 'Catálogo de Serviços',
    '/usuarios': 'Gestão de Usuários',
    '/formulario': 'Formulários',
    '/tipo-arquivo': 'Arquivos',
    '/solicitacoes': 'Solicitações',
    '/entidades': 'Entidades',
    '/minha-conta': 'Minha Conta',
    '/dados-entidade': 'Dados da Entidade',
};

function toTitleCase(str) {
    return str
        ?.toLowerCase()
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const pageTitle = computed(() => {

    if (props.pageTitle && props.pageTitle !== 'Início') {
        return props.pageTitle;
    }


    const currentPath = window.location.pathname;


    if (urlTitles[currentPath]) {
        return urlTitles[currentPath];
    }


    for (const [urlPath, title] of Object.entries(urlTitles)) {
        if (currentPath.includes(urlPath)) {
            return title;
        }
    }


    if (page && page.value && page.value.component) {
        const componentName = page.value.component;


        const componentTitles = {
            'Dashboard': 'Painel Inicial',
            'Categorias': 'Categorias de Serviços',
            'Servicos': 'Catálogo de Serviços',
            'Usuarios': 'Gestão de Usuários',
            'Formulario': 'Formulários',
            'TipoArquivo': 'Arquivos',
            'Solicitacoes': 'Solicitações',
            'Entidades': 'Entidades',
            'MinhaConta': 'Minha Conta',
            'DadosEntidade': 'Dados da Entidade',
        };

        if (componentTitles[componentName]) {
            return componentTitles[componentName];
        }
    }


    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }


    return 'Painel Inicial';
});

const toggleCollapse = () => {
    if (sidebarRef.value) {
        sidebarRef.value.toggleCollapse();
    }
};

const toggleSidebar = () => {
    if (sidebarRef.value) {
        sidebarRef.value.toggleSidebar();
    }
};

const closeSidebar = () => {
    if (sidebarVisible.value && sidebarRef.value) {
        sidebarRef.value.toggleSidebar();
    }
};

const onSidebarCollapse = (collapsed) => {
    sidebarCollapsed.value = collapsed;
    localStorage.setItem('sidebar-collapsed', collapsed);
};

const onSidebarToggle = (toggled) => {
    sidebarVisible.value = toggled;
};

const handleSubmenuClick = (submenuName) => {
};

axios.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status

        if (status === 401 || status === 419) {
            router.visit('/admin/login')
        }

        return Promise.reject(error)
    }
)

const handleAvatarError = (event) => {
    event.target.src = '/imagens/avatar-placeholder.svg';
};

onMounted(() => {
    const savedCollapse = localStorage.getItem('sidebar-collapsed');
    if (savedCollapse !== null) {
        sidebarCollapsed.value = savedCollapse === 'true';
        if (sidebarRef.value && sidebarRef.value.setCollapsed) {
            sidebarRef.value.setCollapsed(sidebarCollapsed.value);
        }
    }
});

</script>

<style scoped>
.app-layout {
    display: flex;
    height: calc(100vh);
    background-color: #F9FAFB;
    overflow: hidden;
    font-family: 'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 250px;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: calc(100vh);
}

.app-layout.sidebar-collapsed .main-content {
    margin-left: 70px;
}

.app-header {
    background: linear-gradient(135deg, #2489c4 0%, #2595D8 100%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 0 1.5rem;
    min-height: 70px;
    display: flex;
    align-items: center;
    top: 0;
    z-index: 20;
    flex-shrink: 0;
    /* Impede que o header encolha */
}

.header-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.mobile-toggle-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #ffffff;
    margin-right: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.85;
}

.mobile-toggle-btn:hover {
    transform: rotate(0deg) scale(1.05);
    opacity: 1;
}

.collapse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 0.8rem;
    cursor: pointer;
    color: #ffffff;
    margin-right: 1.25rem;
    transition: all 0.2s;
}

.collapse-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
}

.page-title {
    font-size: 1.4rem;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 0.25px;
}


.user-area:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.user-name {
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 0.85rem;
    color: #ffffff;
}

.user-avatar {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #155D34;
    background-color: #ffffff;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-area:hover .user-avatar {
    transform: scale(1.05);
}

.logoprefeitura-icon {
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 5px;
    position: relative;
    -o-object-fit: cover;
    object-fit: cover;
}

.div-logo-orgao {
    display: flex;
    border-radius: 10px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: .425rem;
    box-sizing: border-box;
}

/* AJUSTES PARA FOOTER COLADO */
.content-wrapper {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.main-slot-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 30;
    display: none;
    backdrop-filter: blur(2px);
}

.overlay.active {
    display: block;
}


.user-section {
    position: relative;
}

.dropdown {
    position: relative;
}

.dropdown-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
}

.user-info {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.12);
    padding: 0.4rem 0.8rem;
    border-radius: 30px;
    transition: all 0.2s ease;
}

.user-info:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.user-name {
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 0.75rem;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: #fff;
}

.dropdown-menu-layout-admin {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 220px;
}

.dropdown-toggle:focus+.dropdown-menu-layout-admin,
.dropdown.open .dropdown-menu-layout-admin {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-header {
    padding: 1rem;
    border-bottom: 1px solid #F3F4F6;
    background: #F9FAFB;
}

.full-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-items {
    padding: 0.5rem 0;
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: #4B5563;
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.dropdown-item:hover {
    background: #F3F4F6;
}

.dropdown-divider {
    height: 1px;
    background: #E5E7EB;
    margin: 0.5rem 0;
}

@media (max-width: 992px) {
    .main-content {
        margin-left: 0;
    }

    .app-layout.sidebar-collapsed .main-content {
        margin-left: 0;
    }

    .mobile-toggle-btn {
        display: block;
    }

    .collapse-btn {
        display: none;
    }

    .page-title {
        font-size: 1.25rem;
    }

    .user-area {
        padding: 0.35rem 0.75rem;
    }

    .user-name {
        font-size: 0.85rem;
        margin-right: 0.7rem;
    }

    .user-avatar {
        width: 34px;
        height: 34px;
    }
}

@media (max-width: 640px) {
    .header-container {
        justify-content: space-between;
    }

    .user-name {
        display: none;
    }

    .user-area {
        padding: 0.3rem;
        margin-left: 0;
    }
}
</style>
