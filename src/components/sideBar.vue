<template>
  <v-card
    height="900"
    width="256"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <router-link to="/"> Home</router-link>
           
          </v-list-item-title>
          <!-- <v-list-item-subtitle>
            
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
      <!-- Profile -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><router-link to="/dashboard/profile">Profile</router-link></v-list-item-title>
          </v-list-item-content>
          <!-- Personal Shop -->
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shopping</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><router-link to="/dashboard/personal-shop">Personal Shop</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <!-- Personal Shop -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><router-link to="/dashboard/panier">Panier</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <!--  Commandes -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-data-matrix-scan</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><router-link to="/dashboard/commandes">Commandes</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
        <!--  Commandes -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-shopping</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><router-link to="/dashboard/all-shops">All Shops</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--  -->
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name:"side-bar-component",
    data () {
      return {
        
        right: null,
      }
    },
  }
</script>