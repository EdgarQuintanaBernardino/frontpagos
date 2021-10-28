<template>
  <b-overlay :show="show" rounded="sm">
    <template v-slot:overlay>
      <div class="text-center">
        <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
        <p id="cancel-label">Please wait...</p>
      </div>
      <!--Inicio del formulario-->
    </template>
    <form @submit.prevent="AgregarTel">
      <b-col class="mt-2">
        <b-row v-if="modelo!='user'">
          <b-col lg="4">
            <label class="typo__label">Área</label>
            <multiselect
              v-model="Telefono.area"
              tag-placeholder="Add this as new tag"
              placeholder="Selecciona o escribe"
              :options="options"
              :taggable="true"
              @tag="addTag"
              required
            ></multiselect>
          </b-col>
          <b-col lg="4">
            <label class="typo__label">Responsable</label>
            <b-input
              required
              type="text"
              v-model="Telefono.responsable"
              placeholder="Nombre del responsable"
            ></b-input>
          </b-col>
          <b-col lg="4">
            <label class="typo__label">Correo</label>
            <b-input
              required
              type="email"
              v-model="Telefono.email"
              placeholder="Correo de contacto"
            ></b-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="2">
            <label>Tipo</label>
            <b-form-select
              :options="TiposTel"
              v-model="Telefono.Tipo"
              :disabled="disabled"
            >
            </b-form-select>
          </b-col>
          <b-col lg="4">
            <label>Número Telefónico:</label>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled>
                  <b-icon icon="phone"></b-icon>
                </b-button>
              </b-input-group-prepend>
              <masked-input
                type="text"
                name="phone"
                class="form-control"
                v-model="Telefono.Numero"
                :mask="[
                  '(',
                  /[1-9]/,
                  /\d/,
                  ')',
                  ' ',
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/,
                  '-',
                  /\d/,
                  /\d/
                ]"
                :guide="true"
                placeholderChar="#"
                :disabled="disabled"
              />
            </b-input-group>
            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback>
              Ingresa numero de 10 digitos
            </b-form-invalid-feedback>
          </b-col>
          <b-col lg="3" v-if="modelo=='empresa'">
            <CFormGroup wrapperClasses="input-group pt-2">
              <template #label>Ext</template>
              <template #input >
                <masked-input
                  :disabled="Telefono.Tipo !== 'Local'"
                  type="text"
                  name="ext"
                  class="form-control"
                  :mask="[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
                  :guide="true"
                  placeholderChar="#"
                  v-model="Telefono.Ext"
                />
              </template>
            </CFormGroup>
          </b-col>
          <b-col>
            <b-button type="submit" class="ml-2 mb-2 mt-2" :disabled="NumOk"
              >Agregar<b-icon icon="plus"></b-icon
            ></b-button>
            <b-button variant="info" class="ml-2" v-b-toggle.collapse-1 v-if="form.Telefonos.length > 0"
            >Mostrar todos <b-icon icon="chevron-right"></b-icon
          ></b-button>
          </b-col>
        </b-row>
        <!--Fin del formulario-->
        <hr>

        <!--Inicio de registros guardados-->
        <b-collapse id="collapse-1" class="mt-2">
          <div
            v-for="(Tel, index) in form.Telefonos"
            :key="index"
            v-if="form.Telefonos.length > 0"
          >
            <b-row class="mt-2" v-if="modelo=='empresa'">
              <b-col lg="4">
                <label class="typo__label">Área</label>
                <multiselect
                  v-model="form.Telefonos[index].area"
                  tag-placeholder="Add this as new tag"
                  placeholder="Selecciona o escribe"
                  @dragend="actTEL(Tel)"
                  @input="actTEL(Tel)"
                  :options="options"
                  :taggable="true"
                  @tag="addTag"
                ></multiselect>
              </b-col>
              <b-col lg="4">
                <label class="typo__label">Responsable</label>
                <b-input
                  @change="actTEL(Tel)"
                  type="text"
                  v-model="form.Telefonos[index].responsable"
                  placeholder="Nombre del responsable"
                ></b-input>
              </b-col>
              <b-col lg="4">
                <label class="typo__label">Correo</label>
                <b-input
                  type="text"
                  v-model="form.Telefonos[index].email"
                  placeholder="Correo de contacto"
                  form.Telefonos.Tipo
                  @change="actTEL(Tel)"
                ></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="2">
                <label>Tipo</label>
                <b-form-select
                  :disabled="disabled"
                  :options="TiposTel"
                  v-model="form.Telefonos[index].Tipo"
                  @change="actTEL(Tel)"
                >
                </b-form-select>
              </b-col>
              <b-col lg="4">
                <label>Número Telefónico:</label>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-button disabled prima>
                      <b-icon icon="phone"></b-icon>
                    </b-button>
                  </b-input-group-prepend>
                  <masked-input
                    :disabled="disabled"
                    type="text"
                    name="phone"
                    class="form-control"
                    v-model="form.Telefonos[index].Numero"
                    :mask="[
                      '(',
                      /[1-9]/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/
                    ]"
                    :guide="true"
                    placeholderChar="#"
                    @change="actTEL(Tel)"
                  />
                </b-input-group>
                <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback>
                  Ingresa numero de 10 digitos
                </b-form-invalid-feedback>
              </b-col>
              <b-col lg="3" v-if="modelo=='empresa'">
                <CFormGroup
                  wrapperClasses="input-group pt-2"
                >
                  <template #label>Ext</template>
                  <template #input>
                    <masked-input
                      :disabled="form.Telefonos[index].Tipo !== 'Local'"
                      type="text"
                      class="form-control"
                      v-model="form.Telefonos[index].Ext"
                      :mask="[/\d/, /\d/, /\d/, /\d/, /\d/]"
                      :guide="true"
                      placeholderChar="#"
                      @change="actTEL(Tel)"
                    />
                  </template>
                </CFormGroup>
              </b-col>
              <b-col>
                <br v-if="modelo!='empresa'">
                <b-button class="mt-4" @click="QuitarTel(index)" :disabled="disabled"
                  ><b-icon icon="x"></b-icon
                ></b-button>
              </b-col>
            </b-row>
            <hr>
          </div>
        </b-collapse>
        <!--Fin de registros guardados-->

      </b-col>
    </form>

  </b-overlay>
