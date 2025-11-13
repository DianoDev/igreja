import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-DfoGx07Q.js";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Contas",
  __ssrInlineRender: true,
  props: {
    eventos: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const formatarData = (data) => {
      if (!data) return "";
      const date = /* @__PURE__ */ new Date(data + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-8" data-v-9ea971b3${_scopeId}><div class="bg-white rounded-lg shadow-lg p-6" data-v-9ea971b3${_scopeId}><div class="flex items-center justify-between mb-6" data-v-9ea971b3${_scopeId}><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-9ea971b3${_scopeId}><span class="fa fa-dollar mr-4" data-v-9ea971b3${_scopeId}></span> Prestação de Contas </h2></div>`);
            if (__props.eventos && __props.eventos.length > 0) {
              _push2(`<div class="space-y-4" data-v-9ea971b3${_scopeId}><!--[-->`);
              ssrRenderList(__props.eventos, (evento) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" data-v-9ea971b3${_scopeId}><div class="flex justify-between items-start" data-v-9ea971b3${_scopeId}><div class="flex-1" data-v-9ea971b3${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-9ea971b3${_scopeId}>${ssrInterpolate(evento.nome)}</h3><div class="flex flex-wrap gap-4 text-sm text-gray-600" data-v-9ea971b3${_scopeId}><span class="flex items-center" data-v-9ea971b3${_scopeId}> 📅 ${ssrInterpolate(formatarData(evento.data))}</span><span class="flex items-center" data-v-9ea971b3${_scopeId}> 🕐 ${ssrInterpolate(evento.hora)}</span></div></div><div class="text-right" data-v-9ea971b3${_scopeId}><a${ssrRenderAttr("href", `/publico/evento/${evento.id}/pdf`)} target="_blank" class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm" data-v-9ea971b3${_scopeId}><i class="fa fa-file-pdf" data-v-9ea971b3${_scopeId}></i><span data-v-9ea971b3${_scopeId}>Baixar PDF</span></a></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 text-gray-500" data-v-9ea971b3${_scopeId}><p data-v-9ea971b3${_scopeId}>Nenhum evento próximo agendado no momento.</p></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("h2", { class: "text-2xl font-bold text-gray-800 flex items-center" }, [
                      createVNode("span", { class: "fa fa-dollar mr-4" }),
                      createTextVNode(" Prestação de Contas ")
                    ])
                  ]),
                  __props.eventos && __props.eventos.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.eventos, (evento) => {
                      return openBlock(), createBlock("div", {
                        key: evento.id,
                        class: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-800 mb-2" }, toDisplayString(evento.nome), 1),
                            createVNode("div", { class: "flex flex-wrap gap-4 text-sm text-gray-600" }, [
                              createVNode("span", { class: "flex items-center" }, " 📅 " + toDisplayString(formatarData(evento.data)), 1),
                              createVNode("span", { class: "flex items-center" }, " 🕐 " + toDisplayString(evento.hora), 1)
                            ])
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("a", {
                              href: `/publico/evento/${evento.id}/pdf`,
                              target: "_blank",
                              class: "bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
                            }, [
                              createVNode("i", { class: "fa fa-file-pdf" }),
                              createVNode("span", null, "Baixar PDF")
                            ], 8, ["href"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-8 text-gray-500"
                  }, [
                    createVNode("p", null, "Nenhum evento próximo agendado no momento.")
                  ]))
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Contas.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Contas = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ea971b3"]]);
export {
  Contas as default
};
