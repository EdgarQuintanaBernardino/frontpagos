<template>
  <CRow>
    <CCol sm="12">
      <CCard>
        <CCardHeader
          v-if="datosall.header"
          class="d-flex flex-wrap"
          style="overflow:hidden;"
        >
          <div class="col-lg-5 col-xs-12 mt-1">
            <h4>
              {{ datosall.headername }}
              <b-badge :variant="datosall.badgevariant" pill>{{
                datosall.totalRow
              }}</b-badge>
            </h4>
          </div>

          <div class="col-xs-12 col-sm-12 col-lg-12 col-xl-7  mt-1">
            <b-button-group style="float:right">
              <b-btn
                @click="cambiatabla"
                variant="ligth"
                v-b-tooltip.hover
                :title="CuentasSus"
                ><b-icon
                  icon="credit-card"
                  :font-scale="datosall.fontscale"
                  :class="datosall.classicon"
                ></b-icon
                >Cuentas suspendidas</b-btn
              >
              <b-btn
                :style="datosall.btnstyle"
                :variant="datosall.btnvariant"
                @click.prevent="addin()"
                v-if="datosall.btnadd"
                class="ml-auto"
              >
                <b-icon
                  icon="credit-card2-front"
                  :font-scale="datosall.fontscale"
                  :class="datosall.classicon"
                ></b-icon
                >{{ datosall.namebtn }}
              </b-btn>
            </b-button-group>
          </div>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            :items="datosall.items"
            :fields="datosall.columns"
            index-column
            hover
            footer
            table-column
            :itemsPerPage="datosall.totalfilasmostradas"
            :sorter="{ external: true, resetable: true }"
            :columnFilter="{ external: true, lazy: true }"
            :table-filter="{
              external: true,
              lazy: true,
              placeholder: 'Buscar en toda la Tabla',
              label: 'Buscar:'
            }"
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
            <template #actions="row">
              <!-- <b-container fluid> -->
              <!-- <b-row class="justify-content-md-center"> -->
              <!-- <b-col
                    cols="12"
                  > :xl="datosall.resuelve"-->
              <td class="py-2">
                <center>
                  <b-button-group v-for="permi in getacciones" :key="permi">
                    <b-button
                      v-if="permi == 1"
                      @click.prevent="info(row.item)"
                      variant="primary"
                      class="mt-2 mr-2"
                      block
                    >
                      <b-icon icon="pencil-square"></b-icon> Editar</b-button
                    >

                    <b-button
                      v-if="permi == 2"
                      variant="success"
                      class="mr-1 mb-1 mt-2"
                      @click="relationcuenta(row.item)"
                    >
                      <b-iconstack font-scale="1" animation="cylon">
                        <b-icon
                          icon="unlock"
                          animation="throb"
                          variant="success"
                          scale="0.75"
                        ></b-icon>
                      </b-iconstack>
                      <span class="font-lg"> Roles</span>
                    </b-button>

                    <b-button
                      @click="confirmDelete(item.id)"
                      variant="danger"
                      v-if="permi == 3"
                      class="mt-2 mr-2"
                    >
                      <b-icon icon="trash-fill"></b-icon> Eliminar
                    </b-button>
                  </b-button-group>
                </center>
              </td>

              <!-- </b-col>
                </b-row> -->
              <!-- </b-container> -->
            </template>
            <template #nombre_cuenta="{ item }">
              <b-row>
                <b-col sm="12" class="mb-2 text-center">
                  <b-button
                    size="sm"
                    v-b-toggle.sidebar-backdrop
                    variant="outline-info"
                    block
                    pill
                    @click="showuser(item)"
                  >
                    <b-icon icon="eye"></b-icon><br />
                    {{ item.nombre_cuenta }}
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <template #nickname="{ item }">
              <td>{{ item.nickname }}</td>
            </template>
            <template #tipo="{ item }">
              <td>{{ item.tipo.tipo }}</td>
            </template>
            <template #clabe="{ item }">
              <td>
                {{ item.tipo.tipo === "Efectivo" ? "No aplica" : item.clabe }}
              </td>
            </template>
            <template #banco="{ item }">
              <td>
                {{
                  item.tipo.tipo === "Efectivo" ? "No aplica" : item.banco.banco
                }}
              </td>
            </template>
            <template #numero_cuenta="{ item }">
              <td>
                {{
                  item.tipo.tipo === "Efectivo"
                    ? "No aplica"
                    : item.numero_cuenta
                }}
              </td>
            </template>
            <template #num_tarjeta="{ item }">
              <td>
                {{
                  item.tipo.tipo === "Efectivo" ? "No aplica" : item.num_tarjeta
                }}
              </td>
            </template>
            <template #moneda="{ item }">
              <td>{{ item.moneda.moneda }}</td>
            </template>
          </CDataTable>
          <CPagination
            :pages="datosall.maxPages"
            :active-page.sync="activePage"
          />
        </CCardBody>
      </CCard>
    </CCol>
    <sidebarcustom :userin="userin"></sidebarcustom>
  </CRow>
