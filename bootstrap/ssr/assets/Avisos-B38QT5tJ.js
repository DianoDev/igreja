import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-DfoGx07Q.js";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Avisos",
  __ssrInlineRender: true,
  props: {
    avisos: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const formatarData = (data) => {
      if (!data) return "";
      try {
        return format(parseISO(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      } catch (e) {
        return data;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-6" data-v-8121999c${_scopeId}><h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center" data-v-8121999c${_scopeId}><span class="mr-3" data-v-8121999c${_scopeId}>📢</span> Mural de Avisos </h1><p class="text-gray-600 mb-6" data-v-8121999c${_scopeId}> Acompanhe os comunicados e informações importantes da Paróquia São Benedito. </p>`);
            if (__props.avisos && __props.avisos.length > 0) {
              _push2(`<div class="space-y-4" data-v-8121999c${_scopeId}><!--[-->`);
              ssrRenderList(__props.avisos, (aviso) => {
                _push2(`<div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow" data-v-8121999c${_scopeId}><div class="flex items-start justify-between gap-4" data-v-8121999c${_scopeId}><div class="flex-shrink-0" data-v-8121999c${_scopeId}><div class="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl" data-v-8121999c${_scopeId}><i class="fa fa-bullhorn" data-v-8121999c${_scopeId}></i></div></div><div class="flex-1 min-w-0" data-v-8121999c${_scopeId}><h3 class="font-bold text-gray-900 mb-2 text-xl" data-v-8121999c${_scopeId}>${ssrInterpolate(aviso.nome)}</h3><p class="text-gray-700 leading-relaxed mb-3" data-v-8121999c${_scopeId}>${ssrInterpolate(aviso.descricao)}</p><div class="flex flex-wrap gap-4 text-sm text-gray-500" data-v-8121999c${_scopeId}><div class="flex items-center" data-v-8121999c${_scopeId}><i class="fa fa-calendar mr-2" data-v-8121999c${_scopeId}></i> Publicado em ${ssrInterpolate(formatarData(aviso.created_at))}</div>`);
                if (aviso.data_expiração) {
                  _push2(`<div class="flex items-center" data-v-8121999c${_scopeId}><i class="fa fa-clock mr-2" data-v-8121999c${_scopeId}></i> Válido até ${ssrInterpolate(formatarData(aviso.data_expiração))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-12" data-v-8121999c${_scopeId}><div class="text-gray-400 text-6xl mb-4" data-v-8121999c${_scopeId}><i class="fa fa-inbox" data-v-8121999c${_scopeId}></i></div><p class="text-gray-500 text-lg" data-v-8121999c${_scopeId}> Não há avisos ativos no momento. </p></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-800 mb-6 flex items-center" }, [
                  createVNode("span", { class: "mr-3" }, "📢"),
                  createTextVNode(" Mural de Avisos ")
                ]),
                createVNode("p", { class: "text-gray-600 mb-6" }, " Acompanhe os comunicados e informações importantes da Paróquia São Benedito. "),
                __props.avisos && __props.avisos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.avisos, (aviso) => {
                    return openBlock(), createBlock("div", {
                      key: aviso.id,
                      class: "bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    }, [
                      createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl" }, [
                            createVNode("i", { class: "fa fa-bullhorn" })
                          ])
                        ]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("h3", { class: "font-bold text-gray-900 mb-2 text-xl" }, toDisplayString(aviso.nome), 1),
                          createVNode("p", { class: "text-gray-700 leading-relaxed mb-3" }, toDisplayString(aviso.descricao), 1),
                          createVNode("div", { class: "flex flex-wrap gap-4 text-sm text-gray-500" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("i", { class: "fa fa-calendar mr-2" }),
                              createTextVNode(" Publicado em " + toDisplayString(formatarData(aviso.created_at)), 1)
                            ]),
                            aviso.data_expiração ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center"
                            }, [
                              createVNode("i", { class: "fa fa-clock mr-2" }),
                              createTextVNode(" Válido até " + toDisplayString(formatarData(aviso.data_expiração)), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-12"
                }, [
                  createVNode("div", { class: "text-gray-400 text-6xl mb-4" }, [
                    createVNode("i", { class: "fa fa-inbox" })
                  ]),
                  createVNode("p", { class: "text-gray-500 text-lg" }, " Não há avisos ativos no momento. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Avisos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Avisos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8121999c"]]);
export {
  Avisos as default
};
