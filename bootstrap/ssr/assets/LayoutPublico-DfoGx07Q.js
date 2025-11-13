import { ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "LayoutPublico",
  __ssrInlineRender: true,
  setup(__props) {
    const sobre = ref(false);
    const menuLateralAberto = ref(false);
    const page = usePage();
    const isActive = (path) => {
      const currentPath = page.url;
      if (path === "/publico" && currentPath === "/publico") return true;
      if (path !== "/publico" && currentPath.startsWith(path)) return true;
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex bg-gray-50" }, _attrs))} data-v-c03dfd50><aside class="${ssrRenderClass([menuLateralAberto.value ? "translate-x-0" : "-translate-x-full lg:translate-x-0", "fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl z-50 transition-transform duration-300 overflow-y-auto flex flex-col"])}" data-v-c03dfd50><div class="mt-3" data-v-c03dfd50><div class="flex items-center justify-between mb-4" data-v-c03dfd50><button class="lg:hidden text-amber-300 hover:text-amber-400 transition-colors" data-v-c03dfd50><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c03dfd50><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-c03dfd50></path></svg></button></div></div><nav class="flex-1 p-4 space-y-2" data-v-c03dfd50>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-house text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Início</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-house text-xl" }),
              createVNode("span", { class: "font-medium" }, "Início")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/comissao",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/comissao") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-people-group text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Comissão</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-people-group text-xl" }),
              createVNode("span", { class: "font-medium" }, "Comissão")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/atas",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/atas") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-pen-to-square text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Atas</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-pen-to-square text-xl" }),
              createVNode("span", { class: "font-medium" }, "Atas")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/regimes-internos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/regimes-internos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-clipboard-list text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Regimento Interno</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-clipboard-list text-xl" }),
              createVNode("span", { class: "font-medium" }, "Regimento Interno")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/estatutos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/estatutos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-scale-balanced text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Estatuto</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-scale-balanced text-xl" }),
              createVNode("span", { class: "font-medium" }, "Estatuto")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/fotos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/fotos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-camera-retro text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Fotos</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-camera-retro text-xl" }),
              createVNode("span", { class: "font-medium" }, "Fotos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/eventos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/eventos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-calendar-days text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Próximos Eventos</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-calendar-days text-xl" }),
              createVNode("span", { class: "font-medium" }, "Próximos Eventos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/antigos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/antigos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-calendar-minus text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Eventos Passados</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-calendar-minus text-xl" }),
              createVNode("span", { class: "font-medium" }, "Eventos Passados")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/contas",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/contas") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-dollar text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Prestação de Contas</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-dollar text-xl" }),
              createVNode("span", { class: "font-medium" }, "Prestação de Contas")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/avisos",
        onClick: ($event) => menuLateralAberto.value = false,
        class: [isActive("/publico/avisos") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-bullhorn text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Avisos</span>`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-bullhorn text-xl" }),
              createVNode("span", { class: "font-medium" }, "Avisos")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (sobre.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/sobre",
          onClick: ($event) => menuLateralAberto.value = false,
          class: [isActive("/publico/sobre") ? "bg-amber-500 text-white shadow-lg" : "text-blue-100 hover:bg-blue-700", "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa-solid fa-circle-info text-xl" data-v-c03dfd50${_scopeId}></i><span class="font-medium" data-v-c03dfd50${_scopeId}>Sobre</span>`);
            } else {
              return [
                createVNode("i", { class: "fa-solid fa-circle-info text-xl" }),
                createVNode("span", { class: "font-medium" }, "Sobre")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav></aside>`);
      if (menuLateralAberto.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300" data-v-c03dfd50></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 flex flex-col min-h-screen" data-v-c03dfd50><header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl relative overflow-hidden sticky top-0 z-30" data-v-c03dfd50><div class="container mx-auto px-4 py-4 relative z-10" data-v-c03dfd50><div class="flex items-center justify-between" data-v-c03dfd50><button class="lg:hidden bg-blue-700 hover:bg-amber-500 p-3 rounded-lg transition-all duration-200" data-v-c03dfd50><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c03dfd50><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-c03dfd50></path></svg></button><div class="flex items-center space-x-4 flex-1 lg:flex-initial" data-v-c03dfd50><div class="hidden lg:flex flex-col items-baseline" data-v-c03dfd50><div class="logo-container mx-auto" data-v-c03dfd50><div class="logo" data-v-c03dfd50><i class="fas fa-cross" data-v-c03dfd50></i></div></div></div><div data-v-c03dfd50><h1 class="text-xl lg:text-2xl font-bold text-amber-300" style="${ssrRenderStyle({ "text-shadow": "2px 2px 4px rgba(0,0,0,0.3)" })}" data-v-c03dfd50> Comissão de Festa de São Benedito </h1><p class="text-blue-100 text-xs italic hidden sm:block" data-v-c03dfd50> Arquidiocese de Cuiabá - Nossa Senhora do Rosário e São Benedito </p></div></div></div></div></header><div class="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" data-v-c03dfd50></div><main class="flex-1 bg-gray-50" data-v-c03dfd50>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white" data-v-c03dfd50><div class="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" data-v-c03dfd50></div><div class="container mx-auto px-4 py-12" data-v-c03dfd50><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-c03dfd50><div data-v-c03dfd50><div class="flex items-baseline mb-4" data-v-c03dfd50><div class="logo-container mr-4" data-v-c03dfd50><div class="logo" data-v-c03dfd50><i class="fas fa-cross" data-v-c03dfd50></i></div></div><h3 class="text-xl font-bold text-amber-300" data-v-c03dfd50>Paróquia São Benedito</h3></div><p class="text-gray-300 text-sm leading-relaxed" data-v-c03dfd50> Arquidiocese de Cuiabá<br data-v-c03dfd50> Paróquia de Nossa Senhora do Rosário e São Benedito<br data-v-c03dfd50> Promovendo fé, comunidade e transparência. </p></div><div data-v-c03dfd50><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-c03dfd50><span class="mr-2" data-v-c03dfd50>📞</span> Contato </h3><div class="space-y-2 text-gray-300 text-sm" data-v-c03dfd50><p class="flex items-start" data-v-c03dfd50><span class="mr-2 text-amber-400" data-v-c03dfd50>📍</span><span data-v-c03dfd50>Cuiabá, Mato Grosso</span></p><p class="flex items-center" data-v-c03dfd50><span class="mr-2 text-amber-400" data-v-c03dfd50>📞</span><span data-v-c03dfd50>(00) 0000-0000</span></p><p class="flex items-center" data-v-c03dfd50><span class="mr-2 text-amber-400" data-v-c03dfd50>✉️</span><span data-v-c03dfd50>contato@paroquiasaobento.org</span></p></div></div><div data-v-c03dfd50><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-c03dfd50><span class="mr-2" data-v-c03dfd50>⏰</span> Horários de Missas </h3><div class="text-gray-300 text-sm space-y-2" data-v-c03dfd50><p data-v-c03dfd50><strong class="text-amber-300" data-v-c03dfd50>Segunda a Sexta:</strong> 19h00</p><p data-v-c03dfd50><strong class="text-amber-300" data-v-c03dfd50>Sábado:</strong> 18h00</p><p data-v-c03dfd50><strong class="text-amber-300" data-v-c03dfd50>Domingo:</strong> 8h00, 10h00 e 19h00</p></div></div></div><div class="border-t border-gray-800 mt-8 pt-6" data-v-c03dfd50><div class="text-center text-gray-400 text-sm" data-v-c03dfd50><p class="mb-2" data-v-c03dfd50> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Paróquia São Benedito - Todos os direitos reservados </p><p class="text-xs text-gray-500 italic" data-v-c03dfd50> &quot;Fé, Esperança e Caridade&quot; - Portal de Transparência Paroquial </p></div></div></div></footer></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/LayoutPublico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LayoutPublico = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c03dfd50"]]);
export {
  LayoutPublico as L
};
