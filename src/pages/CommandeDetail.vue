<template>
    <div>
        <v-row no-gutters>
                                <v-col
                                    v-for="item in produits"
                                    :key="item.nomProduit"
                                    cols="12"
                                    sm="4"
                                >
                                    <v-card
                                        outlined
                                        tile
                                        class="mx-auto"
                                        max-width="344"
                                    >
                                        <v-img
                                            :src="`/img/${item.imageProduit}`"
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
                                            <p>Quantité: {{item.quantity}}</p>
                                            <!-- Fin Form -->
                                            <v-spacer></v-spacer>

                                            <v-btn icon @click="show = !show">
                                                <v-icon>{{
                                                    show
                                                        ? "mdi-chevron-up"
                                                        : "mdi-chevron-down"
                                                }}</v-icon>
                                            </v-btn>
                                        </v-card-actions>

                                        <v-expand-transition>
                                            <div v-show="show">
                                                <v-divider></v-divider>

                                                <v-card-text>
                                                    {{
                                                        item.descriptionProduit
                                                    }}
                                                </v-card-text>
                                            </div>
                                        </v-expand-transition>
                                    </v-card>
                                </v-col>
                            </v-row>
    </div>
</template>
<script>
export default {
    name:"commande-detail-component",
    props:{
        produits: Array
    },
    data() {
        return {
            right: null,
            cartInfo: {},
            show: false,
            csrf: document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        };
    },
}
</script>
<style>
    
</style>