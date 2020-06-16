<template>
    <v-autocomplete :value="value"
                    v-on:input="updateValue"
                    :items="breweries"
                    :label="label"
                    clearable
                    filled
                    dense
                    rounded
                    no-data-text="Brak browarów"
                    :error-messages="errors"
                    :error="invalid"
                    item-text="name"
                    :return-object="true"
    >
        <template v-slot:item="{  item }">
            {{item.name}}
        </template>
    </v-autocomplete>

</template>

<script>
    export default {
        name: "BrewerySelector",
        data(){
            return {
                select:null,
                breweries: [],
                loading:false
            }
        },
        props:{
            invalid:{
                type:Boolean,
                default:false,
            },
            value: {
                type:Object,
                default: ()=>{}
            },
            errors:{
                type: Array,
                default: ()=>[]
            },
            label:{
                type:String,
            }
        },
        methods:{
            updateValue: function (value) {
                this.$emit('input', value)
            },
            async getBreweries(){
                this.loading=true;
                try{
                    const response = await this.$http.get('/api/breweries');
                    this.breweries = response.data;
                }
                catch (e) {
                    console.error(e);
                }

                this.loading=false;
            }
        },
        created() {
            this.getBreweries();
        }
    }
</script>

<style scoped>

</style>
