<template>
    <aside id="sidebar" :class="['sidebar', { 'collapsed': collapsed, 'toggled': toggled }]">
        <div class="sidebar-layout">
            <div class="sidebar-header">
                <div v-show="!collapsed" class="logo-full">
                    <a href="#" class="text-white" @click.prevent="router.visit(`/admin/dashboard`)">
                        IGREJA
                    </a>
                </div>
                <div v-show="collapsed" class="logo-collapsed">
                    <a href="#" @click.prevent="router.visit(`/admin/dashboard`)">

                    </a>
                </div>
            </div>

            <div class="sidebar-content">

                <nav class="mt-5 menu">
                    <ul>
                        <li class="menu-item" :class="{ 'active': isActive('dashboard') }">
                            <a href="#" @click.prevent="router.visit(`/admin/dashboard`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Dashboard' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-chart-bar"></i>
                                </span>
                                <span class="menu-title">Dashboard</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-dados-entidade')" class="menu-item"
                            :class="{ 'active': isActive('dados-entidade') }">
                            <a href="#" @click.prevent="router.visit(`/admin/dados-entidade`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Dados da Entidade' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-building"></i>
                                </span>
                                <span class="menu-title">Dados da Entidade</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-categorias')" class="menu-item"
                            :class="{ 'active': isActive('categorias') }">
                            <a href="#" @click.prevent="router.visit(`/admin/categorias`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Categorias de Serviço' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-folder-open"></i>
                                </span>
                                <span class="menu-title">Categorias de Serviço</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-servicos')" class="menu-item"
                            :class="{ 'active': isActive('servicos') }">
                            <a href="#" @click.prevent="router.visit(`/admin/servicos`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Serviços' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-hands-helping"></i>
                                </span>
                                <span class="menu-title">Serviços</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-formularios')" class="menu-item"
                            :class="{ 'active': isActive('formulario') }">
                            <a href="#" @click.prevent="router.visit(`/admin/formulario`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Formulários' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-envelope "></i>
                                </span>
                                <span class="menu-title">Formulários</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-arquivos')" class="menu-item"
                            :class="{ 'active': isActive('tipo-arquivo') }">
                            <a href="#" @click.prevent="router.visit(`/admin/tipo-arquivo`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Arquivos' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-folder"></i>
                                </span>
                                <span class="menu-title">Arquivos</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-usuarios')" class="menu-item sub-menu"
                            :class="{ 'active': isActive('usuarios') }">
                            <a href="#" @click.prevent="router.visit(`/admin/usuarios`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Usuários' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-users"></i>
                                </span>
                                <span class="menu-title">Usuários</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-solicitacoes')" class="menu-item"
                            :class="{ 'active': isActive('solicitacoes') }">
                            <a href="#" @click.prevent="router.visit(`/admin/solicitacoes`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Solicitações' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-comment"></i>
                                </span>
                                <span class="menu-title">Solicitações</span>
                            </a>
                        </li>

                        <li v-if="hasPermission('csc-super-usuario')" class="menu-item"
                            :class="{ 'active': isActive('entidade') }">
                            <a href="#" @click.prevent="router.visit(`/admin/entidade`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Entidades' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-comment-alt"></i>
                                </span>
                                <span class="menu-title">Entidades</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="sidebar-footer">
                <div class="action-buttons">
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref, nextTick, onMounted, defineEmits, computed } from 'vue';
import { usePage, router } from "@inertiajs/vue3";


const emit = defineEmits(['collapse-changed', 'toggle-changed', 'submenu-clicked']);
const collapsed = ref(false);
const toggled = ref(false);
const activeItem = ref('dashboard');
const openSubmenus = ref([]);
const submenuHeights = ref({});
const page = usePage();
const user = computed(() => page.props.auth.user);
const permissoes = computed(() => page.props.auth.permissoes || []);

const hasPermission = (permission) => {
    if (!permissoes.value || !Array.isArray(permissoes.value)) {
        return false;
    }


    const superUserOnlyPermissions = ['csc-super-usuario'];


    if (superUserOnlyPermissions.includes(permission)) {
        return permissoes.value.includes(permission);
    }


    if (permissoes.value.includes('csc-admin')) {
        return true;
    }


    return permissoes.value.includes(permission);
};

const hasAnyPermission = computed(() => {

    if (permissoes.value?.includes('csc-admin') || permissoes.value?.includes('csc-super-usuario')) {
        return true;
    }

    const requiredPermissions = [
        'csc-dashboard',
        'csc-dados-entidade',
        'csc-categorias',
        'csc-servicos',
        'csc-formularios',
        'csc-arquivos',
        'csc-usuarios',
        'csc-solicitacoes'
    ];

    return requiredPermissions.some(permission => hasPermission(permission));
});

