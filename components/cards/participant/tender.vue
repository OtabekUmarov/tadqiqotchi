<template>
    <div class="card tender-card">
        <div class="card-header">
            <h4 class="text-body3 black1">№{{ data.account_number }}</h4>
            <small v-if="data.is_winner == false && data.customStatus.key == 'winner_sign_waiting'" :class="['status', `${data.customStatus && data.customStatus.type}`]">
                Yakuniy natija kutilmoqda
            </small>
            <small v-else :class="['status', `${data.customStatus && data.customStatus.type}`]">
                {{ data.customStatus && data.customStatus.title && data.customStatus.title[$i18n.locale] }}
            </small>
            <a-dropdown :trigger="['click']" placement="bottomRight" v-if="data.is_winner && data.customStatus.key == 'winner_sign_waiting'">
                <i class="icon-dots"></i>
                <ul class="table-dropdown" slot="overlay">
                    <li class="green" @click="winnerModal()">
                        <i class="icon-accept"></i>
                        <span>Go'lib imzosi</span>
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
                    <span class="text-caption black3"> Yuborilgan sana </span>
                    <h4 class="text-body3 black1">
                        {{ data.participant_tender_application_created_at | timeFormat }} /
                        {{ data.participant_tender_application_created_at | dateFormat }}
                    </h4>
                </li>
                <li v-if="false">
                    <span class="text-caption black3"> Boshlanish sana</span>
                    <h4 class="text-body3 black1">{{ data.startedDate }}</h4>
                </li>
            </ul>
            <a-button type="primary" class="green _32" v-if="data.status.id == 7">
                Shartnoma yuklash
            </a-button>
            <nuxt-link :to="{ path: `/cabinet/participant/tenders/${data.id}` }">Batafsil <i class="icon-angle-right"></i></nuxt-link>
        </div>
    </div>
</template>
<script>
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
        winnerModal() {
            this.$emit('winner', this.data.id)
        }
    },
    mounted() {
    },
};
</script>

<style scoped>
</style>