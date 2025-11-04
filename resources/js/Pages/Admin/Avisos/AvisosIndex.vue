<template>
    <LayoutPrincipal>
        <div class="page-content">
            <div class="flex items-center justify-between mb-4 w-100">
                <h2 class="text-2xl font-semibold text-primary"></h2>
                <div class="flex">
                    <popup-button
                        id="novo-avisos"
                        title="Novo  Avisos"
                        size="xl"
                        component="AvisosForm"
                        variant="secondary"
                    >
                        <i class="mr-2 fa fa-plus"></i>
                        Novo  Avisos
                    </popup-button>
                </div>
            </div>
            <div>
                <datatable
                    id="avisos"
                    :columns="columns"
                    :source="source"
                ></datatable>
            </div>
        </div>
    </LayoutPrincipal>
</template>

<script setup>
import { ref, inject } from 'vue';
import Datatable from '@/Components/datatable/Datatable.vue';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import PopupButton from '@/Components/PopupButton.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const events = inject('events');
const source = ref('/admin/avisos/list');

// Formatter para truncar texto
const truncateText = (value, maxLength = 50) => {
    if (!value) return '-';
    const texto = String(value).trim();
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength).trim() + '...';
};

// Formatter para data no formato dd/mm/yyyy
const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Formatter para campo ativo (boolean)
const formatAtivo = (value) => {
    if (value === true || value === 1 || value === '1') {
        return '<span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full"><i class="fa fa-check mr-1"></i>Ativo</span>';
    }
    return '<span class="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full"><i class="fa fa-times mr-1"></i>Inativo</span>';
};

const columns = ref([
    {name: 'nome', title: 'Nome', width: '20%', sort: 'nome'},
    {
        name: 'descricao',
        title: 'Descricao',
        width: '30%',
        sort: 'descricao',
        formatter: (value) => truncateText(value, 80)
    },
    {
        name: 'data_expiração',
        title: 'Data Expiração',
        width: '15%',
        sort: 'data_expiração',
        nowrap: true,
        formatter: formatDate
    },
    {
        name: 'ativo',
        title: 'Ativo',
        width: '15%',
        sort: 'ativo',
        nowrap: true,
        formatter: formatAtivo
    },
    {
        name: 'id',
        title: 'Ações',
        width: '10%',
        nowrap: true,
        contentClass: 'text-center',
        headerClass: 'text-center',
        template: 'dropdown',
        formatter: (val, row) => [
            {
                type: 'modal',
                icon: 'fa-edit',
                dataSize: 'xl',
                dataComponent: 'AvisosForm',
                dataTitle: 'Editar  Avisos',
                dataJson: { id: row.id },
                text: 'Editar'
            },
            {
                type: 'delete',
                icon: 'fa-trash',
                text: 'Remover',
                deleteUrl: `/admin/avisos/${row.id}`,
                dataTitle: 'Confirmação de Remoção',
                dataMessage: 'Você deseja realmente excluir este registro?'
            }
        ]
    }
]);
</script>
