import { withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-BUvw8bhm.js";
import { Link, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    proximosEventos: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const getImagemEvento = (evento, numero) => {
      return `/images/${numero}-grande.jpg`;
    };
    const imagemErro = (e) => {
      e.target.src = "/images/1-grande.jpg";
    };
    const imagemEventoErro = (e, numero) => {
      e.target.src = `/images/${numero % 10 || 1}.jpg`;
    };
    const formatarData = (data) => {
      if (!data) return "";
      const date = /* @__PURE__ */ new Date(data + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long"
      });
    };
    const formatarDataCurta = (data) => {
      if (!data) return "";
      const date = /* @__PURE__ */ new Date(data + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short"
      });
    };
    const getDia = (data) => {
      if (!data) return "";
      const date = /* @__PURE__ */ new Date(data + "T00:00:00");
      return date.getDate();
    };
    const getMesAno = (data) => {
      if (!data) return "";
      const date = /* @__PURE__ */ new Date(data + "T00:00:00");
      return date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
      });
    };
    const formatarValor = (valor) => {
      return parseFloat(valor || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };
    const diasAteEvento = (data) => {
      if (!data) return "";
      const hoje = /* @__PURE__ */ new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataEvento = /* @__PURE__ */ new Date(data + "T00:00:00");
      const diffTime = dataEvento - hoje;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) return "🔴 Hoje";
      if (diffDays === 1) return "⭐ Amanhã";
      if (diffDays < 0) return "✅ Realizado";
      if (diffDays <= 7) return `🔥 Em ${diffDays} dias`;
      return `📅 Em ${diffDays} dias`;
    };
    const verEvento = (id) => {
      router.visit(`/publico/eventos/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-[500px] overflow-hidden" data-v-eadccf3f${_scopeId}><div class="absolute inset-0" data-v-eadccf3f${_scopeId}><img${ssrRenderAttr("src", `/images/1-grande.jpg`)} alt="Paróquia São Benedito" class="w-full h-full object-cover" data-v-eadccf3f${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" data-v-eadccf3f${_scopeId}></div></div><div class="relative z-10 container mx-auto px-4 h-full flex items-center" data-v-eadccf3f${_scopeId}><div class="text-white max-w-3xl" data-v-eadccf3f${_scopeId}><h1 class="text-5xl md:text-6xl font-bold mb-4" style="${ssrRenderStyle({ "text-shadow": "3px 3px 6px rgba(0,0,0,0.8)", "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId}> Bem-vindo à <span class="text-amber-300" data-v-eadccf3f${_scopeId}>Paróquia São Benedito</span></h1><p class="text-xl md:text-2xl mb-8 leading-relaxed" style="${ssrRenderStyle({ "text-shadow": "2px 2px 4px rgba(0,0,0,0.8)" })}" data-v-eadccf3f${_scopeId}> Uma comunidade de fé, amor e transparência.<br data-v-eadccf3f${_scopeId}> Acompanhe nossos eventos, atividades e a vida paroquial. </p><div class="flex flex-wrap gap-4" data-v-eadccf3f${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/eventos",
              class: "bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transform transition hover:scale-105"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 📅 Ver Eventos `);
                } else {
                  return [
                    createTextVNode(" 📅 Ver Eventos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/sobre",
              class: "bg-white/20 backdrop-blur hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl border-2 border-white/50 transform transition hover:scale-105"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ℹ️ Sobre Nós `);
                } else {
                  return [
                    createTextVNode(" ℹ️ Sobre Nós ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-eadccf3f${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eadccf3f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-eadccf3f${_scopeId}></path></svg></div></div><div class="container mx-auto px-4 py-12" data-v-eadccf3f${_scopeId}><div class="text-center mb-12" data-v-eadccf3f${_scopeId}><div class="inline-block" data-v-eadccf3f${_scopeId}><h2 class="text-4xl font-bold text-gray-800 mb-3 relative" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId}><span class="relative z-10" data-v-eadccf3f${_scopeId}>Próximos Eventos</span><div class="absolute bottom-0 left-0 w-full h-3 bg-amber-300 opacity-30 -z-0" data-v-eadccf3f${_scopeId}></div></h2><p class="text-gray-600 italic" data-v-eadccf3f${_scopeId}>Participe das celebrações e atividades da nossa comunidade</p></div></div>`);
            if (__props.proximosEventos && __props.proximosEventos.length > 0) {
              _push2(`<div data-v-eadccf3f${_scopeId}>`);
              if (__props.proximosEventos[0]) {
                _push2(`<div class="mb-8" data-v-eadccf3f${_scopeId}><div class="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-4 border-amber-400" data-v-eadccf3f${_scopeId}><div class="grid md:grid-cols-2" data-v-eadccf3f${_scopeId}><div class="relative h-80 md:h-auto" data-v-eadccf3f${_scopeId}><img${ssrRenderAttr("src", getImagemEvento(__props.proximosEventos[0], 2))} alt="Evento em destaque" class="w-full h-full object-cover" data-v-eadccf3f${_scopeId}><div class="absolute top-4 left-4" data-v-eadccf3f${_scopeId}><span class="bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg" data-v-eadccf3f${_scopeId}> 🌟 DESTAQUE </span></div><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6" data-v-eadccf3f${_scopeId}><div class="text-white" data-v-eadccf3f${_scopeId}><div class="text-5xl font-bold mb-1" data-v-eadccf3f${_scopeId}>${ssrInterpolate(getDia(__props.proximosEventos[0].data))}</div><div class="text-xl" data-v-eadccf3f${_scopeId}>${ssrInterpolate(getMesAno(__props.proximosEventos[0].data))}</div></div></div></div><div class="p-8" data-v-eadccf3f${_scopeId}><div class="mb-4" data-v-eadccf3f${_scopeId}><span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2" data-v-eadccf3f${_scopeId}>${ssrInterpolate(diasAteEvento(__props.proximosEventos[0].data))}</span></div><h3 class="text-3xl font-bold text-gray-800 mb-4" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId}>${ssrInterpolate(__props.proximosEventos[0].nome)}</h3><div class="space-y-3 mb-6" data-v-eadccf3f${_scopeId}><div class="flex items-center text-gray-600" data-v-eadccf3f${_scopeId}><span class="text-amber-500 mr-3 text-xl" data-v-eadccf3f${_scopeId}>📅</span><span class="text-lg" data-v-eadccf3f${_scopeId}>${ssrInterpolate(formatarData(__props.proximosEventos[0].data))}</span></div><div class="flex items-center text-gray-600" data-v-eadccf3f${_scopeId}><span class="text-amber-500 mr-3 text-xl" data-v-eadccf3f${_scopeId}>🕐</span><span class="text-lg" data-v-eadccf3f${_scopeId}>${ssrInterpolate(__props.proximosEventos[0].hora)}</span></div></div><div class="grid grid-cols-2 gap-4 mb-6" data-v-eadccf3f${_scopeId}><div class="bg-green-50 border-l-4 border-green-500 p-4 rounded" data-v-eadccf3f${_scopeId}><p class="text-xs text-green-700 font-medium mb-1" data-v-eadccf3f${_scopeId}>Arrecadado</p><p class="text-2xl font-bold text-green-900" data-v-eadccf3f${_scopeId}> R$ ${ssrInterpolate(formatarValor(__props.proximosEventos[0].valor_arrecadado || 0))}</p></div><div class="bg-red-50 border-l-4 border-red-500 p-4 rounded" data-v-eadccf3f${_scopeId}><p class="text-xs text-red-700 font-medium mb-1" data-v-eadccf3f${_scopeId}>Gasto</p><p class="text-2xl font-bold text-red-900" data-v-eadccf3f${_scopeId}> R$ ${ssrInterpolate(formatarValor(__props.proximosEventos[0].valor_gasto || 0))}</p></div></div><button class="w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg" data-v-eadccf3f${_scopeId}> Ver Detalhes → </button></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.proximosEventos.length > 1) {
                _push2(`<div data-v-eadccf3f${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId}><span class="mr-2" data-v-eadccf3f${_scopeId}>📌</span> Outros Eventos Próximos </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-eadccf3f${_scopeId}><!--[-->`);
                ssrRenderList(__props.proximosEventos.slice(1, 5), (evento, index) => {
                  _push2(`<div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-gray-100 hover:border-amber-400" data-v-eadccf3f${_scopeId}><div class="relative h-20" data-v-eadccf3f${_scopeId}><img${ssrRenderAttr("src", getImagemEvento(evento, index + 3))} alt="Evento" class="w-full h-full object-cover" data-v-eadccf3f${_scopeId}><div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-3" data-v-eadccf3f${_scopeId}><span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium" data-v-eadccf3f${_scopeId}>${ssrInterpolate(diasAteEvento(evento.data))}</span></div></div><div class="p-4" data-v-eadccf3f${_scopeId}><h4 class="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]" data-v-eadccf3f${_scopeId}>${ssrInterpolate(evento.nome)}</h4><div class="space-y-2 mb-4" data-v-eadccf3f${_scopeId}><div class="flex items-center text-sm text-gray-600" data-v-eadccf3f${_scopeId}><span class="text-amber-500 mr-2" data-v-eadccf3f${_scopeId}>📅</span><span data-v-eadccf3f${_scopeId}>${ssrInterpolate(formatarDataCurta(evento.data))}</span></div><div class="flex items-center text-sm text-gray-600" data-v-eadccf3f${_scopeId}><span class="text-amber-500 mr-2" data-v-eadccf3f${_scopeId}>🕐</span><span data-v-eadccf3f${_scopeId}>${ssrInterpolate(evento.hora)}</span></div></div><button class="w-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all" data-v-eadccf3f${_scopeId}> Ver mais → </button></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-16" data-v-eadccf3f${_scopeId}><div class="text-6xl mb-4" data-v-eadccf3f${_scopeId}>📅</div><p class="text-xl text-gray-600" data-v-eadccf3f${_scopeId}>Nenhum evento próximo agendado no momento.</p></div>`);
            }
            _push2(`</div><div class="bg-gradient-to-b from-gray-50 to-white py-12" data-v-eadccf3f${_scopeId}><div class="container mx-auto px-4" data-v-eadccf3f${_scopeId}><div class="text-center mb-10" data-v-eadccf3f${_scopeId}><h2 class="text-3xl font-bold text-gray-800" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId}> Transparência e Informação </h2></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-eadccf3f${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/atas",
              class: "group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-500" data-v-eadccf3f${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-eadccf3f${_scopeId2}>📝</div><h3 class="text-2xl font-bold text-gray-800 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId2}>Atas</h3><p class="text-gray-600" data-v-eadccf3f${_scopeId2}>Acesse as atas das reuniões e assembleias da paróquia</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-500" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📝"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-800 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, "Atas"),
                      createVNode("p", { class: "text-gray-600" }, "Acesse as atas das reuniões e assembleias da paróquia")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/regimes-internos",
              class: "group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-500" data-v-eadccf3f${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-eadccf3f${_scopeId2}>📋</div><h3 class="text-2xl font-bold text-gray-800 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId2}>Regimes Internos</h3><p class="text-gray-600" data-v-eadccf3f${_scopeId2}>Consulte nossos regimentos e normas institucionais</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-500" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📋"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-800 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, "Regimes Internos"),
                      createVNode("p", { class: "text-gray-600" }, "Consulte nossos regimentos e normas institucionais")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/estatutos",
              class: "group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-500" data-v-eadccf3f${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-eadccf3f${_scopeId2}>⚖️</div><h3 class="text-2xl font-bold text-gray-800 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-eadccf3f${_scopeId2}>Estatutos</h3><p class="text-gray-600" data-v-eadccf3f${_scopeId2}>Veja nossos estatutos e documentos oficiais</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-500" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "⚖️"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-800 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, "Estatutos"),
                      createVNode("p", { class: "text-gray-600" }, "Veja nossos estatutos e documentos oficiais")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative h-[500px] overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0" }, [
                  createVNode("img", {
                    src: `/images/1-grande.jpg`,
                    alt: "Paróquia São Benedito",
                    class: "w-full h-full object-cover",
                    onError: imagemErro
                  }, null, 32),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" })
                ]),
                createVNode("div", { class: "relative z-10 container mx-auto px-4 h-full flex items-center" }, [
                  createVNode("div", { class: "text-white max-w-3xl" }, [
                    createVNode("h1", {
                      class: "text-5xl md:text-6xl font-bold mb-4",
                      style: { "text-shadow": "3px 3px 6px rgba(0,0,0,0.8)", "font-family": "Georgia, serif" }
                    }, [
                      createTextVNode(" Bem-vindo à "),
                      createVNode("span", { class: "text-amber-300" }, "Paróquia São Benedito")
                    ]),
                    createVNode("p", {
                      class: "text-xl md:text-2xl mb-8 leading-relaxed",
                      style: { "text-shadow": "2px 2px 4px rgba(0,0,0,0.8)" }
                    }, [
                      createTextVNode(" Uma comunidade de fé, amor e transparência."),
                      createVNode("br"),
                      createTextVNode(" Acompanhe nossos eventos, atividades e a vida paroquial. ")
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-4" }, [
                      createVNode(unref(Link), {
                        href: "/publico/eventos",
                        class: "bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transform transition hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 📅 Ver Eventos ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/publico/sobre",
                        class: "bg-white/20 backdrop-blur hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl border-2 border-white/50 transform transition hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" ℹ️ Sobre Nós ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-8 h-8 text-white",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                    })
                  ]))
                ])
              ]),
              createVNode("div", { class: "container mx-auto px-4 py-12" }, [
                createVNode("div", { class: "text-center mb-12" }, [
                  createVNode("div", { class: "inline-block" }, [
                    createVNode("h2", {
                      class: "text-4xl font-bold text-gray-800 mb-3 relative",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createVNode("span", { class: "relative z-10" }, "Próximos Eventos"),
                      createVNode("div", { class: "absolute bottom-0 left-0 w-full h-3 bg-amber-300 opacity-30 -z-0" })
                    ]),
                    createVNode("p", { class: "text-gray-600 italic" }, "Participe das celebrações e atividades da nossa comunidade")
                  ])
                ]),
                __props.proximosEventos && __props.proximosEventos.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  __props.proximosEventos[0] ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-8"
                  }, [
                    createVNode("div", {
                      class: "bg-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-4 border-amber-400",
                      onClick: ($event) => verEvento(__props.proximosEventos[0].id)
                    }, [
                      createVNode("div", { class: "grid md:grid-cols-2" }, [
                        createVNode("div", { class: "relative h-80 md:h-auto" }, [
                          createVNode("img", {
                            src: getImagemEvento(__props.proximosEventos[0], 2),
                            alt: "Evento em destaque",
                            class: "w-full h-full object-cover",
                            onError: (e) => imagemEventoErro(e, 2)
                          }, null, 40, ["src", "onError"]),
                          createVNode("div", { class: "absolute top-4 left-4" }, [
                            createVNode("span", { class: "bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg" }, " 🌟 DESTAQUE ")
                          ]),
                          createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6" }, [
                            createVNode("div", { class: "text-white" }, [
                              createVNode("div", { class: "text-5xl font-bold mb-1" }, toDisplayString(getDia(__props.proximosEventos[0].data)), 1),
                              createVNode("div", { class: "text-xl" }, toDisplayString(getMesAno(__props.proximosEventos[0].data)), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "p-8" }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("span", { class: "inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2" }, toDisplayString(diasAteEvento(__props.proximosEventos[0].data)), 1)
                          ]),
                          createVNode("h3", {
                            class: "text-3xl font-bold text-gray-800 mb-4",
                            style: { "font-family": "Georgia, serif" }
                          }, toDisplayString(__props.proximosEventos[0].nome), 1),
                          createVNode("div", { class: "space-y-3 mb-6" }, [
                            createVNode("div", { class: "flex items-center text-gray-600" }, [
                              createVNode("span", { class: "text-amber-500 mr-3 text-xl" }, "📅"),
                              createVNode("span", { class: "text-lg" }, toDisplayString(formatarData(__props.proximosEventos[0].data)), 1)
                            ]),
                            createVNode("div", { class: "flex items-center text-gray-600" }, [
                              createVNode("span", { class: "text-amber-500 mr-3 text-xl" }, "🕐"),
                              createVNode("span", { class: "text-lg" }, toDisplayString(__props.proximosEventos[0].hora), 1)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4 mb-6" }, [
                            createVNode("div", { class: "bg-green-50 border-l-4 border-green-500 p-4 rounded" }, [
                              createVNode("p", { class: "text-xs text-green-700 font-medium mb-1" }, "Arrecadado"),
                              createVNode("p", { class: "text-2xl font-bold text-green-900" }, " R$ " + toDisplayString(formatarValor(__props.proximosEventos[0].valor_arrecadado || 0)), 1)
                            ]),
                            createVNode("div", { class: "bg-red-50 border-l-4 border-red-500 p-4 rounded" }, [
                              createVNode("p", { class: "text-xs text-red-700 font-medium mb-1" }, "Gasto"),
                              createVNode("p", { class: "text-2xl font-bold text-red-900" }, " R$ " + toDisplayString(formatarValor(__props.proximosEventos[0].valor_gasto || 0)), 1)
                            ])
                          ]),
                          createVNode("button", { class: "w-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg" }, " Ver Detalhes → ")
                        ])
                      ])
                    ], 8, ["onClick"])
                  ])) : createCommentVNode("", true),
                  __props.proximosEventos.length > 1 ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("h3", {
                      class: "text-2xl font-bold text-gray-800 mb-6 flex items-center",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createVNode("span", { class: "mr-2" }, "📌"),
                      createTextVNode(" Outros Eventos Próximos ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.proximosEventos.slice(1, 5), (evento, index) => {
                        return openBlock(), createBlock("div", {
                          key: evento.id,
                          class: "bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-gray-100 hover:border-amber-400",
                          onClick: ($event) => verEvento(evento.id)
                        }, [
                          createVNode("div", { class: "relative h-20" }, [
                            createVNode("img", {
                              src: getImagemEvento(evento, index + 3),
                              alt: "Evento",
                              class: "w-full h-full object-cover",
                              onError: (e) => imagemEventoErro(e, index + 3)
                            }, null, 40, ["src", "onError"]),
                            createVNode("div", { class: "absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-3" }, [
                              createVNode("span", { class: "bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium" }, toDisplayString(diasAteEvento(evento.data)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h4", { class: "font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]" }, toDisplayString(evento.nome), 1),
                            createVNode("div", { class: "space-y-2 mb-4" }, [
                              createVNode("div", { class: "flex items-center text-sm text-gray-600" }, [
                                createVNode("span", { class: "text-amber-500 mr-2" }, "📅"),
                                createVNode("span", null, toDisplayString(formatarDataCurta(evento.data)), 1)
                              ]),
                              createVNode("div", { class: "flex items-center text-sm text-gray-600" }, [
                                createVNode("span", { class: "text-amber-500 mr-2" }, "🕐"),
                                createVNode("span", null, toDisplayString(evento.hora), 1)
                              ])
                            ]),
                            createVNode("button", { class: "w-full bg-gray-100 hover:bg-amber-500 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all" }, " Ver mais → ")
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-16"
                }, [
                  createVNode("div", { class: "text-6xl mb-4" }, "📅"),
                  createVNode("p", { class: "text-xl text-gray-600" }, "Nenhum evento próximo agendado no momento.")
                ]))
              ]),
              createVNode("div", { class: "bg-gradient-to-b from-gray-50 to-white py-12" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "text-center mb-10" }, [
                    createVNode("h2", {
                      class: "text-3xl font-bold text-gray-800",
                      style: { "font-family": "Georgia, serif" }
                    }, " Transparência e Informação ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode(unref(Link), {
                      href: "/publico/atas",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-500" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📝"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-800 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, "Atas"),
                          createVNode("p", { class: "text-gray-600" }, "Acesse as atas das reuniões e assembleias da paróquia")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/publico/regimes-internos",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-500" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📋"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-800 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, "Regimes Internos"),
                          createVNode("p", { class: "text-gray-600" }, "Consulte nossos regimentos e normas institucionais")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/publico/estatutos",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-500" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "⚖️"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-800 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, "Estatutos"),
                          createVNode("p", { class: "text-gray-600" }, "Veja nossos estatutos e documentos oficiais")
                        ])
                      ]),
                      _: 1
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eadccf3f"]]);
export {
  Index as default
};
