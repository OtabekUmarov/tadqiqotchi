<template>
    <popups-layout Width="500px" @close="close" title="Rad etish" :isVisible="isVisible" :isFooter="true">
        <template #body>
            <a-form-item label="Izoh" class="mb-0">
                <a-textarea placeholder="Izoh yozing" v-model="form.reject_comment" :rows="4" />
            </a-form-item>
        </template>
        <template #footer>
            <a-row :gutter="[20, 0]">
                <a-col span="12">
                    <a-button class="grey" type="primary" @click="close">
                        Orqaga
                    </a-button>
                </a-col>
                <a-col span="12">
                    <a-button class="green" type="primary" @click="setStatus({ form })">
                        Yuborish
                    </a-button>
                </a-col>
            </a-row>
        </template>
    </popups-layout>
</template>

<script>
export default {
    data() {
        return {
            form: {
                reject_comment: "",
                status: 'rejected_shaffof_moderator'
            }
        }

    },
    props: {
        id: Number,
        isVisible: {
            type: Boolean,
            default() {
                return false;
            },
        },
        setStatus: Function
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style>
</style>