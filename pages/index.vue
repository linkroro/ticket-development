<template>
<v-container class="d-flex justify-center">
  <div style="width: 75%;">
      <p class="font-weight-bold body-1">Ticket status Lists</p>
    <v-row>
       <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Ticket Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
                clearable
                @click:clear="filterTicket({clearDate: true})"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="()=> {
                  $refs.menu.save(date);
                  filterTicket();
                }"
              >
                OK
              </v-btn>
            </v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-select
          v-model="ticketSelectType"
          :items="items"
          label="Ticket Type"
          outlined
          dense
          clearable
          multiple
          @change="filterTicket()"
          @click:clear="filterTicket()"
      ></v-select>
      </v-col>
       <v-col>
        <v-select
          v-model="active"
          :items="activeItem"
          label="Status"
          outlined
          item-value="value"
          item-text="label"
          dense
          clearable
          @change="filterTicket()"
          @click:clear="filterTicket({clearActive: true})"
      ></v-select>
      </v-col>
    </v-row>
  
    <v-data-table
      :headers="headers"
      :items="tickets"
      class="elevation-1"
      disable-pagination
      disable-sort
       hide-default-footer
    >
      <template v-slot:[`item.sold`]="{ item }">
        <div>
          {{ `${item.sold}/${getLimit(item.ticketType)}`}}
        </div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
          <v-badge
            dot
            inline
            left
            :color="isActive(item.sold, item.ticketType) ? 'primary': 'red'"
          >
            {{ isActive(item.sold, item.ticketType) ? 'Active': 'In Active' }}
          </v-badge>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="primary"
          small
          @click="buyItem(item)"
          :disabled="!isActive(item.sold, item.ticketType)"
        >
          Buy ticket
        </v-btn>
      </template>
    </v-data-table>
  </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations  } from "vuex";
import dayjs from "dayjs";

  export default {
    name: 'IndexPage',

    data () {
      return {
        ticketSelectType: [],
        active: '',
        items: ['A', 'B', 'C', 'D'],
        activeItem: [{label: "Active", value: true}, {label: "In Active", value: false}],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        headers: [
          {
            text: 'Ticket Type',
            align: 'start',
            sortable: false,
            value: 'ticketType',
          },
          { text: 'Price', value: 'price', sortable: false, align: 'right' },
          { text: 'Minimum Buying', value: 'minimumBuying', sortable: false, align: 'center' },
          { text: 'Sold / Limit Per Day', value: 'sold', align: 'center' },
          { text: 'Status', value: 'status', align: 'left' },
          { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
          // { text: 'Date', value: 'date', align: 'center' },
        ],
        tickets: [],
        // constTicket: JSON.parse(JSON.stringify(this.getTicket)),
      }
    },
    computed:{
       ...mapGetters({
        getTicket: "GET_TICKETS",
        getConstTicket: "GET_CONST_TICKETS",
      }),
    },
    mounted(){
      this.FilTER_TICKET({date: dayjs().format('DD-MM-YYYY')});
      this.tickets = this.$store.state.ticketData;
    },
    methods: {
       ...mapMutations(["FilTER_TICKET", "UPDATE_TICKET"]),
       filterTicket(clearDate = false, clearType = false, clearActive = false){
         const parseDate = dayjs(this.date).format('DD-MM-YYYY')
         this.FilTER_TICKET(
          {
            date: clearDate ? 'Invalid Date' :parseDate,
            ticketType: this.ticketSelectType,
            active: clearActive ? '' : this.active
          });
         this.tickets = this.$store.state.ticketData;
       },
       compare( a, b ) {
        if ( a.ticketType < b.ticketType ){
          return -1;
        }
        if ( a.ticketType > b.ticketType ){
          return 1;
        }
        return 0;
      },
      getLimit (ticketType) {
        if(ticketType === 'A') return 10;
        else if(ticketType === 'B') return 20;
        else if(ticketType === 'C') return 30;
        else if(ticketType === 'D') return 40;
        return 0;
      },
      isActive(sold, ticketType){
        if(ticketType === 'A') return sold !== 10;
        else if(ticketType === 'B') return sold !== 20 && sold < 20;
        else if(ticketType === 'C') return sold !== 30;
        else if(ticketType === 'D') return sold !== 40;
        return false;
      },
      buyItem(item){
        let quantity = 1;
        if(item.ticketType === 'B' || item.ticketType === 'C' ){
          quantity = 2
        }else if(item.ticketType === 'D'){
          quantity = 3
        }
        this.UPDATE_TICKET({data: item ,quantity})
        this.tickets = this.$store.state.constTicketData;
        this.filterTicket();
        // console.log(this.$store.state.constTicketData)
      },
    },
  }
</script>