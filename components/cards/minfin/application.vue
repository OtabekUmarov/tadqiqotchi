<template>
    <div class="card application-card">
        <div class="card-header">
            <h4 class="text-body1 black1">{{ data.account_number }}</h4>
            <small :class="['status', `${data.customStatus && data.customStatus.type}`]">
                {{ data.customStatus && data.customStatus.title && data.customStatus.title.uz }}
            </small>
            <a-dropdown :trigger="['click']" placement="bottomRight" v-if="data.status == 'in_review_minfin'">
                <i class="icon-dots"></i>
                <ul class="table-dropdown" slot="overlay">
                    <li class="green" @click.stop="setStatus({ status: 'confirmed', id: data.id })">
                        <i class="icon-accept"></i>
                        <span>Qabul qilish</span>
                    </li>
                    <li class="red" @click.stop="setStatus({ status: 'rejected_minfin', id: data.id })">
                        <i class="icon-reject"></i>
                        <span>Rad etish</span>
                    </li>
                </ul>
            </a-dropdown>
        </div>
        <div class="card-body">
            <span class="text-caption black3"> Tashkilotchi </span>
            <h3 class="text-body1 black1">{{ data.organizer }}</h3>
        </div>
        <div class="card-footer">
            <ul>
                <li>
                    <span class="text-caption black3"> Yuborilgan sana </span>
                    <h4 class="text-body4 black1">{{ data.created_at | timeFormat }} / {{ data.created_at | dateFormat }}</h4>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        ...mapActions('minfin/applications', ['putStatus']),
        async setStatus({ status, id }) {
            await this.putStatus({ status, id });
            this.$emit('fetchList');
        },
    },
};
</script>

<style scoped>
</style>