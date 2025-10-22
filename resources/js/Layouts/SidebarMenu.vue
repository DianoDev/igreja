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
                        <li class="menu-item" :class="{ 'active': isActive('pessoas') }">
                            <a href="#" @click.prevent="router.visit(`/admin/pessoas`)" class="menu-link"
                                :data-tooltip="collapsed ? 'Dashboard' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-people-group"></i>
                                </span>
                                <span class="menu-title">Pessoas</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('cargo') }">
                            <a href="#" @click.prevent="router.visit(`/admin/cargo`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Cargo' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-pencil"></i>
                                </span>
                                <span class="menu-title">Cargo</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('cardapio') }">
                            <a href="#" @click.prevent="router.visit(`/admin/cardapio`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Cardapio' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-utensils"></i>
                                </span>
                                <span class="menu-title">Cardápio</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('eventos') }">
                            <a href="#" @click.prevent="router.visit(`/admin/eventos`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Eventos' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-calendar"></i>
                                </span>
                                <span class="menu-title">Eventos</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('regime-interno') }">
                            <a href="#" @click.prevent="router.visit(`/admin/regime-interno`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Regime Interno' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-file-contract"></i>
                                </span>
                                <span class="menu-title">Regime Interno</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('estatuto') }">
                            <a href="#" @click.prevent="router.visit(`/admin/estatuto`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Regime Interno' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-file-text"></i>
                                </span>
                                <span class="menu-title">Estatuto</span>
                            </a>
                        </li>
                        <li class="menu-item" :class="{ 'active': isActive('atas') }">
                            <a href="#" @click.prevent="router.visit(`/admin/atas`)" class="menu-link"
                               :data-tooltip="collapsed ? 'Regime Interno' : ''">
                                <span class="menu-icon">
                                    <i class="fa fa-file-image"></i>
                                </span>
                                <span class="menu-title">Ata</span>
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

defineExpose({
    toggleCollapse,
    toggleSidebar,
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

    if (path.includes('pessoas')) {
        activeItem.value = 'pessoas';
    } else if (path.includes('cargo')) {
        activeItem.value = 'cargo';
    } else if (path.includes('regime-interno')) {
        activeItem.value = 'regime-interno';
    }else if (path.includes('estatuto')) {
        activeItem.value = 'estatuto';
    }else if (path.includes('atas')) {
        activeItem.value = 'atas';
    }else if (path.includes('eventos')) {
        activeItem.value = 'eventos';
    }else if (path.includes('cardapio')) {
        activeItem.value = 'cardapio';
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
