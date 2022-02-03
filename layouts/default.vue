<template>
  <v-app>
    <v-main>
      <!-- <div class="d-flex" style="height: 100vh;"> -->
        <!-- <v-navigation-drawer permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Ticket
              </v-list-item-title>
              <v-list-item-subtitle>
                Ticket Management System
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
              >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer> -->
        <v-container>
            <Nuxt />
        </v-container>
      <!-- </div> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
      return {
        selectedItem: 0,
        items: [
          { title: 'Ticket Management', icon: 'mdi-view-dashboard', path: '/' },
          { title: 'Buy ticket', icon: 'mdi-ticket-confirmation', path: '/' },
        ],
        right: null,
      }
    },
}
</script>