</template>
<script>
import sidebarcustom from "@/views/empresas/sidebarcustom";
// import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
// import respuestas from "@/assets/repositoriosjs/respuestas.js";

export default {
  components: { sidebarcustom },
  name: "generic",
  props: ["loadingin", "iddeletein", "datosallin", "idedit"],
  data() {
    return {
      datosall: {
        placeholder: "generic",
        columns: []
      },
      CuentasSus: 0,
      lazyTableFields: [],
      items: [],
      activePage: 1,
      maxPages: 25,
      sorter: { column: "", asc: false },
      tableFilter: "",
      columnFilter: {},
      itemsLimit: 5,
      loading: false,
      acciones: [1, 2, 3],
      resuelve: 6,
      itemsporpagina: 5,
      details: [],
      userin: []
    };
  },
  watch: {
    idedit: function(newval) {
      this.actualizaregistro(newval);
    },
    datosallin: function(newval) {
      // console.log(oldval);
      this.datosall = newval;
      // console.log(newval);
    },
    iddeletein: function(newval) {
      this.datosall.items = this.datosall.items.filter(
        itemin => itemin.id != newval.id
      );
      this.$emit("deletedetabla", newval);
    },
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
  },

  methods: {
    cambiatabla() {
      this.$emit("tablasus");
    },
    async getCuentasSuspendidas() {
      try {
        let repoitems = repo();
        // let validaciones = respuestas();
        await repoitems.consCuentasSus().then(res => {
          // let response = validaciones.validafriends(res);
          this.CuentasSus = res.count;
        });
      } catch (err) {
        // console.log(err);
      } finally {
        //
      }
    },
    eventsorter() {
      this.eventdispatch();
    },
    relationcuenta(row) {
      this.$emit("roles", row);
    },
    actualizaregistro(item) {
      let datosnuevos = [];
      for (let i = 0; i < this.datosall.items.length; i++) {
        this.datosall.items[i].id == item.id
          ? datosnuevos.push(item)
          : datosnuevos.push(this.datosall.items[i]);
      }
      this.datosall.items = datosnuevos;
    },
    addin() {
      this.$emit("add");
    },
    deleteevent(item) {
      this.$emit("deleteevento", item);
    },
    showuser(item) {
      this.userin = item;
    },
    info(item) {
      this.$emit("info", item);
    },
    changeItemsLimit(val) {
      this.itemsLimit = val;
      this.eventdispatch();
    },

    makeFilter() {
      this.eventdispatch();
      // this.getNotes();
    },
    eventdispatch() {
      this.$emit("getparams", {
        currentpage: this.activePage,
        itemsLimit: this.itemsLimit,
        columnFilter: this.columnFilter,
        tableFilter: this.tableFilter,
        sorter: this.sorter
      });
    }
  },
  created() {
    this.getCuentasSuspendidas();
    // console.log(this.items);
    // this.getNotes();
  },
  computed: {
    getacciones() {
      return this.datosall.acciones;
    },
    resuelve1() {
      return 6;
    }
  }
};
</script>

<style>
.lazyTable {
  display: block;
  height: 450px;
  overflow-y: scroll;
}

.lazyTable tr {
  height: 50px;
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
