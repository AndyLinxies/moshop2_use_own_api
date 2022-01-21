<template>
    <!-- New -->
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="ajoutBtn"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        >Edit User Informations</v-btn
                    >
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="primary" dark
                            >Modification des informations</v-toolbar
                        >
                        <v-card-text>
                            <!-- <div class="text-h2 pa-12">Hello world!</div> -->

                            <!-- Formulaire d'ajout -->
                            <form
                                :action="`/dashboard/profile/${profile.id}/update`"
                                enctype="multipart/form-data"
                                method="post"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    :value="csrf"
                                />
                                <input
                                    type="hidden"
                                    name="_method"
                                    value="PUT"
                                />
                                

                                <v-text-field
                                    name="firstName"
                                    label="First Name"
                                />
                                <v-text-field
                                    name="lastName"
                                    label="Last Name"
                                ></v-text-field>
                                <v-text-field
                                    name="email"
                                    label="Email"
                                ></v-text-field>
                                <v-text-field
                                    name="picture"
                                    type="file"
                                    label="Image de profil"
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
    <!-- fin New -->
</template>
<script>
export default {
    name: "UserEditModal",
    props: {
        // showEditModal: Boolean,
        profile: Object,
    },
    data() {
        return {
            
        };
    },
};
</script>
<style></style>

