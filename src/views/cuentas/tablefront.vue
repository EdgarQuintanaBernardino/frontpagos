<template>
  <div>

 <b-row>
        <b-col cols="12">
          <CCard>
               <CCardHeader v-if="datosall.header">
              <h3>
                {{datosall.headername}}
              <b-badge :variant="datosall.badgevariant" pill>{{ datosall.items.length }}</b-badge>
                <b-btn
                  :style="datosall.btnstyle"
                  :variant="datosall.btnvariant"
                  @click.prevent="addin()"
                  v-if="datosall.btnadd"
                >
                  <b-icon
                    :icon="datosall.iconadd"
                    :animation="datosall.animation"
                    :font-scale="datosall.fontscale"
                    :class="datosall.classicon"
                  ></b-icon
                  >{{datosall.namebtn}}
                </b-btn>
              </h3>
               </CCardHeader>
            <CCardBody>
              <b-row class="border-bottom">
                <b-col sm="6" md="6" class="mt-3 mb-3">
                  <b-input-group size="sm">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      id="filterInput"
                      :placeholder="datosall.placeholder"
                      style="font-size: 1em"
                      autocomplete="off"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!filter"
                        @click="filter = ''"
                        variant="danger"
                        style="color: white; font-size: 1em"
                        >Clear</b-button
                      >
                    </b-input-group-append>
                  </b-input-group>
                </b-col>

                <b-col sm="6" md="6" class="mt-3 mb-3">
                  <b-form-group
                    label="Filas mostradas:"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                  >
                    <b-form-select
                      v-model="datosall.totalfilasmostradas"
                      id="perPageSelect"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-table
                show-empty
                small
                stacked="md"
                :items="datosall.items"
                :fields="datosall.columns"
                :current-page="currentPage"
                :per-page="datosall.totalfilasmostradas"
                :filter="filter"
                :busy="false"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
                class="mt-3"
                striped
                hover
                bordered
                responsive
                id="table_generic"
              >
             <template v-slot:cell(empresa)="row">
                  <b-badge v-if="row.item.empresas[0]" variant="success">{{row.item.empresas[0].nombre}}</b-badge>
                                <b-badge v-else variant="danger">Sin empresa</b-badge>

                </template>

                <template v-slot:cell(nombre_cuenta)="row">
                              <b-row>

                    <b-col sm="12" class="mb-2 text-center">
                      <b-button
                        size="sm"
                        @click="row.toggleDetails"
                        variant="outline-info"
                        block
                        pill
                      >
                        <b-icon icon="eye"></b-icon><br />

                        {{ row.item.nombre_cuenta }}
                      </b-button>
                    </b-col>
                  </b-row>
                </template>

                <template v-slot:cell(razon)="row">{{
                  row.item.razonsocial
                }}</template>
                  <template v-slot:cell(telefono)="row">{{
                  row.item.telefonoContacto
                }}</template>

                      <template v-slot:cell(actions)="row">
              <b-container fluid>
                  <b-row class="justify-content-md-center">

                    <b-col cols="12"  :xl="datosall.resuelve" v-for="permi in getacciones" :key="permi">
                      <b-button
                    v-if="permi==1"
                        size="md"
                        block
                        @click.prevent="infoin(row.item)"
                        variant="outline-primary"
                        class="mr-1 mb-1 mt-2"
                      >
                        <b-icon icon="pencil"></b-icon>Editar
                      </b-button>
                      <b-button
                   v-if="permi==2"

                        size="md"
                        variant="outline-success"
                        block
                         class="mr-1 mb-1  mt-2"
                        @click="relationcuenta(row.item)"
                      >

                              <b-iconstack font-scale="1" animation="cylon">
                                    <b-icon
                            stacked
                            icon="unlock"
                            animation="throb"
                            variant="success"
                            scale="0.75"
                          ></b-icon> </b-iconstack>
                         <span class="font-lg"> Roles</span>



                      </b-button>
                      <b-button
                                          v-if="permi==3"

                        size="md"
                        variant="outline-danger"
                        block
                        @click="deleteevent(row.item)"
                         class="mr-1 mb-1  mt-2"
                      >
                        <b-icon icon="lock-fill"></b-icon>Bloquear
                      </b-button>
                                        </b-col>

                  </b-row>
                                </b-container>

                </template>
                 <template v-slot:row-details="row">
                  <b-card
                    v-if="row.item.nombre_cuenta"
                    border-variant="primary"
                    :header="row.item.nombre_cuenta"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
                  >
                    <b-table
                      responsive
                      :items="[{Nombre:row.item.nombre_cuenta,Número_de_Cuenta:row.item.numero_cuenta,
                Clabe:row.item.clabe ,Banco:row.item.banco,Empresas:row.item,
                NickName:row.item.nickname,Moneda:row.item.moneda }]"
                      :fields="['Nombre',
                    'Número_de_Cuenta','Clabe',
                    'Banco','NickName','Moneda','Empresas']"
                    >
                      <template v-slot:cell(Empresas)="row">
                        <ul>
                          <li
                            style="list-style:none"
                            v-for="item in row.item.Empresas.empresas"
                            :key="item.nombre"
                          >
                            <b-button
                              variant="outline-primary"
                              class="mb-2"
                              @click="showempresa(item)"
                            >
                              <b-icon icon="building"></b-icon>
                              {{item.nombre }}
                            </b-button>
                          </li>
                        </ul>
                      </template>
                    </b-table>
                  </b-card>
                </template>



                <template v-slot:head()="data">
                  <span class="text-info">{{ data.label.toUpperCase() }}</span>
                </template>



              </b-table>
              <b-row>
                <b-col sm="7" md="12" class="my-1">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="datosall.totalRow"
                    :per-page="datosall.totalfilasmostradas"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </CCardBody>
          </CCard>
        </b-col>
      </b-row>


