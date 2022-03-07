<template>
  <div>
    <b-row class="mt-2 mb-4">
      <b-col class="col-2"></b-col>
      <b-col class="col-8">
        <b-button block variant="primary" @click="limpiar">
          Crear nuevo grupo</b-button
        >
      </b-col>
      <b-col class="col-2"></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col class="col-2"
        ><span>{{ accion }}</span></b-col
      >
      <b-col>
        <b-row>
          <!-- <b-col class="col-2">
            <b-form-checkbox
              size="lg"
              id="checkSoloYo"
              v-model="soloYo"
              ><h6 class="mt-1" v-b-tooltip.hover title="Puede ver el grupo la empresa o solo yo">Solo Para Mi</h6></b-form-checkbox
            >
          </b-col> -->
          <b-col class="col-6"
            >Empresa
            <!-- <multiselect
              v-model="Grupo.Empresa"
              :options="empresas"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Selecciona empresa(s)"
              label="nombre"
              track-by="id"
            >
            </multiselect> -->
            <b-form-select
              :disabled="blockCompany === true"
              v-model="Grupo.Empresa"
              :options="empresas"
              value-field="id"
              text-field="nombre"
              :style="darkMode ? 'background-color:#393a42' : null"
              >Empresa</b-form-select
            >
          </b-col>
          <b-col
            >Nombre<b-form-input v-model="Grupo.Nombre"></b-form-input
          ></b-col>
          <b-col
            ><br />
            <b-button
              :disabled="grupoBlock"
              @click="guardar()"
              variant="success"
              >Guardar
            </b-button>
            <!-- <b-button
              v-if="Grupo.Id != -1"
              :disabled="grupoBlock"
              @click="limpiar"
            >
              Cancelar</b-button
            > -->
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <br />
    <b-row>
      <b-col class="col-3"><span>Selecciona Usuarios:</span></b-col>
      <b-col class="col-6">
        <multiselect
          v-model="value"
          :options="usuarios"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          placeholder="Selecciona los usuarios"
          label="nombre"
          track-by="id"
        >
        </multiselect>
      </b-col>
    </b-row>
    <br />
    <b-overlay :show="show" rounded="sm">
      <CDataTable
        :items="Grupos"
        :fields="fields"
        table-filter
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <template #Name="{ item }">
          <td>
            {{ item.Name }}
            <b-button-group class="float-right">
              <b-button @click="editar(item)" variant="primary"
                >Editar</b-button
              >
              <b-button @click="delGrupos(item)" variant="danger" class="ml-2"
                >Eliminar</b-button
              >
            </b-button-group>
          </td>
        </template>
      </CDataTable>
    </b-overlay>
    <b-row> </b-row>
    <div></div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";
