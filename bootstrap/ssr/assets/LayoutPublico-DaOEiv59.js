import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "LayoutPublico",
  __ssrInlineRender: true,
  setup(__props) {
    const menuMobileAberto = ref(false);
    const page = usePage();
    const isActive = (path) => {
      const currentPath = page.url;
      if (path === "/publico" && currentPath === "/publico") return true;
      if (path !== "/publico" && currentPath.startsWith(path)) return true;
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50" }, _attrs))} data-v-25365533><header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl relative overflow-hidden" data-v-25365533><div class="container mx-auto px-4 py-6 relative z-10" data-v-25365533><div class="flex items-center justify-between" data-v-25365533><div class="flex items-center space-x-4" data-v-25365533><div class="flex flex-col items-baseline" data-v-25365533><div class="logo-container mx-auto" data-v-25365533><div class="logo" data-v-25365533><i class="fas fa-cross" data-v-25365533></i></div></div></div><div data-v-25365533><h1 class="text-3xl font-bold text-amber-300" style="${ssrRenderStyle({ "text-shadow": "2px 2px 4px rgba(0,0,0,0.3)" })}" data-v-25365533> Paróquia São Benedito </h1><p class="text-blue-100 text-sm italic" data-v-25365533> Arquidiocese de Cuiabá - Nossa Senhora do Rosário e São Benedito </p></div></div><nav class="hidden lg:flex space-x-1" data-v-25365533>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: [isActive("/publico") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 🏠 Início `);
          } else {
            return [
              createTextVNode(" 🏠 Início ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/eventos",
        class: [isActive("/publico/eventos") ? "bg-amber-300 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📅 Eventos `);
          } else {
            return [
              createTextVNode(" 📅 Eventos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/atas",
        class: [isActive("/publico/atas") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📝 Atas `);
          } else {
            return [
              createTextVNode(" 📝 Atas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/regimes-internos",
        class: [isActive("/publico/regimes-internos") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 📋 Regimento Interno `);
          } else {
            return [
              createTextVNode(" 📋 Regimento Interno ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/estatutos",
        class: [isActive("/publico/estatutos") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ⚖️ Estatuto `);
          } else {
            return [
              createTextVNode(" ⚖️ Estatuto ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/publico/sobre",
        class: [isActive("/publico/sobre") ? "bg-amber-500 text-white" : "text-blue-100 hover:bg-blue-700", "px-4 py-2 rounded transition-all duration-200"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ℹ️ Sobre `);
          } else {
            return [
              createTextVNode(" ℹ️ Sobre ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><button class="lg:hidden bg-blue-700 hover:bg-blue-600 p-3 rounded-lg" data-v-25365533><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25365533><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-25365533></path></svg></button></div>`);
      if (menuMobileAberto.value) {
        _push(`<nav class="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn" data-v-25365533>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 🏠 Início `);
            } else {
              return [
                createTextVNode(" 🏠 Início ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/eventos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📅 Eventos `);
            } else {
              return [
                createTextVNode(" 📅 Eventos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/atas",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📝 Atas `);
            } else {
              return [
                createTextVNode(" 📝 Atas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/regimes-internos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📋 Regimento Interno `);
            } else {
              return [
                createTextVNode(" 📋 Regimento Interno ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/estatutos",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ⚖️ Estatuto `);
            } else {
              return [
                createTextVNode(" ⚖️ Estatuto ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/publico/sobre",
          class: "block py-3 px-4 bg-blue-700 hover:bg-amber-500 rounded-lg transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ℹ️ Sobre `);
            } else {
              return [
                createTextVNode(" ℹ️ Sobre ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header><div class="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" data-v-25365533></div><main class="flex-1" data-v-25365533>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-12" data-v-25365533><div class="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" data-v-25365533></div><div class="container mx-auto px-4 py-12" data-v-25365533><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-25365533><div data-v-25365533><div class="flex items-baseline mb-4" data-v-25365533><div class="logo-container mr-4" data-v-25365533><div class="logo" data-v-25365533><i class="fas fa-cross" data-v-25365533></i></div></div><h3 class="text-xl font-bold text-amber-300" data-v-25365533>Paróquia São Benedito</h3></div><p class="text-gray-300 text-sm leading-relaxed" data-v-25365533> Arquidiocese de Cuiabá<br data-v-25365533> Paróquia de Nossa Senhora do Rosário e São Benedito<br data-v-25365533> Promovendo fé, comunidade e transparência. </p></div><div data-v-25365533><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-25365533><span class="mr-2" data-v-25365533>📞</span> Contato </h3><div class="space-y-2 text-gray-300 text-sm" data-v-25365533><p class="flex items-start" data-v-25365533><span class="mr-2 text-amber-400" data-v-25365533>📍</span><span data-v-25365533>Cuiabá, Mato Grosso</span></p><p class="flex items-center" data-v-25365533><span class="mr-2 text-amber-400" data-v-25365533>📞</span><span data-v-25365533>(00) 0000-0000</span></p><p class="flex items-center" data-v-25365533><span class="mr-2 text-amber-400" data-v-25365533>✉️</span><span data-v-25365533>contato@paroquiasaobento.org</span></p></div></div><div data-v-25365533><h3 class="text-xl font-bold text-amber-400 mb-4 flex items-center" data-v-25365533><span class="mr-2" data-v-25365533>⏰</span> Horários de Missas </h3><div class="text-gray-300 text-sm space-y-2" data-v-25365533><p data-v-25365533><strong class="text-amber-300" data-v-25365533>Segunda a Sexta:</strong> 19h00</p><p data-v-25365533><strong class="text-amber-300" data-v-25365533>Sábado:</strong> 18h00</p><p data-v-25365533><strong class="text-amber-300" data-v-25365533>Domingo:</strong> 8h00, 10h00 e 19h00</p></div></div></div><div class="border-t border-gray-800 mt-8 pt-6" data-v-25365533><div class="text-center text-gray-400 text-sm" data-v-25365533><p class="mb-2" data-v-25365533> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Paróquia São Benedito - Todos os direitos reservados </p><p class="text-xs text-gray-500 italic" data-v-25365533> &quot;Fé, Esperança e Caridade&quot; - Portal de Transparência Paroquial </p></div></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/LayoutPublico.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LayoutPublico = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25365533"]]);
export {
  LayoutPublico as L
};
