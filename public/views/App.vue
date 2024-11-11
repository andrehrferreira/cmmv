<template>
    <div>
        HELLO WORLD

        <Vueform></Vueform>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
const { ref } = Vue;
import { useVueform, Vueform } from '@vueform/vueform';

export default {
    mixins: [Vueform],

    setup(props, context)
    {
        const form = useVueform(props, context);

        const vueform = ref({
            size: 'md',
            displayErrors: false,
            addClass: 'vf-create-account',
            schema: {
                page_title: {
                    type: 'static',
                    content: 'Create account',
                    tag: 'h1',
                },
            }
        });
    }
};
</script>
