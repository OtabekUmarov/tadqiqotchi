<template>
  <layouts title="Natijalar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <FiltersApplications :isFilter="isFilter" />
    </template>
    <template #body>
      <div class="tab-wrapper">
        <CustomTab :tabs="tabs" v-model="tab" />
        <div class="tab-layout">
          <i
            class="icon-layout1"
            :class="{ active: layoutId == 1 }"
            @click="changeLayout(1)"
          ></i>
          <i
            class="icon-layout2"
            :class="{ active: layoutId == 2 }"
            @click="changeLayout(2)"
          ></i>
        </div>
      </div>
      <a-row :gutter="[20, 24]" v-if="layoutId == 1">
        <a-col span="12" v-for="item in list" :key="item.id">
          <CardsPayment :data="item" />
        </a-col>
      </a-row>
      <div class="table" v-else>
        <table>
          <thead>
            <tr>
              <th width="1%">№</th>
              <th>Lot raqami</th>
              <th>Summa</th>
              <th>To‘lov turi</th>
              <th width="220px">Holati</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in list"
              :key="item.id"
              @click="
                $router.push({
                  path: `/cabinet/participant/payment/${item.id}/`,
                })
              "
            >
              <td>№</td>
              <td>{{ item.lotNumber }}</td>
              <td>{{ item.sum }}</td>
              <td>{{ item.paymentType }}</td>
              <td>
                <div class="table-status">
                  <span :class="['status', `_${item.status.id}`]">
                    {{ item.status.title }}
                  </span>
                  <a-dropdown
                    :trigger="['click']"
                    v-if="item.status.id == 4"
                    placement="bottomRight"
                  >
                    <i class="icon-dots"></i>
                    <ul class="table-dropdown" slot="overlay">
                      <li class="green">
                        <i class="icon-accept"></i>
                        <span>Qabul qilish</span>
                      </li>
                      <li class="red">
                        <i class="icon-reject"></i>
                        <span>Rad etish</span>
                      </li>
                    </ul>
                  </a-dropdown>
                </div>
               
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'participant',

  data() {
    return {
      tabs: [
        {
          title: "Barchasi",
          value: 1,
          count: 7,
        },
        {
          title: "To‘langan",
          value: 2,
          count: 2,
        },
        {
          title: "To‘lanmagan",
          value: 3,
          count: 2,
        },
      ],
      tab: {
        title: "Barchasi",
        value: 1,
      },
      layoutId: 1,
      list: [
        {
          id: 1,
          lotNumber: "278",
          sum: "Consult",
          paymentType: "1-sonli BUSM",
          status: {
            title: "To’langan",
            id: 3,
          },
        },
        {
          id: 2,
          lotNumber: "278",
          sum: "Consult",
          paymentType: "1-sonli BUSM",
          status: {
            title: "To’langan",
            id: 3,
          },
        },
        {
          id: 3,
          lotNumber: "278",
          sum: "Consult",
          paymentType: "1-sonli BUSM",
          status: {
            title: "To‘lanmagan",
            id: 4,
          },
        },
      ],
      isFilter: false,
    };
  },
  methods: {
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    changeLayout(id) {
      this.layoutId = id;
    },
  },
};
</script>
