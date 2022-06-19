<template>
    <div class="card tender-card">
        <div class="card-header">
            <h4 class="text-body3 black1">№{{ data.id }}</h4>
            <small :class="['status', `${data.customStatus && data.customStatus.type}`]">
                {{ data.customStatus && data.customStatus.title && data.customStatus.title.uz }}
            </small>
            <a-dropdown :trigger="['click']" placement="bottomRight" v-if="data.status == 'customer_sign_waiting' || data.status == 'trade_executed'">
                <i class="icon-dots"></i>
                <ul class="table-dropdown" slot="overlay">
                <li v-if="data.status == 'customer_sign_waiting'" class="green">
                    <a-popconfirm title="Qabul qilasizmi?" ok-text="Ha" cancel-text="Yo'q"
                    @confirm="approved()">
                    <i class="icon-accept"></i>
                    <span>Qabul qilish</span>
                    </a-popconfirm>
                </li>
                <li v-if="data.status == 'customer_sign_waiting'" class="red" @click="rejected()">
                    <i class="icon-reject"></i>
                    <span>Rad etish</span>
                </li>
                <li v-if="data.status == 'trade_executed'" class="green" @click="sendAgreement()">
                    <i class="icon-accept"></i>
                    <span>Shartnoma yuklash</span>
                </li>
                </ul>
            </a-dropdown>
        </div>
        <div class="card-body">
            <span class="text-caption black3"> Tender nomi </span>
            <h3 class="text-body1 black1">{{ data.tender_name }}</h3>
        </div>
        <div class="card-footer">
            <ul>
                <li>
                    <span class="text-caption black3"> Yaratilgan sana </span>
                    <h4 class="text-body3 black1">
                        <!-- {{ data.created_at | timeFormat }} /  -->
                        {{ data.created_at | dateFormat }}
                    </h4>
                </li>
                <li v-if="false">
                    <span class="text-caption black3"> Boshlanish sana</span>
                    <h4 class="text-body3 black1">{{ data.startedDate }}</h4>
                </li>
            </ul>
            <a-button type="primary" class="green _32" v-if="data.status == 'test'">
                Shartnoma yuklash
            </a-button>
            <nuxt-link v-if="statusId && statusId > 3" :to="'/cabinet/customer/tenders/' + data.id">Batafsil<i class="icon-angle-right"></i></nuxt-link>
        </div>
    </div>
</template>

<script>
import statusList from "@/constants/customerTenderStatus";
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        statusId(){
            let obj = statusList.find(el => el.key === this.data.status);
            return obj && obj.value
        }
    },
    methods: {
        approved(){
            this.$emit('approve', this.data.id);
        },
        rejected(){
            this.$emit('reject', this.data.id);
        },
        sendAgreement(){
            this.$emit('contract', this.data.id);
        }
    },
};
</script>

<style scoped>
</style>