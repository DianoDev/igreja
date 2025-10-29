<template>
    <div class="absolute inset-0 z-10">
        <div class="absolute inset-0 flex items-center justify-center z-20">
            <div class="text-blue-500"><i class="fa fa-sync-alt text-4xl animate-spin"></i></div>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
export default {
    name: 'table-loading',
};
</script>
