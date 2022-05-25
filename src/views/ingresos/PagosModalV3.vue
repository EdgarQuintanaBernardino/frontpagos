<template>
  <div>
    <CModal
      :closeOnBackdrop="false"
      id="modal-pagos-add"
      ref="modal-pagos"
      size="xl"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="warningModal"
    >
      <template #header>
        <h5>
          <b-icon icon="credit-card" aria-hidden="true" class="mr-1"></b-icon
          >Generar Ingreso
        </h5>
        <div>
          <b-button
            class="float-right btn-sm"
            variant="danger"
            @click="confirmClear()"
            ><b-icon icon="x"></b-icon
          ></b-button>
        </div>
      </template>
      <div class="col-12">
        <PasoUno
          :edit_ingress="editIngress"
          v-if="value == 50"
          ref="tabOne"
          @changePassOne="passOne"
        ></PasoUno>
      </div>
      <template #footer>
        <CButton></CButton>
      </template>
      <!-- <template #footer-wrapper> </template> -->
    </CModal>

    <!-- Modal para subir los archivos de cada uno de los usuarios -->
    <CModal
      :closeOnBackdrop="false"
      size="xl"
      title="Carga archivos / Edita cada transacción"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="modalArchivos"
    >
      <!-- Tabla de usuarios para subir archivos -->
      <b-row>
        <!-- <b-col cols="3"> -->
        <div class="text-center col-lg-3 col-xs-12">
          <center>
            <h5>Transacciones</h5>
          </center>
          <CCard>
            <CCardBody>
              <!-- :disabled="UsersNoSelect" -->
              <b-list-group flush class="list-group">
                <b-list-group-item
                  class="d-flex justify-content-between align-items-center"
                  id="my-table"
                  button
                  v-for="option in usuariosTabla"
                  :key="option.Id_Solicitud"
                  :active="userSelect === option.Id_Solicitud ? true : false"
                  @mouseover="selectUser(option)"
                  @click="selectUserClick(option)"
                  v-b-tooltip.hover
                  :title="NombreUser"
                  >{{ option.User_Email }}
                </b-list-group-item>
              </b-list-group>
            </CCardBody>
          </CCard>
          <b-button
            :disabled="userSelect == 0 || loading"
            class="col-12 mb-2"
            variant="info"
            @click="backStep(1)"
            v-if="opCard"
            >Carga archivos
            <b-icon class="ml-2" icon="folder2-open" font-scale="1"></b-icon>
          </b-button>
          <b-button
            :disabled="userSelect == 0 || loading"
            class="col-12 mb-2"
            variant="warning"
            @click="backStep(0)"
            v-if="opCard == false"
            >Editar transacción
            <b-icon class="ml-2" icon="pencil-square" font-scale="1"></b-icon>
          </b-button>
          <b-button
            :disabled="userSelect == 0 || loading"
            class="col-12 mb-2"
            variant="danger"
            @click="confirmDelete()"
            >Eliminar esta transacción
            <b-icon class="ml-2" icon="trash" font-scale="1"></b-icon>
          </b-button>
          <b-button :disabled="true" class="col-12 mb-2" variant="primary"
            >Ir a edición masiva
            <b-icon
              class="ml-2"
              icon="arrow-up-right-square"
              font-scale="1"
            ></b-icon>
          </b-button>
        </div>
        <!-- </b-col> -->
        <!-- <b-col cols="9" v-if="opCard == false"> -->
        <div class="text-center col-lg-9 col-xs-12" v-if="opCard == false">
          <CCard>
            <CCardBody>
              <Archivos :solicitud="solicitudID" ref="tabTwo"> </Archivos>
            </CCardBody>
          </CCard>
          <!-- :disabled="UsersNoSelect == false" -->
          <!-- <b-button
            class="col-12 mb-2"
            variant="warning"
            @click="saveFiles(1)"
            v-if="UsersNoSelect == false"
            >Terminar sin archivos
            <b-icon
              class="ml-2"
              icon="folder-minus"
              animation="throb"
              font-scale="1"
            ></b-icon>
          </b-button>
          <b-button
            class="col-12 mb-2"
            variant="info"
            @click="saveFiles(2)"
            v-if="UsersNoSelect"
            >Terminar ingreso
            <b-icon
              class="ml-2"
              icon="file-earmark-check"
              animation="throb"
              font-scale="1"
            ></b-icon>
          </b-button> -->
          <!-- </b-col> -->
        </div>
        <!-- Editar campos  -->
        <!-- <b-col cols="9" v-if="opCard"> -->
        <div class="text-center col-lg-9 col-xs-12" v-if="opCard">
          <CCard>
            <CCardBody>
              <EditarDatos
                :solicitud="solicitudID"
                ref="editData"
              ></EditarDatos>
            </CCardBody>
          </CCard>
          <!-- :disabled="UsersNoSelect == false" -->
          <!-- <b-button class="col-12 mb-2" variant="success"
            >Guardar cambios
            <b-icon
              class="ml-2"
              icon="folder-minus"
              animation="throb"
              font-scale="1"
            ></b-icon>
          </b-button> -->
          <!-- </b-col> -->
        </div>
      </b-row>
      <template #footer>
        <div class="w-100">
          <b-button
            class="float-right"
            variant="warning"
            @click="saveFiles(1)"
            v-if="UsersNoSelect == false"
            >Terminar sin archivos
            <b-icon
              class="ml-2"
              icon="folder-minus"
              animation="throb"
              font-scale="1"
            ></b-icon
          ></b-button>
          <b-button
            class="float-right"
            variant="info"
            @click="saveFiles(2)"
            v-if="UsersNoSelect"
            >Terminar ingreso
            <b-icon
              class="ml-2"
              icon="file-earmark-check"
              animation="throb"
              font-scale="1"
            ></b-icon
          ></b-button>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import Multiselect from "vue-multiselect";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import PasoUno from "@/views/ingresos/componentes/PasoUno";
