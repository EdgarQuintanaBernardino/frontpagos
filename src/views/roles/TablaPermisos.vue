<template>
  <div>
    <CCard>
      <CCardHeader class="d-flex">
             <b-tabs pills
        content-class="mt-3"
        active-nav-item-class="font-weight-normal text-uppercase"
      >
        <b-tab title="Tus permisos" @click="cambiarbd(0)">
        </b-tab>
           <b-tab title="Permisos Externos"  @click="cambiarbd(1)">
        </b-tab>

             </b-tabs>

        <CButton class="ml-auto" @click="modalGrupos = true" color="primary">
          <b-icon icon="file-earmark-text"></b-icon> Nuevo permiso</CButton
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
              <b-form-group v-slot="{ ariaDescribedby }" class="m-0 p-0">
      <h4>
          Permisos
          <b-badge variant="dark" pill>{{ items.length }}</b-badge>
        </h4>
      <b-form-radio-group
        v-model="filtro"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="plain-inline"
        @change="eventdispatch"

        size="lg"
      ></b-form-radio-group>
    </b-form-group>
          <CDataTable
            :items="items"
            :fields="columns"
            index-column
            hover
            footer
            table-column
            :itemsPerPage="itemsLimit"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"

            @pagination-change="changeItemsLimit"
            :sorter-value.sync="sorter"
            :column-filter-value.sync="columnFilter"
            :table-filter-value.sync="tableFilter"
            :items-per-page-select="{
              label: 'Registros por pagina:',
              values: ['5', '10', '20', '50']
            }"
            :loading="loading"
            :noItemsView="{
              noResults: 'No hay resultados de filtrado disponibles',
              noItems: 'No hay registros disponibles'
            }"
          >
            <template #tipo="{item}" class="text-center">
              <td class="py-2">
                <center>
               <h5> <b-badge pill variant="primary" v-if="item.Permiso_id==1">Propietario</b-badge></h5>
                <h5> <b-badge pill variant="info" v-if="item.Permiso_id==7">Administradores</b-badge></h5>
                 <h5><b-badge pill variant="secondary" v-if="item.Permiso_id==null">Permisos Varios</b-badge></h5>


                </center>
              </td>
            </template>
               <template #departamentos="{item}" class="text-center">
              <td class="py-2">
                <center>
               <h5> <b-badge pill variant="primary" v-if="item.Modelo_id==2">Ingresos</b-badge></h5>
                <h5> <b-badge pill variant="info" v-if="item.Modelo_id==3">Egresos</b-badge></h5>
                 <h5><b-badge pill variant="secondary" v-if="item.Modelo_id==5">Todos</b-badge></h5>


                </center>
              </td>
            </template>
            <template #users="{item}" class="text-center">
              <td class="py-2">

                <center>

     <b-dropdown id="dropdown-dropdown"  block dropdown text="Usarios" variant="primary" class="m-2  ">
       <div class="popHover">
    <b-dropdown-item v-for="u in item.Usuarios" :key="u.id">{{u.user}}</b-dropdown-item>
 </div>
 </b-dropdown>


                </center>

              </td>
            </template>
               <template #cuenta="{item}">
              <td>
                <p>
                 {{
                    item.cuentas!=null ? item.cuentas.nickname : "Todas las Cuentas"
                  }}


                </p>
              </td>
            </template>
            <template #empresa="{item}">
              <td>
                <p>
                  {{
                    item.hasOwnProperty("empresa") ? item.empresa.nombre : ""
                  }}
                </p>
              </td>
            </template>
               <!-- <template #nombre="{item}">
              <td>
                <p>
                  {{ item}}
                 {{  verifica_tiempo(item)?"activo":"Inactivo" }}
                </p>
              </td>
            </template> -->
            <template #acciones="{item}" class="text-center">
              <td class="py-2">
                <center>
                  <b-button-group>
                    <b-button
                      @click="getPermisosUsuario(item)"
                      variant="primary"
                      class="mr-2"
                    >
                      <b-icon icon="pencil-square"></b-icon> Editar</b-button
                    >
                    <b-button @click="confirmDelete(item.id)" variant="danger">
                      <b-icon icon="trash-fill"></b-icon> Eliminar</b-button
                    >
                  </b-button-group>
                </center>
              </td>
            </template>
          </CDataTable>
              <CPagination
            :pages="datosall.maxPages"

            :active-page.sync="activePage"
          />
        </b-overlay>
        <CModal
          :closeOnBackdrop="false"
          size="xl"
          :show.sync="modalGrupos"
                  >
          <template #header>
            <h5>
              <b-icon icon="file-earmark-text" class="mr-2"></b-icon>Agregar
              nuevo permiso
            </h5>
            <div>
              <b-button
                class="float-right btn-sm"
                variant="danger"
                @click="closeAll()"
                ><b-icon icon="x"></b-icon
              ></b-button>
            </div>
          </template>
          <asigna-roles-permisos
            @close="closeModal"
            ref="form"
            @con="convergencia"
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
        <CButton color="info" v-b-modal.guia>Ver guia de permisos</CButton>
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
      size="xl"
      :show.sync="modalUsuariosNew"
    >
      <template #header>
        <h5>
          <b-icon
            icon="file-earmark-text"
            aria-hidden="true"
            class="mr-1"
          ></b-icon>
          Editar permiso
        </h5>
        <div>
          <b-button
            class="float-right btn-sm"
            variant="danger"
            @click="closeModalEdit()"
            ><b-icon icon="X"></b-icon
          ></b-button>
        </div>
      </template>

      <center >
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


      <b-row class="">
        <b-row style="width:100%" class="p-3" >
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
                <h5>Usuarios del Permiso {{desahabilitar}}</h5>
              </center>
              <b-list-group flush>
                <!-- pagination id="my-table" class="" :per-page="perPage"
                :current-page="currentPage" -->
                <!-- Usuarios de verdad grupoEdit.usuarios -->
                <b-list-group-item
                  :active="IdUserDelete === option.user ? true : false"
                  v-for="option in grupoEdit.Usuarios"
                  :key="option.id"
                  href="#"
                  @click="Pagination(option)"
                  >{{ option.user }}</b-list-group-item
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
            v-if="IdUserDelete!=-1"
              @click="confirmDelete2(1)"
              color="danger"
              block

              >Eliminar usuario seleccionado</CButton
            >
            <CButton
              class="mb-3"
              color="success"
              block
              @click="agregauser()"
              :disabled="Propietario || EditandoPermiso"
              >{{ agregauserv3 ? "Volver" : "Agregar Usuarios" }}  </CButton
            >

          </div>
        </b-col>



        <b-col class="col-8" v-if="agregauserv3">  <!-- aqui entra en new user---->

  <b-card >
          <div role="tablist">


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
            <b-card no-body class="mb-1 h-100" >
                         <div class="p-1" style="">
              <center>
                <h5>Selecciona usuarios a agregar </h5>
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
                class=""
              >
              </multiselect>
            </div>
                  <nivelesPermisos
                    titleButton="AGREGAR AL PERMISO"
                    @EditPer="SelectPermissions"
                    ref="agregarusuarios"

                  ></nivelesPermisos>

            </b-card>
          </div>

            <!-- <nivelesPermisos
              ref="niveles"
              titleButton="Crear Permiso"
              @EditPer="EditPermissions($event)"

            ></nivelesPermisos> -->


          </b-card>

