<template>
  <div>
    <br />
    <b-row style="overflow: hidden">
      <b-row v-if="!showall" class="pl-5">
      <b-col>
        <h4 style="text-align:center">Permisos</h4>
        <!-- Seleccionado {{ value.Permisos }} -->
        <b-form-group>
          <template #label>
            <b-row class="p-2 m-0" v-if="!showadmin">
            <b-form-checkbox

              v-model="value.chkAdmin"
              v-for="option in PermisosAdmin"
              :key="option.id"
              aria-describedby="flavours2"
              aria-controls="flavours"
              @change="chkAdmin"
            >
              {{ option.nombre }}
              <p class="descrip">
                {{ option.desc }}
              </p>
            </b-form-checkbox>
            </b-row>
            <b-form-checkbox
              v-model="allSelected"
              v-for="option in Permisos.filter(elem => elem.id == 6)"
              :key="option.id"
              :indeterminate="indeterminate"
              aria-describedby="flavours2"
              aria-controls="flavours"
              @change="toggleAll"
            >
              {{ option.nombre }}
            </b-form-checkbox>
          </template>

          <template v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              id="flavors"
              v-model="value.Permisos"
              :options="Permisos.filter(elem => elem.id != 6 && elem.id != 7)"
              :aria-describedby="ariaDescribedby"
              text-field="nombre"
              value-field="id"
              name="flavors"
              class="ml-4"
              aria-label="Individual flavours"
              stacked
            ></b-form-checkbox-group>
          </template>
        </b-form-group>
      </b-col>
      <b-col style="font-size: 94%">
        <h4 style="text-align:center">Visibilidad</h4>
        <!-- Visibilidad -->
        <!-- Seleccionado {{ value.Tipos }} -->
        <b-form-checkbox
         :disabled="Propietario || Bandera"
          :checked="TodosTipos"
          @change="tiposSelectAll"
          v-for="option in Tipos.filter(elem => elem.id == 1)"
          :key="option.id"
          :v-model="true"
          >{{ option.nombre }}
        </b-form-checkbox>
        <b-form-checkbox-group stacked checkboxes :disabled="Propietario">
          <b-form-checkbox
            @change="tiposSelect"
            v-for="option in Tipos.filter(elem => elem.id != 1)"
            v-model="value.Tipos"
            :key="option.id"
            :value="option.id"
            :disabled="blockNiveles.includes(option.id) || Bandera"
            >{{ option.nombre }}
          </b-form-checkbox>
        </b-form-checkbox-group>
        <div class="mb-3 mt-5">
          <p class="">Indica la visibilidad de los registros</p>
          <div class="justify-content-around">
            <div class="flex-fill mr-sm-2">
              <b-form-checkbox
                :disabled="Propietario || Bandera"
                v-model="value.FechD"
                @input="cambia2"
                 value="1"
            :unchecked-value="actual"
                ><p>
                  {{ value.FechD==1 ? "Desde el inicio"  : "Desde "+ value.FechD  }}

                </p></b-form-checkbox
              >
              <!-- @input="fechaSelect" -->
              <b-form-datepicker
                :disabled="Propietario || Bandera"
                class="mr-lg-3 mb-xs-2"
                v-model="value.FechD"
                v-if="value.FechD!=1"
                id="fechD"
                today-button
                reset-button
                close-button
                :style="darkMode ? 'background-color:#393a42' : null"
              ></b-form-datepicker>
            </div>
            <div class="flex-fill">
              <b-form-checkbox
                v-model="value.FechH"
                       value="1"
            :unchecked-value="minHasta"
                ><p>
                  {{ value.FechH==1 ? "Hasta siempre" : "Hasta "+value.FechH }}
                </p></b-form-checkbox
              >
              <b-form-datepicker
                v-model="value.FechH"
                class="mr-lg-3"
                v-if="value.FechH!=1"
                today-button
                reset-button
                close-button
                :style="
                  darkMode ? 'background-color:#393a42; color: red;' : null
                "
              ></b-form-datepicker>
            </div>
          </div>
        </div>
      </b-col>
      <!-- Boton de crear permiso -->
     </b-row>
      <b-col class="col-12" >
        <CButton
          v-if="Bandera === false && Bandera2 === false"
          class="mt-2"
          block
          color="primary"

          @click="passEvent"
          :disabled="
            value.Permisos.length === 0 ||
              value.Tipos.length === 0 ||
              value.FechH.length === 0 ||
              value.FechD.length === 0 ||
              Bandera
          "
          >{{ titleButton }}</CButton
        >
        <CButton
          v-if="Bandera === false && Bandera2 === true"
          class="mt-2"
          block
          color="success"
          @click="EditarPermisos"
          :disabled="
            value.Permisos.length === 0 ||
              value.Tipos.length === 0 ||
              value.FechH.length === 0 ||
              value.FechD.length === 0 ||
              Bandera
          "
          >{{ titleButton }}</CButton
        >
      </b-col>

    </b-row>
  </div>