</template>

<script>
import Multiselect from "vue-multiselect";
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import MaskedInput from "vue-text-mask";
import repocreate from "@/assets/repositoriosjs/repoupdateprofileuser.js";
export default {
  props: {
    id: Number,
    disabled: Boolean,
    telefonos: Array,
    modelo: String,
    crear: Boolean
  },
  mounted() {
    try {
      console.log(this.telefonos);
      this.form.Telefonos = this.telefonos.map(elem => {
        let Nobj = {};
        Nobj.Tipo = elem.type;
        if (this.modelo != "empresa") {
          Nobj.Numero = JSON.stringify(elem.number);
          Nobj.Ext = JSON.stringify(elem.ext);
        } else {
          Nobj.Numero = elem.number;
          Nobj.Ext = elem.ext;
          Nobj.area = elem.area;
          Nobj.responsable = elem.responsable;
          Nobj.email = elem.email;
        }
        Nobj.id = elem.id;
        Nobj.modelo = this.modelo;
        return Nobj;
      });

      console.log(this.telefonos);
      console.log(this.form.Telefonos);
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      value: [],
      options: ["Ventas", "Facturación", "Atención al cliente"],
      form: {
        Telefonos: []
      },
      Telefono: {
        Tipo: "",
        Numero: "",
        Ext: "",
        Modelo: this.modelo,
        id: this.id,
        area: "",
        responsable: "",
        email:"",
      },
      TiposTel: ["Local", "Movil"],
      show: false
    };
  },
  methods: {
    addTag(newTag) {
      // const tag = {
      //   name: newTag,
      //   code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      // }
      this.options.push(newTag);
      this.value = newTag;
    },
    //------------------------------------------
    actTEL(Tel) {
      console.log(Tel);
      let nTel = {}
      var regex = /(\d+)/g;
      nTel = {
        number: parseInt(Tel.Numero.match(regex).join("")),
        type: Tel.Tipo,
          ext: Tel.Tipo == 'Local' && Tel.Ext != null && Tel.Ext.length !== 0 && Tel.Ext != "null"
              ? parseInt(Tel.Ext.match(regex).join(""))
              : "",
          model: this.modelo,
          id_phone: Tel.id,
          id: this.id,
          area: Tel.area,
          responsable: Tel.responsable,
          email:Tel.email,
      }

      console.log(Tel);
      // this.actTelefono(nTel);
      this.updateTelefono(nTel);
      // this.$emit("upTelefono", Tel);
    },
    AgregarTel() {
      if (this.NumOk) {
        // this.submitStatus = 'ERROR'
      } else {
        this.form.Telefonos.push(JSON.parse(JSON.stringify(this.Telefono)));
        console.log(this.form.Telefonos);
        // this.$emit("AddTelefonos", this.form.Telefonos);
        this.actTelefonos(this.form.Telefonos);
        this.Telefono = {
          Tipo: "",
          Numero: "",
          Ext: "",
          Modelo: this.modelo,
          id: this.id,
          email: '',
        };
      }
    },
    QuitarTel(indice) {
      console.log("quitar");
      if (this.form.Telefonos[indice].hasOwnProperty("id")) {
        // this.$emit("delTelefono", this.form.Telefonos[indice]);
        this.delTelefono(this.form.Telefonos[indice]);
      }
      this.form.Telefonos.splice(indice, 1);
    },
    //------------------------------------------
    actTelefonos(data) {
      var regex = /(\d+)/g;
      if (this.crear) {
        console.log("actualizando");
        let newTel = {};
        newTel = {
          number: parseInt(data[data.length - 1].Numero.match(regex).join("")),
          ext: data[data.length - 1].Ext.length > 0
              ? parseInt(data[data.length - 1].Ext.match(regex).join(""))
              : "",
          type: data[data.length - 1].Tipo,
          model: this.modelo,
          id: this.id,
          area: this.modelo != 'user' ? data[data.length - 1].area : 'No aplica',
          responsable: this.modelo != 'user' ?  data[data.length - 1].responsable : 'No aplica',
          email: this.modelo != 'user' ? data[data.length - 1].email : 'No aplica',
        };
        this.CreateTelefono(newTel);
      } else {
        console.log(data);
        this.form.Telefonos = data;
        console.log(this.form.Telefonos);
        this.$emit("actTel", this.form.Telefonos);
      }
    },
    actTelefono(data) {
      try {
        let indice = this.form.Telefonos.findIndex(elem => elem.id === data.id);

        // let editnum = {
        //   number: parseInt(data.Numero.match(regex).join("")),
        //   ext:
        //     data.Ext != null && data.Ext.length !== 0 && data.Ext != "null"
        //       ? parseInt(data.Ext.match(regex).join(""))
        //       : "",
        //   type: data.Tipo,
        //   model: this.modelo,
        //   id_phone: data.id_phone,
        //   id: data.id,
        //   area: data.area,
        //   responsable: data.responsable
        // };

        this.updateTelefono(data);
      } catch (error) {
        // console.log(error);
      }
    },
    delTelefono(data) {
      // this.form.Telefonos = this.form.Telefonos.filter(elem => elem.id === data.id);
      let delTel = {
        id: this.id,
        id_phone: data.id,
        model: this.modelo
      };
      this.DelTelefono(delTel);
    },
    async CreateTelefono(request) {
      try {
        console.log(request);
        this.show = true;
        const repo = repocreate();
        await repo.CreateNumTelefono(request).then(res => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$emit("actTel", this.form.Telefonos);
        this.show = false;
      }
    },
    async updateTelefono(request) {
      try {
        console.log(request);
        this.show = true;
        const repo = repocreate();
        await repo.UpdateNumTelefono(request).then(res => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$emit("actTel", this.form.Telefonos);
        this.show = false;
      }
    },
    async DelTelefono(request) {
      try {
        console.log(request);
        this.show = true;
        const repo = repocreate();
        await repo.DeleteNumTelefono(request).then(res => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$emit("actTel", this.form.Telefonos);
        this.show = false;
      }
    }
  },
  computed: {
    ...mapState(["darkMode"]),
    validafon() {
      let conteo = 0;
      if (
        this.$v.Telefono.Numero.$model == "" ||
        this.$v.Telefono.Numero.$model == null
      ) {
      } else {
        conteo = this.$v.Telefono.Numero.$model.split("#").length;
      }
      if (conteo != 1) {
        return false;
      } else {
        if (this.$v.Telefono.Numero.$model.length == 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    NumOk() {
      return this.Telefono.Numero.length == 16 &&
        !this.Telefono.Numero.includes("#") &&
        this.Telefono.Tipo.length != 0
        ? false
        : true;
    }
  },
  validations: {
    form: {
      Telefono: {
        Numero: { minLength: minLength(16) },
        Tipo: { required }
      }
    }
  },
  components: {
    MaskedInput,
    Multiselect
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