</b-col>



        <b-col v-else cols="12"  xl="8" >
          <!--aqui es normal sin el new user -->
           <b-row  >
            <b-card  v-if="desahabilitar">
              <b-row  v-if="calculauser" class="items-center">
                <b-col cols="12" v-if="this.grupoEdit.Usuarios.length>0">
                <center>
            <h5>¿Deseas asignar esta configuración a todos los usuarios?</h5>
          </center>
          <center>
            <!-- :disabled="AplicarTodosUsu === false" -->
            <b-form-checkbox
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
            <nivelesPermisos
              ref="niveles"
              :titleButton="tittle_interactive"
              @EditPer="EditPermissions($event)"

            ></nivelesPermisos>

</b-row>
<b-row v-else class="w-100">


            <b-jumbotron
              header="Selecciona 1 usuario"
              lead=""
            >


            </b-jumbotron>

</b-row>
          </b-card>
          <b-card  v-else>

            <b-jumbotron
              header="Permiso con propietarios y/o Administradores"
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
          </b-row>

        </b-col>

</b-row>


        <!-- Prueba de acordeon -->

      </b-row>

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
      <b-modal id="modal-detalles"  size="xl" title="Detalles del Permiso" hide-header @ok="leido">
       <b-jumbotron bg-variant="danger" text-variant="white" border-variant="dark">
    <template #header>Detalles del Permiso Creado</template>
