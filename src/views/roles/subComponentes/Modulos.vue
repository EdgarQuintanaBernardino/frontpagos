<template>
  <div >
    <b-button-group vertical style="width: 100%;" class="mt-2 mb-2" >
        <b-button :pressed="Deptos.id === option.id ? true : false"  variant="light" class="block" v-for="option in Departamentos" :key="option.id" @click="continuar(option)"><h5>{{ option.nombre }}</h5></b-button>
    </b-button-group>
  </div>
</template>

<script>
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from 'vuex';
export default {
    props:{
        Deptos:Object,
    },
    data() {
        return {
            Departamentos:[],
        }
    },
    methods:{
        continuar(data){
            this.$emit("ModSelect", data);
        },
        async getDepartamentos() {
            try {
                const repo = repoupdateprofileuser();
                await repo.consDeparamentos().then((res) => {
                    this.Departamentos = res.data.map(function (obj) {
                        let newObj = {};
                        newObj.nombre = obj.Name;
                        newObj.id = obj.id;
                        return newObj;
                    });
                });
            } catch (error) {
                //         console.log(error);
            } finally {//
            }
        },
    },
    computed:{
        ...mapState(["darkMode"]),
    },
    async mounted() {
        await this.getDepartamentos();
    },

}
</script>

<style>
.BGL{
  background: #3c4b64;
  color: white;
  border-radius: 10px;
  width: 100%;
}

.BGD{
  background: #23242d;
  border-radius: 10px;
}
</style>
