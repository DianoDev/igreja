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
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Ata/AtaForm.vue": () => import("./assets/AtaForm-BVLfSOhL.js"), "./Pages/Admin/Ata/AtaIndex.vue": () => import("./assets/AtaIndex-DAr_GK17.js"), "./Pages/Admin/Cardapio/CardapioForm.vue": () => import("./assets/CardapioForm-BuB59Vzr.js"), "./Pages/Admin/Cardapio/CardapioIndex.vue": () => import("./assets/CardapioIndex-Bk375nov.js"), "./Pages/Admin/Cardapio/Ingredientes.vue": () => import("./assets/Ingredientes-f0z2-Dak.js"), "./Pages/Admin/Cargo/CargoForm.vue": () => import("./assets/CargoForm-iWacf1Z0.js"), "./Pages/Admin/Cargo/CargoIndex.vue": () => import("./assets/CargoIndex-WU3p4IoF.js"), "./Pages/Admin/Estatuto/EstatutoForm.vue": () => import("./assets/EstatutoForm-CAgNm48n.js"), "./Pages/Admin/Estatuto/EstatutoIndex.vue": () => import("./assets/EstatutoIndex-CJW-u5xC.js"), "./Pages/Admin/Eventos/EventoCardapioForm.vue": () => import("./assets/EventoCardapioForm-67Po5Bkf.js"), "./Pages/Admin/Eventos/EventosForm.vue": () => import("./assets/EventosForm-BZ-aOIXC.js"), "./Pages/Admin/Eventos/EventosIndex.vue": () => import("./assets/EventosIndex-DGIsV4dW.js"), "./Pages/Admin/Eventos/EventosInfo.vue": () => import("./assets/EventosInfo-CMduWb5l.js"), "./Pages/Admin/Eventos/GaleriaEvento.vue": () => import("./assets/GaleriaEvento-BfmmfFqF.js"), "./Pages/Admin/Pessoa/PessoaForm.vue": () => import("./assets/PessoaForm-CGbuSKRK.js"), "./Pages/Admin/Pessoa/PessoaIndex.vue": () => import("./assets/PessoaIndex-DEv6xHZj.js"), "./Pages/Admin/RegimeInterno/RegimeInternoForm.vue": () => import("./assets/RegimeInternoForm-DWXRerh1.js"), "./Pages/Admin/RegimeInterno/RegimeInternoIndex.vue": () => import("./assets/RegimeInternoIndex-C8L4Xvmi.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-CZeAgt24.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-MD4-RcDi.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-DEPgz3Vw.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-C20vRpbT.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BGEANdmX.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-DdAefjN8.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-cDYxfL2Y.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-CDchi2CC.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-C0zoUvde.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-BA8PZxD6.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-B9WCgNE6.js"), "./Pages/Publico/Atas.vue": () => import("./assets/Atas-DnOpyxgH.js"), "./Pages/Publico/AtasDetalhes.vue": () => import("./assets/AtasDetalhes-D1QxzTwe.js"), "./Pages/Publico/EstatutoDetalhes.vue": () => import("./assets/EstatutoDetalhes-KBxci9MP.js"), "./Pages/Publico/Estatutos.vue": () => import("./assets/Estatutos-B0HOBS6S.js"), "./Pages/Publico/EventoDetalhes.vue": () => import("./assets/EventoDetalhes-CAvb5oGS.js"), "./Pages/Publico/Eventos.vue": () => import("./assets/Eventos-ByRdSJ9X.js"), "./Pages/Publico/Index.vue": () => import("./assets/Index-CanoP0Vo.js"), "./Pages/Publico/RegimeInternoDetalhes.vue": () => import("./assets/RegimeInternoDetalhes-CAKaIG75.js"), "./Pages/Publico/RegimesInternos.vue": () => import("./assets/RegimesInternos-CPJfTch7.js"), "./Pages/Publico/Sobre.vue": () => import("./assets/Sobre-DCSbs-KC.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-DMaBece4.js") })
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
