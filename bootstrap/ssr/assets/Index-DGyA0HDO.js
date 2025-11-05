import { computed, withCtx, unref, createVNode, createBlock, createTextVNode, openBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { L as LayoutPublico } from "./LayoutPublico-D7hYXjdx.js";
import { Link, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    proximosEventos: {
      type: Array,
      default: () => []
    },
    comissao: {
      type: Object,
      default: null
    },
    avisos: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ehManha = (hora) => {
      if (!hora) return false;
      const horaNum = parseInt(hora.split(":")[0]);
      return horaNum >= 6 && horaNum < 18;
    };
    const eventoManha = computed(() => {
      return props.proximosEventos.find((evento) => ehManha(evento.hora));
    });
    const eventoNoite = computed(() => {
      return props.proximosEventos.find((evento) => !ehManha(evento.hora));
    });
    const outrosEventos = computed(() => {
      var _a, _b;
      const eventosExibidos = [(_a = eventoManha.value) == null ? void 0 : _a.id, (_b = eventoNoite.value) == null ? void 0 : _b.id].filter(Boolean);
      return props.proximosEventos.filter((evento) => !eventosExibidos.includes(evento.id)).slice(0, 4);
    });
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
    const diasAteEvento = (data) => {
      if (!data) return "";
      const hoje = /* @__PURE__ */ new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataEvento = /* @__PURE__ */ new Date(data + "T00:00:00");
      const diffTime = dataEvento - hoje;
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) return "Hoje";
      if (diffDays === 1) return "Amanhã";
      if (diffDays < 0) return "Realizado";
      if (diffDays <= 7) return `Em ${diffDays} dias`;
      return `Em ${diffDays} dias`;
    };
    const verEvento = (id) => {
      router.visit(`/publico/eventos/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative h-[500px] overflow-hidden" data-v-54f46b8b${_scopeId}><div class="absolute inset-0" data-v-54f46b8b${_scopeId}><img${ssrRenderAttr("src", `/images/1-grande.jpg`)} alt="Paróquia São Benedito" class="w-full h-full object-cover" data-v-54f46b8b${_scopeId}><div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" data-v-54f46b8b${_scopeId}></div></div><div class="relative z-10 container mx-auto px-4 h-full flex items-center" data-v-54f46b8b${_scopeId}><div class="text-gray-800 max-w-3xl" data-v-54f46b8b${_scopeId}><h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}> Bem-vindo! <span class="text-amber-400" data-v-54f46b8b${_scopeId}>Comissão de Festa de São Benedito</span></h1><p class="text-xl md:text-2xl text-white mb-8 leading-relaxed text-gray-700" data-v-54f46b8b${_scopeId}> Uma comunidade de fé, amor e transparência.<br data-v-54f46b8b${_scopeId}> Acompanhe nossos eventos, atividades. </p><div class="flex flex-wrap gap-3" data-v-54f46b8b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/eventos",
              class: "group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="flex items-center gap-2" data-v-54f46b8b${_scopeId2}><svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-54f46b8b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-54f46b8b${_scopeId2}></path></svg> Ver Eventos </span>`);
                } else {
                  return [
                    createVNode("span", { class: "flex items-center gap-2" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 text-gray-500 group-hover:text-gray-700",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        })
                      ])),
                      createTextVNode(" Ver Eventos ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/sobre",
              class: "group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="flex items-center gap-2" data-v-54f46b8b${_scopeId2}><svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-54f46b8b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-54f46b8b${_scopeId2}></path></svg> Sobre Nós </span>`);
                } else {
                  return [
                    createVNode("span", { class: "flex items-center gap-2" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 text-gray-500 group-hover:text-gray-700",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createTextVNode(" Sobre Nós ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-54f46b8b${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-54f46b8b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-54f46b8b${_scopeId}></path></svg></div></div>`);
            if (__props.avisos && __props.avisos.length > 0) {
              _push2(`<div class="mt-4" data-v-54f46b8b${_scopeId}><div class="text-center" data-v-54f46b8b${_scopeId}><div class="inline-block" data-v-54f46b8b${_scopeId}><h2 class="text-4xl font-bold text-gray-700 mb-3 relative" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}><span class="relative z-10" data-v-54f46b8b${_scopeId}> Avisos Importantes</span><div class="absolute bottom-0 left-0 w-full h-3 bg-red-200 opacity-50 -z-0" data-v-54f46b8b${_scopeId}></div></h2><p class="text-gray-500 italic" data-v-54f46b8b${_scopeId}>Fique por dentro das últimas notícias e comunicados</p></div></div><div class="container mx-auto px-4 py-6" data-v-54f46b8b${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-4 gap-6" data-v-54f46b8b${_scopeId}><div class="lg:col-span-3" data-v-54f46b8b${_scopeId}><div class="space-y-3" data-v-54f46b8b${_scopeId}><!--[-->`);
              ssrRenderList(__props.avisos, (aviso) => {
                _push2(`<div class="bg-amber-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow" data-v-54f46b8b${_scopeId}><div class="flex items-start justify-between gap-4" data-v-54f46b8b${_scopeId}><div class="flex-1 min-w-0" data-v-54f46b8b${_scopeId}><h3 class="font-bold text-gray-900 mb-1 text-lg" data-v-54f46b8b${_scopeId}>${ssrInterpolate(aviso.nome)}</h3><p class="text-gray-700 text-sm leading-relaxed" data-v-54f46b8b${_scopeId}>${ssrInterpolate(aviso.descricao)}</p></div></div></div>`);
              });
              _push2(`<!--]--></div></div><div class="lg:col-span-1" data-v-54f46b8b${_scopeId}><div class="sticky top-4" data-v-54f46b8b${_scopeId}><div class="overflow-hidden" data-v-54f46b8b${_scopeId}><img src="/images/jesus-2.png" alt="Jesus Cristo" class="border bg-white rounded-xl shadow-lg items-center w-60 h-auto object-cover" data-v-54f46b8b${_scopeId}></div></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="container mx-auto px-4 py-12" data-v-54f46b8b${_scopeId}><div class="text-center mb-12" data-v-54f46b8b${_scopeId}><div class="inline-block" data-v-54f46b8b${_scopeId}><h2 class="text-4xl font-bold text-gray-700 mb-3 relative" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}><span class="relative z-10" data-v-54f46b8b${_scopeId}>Próximos Eventos</span><div class="absolute bottom-0 left-0 w-full h-3 bg-amber-200 opacity-50 -z-0" data-v-54f46b8b${_scopeId}></div></h2><p class="text-gray-500 italic" data-v-54f46b8b${_scopeId}>Participe das celebrações e atividades da nossa equipe</p></div></div>`);
            if (__props.proximosEventos && __props.proximosEventos.length > 0) {
              _push2(`<div data-v-54f46b8b${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" data-v-54f46b8b${_scopeId}>`);
              if (eventoManha.value) {
                _push2(`<div class="bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-blue-200" data-v-54f46b8b${_scopeId}><div class="bg-gradient-to-r from-blue-400 to-sky-400 p-4 text-white" data-v-54f46b8b${_scopeId}><div class="flex items-center justify-between" data-v-54f46b8b${_scopeId}><div class="flex items-center space-x-2" data-v-54f46b8b${_scopeId}><span class="text-2xl" data-v-54f46b8b${_scopeId}>☀️</span><span class="font-bold text-lg" data-v-54f46b8b${_scopeId}>EVENTO DE DIA</span></div><span class="bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium" data-v-54f46b8b${_scopeId}>${ssrInterpolate(diasAteEvento(eventoManha.value.data))}</span></div></div><div class="relative h-48" data-v-54f46b8b${_scopeId}><img${ssrRenderAttr("src", getImagemEvento(eventoManha.value, 2))} alt="Evento da Manhã" class="w-full h-full object-cover" data-v-54f46b8b${_scopeId}><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/70 to-transparent p-4" data-v-54f46b8b${_scopeId}><div class="text-white" data-v-54f46b8b${_scopeId}><div class="text-3xl font-bold mb-1" data-v-54f46b8b${_scopeId}>${ssrInterpolate(getDia(eventoManha.value.data))}</div><div class="text-sm" data-v-54f46b8b${_scopeId}>${ssrInterpolate(getMesAno(eventoManha.value.data))}</div></div></div></div><div class="p-6" data-v-54f46b8b${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-4" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}>${ssrInterpolate(eventoManha.value.nome)}</h3><div class="space-y-2 mb-4" data-v-54f46b8b${_scopeId}><div class="flex items-center text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-blue-500 mr-3" data-v-54f46b8b${_scopeId}>📅</span><span data-v-54f46b8b${_scopeId}>${ssrInterpolate(formatarData(eventoManha.value.data))}</span></div><div class="flex items-center text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-blue-500 mr-3" data-v-54f46b8b${_scopeId}>🕐</span><span class="font-medium" data-v-54f46b8b${_scopeId}>${ssrInterpolate(eventoManha.value.hora)}</span></div></div><button class="w-full bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md" data-v-54f46b8b${_scopeId}> Ver Detalhes → </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (eventoNoite.value) {
                _push2(`<div class="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-indigo-200" data-v-54f46b8b${_scopeId}><div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white" data-v-54f46b8b${_scopeId}><div class="flex items-center justify-between" data-v-54f46b8b${_scopeId}><div class="flex items-center space-x-2" data-v-54f46b8b${_scopeId}><span class="text-2xl" data-v-54f46b8b${_scopeId}>🌙</span><span class="font-bold text-lg" data-v-54f46b8b${_scopeId}>EVENTO DE NOITE</span></div><span class="bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium" data-v-54f46b8b${_scopeId}>${ssrInterpolate(diasAteEvento(eventoNoite.value.data))}</span></div></div><div class="relative h-48" data-v-54f46b8b${_scopeId}><img${ssrRenderAttr("src", getImagemEvento(eventoNoite.value, 3))} alt="Evento da Noite" class="w-full h-full object-cover" data-v-54f46b8b${_scopeId}><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/70 to-transparent p-4" data-v-54f46b8b${_scopeId}><div class="text-white" data-v-54f46b8b${_scopeId}><div class="text-3xl font-bold mb-1" data-v-54f46b8b${_scopeId}>${ssrInterpolate(getDia(eventoNoite.value.data))}</div><div class="text-sm" data-v-54f46b8b${_scopeId}>${ssrInterpolate(getMesAno(eventoNoite.value.data))}</div></div></div></div><div class="p-6" data-v-54f46b8b${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-4" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}>${ssrInterpolate(eventoNoite.value.nome)}</h3><div class="space-y-2 mb-4" data-v-54f46b8b${_scopeId}><div class="flex items-center text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-indigo-500 mr-3" data-v-54f46b8b${_scopeId}>📅</span><span data-v-54f46b8b${_scopeId}>${ssrInterpolate(formatarData(eventoNoite.value.data))}</span></div><div class="flex items-center text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-indigo-500 mr-3" data-v-54f46b8b${_scopeId}>🕐</span><span class="font-medium" data-v-54f46b8b${_scopeId}>${ssrInterpolate(eventoNoite.value.hora)}</span></div></div><button class="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md" data-v-54f46b8b${_scopeId}> Ver Detalhes → </button></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (outrosEventos.value.length > 0) {
                _push2(`<div data-v-54f46b8b${_scopeId}><h3 class="text-2xl font-bold text-gray-700 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}><span class="mr-2" data-v-54f46b8b${_scopeId}>📌</span> Outros Eventos Próximos </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-54f46b8b${_scopeId}><!--[-->`);
                ssrRenderList(outrosEventos.value, (evento, index) => {
                  _push2(`<div class="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-gray-100 hover:border-amber-300" data-v-54f46b8b${_scopeId}><div class="relative h-32" data-v-54f46b8b${_scopeId}><img${ssrRenderAttr("src", getImagemEvento(evento, index + 4))} alt="Evento" class="w-full h-full object-cover" data-v-54f46b8b${_scopeId}><div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-white/30 to-transparent p-3" data-v-54f46b8b${_scopeId}><span class="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow" data-v-54f46b8b${_scopeId}>${ssrInterpolate(diasAteEvento(evento.data))}</span></div></div><div class="p-4" data-v-54f46b8b${_scopeId}><h4 class="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]" data-v-54f46b8b${_scopeId}>${ssrInterpolate(evento.nome)}</h4><div class="space-y-2 mb-4" data-v-54f46b8b${_scopeId}><div class="flex items-center text-sm text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-amber-500 mr-2" data-v-54f46b8b${_scopeId}>📅</span><span data-v-54f46b8b${_scopeId}>${ssrInterpolate(formatarDataCurta(evento.data))}</span></div><div class="flex items-center text-sm text-gray-600" data-v-54f46b8b${_scopeId}><span class="text-amber-500 mr-2" data-v-54f46b8b${_scopeId}>🕐</span><span data-v-54f46b8b${_scopeId}>${ssrInterpolate(evento.hora)}</span></div></div><button class="w-full bg-gray-50 hover:bg-amber-400 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm" data-v-54f46b8b${_scopeId}> Ver mais → </button></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-16" data-v-54f46b8b${_scopeId}><div class="text-6xl mb-4" data-v-54f46b8b${_scopeId}>📅</div><p class="text-xl text-gray-500" data-v-54f46b8b${_scopeId}>Nenhum evento próximo agendado no momento.</p></div>`);
            }
            _push2(`</div>`);
            if (__props.comissao) {
              _push2(`<div class="bg-white rounded-xl p-8 mb-8" data-v-54f46b8b${_scopeId}><div class="text-center mb-8" data-v-54f46b8b${_scopeId}><h2 class="text-3xl font-bold text-gray-700 mb-2" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}><span class="mr-2" data-v-54f46b8b${_scopeId}>👥</span> ${ssrInterpolate(__props.comissao.nome)}</h2><p class="text-lg text-gray-600" data-v-54f46b8b${_scopeId}>Ano ${ssrInterpolate(__props.comissao.ano)}</p></div>`);
              if (__props.comissao.integrantes && __props.comissao.integrantes.length > 0) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-54f46b8b${_scopeId}><!--[-->`);
                ssrRenderList(__props.comissao.integrantes, (integrante) => {
                  _push2(`<div class="bg-gradient-to-br rounded-lg p-6 border-l-4 border-amber-500 shadow hover:shadow-md transition-shadow" data-v-54f46b8b${_scopeId}><div class="flex items-center mb-3" data-v-54f46b8b${_scopeId}><div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl mr-4" data-v-54f46b8b${_scopeId}><i class="fa fa-user" data-v-54f46b8b${_scopeId}></i></div><div data-v-54f46b8b${_scopeId}><p class="font-bold text-gray-800 text-lg" data-v-54f46b8b${_scopeId}>${ssrInterpolate(integrante.pessoa.nome)}</p><p class="text-sm text-amber-600 font-medium" data-v-54f46b8b${_scopeId}>${ssrInterpolate(integrante.cargo.nome)}</p></div></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-8 text-gray-500" data-v-54f46b8b${_scopeId}><p data-v-54f46b8b${_scopeId}>Nenhum integrante cadastrado para esta comissão.</p></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="" data-v-54f46b8b${_scopeId}><div class="container mx-auto px-4" data-v-54f46b8b${_scopeId}><div class="text-center mb-10" data-v-54f46b8b${_scopeId}><h2 class="text-3xl font-bold text-gray-700" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId}> Transparência e Informação </h2></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-v-54f46b8b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/publico/atas",
              class: "group"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-300" data-v-54f46b8b${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-54f46b8b${_scopeId2}>📝</div><h3 class="text-2xl font-bold text-gray-700 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId2}> Atas</h3><p class="text-gray-500" data-v-54f46b8b${_scopeId2}>Acesse as atas das reuniões e assembleias</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-300" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📝"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-700 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, " Atas"),
                      createVNode("p", { class: "text-gray-500" }, "Acesse as atas das reuniões e assembleias")
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
                  _push3(`<div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-300" data-v-54f46b8b${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-54f46b8b${_scopeId2}>📋</div><h3 class="text-2xl font-bold text-gray-700 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId2}> Regimento Interno</h3><p class="text-gray-500" data-v-54f46b8b${_scopeId2}>Consulte nossos regimentos e normas institucionais</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-300" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📋"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-700 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, " Regimento Interno"),
                      createVNode("p", { class: "text-gray-500" }, "Consulte nossos regimentos e normas institucionais")
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
                  _push3(`<div class="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-green-300" data-v-54f46b8b${_scopeId2}><div class="text-6xl mb-4 group-hover:scale-110 transition-transform" data-v-54f46b8b${_scopeId2}>⚖️</div><h3 class="text-2xl font-bold text-gray-700 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-54f46b8b${_scopeId2}> Estatuto</h3><p class="text-gray-500" data-v-54f46b8b${_scopeId2}>Veja nosso estatuto e documentos oficiais</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-green-300" }, [
                      createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "⚖️"),
                      createVNode("h3", {
                        class: "text-2xl font-bold text-gray-700 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, " Estatuto"),
                      createVNode("p", { class: "text-gray-500" }, "Veja nosso estatuto e documentos oficiais")
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
                  createVNode("div", { class: "text-gray-800 max-w-3xl" }, [
                    createVNode("h1", {
                      class: "text-5xl md:text-6xl font-bold text-white mb-4",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createTextVNode(" Bem-vindo! "),
                      createVNode("span", { class: "text-amber-400" }, "Comissão de Festa de São Benedito")
                    ]),
                    createVNode("p", { class: "text-xl md:text-2xl text-white mb-8 leading-relaxed text-gray-700" }, [
                      createTextVNode(" Uma comunidade de fé, amor e transparência."),
                      createVNode("br"),
                      createTextVNode(" Acompanhe nossos eventos, atividades. ")
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-3" }, [
                      createVNode(unref(Link), {
                        href: "/publico/eventos",
                        class: "group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "flex items-center gap-2" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 text-gray-500 group-hover:text-gray-700",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              })
                            ])),
                            createTextVNode(" Ver Eventos ")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/publico/sobre",
                        class: "group bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium text-base shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-gray-300"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "flex items-center gap-2" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 text-gray-500 group-hover:text-gray-700",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ])),
                            createTextVNode(" Sobre Nós ")
                          ])
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
              __props.avisos && __props.avisos.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4"
              }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode("div", { class: "inline-block" }, [
                    createVNode("h2", {
                      class: "text-4xl font-bold text-gray-700 mb-3 relative",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createVNode("span", { class: "relative z-10" }, " Avisos Importantes"),
                      createVNode("div", { class: "absolute bottom-0 left-0 w-full h-3 bg-red-200 opacity-50 -z-0" })
                    ]),
                    createVNode("p", { class: "text-gray-500 italic" }, "Fique por dentro das últimas notícias e comunicados")
                  ])
                ]),
                createVNode("div", { class: "container mx-auto px-4 py-6" }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-4 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-3" }, [
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.avisos, (aviso) => {
                          return openBlock(), createBlock("div", {
                            key: aviso.id,
                            class: "bg-amber-50 border-l-4 border-amber-500 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                          }, [
                            createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("h3", { class: "font-bold text-gray-900 mb-1 text-lg" }, toDisplayString(aviso.nome), 1),
                                createVNode("p", { class: "text-gray-700 text-sm leading-relaxed" }, toDisplayString(aviso.descricao), 1)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-1" }, [
                      createVNode("div", { class: "sticky top-4" }, [
                        createVNode("div", { class: "overflow-hidden" }, [
                          createVNode("img", {
                            src: "/images/jesus-2.png",
                            alt: "Jesus Cristo",
                            class: "border bg-white rounded-xl shadow-lg items-center w-60 h-auto object-cover"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "container mx-auto px-4 py-12" }, [
                createVNode("div", { class: "text-center mb-12" }, [
                  createVNode("div", { class: "inline-block" }, [
                    createVNode("h2", {
                      class: "text-4xl font-bold text-gray-700 mb-3 relative",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createVNode("span", { class: "relative z-10" }, "Próximos Eventos"),
                      createVNode("div", { class: "absolute bottom-0 left-0 w-full h-3 bg-amber-200 opacity-50 -z-0" })
                    ]),
                    createVNode("p", { class: "text-gray-500 italic" }, "Participe das celebrações e atividades da nossa equipe")
                  ])
                ]),
                __props.proximosEventos && __props.proximosEventos.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" }, [
                    eventoManha.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-gradient-to-br from-blue-50 to-sky-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-blue-200",
                      onClick: ($event) => verEvento(eventoManha.value.id)
                    }, [
                      createVNode("div", { class: "bg-gradient-to-r from-blue-400 to-sky-400 p-4 text-white" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode("span", { class: "text-2xl" }, "☀️"),
                            createVNode("span", { class: "font-bold text-lg" }, "EVENTO DE DIA")
                          ]),
                          createVNode("span", { class: "bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium" }, toDisplayString(diasAteEvento(eventoManha.value.data)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "relative h-48" }, [
                        createVNode("img", {
                          src: getImagemEvento(eventoManha.value, 2),
                          alt: "Evento da Manhã",
                          class: "w-full h-full object-cover",
                          onError: (e) => imagemEventoErro(e, 2)
                        }, null, 40, ["src", "onError"]),
                        createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/70 to-transparent p-4" }, [
                          createVNode("div", { class: "text-white" }, [
                            createVNode("div", { class: "text-3xl font-bold mb-1" }, toDisplayString(getDia(eventoManha.value.data)), 1),
                            createVNode("div", { class: "text-sm" }, toDisplayString(getMesAno(eventoManha.value.data)), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", {
                          class: "text-2xl font-bold text-gray-800 mb-4",
                          style: { "font-family": "Georgia, serif" }
                        }, toDisplayString(eventoManha.value.nome), 1),
                        createVNode("div", { class: "space-y-2 mb-4" }, [
                          createVNode("div", { class: "flex items-center text-gray-600" }, [
                            createVNode("span", { class: "text-blue-500 mr-3" }, "📅"),
                            createVNode("span", null, toDisplayString(formatarData(eventoManha.value.data)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center text-gray-600" }, [
                            createVNode("span", { class: "text-blue-500 mr-3" }, "🕐"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(eventoManha.value.hora), 1)
                          ])
                        ]),
                        createVNode("button", { class: "w-full bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md" }, " Ver Detalhes → ")
                      ])
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    eventoNoite.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-[1.02] cursor-pointer border-2 border-indigo-200",
                      onClick: ($event) => verEvento(eventoNoite.value.id)
                    }, [
                      createVNode("div", { class: "bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode("span", { class: "text-2xl" }, "🌙"),
                            createVNode("span", { class: "font-bold text-lg" }, "EVENTO DE NOITE")
                          ]),
                          createVNode("span", { class: "bg-white/30 backdrop-blur px-3 py-1 rounded-full text-sm font-medium" }, toDisplayString(diasAteEvento(eventoNoite.value.data)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "relative h-48" }, [
                        createVNode("img", {
                          src: getImagemEvento(eventoNoite.value, 3),
                          alt: "Evento da Noite",
                          class: "w-full h-full object-cover",
                          onError: (e) => imagemEventoErro(e, 3)
                        }, null, 40, ["src", "onError"]),
                        createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/70 to-transparent p-4" }, [
                          createVNode("div", { class: "text-white" }, [
                            createVNode("div", { class: "text-3xl font-bold mb-1" }, toDisplayString(getDia(eventoNoite.value.data)), 1),
                            createVNode("div", { class: "text-sm" }, toDisplayString(getMesAno(eventoNoite.value.data)), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", {
                          class: "text-2xl font-bold text-gray-800 mb-4",
                          style: { "font-family": "Georgia, serif" }
                        }, toDisplayString(eventoNoite.value.nome), 1),
                        createVNode("div", { class: "space-y-2 mb-4" }, [
                          createVNode("div", { class: "flex items-center text-gray-600" }, [
                            createVNode("span", { class: "text-indigo-500 mr-3" }, "📅"),
                            createVNode("span", null, toDisplayString(formatarData(eventoNoite.value.data)), 1)
                          ]),
                          createVNode("div", { class: "flex items-center text-gray-600" }, [
                            createVNode("span", { class: "text-indigo-500 mr-3" }, "🕐"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(eventoNoite.value.hora), 1)
                          ])
                        ]),
                        createVNode("button", { class: "w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md" }, " Ver Detalhes → ")
                      ])
                    ], 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  outrosEventos.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("h3", {
                      class: "text-2xl font-bold text-gray-700 mb-6 flex items-center",
                      style: { "font-family": "Georgia, serif" }
                    }, [
                      createVNode("span", { class: "mr-2" }, "📌"),
                      createTextVNode(" Outros Eventos Próximos ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(outrosEventos.value, (evento, index) => {
                        return openBlock(), createBlock("div", {
                          key: evento.id,
                          class: "bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-gray-100 hover:border-amber-300",
                          onClick: ($event) => verEvento(evento.id)
                        }, [
                          createVNode("div", { class: "relative h-32" }, [
                            createVNode("img", {
                              src: getImagemEvento(evento, index + 4),
                              alt: "Evento",
                              class: "w-full h-full object-cover",
                              onError: (e) => imagemEventoErro(e, index + 4)
                            }, null, 40, ["src", "onError"]),
                            createVNode("div", { class: "absolute top-0 left-0 right-0 bg-gradient-to-b from-white/30 to-transparent p-3" }, [
                              createVNode("span", { class: "bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow" }, toDisplayString(diasAteEvento(evento.data)), 1)
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
                            createVNode("button", { class: "w-full bg-gray-50 hover:bg-amber-400 hover:text-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm" }, " Ver mais → ")
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
                  createVNode("p", { class: "text-xl text-gray-500" }, "Nenhum evento próximo agendado no momento.")
                ]))
              ]),
              __props.comissao ? (openBlock(), createBlock("div", {
                key: 1,
                class: "bg-white rounded-xl p-8 mb-8"
              }, [
                createVNode("div", { class: "text-center mb-8" }, [
                  createVNode("h2", {
                    class: "text-3xl font-bold text-gray-700 mb-2",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "mr-2" }, "👥"),
                    createTextVNode(" " + toDisplayString(__props.comissao.nome), 1)
                  ]),
                  createVNode("p", { class: "text-lg text-gray-600" }, "Ano " + toDisplayString(__props.comissao.ano), 1)
                ]),
                __props.comissao.integrantes && __props.comissao.integrantes.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.comissao.integrantes, (integrante) => {
                    return openBlock(), createBlock("div", {
                      key: integrante.id,
                      class: "bg-gradient-to-br rounded-lg p-6 border-l-4 border-amber-500 shadow hover:shadow-md transition-shadow"
                    }, [
                      createVNode("div", { class: "flex items-center mb-3" }, [
                        createVNode("div", { class: "w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl mr-4" }, [
                          createVNode("i", { class: "fa fa-user" })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-gray-800 text-lg" }, toDisplayString(integrante.pessoa.nome), 1),
                          createVNode("p", { class: "text-sm text-amber-600 font-medium" }, toDisplayString(integrante.cargo.nome), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center py-8 text-gray-500"
                }, [
                  createVNode("p", null, "Nenhum integrante cadastrado para esta comissão.")
                ]))
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "" }, [
                createVNode("div", { class: "container mx-auto px-4" }, [
                  createVNode("div", { class: "text-center mb-10" }, [
                    createVNode("h2", {
                      class: "text-3xl font-bold text-gray-700",
                      style: { "font-family": "Georgia, serif" }
                    }, " Transparência e Informação ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" }, [
                    createVNode(unref(Link), {
                      href: "/publico/atas",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-300" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📝"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-700 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, " Atas"),
                          createVNode("p", { class: "text-gray-500" }, "Acesse as atas das reuniões e assembleias")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/publico/regimes-internos",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-amber-300" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "📋"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-700 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, " Regimento Interno"),
                          createVNode("p", { class: "text-gray-500" }, "Consulte nossos regimentos e normas institucionais")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/publico/estatutos",
                      class: "group"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border-t-4 border-green-300" }, [
                          createVNode("div", { class: "text-6xl mb-4 group-hover:scale-110 transition-transform" }, "⚖️"),
                          createVNode("h3", {
                            class: "text-2xl font-bold text-gray-700 mb-3",
                            style: { "font-family": "Georgia, serif" }
                          }, " Estatuto"),
                          createVNode("p", { class: "text-gray-500" }, "Veja nosso estatuto e documentos oficiais")
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-54f46b8b"]]);
export {
  Index as default
};
