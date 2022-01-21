<template>
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="ajoutBtn"
                        :color="editProduct? 'success' : 'primary' "
                        v-bind="attrs"
                        v-on="on"
                        >{{editProduct? 'Edit': 'Ajout de produit'}}</v-btn
                    >
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar :color="editProduct? 'success' : 'primary' " dark
                            >{{editProduct? 'Edit': 'Ajout de produit'}}</v-toolbar
                        >
                        <v-card-text>
                            <!-- <div class="text-h2 pa-12">Hello world!</div> -->

                            <!-- Formulaire d'ajout -->
                            <form
                            @submit.prevent="addProduct"
                            >
                                <v-text-field
                                v-model="addPersonalProduct.nomProduit"
                                    name="nomProduit"
                                    label="Nom du Produit"
                                    class="pt-2"
                                />
                                <v-text-field
                                v-model="addPersonalProduct.descriptionProduit"
                                    class="pt-2"
                                    name="descriptionProduit"
                                    label="Description du Produit"
                                ></v-text-field>
                                <input
                                    @change="uploadFile"
                                    ref="file"
                                    name="imageProduit"
                                    type="file"
                                    label="Image du Produit"
                                    class="pt-2"
                                />
                                <v-text-field
                                 v-model="addPersonalProduct.prixProduit"
                                    name="prixProduit"
                                    type="number"
                                    min="1"
                                    label="Prix du Produit"
                                    class="pt-2"
                                ></v-text-field>

                                <v-btn type="submit">Save</v-btn>
                            </form>
                            <!--  -->
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="dialog.value = false"
                                >Close</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
export default {
    name: "CreateProductModal",
    props:{
       editProduct: Boolean,
       id: Number
    },
    data() {
        return {
            addPersonalProduct:{}
        };
    },
    methods: {
        uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    addProduct() {
      let formData = new FormData();
      formData.append("nomProduit", this.addPersonalProduct.nomProduit);
      formData.append("descriptionProduit", this.addPersonalProduct.descriptionProduit);
      formData.append("prixProduit", +this.addPersonalProduct.prixProduit);
      formData.append("imageProduit", this.Images);
      this.editProduct? formData.append("_method", "put") : null;

        if (this.editProduct) {
            //Requete pour modification
            axios
              .post(
                `http://127.0.0.1:8000/api/dashboard/produit/update/${this.id}`,
                formData,
                {headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization": "Bearer " + localStorage.getItem('token2'),
                }}
              )
              .then((response) => {
                console.log(response);
              //Relancer la requete pour le personal shop afin de ne pas devoir recharger la page pour voir le nouvel élément ajouté
              this.$store.dispatch("personalShop");
      
              })
              .catch((error) => {
                console.log(error.response);
              
              })
              ;
        

        } else {
                  //requete pour rajout
            axios
              .post(
                "http://127.0.0.1:8000/api/dashboard/produit/create",
                formData,
                {headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization": "Bearer " + localStorage.getItem('token2'),
                }}
              )
              .then((response) => {
                console.log(response);
              //   this.successMessage = response.data.message;
      
              //Relancer la requete pour le personal shop afin de ne pas devoir recharger la page pour voir le nouvel élément ajouté
              this.$store.dispatch("personalShop");
      
              })
              .catch((error) => {
                console.log(error.response);
              //   this.errorMessage = error.response.data.error.messages.errors;
              })
              ;
        }
    },
    },
};
</script>

<style>
.ajoutBtn {
    background-color: green !important;
}

</style>