<!--
    <template #lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template> -->


  </b-jumbotron>
<div>
  <div>
    <b-card-group deck>
      <b-card
        border-variant="primary"
        header="Propietarios"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
<b-list-group>
  <b-list-group-item v-for="p in respuesta.propietarios " :key="p.id">{{p.name}}</b-list-group-item>

</b-list-group>

        </b-card-text>
      </b-card>

      <b-card
        border-variant="info"
        header="Admins"
        header-border-variant="info"
        align="center"
        header-bg-variant="info"
        header-text-variant="white"

      >
      <b-card-text>
<b-list-group>
  <b-list-group-item v-for="p in respuesta.admins " :key="p.id">{{p.name}}</b-list-group-item>

</b-list-group>

        </b-card-text>
      </b-card>
 <b-card
        border-variant="warning"
        header="Detalles"
        header-border-variant="warning"
        align="center"
        header-bg-variant="warning"
        header-text-variant="white"

      >
      <b-card-text>
<b-list-group class="text-left">
  <b-list-group-item v-for="p in respuesta.detalles " :key="p.id" >
    {{p.name}}
      <b-badge variant="danger" v-if="p.detalles.Ingreso==0">No ingreso</b-badge>
      <b-badge variant="success" v-else>Si ingreso</b-badge>
      <b-row>
        <b-col cols="12" >
      <b-dropdown size="sm" text="Permisos Repetidos" variant="warning"  class="m-0 text-white d-block"  v-if="p.detalles.formated.length>0">
      <b-dropdown-item v-for="pp in p.detalles.formated" :key="pp">{{ pp }}</b-dropdown-item>

    </b-dropdown>
    </b-col>
</b-row>
    </b-list-group-item>

</b-list-group>

        </b-card-text>
      </b-card>


    </b-card-group>

  </div>


</div>

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
import Swal from "sweetalert2";
import moment from "moment";

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
      bd:0, //// es propio 1 es externo
      datosall:{
        maxPages:0,

      },
      filtro:0,
       items: [],
      activePage: 1,
      sorter: { column: "", asc: false },
      tableFilter: "",
      columnFilter: {},
      itemsLimit: 50,
      loading: false,
      acciones: [1, 2, 3],
      resuelve: 6,
      itemsporpagina: 5,
      details: [],
      respuesta:{
          propietarios:[],
          admins:[],
          detalle:[]
      },
