import axios from "axios";
import { createInertiaApp } from "@inertiajs/vue3";
import { createApp, h } from "vue";
import { ZiggyVue } from "ziggy-js";
import Toast, { POSITION } from "vue-toastification";
import mitt from "mitt";
import { createPinia } from "pinia";
import { MaskInput } from "vue-3-mask";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
const emitter = mitt();
const pinia = createPinia();
const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5e3,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};
const cleanApp = () => {
  document.getElementById("app").removeAttribute("data-page");
};
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.vue`,
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Ata/AtaForm.vue": () => import("./assets/AtaForm-OhVZ9eSG.js"), "./Pages/Admin/Ata/AtaIndex.vue": () => import("./assets/AtaIndex-CUbgb9R5.js"), "./Pages/Admin/Avisos/AvisosForm.vue": () => import("./assets/AvisosForm-Bun0nOuI.js"), "./Pages/Admin/Avisos/AvisosIndex.vue": () => import("./assets/AvisosIndex-Cz_Edjvy.js"), "./Pages/Admin/Cardapio/CardapioForm.vue": () => import("./assets/CardapioForm-BuB59Vzr.js"), "./Pages/Admin/Cardapio/CardapioIndex.vue": () => import("./assets/CardapioIndex-CCoy4BkD.js"), "./Pages/Admin/Cardapio/Ingredientes.vue": () => import("./assets/Ingredientes-YQ5AnBix.js"), "./Pages/Admin/Cargo/CargoForm.vue": () => import("./assets/CargoForm-DcZKSjm3.js"), "./Pages/Admin/Cargo/CargoIndex.vue": () => import("./assets/CargoIndex-CPNkqZCX.js"), "./Pages/Admin/Comissao/ComissaoForm.vue": () => import("./assets/ComissaoForm-B90Ot4rK.js"), "./Pages/Admin/Comissao/ComissaoIndex.vue": () => import("./assets/ComissaoIndex-D7i8V1gP.js"), "./Pages/Admin/Comissao/ComissaoInfo.vue": () => import("./assets/ComissaoInfo-r_-qckOZ.js"), "./Pages/Admin/Estatuto/EstatutoForm.vue": () => import("./assets/EstatutoForm-MBB-DcYV.js"), "./Pages/Admin/Estatuto/EstatutoIndex.vue": () => import("./assets/EstatutoIndex-BPgspTcZ.js"), "./Pages/Admin/Eventos/EventoCardapioForm.vue": () => import("./assets/EventoCardapioForm-67Po5Bkf.js"), "./Pages/Admin/Eventos/EventosForm.vue": () => import("./assets/EventosForm-Cx_VdpMx.js"), "./Pages/Admin/Eventos/EventosIndex.vue": () => import("./assets/EventosIndex-BefBONeF.js"), "./Pages/Admin/Eventos/EventosInfo.vue": () => import("./assets/EventosInfo-BOlsQB2P.js"), "./Pages/Admin/Eventos/GaleriaEvento.vue": () => import("./assets/GaleriaEvento-DgGuURNQ.js"), "./Pages/Admin/Pessoa/PessoaForm.vue": () => import("./assets/PessoaForm-CE_8oXS0.js"), "./Pages/Admin/Pessoa/PessoaIndex.vue": () => import("./assets/PessoaIndex-B49yXuEG.js"), "./Pages/Admin/RegimeInterno/RegimeInternoForm.vue": () => import("./assets/RegimeInternoForm-D-p6jXNE.js"), "./Pages/Admin/RegimeInterno/RegimeInternoIndex.vue": () => import("./assets/RegimeInternoIndex-Uqz4dJ4Y.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-CZeAgt24.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-MD4-RcDi.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-DEPgz3Vw.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-C20vRpbT.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BGEANdmX.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-DdAefjN8.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-cDYxfL2Y.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-CDchi2CC.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-C0zoUvde.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-BA8PZxD6.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-B9WCgNE6.js"), "./Pages/Publico/Atas.vue": () => import("./assets/Atas-C7SSUbuv.js"), "./Pages/Publico/AtasDetalhes.vue": () => import("./assets/AtasDetalhes-DVnpdssy.js"), "./Pages/Publico/Avisos.vue": () => import("./assets/Avisos-DR7FXITR.js"), "./Pages/Publico/Comissao.vue": () => import("./assets/Comissao-D4QaMvrh.js"), "./Pages/Publico/EstatutoDetalhes.vue": () => import("./assets/EstatutoDetalhes-DTraX2lV.js"), "./Pages/Publico/Estatutos.vue": () => import("./assets/Estatutos-D9tNMf4G.js"), "./Pages/Publico/EventoDetalhes.vue": () => import("./assets/EventoDetalhes-BKz0-m4j.js"), "./Pages/Publico/Eventos.vue": () => import("./assets/Eventos-C_y-Zga0.js"), "./Pages/Publico/EventosAntigos.vue": () => import("./assets/EventosAntigos-PYn0o4H3.js"), "./Pages/Publico/Fotos.vue": () => import("./assets/Fotos-8rzG3KiM.js"), "./Pages/Publico/Index.vue": () => import("./assets/Index-DGyA0HDO.js"), "./Pages/Publico/RegimeInternoDetalhes.vue": () => import("./assets/RegimeInternoDetalhes-CxWMlK4q.js"), "./Pages/Publico/RegimesInternos.vue": () => import("./assets/RegimesInternos-BwrEAaOC.js"), "./Pages/Publico/Sobre.vue": () => import("./assets/Sobre-dxp90JvU.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DMaBece4.js") })
  ),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    app.component("MaskInput", MaskInput);
    app.use(plugin).use(ZiggyVue).use(pinia).use(Toast, toastOptions);
    app.config.globalProperties.$events = emitter;
    app.provide("events", emitter);
    app.mount(el);
  },
  progress: {
    color: "#4B5563"
  }
}).then(cleanApp);
