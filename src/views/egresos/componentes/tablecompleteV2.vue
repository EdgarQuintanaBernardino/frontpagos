<template>
  <table class="table table-md table-hover sortable height:200px;">
    <thead class="text-center" style="font-size:1.1em;">
      <draggable v-model="selected" tag="tr">
        <!-- @click="ordenar(header)" -->
        <th
          sticky-column
          scope="col"
          v-for="header in selected"
          :key="header.key"
          class="header"
        >
          <div v-b-hover="handleHover" style="cursor: move;">
            <!-- <b-link class="text-white" style="cursor: move;">
              {{ header.label }}
            </b-link> -->
            <b-dropdown
              v-if="header.key != 'multiple'"
              no-caret
              :text="header.label"
              ref="dropdown"
              class="m-1"
              offset="35"
              :variant="testOp == header.key ? 'dark' : 'ligth'"
            >
              <template #button-content>
                {{ header.label }}
                <!-- Este icono cambia depende de si se esta ordenando de mayor a menor -->
                <b-icon
                  v-if="testOp == header.key"
                  :icon="iconDropDown"
                  variant="ligth"
                  style="width: 10px; height: 10px; margin-bottom: 4px;"
                  class="ml-2"
                ></b-icon>
              </template>
              <b-dropdown-text>
                Ordenar
              </b-dropdown-text>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-form>
                <!-- <b-form-group label="Email" label-for="dropdown-form-email">
                  <b-form-input
                    size="sm"
                    placeholder="email@example.com"
                  ></b-form-input>
                </b-form-group>-->

                <!-- <b-form-group
                  label="Empieza con"
                  label-for="dropdown-form-password"
                >
                  <b-form-input
                    type="text"
                    size="sm"
                    placeholder="Letras (A - Z)"
                  ></b-form-input>
                </b-form-group> -->
                <!-- <b-form-group
                  label="Termina con"
                  label-for="dropdown-form-text"
                >
                  <b-form-input
                    type="text"
                    size="sm"
                    placeholder="Letras (A - Z)"
                  ></b-form-input>
                </b-form-group> -->
                <b-dropdown-item-button @click="sort(0, header)">
                  <b-icon
                    style="width: 12px; height: 12px; margin-bottom: 4px;"
                    icon="caret-up-fill"
                    variant="dark"
                    class="mr-2"
                  ></b-icon
                  >Mayor a menor</b-dropdown-item-button
                >
                <b-dropdown-item-button @click="sort(1, header)">
                  <b-icon
                    style="width: 12px; height: 12px; margin-bottom: 4px;"
                    icon="caret-down-fill"
                    variant="dark"
                    class="mr-2"
                  ></b-icon
                  >Menor a mayor</b-dropdown-item-button
                >

                <!-- <b-form-checkbox class="mb-3">Remember me</b-form-checkbox> -->
                <!-- <b-button variant="primary" size="sm">Sign In</b-button> -->
              </b-dropdown-form>
            </b-dropdown>

            <!-- <b-icon
              class="ml-2 text-white"
              icon="arrow-left-right"
              animation="cylon"
              v-if="isHovered"
              font-scale="1"
              shift-v="-10"
              ></b-icon
            > -->
          </div>
          <!-- <div v-b-hover="handleHover" style="cursor: move;">
            <b-form-checkbox
              v-if="header.key == 'multiple'"
              id="checkbox-1"
              size="lg"
              class="mb-2 ml-2"
              v-b-tooltip.hover
              title="Seleccionar todos"
            >
            </b-form-checkbox>
          </div> -->
        </th>
      </draggable>
    </thead>

    <tbody class="text-center changeColor">
      <tr v-for="item in items" :key="item.id">
        <td
          v-for="header in selected"
          :key="header.key"
          :class="varTempo.includes(item) ? active : null"
        >
          <!-- <span v-if="header.key == 'multiple'">
            <div>
              <b-form-checkbox
                size="lg"
                class="mb-2 ml-2"
                :value="true"
                :unchecked-value="false"
                @change="activeItem(item)"
              >
              </b-form-checkbox>
            </div>
          </span> -->
          <b-badge v-if="header.key == 'iva'" variant="info">{{
            item.iva
          }}</b-badge>
          <!-- {{ item[header.key] }} % -->
          <span v-if="header.key == 'actions'">
            <b-container fluid>
              <b-row class="justify-content-md-center">
                <b-col lg="12">
                  <!-- <b-col lg="12" v-for="permi in acciones" :key="permi"> -->
                  <!-- <b-button
                    size="sm"
                    v-if="permi == 1"
                    variant="primary"
                    class="mr-1 mb-1 mt-2"
                  >
                    <b-icon icon="pencil"></b-icon>Editar
                  </b-button>
                  <b-button
                    v-if="permi == 3"
                    size="sm"
                    variant="danger"
                    class="mr-1 mb-1  mt-2"
                  >
                    <b-icon icon="lock-fill"></b-icon>Eliminar
                  </b-button> -->
                  <b-button-group>
                    <b-button class="mr-1" variant="success">
                      <b-icon icon="pencil-square"></b-icon>
                    </b-button>
                    <b-button variant="danger">
                      <b-icon icon="trash-fill"></b-icon>
                    </b-button>
                  </b-button-group>
                  <!-- <b-button
                    v-if="permi == 1"
                    size="md"
                    block
                    @click.prevent="info(item)"
                    variant="outline-primary"
                    class="mr-1 mb-1 mt-2"
                  >
                    <b-icon icon="pencil"></b-icon>Editar
                  </b-button>
                  <b-button
                    v-if="permi == 2"
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
                      ></b-icon>
                    </b-iconstack>
                    <span class="font-lg"> Roles</span>
                  </b-button>
                  <b-button
                    v-if="permi == 3"
                    size="md"
                    variant="outline-danger"
                    block
                    @click="deleteevent(row.item)"
                    class="mr-1 mb-1  mt-2"
                  >
                    <b-icon icon="lock-fill"></b-icon>Borrar
                  </b-button> -->
                </b-col>
              </b-row>
            </b-container>
          </span>
          <span v-if="header.key == 'comentario'">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"> -->
            <span> Sin Comentarios</span>
            <!-- <span v-else>{{ item[header.key] }}</span></span
          > -->
          </span>

          <span v-if="header.key == 'moneda'">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"> -->
            <span> Dolares</span>
            <!-- <span v-else>{{ item[header.key] }}</span></span
          > -->
          </span>
          <!-- <span v-if="header.key == 'usuarios'">
            <b-link> -->
          <!-- <span v-if="item['ref'][0]['usersref'].length == 0"> -->
          <!-- <span>
                Sin Usarios
              </span> -->
          <!-- <span v-else>
                Usuarios({{ item["ref"][0]["usersref"].length }})
              </span> -->
          <!-- </b-link>
          </span> -->
          <b-badge v-if="header.key == 'monto_bruto'" variant="primary">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"> -->
            <span>
              $1000
            </span>
            <!-- <span v-else>${{ item[header.key] }}</span></b-badge -->
          </b-badge>
          <b-badge v-if="header.key == 'monto_solicitado'" variant="info">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"> -->
            <span> $1200</span>
            <!-- <span v-else>${{ item[header.key] }}</span> -->
          </b-badge>
          <span v-if="header.key == 'concepto'">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"
              >Sin datos</span
            >
            <span v-else>{{ item[header.key] }}</span></span
          > -->
            <span>Test estatico</span></span
          >
          <span v-if="header.key == 'titulo'">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"
              >Sin datos</span
            >
            <span v-else>{{ item[header.key] }}</span></span
          > -->
            <span>Titulo 1</span></span
          >
          <span v-if="header.key == 'usersin'">
            <b-row>
              <b-col cols="12">
                <!-- Temporal test -->
                <b-img
                  src="https://pagosfile.s3-us-west-2.amazonaws.com/pagos/439/Cotizacion/fshKh7Nl9lee1tS9Ew4ZvBaMnVjv4M54FyXVXPWX.jpeg"
                  rounded="circle"
                  width="40px"
                  height="40px"
                  class="mr-1"
                  v-b-tooltip.hover
                  title="User X"
                ></b-img>
                <!-- Esta es en caso de que no tenga una foto de perfil -->
                <!-- <b-img
                  v-if="
                    item[header.key][0].photo == null ||
                      item[header.key][0].photo == ''
                  "
                  src="https://pagosfile.s3-us-west-2.amazonaws.com/imagenes_basicas/profile/sinfoto.png"
                  rounded="circle"
                  alt="Circle image"
                  width="30px"
                  class="mr-1"
                ></b-img> -->
                <!-- Esta es la consulta en dado caso que si se tenga una foro en el perfil del usuario -->
                <!-- <b-img
                  :src="
                    'https://pagosfile.s3-us-west-2.amazonaws.com/' +
                      item[header.key][0].photo
                  "
                  rounded="circle"
                  alt="Circle image"
                  width="30px"
                  class="mr-1"
                  v-else
                ></b-img> -->
              </b-col>
              <b-col cols="12">
                <!-- <span
                  v-if="item[header.key] === '' || item[header.key] === null"
                  >Sin datos</span
                >
                <span v-else>
                  {{ item[header.key][0].name }}
                </span> -->
                <!-- <span
                  v-if="item[header.key] === '' || item[header.key] === null"
                  >Sin datos</span
                > -->
              </b-col>
            </b-row>
          </span>
          <span v-if="header.key == 'visto'">
            <!-- <span v-if="item[header.key] === '' || item[header.key] === null"
              >Sin datos</span
            >
            <span v-else>
              <b-badge
                variant="danger"
                class="text-white"
                v-if="item[header.key] == 'no'"
              >
                Aún no
              </b-badge>
              <b-badge v-else variant="success" class="text-white">
                Visto
              </b-badge>
            </span></span
          > -->
            <span>
              <b-badge variant="danger" class="text-white">
                Pendiente
              </b-badge>
            </span></span
          >
          <span v-if="header.key == 'recurrente'">
            <!-- <span v-if="item['ref'][0]['recurrencia'] == null">
              <b-row>
                <b-col cols="12">
                  El pago es único
                </b-col>
              </b-row>
            </span>
            <span v-else>
              <b-row>
                <b-col cols="12" style="text-align:center">
                  <strong>Inicia</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ item["ref"][0]["recurrencia"].inicia }}
                </b-col>
                <b-col cols="12" style="text-align:center">
                  <strong>Termina</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ item["ref"][0]["recurrencia"].termina }}
                </b-col>
                <b-col cols="12" style="text-align:center">
                  <strong>Recurrencia</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ item["ref"][0]["recurrencia"].tipo }}
                </b-col>
                <b-col cols="12" style="text-align:center">
                  <strong>Pagos:</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ item["ref"][0]["recurrencia"].total_pagos }}
                </b-col>
              </b-row>
            </span> -->
            <span>
              <b-badge variant="success" class="text-white">
                Recurrente
              </b-badge>
            </span></span
          >

          <b-row v-if="header.key == 'links'">
            <b-col cols="12">
              <!-- <b-col v-if="item['ref'][0]['linkspagos'].length == 0" cols="12"> -->
              <!-- Ver -->
              <div class="text-center">
                <span
                  >Ver
                  <b-badge
                    style="cursor: pointer;"
                    variant="dark"
                    v-b-popover.hover="showLinks"
                    >21 Links</b-badge
                  ></span
                >
              </div>
            </b-col>
            <!-- <b-col v-else>
              <b-row>
                <b-col cols="12" style="text-align:center">
                  <b-link
                    variant="success"
                    v-for="link in item['ref'][0]['linkspagos']"
                    :key="link.id"
                    target="_blank"
                    :href="link.link"
                  >
                    {{ link.link }}
                    <br />
                  </b-link>
                </b-col>
              </b-row>
            </b-col> -->
          </b-row>
          <b-row v-if="header.key == 'iva'">
            <b-col cols="12">
              <b-badge variant="success"> 16 % </b-badge>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'prestamo'">
            <b-col cols="12">
              <b-badge variant="warning"> Sí</b-badge>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'variable'">
            <b-col cols="12">
              <b-badge variant="success"> Sí</b-badge>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'status_factura'">
            <b-col cols="12">
              <b-badge variant="danger"> Pendiente</b-badge>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'fechaLimite'">
            <b-col cols="12">
              12/09/2023
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'creado'">
            <b-col cols="12" style="text-align:center">
              <!-- <span>{{ item.created_at }}</span> -->
              <span> 12/01/2022</span>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'tag'">
            <b-col cols="12">
              <div class="text-center">
                <span
                  >Ver
                  <b-badge
                    style="cursor: pointer;"
                    variant="dark"
                    v-b-popover.hover="showTags"
                    >3 tags</b-badge
                  ></span
                >
              </div>
            </b-col>
            <!-- <b-col v-if="item['ref'][0]['tags'].length == 0" cols="12">
              Sin Tags
            </b-col> -->

            <!-- <b-col v-else>
              <b-row>
                <b-col cols="12" style="text-align:center">
                  <b-badge
                    variant="success"
                    v-for="tag in item['ref'][0]['tags']"
                    :key="tag.id"
                    class="mr-1"
                  >
                    #{{ tag.tag }}
                  </b-badge>
                </b-col>
              </b-row>
            </b-col> -->
          </b-row>
          <b-row v-if="header.key == 'empresa'">
            <b-col cols="12">
              Empresa21
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'cuenta'">
            <!-- <b-col v-if="item['ref'][0]['cuentas'].length == 0" cols="12"> -->
            <b-col cols="12">
              Banamex 1
            </b-col>
            <!-- <b-col v-else>
              <b-row
                v-for="cuenta in item['ref'][0]['cuentas']"
                :key="cuenta.id"
              >
                <b-col cols="12" style="text-align:center">
                  <strong>Nombre</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ cuenta.nombre_cuenta }}
                </b-col>

                <b-col cols="12" style="text-align:center">
                  <strong>número</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ cuenta.numero_cuenta }}
                </b-col>
                <b-col cols="12" style="text-align:center">
                  <strong>banco</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ cuenta.banco }}
                </b-col>
              </b-row>
            </b-col> -->
          </b-row>
          <b-row v-if="header.key == 'ceder'">
            <b-col cols="12">
              <b-badge variant="warning">
                Sí
              </b-badge>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'proyecto'">
            <!-- <b-col v-if="item['ref'][0]['proyectos'].length == 0" cols="12"> -->
            <b-col cols="12">
              <div class="text-center">
                <span
                  >Ver
                  <b-badge
                    style="cursor: pointer;"
                    variant="light"
                    v-b-popover.hover="showProjects"
                    >10 Proyectos</b-badge
                  ></span
                >
              </div>
            </b-col>
            <!-- <b-col v-else>
              <b-row
                v-for="proyecto in item['ref'][0]['proyectos']"
                :key="proyecto.id"
              >
                <b-col cols="12" style="text-align:center">
                  <strong>Nombre</strong>
                </b-col>
                <b-col cols="12" style="text-align:center">
                  {{ proyecto.nombre }}
                </b-col>
              </b-row>
            </b-col> -->
          </b-row>
          <b-row v-if="header.key == 'id_propio'">
            <!-- <b-col v-if="item['ref'][0].pivot['id_propio']" cols="12">
              <span> {{ item["ref"][0].pivot["id_propio"] }} </span>
            </b-col> -->

            <!-- <b-col v-else cols="12">
              <span> Aún no tiene id</span>
            </b-col> -->
            <b-col cols="12">
              <span> 15</span>
            </b-col>
          </b-row>
          <b-row v-if="header.key == 'archivos'">
            <!-- <span> Sin archivos</span> -->
            <div class="text-center">
              <span
                >Ver
                <b-badge
                  style="cursor: pointer;"
                  variant="ligth"
                  v-b-popover.hover="showFiles"
                  >12 Archivos</b-badge
                ></span
              >
            </div>
            <!-- <span v-show="false">{{
              (coming_data = buclecuenta(item["ref"][0]["archivos"]))
            }}</span>
            <b-link>
              <span v-if="coming_data.length == 0">
                Sin archivos
              </span>
              <span v-if="coming_data.hasOwnProperty('Factura')">
                Factura({{ coming_data["Factura"].length }}),
              </span>
              <span v-if="coming_data.hasOwnProperty('Cotización')">
                Cotización({{ coming_data["Cotización"].length }}),
              </span>
              <span v-if="coming_data.hasOwnProperty('Comprobante de Pago')">
                Comprobante de Pago({{
                  coming_data["Comprobante de Pago"].length
                }}),
              </span>
              <span v-if="coming_data.hasOwnProperty('Orden de Compra')">
                Orden de Compra({{ coming_data["Orden de Compra"].length }}),
              </span>
              <span v-if="coming_data.hasOwnProperty('Extras')">
                Extras({{ coming_data["Extras"].length }}),
              </span>
            </b-link> -->
          </b-row>
          <!-- <b-row v-if="header.key == 'ticket'">
            <b-col cols="12">
              <b-button variant="info" class="text-white">Abrir</b-button> -->
          <!-- <b-button
                variant="info"
                class="text-white"
                @click="showticket(item.id)"
                v-if="item.visto_chat == 'no'"
                >Chat</b-button
              >
              <b-button
                variant="success"
                class="text-white"
                @click="showticket(item.id)"
                v-else
                >Chat</b-button
              > -->
          <!-- </b-col>
          </b-row> -->
          <b-row v-if="header.key == 'status'">
            <b-col cols="12">
              <b-badge variant="success" class="text-white">
                Aprobado
              </b-badge>
            </b-col>
            <!-- <b-col v-if="item.status_id == null" cols="12">
              Ningún Status
            </b-col> -->
            <!-- <b-col v-else>
              <b-button
                variant="danger"
                v-if="item.status.statusgeneric_id == 3"
                >Denegado</b-button
              >
              <b-button
                variant="warning"
                v-if="item.status.statusgeneric_id == 2"
                class="text-white"
                >Pendiente</b-button
              >
              <b-button
                variant="success"
                v-if="item.status.statusgeneric_id == 1"
                >Aprobado</b-button
              >
            </b-col> -->
          </b-row>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  components: { draggable },

  data() {
    return {
      varTempo: [],
      active: "table-active",
      testOp: "",
      iconDropDown: "caret-up-fill",
      lower: false,
      isHovered: false,
      items: [],
      selected: [],
      acciones: [],
      selectcolumn: null
    };
  },
  props: ["selectedin", "datosalltable"],

  watch: {
    selectedin: function(newval) {
      this.selected = newval;
      console.log(this.selected);
    },
    datosalltable: function(newval) {
      console.log(this.datosalltable);
      // this.items = this.getreplicas(newval.items);
      this.items = this.datosalltable.items;
      console.log(this.items);
      this.acciones = newval.acciones;
      // console.log(this.acciones) A las acciones le llegan 1 y 3
    }
  },
  computed: {
    showLinks() {
      return {
        html: true,
        customClass: "popHover",
        title: () => {
          return "Links de pago";
        },
        content: () => {
          let testLink = "https://codepen.io/samsurysites/pen/PobRYb";
          let links = [];
          for (let i = 0; i <= 20; i++) {
            if (i == 0) {
              links.push("1: " + testLink);
            } else {
              links.push("<br></br>" + (i + 1) + ": " + testLink);
            }
          }

          return links;
        }
      };
    },
    showTags() {
      return {
        html: true,
        customClass: "popHover",
        title: () => {
          return "Tags";
        },
        content: () => {
          let testTags = "tagIngresos";
          let tags = [];
          for (let i = 0; i <= 2; i++) {
            if (i == 0) {
              tags.push("1: " + testTags);
            } else {
              tags.push("<br></br>" + (i + 1) + ": " + testTags);
            }
          }
          return tags;
        }
      };
    },
    showProjects() {
      return {
        html: true,
        customClass: "popHover",
        title: () => {
          return "Proyectos";
        },
        content: () => {
          let testPrjects = "Ingresos Cuenta X ";
          let proyectos = [];
          for (let i = 0; i <= 9; i++) {
            if (i == 0) {
              proyectos.push("1: " + testPrjects);
            } else {
              proyectos.push("<br></br>" + (i + 1) + ": " + testPrjects);
            }
          }
          return proyectos;
        }
      };
    },
    showFiles() {
      return {
        html: true,
        customClass: "popHover",
        title: () => {
          return "Archivos";
        },
        content: () => {
          let testFiles = "FacturacionPagos.pdf";
          let files = [];
          for (let i = 0; i <= 9; i++) {
            if (i == 0) {
              files.push("1: " + testFiles);
            } else {
              files.push("<br></br>" + (i + 1) + ": " + testFiles);
            }
          }
          return files;
        }
      };
    }
  },
  methods: {
    TestContext() {
      console.log("Se esta activando el contMenu...");
    },
    activeItem(op) {
      console.log(op);
      this.varTempo.push(op);
    },
    sort(op, data) {
      console.log(data);
      if (op == 0) {
        console.log("Se esta ordenando de mayor a menor");
        this.iconDropDown = "caret-up-fill";
        this.testOp = data.key;
      } else {
        console.log("Se esta ordenando de menor a mayor");
        this.iconDropDown = "caret-down-fill";
        this.testOp = data.key;
      }
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    },
    getacciones() {
      return this.acciones;
    },
    buclecuenta(archivo) {
      if (archivo.length > 0) {
        let nuevos2 = _.groupBy(archivo, "gettipo.tipo");
        return nuevos2;
      } else {
        return archivo;
      }
    },
    // getreplicas(array) {
    //   if (array) {
    //     array.forEach(element => {
    //       let fecha = new Date(element.created_at);
    //       let nuevo = fecha.toDateString("es-ES");
    //       element.created_at = nuevo;
    //     });
    //     return array;
    //   } else {
    //     return [];
    //   }
    // },
    deleteevent(item) {
      this.$emit("deleteevento", item);
    },
    info(item) {
      this.$emit("edit", item);
      // this.infoModal.title = `Row index: ${index}`
      // this.infoModal.content = JSON.stringify(item, null, 2)
      // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    relationcuenta(row) {
      this.$emit("roles", row);
    }
  }
};
</script>

<style type="text/css" scoped>
.changeColor {
  border-color: #00da98;
}
.popHover {
  max-height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

thead tr th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  /* background-color: rgb(230, 126, 34); */
}

.table-responsive {
  height: 400px;
  overflow: scroll;
}
.table-active {
  background-color: #b6d4ff73;
}
.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th {
  background-color: #c9c9c99d;
}
</style>