detalles_modal:false,
      tipopermiso:false,  ///false es admin o propietario true es normal.
      acepted:false,  /// es si habilitamos el boton o no de componente hijo para que puedan mandar lo del permiso o
      tittle_interactive:"Editar Permiso",
      adduserv2:false,
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
         { text: "Todos los Permisos", value: "0" },
        { text: "Propietarios", value: "1" },
        { text: "Administradores", value: "7" },
        { text: "Permisos Varios", value: "3" },

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
          key: "users",
          label: "Usuarios",
          _classes: "text-left",
          _style: "width:auto",

        },
          {
          key: "tipo",
          label: "Tipo Permiso",
          _classes: "text-center",
          _style: "width:auto",
           filter: false,
          sorter: false,
        },
             {
          key: "departamentos",
          label: "Departamento",
          _classes: "text-center",
          _style: "width:auto",
           filter: false,
          sorter: false,
        },
        {
          key: "nombre",
          label: "Nombre del permiso",
          _classes: "text-left"
        },
        {
          key: "empresa",
          label: "Pertenece a",
          _style: "width: 300px",
          sorter: true,
          _classes: "text-left"
        },
           {
          key: "cuenta",
          label: "Cuenta Bancaria",
          _classes: "text-left",
          _style: "width:auto",

        },
        {
          key: "acciones",
          label: "Editar / Eliminar",
          filter: false,
          sorter: false,
          _style: "width: 300px",
          _classes: "text-center"
        }
      ]
    };
  },
  mounted(){
    // this.TituloButonNiveles;
   this.getUsuarios();
  },
  computed: {

    ...mapState(["darkMode"]),
    revisapermiso(){
        return true;
    },
    agregauserv3(){
        return this.adduserv2;
    },

    calculauser(){
        if(this.IdUserDelete!=-1){
          return true;
        }else{
          return false;
        }
    },
    mostrarpermisos(){
        if(this.grupoEdit.hasOwnProperty('Usuarios')){
              if(this.IdUserDelete!="-1"){
                return true;
              }
        }else{return false;}
    },
    desahabilitar(){
if(!this.grupoEdit.Permiso_id==1||!this.grupoEdit.Permiso_id==7){
  return true;
}else{return false;}
    // TotalRows() {
    //   // return this.grupoEdit.usuarios.length;
    //   console.log(this.grupoEdit);
    //   return 2;
    // }
  },
  },
  async created() {
    await this.inicio();
  },
  methods: {
    verifica_tiempo(item){
    //  moment(item.created_at)
        return true;
    },
    cambiarbd(val){
      this.bd=val;
      this.eventdispatch();
    },
    showLinks(item) {
      console.log(item)
      return {
        html: true,
        customClass: "popHover",
        title: () => {
          return "Usarios";
        },
        content: () => {
          let links = [];
          for (let i = 0; i <= item.length; i++) {
           links.push("<br></br>" + (i + 1) + ": " +item.user);

          }

          return links;
        }
      };
    },
  eventsorter() {
      this.eventdispatch();
    },
       eventdispatch() {
        let paquete={
        currentpage: this.activePage,
        itemsLimit: this.itemsLimit,
        columnFilter: this.columnFilter,
        tableFilter: this.tableFilter,
        sorter: this.sorter,
        filtro:this.filtro,
        bd:this.bd,

         }
         console.log(paquete,"paquete")
   this.getPermisosAll(paquete)

      // this.$emit("getparams", {
      //   currentpage: this.activePage,
      //   itemsLimit: this.itemsLimit,
      //   columnFilter: this.columnFilter,
      //   tableFilter: this.tableFilter,
      //   sorter: this.sorter
      // });
    },
      changeItemsLimit(val) {
      this.itemsLimit = val;
      this.eventdispatch();
    },
    leido(){
      console.log("leido");
 this.GroupUsers.users=[];
    },
    async SaveName() {
      this.show = true;
      let request = {};
      request.Name = this.NewName;
      request.Permission_id = this.grupoEdit.id;
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
      }finally{
         this.show = false;
      }
    },
    ChangeName(op) {
   this.changeName = !this.changeName;
         if (op === 2) {
       this.NewName = "";
      }
    },
    CerrarNewModal() {
      this.getPermisosAll();
      this.modalUsuariosNew = false;
    },
    EditPermissions(value) {

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
      newObj.Permission_id = this.grupoEdit.id;
      newObj.User_id = this.IdUserDelete;
      newObj.Visibility_id = visibilidad;
      newObj.Permissions_id = value.Permisos;
      newObj.Model_id = [];
      newObj.Date1 = value.FechD;
      newObj.Date2 = value.FechH;
      newObj.All = this.AplicaTodos;
      //newObj.All = 9849874;

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
          //  return false
          // console.log(res.data);
          if (res.code === 201) {
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Usuario editado",
              icono: "success"
            });
            // Se limipian los campos
            this.NombreUsuario = "";

            // this.IdUserDelete = -1;
            // this.EditandoPermiso = false;
            // this.AplicarTodosUsu = false;
            // this.$refs.niveles.ClearNiveles();
            // this.$refs.niveles.EditaPermisos(1);
            // this.getPermisosUsuario(this.recargarEdit);
            this.show = false;
            this.CerrarNewModal();
                  //this.modalUsuariosNew = false;

           // this.AplicaTodos = false;
            // this.inicio();
          }
             if (res.code === 423) {
           Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: res.message,
})
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
        console.log(error)
        alert.PermisosOK({
          Tit: "Usuarios",
          Text: "La fecha final no puede ser menor a la inicial",
          icono: "info"
        });
      }finally{
         this.show = false;
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

            let alert=alertas();
        if(this.GroupUsers.users.length==0){
            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Selecciona al menos 1 usuario",
              icono: "info"
            });
            return false;
        }
      this.DataPermissions = data;
      let junta=this.DataPermissions.Tipos.join("");
      if (junta == 234) {
        this.Visibilidad = 1;
      }else{
        this.Visibilidad=junta;
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
    async pintadatos(){

         let espera=await this.calculauser;
         if(espera){
this.$refs.niveles.PintarEditado(this.valueUser);
         }

    },
    agregauser(){
       this.IdUserDelete="-1"
      //this.grupoEdit.Permiso_id="null"

      if(this.grupoEdit.Permiso_id==null){
        console.log("tenemos permisos varios aqui?")
        this.$store.commit("SetAdminNo",true); ///quitar admin
       this.$store.commit("Sin_Permisos",false); ///quitar permisos solo boton queda
      }else{
     this.$store.commit("Sin_Permisos",true); ///quitar permisos solo boton queda

      }
      this.adduserv2=!this.adduserv2;
      // if(!this.adduserv2){
      //   this.tittle_interactive="Editar Permiso";
      // }else{

        this.tittle_interactive="Crear Permiso";


 //     }

    },

    Pagination(id) {
      // this.$refs.niveles.EditaPermisos(1) ;
        this.$store.commit("SetAdminNo",false); ///quitar admin

     this.IdUserDelete = id.user;
      this.adduserv2=false;
      console.log("pagination")
console.log(id)
      // Nueva version de permisos
      if(this.desahabilitar){
        console.log(" noadmin")


      this.valueUser.Visibilidad = id.visibilidad;
      this.valueUser.FechaI = id.inicia;
      this.valueUser.FechaF = id.termina;
      this.valueUser.Permisos = id.permisos;
      // console.log("pintadatos",this.valueUser)
      // console.log("id que llega",id)
      this.tittle_interactive="Editar Permiso de "+ this.IdUserDelete
      this.pintadatos()

      }else{
        console.log("admin")
      }
      return false;



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
    convergencia(res){
    ////this.GroupUsers.users.map(item => item.id);   estos son  los ids de los usuarios mandados en el response
      //  let admins=this.GroupUsers.users.filter(e=>e.id==
 console.log("res")
 console.log(res)
 this.respuesta={
        propietarios:[],
        admins:[],
        detalles:[],
      }

     let admins=[];
      let propietarios=[];
      let detalles=[];
      for(let a=0;a<this.GroupUsers.users.length;a++){

            for(let p=0;p<res.propietarios.length;p++){
              if(this.GroupUsers.users[a].id==res.propietarios[p]){
                  propietarios.push(this.GroupUsers.users[a]);
                continue;
              }
            }
                          if(res.hasOwnProperty('admins')){

            for(let ad=0;ad<res.admins.length;ad++){
                if(this.GroupUsers.users[a].id==res.admins[ad]){
                  admins.push(this.GroupUsers.users[a]);
                continue;
              }
            }
                          }
              if(res.hasOwnProperty('detalles')){
            for(let de=0;de<res.detalles.length;de++){



                if(this.GroupUsers.users[a].id==res.detalles[de].user){
                  res.detalles[de].formated=[];
                  for(let ch=0;ch<res.detalles[de].permisos_repetidos.length;ch++){

                        switch(res.detalles[de].permisos_repetidos[ch]){
                          case 2:
                            res.detalles[de].formated.push("Ver");
                            break;
                          case 3:
                            res.detalles[de].formated.push("Editar");
                            break;
                          case 4:
                            res.detalles[de].formated.push("Crear");
                            break;
                          case 5:
                            res.detalles[de].formated.push("Eliminar");
                            break;
                          case 8:
                            res.detalles[de].formated.push("Reportes");
                            break;
                          case 9:
                            res.detalles[de].formated.push("Asignar status");
                            break;
                        }
                  }
                    this.GroupUsers.users[a].detalles=res.detalles[de];
                    detalles.push(this.GroupUsers.users[a]);
                  continue;
             }
            }
  }
            //// fin de detalles





      }
         this.respuesta={
            propietarios:propietarios,
            admins:admins,
            detalles:detalles
          }
           if (this.respuesta.propietarios.length==0&this.respuesta.admins.length==0&this.respuesta.detalles.length==0) {
                  Swal.fire({
  icon: 'success',
  title: 'Permiso',
  text: "Todos los permisos se han creado con éxito",
})
            // Se limpia en model de usuarios seleccionados
           // this.ClearSmall();
          }else{
                             Swal.fire({
  icon: 'info',
  title: 'Permiso',
  text: "Revisa los permisos creados",
})
    this.$bvModal.show("modal-detalles");

          }
      // console.log("inicia bucle")
      // console.log(admins)
      // console.log(propietarios)
      // console.log(detalles)
      // console.log("termina bucle")

    },
    async AgregarUsuario() {


      let request = {};
      request.Users = this.GroupUsers.users.map(item => item.id);
      request.Permission_id = this.grupoEdit.id;
      request.Visibility_id = this.Visibilidad;
      request.Permissions_id = this.GrupoPermisos;
      request.Date1 = this.FechaI;
      request.Date2 = this.FechaE;
      const alert = alertas();
      try {
        const repo = repoupdateprofileuser();
        await repo.AddUsuarioGrupo(request).then(res => {
          console.log("addusers adnubs")
            console.log(res);
       return this.convergencia(res);
    console.log(res);
    console.log(this.GroupUsers.users)
    console.log("aqui arriba")

    return false;

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
      }finally{
        this.getPermisosAll();
        this.modalUsuariosNew=false;
      }
    },
    async EliminaUsu() {
      this.show = true;
      let newObj = {};
      newObj.Permission_id = this.grupoEdit.id;
      newObj.User_id = this.IdUserDelete;
      const alert = alertas();

      try {
        const repo = repoupdateprofileuser();
        await repo.DelUsuarioGrupo(newObj).then(res => {
         console.log(res);
         console.log(res.code)
          if (res.code == 201) {
            this.grupoEdit.Usuarios = this.grupoEdit.Usuarios.filter(
              ele => ele.user != newObj.User_id
            );

            alert.PermisosOK({
              Tit: "Usuarios",
              Text: "Usuario eliminado",
              icono: "success"
            });
            this.NombreUsuario = "";
            this.IdUserDelete = -1;
           // this.$refs.niveles.ClearNiveles();
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
               this.show = false;
      }
    },
    // Cerrar la ventana modal cuando se hace un permiso
    closeModal() {
      this.modalGrupos = false;
      this.inicio();
    },
    // Cerrar la ventana modal de editar un permiso
    closeModalEdit() {
      this.modalUsuariosNew = false;
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

      await this.eventdispatch(); //// permisos
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
    async getPermisosAll(paquete) {
      try {
        this.show=true;
        const repo = repoupdateprofileuser();
        await repo.consPermisosCuenta(paquete).then(res => {
          console.log(res);
          console.log("res paraitemes ?")
          this.items = res.data;
          this.datosall.maxPages=res.last_page;
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
      finally{
        this.show=false;
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
          // return res

          this.items=res.data;
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getPermisosUsuario(item) {
      this.grupoEdit = item;
      this.adduserv2=false;
      this.IdUserDelete=-1;
      this.modalUsuariosNew = true;
      if(item.Permiso_id==null){
        ///permisos varios
     // this.$store.commit("SetAdminNo",true); ///quitar admin
      this.$store.commit("Sin_Permisos",false);
      }else{
       this.$store.commit("Sin_Permisos",true); ///quitar permisos solo boton queda
      }
      console.log(item)
      console.log("item arriba")
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
                 Swal.fire({
  icon: 'success',
  title: 'Eliminado',
  text: 'Permiso Eliminado con éxito',
})
          }

        });
      } catch (error) {
        //console.log(error);
      }finally{
 this.show = false;
      }
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Eliminar",
        text: "¿ Estas seguro de elimina este permiso ?",
        icon: "warning",
        // showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borralo!"
      }).then(result => {
        if (result.value) {
          this.delGrupo(id);
        } else {
          return;
        }
      });
      // this.$bvModal
      //   .msgBoxConfirm("¿ Estas seguro de elimina este permiso ?", {
      //     title: "FAVOR DE CONFIRMAR",
      //     size: "sm",
      //     buttonSize: "sm",
      //     okVariant: "danger",
      //     okTitle: "Si",
      //     cancelTitle: "No",
      //     footerClass: "p-2",
      //     hideHeaderClose: false,
      //     centered: true
      //   })
      //   .then(value => {
      //     if (value == true) {
      //       this.delGrupo(id);
      //     } else {
      //       return;
      //     }
      //   });
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
      // this.modalUsuariosNew = false;
      // this.Valores = {};
      // this.GroupUsers.users = [];
      // this.GroupUsers.groups = [];
      // this.UsuariosAll = [];
      // this.Visibilidad = 0;
      // this.DataPermissions = {};
      // this.GrupoPermisos = [];
      // this.MostrarAcordeon = false;
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
    loadingin() {
      this.loading = this.loadingin;
    },
    activePage() {
      this.eventdispatch();
    },
    sorter: {
      handler() {
        this.eventsorter();
      },
      deep: true
    },
    tableFilter() {
      this.eventdispatch();
    },
    columnFilter() {
      this.eventdispatch();
    }
  }
};
</script>

<style scoped>
.popHover {
  max-height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.btn-primary {
  color: #fff;
  /* background-color: rgb(31, 104, 172); Color azul*/
  background-color: rgba(0, 129, 194, 255);
  /* background-color: teal; */
  border-color: #005a5a;
}
.btn-primary:hover {
  color: #fff;
  background-color: rgba(0, 145, 194, 255);
  border-color: #005a5a;
}

/* Color para boton info en bootstrap */
.btn-info {
  color: #fff;
  /* background-color: rgb(31, 104, 172); */
  background-color: #229ca5;
  border-color: #005a5a;
}
.btn-info:hover {
  color: #fff;
  background-color: #3b9c96;
  border-color: #005a5a;
}
</style>
