<template>
  <div>
    <CCard>
      <CCardHeader class="d-flex">
        <h3 class="">Permisos</h3>
        <CButton class="ml-auto" @click="modalGrupos = true" color="success"
          >Nuevo permiso</CButton
        >
      </CCardHeader>
      <CCardBody>
        <b-overlay :show="show" rounded="sm">
          <template v-slot:overlay>
            <div class="text-center">
              <b-icon
                icon="stopwatch"
                font-scale="3"
                animation="cylon"
              ></b-icon>
              <p id="cancel-label">Cargando...</p>
            </div>
            <!--Inicio del formulario-->
          </template>
          <CDataTable
            :items="items"
            :fields="columns"
            column-filter
            :items-per-page="10"
            hover
            sorter
            pagination
            :table-filter="{
              external: true,
              lazy: true,
              placeholder: 'Buscar en toda la Tabla',
              label: 'Buscar:'
            }"
          >
            <template #empresa="{item}">
              <td>
                <p>
                  {{
                    item.hasOwnProperty("empresa") ? item.empresa.nombre : ""
                  }}
                </p>
              </td>
            </template>
            <template #acciones="{item}">
              <td>
                <b-button-group>
                  <b-button @click="getPermisosUsuario(item)" variant="primary"
                    >Usuarios</b-button
                  >
                  <b-button @click="delGrupo(item.id)" variant="danger"
                    >Eliminar</b-button
                  >
                </b-button-group>
              </td>
            </template>
          </CDataTable>
        </b-overlay>
        <CModal
          title="Nuevo permiso"
          size="xl"
          :show.sync="modalGrupos"
          @update:show="inicio()"
        >
          <asigna-roles-permisos></asigna-roles-permisos>
          <template #footer class="invisible">
            <CButton></CButton>
          </template>
        </CModal>
        <CModal
          :title="grupoEdit.nombre"
          size="lg"
          :show.sync="modalUsuarios"
          @update:show="LimpiarModal()"
        >
          <!-- {{Object.keys(grupoEdit).length===0?'':grupoEdit.users[tabsel]}} -->
          <tabs
            v-if="Object.keys(grupoEdit).length !== 0"
            titulo="nombre"
            :data="grupoEdit.usuarios"
            llave="id"
            @tabSel="cambiatab"
            direccion="h"
            form="Agregar usuarios"
          >
            <div slot="contenido" v-if="tabsel > -1">
              <div class="d-flex justify-content-around">
                <div>
                  <b-form-checkbox
                    :disabled="value.Propietario == 1"
                    v-model="AplicaTodos"
                    name="check-button"
                    switch
                    size="lg"
                  >
                    {{
                      AplicaTodos
                        ? "Se aplicará a todos los usuarios"
                        : "Aplicar a todos los usuarios"
                    }}
                  </b-form-checkbox>
                </div>
                <div>
                  <b-button-group>
                    <CButton color="danger" @click="EliminaUsu()"
                      >Borrar usuario</CButton
                    >
                    <CButton
                      :disabled="value.Propietario == 1"
                      color="success"
                      @click="GuardarCambios()"
                      >Guardar</CButton
                    >
                  </b-button-group>
                </div>
              </div>
              <!-- <p v-for="elem in grupoEdit.usuarios">{{elem}}</p> -->
              <nivelesPermisos
                v-if="muestraTab"
                :perSel="grupoEdit.usuarios[this.tabsel].permisos"
                :nivSel="grupoEdit.usuarios[this.tabsel].Visibilidad"
                @permisosSelect="selectPermisos"
                @tiposSelect="selectTipos"
              ></nivelesPermisos>
            </div>
            <div slot="form" v-if="tabsel == -1">
              <GruposyUsuarios
                v-if="Object.keys(grupoEdit).length !== 0 && muestraTab"
                :empresa="grupoEdit.Empresa"
              >
              </GruposyUsuarios>
              <b-button class="col-12" variant="info"
                >Agregar usuarios</b-button
              >
            </div>
          </tabs>

          <template #footer>
            <CButton></CButton>
          </template>
        </CModal>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
