<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Moshop</v-app-bar-title>

      <v-spacer></v-spacer>

      <RegisterModal class="ma-2" />
      <LoginModal class="ma-2" />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn icon>
        <router-link to="/dashboard">Dashboard</router-link>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Default Shop</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="900"
    >
      <v-container style="height: 1000px">
        <div class="prods">
          <div>
            <div
              class="w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mb-10"
            >
              <v-row no-gutters>
                <v-col v-for="item in items" :key="item.id" cols="12" sm="4">
                  <v-card outlined tile class="mx-auto" max-width="344">
                    <v-img
                      :src="`http://127.0.0.1:8000/storage/img/${item.imageProduit}`"
                      height="200px"
                    ></v-img>

                    <v-card-title>
                      {{ item.nomProduit }}
                    </v-card-title>

                    <v-card-subtitle>
                      $ {{ item.prixProduit }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <!-- Form -->
                      <form>
                        <v-text-field
                        v-model="cartInfo.quantity"
                          name="quantity"
                          type="number"
                          label="quantité"
                          class="pt-2"
                          min="1"
                        ></v-text-field>
                        <v-btn
                          @click="addToCart(item.id)"
                          type="button"
                          color="orange lighten-2"
                          text
                        >
                          Add to cart
                        </v-btn>
                      </form>
                      <!-- Fin Form -->
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
            </div>
          </div>
        </div>
      </v-container>
    </v-sheet>
  </v-card>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import RegisterModal from "../components/RegisterModal.vue";
import LoginModal from "../components/LoginModal.vue";

export default {
  name: "nav-bar-component",
  components: {
    RegisterModal,
    LoginModal,
  },
  data() {
    return {
      right: null,
      show: false,
      shoWErrMessage: false,
    };
  },
  methods: {
    productsRequest() {
      axios.get("http://127.0.0.1:8000/api/").then((response) => {
        console.log(response.data);
        // this.shopName=response.data.data.name
        this.$store.commit("getProducts", response.data.data);
      });
    },

    addToCart(otherProdID) {
      //Si on selectionne la quantité la requette se fait, sinon message d'alerte erreur
      if (this.cartInfo.quantity) {
        //On recupere l'id de l'item sur lequel on a cliqué
        console.log(otherProdID, this.cartInfo);
        this.cartInfo.productID = otherProdID;
        //On lance la fonction du action
        this.$store.dispatch("addToCartRequest");
        this.shoWErrMessage = false;
      } else {
        this.shoWErrMessage = true;
      }
    },
  },
  mounted() {
    this.productsRequest();
  },
  computed: {
    ...mapState(["items"]),
    ...mapFields(["cartInfo"]),
  },
};
</script>
<style>
.prods {
  margin-top: 30%;
}
a {
  text-decoration: none !important;
  color: inherit !important;
}
</style>
