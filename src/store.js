import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false,
  usuario: null,
  token: null,
  cargatop: false,
  fotouser: null,

  metodo: '',
  Paginas: [],
  EmpresasExternas:[],
  Pagina: {
    Id: -1,
    Usuario: '',
    Politica: -1,
    Url: '',
    Tipo: 0,
    Suscriptores: '',
    Estatus: 0,
  },
  TiposRedes: [],
  RedLoad: 0,
  quitaadmin:false,
  Sin_Permisos:false,
}
const mutations = {
  setEmpresasExternas(state,payload){
    state.EmpresasExternas=payload;
  },
  Sin_Permisos(state,payload){
    state.Sin_Permisos=payload;
  },
  SetAdminNo(state,payload){
state.quitaadmin=payload;
  },
  setTipo(state, payload) {
    state.RedLoad = payload
  },
  setRedes(state, payload) {
    state.Paginas.splice(0, state.Paginas.length)
    for (let i = 0; i < payload.length; i++) {
      state.Pagina.Id = payload[i].id
      state.Pagina.Usuario = payload[i].Usuario
      state.Pagina.Url = payload[i].Url
      state.Pagina.Tipo = payload[i].Id_Tipo
      state.Pagina.Suscriptores = payload[i].Suscriptores
      state.Pagina.Estatus = payload[i].Id_Status
      state.Pagina.Politica = payload[i].Politica
      state.Paginas.push(state.Pagina)
      state.Pagina = {
        Id: -1,
        Usuario: '',
        Url: '',
        Tipo: 0,
        Suscriptores: 0,
        Estatus: 0,
      }
    }
  },
  setTiposRedes(state, payload) {
    state.TiposRedes = payload
  },
  setUserActionMain(state, payload) {
    if (payload == null) {
      state.usuario = payload;
      state.token = payload;
      state.roles = payload;
      state.darkMode = false;
    } else {
      state.usuario = JSON.parse(payload.user);
      state.token = payload.token;
      state.roles = payload.roles;
      payload.tema == "false" ? '' : state.darkMode = !state.darkMode;
    }
  },
  setmetodo(state, payload) {
    state.metodo = payload;
  },
  setfoto(state, payload) {
    state.usuario.photo = payload;
  },
  cargaboton(state, payload) {
    state.cargatop = payload;
  },
  setRoleactive(state, payload) {
    this.commit('cargaboton', true);
    state.usuario.menuroles = payload;
  },
  setUserAction(state, payload) {
    if (payload == null) {
      state.usuario = payload;
      state.token = payload;
      state.roles = payload;
      state.darkMode = false;
    } else {
      state.usuario = payload.user;
      state.token = payload.token;
      state.roles = payload.roles;
      payload.sistema.tema == "false" ? '' : state.darkMode = !state.darkMode;
    }
  },
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  toggle(state, variable) {
    state[variable] = !state[variable]
  },
  changetheme(state) {
    let payload = !state.darkMode;
    state.darkMode = payload;
    localStorage.setItem('tema', payload.toString());
  }
}
const getters =
{
  getEmpresasExternas(state){return state.EmpresasExternas},
  get_Sin_Permisos(state){return state.Sin_Permisos},
  getAdminNo(state){return state.quitaadmin},
  getroleactive(state) { return state.user.menuroles },
  gettoken(state) { return state.token; },
  getcargamenutop(state) { return state.cargatop; },
  getphoto(state) { return state.usuario.photo; },
  getuser(state) { return state.usuario; },
  getInfluencer(state) { return state.usuario.Influencer },
  getmetodo(state) { return state.metodo; }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
})
