<template>
  <div>
    <div class="flex">
      <SideBar />
      <div>
        <p>
          Vous avez ajouté {{ product_of_panier.length }} produit(s) à votre
          Panier
        </p>
            <v-container style="height: 1000px">
      <v-row no-gutters>
        <v-col
          v-for="item in product_of_panier"
          :key="item.id"
          cols="12"
          sm="4"
        >
          <v-card outlined tile class="mx-auto" max-width="344">
            <v-img :src="`http://127.0.0.1:8000/storage/img/${item.imageProduit}`" height="200px"></v-img>

            <v-card-title>
              {{ item.nomProduit }}
            </v-card-title>

            <v-card-subtitle>
              $ {{ item.prixProduit }} quantity:
              {{ item.quantity }}
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.descriptionProduit }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>

      <!-- Ajout d'une commande -->
      
        <v-btn v-if="product_of_panier"
        @click="commandPostReq"
         type="submit" class="validate" color="primary">
          Valider la commande
        </v-btn>
      <!--Fin Ajout d'une commande  -->
    </v-container>
      </div>
    </div>

    <!--  -->

  </div>
</template>

<script>
import axios from 'axios'
import { mapFields } from "vuex-map-fields";
import SideBar from "../components/sideBar.vue";

export default {
  name: "panier-component",
  props: {},
  components: {
    SideBar,
  },
  mounted() {
    this.$store.dispatch("getCartProducts");

  },
  data() {
    return {
      show: false,
    };
  },
  methods:{
       commandPostReq() {
      console.log("post req");
      //Toujours envoyer qqch dans une requete post, si rien mettre un objet vide
      axios
      .post(`http://127.0.0.1:8000/api/dashboard/ajoutCommande`,{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token2"),
        },
      })
      .then((response) => {
        console.log( response.data);
        // this.panierArr=response.data
        // this.alertSuccessShow=true
        //Pour relancer la requete get afin de voir les modis sans devoir recharger la page
        this.$store.dispatch("getCartProducts");

      })
      .catch((error) => {
        console.log(error.response);
      });
    },
  },
  computed: {
    ...mapFields(["product_of_panier"]),
  },
};
</script>

<style scoped>
.validate {
  margin-top: 3%;
  background-color: green !important;
}
</style>
