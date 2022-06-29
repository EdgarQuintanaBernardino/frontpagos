<template>
  <div>
    <!-- MODULO 1 Mensaje de caso de exito o fracaso -->
    <b-toast
      variant="success"
      id="example-toast"
      title="Nombre correcto"
      autoHideDelay="1000"
    >
      Valido por los proximos 5 minutos
    </b-toast>
    <!-- MODULO 1 Mensaje de caso de fracaso -->
    <b-toast
      variant="danger"
      id="example-toast2"
      title="Nombre ya existente"
      autoHideDelay="1000"
    >
      Cambia el nombre del permiso
    </b-toast>
    <!-- MODULO 2 Mensaje de confirmacion de departamento -->
    <b-toast
      variant="success"
      id="example-toast3"
      title="Departamento seleccionado"
      autoHideDelay="1000"
    >
      {{ names.departamento }}
    </b-toast>
    <!-- Codigo 204 en caso de encontrar usuarios ACTUALIZACION: los cambiamos por un modal-->
    <!-- <b-toast
      variant="warning"
      id="example-toast4"
      title="Coincidencias en permisos"
      autoHideDelay="300000"
    >
      Existen {{ Coincidencias.Usuarios }} usuarios con permisos identicos en el
      permiso "{{ Coincidencias.NombrePermiso }}""
      <center>
        <b-row>
          <b-col class="col-6 mt-2">
            <b-button size="sm" variant="secondary">
              Descartar Permiso
            </b-button>
          </b-col>
          <b-col class="col-6 mt-2">
            <b-button size="sm" variant="success">
              Crear Permiso
            </b-button>
          </b-col>
        </b-row>
      </center>
    </b-toast> -->
    <CProgress
      :value="counter"
      color="success"
      animated
      style="height:20px;"
      class="mt-1 mb-3"
    />
    <b-row>
      <b-button
        class="Btnperl"
        @click="cambFormint(1)"
        :class="Formint === 1 ? 'Btnpersel' : darkMode ? 'Btnperd' : 'Btnperl'"
        pill
        id="empBtn"
      >
        <b-icon icon="building" font-scale="2.2"></b-icon>
      </b-button>
      <b-tooltip target="empBtn" triggers="hover">
        Empresas y Cuentas <br />{{ value.Empresas.nombre }}</b-tooltip
      >
      <!-- <b-button
        :disabled="
          !value.Empresas.hasOwnProperty('id') || value.Propietario == 1
        "
        class=" Btnperl"
        @click="cambFormint(2)"
        :class="Formint === 2 ? 'Btnpersel' : darkMode ? 'Btnperd' : 'Btnperl'"
        pill
        id="cuenBtn"
      >
        <b-icon icon="credit-card-fill" font-scale="2.2"></b-icon>
      </b-button> -->
      <!-- <b-tooltip target="cuenBtn" triggers="hover"
        >Cuentas bancarias<br />{{ value.Cuenta.nickname }}
      </b-tooltip> -->
      <b-button
        :disabled="Flag < 3"
        class=" Btnperl"
        @click="cambFormint(3)"
        :class="Formint === 3 ? 'Btnpersel' : darkMode ? 'Btnperd' : 'Btnperl'"
        pill
        id="modBtn"
      >
        <b-icon icon="columns-gap" font-scale="2.2"></b-icon>
      </b-button>
      <b-tooltip target="modBtn" triggers="hover"
        >Módulos<br />{{ value.Departamentos.nombre }}</b-tooltip
      >
      <b-button
        :disabled="Flag < 4"
        class=" Btnperl"
        @click="cambFormint(4)"
        :class="Formint === 4 ? 'Btnpersel' : darkMode ? 'Btnperd' : 'Btnperl'"
        pill
        id="gruBtn"
      >
        <b-icon icon="people-fill" font-scale="2.2"></b-icon>
      </b-button>
      <b-tooltip target="gruBtn" triggers="hover">Grupos y usuarios</b-tooltip>
      <b-button
        :disabled="Flag < 5"
        class=" Btnperl"
        @click="cambFormint(5)"
        :class="Formint === 5 ? 'Btnpersel' : darkMode ? 'Btnperd' : 'Btnperl'"
        pill
        id="perBtn"
      >
        <b-icon icon="ui-checks" font-scale="2.2"></b-icon>
      </b-button>
      <b-tooltip target="perBtn" triggers="hover"
        >Visibilidad de registros y Permisos</b-tooltip
      >
      <!-- <b-col>
          <b-button class=" Btncgru" @click="cambFormint(5)" :class="darkMode ? 'Btnperd' : 'Btnperl'" pill id="cgruBtn">
            <b-iconstack font-scale="2.2">
              <b-icon stacked icon="people-fill" scale=".8" ></b-icon>
              <b-icon stacked icon="circle" scale="1.3"></b-icon>
            </b-iconstack>
          </b-button>
          <b-tooltip target="cgruBtn" triggers="hover">Crea grupos</b-tooltip>
        </b-col> v-if="value.Cuenta.id > -1"  || v-if="value.Departamentos.id > -1" || v-if="value.Usuarios.length > 0" -->
    </b-row>
    <!-- Slashs de estados ejemplo "Prueba1/barra/barra2" -->
    <b-row v-if="Formint > 1" class="ml-lg-5 mt-3 ml-sm-1 ml-md-3">
      <p v-if="Formint > 1">{{ ValidateName.Name }} <b>/</b></p>
      <!-- <p v-if="Formint > 1" class="ml-1">{{ "Cuenta tal" }} <b>/</b></p> -->
      <p v-if="Formint > 3" class="ml-1">{{ names.departamento }} <b>/</b></p>
      <p v-if="Formint > 4" class="ml-1">
        Usuarios:{{ GroupUsers.users.length }}
      </p>
    </b-row>
    <!-- <br v-if="value.Propietario === 1" /> -->
    <!-- Manda un mensaje de que se esta dando todos los permisos style="background:rgb(20,51,87);"-->
    <div v-if="Formint > 4 && Crear.Propietario === 1" class="aviso mb-3 mt-3">
      <hr size="5" />
      <b class="p-2">{{
        Crear.Propietario === 1
          ? "Se está dando permiso a todas las cuentas bancarias y módulos"
          : ""
      }}</b>
      <hr size="4" />
    </div>
    <!-- Pregunta si deseea agregra un propietario -->
    <div class="mt-3 mb-3" v-if="Formint > 4 && Crear.Propietario != 1">
      <hr size="5" />
      <b-row class="justify-content-center" v-if="propia">
        <label class="mr-2 mt-1 mb-1"
          >¿Desea asignar como propietario(s)?
        </label>
        <b-button
          class="mr-2 mb-1"
          variant="outline-success"
          @click="(Crear.Propietario = 1), test(1)"
        >
          Agregar
        </b-button>
        <b-button
          class="mr-2 mb-1"
          variant="outline-success"
          @click="cambiaEstatusTempo()"
          v-if="false"
        >
          Cambia "Validate"
        </b-button>
      </b-row>
    </div>
    <div v-if="Formint > 4 && Crear.Propietario === 1">
      <b-row class="justify-content-center">
        <label class="mr-2 mt-1 mb-1">Quitar propietario(s)</label>
        <b-button
          class="mr-2 mb-1"
          variant="outline-success"
          @click="(Crear.Propietario = 0), test(2)"
        >
          Quitar
        </b-button>
      </b-row>
    </div>
    <!-- Tab de empresas " -->
    <b-row v-if="Formint === 1">
      <b-col class="col-12">
        <b-card no-body class="mt-3">
          <center class="mt-2">
            <h4>Nombre del permiso</h4>
          </center>
          <div class="ml-2 mr-2">
            <!-- id="name" -->
            <CInput
              v-c-tooltip="{
                content: 'Minimo 4 caracteres',
                placement: 'top'
              }"
              class="mt-2"
              v-model="ValidateName.Name"
              placeholder="Nombre"
            />
          </div> </b-card
      ></b-col>
      <b-col class="col-6">
        <div>
          <center>
            <h5>Selecciona una empresa</h5>
          </center>
          <b-card no-body>
            <b-tabs pills card>
              <b-tab title="Propia(s)"   @click="resetcuentas" :active="propia?true:false">
                <b-card-text>
                  <b-list-group flush>
                    <b-list-group-item
                      :active="
                        ValidateName.Company_id === option.id ? true : false
                      "
                      v-for="option in Empresas"
                      :key="option.id"
                      href="#"
                      @click="select_empresa(option)"
                      >{{ option.nombre }}</b-list-group-item
                    >
                  </b-list-group>
                </b-card-text>
              </b-tab>
              <b-tab title="Externa(s)" @click="resetcuentasext" :active="!propia?true:false">
                <b-card-text>
                  <b-list-group flush>
                    <b-list-group-item
                      v-for="option in EmpresasExternas"
                      :key="option.id"
                      href="#"
                       :active="
                        ValidateName.Company_id === option.id ? true : false
                      "
                    @click="select_empresaext(option)"
                      >{{ option.nombre }} </b-list-group-item
                    >
                  </b-list-group>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-col>
      <!-- Modulo de cuentas -->
      <b-col class="col-6">
        <div>
          <center>
            <h5>Selecciona una cuenta       {{ this.ValidateName.Account_id, }}
                    {{ this.ValidateName.Company_id }}      {{ ValidateName.Name.length }}


            </h5>
          </center>
          <b-card no-body>
            <b-tabs pills card>
              <b-tab title="Mis Cuentas" active>
                <b-card-text>
                  <b-list-group flush>
                    <b-list-group-item
                      :active="
                        ValidateName.Account_id === option.id ? true : false
                      "
                      v-for="option in opciones"
                      :key="option.id"
                      @click="option.hasOwnProperty('cuenta')?select_cuenta_ext(option):select_cuenta(option.id)"
                      href="#"
                      >{{ option.hasOwnProperty('cuenta')?option.cuenta.nickname:option.nickname }}</b-list-group-item
                    >
                  </b-list-group>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </b-col>
      <CButton
        v-if="this.ValidateName.Account_id!=0&this.ValidateName.Company_id!=0&this.ValidateName.Name.length>5"
        class="ml-4 mr-4"
        block
        color="success"
        @click="validaNombre()"

      >Validar información
      </CButton
      >

      >
    </b-row>
    <!-- MODULO 2 -->
    <b-row v-if="Formint === 3">
      <!-- <Modulos
        v-if="Formint === 3"
        class="col-12"
        :Deptos="value.Departamentos"
        @ModSelect="selectMod"
      /> -->
      <b-col class="col-12">
        <center>
          <h4>Selecciona un departamento</h4>
        </center>
        <b-button-group vertical style="width: 100%;" class="mt-2 mb-2">
          <b-button
            :pressed="Crear.IdModel === option.id ? true : false"
            variant="light"
            class="block"
            v-for="option in DepartamentosNew"
            :key="option.id"
            @click="select_departamento(option)"
            ><h5>{{ option.nombre }}</h5></b-button
          >
        </b-button-group>
      </b-col>
    </b-row>

    <!-- MODULO 3 -->
    <b-row v-if="Formint === 4">
      <b-col class="col-12">
        <!-- Butones para seleccionar si es por grupos o por cada usuario -->
        <!-- <span>Grupos</span>
            <multiselect
              class="mt-2 mb-2"
              v-model="GruposSel"
              :options="Grupos"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Grupos"
              label="Name"
              track-by="id"

            >
            </multiselect> -->
        <b-card no-body class="p-3">
          <div class="mt-3">
            <center>
              <h4>Selecciona Usuarios</h4>
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
          <center>
            <h4>y/o Selecciona Grupos de Usuarios</h4>
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
        </b-card>
        <!-- <b-card no-body class="p-3"> </b-card> -->
        <CButton
          block
          color="success"
          @click="AddUsers()"
          :disabled="GroupUsers.users.length === 0"
          >Seleccionar usuarios</CButton
        >
      </b-col>
    </b-row>

    <!-- MODULO 4 -->
    <b-row v-if="Formint == 5">
      <b-col class="col-12">
        <b-card>
          <nivelesPermisos
            titleButton="CREAR PERMISO"
            ref="form"
            @EditPer="SelectPermissions"
          ></nivelesPermisos>
        </b-card>
      </b-col>
      <CModal
        :closeOnBackdrop="false"
        title="Usuarios con permisos de propietarios"
        :show.sync="UsersOwner"
      >
        <p>Los siguientes usuarios tienen permiso de propietario:</p>
        <b-list-group flush>
          <b-list-group-item
            variant="info"
            v-for="item in NombresUsuariosProp"
            :key="item.id"
            href="#"
            >{{ item.name }}
          </b-list-group-item>
        </b-list-group>
        <template #footer-wrapper>
          <div class="mx-3">
            <CButton
              color="info"
              block
              @click="RemoveUsers"
              v-if="NombresUsuariosProp.length != GroupUsers.users.length"
              >Borrar usuarios y continuar</CButton
            >
            <CButton
              color="secondary"
              block
              class="mb-3"
              @click="EditOwnerUsers"
              >Editar usuarios</CButton
            >
          </div>
        </template>
      </CModal>
      <!-- MODAL PARA VISOS DE COINCIDENCIAS -->
      <CModal
        :closeOnBackdrop="false"
        title="Existen permisos similares actualmente"
        :show.sync="UsersCoincidence"
      >
        <p>
          Los siguientes usuarios ya cuentan con acciones similares en otros
          permisos:
        </p>
        <b-list-group flush>
          <b-list-group-item
            variant="warning"
            v-for="item in NamesCoincidence"
            :key="item.id"
            href="#"
            >{{ item }}
          </b-list-group-item>
        </b-list-group>
        <template #footer-wrapper>
          <div class="mx-3">
            <CButton color="info" block @click="ChangeValidate()"
              >Crear aun con estos usuarios</CButton
            >
            <CButton
              color="success"
              block
              @click="RemoveUsersCoincidence()"
              v-if="NamesCoincidence.length != GroupUsers.users.length"
              >Borrar usuarios y continuar</CButton
            >
            <CButton
              color="secondary"
              block
              class="mb-3"
              @click="EditOwnerUsers(1)"
              >Editar usuarios</CButton
            >
          </div>
        </template>
      </CModal>
    </b-row>

    <!-- <p class="invisible">{{ validaFlujo }}</p>
    <div v-if="FrmConsultar">

    </div> -->
    <!-- Ventana modal para agregar un propietario  @show="console.log('se muestra')" -->
    <!-- <CModal
      :closeOnBackdrop="false"
      :centered="true"
      title="¿Desea asignar propietario?"
      :show.sync="modalPro"
    >
      <template #footer>
        <b-button
          class="mr-2 mb-1"
          variant="outline-secondary"
          :pressed="value.Propietario == 1"
          @click="
            value.Propietario = 1;
            modalPro = false;
            cambFormint(4);
          "
        >
          Si, agregar
        </b-button>
        <b-button
          class="mr-2 mb-1"
          variant="outline-secondary"
          :pressed="value.Propietario == 0"
          @click="
            value.Propietario = 0;
            modalPro = false;
            cambFormint(2);
          "
        >
          No
        </b-button>
      </template>
    </CModal> -->
    <!-- </CCardBody>
        </CCard> -->
           <b-modal id="modal-detalles2"  size="xl" title="Detalles del Permiso" hide-header >
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
import Swal from "sweetalert2";

