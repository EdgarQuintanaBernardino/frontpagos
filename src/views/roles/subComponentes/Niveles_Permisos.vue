<template>
  <div>
    <br />
    <b-row style="overflow: hidden">
      <b-col class="">
        <h4>Permisos</h4>
        <b-form-group>
          <template #label>
            <b-form-checkbox
              :disabled="validaPropietario == 1"
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
            <b-form-checkbox
              :disabled="value.chkAdmin || validaPropietario == 1"
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
              :disabled="value.chkAdmin || validaPropietario == 1"
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
      <b-col class="" style="font-size: 94%">
        <h4>Visibilidad</h4>
        {{ value.Tipos }}
        <b-form-checkbox
          @change="tiposSelectAll"
          v-for="option in Tipos.filter(elem => elem.id == 1)"
          :key="option.id"
          :v-model="SelectTodosTipos"
          >{{ option.nombre }}
        </b-form-checkbox>
        <b-form-checkbox-group
          stacked
          checkboxes
          :disabled="validaPropietario == 1"
        >
          <b-form-checkbox
            @change="tiposSelect"
            v-for="option in Tipos.filter(elem => elem.id != 1)"
            v-model="value.Tipos"
            :key="option.id"
            :value="option.id"
            :disabled="blockNiveles.includes(option.id)"
            >{{ option.nombre }}
          </b-form-checkbox>
        </b-form-checkbox-group>
        <div class="mb-3 mt-5">
          <p class="">Indica la visibilidad de los registros</p>
          <div class="justify-content-around">
            <div class="flex-fill mr-sm-2">
              <b-form-checkbox
                :disabled="validaPropietario == 1"
                v-model="chkDesde"
                ><p>
                  {{ chkDesde ? "Desde el inicio" : "Desde" }}
                </p></b-form-checkbox
              >
              <b-form-datepicker
                :disabled="validaPropietario == 1"
                @input="fechaSelect"
                class="mr-lg-3 mb-xs-2"
                v-model="value.FechD"
                v-if="!chkDesde"
                id="fechD"
                today-button
                reset-button
                close-button
                :style="darkMode ? 'background-color:#393a42' : null"
              ></b-form-datepicker>
            </div>
            <div class="flex-fill">
              <b-form-checkbox
                :disabled="validaPropietario == 1"
                v-model="chkHasta"
                ><p>
                  {{ chkHasta ? "Hasta siempre" : "Hasta" }}
                </p></b-form-checkbox
              >
              <b-form-datepicker
                :disabled="validaPropietario == 1"
                v-model="value.FechH"
                class="mr-lg-3"
                v-if="!chkHasta"
                :min="minHasta"
                id="fechH"
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
export default {
  props: {
    per: Object,
    niv: Object,
    perSel: Array,
    nivSel: Object
  },
  data() {
    return {
      Permisos: [],
      Tipos: [],
      value: {
        Permisos: [{ nombre: "", dec: "", id: -1 }],
        Tipos: [],
        FechD: "",
        FechH: "",
        chkAdmin: false
      },
      selectAllTipos: [2, 3, 4, 1],
      SelectTodosTipos: false,
      indeterminate: false,
      allSelected: false,
      chkDesde: true,
      chkHasta: true,
      max: maxDate,
      maxDe: maxDateDesde
    };
  },
  computed: {
    PermisosAdmin() {
      try {
        return this.Permisos.filter(elem => elem.id == 7);
      } catch {
        return [];
      }
    },
    ...mapState(["darkMode"]),
    minHasta() {
      let FechaDesde = new Date(this.value.FechD);
      return new Date(
        FechaDesde.getFullYear(),
        FechaDesde.getMonth(),
        FechaDesde.getDate() + 2
      );
    },
    validaPropietario() {
      return this.$parent.hasOwnProperty("value")
        ? this.$parent.value.Propietario
        : this.$parent.$parent.$parent.value.Propietario;
    },
    blockNiveles() {
      // console.log(this.value.Tipos.sort().join(''));
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
      let val = this.value.Permisos[0];
      if (val == 2 || val == 3 || val == 4 || val == 5 || val == 8) {
        // return [6,7]
        return [];
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
    tiposSelectAll(checked) {
      console.log(checked);
      if (checked) {
        this.value.Tipos = [2, 3, 4];
      } else {
        this.value.Tipos = [];
      }
    },
    chkAdmin() {
      if (this.value.chkAdmin) {
        this.value.Permisos = [2, 3, 4, 5, 8, 9];
      } else {
        this.value.Permisos = [];
      }
    },
    toggleAll(checked) {
      this.value.Permisos = checked
        ? this.Permisos.filter(elem => elem.id !== 7 && elem.id !== 6).map(
            elem => elem.id
          )
        : [];
    },
    fechaSelect() {
      if (this.$parent.hasOwnProperty("value")) {
        this.$parent.value.FechI = this.value.FechD;
        this.$parent.value.FechF = this.value.FechH;
      }
    },
    // permisosSelect() {
    //   this.$emit("permisosSelect", this.value.Permisos);
    // },
    tiposSelect() {
      // if (this.$parent.hasOwnProperty("value")) {
      //   }
      if (this.value.Tipos.sort().join("") == 234) {
        this.$emit("tiposSelect", [1]);
        this.SelectTodosTipos = true;
      } else {
        this.$emit("tiposSelect", this.value.Tipos);
      }
    },
    async getNivelesdeAccesos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consAccesos().then(res => {
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
    "value.Tipos"(newValue) {
      console.log(newValue);
      console.log(this.$parent.$parent.$parent);
      // this.$parent.$parent.$parent.muestraTab = false;
      if (newValue.join("") == 234) {
        this.$emit("tiposSelect", [1]);
      } else {
        this.$emit("tiposSelect", newValue);
      }
    },
    "value.Permisos"(newValue) {
      if (newValue.length === 0) {
        // this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === 6) {
        // this.indeterminate = false;
        this.allSelected = true;
      } else {
        // this.indeterminate = true;
        this.allSelected = false;
      }

      if (this.value.chkAdmin) {
        this.$emit("permisosSelect", [7]);
      } else {
        this.$emit("permisosSelect", newValue);
      }
    },
    "value.FechD"(newValue) {
      if (
        (newValue > this.value.FechH || newValue == this.value.FechH) &&
        this.value.FechH != ""
      ) {
        const fecha = new Date(newValue);
        this.value.FechH = new Date(
          fecha.getFullYear(),
          fecha.getMonth(),
          fecha.getDate() + 2
        );
      }
    },
    perSel(newValue) {
      console.log(this.nivSel);
      console.log(this.nivSel.FechaI);

      this.chkDesde = false;
      this.value.Tipos = [];
      if (newValue.includes(7)) {
        this.value.chkAdmin = true;
        this.value.Permisos = [2, 3, 4, 5, 8, 9];
      } else {
        this.value.chkAdmin = false;
        this.value.Permisos = newValue;
      }
      if (this.nivSel.FechaI == "1") {
        this.chkDesde = true;
      } else {
        this.chkDesde = false;
        this.value.FechD = this.nivSel.FechaI;
      }
      if (this.nivSel.FechaF == "1") {
        this.chkHasta = true;
      } else {
        this.chkHasta = false;
        this.value.FechH = this.nivSel.FechaF;
      }
      console.log(this.nivSel.Visibilidad);
      if (this.nivSel.Visibilidad.includes(1)) {
        this.value.Tipos = [2, 3, 4];
        this.SelectTodosTipos = true;
      } else {
        this.value.Tipos = this.nivSel.Visibilidad;
      }
      console.log(this.value.Tipos);
      // this.value.Tipos = this.nivSel.Visibilidad;
    }
  },
  mounted() {
    if (this.perSel.includes(7)) {
      this.value.chkAdmin = true;
      this.value.Permisos = [2, 3, 4, 5, 8, 9];
    } else {
      this.value.chkAdmin = false;
      this.value.Permisos = this.perSel;
    }
    if (this.nivSel.FechaI == "1") {
      this.chkDesde = true;
    } else {
      this.chkDesde = false;
      this.value.FechD = this.nivSel.FechaI;
    }
    if (this.nivSel.FechaF == "1") {
      this.chkHasta = true;
    } else {
      this.chkHasta = false;
      this.value.FechH = this.nivSel.FechaF;
    }
    console.log(this.nivSel.Visibilidad);
    if (this.nivSel.Visibilidad.includes(1)) {
      this.SelectTodosTipos = true;
      this.value.Tipos = [2, 3, 4];
    } else {
      this.value.Tipos = this.nivSel.Visibilidad;
    }
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
