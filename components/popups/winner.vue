<template>
  <popups-layout
    Width="500px"
    @close="close"
    title="Siz ushbu lotning g‘olibisiz. Tugmalarni bosish orqali harakatingizni tasdiqlang."
    :isVisible="isVisible"
    :isFooter="true"
  >
    <template #body>
      <div class="content grey _16 mt-8">
        <p class="text-body3 blue1 mb-0">
          Agar bekor qilsangiz, siz 2 (ikki) kalendar yil davomida tenderlarda
          ishtirok eta olmaysiz
        </p>
      </div>
    </template>
    <template #footer>
      <a-row type="flex" :gutter="[20, 0]">
        <a-col span="12">
          <a-button @click="approve" type="primary" class="green">
            Tasdiqlash
          </a-button>
        </a-col>
        <a-col span="12">
          <a-button type="primary" class="grey-reject" @click="reject">
            Bekor qilish
          </a-button>
        </a-col>
      </a-row>
    </template>
  </popups-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    winnerId: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('participant/tender', ['setStatus']),
    async approve() {
      await this.setStatus({id:this.winnerId, status:'trade_executed'});
      await this.$emit('fetch');
      this.close();
    },
    async reject() {
      await this.setStatus({id:this.winnerId, status:'winner_sign_waiting'});
      await this.$emit('fetch');
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
