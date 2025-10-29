import { withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-BUvw8bhm.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Eventos",
  __ssrInlineRender: true,
  props: {
    proximosEventos: {
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
    const diasAteEvento = (data) => {
      if (!data) return "";
      const hoje = /* @__PURE__ */ new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataEvento = /* @__PURE__ */ new Date(data + "T00:00:00");
      const diffTime = dataEvento - hoje;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) return "Hoje";
      if (diffDays === 1) return "Amanhã";
      if (diffDays < 0) return "Passou";
      return `${diffDays} dias`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white rounded-lg shadow-lg p-8 mb-8" data-v-25126450${_scopeId}><h1 class="text-4xl font-bold text-gray-800 mb-4" data-v-25126450${_scopeId}> Bem-vindo à Paróquia São Benedito </h1><p class="text-lg text-gray-600 mb-6" data-v-25126450${_scopeId}> Acompanhe nossos eventos, atas das reuniões e documentos oficiais. Promovemos a transparência em todas as atividades da nossa comunidade. </p><div class="flex flex-wrap gap-4" data-v-25126450${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/eventos",
              class: "btn-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ver Todos os Eventos `);
                } else {
                  return [
                    createTextVNode(" Ver Todos os Eventos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/sobre",
              class: "btn-secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sobre Nós `);
                } else {
                  return [
                    createTextVNode(" Sobre Nós ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white rounded-lg shadow-lg p-6" data-v-25126450${_scopeId}><div class="flex items-center justify-between mb-6" data-v-25126450${_scopeId}><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-25126450${_scopeId}><span class="mr-2" data-v-25126450${_scopeId}>📅</span> Próximos Eventos </h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/eventos",
              class: "text-blue-600 hover:text-blue-700 font-medium"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ver todos → `);
                } else {
                  return [
                    createTextVNode(" Ver todos → ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.proximosEventos && __props.proximosEventos.length > 0) {
              _push2(`<div class="space-y-4" data-v-25126450${_scopeId}><!--[-->`);
              ssrRenderList(__props.proximosEventos, (evento) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" data-v-25126450${_scopeId}><div class="flex justify-between items-start" data-v-25126450${_scopeId}><div class="flex-1" data-v-25126450${_scopeId}><h3 class="text-lg font-semibold text-gray-800 mb-2" data-v-25126450${_scopeId}>${ssrInterpolate(evento.nome)}</h3><div class="flex flex-wrap gap-4 text-sm text-gray-600" data-v-25126450${_scopeId}><span class="flex items-center" data-v-25126450${_scopeId}> 📅 ${ssrInterpolate(formatarData(evento.data))}</span><span class="flex items-center" data-v-25126450${_scopeId}> 🕐 ${ssrInterpolate(evento.hora)}</span></div></div><div class="text-right" data-v-25126450${_scopeId}><span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full" data-v-25126450${_scopeId}> Em ${ssrInterpolate(diasAteEvento(evento.data))}</span></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 text-gray-500" data-v-25126450${_scopeId}><p data-v-25126450${_scopeId}>Nenhum evento próximo agendado no momento.</p></div>`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" data-v-25126450${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/atas",
              class: "card-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" data-v-25126450${_scopeId2}><div class="text-4xl mb-4" data-v-25126450${_scopeId2}>📝</div><h3 class="text-xl font-semibold text-gray-800 mb-2" data-v-25126450${_scopeId2}>Atas</h3><p class="text-gray-600" data-v-25126450${_scopeId2}>Acesse as atas das reuniões e assembleias</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "📝"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Atas"),
                      createVNode("p", { class: "text-gray-600" }, "Acesse as atas das reuniões e assembleias")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/regimes-internos",
              class: "card-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" data-v-25126450${_scopeId2}><div class="text-4xl mb-4" data-v-25126450${_scopeId2}>📋</div><h3 class="text-xl font-semibold text-gray-800 mb-2" data-v-25126450${_scopeId2}>Regimes Internos</h3><p class="text-gray-600" data-v-25126450${_scopeId2}>Consulte nossos regimentos e normas</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "📋"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Regimes Internos"),
                      createVNode("p", { class: "text-gray-600" }, "Consulte nossos regimentos e normas")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/estatutos",
              class: "card-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" data-v-25126450${_scopeId2}><div class="text-4xl mb-4" data-v-25126450${_scopeId2}>⚖️</div><h3 class="text-xl font-semibold text-gray-800 mb-2" data-v-25126450${_scopeId2}>Estatutos</h3><p class="text-gray-600" data-v-25126450${_scopeId2}>Veja nossos estatutos oficiais</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "⚖️"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Estatutos"),
                      createVNode("p", { class: "text-gray-600" }, "Veja nossos estatutos oficiais")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-8 mb-8" }, [
                createVNode("h1", { class: "text-4xl font-bold text-gray-800 mb-4" }, " Bem-vindo à Paróquia São Benedito "),
                createVNode("p", { class: "text-lg text-gray-600 mb-6" }, " Acompanhe nossos eventos, atas das reuniões e documentos oficiais. Promovemos a transparência em todas as atividades da nossa comunidade. "),
                createVNode("div", { class: "flex flex-wrap gap-4" }, [
                  createVNode(unref(Link), {
                    href: "/publico/eventos",
                    class: "btn-primary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver Todos os Eventos ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(Link), {
                    href: "/publico/sobre",
                    class: "btn-secondary"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sobre Nós ")
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("h2", { class: "text-2xl font-bold text-gray-800 flex items-center" }, [
                    createVNode("span", { class: "mr-2" }, "📅"),
                    createTextVNode(" Próximos Eventos ")
                  ]),
                  createVNode(unref(Link), {
                    href: "/publico/eventos",
                    class: "text-blue-600 hover:text-blue-700 font-medium"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ver todos → ")
                    ]),
                    _: 1
                  })
                ]),
                __props.proximosEventos && __props.proximosEventos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.proximosEventos, (evento) => {
                    return openBlock(), createBlock("div", {
                      key: evento.id,
                      class: "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer",
                      onClick: ($event) => _ctx.$inertia.visit(`/publico/eventos/${evento.id}`)
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
                          createVNode("span", { class: "inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full" }, " Em " + toDisplayString(diasAteEvento(evento.data)), 1)
                        ])
                      ])
                    ], 8, ["onClick"]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-8 text-gray-500"
                }, [
                  createVNode("p", null, "Nenhum evento próximo agendado no momento.")
                ]))
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8" }, [
                createVNode(unref(Link), {
                  href: "/publico/atas",
                  class: "card-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "📝"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Atas"),
                      createVNode("p", { class: "text-gray-600" }, "Acesse as atas das reuniões e assembleias")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(Link), {
                  href: "/publico/regimes-internos",
                  class: "card-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "📋"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Regimes Internos"),
                      createVNode("p", { class: "text-gray-600" }, "Consulte nossos regimentos e normas")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(Link), {
                  href: "/publico/estatutos",
                  class: "card-link"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow" }, [
                      createVNode("div", { class: "text-4xl mb-4" }, "⚖️"),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-800 mb-2" }, "Estatutos"),
                      createVNode("p", { class: "text-gray-600" }, "Veja nossos estatutos oficiais")
                    ])
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Eventos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Eventos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25126450"]]);
export {
  Eventos as default
};
