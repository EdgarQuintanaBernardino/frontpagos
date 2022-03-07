<template>
  <div>
    <CCard>
      <CCardHeader class="d-flex">
        <h3>Permisos</h3>
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
            <!-- Tabla en donde se ven los datos -->
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
                    >Editar</b-button
                  >
                  <b-button @click="confirmDelete(item.id)" variant="danger"
                    >Eliminar</b-button
                  >
                </b-button-group>
              </td>
            </template>
          </CDataTable>
        </b-overlay>
        <CModal
          :closeOnBackdrop="false"
          size="xl"
          :show.sync="modalGrupos"
          @update:show="inicio()"
        >
          <template #header-wrapper>
            <div class="mt-3">
              <b-row>
                <b-col class="col-2"></b-col>
                <b-col class="col-8">
                  <center>
                    <h5>Agregar un nuevo permiso</h5>
                  </center>
                </b-col>
                <b-col class="col-2">
                  <CButton class="float-end" color="danger" @click="closeAll()"
                    >Cerrar</CButton
                  >
                </b-col>
              </b-row>
            </div>
          </template>
          <asigna-roles-permisos
            @close="closeModal"
            ref="form"
          ></asigna-roles-permisos>
          <template #footer class="invisible">
            <CButton></CButton>
          </template>
        </CModal>
        <!-- <CModal
          :closeOnBackdrop="false"
          :title="grupoEdit.nombre"
          size="lg"
          :show.sync="modalUsuarios"
          @update:show="LimpiarModal()"
        >
          <div class="col-12 p-3" :class="darkMode ? 'BGD' : 'BGL'">
            <h3 class="mb-3" style="text-align:center">Editar Permiso</h3>
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
                  <div class="mt-3 mb-3">
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
                  <div class="mt-3">
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
                <nivelesPermisos
                  v-if="muestraTab"
                  :perSel="grupoEdit.usuarios[this.tabsel].permisos"
                  :nivSel="grupoEdit.usuarios[this.tabsel].Visibilidad"
                  @permisosSelect="selectPermisos"
                  @tiposSelect="selectTipos"
                ></nivelesPermisos>
              </div>
              <div slot="form" v-if="tabsel == -1"> -->
        <!-- <GruposyUsuarios
                  v-if="Object.keys(grupoEdit).length !== 0 && muestraTab"
                  :empresa="grupoEdit.Empresa"
                >
                </GruposyUsuarios> -->
        <!-- Lo remplazamos por un contenido completo -->
        <!-- MODULO 3 -->
        <!-- <b-row>
                  <b-col class="col-12">
                    <b-card no-body class="p-3">
                      <center>
                        <h4>Selecciona Grupos de Usuarios</h4>
                      </center>
                      <multiselect
                        @remove="GruposSub"
                        @input="GruposAdd"
                        class="mb-2 mt-2"
                        v-model="GroupUsers.groups"
                        :options="Grupos"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder="Selecciona grupos de usuarios"
                        label="Name"
                        track-by="id"
                      >
                      </multiselect>
                      <div class="mt-3">
                        <center>
                          <h5>Selecciona Usuarios</h5>
                        </center>
                        <multiselect
                          class="mb-2 mt-2"
                          v-model="GroupUsers.users"
                          :options="UsuariosAll"
                          :multiple="true"
                          :close-on-select="false"
                          :clear-on-select="false"
                          :preserve-search="true"
                          placeholder="Selecciona los usuarios"
                          label="name"
                          track-by="id"
                        >
                        </multiselect>
                      </div>
                    </b-card>
                    b-card no-body class="p-3"> </b-card> Cometario tambie
                    <CButton block color="success" @click="AddUsers()" COMETARIO
                      >Seleccionar usuarios</CButton
                    >
                  </b-col>
                </b-row>
                <b-button class="col-12" variant="success"
                  >Agregar usuarios</b-button
                >
              </div>
            </tabs>
          </div>
          <template #footer>
            <CButton></CButton>
          </template>
        </CModal>  -->
      </CCardBody>
      <CCardFooter>
        <!-- <b-row>
          <b-col class="col-9"></b-col>
          <b-col class="col-3"> -->
        <CButton color="info" variant="outline" v-b-modal.guia
          >Ver guia de permisos</CButton
        >
        <!-- </b-col>
        </b-row> -->
      </CCardFooter>
    </CCard>
    <b-toast
      variant="danger"
      id="example-toast4"
      title="Eliminar usuario seleccionado"
      no-auto-hide
    >
      <center>
        ¿ Estas seguro de eliminar a este usuario ?
        <b-row>
          <b-col class="col-6 mt-2">
            <b-button size="sm" variant="danger" block @click="EliminaUsu()">
              Si
            </b-button>
          </b-col>
          <b-col class="col-6 mt-2">
            <b-button
              size="sm"
              variant="secondary"
              block
              @click="confirmDelete2(2)"
            >
              No
            </b-button>
          </b-col>
        </b-row>
      </center>
    </b-toast>
    <CModal
      :closeOnBackdrop="false"
      title="Editar Permiso"
      size="xl"
      :show.sync="modalUsuariosNew"
      @update:show="LimpiarModal()"
    >
      <!-- Nuevo modal para tener una mejor experiencia de user -->
      <!-- {{Object.keys(grupoEdit).length===0?'':grupoEdit.users[tabsel]}} -->
      <!-- <div class="col-12 p-3" :class="darkMode ? 'BGD' : 'BGL'">
        <center>
          <h3 class="mb-3">Editar Permiso</h3>
        </center> -->
      <center>
        <b-row>
          <b-col class="col-12">
            <h4 class="mb-3" v-if="changeName === false">
              Nombre del permiso: {{ grupoEdit.nombre }}
              <CButton
                @click="ChangeName(1)"
                color="primary"
                v-c-tooltip="{
                  content: 'Cambiar nombre del permiso',
                  placement: 'top'
                }"
                ><b-icon icon="pencil-square"></b-icon
              ></CButton>
            </h4>
          </b-col>
          <b-col class="col-12">
            <!-- <h4 class="mb-3" v-if="changeName">
              Nombre del permiso:

              <CButton
                @click="ChangeName()"
                color="primary"
                v-c-tooltip="{
                  content: 'Gurdar cambios',
                  placement: 'top'
                }"
                ><b-icon icon="pencil-square"></b-icon
              ></CButton>
            </h4> -->
            <b-input-group
              prepend="Nuevo nombre"
              class="mt-2 mb-4"
              v-if="changeName"
              v-c-tooltip="{
                content: 'Minimo 4 caracteres',
                placement: 'top'
              }"
            >
              <b-form-input
                :placeholder="grupoEdit.nombre"
                v-model="NewName"
              ></b-form-input>
              <b-input-group-append>
                <CButton
                  @click="SaveName()"
                  color="primary"
                  :disabled="NewName.length <= 3"
                  >Guardar</CButton
                >
                <CButton @click="ChangeName(2)" color="danger"
                  >Cancelar</CButton
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </center>
      <b-row>
        <b-col class="col-4"> </b-col>
        <b-col class="col-8">
          <center v-if="MostrarAcordeon === false">
            <h5>¿Deseas asignar esta configuración a todos los usuarios?</h5>
          </center>
          <center>
            <b-form-checkbox
              :disabled="AplicarTodosUsu === false"
              v-if="MostrarAcordeon === false"
              class="text align-center mb-3"
              v-model="AplicaTodos"
              name="check-button"
              switch
              size="lg"
            >
              {{
                AplicaTodos
                  ? " Se aplicará a todos los usuarios"
                  : " Aplicar a todos los usuarios"
              }}
            </b-form-checkbox>
          </center>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-4">
          <div>
            <!-- <center>
              <h5>Nombre del permiso</h5>
            </center> -->
            <b-card>
              <!-- <b-tabs pills card> -->
              <!-- <b-tab title="Nombre del permiso"> -->
              <!-- <b-card-text> -->
              <center>
                <h5>Usuarios del Permiso</h5>
              </center>
              <b-list-group flush>
                <!-- pagination id="my-table" class="" :per-page="perPage"
                :current-page="currentPage" -->
                <b-list-group-item
                  :disabled="Propietario || MostrarAcordeon || EditandoPermiso"
                  :active="IdUserDelete === option.id ? true : false"
                  v-for="option in grupoEdit.usuarios"
                  :key="option.id"
                  href="#"
                  @click="Pagination(option)"
                  >{{ option.nombre }}</b-list-group-item
                >
              </b-list-group>
              <!-- <b-pagination
                class="mt-2"
                align="center"
                v-model="currentPage"
                :total-rows="1"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination> -->
              <!-- </b-card-text> -->
              <!-- </b-tab> -->

              <!-- </b-tabs> -->
            </b-card>
            <center>
              <p>{{ NombreUsuario }}</p>
            </center>
            <CButton
              v-if="EditandoPermiso === false"
              @click="HabilitaPermisos()"
              color="primary"
              block
              :disabled="IdUserDelete === -1"
              >Editar permiso del usuario seleccionado</CButton
            >
            <CButton
              v-if="EditandoPermiso"
              @click="HabilitandoEdit()"
              color="primary"
              block
              :disabled="IdUserDelete === -1"
              >Volver</CButton
            >
            <CButton
              @click="confirmDelete2(1)"
              color="danger"
              block
              :disabled="IdUserDelete === -1 || EditandoPermiso"
              >Eliminar usuario seleccionado</CButton
            >
            <CButton
              class="mb-3"
              color="success"
              block
              @click="Acordeon()"
              :disabled="Propietario || EditandoPermiso"
              >{{ MostrarAcordeon ? "Volver" : "Agregar Usuarios" }}</CButton
            >
          </div>
        </b-col>
        <b-col class="col-8" v-if="MostrarAcordeon === false">
          <b-card>
            <nivelesPermisos
              v-if="Propietario === false"
              ref="niveles"
              titleButton="EDITAR PERMISO"
              @EditPer="EditPermissions($event)"
            ></nivelesPermisos>
            <b-jumbotron
              v-if="Propietario === true"
              header="Permiso con propietarios"
              lead="No se pueden editar permisos con derechos de propietario"
            >
              <p>Para mas detalles consulta la Guia de permisos</p>
              <b-button
                variant="primary"
                v-b-modal.guia
                @click="CerrarNewModal()"
                >Ver Guia</b-button
              >
            </b-jumbotron>
          </b-card>
        </b-col>
        <!-- Prueba de acordeon -->
        <b-col class="col-8" v-if="MostrarAcordeon">
          <div class="accordion" role="tablist">
            <div class="p-1">
              <center>
                <h5>Selecciona usuarios a agregar</h5>
              </center>
              <multiselect
                openDirection="bottom"
                v-model="GroupUsers.users"
                :options="UsuariosAll"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="Selecciona los usuarios"
                label="name"
                track-by="id"
              >
              </multiselect>
            </div>

            <!-- <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="success"
                  >Agregar usuarios</b-button
                >
              </b-card-header> -->
            <!-- <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              > -->
            <!-- <b-card-body> -->
            <!-- <b-card no-body class="p-3"> -->
            <!-- <center>
                      <h5>Selecciona usuarios a agregar</h5>
                    </center>
                    <multiselect
                      openDirection="bottom"
                      v-model="GroupUsers.users"
                      :options="UsuariosAll"
                      :multiple="true"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Selecciona los usuarios"
                      label="name"
                      track-by="id"
                    >
                    </multiselect> -->
            <!-- </b-card> -->
            <!-- <CButton block color="primary" v-b-toggle.accordion-2
                    >Seleccionar usuarios</CButton
                  >
                </b-card-body> -->
            <!-- </b-collapse> -->
            <!-- </b-card> -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-2 variant="info"
                  >Agregar permisos</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card>
                  <nivelesPermisos
                    titleButton="AGREGAR AL PERMISO"
                    @ChangePer="SelectPermissions($event)"
                  ></nivelesPermisos>
                </b-card>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>
      <!-- <tabs
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
            <div class="mt-3 mb-3"></div>
            <div class="mt-3">
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
          </div> -->
      <!-- <p v-for="elem in grupoEdit.usuarios">{{elem}}</p> -->
      <!-- <nivelesPermisos
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
          <b-button class="col-12" variant="success">Agregar usuarios</b-button>
        </div>
      </tabs> -->
      <!-- </div> -->
      <template #footer>
        <CButton></CButton>
      </template>
    </CModal>
    <!-- GUIA PARA CREAR PERMISOS-->
    <b-modal id="guia" scrollable title="Guia rapida para permisos" hide-footer>
      <center>
        <h4>Crear un permiso nuevo</h4>
        <p>1.Click para abrir pestaña de nuevo permiso</p>
        <img width="450" height="170" src="../../assets/img/GuiaPermiso1.png" />
        <p>
          2.En el siguiente formulario se deben de llenar todos los campos para
          pasar a la siguiente ventana, el nombre del permiso debe de tener una
          longitud mayor a 4 caracteres para ser valido
        </p>
        <img width="720" height="450" src="../../assets/img/GuiaPermiso2.png" />
      </center>
    </b-modal>
  </div>