// import PasoDos from "@/views/ingresos/componentes/PasoDos";
import Archivos from "@/views/ingresos/componentes/ArchivosV2";
import EditarDatos from "@/views/ingresos/componentes/EditarDatos";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      loading: false,
      opCard: false,
      editIngress: false,
      // Paginación de usuarios
      perPage: 4,
      currentPage: 1,
      rows: 10,
      // ID DE LA SOLICITUD DE CADA USUARIO
      solicitudID: 0,
      test: [],
      passOneTemporal: {},
      nextPass: false,
      warningModal: false,
      value: 50,
      max: 100,
      modalArchivos: false,
      usuariosTabla: [],
      userSelect: 0,
      NombreUser: "",
      UsersNoSelect: false
    };
  },
  components: {
    PasoUno,
    Archivos,
    EditarDatos
  },
  methods: {
    pagination(number) {
      console.log(number);
    },
    // Finalizar despues de archivos
    EndUp() {
      console.log("Se termina todo");
    },
    confirmClear() {
      Swal.fire({
        title: "Cancelar",
        text: "¿Deseas cancelar esta transacción?",
        icon: "warning",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cancelar",
        denyButtonText: "No, continuar"
      }).then(result => {
        if (result.value) {
          this.closeAll();
        }
      });
    },
    closeAll() {
      this.warningModal = false;
      this.$refs.tabOne.clearForm();
    },
    passOne(info) {
      this.warningModal = false;
      this.modalArchivos = true;
      this.usuariosTabla = info.data;
      // this.rows = info.data.length;
    },
    selectUser(user) {
      this.NombreUser = user.User_Name;
      // this.$refs.tabOne.clearForm();
    },
    test21() {
      console.log("... ");
    },
    selectUserClick(user) {
      this.userSelect = user.Id_Solicitud;
      this.UsersNoSelect = true;
      // Mandamos el ID de la solictud por medio de props
      this.solicitudID = user.Id_Solicitud;
      // Se hace una validación para saber si esta subiendo archivos o esta editando datos
      if (this.opCard == true) {
        console.log("Se esta editando los datos...");
        // this.$refs.tabTwo.checkFiles(this.solicitudID);
      } else {
        console.log("Cargando archivos...");
        this.$refs.tabTwo.checkFiles(this.solicitudID);
      }
    },
    saveFiles(op) {
      if (op == 1) {
        this.modalArchivos = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Ingreso creado, puedes subir tus archivos de cada transacción",
          showConfirmButton: false,
          timer: 2000
        });
      } else if (op == 2) {
        this.userSelect = 0;
        this.opCard = false;
        this.modalArchivos = false;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Ingreso y archivos creados correctamente",
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    backStep(op) {
      // this.modalArchivos = false;
      // this.warningModal = true;
      // this.UsersNoSelect = false;
      // this.solicitudID = 0;
      // this.editIngress = true;
      if (op == 0) {
        this.opCard = true;
      } else if (op == 1) {
        this.opCard = false;
        // this.$refs.editData.prestamo = true;
      }
    },
    confirmDelete() {
      Swal.fire({
        title: "¿Deseas eliminar esta transacción?",
        text:
          "Se eliminara la transacción así como todos los archivos relacionados a esta",
        icon: "warning",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminala",
        denyButtonText: "No, cancelar"
      }).then(result => {
        if (result.value) {
          this.deletePay();
        }
      });
    },
    async deletePay() {
      let request = {};
      request.Id_Solicitud = this.solicitudID;
      console.log(request);
      try {
        this.loading = true;
        const repo = repoupdateprofileuser();
        await repo.deleteSolicitud(request).then(res => {
          if (res.code == 204) {
            this.usuariosTabla = this.usuariosTabla.filter(
              ele => ele.Id_Solicitud != request.Id_Solicitud
            );
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Transacción eliminada correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          }
          if (this.usuariosTabla.length <= 0) {
            this.modalArchivos = false;
          }
        });
      } catch (error) {
        console.log("Error al eliminar ...");
      } finally {
        this.loading = false;
      }
    }
    // passTwo() {
    //   // Regresamos al paso 1
    //   this.value = 50;
    //   // let info = this.passOneTemporal;
    //   this.$refs.tabOne.dataStepOne();
    // },
    //Simplificar esta funcion a una sola
    // next() {
    //   if (this.value === 50) {
    //     this.value = 100;
    //   }
    // },
    // back() {
    //   if (this.value === 100) {
    //     this.value = 50;
    //   }
    // },
    // end() {
    //   // We pass the ID of the button that we want to return focus to
    //   // when the modal has hidden
    //   this.$refs["modal-pagos"].toggle("#end-btn");
    // },
    // async eventdetected() {
    //   this.options = this.$parent.myallusers;
    //   this.selected = [];
    //   this.tableshow = false;
    // },
    // resetModal() {
    //   ///reset para primera ventana
    //   this.resetfirstwindow();
    //   // this.resetsecondwindow();
    //   this.$emit("reload", "");
    // },
    // resetsecondwindow() {
    // this.form.shared.tipo = "unico";
    // this.form.shared.users.showcomplete = [];
    // this.form.shared.users.value = [];
    // this.form.shared.users.emails = [];
    // this.form.shared.users.alloption = [];
    // this.form.shared.users.detalle = [];
    // this.items = [];
    // this.form.sends = [];
    // },

    // resetfirstwindow() {
    // this.value = 50;
    //   this.next = false;
    //   this.form.inicio = {
    //     concepto: "",
    //     fecha: this.fecha(),
    //     bruto: "",
    //     moneda: "Pesos",
    //     iva: "0",
    //     monto: "",
    //     comentario: "",
    //     id: "",
    //   };
    //   this.solicitudtemp = [];
    // }
  }
};
</script>

<style scoped>
.list-group {
  max-height: 500px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
