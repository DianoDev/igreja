<template>
    <div v-if="total > 0">
        <nav class="flex justify-end">
            <ul class="flex">
                <li :class="{'opacity-50 cursor-not-allowed': current_page === 1}">
                    <a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                       href="javascript:" @click="current_page > 1 && goto(1)">
                        <i class="fa fa-angles-left"></i>
                    </a>
                </li>

                <li :class="{'opacity-50 cursor-not-allowed': current_page === 1}">
                    <a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                       href="javascript:" @click="current_page > 1 && goto(current_page - 1)">
                        <i class="fa fa-chevron-left"></i>
                    </a>
                </li>

                <li v-for="page in pageList" :key="page">
                    <a
                        class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium leading-none border"
                        :class="{
                            'z-10 border-primary bg-primary/10 text-primary font-semibold': page === current_page,
                            'border-gray-300 bg-white text-gray-500 hover:bg-gray-50': page !== current_page
                        }"
                        href="javascript:"
                        @click="select(page)"
                    >{{ page }}</a>
                </li>

                <li :class="{'opacity-50 cursor-not-allowed': last_page === current_page}">
                    <a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                       href="javascript:" @click="current_page < last_page && goto(current_page + 1)">
                        <i class="fa fa-chevron-right"></i>
                    </a>
                </li>

                <li :class="{'opacity-50 cursor-not-allowed': last_page === current_page}">
                    <a class="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                       href="javascript:" @click="current_page < last_page && goto(last_page)">
                        <i class="fa fa-angles-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>


<script>
import { onMounted, inject, ref } from 'vue';
export default {
    watch: {
        current_page: function() { this.setPages() },
        per_page: function() { this.setPages() },
    },

    setup(props, { emit }) {
        const range = ref(10);
        const pageList = ref([]);

        const goto = (page) => {
            emit('change-page', page);
        }

        const select = (page) => {
            emit('change-page', page);
        }

        const setPages = () => {
            if(props.total === null) return;
            pageList.value = [];
            let pages = [];
            for(let i = 1; i <= parseInt(props.last_page); i++) {
                pages.push(i);
            }

            if(props.last_page > range.value) {
                let index = Math.ceil(props.current_page - (range.value / 2));
                if (index < 0) index = 0;
                if ((index + range.value) > props.last_page) index = (props.last_page - range.value);
                pageList.value = pages.slice(index, index + range.value);
            } else {
                pageList.value = pages;
            }
        }

        onMounted(setPages);

        return {
            range,
            pageList,
            setPages,
            goto,
            select
        }
    },

    props: {
        current_page: { default: null },
        from: { default: null },
        to: { default: null },
        total: { default: null },
        per_page: { default: null },
        last_page: { default: null }
    }
};
</script>
