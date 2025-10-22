<template>
    <LayoutPrincipal>
        {{props.evento}}
    </LayoutPrincipal>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import LayoutPrincipal from '@/Layouts/LayoutPrincipal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import { useToast } from 'vue-toastification';
import { router } from '@inertiajs/vue3';

const props = defineProps({
    evento: {
        type: Object,
        default: null,
        required: false
    },
});

const toast = useToast();
const events = inject('events');
const processing = ref(false);
const errors = ref({});
const ingredientes = ref([]);


// Voltar para a lista
function voltar() {
    router.visit('/admin/cardapio');
}

onMounted(async () => {
    if (props.cardapio?.id) {
        await carregarIngredientes();
    }
});
</script>

<style scoped>
.required::after {
    content: " *";
    color: red;
}
</style>
