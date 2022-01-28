<template>
  <div style="width: 75%;">
    <p class="font-weight-bold body-1">Ticket Management System</p>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.sold`]="{ item }">
        <div>
          {{ `${item.sold}/${getLimit(item.ticketType)}`}}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',

    data () {
      return {
        headers: [
          {
            text: 'Ticket Type',
            align: 'start',
            sortable: false,
            value: 'ticketType',
          },
          { text: 'Price', value: 'price' },
          { text: 'Sold', value: 'sold' },
        ],
        desserts: [
          {
            ticketType: "A",
            price: 5000,
            sold: 5,
          }
        ],
      }
    },
     methods: {
      getLimit (ticketType) {
        if(ticketType === 'A') return 10;
        else if(ticketType === 'B') return 20;
        else if(ticketType === 'C') return 30;
        else if(ticketType === 'D') return 40;
        return 0;
      },
    },
  }
</script>