const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
    localStorage.setItem('sidebar-collapsed', collapsed.value.toString());
    emit('collapse-changed', collapsed.value);
};

const toggleSidebar = () => {
    toggled.value = !toggled.value;
    emit('toggle-changed', toggled.value);
};

const isActive = (itemName) => {
    return activeItem.value === itemName;
};

const toggleSubmenu = (submenuName) => {
    if (collapsed.value) {
        emit('submenu-clicked', submenuName);
        return;
    }

    const index = openSubmenus.value.indexOf(submenuName);
    if (index > -1) {
        openSubmenus.value.splice(index, 1);
    } else {
        openSubmenus.value = [];

        openSubmenus.value.push(submenuName);

        if (!submenuHeights.value[submenuName]) {
            nextTick(() => {
                calculateSubmenuHeight(submenuName);
            });
        }
    }
};

const calculateSubmenuHeight = (submenuName) => {
    const submenuEl = document.querySelector(`.sub-menu-list ul`);
    if (submenuEl) {
        submenuHeights.value[submenuName] = `${submenuEl.scrollHeight}px`;
    }
};

const getSubmenuStyle = (submenuName) => {
    if (openSubmenus.value.includes(submenuName)) {
        return {
            height: submenuHeights.value[submenuName] || 'auto',
            visibility: 'visible',
            opacity: '1'
        };
    } else {
        return {
            height: '0',
            visibility: 'hidden',
            opacity: '0'
        };
    }
}

defineExpose({
    toggleCollapse,
    toggleSidebar,
    hasPermission,
    openSubmenu: (submenuName) => {
        if (!openSubmenus.value.includes(submenuName)) {
            openSubmenus.value.push(submenuName);
        }
    },
    closeSubmenu: (submenuName) => {
        const index = openSubmenus.value.indexOf(submenuName);
        if (index > -1) {
            openSubmenus.value.splice(index, 1);
        }
    },
    setActive: (itemName) => {
        activeItem.value = itemName;
    }
});


onMounted(() => {
    const savedCollapse = localStorage.getItem('sidebar-collapsed');
    if (savedCollapse !== null) {
        collapsed.value = savedCollapse === 'true';
    }

    const path = window.location.pathname;

    if (path.includes('dashboard')) {
        activeItem.value = 'dashboard';
    } else if (path.includes('minha-conta')) {
        activeItem.value = 'minha-conta';
        openSubmenus.value.push('minha-conta');
    } else if (path.includes('dados-entidade')) {
        activeItem.value = 'dados-entidade';
    } else if (path.includes('tipo-arquivo')) {
        activeItem.value = 'tipo-arquivo';
    } else if (path.includes('categorias')) {
        activeItem.value = 'categorias';
    } else if (path.includes('servicos')) {
        activeItem.value = 'servicos';
    } else if (path.includes('formulario')) {
        activeItem.value = 'formulario';
    } else if (path.includes('usuarios')) {
        activeItem.value = 'usuarios';
        openSubmenus.value.push('usuarios');
    } else if (path.includes('solicitacoes')) {
        activeItem.value = 'solicitacoes';
    } else if (path.includes('entidade')) {
        activeItem.value = 'entidade';
    } else if (path.includes('usuarios/listar')) {
        activeItem.value = 'listar-usuarios';
        openSubmenus.value.push('usuarios');
    } else if (path.includes('usuarios/novo')) {
        activeItem.value = 'criar-usuario';
        openSubmenus.value.push('usuarios');
    } else if (path.includes('usuarios/permissoes')) {
        activeItem.value = 'permissoes';
        openSubmenus.value.push('usuarios');
    }

    nextTick(() => {
        calculateSubmenuHeight('usuarios');
    });
});
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 40;
    width: 250px;
    color: #4B5563;
}

.sidebar.collapsed {
    width: 70px;
}

.sidebar.toggled {
    transform: translateX(0);
}

