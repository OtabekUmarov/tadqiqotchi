<template>
  <div>
    <h3 class="text-body1 blue1 mb-16">
        Tender predmeti bo‘yicha ishlarni bajarishga narx taklifi
    </h3>
    <a-form-model ref="form" :model="form" :rules="rules" >
      <a-row :gutter="[32, 0]" class="mb-32">
        <a-col span="8">
          <a-form-model-item label="Narx taklifi" has-feedback  prop="amount">
            <a-input v-model="form.amount" type="number" addon-after="So‘m"> </a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item label="Vaqt taklifi" has-feedback  prop="complete_days">
            <a-input v-model="form.complete_days" type="number" addon-after="Kun"> </a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <div class="mb-32">
        <p class="text-body3 black1 mb-16">
          1. Biz, oferent sifatida quyida imzo chekuvchilar:
        </p>
        <p class="text-body3 black1 mb-16">
          tender predmeti bo'yicha elonda biriktirilgan loyiha asosida tender
          predmeti joylashgan manzilga chiqib o'rganganligimizni;
        </p>
        <p class="text-body3 black1 mb-16">
          pudrat shartnomasini imzolashdan yoki imzolangandan song obyektni
          qurishdan bosh tortganimizda, platforma tomonidan ikki yil davomida
          elektron tenderga avtomatik ravishda qdyilmasligimiz to'g'risida
          xabardorligimizni;
        </p>

        <p class="text-body3 black1 mb-16">
          elektron tender shartiariga va loyiha hujjatlarigo muvofiq
          imzolangan pudrat shartnomamizga asosan barcha ishlarni
          {{priceVal(form.amount) || '_______________________'}}
          so‘m (QQS ni hisobga olgan holda) sifatli
          bajarishimizni va tugatishimizni tasdiqlaymiz.
        </p>
        <p class="text-body3 black1 mb-16">
          2. Biz bilan elektron tender natijasiga kdra pudrat shartnomasi
          imzolangan taqdirdo, ushbu pudrat shartnomasida nazarda tutilgan
          kundan boshlab ishlarni boshlash hamda 
          {{form.complete_days || '_____'}}
          kun ichida obyektni
          belgilangan tartibda foydalanishga topshirish majburiyatini olamiz.
        </p>
        <p class="text-body3 black1 mb-16">
          3. Bizning taklifimiz tender takliflarini baholash kunidan boshlab
          60 kalendar kun mobaynida haqiqiy hisoblanadi.
        </p>

        <p class="text-body3 black1 mb-16">
          4. Pudrat shartnomasi tuzilgunga qadar tender taklifining aksepti
          o'rtamizdagi yuridik majburiyat hisoblanadi.
        </p>
        <p class="text-body3 black1 mb-16">
          5. Biz, oferent sifatida olgan aksept biz (oferent) siz
          (buyurtmachi) bilan rasmiy pudrat shartnomasini tuzish majburiyatini
          olishimizni va biz (oferent) uning ijrosini ta'minlashimizni
          tasdiqlaydi.
        </p>
        <p class="text-body3 black1 mb-16">
          6. Qurilish jarayoniga jalb qilingon yollanma ishchilarning ijtimoiy
          himoyasi va xavfsizligini ta'minlaymiz.
        </p>
        <p class="text-body3 black1 mb-16">
          7. Buyurtmachi bilan o'zaro hisob-kitoblarni birinchi moliya yili
          mobaynida o'zgartirilmaydigan shartnomaviy narxda amalga oshirish
          majburiyatini olamiz.
        </p>
      </div>
      <a-button type="primary" @click="send()" class="green"> Keyingi </a-button>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      rules: {
        amount: [{required: true, validator: this.checkAmount, trigger: 'blur' }],
        complete_days: [{required: true, message: "Ushbu maydon bo'sh bo'lmasligi kerak", trigger: 'blur' }],
      },
      form: {
        amount: '',
        complete_days: ''
      }
    }
  },
  methods: {
    send(){
      this.pending = true
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form,2)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    checkAmount(rule, value, callback) {
      if(!value ) {
        return callback(new Error('Ushbu maydon bo\'sh bo\'lmasligi kerak'));
      }
      if (value < this.price * 0.95) {
        callback(new Error("Summa noto'g'ri kiritildi"));
      } else if (value > this.price) {
        callback(new Error("Summa noto'g'ri kiritildi"));
      } else {
        callback();
      }
    },
    priceVal(val) {
      if (val) {
        let res = Intl.NumberFormat('en-US').format(val);
        return res
      } else  return '_______________________'
    }
  },
}
</script>

<style>

</style>