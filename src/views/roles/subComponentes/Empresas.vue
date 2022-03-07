<template>
  <div>
    <!-- <div>
      <CModal
        :closeOnBackdrop="false"
        title="Crea un nuevo permiso"
        :show.sync="warningModal"
        :centered="true"
      >
        <CInput id="name" v-model="form.Name" placeholder="Nombre" />
        <template #footer-wrapper>
          <b-row>
            <b-col
              ><span class="ml-1" for="name">{{ span }}</span></b-col
            >
            <b-col
              ><CButton
                style="font-size: 73%;"
                v-if="span.length > 0"
                class="float-right"
                color="success"
                @click="ReemplazaName()"
                >Continuar y reemplazar</CButton
              ></b-col
            >
            <b-col
              ><CButton
                v-if="form.Name.length > 0"
                class="float-right mr-3 mb-2"
                color="success"
                @click="GuardaName()"
                >Valida nombre</CButton
              ></b-col
            >
          </b-row>
        </template>
      </CModal>
    </div> -->
    <!-- Despliega el modulo para validar nombre -->
    <div v-if="Alert === true">
      <!-- Mensaje de alerta en caso de ser un nombre ya existente -->
      <CAlert color="warning" closeButton>
        <center>
          Nombre ya existente
        </center>
      </CAlert>
    </div>
    <div class="mb-4" v-if="SplitName === true">
      <!-- Input para el nombre del permiso -->

      <!-- <template>
        <b-row>
          <b-col
            ><span class="ml-1" for="name">{{ span }}</span></b-col
          >
          <b-col
            ><CButton
              style="font-size: 73%;"
              v-if="span.length > 0"
              class="float-right"
              color="success"
              @click="ReemplazaName()"
              >Continuar y reemplazar</CButton
            ></b-col
          >
          <b-col></b-col>
        </b-row>
      </template> -->
    </div>
    <div v-if="this.CloseCompany === true">
      <center>
        <h5>Selecciona una empresa</h5>
      </center>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Interna(s)" active>
            <b-card-text>
              <b-list-group flush>
                <b-list-group-item
                  v-for="option in Empresas"
                  :key="option.id"
                  @click="continuar(option, 1)"
                  href="#"
                  :active="value.EmpresaSelect.id == option.id ? true : false"
                  >{{ option.nombre }}</b-list-group-item
                >
              </b-list-group>
            </b-card-text>
          </b-tab>
          <b-tab title="Externa(s)">
            <b-card-text>
              <b-list-group flush>
                <b-list-group-item
                  v-for="option in EmpresasExternas"
                  :key="option.id"
                  @click="continuar(option)"
                  href="#"
                  >{{ option.nombre }}</b-list-group-item
                >
              </b-list-group>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <div>
      <!-- <CButton
        block
        color="success"
        :disabled="form.Name.length === 0"
        @click="GuardaName(1)"
        >Validar información</CButton
      > -->
    </div>
  </div>
</template>

<script>
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
export default {
  props: {
    empresas: Object,
    grupo: Object,
    grupOk: Number,
    saveName: Number
  },
  data() {
    return {
      Alert: false,
      SplitName: false,
      CloseCompany: true,
      warningModal: false,
      EmpresasExternas: [],
      Empresas: [],
      value: {
        Empresas: [],
        EmpresaSelect: {},
        Validate: false
      },
      nomBoton: "",
      span: "",
      form: {
        Company_id: 0,
        Name: ""
      }
    };
  },
  watch: {
    // if(this.saveName === 1){
    //   this.GuardaName();
    // }
  },
  computed: {
    ...mapState(["darkMode"])
  },
  async mounted() {
    // if(this.saveName == 1)
    this.value.EmpresaSelect = this.empresas;
    this.form = this.grupo;
    await this.getEmpresas();
    await this.getEmpresasExt();
    if (this.grupOk == 1) {
      this.span = "Grupo ya existente";
      this.warningModal = true;
    }
    if (this.saveName === 1) {
      console.log("Va");
    }
  },
  methods: {
    continuar(data, Opmodule) {
      // console.log("Sin modal");
      this.value.EmpresaSelect = data;
      this.form.Company_id = data.id;
      this.warningModal = true;
      if (Opmodule === 1) {
        this.SplitName = true;
      }
    },
    async GuardaName() {
      // await this.creaGrupo();
      console.log("Hola mundo ! ");
      if (this.form.Name.length > 0) {
        this.warningModal = false;
        if (this.grupOk == 1) {
          if (this.$parent.value.Validate == false) {
            this.$parent.creaJSON(false);
          } else {
            this.$parent.creaJSON();
          }
        } else {
          this.$emit("EmpSelect", this.value.EmpresaSelect);
          this.$emit("Permiso", this.form);
        }
        // Imprime que empresa se selecciono
        // console.log(this.value.EmpresaSelect);
      }
    },
    ReemplazaName() {
      // await this.creaGrupo();
      if (this.form.Name.length > 0) {
        this.warningModal = false;
        this.$parent.value.Validate = false;
        this.GuardaName();
      }
    },
    async getEmpresasExt() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then(res => {
          this.EmpresasExternas = res.data.map(function(obj) {
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
    async creaGrupo() {
      try {
        console.log(this.form);
        const repo = repoupdateprofileuser();
        await repo.creaGroupPermisos(this.form).then(res => {
          if (res.code == 201) {
            this.warningModal = false;
            this.form.Id = res.data.id;
            // this.$emit("EmpSelect", this.EmpresaSelect);
            // this.$emit("PermisoId", res.data.id);
          } else if (res.code == 204) {
            this.span = "Grupo ya existe";
          }
          console.log(res);
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
    }
  }
};
</script>

<style scoped>
.BGL {
  background: #3c4b64;
  color: white;
  border-radius: 10px;
}

.BGD {
  background: #23242d;
  border-radius: 10px;
}
</style>
