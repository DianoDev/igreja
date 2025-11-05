<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center overflow-y-auto confirmation-popup" :id="id">
        <div class="flex items-center justify-center w-full min-h-screen px-4 text-center">
            <!-- Background overlay -->
            <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="cancel"></div>

            <!-- Modal panel -->
            <div class="relative inline-block overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">

                <!-- Header -->
                <div class="px-4 py-3 text-white bg-gray-800">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium">{{ confirmation.title }}</h3>
                        <button type="button" class="text-gray-400 hover:text-white focus:outline-none" @click="cancel">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- Body -->
                <div class="px-4 py-5 bg-white">
                    <p v-html="confirmation.message"></p>
                </div>

                <!-- Footer -->
                <div class="justify-end px-4 py-3 bg-gray-50 sm:flex sm:flex-row sm:px-6">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-blue-500 hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mr-3 sm:w-auto"
                        @click="confirm"
                    >
                        <i class="mr-2 fa fa-check"></i>
                        Confirmar
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                        @click="cancel"
                        id="confirmation-cancel-button"
                    >
                        <i class="mr-2 fa fa-times"></i>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

const props = defineProps({
    id: {
        type: String,
        default: 'global-confirmation-popup'
    },
    data: {
        type: [Object, null],
        default: null
    },
    message: {
        type: String,
        default: 'Você tem certeza?'
    },
    title: {
        type: String,
        default: 'Confirmação'
    },
    event: {
        type: [Function, String, null],
        default: null
    },
    top: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['close']);
const show = ref(false);
const events = inject('events');
const confirmation = ref({
    title: props.title,
    message: props.message,
    data: props.data,
    event: props.event,
});

const confirm = () => {
    if (typeof confirmation.value.event === 'function') {
        confirmation.value.event();
    } else if (confirmation.value.event) {
        events.emit(confirmation.value.event, confirmation.value.data);
    }
    closeConfirmation();
    emit('close');
};

const closeConfirmation = () => {
    confirmation.value = {
        title: props.title,
        message: props.message,
        data: props.data,
        event: props.event,
    };
    show.value = false;
};

const cancel = () => {
    closeConfirmation();
    emit('close');
};

onMounted(() => {
    events.on('confirmation', (data) => {
        confirmation.value = data;
        show.value = true;
    });
});
</script>
<style scoped>
.confirmation-popup {
    z-index: 9999;
}
</style>