export default {
  props: ["limpiarin"],
  components: {
    Multiselect
  },
  data() {
    return {
      blockCompany: false,
      soloYo: 0,
      usuarios: [],
      empresas: [],
      empresasExternas: [],
      show: false,
      value: [],
      accion: "Crear grupo",
      selected: "",
      Grupos: [],
      Grupo: {
        Id: -1,
        Nombre: "",
        Empresa: -1
        // Empresa: [], DESCOMENTAR SI SE UTILIZA EL MULTISELECT DE EMPRESAS XD
      },
      update: false,
      indice: -1,
      fields: [
        {
          key: "Name",
          _style: "min-width:200px",
          sorter: true,
          label: "Nombre"
        }
      ]
    };
  },
  async mounted() {
    this.cargaini();
    this.limpiar();
  },
  computed: {
    ...mapState(["darkMode"]),
    grupoBlock() {
      return this.Grupo.Nombre.length > 2 && this.Grupo.Empresa > 0
        ? false
        : true;
      /*
      CAMBIOS CON EL MULTISELECT QUE HABIA HECHO PERO QUE YA NO ESTAN, POR EL MOMENTO <:D QUEDE PAYASO

      return this.soloYo == 1
        ? this.Grupo.Nombre.length > 2 && this.value.length>0
          ? false
          : true
        : this.Grupo.Nombre.length > 2 && this.Grupo.Empresa.length > 0
        ? false
        : true;
      */
    }
  },
  watch: {
    limpiarin: function() {
      // watch it
      // console.log("entra");
      this.limpiar();
    }
  },
  methods: {
    async getEmpresasExt() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then(res => {
          this.empresasExternas = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.empresa.nombre;
            newObj.id = obj.empresa.id;
            newObj.propietario = obj.Permiso_id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getEmpresas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getempresasback().then(res => {
          // console.log(res);
          this.empresas = res.data.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.id = obj.id;
            newObj.propietario = 1;
            // console.log("empresas: " + newObj.nombre);
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then(res => {
          // console.log(res);
            this.usuarios = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            // newObj.email = obj.email;
            // newObj.telefono = obj.telefono;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async cargaini() {
      this.show = true;
      await this.getUsuarios();
      await this.getEmpresas();
      await this.getEmpresasExt();
      this.empresas = this.empresas.concat(this.empresasExternas);
      for (let emp of this.empresas) {
        await this.getGrupos(emp.id);
      }
      this.Grupos = this.Grupos.flat();
      // console.log(this.Grupos);
      this.show = false;
      // const gr = [... new Set(this.Grupos)]
      // console.log(gr);
      // console.log(this.Grupos);
    },
    selecGrupo() {
      this.$emit("grupoSelect", this.selected);
    },
    editar(item) {
      this.accion = "Editar nombre";
      // console.log(item);
      this.Grupo.Nombre = item.Name;
      this.Grupo.Id = item.id;
      this.Grupo.Empresa = parseInt(item.pivot.company_id);
      this.update = true;
      let ConsUs = {};
      ConsUs.Id = item.id;
      ConsUs.Name = item.Name;
      ConsUs.Company_id = parseInt(item.pivot.company_id);
      this.ConsUsersGrupos(ConsUs);
      this.blockCompany = true;
    },
    async guardar() {
      if (this.update) {
        // this.options[this.indice]=this.nomGrupo
        let actGrupo = {};
        actGrupo.Company_id = this.Grupo.Empresa;
        actGrupo.Name = this.Grupo.Nombre;
        actGrupo.Id = this.Grupo.Id;
        await this.actGroupEmpresas(actGrupo);
      } else {
        // this.options.push(this.nomGrupo)
        let nGrupo = {};
        nGrupo.SoloYo = this.soloYo;
        nGrupo.Company_id = this.Grupo.Empresa;
        nGrupo.Name = this.Grupo.Nombre;
        await this.createGrupos(nGrupo);
      }
      this.limpiar();
    },
    limpiar() {
      this.accion = "Crear grupo";
      this.update = false;
      this.Grupo.Nombre = "";
      this.Grupo.Id = -1;
      this.Grupo.Empresa = [];
      this.value = [];
      this.soloYo = 0;
      this.blockCompany = false;
    },
    async getGrupos(id) {
      try {
        const repo = repoupdateprofileuser();
        let request = {};
        request.Company_id = id;
        await repo.consGroupEmpresas(request).then(res => {
          res.data.length > 0
            ? this.Grupos.push(
                res.data.map(element => {
                  let newObj = {};
                  newObj.id = element.id;
                  newObj.Name = element.Name;
                  newObj.pivot = element.pivot;
                  return newObj;
                })
              )
            : null;
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    async delGrupos(request) {
      try {
        this.show = true;
        let dGrupo = {};
        dGrupo.Company_id = request.pivot.company_id;
        dGrupo.Id = request.id;
        const repo = repoupdateprofileuser();
        await repo.DelGroupEmpresas(dGrupo).then(res => {
          if (res.code == 201) {
            const indice = this.Grupos.findIndex(
              elem => elem.id === request.id
            );
            this.Grupos.splice(indice, 1);
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        this.show = false;
      }
    },
    async createGrupos(request) {
      try {
        const repo = repoupdateprofileuser();
        // console.log(request);
        await repo.creaGroupEmpresas(request).then(res => {
          if (res.code == 201) {
            let addUs = {};
            addUs.Id = res.data.id;
            addUs.Company_id = request.Company_id;
            addUs.Users = this.value.map(elem => elem.id);
            // addUs.SoloYo = this.soloYo;  DESCOMENTAR SI SE VUELVE A ACTIVAR EL CHECK DE SOLO YO Y EL MULTISELECT DE EMPRESAS
            this.addUsersGrupos(addUs);
            this.Grupos.splice(0, this.Grupos.length);
            this.cargaini();
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    async actGroupEmpresas(request) {
      try {
        const repo = repoupdateprofileuser();
        await repo.ActGroupEmpresas(request).then(res => {
          // console.log(res);
          if (res.code == 201) {
            let addUs = {};
            addUs.Id = request.Id;
            addUs.Company_id = request.Company_id;
            addUs.Users = this.value.map(elem => elem.id);
            // console.log(addUs);
            this.addUsersGrupos(addUs);
            this.Grupos.splice(0, this.Grupos.length);
            this.cargaini();
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    async addUsersGrupos(request) {
      try {
        const repo = repoupdateprofileuser();
        await repo.AddUsGroupEmpresas(request).then(res => {
          console.log(res);
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    async ConsUsersGrupos(request) {
      try {
        // console.log(request);
        const repo = repoupdateprofileuser();
        await repo.consUsGrupo(request).then(res => {
          // console.log(res);
          if (res.data.length > 0) {
            this.value = res.data.map(elem => {
              let newObj = {};
              newObj.id = elem.id;
              newObj.nombre = elem.name;
              return newObj;
            });
          } else {
            this.value = [];
          }
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    validaComparar() {
      if (this.soloYo == 1 || this.Grupo.Empresa.length > 0) {
        // console.log("hace validacion");
      } else {
        // console.log("Es cero la variable");
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
