<template>
  <div>
    <div class="flex">
      <SideBar />
      <!--  -->
      <v-container style="height: 1000px">
        <p>Votre Shop Personnel</p>
        <!-- Ajout de produit -->
        <div data-app>
          <CreateProductModal />
        </div>
        <div>
          <v-row no-gutters>
            <v-col
              v-for="item in personalShopProducts"
              :key="item.id"
              cols="12"
              sm="4"
            >
              <v-card outlined tile class="mx-auto" max-width="344">
                <v-img
                  :src="`http://127.0.0.1:8000/storage/img/${item.imageProduit}`"
                  height="200px"
                ></v-img>

                <v-card-title>
                  {{ item.nomProduit }}
                </v-card-title>

                <v-card-subtitle> $ {{ item.prixProduit }} </v-card-subtitle>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn icon @click="show = !show">
                    <v-icon>{{
                      show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>

                  <!-- Delete product -->
                  <button type="button" @click="deleteProduct(item.id)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-red-500 ml-2 sup"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  <!-- Fin delete -->
                </v-card-actions>
                <div data-app>
                  <!-- Edit -->
                  <CreateProductModal :editProduct="true" :id="item.id" />
                </div>

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
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapFields } from "vuex-map-fields";

import CreateProductModal from "../components/CreateProductModal.vue";
import SideBar from "../components/sideBar.vue";

export default {
  name: "personal-shop",
  props: {},
  components: {
    CreateProductModal,
    SideBar,
  },
  mounted() {
    this.$store.dispatch("personalShop");
  },
  data() {
    return {
      show: false,
      productId: "",
    };
  },
  methods: {
    deleteProduct(id) {
      console.log("id du Produit", id);
      axios
        .delete(`http://127.0.0.1:8000/api/dashboard/produit/${id}/delete`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token2"),
          },
        })
        .then((response) => {
          console.log("elément supprimé " + response.data);
          this.$store.dispatch("personalShop");
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  computed: {
    ...mapFields(["personalShopProducts","itemID"]),
  },
};
</script>

<style>
.sup {
  color: red !important;
}
</style>
