<template>
  <div>
    <CCard>
      <CCardHeader>
        <b-row class="mb-1">
          <div class="col-lg-3 col-xs-12 mt-1">
            <h4>
              Amigos
              <b-badge variant="dark" pill>{{ countfriends }}</b-badge>
            </h4>
          </div>
          <div class="col-xs-12 col-sm-12 col-lg-12 col-xl-9  mt-1">
            <b-btn
              variant="ligth"
              @click.prevent="showrqstin()"
              style="float:right"
            >
              <b-icon icon="arrow-right-circle"></b-icon> Solicitudes de Amistad
              Recibidas
              <b-badge style="text-color: white" pill>{{
                requestin.length
              }}</b-badge>
            </b-btn>
            <b-btn
              variant="ligth"
              @click.prevent="showrqst()"
              style="float:right"
            >
              <b-icon icon="arrow-left-circle"></b-icon> Solicitudes de Amistad
              Enviadas
              <b-badge style="text-color: white" pill>{{
                requestsend.length
              }}</b-badge>
            </b-btn>
            <b-btn
              variant="ligth"
              @click.prevent="addcuenta()"
              style="float:right"
            >
              Invitar Amigo
              <b-icon icon="person-plus-fill"></b-icon>
            </b-btn>
          </div>
        </b-row>
      </CCardHeader>
      <CButton
        @click="(warningModal = true), (limpiarin = !limpiarin)"
        color="primary"
        >Crear grupo de amigos
        <b-icon icon="person-plus"></b-icon>
      </CButton>
      <CModal :show.sync="warningModal" size="xl" :closeOnBackdrop="false">
        <template #header>
          <h5>
            <b-icon icon="person-plus-fill" class="mr-2"></b-icon>Crear grupo de
            amigos
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
        <Grupos :limpiarin="limpiarin"></Grupos>
        <template #footer-wrapper>
          <CButton />
        </template>
      </CModal>
    </CCard>
    <rqstin></rqstin>
    <rqst></rqst>
    <requestfriend></requestfriend>
  </div>
</template>

<script>
import rqstin from "@/views/windowmodal/requestin";
import Grupos from "@/views/roles/Grupos";
import repo from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import respuestas from "@/assets/repositoriosjs/respuestas.js";
import rqst from "@/views/windowmodal/requestsend";
import requestfriend from "@/views/windowmodal/requestfriend";

export default {
  props: ["totalrow", "itemdeletein"],
  components: {
    rqstin,
    rqst,
    requestfriend,
    Grupos
  },
  name: "cabecera",
  data() {
    return {
      limpiarin: false,
      items: [],
      requestin: [],
      requestsend: [],
      countfriends: 0,
      usersmebloquearon: [],
      usersdelete: [],
      init: true,
      datosback: [],
      warningModal: false
    };
  },
  mounted() {
    this.getitemsasync();
  },

  created() {
    // this.actualizauser();
  },
  beforeDestroy() {
    clearInterval(this.datosback);
  },
  destroyed: function() {
    clearInterval(this.datosback);
  },
  methods: {
    closeAll() {
      this.warningModal = false;
    },
    async actualizauser() {
      this.datosback = setInterval(async () => {
        this.getitemsasync();
      }, 10000);
    },
    async getitemsasync() {
      let resps = respuestas();
      try {
        let repoitems = repo();
        await repoitems.yourrequest().then(res => {
          let data = resps.validafriends(res);
          this.requestsend = data.requestsend;
          this.requestin = data.requestin;
          this.usersdelete = data.delete;
          this.usersmebloquearon = data.losquemeborraron;
          data.total == this.countfriends ? "" : this.$emit("change_friends"); ///contamos los amigos
          this.init ? this.actualizauser() : "";
          this.init = false;
        });
      } catch (err) {
        //  console.log(err);
      } finally {
        // console.log("Finally");
      }
    },

    addcuenta() {
      this.$bvModal.show("modal-prevent-request");
    },
    showrqst() {
      this.$bvModal.show("modal-rqst");
    },
    showrqstin() {
      this.$bvModal.show("modal-rqstin");
    }
  },
  watch: {
    totalrow: function(newVal) {
      // watch it
      this.countfriends = newVal;
    },
    itemdeletein: function(newval) {
      this.usersdelete.push(newval);
    }
  }
};
</script>
<style>
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
