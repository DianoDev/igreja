<template>
    <LayoutPrincipal>
        <div class="page-content">
            <div class="flex items-center justify-between mb-4 w-100">
                <h2 class="text-2xl font-semibold text-primary"></h2>
                <div class="flex">
                    <popup-button
                        id="novo-eventos"
                        title="Novo  Eventos"
                        size="xl"
                        component="EventosForm"
                        variant="secondary"
                    >
                        <i class="mr-2 fa fa-plus"></i>
                        Novo  Eventos
                    </popup-button>
                </div>
            </div>
            <div>
                <datatable
                    id="eventos"
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
const source = ref('/admin/eventos/list');

const columns = ref([
    {name: 'nome', title: 'Nome', width: '20%', sort: 'nome', nowrap: true},
    {
        name: 'data',
        title: 'Data',
        width: '20%',
        sort: 'data',
        nowrap: true,
        formatter: (val) => formatarData(val)
    },
    {name: 'hora', title: 'Hora', width: '20%', sort: 'hora', nowrap: true},
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
                type: 'anchor',
                icon: 'fa-utensils',
                href: `/admin/eventos/${row.id}/info`,
                text: 'Cardapio e Doações',
            },
            {
                type: 'anchor',
                icon: 'fa-download',
                href: `/publico/evento/${row.id}/pdf`,
                text: 'Download PDF',
                openNewTab: true,
            },
            {
                type: 'anchor',
                icon: 'fa-tag',
                href: `/admin/evento/${row.id}/galeria`,
                text: 'Galeria de Fotos',
            },
            {
                type: 'modal',
                icon: 'fa-edit',
                dataSize: 'xl',
                dataComponent: 'EventosForm',
                dataTitle: 'Editar  Eventos',
                dataJson: { id: row.id },
                text: 'Editar'
            },
            {
                type: 'delete',
                icon: 'fa-trash',
                text: 'Remover',
                deleteUrl: `/admin/eventos/${row.id}`,
                dataTitle: 'Confirmação de Remoção',
                dataMessage: 'Você deseja realmente excluir este registro?'
            }
        ]
    }
]);


const formatarData = (data) => {
    if (!data) return '-';

    try {
        // Se a data vier como string ISO (YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss)
        const date = new Date(data);

        // Verificar se a data é válida
        if (isNaN(date.getTime())) return data;

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return data;
    }
};
</script>
