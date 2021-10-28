<template>
  <div class="principal">
    <div :class="direccion == 'v' ? 'content-principal' : ''">
      <div :class="direccion == 'v' ? 'lblmenuv' : 'lblmenuh'">
        <label
          :for="`radio${elem[llave]}`"
          v-for="elem in data"
          :key="elem[llave]"
          :class="elem[llave] == select ? 'lblmenuChecked' : ''"
          >{{ elem[titulo] }}</label
        >
        <label
          for="add"
          v-if="form.length>0"
          :class="-1 == select ? 'lblmenuChecked' : ''"
          >{{form}}</label
        >
      </div>

      <input
        @click="regresa(index)"
        v-for="(elem, index) in data"
        type="radio"
        v-model="select"
        :value="elem[llave]"
        name="radio"
        :id="`radio${elem[llave]}`"
      />
      <input v-if="form.length>0" name="add" id="add" v-model="select" :value="-1" type="radio" @click="regresa(-1)"/>

      <div v-if="select!=-1"
        v-for="elem in data"
        :class="select == elem[llave] ? 'Muestrainput' : 'contenido'"
      >
        <h2>{{ elem[tCont] }}</h2>
        <slot name="contenido"></slot>
        <p>{{ elem[Cont] }}</p>
      </div>
      <slot name="form" v-if="select==-1"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    titulo: String,
    llave: String,
    tCont: String,
    Cont: String,
    direccion: {
      type: String,
      default: "v"
    },
    add: Boolean,
    form:String,
  },
  data() {
    return {
      select: 0
    };
  },
  methods: {
    regresa(indice) {
      this.$emit("tabSel", indice);
    }
  },
  mounted() {}
};
</script>

<style>
.content-principal {
  display: flex;
}

.principal {
  /* display: flex; */
}

.lblmenuv {
  width: 20%;
  max-width: 700px;
  min-width: 80px;
  max-height: 50%;
  overflow: auto;
  background: #234;
  border-radius: 15px 0px 0px 15px;
}
.lblmenuv label {
  width: 100%;
  padding: 20% 5% 20px 10%;
  color: #fff;
  cursor: pointer;
  transition: all 600ms ease;
}
.lblmenuv label:hover {
  background: rgb(60, 77, 95);
}
.lblmenuh {
  display: flex;
  /* flex-wrap:initial; */
  overflow: auto;
  width: 100%;
  max-height: 20%;
  min-width: 80px;
  background: #234;
  border-radius: 15px 15px 0px 0px;
}
.lblmenuh label {
  width: 50%;
  padding: 4% 4% 2% 4%;
  color: #fff;
  cursor: pointer;
  transition: all 600ms ease;
}

.lblmenuh label:hover {
  background: rgb(60, 77, 95);
}

.contenido {
  position: relative;
}

.contenido {
  width: 80%;
  position: absolute;
  line-height: 1.8;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.9);
  padding: 30px;
  background: #fff;
  padding-bottom: 40px;
}
input {
  display: none;
}
.indicador {
  /* position:absolute; */
  width: 0px;
  height: 0px;
  background: #234552;
  border-right: 15px solid #fdfdfd;
  border-top: 15px solid transparent;
  border-left: 50px solid transparent;
  border-bottom: 15px solid transparent;
}
.Muestrainput {
  opacity: 1;
  visibility: visible;
  transition: all 450ms ease;
  transform: scale(1);
  padding-left: 10px;
  width: auto;
  overflow: auto;
}
.lblmenuChecked {
  background: rgb(44, 66, 88);
}
</style>
