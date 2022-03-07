<template>
  <div>
    <center>
      <h5>Selecciona una cuenta</h5>
    </center>
    <b-card no-body class="mt-3">
      <b-tabs pills card>
        <b-tab title="Mis Cuentas" active>
          <b-card-text>
            <b-list-group flush>
              <b-list-group-item
                v-for="option in Cuentas"
                :key="option.id"
                @click="continuar(option)"
                href="#"
                :active="value.Cuenta.id == option.id ? true : false"
                >{{ option.nickname }}</b-list-group-item
              >
            </b-list-group>
          </b-card-text>
        </b-tab>
        <b-tab title="Cuentas externas">
          <b-card-text>
            <b-list-group flush>
              <b-list-group-item
                v-for="option in CuentasExternas"
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
</template>

<script>
import repoupdateprofileuser from "@/assets/repositoriosjs/repoupdateprofileuser";
import { mapState } from "vuex";
export default {
  props: {
    cuenta: Object
  },
  data() {
    return {
      CuentasExternas: [],
      Cuentas: [],
      value: {
        Cuenta: {}
      }
    };
  },
  computed: {
    ...mapState(["darkMode"])
  },
  async mounted() {
    await this.getCuentas();
    this.value.Cuenta = this.cuenta;
  },
  methods: {
    continuar(data) {
      this.$emit("CuentaSelect", data);
    },
    async getCuentas() {
      try {
        const repo = repoupdateprofileuser();
        await repo.getmycuentas().then(res => {
          this.Cuentas = res.data.cuentas.filter(
            cuenta => cuenta.empresas[0].id == this.$parent.value.Empresas.id
          );
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
