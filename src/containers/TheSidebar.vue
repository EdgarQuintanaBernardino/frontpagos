<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', value])"
    colorScheme="light"
    class="sidebarPrincipal"
  >
    <CSidebarBrand
      class="d-md-down-none headerSidebarPrincipal list-group-item-accent-info"
      to="/"
    >
      <!-- class="list-group-item-accent-primary list-group-item-divider" -->
      <!-- <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      /> -->
      <!-- <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      /> -->
      <img
        src="../assets/icons/LyBFlow.jpeg"
        alt="Logo LyBFlow"
        :height="40"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="nav" />
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import repomenu from "./repomenus";
import Service from "@/services/SessionStorage";
import responses from "@/assets/repositoriosjs/respuestas";
import alertas from "@/assets/repositoriosjs/alertas.js";

export default {
  name: "TheSidebar",
  props: ["locale", "roleactive"],
  data() {
    return {
      // minimize: false,
      nav: [],
      // show: 'responsive',
      buffor: []
    };
  },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    }
  },
  methods: {
    dropdown(data) {
      let result = {
        _name: "CSidebarNavDropdown",
        name: data["name"],
        route: data["href"],
        icon: data["icon"],
        // color: 'info',
        _children: []
      };
      for (let i = 0; i < data["elements"].length; i++) {
        if (data["elements"][i]["slug"] == "dropdown") {
          result._children.push(this.dropdown(data["elements"][i]));
        } else {
          result._children.push({
            _name: "CSidebarNavItem",
            name: data["elements"][i]["name"],
            to: data["elements"][i]["href"],
            icon: data["elements"][i]["icon"]
            // color: "success"
          });
        }
      }
      return result;
    },
    rebuildData(data) {
      try {
        this.buffor = [
          {
            _name: "CSidebarNav",
            _children: []
          }
        ];

        for (let k = 0; k < data.length; k++) {
          switch (data[k]["slug"]) {
            case "link":
              if (data[k]["href"].indexOf("http") !== -1) {
                this.buffor[0]._children.push({
                  _name: "CSidebarNavItem",
                  name: data[k]["name"],
                  href: data[k]["href"],
                  icon: data[k]["icon"],
                  target: "_blank"
                });
              } else {
                this.buffor[0]._children.push({
                  _name: "CSidebarNavItem",
                  _attrs: { class: "testInsideItems" },
                  name: data[k]["name"],
                  to: data[k]["href"],
                  icon: data[k]["icon"],
                  color: "secondary"
                });
              }
              break;
            case "title":
              this.buffor[0]._children.push({
                _name: "CSidebarNavTitle",
                _children: [data[k]["name"]]
              });
              break;
            case "dropdown":
              this.buffor[0]._children.push(this.dropdown(data[k]));
              break;
          }
        }
        return this.buffor;
      } catch (error) {
        this.out();
      }
    },
    changelocale(locale) {
      let service = Service();
      // let repo= repomenu();
      //   let localeactive={
      //     option:locale,
      //   };
      service.setLocale(locale);
      this.downloadSidebarData();
      //  repo.changeL(localeactive).then((res) => {

      //    let respuestas=responses()
      //   let response=respuestas.validarol(res);
      //   if(response==200){
      //    this.downloadSidebarData();
      //   }else{
      //     this.out();
      //   }
      // });
    },
    changerole(role) {
      let repo = repomenu();
      let roleactivein = {
        option: role
      };
      repo.changeR(roleactivein).then(res => {
        let respuestas = responses();
        let response = respuestas.validarol(res);
        if (response == 200) {
          this.downloadSidebarData();
        } else {
          this.out();
        }
      });
    },
    out() {
      let alert = alertas();
      alert.denegado();
      this.$router.push({ path: "/login" });
    },
    downloadSidebarData() {
      try {
        let self = this;
        let idioma = "en";
        let repo = repomenu();
        if (typeof localStorage.locale !== "undefined") {
          idioma = localStorage.getItem("locale");
        }
        let local = { locale: idioma };

        repo.rendermenu(local).then(res => {
          let respuestas = responses();
          let response = respuestas.valida(res);

          self.nav = self.rebuildData(response);
          console.log(self.nav);
        });
        this.$emit("success-api");
      } catch (error) {
        this.out();
      }
    }
  },
  watch: {
    locale: function(newVal) {
      // watch it
      this.changelocale(newVal);
    },
    roleactive: function(newVal) {
      // watch it
      this.changerole(newVal);
      //  this.downloadSidebarData()
    }
  },
  mounted() {
    this.$root.$on("toggle-sidebar", () => {
      const sidebarOpened = this.show === true || this.show === "responsive";
      this.show = sidebarOpened ? false : "responsive";
    });
    this.$root.$on("toggle-sidebar-mobile", () => {
      const sidebarClosed = this.show === "responsive" || this.show === false;
      this.show = sidebarClosed ? true : "responsive";
    });

    this.downloadSidebarData();
  }
};
</script>
<style scoped>
.testInsideItems a:hover{
  background-color: red !important;
  color: red !important;
  font-weight: bold;
}

.headerSidebarPrincipal {
  background-color: rgb(255, 255, 255) !important;
}
.sidebarPrincipal {
  background-color: rgb(242, 241, 241) !important;
}

/* ul:hover {
  background-color: rgb(242, 241, 241) !important;
} */

/* .sidebarPrincipal ul li {
  background-color: rgb(255, 0, 0) !important;
  color: red;
  font-weight: bold;
}

.c-sidebar-nav li:hover {
  background-color: rgb(255, 0, 0) !important;
  color: red;
  font-weight: bold;
} */

/* ul:hover li {
  background-color: rgb(255, 0, 0) !important;
} */

/* .c-sidebar.c-sidebar-light .c-sidebar-nav-link:hover,
.c-sidebar.c-sidebar-light .c-sidebar-nav-dropdown-toggle:hover {
  color: #fff;
  background: #ae2b5c;
} */

/* .sideBarMenu { */
/*Color del logo LybFlow*/
/* background-color: rgba(0, 129, 194, 255);  */
/* background-color: rgba(250, 251, 252, 255); Este es color que se queda */
/* background-color: rgb(255, 255, 255); */
/* } */
</style>