import AsignaRolesPermisos from "./AsignaRolesPermisos.vue";
import tabs from "./subComponentes/tabs";
import nivelesPermisos from "./subComponentes/Niveles_Permisos";
import alertas from "../../assets/repositoriosjs/alertas";
import GruposyUsuarios from "./subComponentes/GruposyUsuarios";

export default {
  components: {
    AsignaRolesPermisos,
    tabs,
    nivelesPermisos,
    GruposyUsuarios
  },
  data() {
    return {
      value: {
        Propietario: 0
      },
      options: [
        { text: "Radio 1", value: "radio1" },
        { text: "Radio 3", value: "radio2" },
        { text: "Radio 4", value: "radio4" }
      ],
      AplicaTodos: false,
      muestraTab: false,
      sh: false,
      allSelected: false,
      visibilidad: false,
      show: false,
      tabsel: -2,
      Permisos: [],
      Tipos: [],
      modalGrupos: false,
      modalUsuarios: false,
      Empresas: [],
      items: [],
      grupoEdit: {},
      selected: "",
      columns: [
        {
          key: "id",
          label: "N° de permiso",
          class: "text-center"
        },
        {
          key: "nombre",
          label: "Nombre del permiso",
          class: "text-center"
        },
        {
          key: "empresa",
          label: "Pertenece a",
          sorter: true,
          class: "text-center"
        },
        {
          key: "acciones",
          label: "Acciones",
          style: "justify-content: center;",
          filter: false,
          sorter: false
        }
      ]
    };
  },
  computed: {
    ...mapState(["darkMode"])
  },
  async created() {
    await this.inicio();
  },
  methods: {
    async GuardarCambios() {
      let grupo = this.grupoEdit;
      let usuario = grupo.usuarios[this.tabsel];
      let request = {};
      request.User = usuario.id;
      request.Permission_id = grupo.id;
      request.Visibility_id = usuario.Visibilidad.Visibilidad.sort().join("");
      request.Permissions_id = usuario.permisos;
      request.Model_id = [];
      request.Date1 = usuario.Visibilidad.FechaI;
      request.Date2 = usuario.Visibilidad.FechaF;
      request.All = this.AplicaTodos;
      console.log(request);
      const alert = alertas();
      try {
        const repo = repoupdateprofileuser();
        await repo.ActPermisosUsuario(request).then(res => {
          if (res.code == 201) {
            alert.PermisosOK({
              Tit: "Permisos",
              Text: "Permisos actualizados correctamente",
              icono: "success"
            });
            this.modalUsuarios = false;
          }
        });
      } catch {
        alert.PermisosOK({
          Tit: "Permisos",
          Text: "Ocurrio un error",
          icono: "error"
        });
      }
    },
    async AgregarUsuario(){
      //
    },
    async EliminaUsu() {
      let newObj = {};
      newObj.Permission_id = this.grupoEdit.id;
      newObj.User_id = this.grupoEdit.usuarios[this.tabsel].id;
      try {
        const repo = repoupdateprofileuser();

        await repo.DelUsuarioGrupo(newObj).then(res => {
          this.grupoEdit.usuarios.length > 1
            ? (this.grupoEdit.usuarios = this.grupoEdit.usuarios.filter(
                elem => elem.id !== newObj.User_id
              ))
            : (this.modalUsuarios = false);
          this.grupoEdit.usuarios.length > 0 && this.tabsel > 0
            ? (this.tabsel = this.tabsel - 1)
            : (this.modalUsuarios = false);
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    },
    selectPermisos(data) {
      console.log(data);
      this.grupoEdit.usuarios[this.tabsel].permisos = data;
      if (!data.includes(7)) {
        this.muestraTab = false;
        this.muestraTab = true;
      }
    },
    selectTipos(data) {
      // this.grupoEdit.usuarios[this.tabsel].permisos = data;
      // console.log(this.grupoEdit.usuarios);
      console.log(data);
      this.grupoEdit.usuarios[this.tabsel].Visibilidad.Visibilidad = data;
      console.log(this.grupoEdit.usuarios[this.tabsel]);
      // if (!data.includes(7)) {
      // }
    },
    LimpiarModal() {
      console.log("se limpio");
      this.tabsel = -1;
      this.grupoEdit = {};
      this.AplicaTodos = false;
    },
    async creaJSON() {
      let request = {};
      request.Permission_id = this.value.GrupoPermiso.Id;
      request.Account_id = this.value.Cuenta.id;
      request.Model = this.value.Departamentos.id;
      request.Visibility_id = 1;
      request.Permissions_id = [1, 2];
      request.Model_id = [];
      request.User = 1;
      request.Company_id = 1;
      request.Date1 = 1;
      request.Date2 = 1;
      request.All = false;
    },
    async inicio() {
      this.show = true;
      this.Permisos = [];
      this.Empresas = [];
      this.Tipos = [];
      this.items = [];
      await this.getPermisos();
      await this.getNivelesdeAccesos();
      await this.getEmpresas();
      console.log(this.Empresas);
      for (let emp of this.Empresas) {
        await this.getGrupos(emp.id);
      }
      this.items = this.items.flat();
      console.log(this.items);
      this.items = this.items.map(element => {
        let newobj = {};
        newobj.id = element.id;
        newobj.nombre = element.nombre;
        newobj.empresa = this.Empresas.find(
          emp => emp.id == element.pivot.company_id
        );
        return newobj;
      });
      this.show = false;
      console.log("se cargó");
    },
    cambiatab(data) {
      this.muestraTab = false;
      this.tabsel = data;
      this.muestraTab = true;
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
    async getEmpresas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getempresasback().then(res => {
          this.Empresas = res.data.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.id = obj.id;
            newObj.propietario = 1;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getGrupos(id) {
      try {
        const repo = repoupdateprofileuser();
        await repo.consGroup(id).then(res => {
          // return res;
          this.items.push(res.data);
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getPermisosUsuario(item) {
      try {
        console.log(item);
        const repo = repoupdateprofileuser();
        await repo.ConsPermisosUsuario({ Permission_id: item.id }).then(res => {
          console.log(res);
          this.grupoEdit.usuarios = res.data.map(elem => {
            let newObj = {};
            newObj.id = elem.id;
            newObj.nombre = elem.name;
            newObj.permisos = elem.Permissions.map(elem => elem.Permissions_id);
            newObj.Visibilidad = {
              // FechaI: elem.Permissions.map(elem => elem.Date1),
              // FechaF: elem.Permissions.map(elem => elem.Date2),
              FechaI: elem.Permissions[0].Date1,
              FechaF: elem.Permissions[0].Date2,
              Visibilidad: JSON.stringify(elem.Permissions[0].Visibility_id)
                .split("")
                .map(elem => parseInt(elem))
            };
            console.log(newObj.Visibilidad);
            return newObj;
          });
          this.grupoEdit.nombre = item.nombre;
          this.grupoEdit.id = item.id;
          this.grupoEdit.Empresa = item.empresa;
          if (res.code == 200) {
            this.value.Propietario = 0;
            this.modalUsuarios = true;
          } else if (res.code == 201) {
            this.value.Propietario = 1;
            this.modalUsuarios = true;
          }
          // this.items.push(res.data);
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async delGrupo(id) {
      try {
        this.show = true;
        let request = {};
        request.Permission_id = id;
        const repo = repoupdateprofileuser();
        await repo.deleGroupPermisos({ Permission_id: id }).then(res => {
          console.log(res);
          if (res.code == 204) {
            this.items = this.items.filter(item => item.id != id);
          }
          this.show = false;
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    onChange(value) {
      let clear = value.filter(e => e.key == "clear");
      let all = value.filter(e => e.key == "all");
      if (clear.length > 0) {
        this.fields = [];
      }
      if (all.length > 0) {
        this.fields = this.columns.filter(e => {
          return e.key != "clear" && e.key != "all";
        });
      }
    }
  },
  watch: {
    //
  }
};
</script>

<style scoped></style>
