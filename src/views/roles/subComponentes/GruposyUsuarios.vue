<template>
  <div :class="darkMode ? 'BGD' : 'BGL'" class="col-12">
    <br />
    <span>Grupos</span>
    <multiselect
      class="mt-2 mb-2"
      v-model="GruposSel"
      :options="Grupos"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Grupos"
      label="Name"
      track-by="id"
      @input="selecGrupo()"
    >
    </multiselect>
    <br />
    <span>Usuarios</span>
    <multiselect
      @input="selecUsuario()"
      class="mt-2 mb-2"
      v-model="UsersSel"
      :options="Usuarios"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Usuarios"
      label="nombre"
      track-by="id"
      :preselect-first="true"
    >
    </multiselect>
    <br />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
export default {
  props: {
    empresa: Object,
    grupo: Array,
    usuarios: Array
  },
  components: {
    Multiselect
  },
  data() {
    return {
      UsersSel: [],
      GruposSel: [],
      Usuarios: [],
      Grupos: []
    };
  },
  async mounted() {
    await this.getGrupos(this.empresa.id);
    await this.getUsuarios();
    this.GruposSel = this.grupo;
    this.UsersSel = this.usuarios;
    this.Grupos = this.Grupos.flat();
  },
  computed: {
    ...mapState(["darkMode"])
  },
  methods: {
    async getUsuarios() {
      try {
        const repo = repoupdateprofileuser();
        await repo.onlyusers().then(res => {
          this.Usuarios = res.data.map(function(obj) {
            let newObj = {};
            newObj.nombre = obj.name;
            newObj.id = obj.id;
            newObj.email = obj.email;
            newObj.telefono = obj.telefono;
            return newObj;
          });
        });
      } catch (error) {
        //         console.log(error);
      } finally {
        //
      }
    },
    async selecGrupo() {
      this.UsersSel = [];
      console.log(this.GruposSel);
      if (this.GruposSel != null) {
        let grupos = this.GruposSel.map(elem => {
          let ConsUs = {};
          ConsUs.Id = elem.id;
          ConsUs.Name = elem.Name;
          ConsUs.Company_id = parseInt(elem.pivot.company_id);
          return ConsUs;
        });
        // let ConsUs = {};
        // ConsUs.Id = this.GruposSel.id;
        // ConsUs.Name = this.GruposSel.Name;
        // ConsUs.Company_id = parseInt(this.GruposSel.pivot.company_id);
        for (let elem of grupos) {
          await this.ConsUsersGrupos(elem);
        }
        let newArr = [];
        for (let elem of this.UsersSel) {
          if (!newArr.find(el => el.id == elem.id)) {
            newArr.push(elem);
          }
        }
        this.UsersSel = newArr;
      }
      this.$emit("grupoSelect", this.GruposSel);
      this.$emit("usuarioSelect", this.UsersSel);
    },
    async ConsUsersGrupos(request) {
      try {
        console.log(request);
        const repo = repoupdateprofileuser();
        await repo.consUsGrupo(request).then(res => {
          console.log(res);
          if (res.data.length > 0) {
            this.UsersSel = this.UsersSel.concat(
              res.data.map(elem => {
                let newObj = {};
                newObj.id = elem.id;
                newObj.nombre = elem.name;
                return newObj;
              })
            );
          } else {
            this.UsersSel = [];
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    },
    selecUsuario() {
      this.$emit("usuarioSelect", this.UsersSel);
    },
    async getGrupos(id) {
      try {
        const repo = repoupdateprofileuser();
        let request = {};
        request.Company_id = id;
        await repo.consGroupEmpresas(request).then(res => {
          console.log(res);
          res.data.length > 0 ? this.Grupos.push(res.data) : null;
          // this.Grupos.flat()
        });
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    }
  }
};
</script>

<style>
.BGL {
  background: #3c4b64;
  color: white;
  /* border-radius: 10px; */
  width: 100%;
}

.BGD {
  background: #23242d;
  /* border-radius: 10px; */
  width: 100%;
}
</style>
