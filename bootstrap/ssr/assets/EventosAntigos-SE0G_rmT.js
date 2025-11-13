import { withCtx, createVNode, createBlock, createTextVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-DfoGx07Q.js";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EventosAntigos",
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
            _push2(`<div class="p-8" data-v-6fa1840c${_scopeId}><div class="bg-white rounded-lg shadow-lg p-6" data-v-6fa1840c${_scopeId}><div class="flex items-center justify-between mb-6" data-v-6fa1840c${_scopeId}><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-6fa1840c${_scopeId}><span class="fa fa-calendar-minus mr-4" data-v-6fa1840c${_scopeId}></span> Eventos Antigos </h2></div>`);
            if (__props.eventos && __props.eventos.length > 0) {
              _push2(`<div class="space-y-4" data-v-6fa1840c${_scopeId}><!--[-->`);
              ssrRenderList(__props.eventos, (evento) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" data-v-6fa1840c${_scopeId}><div class="flex justify-between items-start" data-v-6fa1840c${_scopeId}><div class="flex-1" data-v-6fa1840c${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-6fa1840c${_scopeId}>${ssrInterpolate(evento.nome)}</h3><div class="flex flex-wrap gap-4 text-sm text-gray-600" data-v-6fa1840c${_scopeId}><span class="flex items-center" data-v-6fa1840c${_scopeId}> 📅 ${ssrInterpolate(formatarData(evento.data))}</span><span class="flex items-center" data-v-6fa1840c${_scopeId}> 🕐 ${ssrInterpolate(evento.hora)}</span></div></div><div class="text-right" data-v-6fa1840c${_scopeId}><button class="btn btn-primary btn-sm ms-4" data-v-6fa1840c${_scopeId}>Ver Detalhes</button></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 text-gray-500" data-v-6fa1840c${_scopeId}><p data-v-6fa1840c${_scopeId}>Nenhum evento próximo agendado no momento.</p></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("h2", { class: "text-2xl font-bold text-gray-800 flex items-center" }, [
                      createVNode("span", { class: "fa fa-calendar-minus mr-4" }),
                      createTextVNode(" Eventos Antigos ")
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
                            createVNode("button", {
                              class: "btn btn-primary btn-sm ms-4",
                              onClick: ($event) => _ctx.$inertia.visit(`/publico/eventos/${evento.id}`)
                            }, "Ver Detalhes", 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/EventosAntigos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventosAntigos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6fa1840c"]]);
export {
  EventosAntigos as default
};
