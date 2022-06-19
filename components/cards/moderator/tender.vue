<template>
    <div class="card tender-card">
        <div class="card-header">
            <h4 class="text-body3 black1">{{ data.account_number }}</h4>
            <small :class="['status', `${data.customStatus && data.customStatus.type}`]">
                {{ data.customStatus && data.customStatus.title && data.customStatus.title[$i18n.locale] }}
            </small>
        </div>
        <div class="card-body">
            <span class="text-caption black3"> Tashkilotchi </span>
            <h3 class="text-body1 black1">{{ data.organizer && data.organizer.organization_name }}</h3>
        </div>
        <div class="card-footer">
            <ul>
                <li>
                    <span class="text-caption black3"> Yuborilgan sana </span>
                    <h4 class="text-body3 black1">
                        {{ data.created_at | timeFormat }} /
                        {{ data.created_at | dateFormat }}
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
            <nuxt-link :to="{ path: `/cabinet/moderator/tenders/detail/${data.id}` }">Batafsil <i
                    class="icon-angle-right"></i></nuxt-link>
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
        url: {
            type: String,
            default: '',
        }
    },
    mounted() {
        console.log(this.data);
    },
};
</script>

<style scoped>
</style>