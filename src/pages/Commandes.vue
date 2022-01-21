<template>
  <div >
    <div class="flex">
      <SideBar />
      <div>
        <p>Vos Commandes</p>
        <v-card
          v-for="commande in commandArr"
          :key="commande.id"
          elevation="3"
          outlined
          shaped
        >

          <v-card-title>
            {{ commande.date }}
          </v-card-title>

          <v-card-text> Total price: $ {{ commande.totalPrice }} </v-card-text>
          <v-card-actions>
            <v-btn
            @click="getOrderID(commande.id)"
             outlined rounded text
              >
                Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <!-- Modal des details d'une commande -->
      <ModalCommandDetails />
    </div>
  </div>
</template>

<script>
import ModalCommandDetails from '../components/ModalCommandDetails.vue'
import { mapFields } from "vuex-map-fields";
import axios from 'axios'
import SideBar from "../components/sideBar.vue";
export default {
  name: "commandes-component",
  components: {
    SideBar,ModalCommandDetails
  },
  props: {},
  methods: {
      //Recuperer l'id de la commande sur laquelle on a cliqué et mettre a jour la variable orderID du state
        getOrderID(value){
            console.log(value);
            this.orderID=value
            this.showModalCommandDetail=true
            this.$store.dispatch("getOrderDetail");

        },

      getCommands() {
      axios
        .get(
          `http://127.0.0.1:8000/api/dashboard/commandes`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token2"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.commandArr=response.data.data
        
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  mounted() {
      this.getCommands()
  },
  computed: {
      ...mapFields(['commandArr','orderID','showModalCommandDetail'])
  }
};
</script>

<style></style>
