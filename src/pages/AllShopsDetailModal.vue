<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Details
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Shop Detail</v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>
       
        <v-divider></v-divider>
       <v-row no-gutters>
           <p v-if="produits.length==0">
               Il n'y a rien dans ce magasin
           </p>
            <v-col v-for="(item, i) in produits" :key="i" cols="12" sm="4">
                <!-- si on est dans le magasin de la personne et qu'on est au premier tours de la boucle(ceci évitera qu'on ecrive votre magasin pour chaque article)-->
                <p
                    class="text"
                    v-if="item.magasin_id == connecteduser && i == 0"
                >
                    Votre Magasin
                </p>
                <!-- Evite le decalage des articles quand on est aux autres tours de la boucle -->
                <p v-else> .</p>
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
                        <!-- Pour qu'on ne voit pas le bouton ajout si c'est le user connecté qui va dans son shop -->
                        <!-- Le magasin_id est aussi égal au user_id du magasin -->
                        <form
                           v-if="connecteduser != item.magasin_id"
                        >
                            <v-text-field
                            v-model="cartInfo.quantity"
                                name="quantity"
                                type="number"
                                label="quantité"
                                class="pt-2"
                                min="1"
                            ></v-text-field>
                            <v-btn  @click="addToCart(item.id)" type="button" color="orange lighten-2" text>
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
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapFields } from "vuex-map-fields";


  export default {
    name: 'ShopDetail',
    props:{
        shopID: Number
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        ShopName:"",
        ShopProducts:[],
        shoWErrMessage:false,
        show: false,
        produits:[],
        connecteduser:""
      }
    },
    mounted() {
      this.getShopDetails();
  },
  methods: {
      getShopDetails(){
           axios
        .get(
          `http://127.0.0.1:8000/api/dashboard/allShopsDetail/${this.shopID}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token2"),
            },
          }
        )
        .then((response) => {
          console.log(response.data.data); 
          console.log(response.data.connectedUser); 
          this.connecteduser = response.data.connectedUser
         this.produits=response.data.data
        })
        .catch((error) => {
          console.log(error.response);
        });
      },
      addToCart(otherProdID){
            //Si on selectionne la quantité la requette se fait, sinon message d'alerte erreur
            if (this.cartInfo.quantity) {
                //On recupere l'id de l'item sur lequel on a cliqué
                console.log(otherProdID,this.cartInfo);
                this.cartInfo.productID=otherProdID
                //On lance la fonction du action
                this.$store.dispatch("addToCartRequest");
                this.shoWErrMessage=false
                
            }else{
                this.shoWErrMessage=true
            }
      }
  },
  computed: {
        ...mapFields(["cartInfo"]),

      }
      
  }
</script>