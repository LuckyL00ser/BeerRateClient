<template>
    <v-autocomplete :value="value"
                    v-on:input="updateValue"
                    :items="beerTypes"
                    :label="label"
                    clearable
                    filled
                    rounded
                    no-data-text="Brak rodzajów piwa"
                    chips
                    dense
                    deletable-chips
                    multiple
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
        name: "BeerTypeSelector",
        data(){
            return {
                select:null,
                beerTypes: [],
                loading:false,
            }
        },
        props:{
            invalid:{
                type:Boolean,
                default:false,
            },
            value: {
                type:Array,
                default: ()=>[]
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
            async getBeerTypes(){
                this.loading=true;
                try{
                     const response = await this.$http.get('/api/beer-types');
                     this.beerTypes = response.data;
                }
                catch (e) {
                    this.$store.toast.error(`Podczas ładowania listy rodzajów piw - ${e.response.data.message}`,{duration:4000, position: "bottom-right"})
                }
                this.loading=false;
            }
        },
        created() {
            this.getBeerTypes();
        }
    }
</script>

<style scoped>

</style>
