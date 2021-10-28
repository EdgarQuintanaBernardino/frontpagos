<template>
  <b-row>
    <b-col cols="12" class="text-center">
      <label class="text-danger">**Campos Requeridos**</label></b-col
    >
    <b-col cols="6" class="text-center mt-1">
      <label><h4>Concepto</h4></label>
    </b-col>
    <b-col cols="6" class="text-center mt-1">
      <label><h4>Comentario y/o descripción</h4></label>
    </b-col>
    <b-col cols="6" class="text-center">
      <b-input-group size="md">
        <b-input-group-prepend is-text>
          <b-icon icon="plus-square"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          v-model="form.concepto"
          placeholder="Concepto del Pago"
          :state="form.concepto.length >= 7"
        ></b-form-input>
      </b-input-group>
    </b-col>
    <b-col cols="6" class="text-center" align-self="stretch">
      <b-form-textarea
        id="textarea-rows"
        placeholder="Comentario"
        rows="2"
        v-model="form.comentario"
        :state="form.comentario.length >= 7"
      ></b-form-textarea>
    </b-col>
    <b-col cols="12" class="text-center mt-1">
      <label><h4>Selección de Empresa y Cuenta Bancaria</h4></label>
    </b-col>
    <b-col cols="12 mt-1">
      <b-card>
        <b-tabs content-class="mt-3">
          <b-tab title="Propia" active>
            <b-row>
              <b-col cols="6" class="text-center">
                <b-form-select
                  v-model="form.empresaPropia"
                  :options="optionsEmpresaPropia"
                  text-field="nombre"
                  :style="darkMode ? 'background-color:#393a42' : null"
                  @input="getCuentas"
                  ><b-form-select-option value="null" disabled
                    >Selecciona una empresa</b-form-select-option
                  ></b-form-select
                >
              </b-col>
              <b-col cols="6" class="text-center">
                <multiselect
                  v-model="form.seleccionCuentasEmpresaPropia"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Selecciona cuenta"
                  label="nickname"
                  track-by="id"
                  :options="optionsCuentasEmpresaPropia"
                  :taggable="true"
                  class="h2"
                  aria-required="true"
                ></multiselect>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Externa">
            <b-row>
              <b-col cols="6" class="text-center">
                <b-form-select
                  v-model="form.empresaExterna"
                  :options="optionsEmpresaExterna"
                  aria-required="true"
                  text-field="nombre"
                  :style="darkMode ? 'background-color:#393a42' : null"
                ></b-form-select>
              </b-col>
              <b-col cols="6" class="text-center">
                <multiselect
                  v-model="form.seleccionCuentasEmpresaExterna"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Selecciona una o mas cuentas"
                  label="name"
                  track-by="code"
                  :options="optionsCuentasEmpresaPropia"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTagEE"
                  class="h2"
                ></multiselect>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Ceder" disabled>
            <b-row>
              <b-col cols="6" class="text-center">
                <multiselect
                  v-model="form.seleccionCuentasCedidas"
                  tag-placeholder="Agregar nuevo"
                  placeholder="Ingresa la empresa a ceder"
                  label="name"
                  track-by="code"
                  :options="optionsCuentasCedidas"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTagCe"
                  class="h2"
                ></multiselect>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Compartir">
            <b-row>
              <b-col cols="6" class="text-center mt-2">
                <multiselect
                  v-model="form.permisosUsuario"
                  :options="usuarios"
                  :multiple="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Selecciona los usuarios"
                  tag-placeholder="Agregar nuevo"
                  label="nombre"
                  track-by="id"
                  aria-required="true"
                  :allow-empty="true"
                  :taggable="true"
                  @tag="addTagAmigo2"
                ></multiselect>
              </b-col>
              <b-col cols="6" class="text-center">
                <label>Selecciona los permisos a compartir</label>
                <b-form-checkbox-group
                  v-model="form.permisosSeleccionados"
                  :options="permisosOptions"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-checkbox-group>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
    <b-col cols="3" class="text-center mt-1">
      <label><h4>Monto</h4></label>
    </b-col>
    <b-col cols="3" class="text-center mt-1">
      <label><h4>Moneda</h4></label>
    </b-col>
    <b-col cols="3" class="text-center mt-1">
      <label><h4>IVA %</h4></label>
    </b-col>
    <b-col cols="3" class="text-center mt-1">
      <label><h4>Monto Neto</h4></label>
    </b-col>
    <b-col cols="3" class="text-center">
      <b-input-group size="md" prepend="$">
        <b-form-input
          v-model="form.monto"
          :min="0"
          type="number"
          @change="calculaMontoNeto"
          v-on:keyup.prevent="calculaMontoNeto"
          :class="{
            'is-valid': this.form.monto > 0,
            'is-invalid': this.form.monto <= 0,
          }"
          oninput="javascript:value=this.value.replace('e','');
                   if(this.value.length>=20)this.value=this.value.substr(0,15);"
        ></b-form-input>
      </b-input-group>
    </b-col>
    <b-col cols="3" class="text-center">
      <b-form-select
        v-model="moneda"
        :options="optionsMoneda"
        disabled-field="true"
        disabled
      ></b-form-select>
    </b-col>
    <b-col cols="3" class="text-center">
      <b-form-select
        v-model="form.iva"
        :options="optionsIva"
        :state="form.iva >= 0"
        @change="calculaMontoNeto"
        :style="darkMode ? 'background-color:#393a42' : null"
      ></b-form-select>
    </b-col>
    <b-col cols="3" class="text-center">
      <b-input-group size="md" prepend="$">
        <b-form-input
          type="number"
          @wheel="$event.target.blur()"
          readonly
          v-model="form.montoNeto"
          placeholder="Total"
          oninput="javascript:value=this.value.replace('e','')"
        >
        </b-form-input>
      </b-input-group>
    </b-col>
    <b-col cols="6" class="text-center mt-3">
      <label><h4>Modalidad</h4></label>
    </b-col>
    <b-col cols="6" class="text-center mt-3">
      <label><h4>Solicitud de pago a:</h4></label>
    </b-col>
    <b-col cols="6" class="text-center">
      <b-form-group label="" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="btn-radios-2"
          v-model="form.modalidad"
          :options="optionsModalidad"
          :aria-describedby="ariaDescribedby"
          button-variant="outline-info"
          size="lg"
          name="radio-btn-outline"
          buttons
          class="mt-1 d-block"
          aria-required="true"
        ></b-form-radio-group>
      </b-form-group>
    </b-col>
    <b-col cols="6" class="text-center mt-2">
      <multiselect
        v-model="form.seleccionAmigo"
        :options="usuarios"
        :multiple="!isDisable"
        :close-on-select="true"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Selecciona los usuarios"
        tag-placeholder="Agregar nuevo"
        label="nombre"
        track-by="id"
        aria-required="true"
        :allow-empty="false"
        :taggable="true"
        @tag="addTagAmigo2"
      >
      </multiselect>
    </b-col>

    <b-col cols="12" class="text-center mt-2">
      <label><h4>Total Solicitado</h4></label>
    </b-col>
    <b-col cols="12" class="text-center">
      <b-table responsive :items="items" :fields="fields">
        <template #cell(bruto)="data">
          <span v-if="form.iva == 0">{{ data.item.monto }}</span>
          <span v-else>
            {{ ((form.monto / 100) * data.item.range).toFixed(2) }}
          </span>
        </template>
        <template #cell(iva)="data">
          <span v-if="form.iva == 0">0</span>
          <span v-else>
            {{
              (
                (((form.monto / 100) * form.iva) / 100) *
                data.item.range
              ).toFixed(2)
            }}
          </span>
        </template>
        <template #cell(monto)="data">
          <b-input
            min="0"
            :disabled="
              form.modalidad == 1 || form.modalidad == 2 || items.length == 1
            "
            v-if="items[data.index]"
            :max="form.monto"
            oninput="javascript:value=this.value.replace('e','');
       if(this.value.length>=20);"
            @input="validamontototal(data.item.monto, data.index)"
            v-model="items[data.index].monto"
          ></b-input>
        </template>
        <template #cell(name)="data">
          <b class="text-info"> {{ data.item.name }} </b>
        </template>
        <template #cell(porcentaje)="data">
          <b-input
            v-if="items[data.index]"
            :disabled="
              form.modalidad == 1 || form.modalidad == 2 || items.length == 1
            "
            type="number"
            min="0"
            max="100"
            oninput="javascript:value=this.value.replace('e','');
       if(this.value.length >=5)this.value=this.value.substr(0,5)
     "
            @input="validaporcentajein(data.item.range, data.index)"
            v-model="items[data.index].range"
          ></b-input>
        </template>
      </b-table>

      <b-alert :show="mensaje" variant="success"
        ><h3 class="text-dark">{{ this.mensajeok }}</h3></b-alert
      >
      <b-alert :show="!mensaje" variant="danger">
        <h3 class="text-dark">
          {{ mensajealert }} {{ this.diferencia }}
          <b-button @click="calculaporcentaje" variant="success"
            ><span class="ti-loop"></span> Reset</b-button
          >
        </h3></b-alert
      >
    </b-col>
  </b-row>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser.js";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      permisosOptions: [
        { item: 1, name: "Ver" },
        { item: 2, name: "Editar" },
        { item: 3, name: "Eliminar" },
      ],
      usuarios: [],
      mensajeok: "Sin Cambios",
      mensaje: true,
      diferencia: 0,
      // items: [],
      mensajealert: "",
      form: {
        id: "",
        concepto: "",
        comentario: "",
        empresaPropia: null,
        empresaExterna: null,
        monto: "",
        iva: 0,
        montoNeto: "",
        modalidad: null,
        cuentaBancaria: null,
        seleccionCuentasEmpresaPropia: [],
        seleccionCuentasEmpresaExterna: [],
        seleccionCuentasCedidas: [],
        seleccionAmigo: [],
        permisosUsuario: [],
        permisosSeleccionados:[]
      },
      email: "",
      fechaDePago: "",
      moneda: 0,
      proyecto: null,
      isDisable: false,
      optionsMoneda: [
        { value: 0, text: "Pesos" },
        { value: 1, text: "Dolares" },
        { value: 3, text: "Euros" },
      ],
      optionsIva: [
        { value: 0, text: "0%" },
        { value: 8, text: "8%" },
        { value: 16, text: "16%" },
      ],
      optionsModalidad: [
        { text: "Unico", value: 1 },
        { text: "Replica", value: 2 },
        { text: "Dividir", value: 3 },
      ],
      tags: ["apple", "orange"],
      fields: [
        //campos de tabla
        { key: "name", label: "Usuario" },
        { key: "porcentaje", label: "Porcentaje %" },
        { key: "bruto", label: "Monto Bruto" },
        { key: "iva", label: "Iva" },
        { key: "monto", label: "Monto Neto" },
      ],
      itemss: [
        {
          Usuario: "Dickerson",
          Porcentaje: "Macdonald",
          Monto_Bruto: 40,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Larsen",
          Porcentaje: "Shaw",
          Monto_Bruto: 21,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Geneva",
          Porcentaje: "Wilson",
          Monto_Bruto: 89,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
        {
          Usuario: "Jami",
          Porcentaje: "Carney",
          Monto_Bruto: 38,
          Iva: "100",
          Monto_Total: "1000",
        },
      ], //items de tabla ya no sirven, creo xD
      filter: null,
      filterOn: [],
      optionsEmpresaPropia: [],
      optionsEmpresaExterna: [],
      // value: [{ name: "Javascript", code: "js" }],

      optionsCuentasEmpresaPropia: [],
      optionsCuentasEmpresaExterna: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],

      optionsCuentasCedidas: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],

      optionsAmigo: [
        { name: "Vue.js", code: "vu" },
        { name: "Javascript", code: "js" },
        { name: "Open Source", code: "os" },
        { name: "Option Extra", code: "op" },
      ],
      optionsProyecto: [
        { value: null, text: "Selecciona un proyecto" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      aux: [], //se ocupa para las opciones de modalidad = replica xD
      hola: [],
    };
  },

  methods: {
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then((res) => {
          this.usuarios = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            // newObj.email = obj.email;
            // newObj.telefono = obj.telefono;
            console.log(newObj);
            return newObj;
          });
        });
      } catch (error) {
        // console.log(error);
      } finally {
        //
      }
    },
    async getEmpresas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getempresasback().then((res) => {
          this.optionsEmpresaPropia = res.data.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.nombre;
            newObj.value = obj.id;
            newObj.propietario = 1;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
      }
    },
    async getCuentas() {
      try {
        console.log("aqui" + this.form.empresaPropia);
        console.log(this.optionsCuentasEmpresaPropia);
        const repo = repoupdateprofileuser();
        await repo.getmycuentas().then((res) => {
          this.optionsCuentasEmpresaPropia = res.data.cuentas.filter(
            (cuenta) => cuenta.empresas[0].id == this.form.empresaPropia
          );
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    },
    async getEmpresasExt() {
      try {
        const repo = repoupdateprofileuser();
        await repo.consEmpresasExt().then((res) => {
          this.optionsEmpresaExterna = res.data.map(function (obj) {
            let newObj = {};
            newObj.nombre = obj.empresa.nombre;
            newObj.value = obj.empresa.id;
            newObj.propietario = obj.Permiso_id;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
      }
    },
    async getmycuentas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getcuentasback().then((res) => {
          console.log(res);
          // this.hola = res.data.map(function (obj) {
          //   let newObj = {};
          //   // newObj.nombre = obj.empresa.nombre;
          //   // newObj.value = obj.empresa.id;
          //   // newObj.propietario = obj.Permiso_id;
          //   return console.log(res);
          // });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
      }
    },
    addTagEP(newTag) {
      //addTagEmpresaPropia
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasEmpresaPropia.push(tag);
      this.form.seleccionCuentasEmpresaPropia.push(tag);
    },
    addTagEE(newTag) {
      //addTagEmpresaExterna
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasEmpresaExterna.push(tag);
      this.form.seleccionCuentasEmpresaExterna.push(tag);
    },
    addTagCe(newTag) {
      //addTagCedida
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.optionsCuentasCedidas.push(tag);
      this.form.seleccionCuentasCedidas.push(tag);
    },
    addTagAmigo(newTag) {
      //addTagCedida
      const tag = {
        nombre: newTag,
        id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.usuarios.push(tag);
      this.form.seleccionAmigo.push(tag);
    },
    addTagAmigo2(newTag) {
      let regExMail =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(newTag)) {
        console.log("es correo");
        const tag = {
          nombre: newTag,
          id: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
        };
        this.usuarios.push(tag);
        this.form.seleccionAmigo.push(tag);
      } else {
        alert("no es correo");
      }
    },
    formularioIncompleto() {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Formulario incompleto",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    calculaMontoNeto() {
      let montoInicial = this.form.monto;
      let ivaSelec = this.form.iva;
      let montoTotalNeto = (montoInicial * (ivaSelec / 100 + 1)).toFixed(2);
      this.form.montoNeto = montoTotalNeto;
    },
    calculaporcentaje() {
      let cantidad = 0;
      let porcentaje = 0;
      let allusers = parseFloat(this.items.length);
      cantidad = this.form.monto / allusers;
      cantidad = parseFloat(cantidad.toFixed(1)); ///// a dos decimales la division
      let totalcantidad = parseFloat((cantidad * allusers).toFixed(1));
      if (
        (this.items.length >= 1 && this.form.modalidad == 3) ||
        (this.items.length >= 1 && this.form.modalidad == 1)
      ) {
        if (totalcantidad == this.form.monto) {
          ///todo ok cuadra
          porcentaje = parseFloat((100 / allusers).toFixed(0));
          for (let a = 0; a < allusers; a++) {
            this.items[a].range = porcentaje;
            this.items[a].monto = cantidad;
          }
          this.mensaje = true;
        } else {
          ////no cuadra
          let sumardecimales = parseFloat(
            (this.form.monto - totalcantidad).toFixed(1)
          );
          porcentaje = parseFloat((100 / allusers).toFixed(2));
          for (let a = 0; a < allusers; a++) {
            if (a == allusers - 1) {
              cantidad = cantidad + sumardecimales;
            }
            this.items[a].range = porcentaje;
            this.items[a].monto = cantidad.toFixed(1);
          }

          this.mensaje = true;
        }
      } else {
        for (let a = 0; a < allusers; a++) {
          this.items[a].range = 100;
          this.items[a].monto = parseFloat(this.form.monto);
        }
      } ///1
    },
    dividirPago() {},
    itemPaTabla() {
      let a = [];
      a = this.items;
      this.aux = a;
      console.log("llega aux: " + typeof a);
    },
    validamontototal(val, index) {
      console.log(val);
      // this.items[index].monto=val.split('.',2).join(' ');
      let uno = val.split(".");
      if (uno.length > 1) {
        if (uno.length == 2) {
          if (uno[1].length > 2) {
            uno[1] = uno[1].slice("0", 2);
            let setea = uno[0] + "." + uno[1];
            this.seteamonto(setea, index);
          }
        } else {
          this.resetrow(index);
        }
      }
      let nuevo = parseFloat(val);
      if (this.validaentrada(nuevo, index)) {
        if (nuevo < 0 || nuevo > this.form.monto) {
          this.resetrow(index);
        } else {
          let resuelve = this.sumatotal;
          let porcentaje = parseFloat(
            ((nuevo / this.form.monto) * 100).toFixed(2)
          );
          if (resuelve == this.form.monto) {
            this.mensaje = true;
            this.mensajeok = "Todo Listo";
            this.items[index].range = porcentaje.toFixed(2);
          } else {
            this.mensaje = false;
            let dif = resuelve - this.form.monto;
            if (dif > 0) {
              this.diferencia = "sobran " + dif.toFixed(2);
            } else {
              this.diferencia = "faltan " + Math.abs(dif).toFixed(2);
            }
            this.items[index].range = porcentaje.toFixed(2);
          }
        }
      } else {
        this.resetrow(index);
      }
    },
    seteamonto(monto, index) {
      this.items[index].monto = monto;
    },
    resetrow(index) {
      this.items[index].monto = "";
      this.items[index].range = "";
      this.mensajeok = "Reset";
    },
    validaentrada(val, index) {
      let nuevo = parseFloat(val);
      if (isNaN(nuevo)) {
        return false;
      } else {
        return true;
      }
    },
    validaporcentajein(val, index) {
      if (val.length >= 6) {
        return false;
      }
      let nuevo = parseFloat(val);
      if (this.validaentrada(nuevo, index)) {
        if (nuevo < 0 || nuevo > 100) {
          this.resetrow(index);
          return false;
        } else {
          let numero = (this.form.monto / 100) * nuevo;
          let iva = (numero * this.form.iva) / 100;
          this.items[index].iva = iva;
          this.items[index].bruto = numero.toFixed(2);
          this.items[index].monto = numero + iva;
          let resuelve = this.sumatotal;
          if (resuelve == this.form.montoNeto) {
            this.mensaje = true;
            this.mensajeok = "Todo Listo";
          } else {
            this.mensaje = false;
            let dif = resuelve - this.form.montoNeto;
            if (dif > 0) {
              this.mensajealert = "verifica el monto total ";
              this.diferencia = "sobran " + dif.toFixed(2);
            } else {
              this.mensajealert = "verifica el monto total ";
              this.diferencia = "faltan " + Math.abs(dif).toFixed(2);
            }
          }
        }
      } else {
        this.resetrow(index);
      }
    },
    validamail() {
      let cadena = this.email;
      let regExMail =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (regExMail.test(cadena.value)) {
        console.log("correcto");
      } else {
        console.log("incorrecto");
      }
    },
  },
  components: {
    Multiselect,
  },
  computed: {
    ...mapState(["darkMode"]),
    items() {
      let auxiliar = [];
      let ayuda = [];
      this.form.modalidad == 1
        ? (this.isDisable = true)
        : (this.isDisable = false);

      if (!Array.isArray(this.form.seleccionAmigo)) {
        console.log("es objeto");
        let newObj = {};
        newObj.name = this.form.seleccionAmigo.nombre;
        newObj.id = this.form.seleccionAmigo.id;
        newObj.range = 100;
        newObj.bruto = this.form.monto;
        newObj.iva = this.form.iva;
        newObj.monto = this.form.montoNeto;
        auxiliar[0] = newObj;
        return auxiliar;
      } else if (this.form.seleccionAmigo.length > 0) {
        switch (this.form.modalidad) {
          case 1:
            console.log(this.form.seleccionAmigo);
            //this.form.seleccionAmigo.length>1 ? this.form.seleccionAmigo.splice(1,this.form.seleccionAmigo.length) : ''
            //this.isDisable = true;
            auxiliar = this.form.seleccionAmigo.map((elem) => {
              let newObj = {};
              newObj.name = elem.nombre;
              newObj.id = elem.id;
              newObj.range = 100;
              newObj.bruto = this.form.monto;
              newObj.iva = this.form.iva;
              newObj.monto = this.form.montoNeto;
              return newObj;
            });
            return auxiliar;

          case 2:
            //this.isDisable = false;
            auxiliar = this.form.seleccionAmigo.map((elem) => {
              console.log("elem: " + typeof elem);
              let newObj = {};
              newObj.name = elem.nombre;
              newObj.id = elem.id;
              newObj.range = 100;
              newObj.bruto = this.form.monto;
              newObj.iva = this.form.iva;
              newObj.monto = this.form.montoNeto;
              return newObj;
            });
            return (this.aux = auxiliar);
          case 3:
            //this.isDisable = false;

            auxiliar = this.form.seleccionAmigo.map((elem) => {
              let newObj = {};
              newObj.name = elem.nombre;
              newObj.id = elem.id;
              newObj.range = (100 / this.form.seleccionAmigo.length).toFixed(2);
              newObj.bruto = (
                this.form.monto * parseFloat(newObj.range / 100)
              ).toFixed(2);
              newObj.iva = parseFloat(
                newObj.bruto * (this.form.iva / 100)
              ).toFixed(2);
              newObj.monto = (
                parseFloat(newObj.bruto) + parseFloat(newObj.iva)
              ).toFixed(2);
              return newObj;
            });
            return auxiliar;
        }
      }
    },
    sumatotal() {
      let resuelve = 0;
      for (let a = 0; a < this.items.length; a++) {
        if (this.items[a].monto > 0) {
          resuelve += parseFloat(this.items[a].monto);
        }
      }
      return resuelve;
    },
    validasuma() {
      if (this.items.length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    "form.modalidad"(newValue) {
      if (newValue == 1 && this.form.seleccionAmigo.length > 0) {
        this.form.seleccionAmigo = this.form.seleccionAmigo[0];
      }
    },
  },
  validations: {
    form: {
      concepto: { required, minLength: minLength(7) },
      comentario: { required, minLength: minLength(7) },
      monto: { required },
      iva: { required },
      seleccionAmigo: { required },
      modalidad: { required },
    },
  },
  async mounted() {
    console.log("lo que sea");
    await this.getUsuarios();
    await this.getEmpresas();
    await this.getEmpresasExt();
    await this.getmycuentas();
    await this.getCuentas();
  },
};
</script>

<style scoped>
#btn-radios-2 {
}
</style>
