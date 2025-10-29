<template>
    <LayoutPrincipal>
        <div class="page-content">
            <div class="flex items-center justify-between mb-4 w-100">
                <h2 class="text-2xl font-semibold text-primary"> </h2>
                <div class="flex">
                    <popup-button
                        id="novo-pessoas"
                        title="Novo  Pessoa"
                        size="xl"
                        component="PessoaForm"
                        variant="secondary"
                    >
                        <i class="mr-2 fa fa-plus"></i>
                        Novo  Pessoa
                    </popup-button>
                </div>
            </div>
            <div>
                <datatable
                    id="pessoas"
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
const source = ref('/admin/pessoas/list');

const columns = ref([
    {name: 'nome', title: 'Nome', width: '20%', sort: 'nome', nowrap: true},
    {name: 'cpf', title: 'Cpf', width: '20%', sort: 'cpf', nowrap: true},
    {name: 'telefone', title: 'Telefone', width: '20%', sort: 'telefone', nowrap: true},
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
                dataComponent: 'PessoaForm',
                dataTitle: 'Editar  Pessoa',
                dataJson: { id: row.id },
                text: 'Editar'
            },
            {
                type: 'delete',
                icon: 'fa-trash',
                text: 'Remover',
                deleteUrl: `/admin/pessoas/${row.id}`,
                dataTitle: 'Confirmação de Remoção',
                dataMessage: 'Você deseja realmente excluir este registro?'
            }
        ]
    }
]);
</script>
