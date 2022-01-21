<template>
  <div>
    <div class="flex">
      <SideBar />
      <div>
        <p>All-shops</p>

        <template>
          <v-card
            v-for="magasin in allShopsArr"
            :key="magasin.id"
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  <img
                    class="object-cover w-20 h-20 border-2 border-green-500 rounded-full dark:border-blue-400"
                    alt="Testimonial avatar"
                    :src="`http://127.0.0.1:8000/storage/img/${magasin.picture}`"
                  />
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ magasin.nomMagasin }}
                </v-list-item-title>
                <v-list-item-subtitle
                            >{{magasin.email}}</v-list-item-subtitle
                        > 
              </v-list-item-content>

             
            </v-list-item>

            <v-card-actions>
              <!-- <v-btn outlined rounded text>
                Details
              </v-btn> -->
            <ShopDetail :shopID="magasin.id" />
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/sideBar.vue";
import axios from "axios";
import ShopDetail from '../pages/AllShopsDetailModal.vue'

export default {
  name: "all-shops-component",
  components: {
    SideBar,ShopDetail
  },
    data() {
        return {
            allShopsArr:[]
        }
    },
    mounted() {
        this.getAllShops()
    },
    methods: {
        getAllShops(){
            axios
        .get(
          `http://127.0.0.1:8000/api/dashboard/allShops`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token2"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          this.allShopsArr=response.data.data
        
        })
        .catch((error) => {
          console.log(error.response);
        });
        }
    }
};
</script>

<style></style>