</template>

<script>
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const maxDate = new Date(today);
const maxDateDesde = new Date(today.setDate(maxDate.getDate() - 1));

import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
import moment from "moment";

export default {
  // props: {
  // per: Object,
  // niv: Object,
  // perSel: Array,
  // nivSel: Object,
  // PermisosProp: Object,
  // titleButton: String,
  // },
  props: ["titleButton", "checkAdmin","tipopermiso","adduser"],
  data() {
    return {
      temp:{},
      allpermisos:true,
      add_user:false,
      tipopermisoin:false,
      // Bloquear al editar en el componente padre
      Bandera: false,
      Bandera2: false,
      // Todos los tipos en visibilidad
      TodosTipos: false,
      checkAdmi: false,
      Propietario: false,
      Permisos: [],
      Tipos: [], //Tipos es la visibilidad que se le esta dando
      value: {
        Permisos: [],
        Tipos: [],
        FechD: "1",
        FechH: "1",
        chkAdmin: false
      },
      selectAllTipos: [2, 3, 4, 1],
      SelectTodosTipos: false,
      indeterminate: false,
      allSelected: false,
      chkDesde: true,
      chkHasta: true,
      max: maxDate,
      maxDe: maxDateDesde,
      // Validaciones de las fechas
      AllDateS: true,
      AllDateE: true,
      Owner: false
    };
  },
  computed: {
    minHasta() {
      // return moment("2022/05/12").format('l');
      // console.log("min asta")
      // return new Date();
      // console.log("inicia min")
     let inicia=this.value.FechD;
     let fechahoy;
console.log(this.temp, "temp")
console.log(this.value,"value")
         if(inicia==1){
           console.log("aqui debe de entrar")
       fechahoy=moment().add('1','days').format('L').split('/');
       console.log(fechahoy)
         }
         if(moment(this.temp.FechaF).diff(moment(this.value.FechH),'days')>0){

           console.log("retorno",moment(this.temp.FechaF).diff(moment(this.value.FechH),'days'));
           return this.temp.FechaF
         }

     fechahoy=moment(inicia).add('1','days').format('L').split('/');
     let temp=fechahoy[0];
     fechahoy[0]=fechahoy[1];
     fechahoy[1]=temp;
console.log(fechahoy.reverse().join('/'))

     return fechahoy.reverse().join('/');

   },

    showadmin(){
   return this.$store.getters.getAdminNo   ///¿quitar admin?

    },
    showall(){
      let allpermisos= this.$store.getters.get_Sin_Permisos;
        if(allpermisos){
          this.value= {
        Permisos: [2,3],
        Tipos: [1],
        FechD: "1",
        FechH: "1",
        chkAdmin: false
      }
        }else{
          this.value={
        Permisos: [],
        Tipos: [],
        FechD: "1",
        FechH: "1",
        chkAdmin: false
      }
        }
        return this.$store.getters.get_Sin_Permisos;
    },
    PermisosAdmin() {
      try {
        return this.Permisos.filter(elem => elem.id == 7);
      } catch {
        return [];
      }
    },
    ...mapState(["darkMode"]),
    actual(){
     // return "2022-06-15"
      let fechahoy=moment().format('L').split('/');
      let temp=fechahoy[0];
      fechahoy[0]=fechahoy[1];
      fechahoy[1]=temp;

//console.log(fechahoy.reverse().join('-'))

//console.log(fechahoy.reverse().join('-'))

      return fechahoy.reverse().join('-');
     return moment().format('L').split('/').reverse().join('-');
    },

    // validaPropietario() {
    //   return this.$parent.hasOwnProperty("value")
    //     ? this.$parent.value.Propietario
    //     : this.$parent.$parent.$parent.value.Propietario;
    // },
    blockNiveles() {
      // Logica en la visubilidad del modulo de permisos
      if (this.value.Tipos.join("") == 234) {
        return [2, 3, 4];
      } else if (this.value.Tipos[0] == 4 && this.value.Tipos[1] == 2) {
        return [3, 1];
      } else if (this.value.Tipos[0] == 4 && this.value.Tipos[1] == 3) {
        return [2, 1];
      } else if (this.value.Tipos[0] == 1) {
        return [2, 3, 4];
      } else if (this.value.Tipos[0] == 2) {
        return [3, 1];
      } else if (this.value.Tipos[0] == 4) {
        return [1];
      } else if (this.value.Tipos[0] == 3 || this.value.Tipos[0] == 4) {
        return [1, 2];
      } else {
        return [];
      }
    },
    blockPermisos() {
      // Logica en la permisos del modulo de permisos
      let val = this.value.Permisos[0];
      if (val == 2 || val == 3 || val == 4 || val == 5 || val == 8) {
        return [6, 7];
        // return [];
      } else if (val == 6) {
        // this.value.Permisos=[2,3,4,5];
        // return [2,3,4,5,7,8,9]
        return [];
      } else if (val == 7) {
        // return [2,3,4,5,6,8,9]
        return [];
      } else {
        return [];
      }
    }
  },
  methods: {
    cambia2(val){
      console.log("dispoara el evento input", val)
    let inicia=this.value.FechH;
          if(inicia==1){
            console.log("errir")
            return false;
          }

//   let fechahoy=moment(val).add('1','days').format('L').split('/');
//       let temp=fechahoy[0];
//       fechahoy[0]=fechahoy[1];
//       fechahoy[1]=temp;

// //console.log(fechahoy.reverse().join('-'))
//       this.value.FechH=fechahoy.reverse().join('-');
    },
    EditaPermisos(op) {
      if (op === 1) {
        this.Bandera = true;
      }
      if(op === 2){
        this.Bandera = false;
        this.Bandera2 = true;
      }
    },
    ClearNiveles() {
      this.value.Permisos = [];
      this.value.Tipos = [];
      this.TodosTipos = false;
      // this.chkAdmin = false;
    },
    // Pintar valores editados
    PintarEditado(value) {
        this.temp=value;
        this.TodosTipos=false;
        console.log("pintar editado",value)
          this.value.Permisos = value.Permisos;

      //Se pinta la Visibilidad
      if (value.Visibilidad==1) { /// Si ESTA
        this.value.Tipos = [2, 3, 4];
        this.TodosTipos = true;
      }else if(value.Visibilidad==24){
         this.value.Tipos = [2, 4];
         console.log("si entro en 24")
      }
      else if(value.Visibilidad==34){
         this.value.Tipos = [3,4];
      }
       else {
         this.value.Tipos=[];
        this.value.Tipos.push(value.Visibilidad);
      }
      // Se pintan las fechas como llegan
      if(value.FechaI==1){
        console.log("entra en el 1")
       this.chkDesde =true;
       this.value.FechD =value.FechaI;
      }else{
        console.log("normal")
        this.chkDesde =false;
        this.value.FechD=value.FechaI;
      }
      if(value.FechaF==1){
       this.chkHasta =true;
       this.value.FechH =value.FechaF;
      }else{
      this.value.FechH =value.FechaF;
      }
      console.log("terminando el seteo",this.value)
    //  this.chkHasta = value.CheckHasta;

      // this.value.FechD = value.FechaI;
      // this.value.FechH = value.FechaF;

      // if (value.Visibilidad == 24) {
      //   this.value.Tipos = [2, 4];
      // }
      // if (value.Visibilidad == 34) {
      //   this.value.Tipos = [3, 4];
      // }
      // if (value.Visibilidad == 2) {
      //   this.value.Tipos = [2];
      // }
      // if (value.Visibilidad == 4) {
      //   this.value.Tipos = [4];
      // }
      // if (value.Visibilidad == 3) {
      //   this.value.Tipos = [3];
      // }

      //Se pintan los valores de las fechas
      // this.value.FechD = value.FechaI;
      // this.value.FechH = value.FechaF;
      // Validar desde siempre
      // if (value.FechaI == 1) {
      //   this.chkDesde = true;
      // }
      // if(value.FechaF == 1){
      //   this.chkHasta = true;
      // }
      // if()
      // else {
      //   this.chkDesde = false;
      // }
      // if (value.FechaI != 1) {
      //   // this.chkDesde = false;
      //   this.value.FechD = value.FechaI;
      // }
      // if (value.FechaF != 1) {
      //   this.chkHasta = false;
      // }
      // else {
      //   this.chkHasta = false;
      // }
      // if (value.FechaF != 1) {
      //   // this.chkHasta = false;
      //   this.value.FechH = value.FechaF;
      // }
    },
    SelectOwner(id) {
      if (id === 1) {
        this.value.Permisos = [2, 3, 4, 5, 8, 9];
        this.value.Tipos = [2, 3, 4];
        this.value.chkAdmin = true;
        this.SelectTodosTipos = true;
        this.Propietario = true;
        this.TodosTipos = true;
      }
      if (id === 2) {
        this.value.Permisos = [];
        this.value.Tipos = [];
        this.value.chkAdmin = false;
        this.SelectTodosTipos = false;
        this.Propietario = false;
        this.TodosTipos = false;
      }
    },
    passEvent() {

      this.$emit("EditPer", this.value);

    },
    EditarPermisos() {

      this.$emit("EditPer", this.value);
    },
    // CONSULTA LAS ACCIONES DE UN PERMISO AL EDITAR UNO DE ESTOS
    ConsultaNiveles() {
      console.log("AQUI SE IMPRIME LOS PERMISOS");
    },
    tiposSelectAll(checked) {
      console.log(checked);
      if (checked) {
        this.TodosTipos = true;
        this.value.Tipos = [2, 3, 4];
      } else {
        this.value.Tipos = [];
      }
    },
    chkAdmin(op) {
      if (this.value.chkAdmin) {
        this.value.Permisos = [2, 3, 4, 5, 7, 8, 9];
        // this.value.Permisos = [2, 3, 4, 5, 8, 9];
        // this.value.Permisos = [2, 3, 4, 5, 8, 9];
        this.value.Tipos = [2, 3, 4];
        this.value.chkAdmin = true;
        this.SelectTodosTipos = true;
        this.TodosTipos = true;
      } else {
        this.value.Permisos = [];
      }
      //Pintar la tabla de editar con los datos del admin
      if (op == 1) {
        this.value.Permisos = [2, 3, 4, 5, 7, 8, 9];
        this.value.chkAdmin = true;
        this.SelectTodosTipos = true;
        this.TodosTipos = true;
      }
    },
    toggleAll(checked) {
      this.value.Permisos = checked
        ? this.Permisos.filter(elem => elem.id !== 7 && elem.id !== 6).map(
            elem => elem.id
          )
        : [];
    },
    // fechaSelect() {
    //   // console.log(id);
    //   if (this.$parent.hasOwnProperty("value")) {
    //     this.$parent.value.FechI = this.value.FechD;
    //     this.$parent.value.FechF = this.value.FechH;
    //   }
    // },
    // Validacion en caso que este desde el incio de los tiempos
    AllDate(id) {
      if (id === 1) {
        this.AllDateS = !this.AllDateS;
        if (this.AllDateS === true) {
          this.value.FechD = "1";
        } else {
          console.log("all date")
        //  this.value.FechD = "";
        }
      }
      if (id === 2) {
        this.AllDateE = !this.AllDateE;
        if (this.AllDateE === true) {
          this.value.FechH = "1";
        } else {
          //this.value.FechH = "";
        }
      }
    },
    tiposSelect() {
      // console.log(id);
      // this.value.Tipos = id;
      // console.log(this.value.Tipos);
      console.log("tiposselect")
      if (this.value.Tipos.sort().join("") == 234) {
        this.$emit("tiposSelect", [1]);
        this.SelectTodosTipos = true;
      } else {
        this.$emit("tiposSelect", this.value.Tipos);
      }
    },
    Cargapermisos(val){
    this.tipopermisoin=val;
    },
    async getNivelesdeAccesos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consAccesos().then(res => {
          console.log("tipos")
          console.log(res)
          this.Tipos = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.Name;
            newObj.id = obj.id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getPermisos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consPermisos().then(res => {
          this.Permisos = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            newObj.desc = obj.descripcion;
            return newObj;
          });
          this.Permisos = this.Permisos.filter(elem => elem.id !== 1);
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    }
  },
  watch: {
     adduser:function(newval,oldval){ /// aqui vamos a decirle al componente que es add user porque no entiendo el codigo pasado para no retrasar voy a dividir
          this.Propietario=newval;
          console.log("propietario")
    },
    tipopermiso:function(newval,oldval){ /// aqui vamos a mandar si es normal o admin, en caso que sea admin o propietario no se van a dar permisos normales
          this.tipopermisoin=newval;
          console.log("tipo permisos =?====")
    },
    ValuesProp: function() {},
    // "value.Tipos"(newValue) {
    //   // console.log(newValue);
    //   // console.log(this.$parent.$parent.$parent);
    //   // this.$parent.$parent.$parent.muestraTab = false;
    //   if (newValue.join("") == 234) {
    //     this.$emit("tiposSelect", [1]);
    //   } else {
    //     this.$emit("tiposSelect", newValue);
    //   }
    // },
    // "value.Permisos"(newValue) {
    //   if (newValue.length === 0) {
    //     // this.indeterminate = false;
    //     this.allSelected = false;
    //   } else if (newValue.length === 6) {
    //     // this.indeterminate = false;
    //     this.allSelected = true;
    //   } else {
    //     // this.indeterminate = true;
    //     this.allSelected = false;
    //   }

    //   if (this.value.chkAdmin) {
    //     this.$emit("permisosSelect", [7]);
    //   } else {
    //     this.$emit("permisosSelect", newValue);
    //   }
    // },
    // "value.FechD"(newValue) {
    //   if (
    //     (newValue > this.value.FechH || newValue == this.value.FechH) &&
    //     this.value.FechH != "1"
    //   ) {
    //     const fecha = new Date(newValue);
    //     this.value.FechH = new Date(
    //       fecha.getFullYear(),
    //       fecha.getMonth(),
    //       fecha.getDate() + 2
    //     );
    //   }
    // }
    // perSel(newValue) {
    //   console.log(this.nivSel);
    //   console.log(this.nivSel.FechaI);
    //   this.chkDesde = false;
    //   this.value.Tipos = [];
    //   if (newValue.includes(7)) {
    //     this.value.chkAdmin = true;
    //     this.value.Permisos = [2, 3, 4, 5, 8, 9];
    //   } else {
    //     this.value.chkAdmin = false;
    //     this.value.Permisos = newValue;
    //   }
    //   if (this.nivSel.FechaI == "1") {
    //     this.chkDesde = true;
    //   } else {
    //     this.chkDesde = false;
    //     this.value.FechD = this.nivSel.FechaI;
    //   }
    //   if (this.nivSel.FechaF == "1") {
    //     this.chkHasta = true;
    //   } else {
    //     this.chkHasta = false;
    //     this.value.FechH = this.nivSel.FechaF;
    //   }
    //   // console.log(this.nivSel.Visibilidad);
    //   if (this.nivSel.Visibilidad.includes(1)) {
    //     this.value.Tipos = [2, 3, 4];
    //     this.SelectTodosTipos = true;
    //   } else {
    //     this.value.Tipos = this.nivSel.Visibilidad;
    //   }
    //   // console.log(this.value.Tipos);
    //   // this.value.Tipos = this.nivSel.Visibilidad;
    // }
  },
  mounted() {
    // this.checkAdmi = this.checkAdmin;
    // console.log(this.titleButton);
    // console.log(this.value);
    // console.log("usamos mounted");
    // console.log(this.perSel)
    // if (this.perSel.includes(7))
    // No usar esta misma funcion en las 2 ventanas
    // if(this.perSel.some(elem => elem === 7))
    // {
    //   this.value.chkAdmin = true;
    //   this.value.Permisos = [2, 3, 4, 5, 8, 9];
    // } else {
    //   this.value.chkAdmin = false;
    //   this.value.Permisos = this.perSel;
    // }
    // if (this.nivSel.FechaI == "1") {
    //   this.chkDesde = true;
    // } else {
    //   this.chkDesde = false;
    //   this.value.FechD = this.nivSel.FechaI;
    // }
    // if (this.nivSel.FechaF == "1") {
    //   this.chkHasta = true;
    // } else {
    //   this.chkHasta = false;
    //   this.value.FechH = this.nivSel.FechaF;
    // }
    // console.log(this.nivSel.Visibilidad);
    // if (this.nivSel.Visibilidad.includes(1)) {
    //   this.SelectTodosTipos = true;
    //   this.value.Tipos = [2, 3, 4];
    // } else {
    //   this.value.Tipos = this.nivSel.Visibilidad;
    // }

  },
  async created() {
    await this.getNivelesdeAccesos();
    await this.getPermisos();
  }
};
</script>

<style>
.descrip {
  color: rgb(139, 139, 139);
  font-size: 0.8rem;
  display: table-cell;
}
</style>
