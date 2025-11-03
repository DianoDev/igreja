<template>
    <LayoutPrincipal>
        <div class="page-content">
            <div class="flex items-center justify-between mb-4 w-100">
                <h2 class="text-2xl font-semibold text-primary"></h2>
                <div class="flex">
                    <popup-button
                        id="novo-comissao"
                        title="Novo  Comissao"
                        size="xl"
                        component="ComissaoForm"
                        variant="secondary"
                    >
                        <i class="mr-2 fa fa-plus"></i>
                        Novo  Comissao
                    </popup-button>
                </div>
            </div>
            <div>
                <datatable
                    id="comissao"
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
const source = ref('/admin/comissao/list');

const columns = ref([
    {name: 'ano', title: 'Ano', width: '20%', sort: 'ano', nowrap: true},
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
                dataComponent: 'ComissaoForm',
                dataTitle: 'Editar  Comissao',
                dataJson: { id: row.id },
                text: 'Editar'
            },
            {
                type: 'delete',
                icon: 'fa-trash',
                text: 'Remover',
                deleteUrl: `/admin/comissao/${row.id}`,
                dataTitle: 'Confirmação de Remoção',
                dataMessage: 'Você deseja realmente excluir este registro?'
            }
        ]
    }
]);
</script>
