import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico--fxp03tU.js";
import { router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Estatutos",
  __ssrInlineRender: true,
  props: {
    estatutos: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const formatarDataHora = (dataHora) => {
      if (!dataHora) return "";
      const date = new Date(dataHora);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const verDetalhes = (id) => {
      router.visit(`/publico/estatutos/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6"${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center"${_scopeId}><span class="mr-3"${_scopeId}>⚖️</span> Estatutos </h1><p class="text-gray-600 mb-6"${_scopeId}> Consulte os estatutos oficiais da paróquia que definem sua organização, finalidades e funcionamento institucional. </p>`);
            if (__props.estatutos && __props.estatutos.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.estatutos, (estatuto) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><h2 class="text-xl font-semibold text-gray-800 mb-2"${_scopeId}>${ssrInterpolate(estatuto.nome)}</h2>`);
                if (estatuto.descricao) {
                  _push2(`<p class="text-gray-600 mb-3"${_scopeId}>${ssrInterpolate(estatuto.descricao)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-sm text-gray-500"${_scopeId}> Publicado em: ${ssrInterpolate(formatarDataHora(estatuto.created_at))}</div></div><button class="ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"${_scopeId}> Ver estatuto → </button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-12 text-gray-500"${_scopeId}><p class="text-lg"${_scopeId}>Nenhum estatuto disponível no momento.</p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "⚖️"),
                  createTextVNode(" Estatutos ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-6" }, " Consulte os estatutos oficiais da paróquia que definem sua organização, finalidades e funcionamento institucional. "),
                __props.estatutos && __props.estatutos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.estatutos, (estatuto) => {
                    return openBlock(), createBlock("div", {
                      key: estatuto.id,
                      class: "border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer",
                      onClick: ($event) => verDetalhes(estatuto.id)
                    }, [
                      createVNode("div", { class: "flex justify-between items-start" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode("h2", { class: "text-xl font-semibold text-gray-800 mb-2" }, toDisplayString(estatuto.nome), 1),
                          estatuto.descricao ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-gray-600 mb-3"
                          }, toDisplayString(estatuto.descricao), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "text-sm text-gray-500" }, " Publicado em: " + toDisplayString(formatarDataHora(estatuto.created_at)), 1)
                        ]),
                        createVNode("button", { class: "ml-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center" }, " Ver estatuto → ")
                      ])
                    ], 8, ["onClick"]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-12 text-gray-500"
                }, [
                  createVNode("p", { class: "text-lg" }, "Nenhum estatuto disponível no momento.")
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Estatutos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
