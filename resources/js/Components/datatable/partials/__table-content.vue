<template>
    <tbody class="bg-white">
        <Modal></Modal>
        <tr v-for="row in data" :key="row.rn" class="border-t border-b border-gray-200 hover:bg-gray-100"
            :class="{ 'cursor-pointer': enableRowClick }" @click.stop="handleClick(row)">
            <td v-for="column in tableColumns" :class="getClasses(column)" class="px-3 py-3 text-sm font-light">
                <div v-if="!column.checkbox">
                    <component v-if="column.template === 'dropdown' && updated" :is="TableDropdown" :data="row.id"
                        :reference="row" :items="getValue(row, column)" />


                    <span v-else-if="!column.component" v-html="printItem(row, column)"></span>

                    <component v-if="column.component && updated" :is="column.component"
                        :readonly="column.readonly || false" :data="getValue(row, column)" :reference="row">
                    </component>
                </div>

                <div v-if="column.checkbox && updated" class="text-center">
                    <table-checkbox :value="getValue(row, column)" @toggle="toggle" />
                </div>
            </td>

        </tr>
    </tbody>
</template>

<script>
import moment from 'moment';
import { ref, inject, onMounted, watchEffect } from 'vue';
import TableCheckbox from './__table-checkbox.vue';
import TableDropdown from './__table-dropdown.vue';
import Modal from '@/Components/Modal.vue';

export default {
    components: {
        TableCheckbox,
        TableDropdown,
        Modal
    },

    setup(props, { emit }) {
        const events = inject('events');
        const tableColumns = ref(props.columns);
        const updated = ref(true);
        const ready = ref(false);

        watchEffect(() => {
            let total = props.data.length;
            updated.value = false;
            setTimeout(() => {
                emit('loaded', true);
                updated.value = true;
            }, 50);
        });

        const init = () => { }

        const getClasses = (column) => {
            let contentClass = column.contentClass ?? '';
            let nowrapClass = column.nowrap ? 'whitespace-nowrap' : '';
            return `${contentClass} ${nowrapClass}`;
        }

        const printItem = (row, column) => {
            if (column.template === 'dropdown') return '';

            const value = getRawValue(row, column);

            if (column.template) {
                switch (column.template) {
                    case 'ago':
                        return formatDateAgo(value);
                    case 'date':
                        return formatDate(value, false);
                    case 'datetime':
                        return formatDate(value, true);
                    case 'yesno':
                        return yesno(value);
                    case 'active':
                        return active(value);
                    default:
                        return value;
                }
            }

            if (column.formatter && typeof column.formatter === 'function') {
                return column.formatter(value, row);
            }

            return value;
        };


        const getRawValue = (row, column) => {
            if (column.name.includes('.')) {
                const [prop, value] = column.name.split('.');
                return row[prop]?.[value] || '';
            }

            return row[column.name] ?? '';
        };


        const getValue = (row, column) => {
            if (column.template === 'dropdown') {
                if (typeof column.formatter === 'function') {
                    return column.formatter(null, row);
                }
                return column.dropdownData || [];
            }

            if (typeof column.formatter === 'function') {
                return column.formatter(getRawValue(row, column), row);
            }

            return getRawValue(row, column);
        };



        const formatDate = (date, showTime) => {
            if (date.indexOf('/') >= 0) return date;
            if (showTime) {
                return moment(date).format('DD/MM/YYYY hh:mm');
            } else {
                return moment(date).format('DD/MM/YYYY');
            }
        }

        const formatDateAgo = (date) => {
            return moment(date).fromNow();
        }

        const yesno = (value) => {
            if (value === 'S' || value === '1' || parseInt(value) === 1) {
                return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">SIM</span>';
            } else {
                return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500 text-white">NÃO</span>';
            }
        }

        const active = (value) => {
            if (value === 'S' || value === '1' || parseInt(value) === 1) {
                return '<span class="text-green-500"><i class="fa fa-check-circle"></i></span>';
            } else {
                return '<span class="text-gray-500"><i class="fa fa-circle-xmark"></i></span>';
            }
        }

        const toggle = (item) => {
            emit('toggle-item', item);
        }

        const handleClick = (item) => {
            emit('click', item);
        }

        onMounted(init);

        return {
            tableColumns,
            ready,
            updated,
            getValue,
            printItem,
            getClasses,
            toggle,
            handleClick,
            TableDropdown,
            Modal
        }
    },

    props: {
        loading: { type: Boolean, default: false },
        columns: { type: Array, required: true, default: [] },
        data: { type: Array, required: false, default: [] },
        enableRowClick: { type: Boolean, default: false }
    }
};
</script>

<style>
.action {
    @apply mr-2;
}
</style>