</template>

<script>
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
import AsignaRolesPermisos from "./AsignaRolesPermisos.vue";
// import tabs from "./subComponentes/tabs";
import nivelesPermisos from "./subComponentes/Niveles_Permisos";
import alertas from "../../assets/repositoriosjs/alertas";
import Multiselect from "vue-multiselect";
// import GruposyUsuarios from "./subComponentes/GruposyUsuarios";
// import Grupos from "./Grupos.vue";

export default {
  components: {
    Multiselect,
    AsignaRolesPermisos,
    // tabs,
    nivelesPermisos
    // GruposyUsuarios,
    // Grupos,
  },
  data() {
    return {
      NewName: "",
      changeName: false,
      // Recarga toda la tabla
      recargarEdit: {},
      // Aplicar a todos los usuarios
      AplicarTodosUsu: false,
      EditandoPermiso: false,
      // Pintar la tabla para editar los campos
      Bandera: false,
      // Valores a pintar al momento de editar
      valueUser: {
        Visibilidad: 0,
        FechaI: "",
        FechaF: "",
        Permisos: [],
        CheckHasta: true,
        CheckDesde: true,
        Bandera: false
      },
      // Fechas de usuarios agregados en editar permiso
      FechaI: "",
      FechaE: "",
      // Bandera de propietario
      Propietario: false,
      // Valores que se pintan en la tabla
      Valores: {},
      // Datos para cargar los usuarios en una tabla
      GroupUsers: {
        groups: [],
        users: []
      },
      UsuariosAll: [],
      Grupos: [],
      Visibilidad: 0,
      DataPermissions: {},
      GrupoPermisos: [],
      // JSON PARA AGREGAR USUARIOS
      Guia: false,
      // Prueba de modal en funcion
      boxTwo: "",
      // Prueba props
      // texto : "Editar perro permiso",
      // Acordeon
      MostrarAcordeon: false,
      // Estos son para borrar
      IdUserDelete: -1,
      PermisoIDelete: -1,
      // Este es para mostrar el nombre del usuario en el listado
      NombreUsuario: "",
      // Valores para el nuevo modal de editar
      perPage: 1,
      currentPage: 1,
      TotalRows: 0,
      // value: {
      //   Propietario: 0
      // },
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
      modalUsuariosNew: false, //Nuevo
      Empresas: [],
      ConsultaPermiso: [],
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
  // mounted(){
  //   this.TituloButonNiveles;
  // },
  computed: {
    ...mapState(["darkMode"])
    // TotalRows() {
    //   // return this.grupoEdit.usuarios.length;
    //   console.log(this.grupoEdit);
    //   return 2;
    // }
  },
  async created() {
    await this.inicio();
  },
  methods: {
    async SaveName() {
      this.show = true;
      let request = {};
      request.Name = this.NewName;
      request.Permission_id = this.PermisoIDelete;
      const alert = alertas();
      try {
        const repo = repoupdateprofileuser();
        await repo.NewNamePermission(request).then(res => {
          console.log(res);
          if (res.code === 201) {
            alert.PermisosOK({
              Tit: "Permisos",
              Text: "Nombre cambiado",
              icono: "success"
            });
            //Limpian los campos
            this.grupoEdit.nombre = this.NewName;
            this.NewName = "";
            this.changeName = false;
            this.show = false;
            // await this.getPermisosAll();
            // await this.getPermisos();
            this.inicio();
            console.log("Erroe");
          }
        });
      } catch (error) {
        alert.PermisosOK({
          Tit: "Permisos",
          Text: "No se pudo cambiar el nombre",
          icono: "error"
        });
      }
    },
    ChangeName(op) {
      if (op === 1) {
        this.changeName = !this.changeName;
      }
      if (op === 2) {
        this.changeName = !this.changeName;
        this.NewName = "";
      }
    },
    CerrarNewModal() {
      this.modalUsuariosNew = false;
    },
    EditPermissions(value) {
      console.log(value);
      //Hacemos un unico valor la visibilidad
      let visibilidad = 0;
      if (value.Tipos.join("") == 234) {
        visibilidad = 1;
      }
      if (value.Tipos.join("") == 24) {
        visibilidad = 24;
      }
      if (value.Tipos.join("") == 34) {
        visibilidad = 34;
      }
      if (value.Tipos == 2) {
        visibilidad = 2;
      }
      if (value.Tipos == 4) {
        visibilidad = 4;
      }
      if (value.Tipos == 3) {
        visibilidad = 3;
      }
      let newObj = {};
      newObj.Permission_id = this.PermisoIDelete;
      newObj.User_id = this.IdUserDelete;
      newObj.Visibility_id = visibilidad;
      newObj.Permissions_id = value.Permisos;
      newObj.Model_id = [];
      newObj.Date1 = value.FechD;
      newObj.Date2 = value.FechH;
      newObj.All = this.AplicaTodos;
      //newObj.All = 9849874;
      // console.log(newObj);
      this.EditarPermisoRequest(newObj);
    },
    async EditarPermisoRequest(request) {
      this.show = true;
      const alert = alertas();
      try {
        console.log(request);
        const repo = repoupdateprofileuser();
        await repo.ActPermisosUsuario(request).then(res => {
          console.log(res);
          console.log(res.data);
          if (res.code === 201) {
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Usuario editado",
              icono: "success"
            });
            // Se limipian los campos
            this.NombreUsuario = "";
            // this.IdUserDelete = -1;
            this.EditandoPermiso = false;
            this.AplicarTodosUsu = false;
            this.$refs.niveles.ClearNiveles();
            this.$refs.niveles.EditaPermisos(1);
            this.getPermisosUsuario(this.recargarEdit);
            this.show = false;
            this.AplicaTodos = false;
            // this.inicio();
          }
          //   if (res.code === 205) {
          //     alert.PermisosOK({
          //       Tit: "Usuarios",
          //       Text: "Tines usuarios con permisos de propietarios",
          //       icono: "warning"
          //     });
          //     // Se limpia en model de usuarios seleccionados
          //     this.ClearSmall();
          //   }
        });
      } catch (error) {
        alert.PermisosOK({
          Tit: "Usuarios",
          Text: "Ocurrio un error al editar",
          icono: "error"
        });
      }
    },
    // Habilita la opcion de editar un permiso en el grupo de permisos
    HabilitaPermisos() {
      this.EditandoPermiso = true;
      this.AplicarTodosUsu = true;
      this.$refs.niveles.EditaPermisos(2);
      // this.valueUser.Bandera = !this.valueUser.Bandera;
      // this.Bandera = !this.Bandera;
      // this.SelectPermissions(this.DataPermissions);
    },
    HabilitandoEdit() {
      this.EditandoPermiso = false;
      this.AplicarTodosUsu = false;
      this.$refs.niveles.EditaPermisos(1);
    },
    // Trae los permisos del componente de niveles y permisos
    SelectPermissions(data) {
      console.log(data);
      this.DataPermissions = data;
      if (this.DataPermissions.Tipos.join("") == 234) {
        this.Visibilidad = 1;
      }
      if (this.DataPermissions.Tipos.join("") == 24) {
        this.Visibilidad = 24;
      }
      if (this.DataPermissions.Tipos.join("") == 34) {
        this.Visibilidad = 34;
      }
      if (this.DataPermissions.Tipos == 2) {
        this.Visibilidad = 2;
      }
      if (this.DataPermissions.Tipos == 4) {
        this.Visibilidad = 4;
      }
      if (this.DataPermissions.Tipos == 3) {
        this.Visibilidad = 3;
      }
      this.GrupoPermisos = data.Permisos;
      this.FechaI = data.FechD;
      this.FechaE = data.FechH;
      // Funcion para armar el JSON
      this.AgregarUsuario();
    },
    // consulta a todos los usuarios
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then(res => {
          console.log(res);
          this.UsuariosAll = res.data.map(function(obj) {
            let newObj = {};
            newObj.name = obj.name;
            newObj.id = obj.id;
            return newObj;
          });
        });
        // QUITAR LOS USUARIOS QUE APARECEN EN EL PERMISO DE TODOS LOS QUE PUEDE AGREGAR
        // console.log(this.UsuariosAll);
        // console.log(this.grupoEdit.usuarios);
        // let resultado = {};
        // let temporal = {};
        // for(let a = 0; a< this.grupoEdit.usuarios.lenght; a++){
        //   temporal =  this.UsuariosAll.filter(ele => ele.id !== this.grupoEdit.usuarios[a].id)
        //   resultado.push(temporal);
        // }
        // console.log(resultado);
      } catch (error) {
        //         console.log(error);
      }
    },
    // Prueba Close
    closeAll() {
      this.modalGrupos = false;
      // this.LimpiarAll = true;
      // Limpia la ventana modal
      this.$refs.form.limpiaForm();
    },
    // Consulta los grupos de todos los usuarios
    // async getGruposAll(id) {
    //   try {
    //     const repo = repoupdateprofileuser();
    //     let request = {};
    //     request.Company_id = id;
    //     await repo.consGroupAllEmpresas(request).then(res => {
    //       this.Grupos = res.data;
    //       let result = [];
    //       for (let a = 0; a < this.Grupos.length; a++) {
    //         for (let b = 0; b < this.Grupos[a].users.length; b++) {
    //           result.push(this.Grupos[a].users[b]);
    //         }
    //       }
    //       this.UsuariosAll = result;
    //       var hash = {};
    //       this.UsuariosAll = this.UsuariosAll.filter(function(current) {
    //         var exists = !hash[current.id];
    //         hash[current.id] = true;
    //         return exists;
    //       });
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getGruposAll(id) {
    //   try {
    //     const repo = repoupdateprofileuser();
    //     let request = {};
    //     request.Company_id = id;
    //     await repo.consGroupAllEmpresas(request).then(res => {
    //       this.Grupos = res.data;
    //       console.log(this.Grupos);
    //       // let result = [];
    //       // for (let a = 0; a < this.Grupos.length; a++) {
    //       //   for (let b = 0; b < this.Grupos[a].users.length; b++) {
    //       //     result.push(this.Grupos[a].users[b]);
    //       //   }
    //       // }
    //       // this.UsuariosAll = result;
    //       // var hash = {};
    //       // this.UsuariosAll = this.UsuariosAll.filter(function(current) {
    //       //   var exists = !hash[current.id];
    //       //   hash[current.id] = true;
    //       //   return exists;
    //       // });
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // Define si se muestra el acordeon en la parte de editar un permiso
    Acordeon(id) {
      // console.log(this.UsuariosAll);
      this.MostrarAcordeon = !this.MostrarAcordeon;
      // this.option.nombre = "";
      this.IdUserDelete = -1;
      this.NombreUsuario = "";
      if (id === 1) {
        this.MostrarAcordeon = false;
      }
    },
    Pagination(id) {
      this.$refs.niveles.EditaPermisos(1);
      console.log(id);
      this.valueUser.Visibilidad = id.Visibilidad.Visibilidad;
      this.valueUser.FechaI = id.Visibilidad.FechaI;
      this.valueUser.FechaF = id.Visibilidad.FechaF;
      this.valueUser.Permisos = id.permisos;
      console.log(this.valueUser);
      // En una unica validacion
      if (id.Visibilidad.FechaI != 1) {
        this.valueUser.CheckDesde = false;
      } else {
        this.valueUser.CheckDesde = true;
      }
      if (id.Visibilidad.FechaF != 1) {
        this.valueUser.CheckHasta = false;
      } else {
        this.valueUser.CheckHasta = true;
      }
      //MODULO 2
      this.NombreUsuario = id.nombre;
      this.IdUserDelete = id.id;
      this.MostrarAcordeon = false;
      this.$refs.niveles.PintarEditado(this.valueUser);
    },
    // async GuardarCambios() {
    //   let grupo = this.grupoEdit;
    //   let usuario = grupo.usuarios[this.tabsel];
    //   let request = {};
    //   request.User = usuario.id;
    //   request.Permission_id = grupo.id;
    //   request.Visibility_id = usuario.Visibilidad.Visibilidad.sort().join("");
    //   request.Permissions_id = usuario.permisos;
    //   request.Model_id = [];
    //   request.Date1 = usuario.Visibilidad.FechaI;
    //   request.Date2 = usuario.Visibilidad.FechaF;
    //   request.All = this.AplicaTodos;
    //   console.log(request);
    //   const alert = alertas();
    //   try {
    //     const repo = repoupdateprofileuser();
    //     await repo.ActPermisosUsuario(request).then(res => {
    //       if (res.code == 201) {
    //         alert.PermisosOK({
    //           Tit: "Permisos",
    //           Text: "Permisos actualizados correctamente",
    //           icono: "success"
    //         });
    //         this.modalUsuarios = false;
    //         // this.modalGrupos = false;
    //         // console.log("No cierra ! ");
    //       }
    //     });
    //   } catch {
    //     alert.PermisosOK({
    //       Tit: "Permisos",
    //       Text: "Ocurrio un error",
    //       icono: "error"
    //     });
    //   }
    // },
    async AgregarUsuario() {
      let request = {};
      request.Users = this.GroupUsers.users.map(item => item.id);
      request.Permission_id = this.PermisoIDelete;
      request.Visibility_id = this.Visibilidad;
      request.Permissions_id = this.GrupoPermisos;
      request.Date1 = this.FechaI;
      request.Date2 = this.FechaE;
      const alert = alertas();
      try {
        const repo = repoupdateprofileuser();
        await repo.AddUsuarioGrupo(request).then(res => {
          console.log(res);
          if (res.code === 201) {
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Usuario agregado correctamente",
              icono: "success"
            });
            // Se limpia en model de usuarios seleccionados
            this.ClearSmall();
          }
          if (res.code === 205) {
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Tines usuarios con permisos de propietarios",
              icono: "warning"
            });
            // Se limpia en model de usuarios seleccionados
            // this.ClearSmall();
          }
          // // this.grupoEdit.usuarios = res;  this.items = this.items.filter(item => item.id != id);
          // this.grupoEdit.usuarios = this.grupoEdit.usuarios.filter(
          //   ele => ele.id != newObj.User_id
          // );
          // console.log(this.grupoEdit.usuarios);
          // this.show = false;
          // this.grupoEdit.usuarios.length > 1
          //   ? (this.grupoEdit.usuarios = this.grupoEdit.usuarios.filter(
          //       elem => elem.id !== newObj.User_id

          //     ))
          //   : (this.modalUsuarios = false);
          // this.grupoEdit.usuarios.length > 0 && this.tabsel > 0
          //   ? (this.tabsel = this.tabsel - 1)
          //   : (this.modalUsuarios = false);
        });
      } catch (error) {
        alert.PermisosOK({
          Tit: "Usuarios",
          Text: "Ocurrio un error",
          icono: "error"
        });
      }
    },
    async EliminaUsu() {
      this.show = true;
      let newObj = {};
      newObj.Permission_id = this.PermisoIDelete;
      newObj.User_id = this.IdUserDelete;
      const alert = alertas();
      try {
        const repo = repoupdateprofileuser();
        await repo.DelUsuarioGrupo(newObj).then(res => {
          // console.log(res);
          if (res.code === 201) {
            this.grupoEdit.usuarios = this.grupoEdit.usuarios.filter(
              ele => ele.id != newObj.User_id
            );
            this.show = false;
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Usuario eliminado",
              icono: "success"
            });
            this.NombreUsuario = "";
            this.IdUserDelete = -1;
            this.$refs.niveles.ClearNiveles();
            this.$bvToast.hide("example-toast4");
          }
        });
      } catch (error) {
        alert.PermisosOK({
          Tit: "Usuarios",
          Text: "Ocurrio un error",
          icono: "error"
        });
      } finally {
        //
      }
    },
    // Cerrar la ventana modal cuando se hace un permiso
    closeModal() {
      this.modalGrupos = false;
      this.inicio();
    },
    // selectPermisos(data) {
    //   // console.log(data);
    //   this.grupoEdit.usuarios[this.tabsel].permisos = data;
    //   if (!data.includes(7)) {
    //     this.muestraTab = false;
    //     this.muestraTab = true;
    //   }
    // },
    // selectTipos(data) {
    //   // this.grupoEdit.usuarios[this.tabsel].permisos = data;
    //   // console.log(this.grupoEdit.usuarios);
    //   console.log(data);
    //   this.grupoEdit.usuarios[this.tabsel].Visibilidad.Visibilidad = data;
    //   console.log(this.grupoEdit.usuarios[this.tabsel]);
    //   // if (!data.includes(7)) {
    //   // }
    // },
    //EDITAR ESTE CAMPO CON LOS DATOS ACTUALES
    LimpiarModal() {
      console.log("se limpio");
      this.tabsel = -1;
      this.grupoEdit = {};
      this.AplicaTodos = false;
      this.NombreUsuario = "";
      this.IdUserDelete = -1;
      this.PermisoIDelete = -1;
      this.Acordeon(1);
      this.changeName = false;
      // this.$refs.niveles.ClearNiveles();
      // this.$refs.niveles.EditaPermisos(1);
    },
    // async creaJSON() {
    //   let request = {};
    //   request.Permission_id = this.value.GrupoPermiso.Id;
    //   request.Account_id = this.value.Cuenta.id;
    //   request.Model = this.value.Departamentos.id;
    //   request.Visibility_id = 1;
    //   request.Permissions_id = [1, 2];
    //   request.Model_id = [];
    //   request.User = 1;
    //   request.Company_id = 1;
    //   request.Date1 = 1;
    //   request.Date2 = 1;
    //   request.All = false;
    // },
    async inicio() {
      this.show = true;
      this.Permisos = [];
      this.Empresas = [];
      this.Tipos = [];
      this.items = [];
      this.ConsultaPermiso = [];
      await this.getPermisos();
      await this.getNivelesdeAccesos();
      await this.getEmpresas();
      await this.getPermisosAll();
      // console.log(this.Empresas);
      // for (let emp of this.Empresas) {
      //   await this.getGrupos(emp.id);
      // }
      // this.items = this.items.flat();
      // Elementos de la tabla en la seccion de permisos
      // console.log(this.items);
      // this.items = this.items.map(element => {
      //   let newobj = {};
      //   newobj.id = element.id;
      //   newobj.nombre = element.nombre;
      //   newobj.empresa = this.Empresas.find(
      //     emp => emp.id == element.pivot.company_id
      //   );
      //   console.log(this.items);
      //   return newobj;
      // });
      this.show = false;
      // console.log("se cargó correctamente");
    },
    // cambiatab(data) {
    //   this.muestraTab = false;
    //   this.tabsel = data;
    //   this.muestraTab = true;
    // },
    //cONSULTA TODOS LOS PERMISOS PARA PINTARLOS EN LA TABLA
    async getPermisosAll() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consPermisosCuenta().then(res => {
          this.items = res.data;
          //   this.items.map(element => {
          //   let newobj = {};
          //   newobj.id = element.id;
          //   newobj.nombre = element.nombre;
          //   newobj.empresa = this.Empresas.find(
          //     emp => emp.id == element.pivot.company_id
          //   );
          //   console.log(this.items);
          //   return newobj;
          // });
          // this.Permisos = res.data.map(function(obj) {
          //   let newObj = {};
          //   newObj.nombre = obj.name;
          //   newObj.id = obj.id;
          //   newObj.desc = obj.descripcion;
          //   return newObj;
          // });
          // this.Permisos = this.Permisos.filter(elem => elem.id !== 1);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getPermisos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consPermisos().then(res => {
          // console.log(res);
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
      this.recargarEdit = item;
      // this.$ref.niveles.ClearNiveles();
      // console.log(item);
      this.PermisoIDelete = item.id;
      try {
        let request = {};
        request.Permission_id = this.PermisoIDelete;
        console.log(request);
        // console.log("Consultaste la informacion de un user");
        const repo = repoupdateprofileuser();
        await repo.ConsPermisosUsuario(request).then(res => {
          // console.log(res);
          // console.log(res.data);
          this.grupoEdit.usuarios = res.data.map(elem => {
            let newObj = {};
            newObj.id = elem.id;
            newObj.nombre = elem.name;
            newObj.permisos = elem.Permissions.map(elem => elem.Permissions_id);
            newObj.Visibilidad = {
              FechaI: elem.Permissions[0].Date1,
              FechaF: elem.Permissions[0].Date2,
              Visibilidad: JSON.stringify(elem.Permissions[0].Visibility_id)
                .split("")
                .map(elem => parseInt(elem))
            };
            // console.log(newObj.Visibilidad);
            return newObj;
          });
          // console.log(this.grupoEdit.usuarios);
          // this.TotalRows = this.grupoEdit.usuarios.length;
          this.grupoEdit.nombre = item.nombre;
          this.grupoEdit.id = item.id;
          this.grupoEdit.Empresa = item.empresa;
          if (res.code == 200) {
            // this.value.Propietario = 0;
            this.Propietario = false;
            this.modalUsuariosNew = true;
            //Se consultan a todos los usuarios
            this.$refs.niveles.ConsultaNiveles();
            this.getUsuarios();
            this.$refs.niveles.ClearNiveles();
            this.$refs.niveles.EditaPermisos(1);
          } else if (res.code == 201) {
            // this.value.Propietario = 1;
            this.Propietario = true;
            this.modalUsuariosNew = true;
            // this.modalUsuarios = true;
          }
          // this.items.push(res.data);
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    // Borra uno de los permisos dentro de la tabla
    async delGrupo(id) {
      try {
        this.show = true;
        let request = {};
        request.Permission_id = id;
        const repo = repoupdateprofileuser();
        await repo.deleGroupPermisos({ Permission_id: id }).then(res => {
          if (res.code == 204) {
            this.items = this.items.filter(item => item.id != id);
          }
          this.show = false;
        });
      } catch (error) {
        //         console.log(error);
      }
    },
    confirmDelete(id) {
      this.$bvModal
        .msgBoxConfirm("¿ Estas seguro de elimina este permiso ?", {
          title: "FAVOR DE CONFIRMAR",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Si",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == true) {
            this.delGrupo(id);
          } else {
            return;
          }
        });
    },
    confirmDelete2(id) {
      if (id === 1) {
        this.$bvToast.show("example-toast4");
      }
      if (id === 2) {
        this.$bvToast.hide("example-toast4");
      }
    },
    ClearSmall() {
      this.modalUsuariosNew = false;
      this.Valores = {};
      this.GroupUsers.users = [];
      this.GroupUsers.groups = [];
      this.UsuariosAll = [];
      this.Visibilidad = 0;
      this.DataPermissions = {};
      this.GrupoPermisos = [];
      this.MostrarAcordeon = false;
    }
    // onChange(value) {
    //   let clear = value.filter(e => e.key == "clear");
    //   let all = value.filter(e => e.key == "all");
    //   if (clear.length > 0) {
    //     this.fields = [];
    //   }
    //   if (all.length > 0) {
    //     this.fields = this.columns.filter(e => {
    //       return e.key != "clear" && e.key != "all";
    //     });
    //   }
    // }
  },
  watch: {
    //
  }
};
</script>

<style scoped></style>