import Multiselect from "vue-multiselect";
import { mapState } from "vuex";
// import datetime from "vuejs-datetimepicker";
import repoupdateprofileuser from "../../assets/repositoriosjs/repoupdateprofileuser";
// import respuestas from "../../assets/repositoriosjs/respuestas";
import alertas from "../../assets/repositoriosjs/alertas";
// import Empresas from "./subComponentes/Empresas";
// import Modulos from "./subComponentes/Modulos";
import Grupos from "./Grupos.vue";
// import TablaPermisos from "./TablaPermisos.vue";
// import GruposyUsuarios from "./subComponentes/GruposyUsuarios";
import NivelesPermisos from "./subComponentes/Niveles_Permisos";
// import Cuentas from "./subComponentes/Cuentas";

export default {
  components: {
    Grupos,
    // TablaPermisos,
    // Empresas,
    // Modulos,
    // GruposyUsuarios,
    NivelesPermisos,
    Multiselect
    // Cuentas
    // datetime
  },
  props: ["limpia"],
  data() {
    return {
      propia:true,
      todo_departamentos:[],
     respuesta:{
        propietarios:[],
        admins:[],
        detalles:[],
      },
      // Respuesta de coincidencias
      UsersRemoveCoincidence: [],
      RemoveAfeterCoincidence: [],
      NombresUsuariosProp: {},
      // Para mostrar los nombres de los usuarios en el modal
      NamesCoincidence: {},
      // Modal para usuarios con permisos de usuarios y modal Coincidencias
      UsersOwner: false,
      UsersCoincidence: false,
      DataPermissions: {},
      Flujo: false,
      Departamentos: [],
      DepartamentosNew: [],
      opciones: [],
      // cuentasRes:[],
      ValidateName: {
        Company_id: 0,
        Account_id: 0,
        Name: ""
      },
      valueName: 0,
      counter: 25,
      Formint: 1,
      Flag: 0,
      request: { Company_id: 0 },
      // JSON para crear un nuevo permiso
      value: {
        Empresas: {},
        Departamentos: {},
        Usuarios: [],
        Tipos: [],
        Permisos: [],
        Grupo: [],
        Propietario: 0,
        Cuenta: { id: -1, nickname: "" },
        GrupoPermiso: { Company_id: 0, Name: "" },
        FechI: "",
        FechF: "",
        Validate: true
      },
      //Toast Mensajes de alerta
      names: { departamento: "" },
      Coincidencias: {},
      //Modulo 3 Grupos y usuarios
      Usuarios: [],
      UsuariosAll: [],
      GroupUsers: {
        groups: [],
        users: []
      },
      UsersSel: [],
      GruposSel: [],
      Grupos: [],
      options: ["Usuario", "Empresa"],
      Empresas: [],
      EmpresasExternas: [],
      Cuentas: [],
      // JSON que se manda para la petición
      Crear: {
        Propietario: 0,
        // ID de la empresa
        IdCompany: 0,
        // Arreglo de usuarios
        Usuarios: [],
        // ID del permiso que se creo
        // IdPermiso: -1,
        //1 Dato para indicar la visibilidad
        Visibilidad: 0,
        // Arreglo de los check o Campos que  puede tener el permiso
        Permisos: [],
        // Campo no usado
        Model: [],
        // Id_de la cuenta
        IdCuenta: -1,
        //Id del departamento que se esta seleccionando
        IdModel: -1,
        //Campo de validacion para el usuario se cambia en caso de que aun asi lo quiera crear
        Validate: true,
        //Fechas de incio y termino del permiso
        FechI: "",
        FechF: ""
      }
      // Tipos: [],
      // Permisos: [],
      // AsigPropietario: [{ id: -1, prop: -1 }],
      // selected: true,
      // moduloselect: 0,
      // fields: [
      // {   key: 'id', label : 'N° Usuario' },
      //   { key: "nombre", label: "Nombre" }
      // ]
    };
  },
  computed: {
    ...mapState(["darkMode"])
    // validaFlujo() {
    // console.log(this.$parent.$parent.modalGrupos);
    // console.log("Flujo correcto");
    //   if (!this.$parent.$parent.modalGrupos) {
    //     this.limpiaForm();
    //   }
    //   let flujoOk = false;
    //   if (this.value.Empresas.hasOwnProperty("id")) {
    //     if (this.value.Propietario == 0) {
    //       this.value.Cuenta.id == -1
    //         ? this.cambFormint(2)
    //         : !this.value.Departamentos.hasOwnProperty("id")
    //         ? this.cambFormint(3)
    //         : this.value.Usuarios.length === 0
    //         ? this.cambFormint(4)
    //         : this.value.Tipos.length == 0 || this.value.Permisos.length == 0
    //         ? (flujoOk = false)
    //         : (flujoOk = true);
    //     } else {
    //       this.value.Cuenta.id = -1;
    //       this.value.Departamentos = {};
    //       this.value.Usuarios.length === 0
    //         ? this.cambFormint(4)
    //         : this.value.Tipos.length == 0 || this.value.Permisos.length == 0
    //         ? (flujoOk = false)
    //         : (flujoOk = true);
    //     }
    //   }
    //   return flujoOk;
    // },
    // returnCriterio() {
    //   return this.value.Empresas.label === "Empresa"
    //     ? this.Empresas
    //     : this.value.Empresas.label === "Usuario"
    //     ? this.Usuarios
    //     : null;
    // },
    // blockNiveles() {
    //   if (this.value.Tipos[0] == 1) {
    //     return [2, 3, 4];
    //   } else if (this.value.Tipos[0] == 2 || this.value.Tipos[0] == 4) {
    //     return [1, 3];
    //   } else if (this.value.Tipos[0] == 3 || this.value.Tipos[0] == 4) {
    //     return [1, 2];
    //   } else {
    //     return [];
    //   }
    // },
    // blockPermisos() {
    //   let val = this.value.Permisos[0];
    //   if (val == 2 || val == 3 || val == 4 || val == 5 || val == 8) {
    //     return [6, 7];
    //   } else if (val == 6) {
    //     return [2, 3, 4, 5, 7, 8];
    //   } else if (val == 7) {
    //     return [2, 3, 4, 5, 6, 8];
    //   } else {
    //     return [];
    //   }
    // }
  },
  methods: {
    select_cuenta_ext(option){
        let departamentos=[];
        for(let a=0;a<option.modelos.length;a++){
            let item={};
            switch (option.modelos[a]){
              case 2:
                item.id=2;
                item.nombre="Ingresos";
                departamentos.push(item);
                break;
               case 3:
                item.id=3;
                item.nombre="Egresos";
                departamentos.push(item);
                break;
            }

        }
        this.DepartamentosNew=departamentos;
        this.ValidateName.Account_id = option.id;

    },

    resetcuentasext(){
      this.propia=false;
      this.ValidateName.Company_id=0;
      this.ValidateName.Account_id=0;

      this.opciones=[];

    },
    resetcuentas(){
      this.propia=true;
      this.ValidateName.Company_id=0;
      this.ValidateName.Account_id=0;

      this.opciones=[];

    },
    cambiaEstatusTempo() {
      this.Crear.Validate = !this.Crear.Validate;
      console.log("Estatus de validate ->", this.Crear.Validate);
    },
    // OPCIONES DE LA VENTANA MODAL EN CASO DE TENER USUARIS CON PERMISOS DE PROPIETARIO
    RemoveUsers() {
      console.log(this.RemoveAfeterCoincidence);
      console.log(this.Crear.Usuarios);
      // Hacemos la comparacion y filtro de usuarios Propietarios con usuarios normales
      for (let a = 0; a < this.RemoveAfeterCoincidence.length; a++) {
        this.Crear.Usuarios = this.Crear.Usuarios.filter(
          ele => ele !== this.RemoveAfeterCoincidence[a]
        );
      }
      console.log(this.Crear.Usuarios);
      //Crea el permiso de nuevo sin lo usuarios seleccionados
      this.crearJSON();
    },
    RemoveUsersCoincidence() {
      let temporalUsers = this.GroupUsers.users;
      for (let a = 0; a < this.UsersRemoveCoincidence.length; a++) {
        temporalUsers = temporalUsers.filter(
          item => item.id !== this.UsersRemoveCoincidence[a].id
        );
      }
      const OnlyIDs = temporalUsers.map(item => item.id);
      this.Crear.Usuarios = OnlyIDs;
      this.crearJSON();
    },
    // CAMBIA LA PROPIEDAD VALIDATE PARA PASAR LA VALIDACIÓN
    ChangeValidate() {
      this.Crear.Validate = false;
      this.crearJSON();
    },
    EditOwnerUsers(op) {
      if (op === 1) {
        //Cierra la ventana modal users con coincidencias
        this.UsersCoincidence = false;
        this.Formint = 4;
      } else {
        //Cierra ventana modal de usuarios propietarios
        this.UsersOwner = false;
        this.Formint = 4;
      }
    },
    test(id) {
      this.$refs.form.SelectOwner(id);
    },
      select_empresaext(id) {
       this.ValidateName.Account_id = 0;
      // this.opciones = [];
      // let result = [];
      // for (let a = 0; a < this.Cuentas.length; a++) {
      //   for (let b = 0; b < this.Cuentas[a].empresas.length; b++) {
      //     if (this.Cuentas[a].empresas[b].id == id) {
      //       result.push(this.Cuentas[a]);
      //     }
      //   }
      // }
      this.opciones = id.cuentas;
      this.ValidateName.Company_id = id.id;



      //this.DepartamentosNew=this.todo_departamentos;

    },
    // Selecciona una empresa para un permiso
    select_empresa(id) {
this.DepartamentosNew=this.todo_departamentos;
console.log(this.DepartamentosNew)
this.ValidateName.Account_id = 0;
      // this.opciones = [];
      // let result = [];
      // for (let a = 0; a < this.Cuentas.length; a++) {
      //   for (let b = 0; b < this.Cuentas[a].empresas.length; b++) {
      //     if (this.Cuentas[a].empresas[b].id == id) {
      //       result.push(this.Cuentas[a]);
      //     }
      //   }
      // }
      this.opciones = id.cuentas;
      this.ValidateName.Company_id = id.id;
    },
    // Selecciona una cuenta de una empresa para un permiso
    select_cuenta(id) {
      console.log(id);
            this.ValidateName.Account_id = id;
    },
    // JSON para la validacion del nombre
    async validaNombre() {
      try {
        const repo = repoupdateprofileuser();
        await repo.ValidateNameC(this.ValidateName).then(res => {
          // console.log(this.Usuarios);
          // console.log(res)
          // return false;
          if (res.code == 200) {
            // console.log(res);
            //Toast 1 correcto
            this.$bvToast.show("example-toast");
            //Mandamos el modulo de Tipos de cuentas
            this.Formint = 3;
            this.Flag = 3;
            // Consulta grupos con usuarios
            this.Flujo = !this.Flujo;
            // console.log(this.Formint);
            this.counter = 50;
          } else if (res.code == 204) {
            //Toast 1 correcto
            this.$bvToast.show("example-toast2");
          } else if (res.code === 403) {
            // En caso de que no se tengan los permisos
            this.$router.push(`/Login`);
          } else if (res.code == 422) {
            // Error del sistema, JSON con mal las propiedades

          //  this.$router.push(`/Page404`);
          }
        });
      } catch (error) {
        console.log("entra el error")
        console.log(error);
      }
    },
    Steps() {
      this.Flujo = !this.Flujo;
    },
    select_departamento(op) {
      this.Crear.IdModel = op.id;
      //Avanza al siguiente TAB
      this.Formint = 4;
      this.Flag = 4;
      this.counter = 75;
      //TOAST de confirmacion
      this.names.departamento = op.nombre;
      this.$bvToast.show("example-toast3");
      this.getGruposAll(this.ValidateName.Company_id);
      this.getUsuarios();
    },
    GruposAdd(id) {
      let result = [];
      for (let a = 0; a < id.length; a++) {
        for (let b = 0; b < id[a].users.length; b++) {
          result.push(id[a].users[b]);
        }
      }
      this.GroupUsers.users = result;
      var hash = {};
      this.GroupUsers.users = this.GroupUsers.users.filter(function(current) {
        var exists = !hash[current.id];
        hash[current.id] = true;
        return exists;
      });
      console.log(this.GroupUsers.users);
    },
    GruposSub() {
      if (this.GroupUsers.users.length == 0) {
        this.GroupUsers.users = [];
      }
    },
    AddUsers() {
      // console.log(this.GroupUsers.users);
      // Se agregan al JSON principal
      // Se cambia la bandera para accceder al cuarto modulo asi como mostrar la barra de progreso
      this.Flag = 5;
      this.Formint = 5;
      this.counter = 100;
      this.$store.commit('Sin_Permisos',false)
      this.$store.commit('SetAdminNo',false)
    },
    //Funcion para obtener los niveles y permisos del componente hijo
    SelectPermissions(data) {

       console.log(data);
      // console.log(data.Tipos[0]);
      this.DataPermissions = data;
      // console.log(this.DataPermissions);
      if (this.DataPermissions.Tipos.join("") == 234) {
        this.Crear.Visibilidad = 1;
      }
      if (this.DataPermissions.Tipos.join("") == 24) {
        this.Crear.Visibilidad = 24;
      }
      if (this.DataPermissions.Tipos.join("") == 34) {
        this.Crear.Visibilidad = 34;
      }
      if (this.DataPermissions.Tipos == 2) {
        this.Crear.Visibilidad = 2;
      }
      if (this.DataPermissions.Tipos == 4) {
        this.Crear.Visibilidad = 4;
      }
      if (this.DataPermissions.Tipos == 3) {
        this.Crear.Visibilidad = 3;
      }
      // Validacion de administrador
      this.Crear.IdCompany = this.ValidateName.Company_id;
      this.Crear.IdCuenta = this.ValidateName.Account_id;
      const idusers = this.GroupUsers.users.map(ele => ele.id);
      this.Crear.Usuarios = idusers; //AGREGADO
      this.Crear.Permisos = this.DataPermissions.Permisos; //AGREGADO
      this.Crear.FechI = this.DataPermissions.FechD;
      this.Crear.FechF = this.DataPermissions.FechH; //AGREGADO
      // this.creaGrupo();


      this.crearJSON();
    },
    // GRUPOS Y USUARIOS
    // async selecGrupo() {
    //   this.UsersSel = [];
    //   // console.log(this.GruposSel);
    //   if (this.GruposSel != null) {
    //     let grupos = this.GruposSel.map(elem => {
    //       let ConsUs = {};
    //       ConsUs.Id = elem.id;
    //       ConsUs.Name = elem.Name;
    //       ConsUs.Company_id = parseInt(elem.pivot.company_id);
    //       return ConsUs;
    //     });
    // let ConsUs = {};
    // ConsUs.Id = this.GruposSel.id;
    // ConsUs.Name = this.GruposSel.Name;
    // ConsUs.Company_id = parseInt(this.GruposSel.pivot.company_id);
    //   for (let elem of grupos) {
    //     await this.ConsUsersGrupos(elem);
    //   }
    //   let newArr = [];
    //   for (let elem of this.UsersSel) {
    //     if (!newArr.find(el => el.id == elem.id)) {
    //       newArr.push(elem);
    //     }
    //   }
    //   this.UsersSel = newArr;
    // }
    // this.$emit("grupoSelect", this.GruposSel);
    // this.$emit("usuarioSelect", this.UsersSel);
    // },
    // Se asigna un permiso
    // asignaPermiso(data) {
    //   this.value.GrupoPermiso = data;
    // },
    // selectCuenta(data) {
    //   this.value.Cuenta = data;
    //   this.cambFormint(3);
    // },
    // selectMod(data) {
    //   this.value.Departamentos = data;
    //   this.cambFormint(4);
    // },
    // selectEmp(data) {
    //   console.log("Llego");
    //   this.value.Empresas = data;
    // Datos de la empresa creada
    // console.log(data);
    //   if (this.value.Empresas.propietario === 1 && this.grupExist != 1) {
    //     this.modalPro = true;
    //   } else {
    //     this.cambFormint(2);
    //   }
    // },
    // cambiaFrm() {
    //   this.FrmConsultar = !this.FrmConsultar;
    // },
    // selectUsuario(data) {
    // Se esta mandando todo el arreglo y solo se requiere el ID ya no
    // this.value.Usuarios = data;
    // Manda los usuarios selecconados y los asigna a data
    // console.log(data);
    // },
    // selectGrupo(data) {
    //   this.value.Grupo = data;
    // },
    // selectTipos(data) {
    //   this.value.Tipos = data;
    // },
    // selectPermisos(data) {
    //   this.value.Permisos = data;
    // },
    limpiaForm() {
      // Se limpia este de manera temporal
      // Crear.Propietario = 1
      this.Crear.Propietario = 0;
      this.Crear.IdCompany = 0;
      this.Crear.Usuarios = [];
      // this.Crear.IdPermiso = -1;
      this.Crear.Visibilidad = 0;
      this.Crear.Permisos = [];
      this.Crear.Model = [];
      this.Crear.IdCuenta = -1;
      this.Crear.IdModel = -1;
      this.Crear.Validate = true;
      this.Crear.FechI = "";
      this.Crear.FechF = "";
      this.Crear.Usuarios = [];
      this.UsuariosAll = [];
      // this.GroupUsers = {
      this.GroupUsers.groups = [];
      this.GroupUsers.users = [];
      this.Formint = 1;
      this.Flag = 0;
      this.counter = 25;
      // this.ValidateName = {
      this.ValidateName.Company_id = 0;
      this.ValidateName.Account_id = 0;
      this.ValidateName.Name = "";
      this.Flujo = false;
      this.Crear.IdModel = 0;
      this.RemoveAfeterCoincidence = [];
      this.NombresUsuariosProp = {};
      this.UsersOwner = false;
      //Datos en venetana modal
      this.UsersRemoveCoincidence = [];
      this.UsersCoincidence = false;
    },
    // async creaJSON(creaG = true) {
    //   console.log(this.value.Tipos.sort().join(""));
    //   let request = {};
    //   if (creaG) {
    //     await this.creaGrupo();
    //   } else {
    //     let grupExis = this.$parent.$parent.items.find(
    //       elem => elem.nombre == this.$refs.compEmpresas.form.Name
    //     );
    //     this.value.GrupoPermiso.Id = grupExis.id;
    //   }
    //   request.Permission_id = this.value.GrupoPermiso.Id;
    //   request.Account_id = this.value.Cuenta.id;
    //   request.Model = this.value.Departamentos.id;
    //   request.Owner = this.value.Propietario == 1 ? true : false;
    //   request.Visibility_id = this.value.Tipos.sort().join("");
    //   request.Permissions_id = this.value.Permisos;
    //   request.Model_id = [];
    //   request.Users = this.value.Usuarios.map(elem => elem.id);
    //   request.Company_id = this.value.Empresas.id;
    //   request.Date1 = this.value.FechI.length == 0 ? 1 : this.value.FechI;
    //   request.Date2 = this.value.FechF.length == 0 ? 1 : this.value.FechF;
    //   request.Validate = this.value.Validate;
    //   console.log(request);
    //   // console.log("No pasa con un solo permiso");
    //   if (this.value.GrupoPermiso.hasOwnProperty("Id")) {
    //     await this.creaGPermiso(request);
    //     this.$emit("close");
    //   }
    // },

    // Crear el ID del permiso
    async creaGrupo() {
      try {
        let request = {};
        request.Company_id = this.ValidateName.Company_id;
        request.Name = this.ValidateName.Name;
        const repo = repoupdateprofileuser();
        await repo.creaGroupPermisos(request).then(res => {
          if (res.code == 201) {
            // Se le da un ID al permiso que se esta creando al JSON crear
            // this.Crear.IdPermiso = res.data.id;
            this.crearJSON();
          } else if (res.code == 204) {
            // Manda un mensaje de error por los grupos existentes
            console.log("Error");
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
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
    this.$bvModal.show("modal-detalles2");

          }
      // console.log("inicia bucle")
      // console.log(admins)
      // console.log(propietarios)
      // console.log(detalles)
      // console.log("termina bucle")

    },
    async crearJSON() {
      // console.log(this.GroupUsers.users);
      // console.log(this.NombresUsuariosProp);
      try {
        let request = {};
        request.Name = this.ValidateName.Name;
        // request.Permission_id = this.Crear.IdPermiso;
        request.Account_id = this.Crear.IdCuenta;
        request.Model = this.Crear.IdModel;
        request.Owner = this.Crear.Propietario;
        request.Visibility_id = this.Crear.Visibilidad;
        request.Permissions_id = this.Crear.Permisos;
        request.Model_id = [];
        request.Users = this.Crear.Usuarios;
        request.Company_id = this.Crear.IdCompany;
        request.Date1 = this.Crear.FechI;
        request.Date2 = this.Crear.FechF;
        request.Validate = this.Crear.Validate;
        console.log(request);
       // return false;
        // this.limpiaForm();
        const alert = alertas();
        const repo = repoupdateprofileuser();
        await repo.creaGroup(request).then(res => {

          this.$emit("close");
          return this.convergencia(res)
          return false;
          if (res.code == 201) {
            let newObj = {
              Tit: "Permisos",
              Text: "Se creo correctamente",
              icono: "success"
            };
            alert.PermisosOK(newObj);
            this.limpiaForm();
            this.$emit("close");
          }
          if (res.code == 204) {
            this.ValidateCoincidence(res.data);
          }
          if (res.code == 205) {
            let resultado = [];
            for (let a = 0; a < res.data.length; a++) {
              let temporal = this.GroupUsers.users.filter(
                ele => ele.id === res.data[a]
              );
              resultado.push(temporal);
            }
            let usuariosPropietarios = [];
            for (let a = 0; a < resultado.length; a++) {
              usuariosPropietarios.push(resultado[a][0]);
            }
            // Guardamos los puros IDS
            let usuariosPropietariosIDS = [];
            for (let a = 0; a < resultado.length; a++) {
              usuariosPropietariosIDS.push(resultado[a][0].id);
            }
            // Falta imprimir lo que salga de aqui y agregar a otro
            this.RemoveAfeterCoincidence = usuariosPropietariosIDS;
            // console.log(this.RemoveAfeterCoincidence);
            this.NombresUsuariosProp = usuariosPropietarios;
            this.UsersOwner = true;
            // this.limpiaForm();
            // this.$emit("close");
          }
          // console.log(res);
        });
      } catch (error) {
        const alert = alertas();
        alert.PermisosError();
        console.log(error);
      } finally {
           this.limpiaForm();
      }
    },
    cambFormint(frm) {
      switch (frm) {
        case 1:
         console.log("inicio")

          this.counter = 25;
          break;
        case 2:
          this.counter = 25;
          this.Formint = 2;
          break;
        case 3:

          this.counter = 50;
          break;
        case 4:
          this.counter = 75;
          this.Crear.Propietario = 0;
          break;
        default:
          this.counter = 100;
          break;
      }
      try {
        this.Formint = frm;
        this.$refs.tooltip.$emit("open");
      } catch (error) {
        //console.log(error);
      }
    },
    // Cambia el estatus de la bandera para que deje pintar datos
    FlagStatus(status) {
      this.Flag = status;
    },
    ValidateCoincidence(res) {
      this.UsersRemoveCoincidence = res;
      let temporalUsers = this.GroupUsers.users;
      let resultados = [];
      let resultadosNombres = [];
      for (let x = 0; x < res.length; x++) {
        resultados = temporalUsers.filter(item => item.id === res[x].id);
        resultadosNombres.push(resultados);
      }
      let temporal = [];
      for (let y = 0; y < resultadosNombres.length; y++) {
        let onlyNames = "";
        onlyNames = resultadosNombres[y][0].name;
        temporal.push(onlyNames);
      }
      this.NamesCoincidence = temporal;
      this.UsersCoincidence = true;
    },
    // imp(id) {
    //   try {
    //     if (this.moduloselect === id) {
    //       this.moduloselect = 0;
    //     } else {
    //       this.moduloselect = id;
    //     }
    //   } catch (error) {
    //     // //         console.log(error);
    //   }
    // },
    // cambiaEmpresas() {
    //   try {
    //     let empresas = this.Empresas.filter(elem =>
    //       this.value.Empresas.includes(elem.id)
    //     );
    //     empresas = empresas.concat(
    //       this.EmpresasExternas.filter(elem =>
    //         this.value.Empresas.includes(elem.id)
    //       )
    //     );
    //     if (
    //       this.AsigPropietario.length > 0 &&
    //       this.value.Empresas.length < this.AsigPropietario.length &&
    //       this.moduloselect.length > 0 &&
    //       this.value.Empresas.length < this.moduloselect.length
    //     ) {
    //       this.AsigPropietario = this.AsigPropietario.filter(elem =>
    //         this.value.Empresas.includes(elem.id)
    //       );
    //       this.moduloselect = this.moduloselect.filter(elem =>
    //         this.value.Empresas.includes(elem.id)
    //       );
    //     } else {
    //       this.AsigPropietario = empresas.map(elem => {
    //         let newE = {};
    //         newE.id = elem.id;
    //         newE.prop = -1;
    //         return newE;
    //       });
    //     }
    //   } catch (error) {
    //     // console.log(error);
    //   }
    // },
    // isPropietario(id) {
    //   try {
    //     let aux = this.AsigPropietario.filter(elem => elem.id === id);
    //     return aux.length > 0 ? (aux[0].prop == 1 ? true : false) : false;
    //   } catch (error) {
    //     //         console.log(error);
    //   }
    // },
    // isModuloselect(id) {
    //   try {
    //     let aux = this.moduloselect.filter(elem => elem.id === id);
    //     return aux.length > 0 ? (aux[0].prop == 1 ? true : false) : false;
    //   } catch (error) {
    //     //         console.log(error);
    //   }
    // },
    // newPropietario(prop, id) {
    //   try {
    //     this.AsigPropietario.map(function(elem) {
    //       if (elem.id == id) {
    //         elem.prop = prop;
    //       }
    //       return elem;
    //     });
    //   } catch (error) {
    //     //         console.log(error);
    //   }
    // },
    // cambiarForm(op) {
    //   try {
    //     if (op === "+") {
    //       this.Form = this.Form + 1;
    //       this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
    //     } else if (op === "-") {
    //       this.Form = this.Form - 1;
    //       this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
    //     } else {
    //       this.Form = parseInt(op);
    //       this.$root.$emit("bv::toggle::collapse", "accordion-" + this.Form);
    //     }
    //   } catch (error) {
    //     //         console.log(error);
    //   }
    // },
    // validaSecciones(form) {
    //   switch (form) {
    //     case 1:
    //       return this.value.Empresas.length;
    //     case 2:
    //       return this.value.Departamentos.length;
    //     case 3:
    //       return this.value.Usuarios.length;
    //     case 4:
    //       return this.value.Tipos.length;
    //     case 5:
    //       return this.value.Usuarios.length;
    //     default:
    //       return 0;
    //   }
    // },
    // toggleAll() {
    //   this.selected = !this.selected;
    //   this.selected
    //     ? (this.value.Empresas = this.Empresas.map(elem => elem.id))
    //     : this.value.Empresas.splice(0, this.value.Empresas.length);
    // },
    async getGruposAll(id) {
      try {
        const repo = repoupdateprofileuser();
        let request = {};
        request.Company_id = id;
        await repo.consGroupAllEmpresas(request).then(res => {
          this.Grupos = res.data;
          console.log(this.Grupos);
          // let result = [];
          // for (let a = 0; a < this.Grupos.length; a++) {
          //   for (let b = 0; b < this.Grupos[a].users.length; b++) {
          //     result.push(this.Grupos[a].users[b]);
          //   }
          // }
          // this.UsuariosAll = result;
          // var hash = {};
          // this.UsuariosAll = this.UsuariosAll.filter(function(current) {
          //   var exists = !hash[current.id];
          //   hash[current.id] = true;
          //   return exists;
          // });
        });
      } catch (error) {
        console.log(error);
      }
    },
    // consulta a todos los usuarios
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then(res => {
          // console.log(res);
          // console.log(res);
          this.UsuariosAll = res.data.map(function(obj) {
            let newObj = {};
            newObj.name = obj.name;
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
    async getCuentas(id) {
      try {
        const repo = repoupdateprofileuser();
        let request = {};
        request.Company_id = id;
        await repo.getmycuentas().then(res => {
          this.Cuentas = res.data.cuentas;
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    },
    async getEmpresasExt() {
      try {
        // let payload={
        //     Company_id:5
        // }
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then(res => {
            let empresas_externas= res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.empresa.nombre;
            newObj.id = obj.empresa.id;
           // let ncuentas=[];
            // for(let a=0;a<obj.cuentas.length;a++){
            //       //  for(let b=0;b<obj.cuentas[a].cuenta.length;b++){

            //           ncuentas.push(obj.cuentas[a].cuenta.nickname);
            //       //  }
            // }
            // newObj.ncuentas=obj.cuentas.map(function(obj1){
            //   return obj1.cuenta.map(function(obj2){ return obj2.nickname});
            // });


            newObj.cuentas=obj.cuentas;
            return newObj;
          });
          this.EmpresasExternas =empresas_externas;
      console.log("result de empresas externas");
      console.log( this.EmpresasExternas)

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
          console.log(res.data.data)
          console.log("arriba empresas")
          this.Empresas = res.data.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.id = obj.id;
            newObj.propietario = 1;
            newObj.cuentas=obj.cuentas;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async getDepartamentos() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consDeparamentos().then(res => {
          let inicia = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.Name;
            newObj.id = obj.id;
            console.log(newObj);
            return newObj;
          });

          inicia =inicia.filter(
            ele => ele.id !== 5
          );
          this.todo_departamentos=inicia;
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    // async getUsuarios() {
    //   try {
    //     const repo = repoupdateprofileuser();
    //     await repo.onlyusers().then(res => {
    //       this.Usuarios = res.data.map(function(obj) {
    //         let newObj = {};
    //         newObj.nombre = obj.name;
    //         newObj.id = obj.id;
    //         // newObj.email = obj.email;
    //         // newObj.telefono = obj.telefono;
    //         return newObj;
    //       });
    //     });
    //   } catch (error) {
    //     //         console.log(error);
    //   } finally {
    //     //
    //   }
    // },
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
    }
    // async getPermisos() {
    //   try {
    //     // let temp = {};
    //     const repo = repoupdateprofileuser();
    //     await repo.consPermisos().then(res => {
    //       this.Permisos = res.data.map(function(obj) {
    //         let newObj = {};
    //         newObj.nombre = obj.name;
    //         newObj.id = obj.id;
    //         newObj.desc = obj.descripcion;
    //         // if(obj.id===7){
    //         //   temp=newObj
    //         // }
    //         return newObj;
    //       });
    //       this.Permisos = this.Permisos.filter(elem => elem.id !== 1);
    //     });
    //     // this.Tipos.push(temp)
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     //
    //   }
    // }
    // async creaGPermiso() {}
  },
  watch: {
    ValuesProp: function() {
      console.log(this.limpia);
    }
  },
  async mounted() {
    await this.getEmpresas();
    await this.getEmpresasExt();
    await this.getDepartamentos();
    await this.getNivelesdeAccesos();
    // await this.getPermisos();
    //await this.getCuentas();
    await this.getUsuarios();
 //   this.Empresas = this.Empresas.concat(this.EmpresasExternas);
    // // for(let e of emp){
    // //         // console.log(emp.id);
    // //         // this.Grupos.push(await this.getGrupos(emp.id));
    // //         await this.getGrupos(e.id)
    // //     }
    this.Grupos = this.Grupos.flat();
  }
};
</script>

<style scoped>
.tag {
  background: rgba(6, 122, 21, 0.842);
  color: white;
  margin-left: 1%;
  padding-left: 2%;
  padding-bottom: 0%;
  padding-right: 2%;
  cursor: default;
  font-family: arial;
  font-weight: bold;
}

.descrip {
  color: rgb(139, 139, 139);
  font-size: 0.8rem;
  display: table-cell;
}
.btnRotar {
  transform: rotate(-90deg);
  position: absolute;
  top: 15.5rem;
  left: -5.8rem;
  width: 15rem;
  font-weight: bold;
  /* height: 2.5rem; */
}
.colRotar {
  width: 5%;
}
.Btnperl {
  background: #3c4b64;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnpersel {
  background: #028723d0;
  border: none;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnperl:hover {
  background: #0f2854;
}
.Btnperd {
  background: #23242d;
  height: 3.8rem;
  width: 3.8rem;
  margin-right: auto;
  margin-left: auto;
}
.Btnperd:hover {
  background: #4d4f62;
}
.Btncgru {
  background: rgb(126, 126, 126);
  height: 4rem;
  width: 4rem;
}

.aviso {
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.BGL {
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #3c4b64;
  color: white;
  border-radius: 10px;
}
.BGDsel {
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #083e9bce;
  color: white;
  border-radius: 10px;
}

.BGD {
  margin: 0px;
  padding-left: 8px;
  padding-right: 8px;
  background: #23242d;
  border-radius: 10px;
}

.contenedor,
.contenedor:before,
.contenedor:after {
  position: relative;
  display: block;
  width: 40px;
  height: 40px;
  background: rgb(251, 250, 250);
  border-top-right-radius: 20px;
}
.contenedor {
  margin: 0px auto 0 10px;
  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.contenedor:before,
.contenedor:after {
  content: "";
  position: absolute;
}
.contenedor:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.contenedor:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
</style>
