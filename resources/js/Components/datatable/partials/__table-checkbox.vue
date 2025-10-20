<template>
    <label class="container">
        <input class="table-checkbox absolute opacity-0 cursor-pointer h-0 w-0" type="checkbox" :id="`table-checkbox-${value}`" :checked="checked" @change="toggle">
        <div class="checkmark"></div>
    </label>
</template>

<script>
import {ref, onMounted, inject} from 'vue';

export default {
    setup(props, {emit}) {
        const events = inject('events');
        const checked = ref(false);

        const onToggleAll = (check) => {
            checked.value = check
        }

        const toggle = (evt) => {
            document.querySelector('body').click();
            emit('toggle', {
                checked: evt.target.checked,
                value: props.value
            });
        }

        const onCheckboxReset = () => {
            onToggleAll(false);
            emit('toggle', {
                checked: false,
                value: props.value
            });
        }

        events.on('table-toggle-all', onToggleAll);
        events.on('table-checkbox-reset', onCheckboxReset);

        return {
            checked,
            toggle
        }
    },

    props: {
        value: { type: String, default: null }
    }
}
</script>

<style lang="scss" scoped>
.container {
    @apply block relative cursor-pointer text-2xl select-none;
}

.checkmark {
    --clr: #507497;
    @apply relative top-0 left-0 h-4 w-4 border border-gray-400 bg-white rounded transition-all duration-100;
}

.container input:checked ~ .checkmark {
    background-color: var(--clr);
    @apply border-0 rounded;
    animation: pulse 100ms ease-in-out;
}

.checkmark:after {
    content: "";
    @apply absolute hidden;
}

.container input:checked ~ .checkmark:after {
    @apply block;
}

.container .checkmark:after {
    @apply left-1.5 top-0.5 w-1 h-2 border-solid border-white border-r-2 border-b-2 rotate-45;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 #0B6E4F90;
        rotate: 20deg;
    }

    50% {
        rotate: -20deg;
    }

    75% {
        box-shadow: 0 0 0 10px #0B6E4F60;
    }

    100% {
        box-shadow: 0 0 0 13px #0B6E4F30;
        rotate: 0;
    }
}
</style>