</div>
</template>

<script>
import "regenerator-runtime/runtime";
import edituser from "@/views/windowmodal/edituser";
import permisosuser from "@/views/windowmodal/rolespermisosadduser";
import rqstin from "@/views/windowmodal/requestin";

export default {
  props:['datosallin','iddeletein','idedit']

  ,
  name: "",
  components: {
    edituser,
    permisosuser,
    rqstin,

  },
  data() {
    return {
      filteredTodos:[
        { key: "name", label: "Nombre Usuario", class: "text-center",component:{carpeta:"templates",file:"users"}},


],
        initrows:0,
        datosall:{
          placeholder:'generic',
          columns:[],
          resuelve:12,
          items:[],
          otheritems:[],




        },
        /// para arriba
      datosback: null,
      revisa:true,
        file:"",
      btnnew: false,
      btnpassword: false,
      btnedit: false,
      btndelete: false,
      btnrelation: false,
      permisosall: [],
      show: false,
      itemdelete:[],
      animationtable: false,
      items: [],
      deletesusers: [],
      requestsend: [],
      requestin: [],
      fields: [],
      totalRows: 0,
      currentPage: 1,
      pageOptions: [5, 10, 15, 25, 50],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },


  computed: {
    dynamicSlotName(){ return "name"; },


       stepComponent() {
         let c=this.datosall.component;
        return () => import(`@/views/tablesdetails/${c}`);

            },

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    empresas(row) {
      return row;
    },
    itemall() {
      return this.items;
    },
    getacciones(){

      return this.datosall.acciones;
    },

  },


  watch:{
    idedit:function(newval,oldval){
          this.actualizaregistro(newval);

    },
    datosallin:function(newval,oldvar){
      //this.datosall.items=[];

         this.datosall=newval;
         this.items=newval.items;

    },
    iddeletein:function(newval){
          this.eliminaregistro(newval);
           this.$emit('deletedetabla',this.iddeletein);


},

  },
  methods: {

     gomycell(key) {
    return `cell(${key})`; // simple string interpolation
  },
    actualizaregistro(item){
          let datosnuevos=[];
      for(let i=0;i<this.datosall.items.length;i++){this.datosall.items[i].id==item.id?
      datosnuevos.push(item):datosnuevos.push(this.datosall.items[i]);}
 this.datosall.items=datosnuevos;
    },
    infoin(item){
this.$emit('info',item);

    },
    relationcuenta(row){
            this.$emit('roles',row);

    },
      showempresa(item){
this.$emit('showempresa',item);
    },
     addin(){
this.$emit('add');
    },
  eliminaregistro(item){
  this.datosall.items = this.datosall.items.filter(
            (itemin) => itemin.id != item.id);
  },
  getitems(){
      this.$ ('recargatabla');

  },
     deleteevent(item){
         this.$emit('deleteevento',item);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