.sidebar-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.sidebar-header {
    padding: 1.25rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background: linear-gradient(135deg, #1D79AF 0%, #2595D8 100%);
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.sidebar.collapsed .sidebar-header {
    padding: 1.25rem 0;
}

.logo-full {
    width: 70%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
}

.logo-collapsed {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: #fff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
}

.logo-collapsed img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Transições suaves durante o collapse */
.sidebar.collapsed .logo-full {
    opacity: 0;
    transform: scale(0.8);
}

.sidebar.collapsed .logo-collapsed {
    opacity: 1;
    transform: scale(1);
}

.sidebar:not(.collapsed) .logo-collapsed {
    opacity: 0;
    transform: scale(0.8);
}

.sidebar:not(.collapsed) .logo-full {
    opacity: 1;
    transform: scale(1);
}


.sidebar-content {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
}

.sidebar-content::-webkit-scrollbar {
    width: 4px;
}

.sidebar-content::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
}

.sidebar-content::-webkit-scrollbar-track {
    background-color: rgba(243, 244, 246, 0.8);
}

.sidebar-footer {
    padding: 1rem;
    border-top: 1px solid #F3F4F6;
    background-color: #F9FAFB;
}

.action-buttons {
    display: flex;
    justify-content: space-around;
}

.sidebar-btn {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4B5563;
    background-color: #ffffff;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid #E5E7EB;
}

.sidebar-btn:hover {
    background-color: #1D79AF;
    transform: translateY(-2px);
    color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    border-color: #1D79AF;
}

.logout-btn:hover {
    background-color: #f97316;
    border-color: #f97316;
}

/* Estilos do menu */
.menu {
    padding: 0 0.75rem;
}

.menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    width: 100%;
    position: relative;
    margin-bottom: 6px;
}

.menu-link {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    color: #4B5563;
    transition: all 0.2s ease;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 400;
    position: relative;
}

.menu-link:hover {
    background-color: #F3F4F6;
    color: #1D79AF;
}

.menu-icon {
    margin-right: 0.9rem;
    width: 1.25rem;
    text-align: center;
    font-size: 1rem;
    color: #6B7280;
    transition: all 0.3s;
}

.menu-link:hover .menu-icon {
    color: #1D79AF;
}

.menu-title {
    font-size: 0.9rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.menu-item.active>.menu-link {
    background-color: #E7F3F5;
    color: #1D79AF;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.menu-item.active>.menu-link .menu-icon,
.menu-item.active>.menu-link .menu-arrow {
    color: #1D79AF;
}

/* Tooltip styles - only show when collapsed */
.sidebar.collapsed .menu-link[data-tooltip]:not([data-tooltip=""]) {
    position: relative;
    overflow: visible;
}

.sidebar.collapsed .menu-link[data-tooltip]:not([data-tooltip=""]):hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    z-index: 99999;
    opacity: 0;
    animation: tooltipFadeIn 0.2s ease-out forwards;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: none;
}

.sidebar.collapsed .menu-link[data-tooltip]:not([data-tooltip=""]):hover::before {
    content: '';
    position: absolute;
    left: calc(100% + 9px);
    top: 50%;
    transform: translateY(-50%);
    border-right: 6px solid rgba(0, 0, 0, 0.9);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    z-index: 99998;
    opacity: 0;
    animation: tooltipFadeIn 0.2s ease-out forwards;
    pointer-events: none;
}

/* Garantir que containers pais não escondam o tooltip */
.sidebar.collapsed {
    overflow: visible;
}

.sidebar.collapsed .sidebar-content {
    overflow: visible;
}

.sidebar.collapsed .menu {
    overflow: visible;
}

.sidebar.collapsed .menu ul {
    overflow: visible;
}

.sidebar.collapsed .menu-item {
    overflow: visible;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(-50%) translateX(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
    }
}

/* Estilos do submenu */
.sub-menu-list {
    transition: all 0.3s ease;
    overflow: hidden;
    background-color: #F9FAFB;
    margin: 0 0.5rem;
    border-radius: 8px;
}

.sub-menu-list ul {
    padding: 0.5rem 0;
}

.sub-menu-list .menu-link {
    padding: 0.7rem 1rem 0.7rem 2.8rem;
    font-size: 0.85rem;
    color: #4B5563;
    border-radius: 8px;
    margin: 0 0.5rem;
}

.sub-menu-list .menu-link:hover {
    background-color: #F3F4F6;
    color: #1D79AF;
}

.sub-menu-list .menu-item.active>.menu-link {
    background-color: #ECFDF5;
    color: #1D79AF;
    font-weight: 600;
}

/* Estilos para menu responsivo */
@media (max-width: 992px) {
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.toggled {
        transform: translateX(0);
    }
}

/* Estilos para o menu quando estiver recolhido */
.sidebar.collapsed .menu-title,
.sidebar.collapsed .menu-arrow {
    display: none;
}

.sidebar.collapsed .sub-menu-list {
    display: none;
}

.sidebar.collapsed .menu-icon {
    margin-right: 0;
    width: 100%;
    font-size: 1.1rem;
}

.sidebar.collapsed .menu-link {
    justify-content: center;
    padding: 0.85rem 0;
}

.sidebar.collapsed .sidebar-btn {
    width: 100%;
}

.sidebar.collapsed .action-buttons {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
}
</style>
