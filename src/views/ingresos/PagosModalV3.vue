<template>
  <div>
    <CModal
      id="modal-pagos-add"
      ref="modal-pagos"
      size="xl"
      title="Nuevo Pago"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="warningModal"
    >
      <div class="col-12">
        <PasoUno
          v-if="value == 50"
          ref="tabOne"
          @changePassOne="passOne"
        ></PasoUno>
      </div>
      <template #footer>
        <CButton></CButton>
      </template>
      <template #footer-wrapper> </template>
    </CModal>

    <!-- Modal para subir los archivos de cada uno de los usuarios -->
    <CModal
      size="xl"
      title="Agrega archivos a los usuarios"
      hide-footer
      header-text-variant="light"
      header-bg-variant="primary"
      header-text-size="xl"
      :show.sync="modalArchivos"
    >
      <!-- Tabla de usuarios para subir archivos -->
      <b-row>
        <b-col cols="3">
          <CCard>
            <CCardBody>
              <b-list-group flush>
                <b-list-group-item
                  button
                  v-for="option in usuariosTabla"
                  :key="option.Id_Solicitud"
                  :active="userSelect === option.Id_Solicitud ? true : false"
                  :disabled="UsersNoSelect"
                  @mouseover="selectUser(option)"
                  @click="selectUserClick(option)"
                  v-b-tooltip.hover
                  :title="NombreUser"
                  >{{ option.User_Email }}
                </b-list-group-item>
              </b-list-group>
            </CCardBody>
          </CCard>
        </b-col>

        <b-col cols="9" v-if="UsersNoSelect">
          <CCard>
            <CCardBody>
              <Archivos> </Archivos>
            </CCardBody>
          </CCard>
          <b-button
            class="col-12 mb-2"
            variant="success"
            @click="saveFiles()"
            :disabled="UsersNoSelect == false"
            >Cargar archivos
            <b-icon
              class="ml-2"
              icon="file-arrow-up"
              animation="cylon-vertical"
              font-scale="1"
            ></b-icon>
          </b-button>
          <b-button
            class="col-12"
            variant="info"
            @click="backStep()"
            :disabled="UsersNoSelect == false"
            >Volver
            <b-icon
              class="ml-2"
              icon="arrow-up-left-circle"
              font-scale="1"
            ></b-icon>
          </b-button>
        </b-col>

        <b-col cols="9" v-if="UsersNoSelect == false">
          <CCard>
            <CCardBody>
              <b-jumbotron
                header="Archivos"
                lead="Selecciona un usuario para agregar sus archivos"
              >
                <p></p>
                <b-button variant="primary" disabled
                  ><b-icon icon="arrow-up-left-circle" font-scale="1"></b-icon
                ></b-button>
              </b-jumbotron>
            </CCardBody>
          </CCard>
        </b-col>
      </b-row>
      <template #footer>
        <CButton></CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import Multiselect from "vue-multiselect";
// import repo from "@/assets/repositoriosjs/repoupdateprofileuser";
import PasoUno from "@/views/ingresos/componentes/PasoUno";
// import PasoDos from "@/views/ingresos/componentes/PasoDos";
import Archivos from "@/views/ingresos/componentes/ArchivosV2";

export default {
  data() {
    return {
      passOneTemporal: {},
      nextPass: false,
      warningModal: false,
      value: 50,
      max: 100,
      modalArchivos: false,
      usuariosTabla: [],
      userSelect: -1,
      NombreUser: "",
      UsersNoSelect: false
    };
  },
  components: {
    PasoUno,
    // PasoDos,
    Archivos
  },
  methods: {
    passOne(info) {
      this.warningModal = false;
      this.modalArchivos = true;
      console.log(info);
      this.usuariosTabla = info.data;
    },
    selectUser(user) {
      this.NombreUser = user.User_Name;
    },
    selectUserClick(user) {
      this.userSelect = user.Id_Solicitud;
      this.UsersNoSelect = true;
    },
    saveFiles() {
      console.log("Se guardan los datos");
    },
    backStep() {
      this.UsersNoSelect = false;
      this.userSelect = -1;
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

<style></style>
