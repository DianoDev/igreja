import { onMounted, ref, computed, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, createTextVNode, Teleport, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrRenderTeleport } from "vue/server-renderer";
import "@inertiajs/vue3";
import { L as LayoutPublico } from "./LayoutPublico-DfoGx07Q.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EventoDetalhes",
  __ssrInlineRender: true,
  props: {
    evento: {
      type: Object,
      required: true
    },
    arquivos: {
      type: Array,
      default: () => []
    },
    comissao: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    onMounted(() => {
      console.log(props.evento, "vento");
    });
    const modalAberto = ref(false);
    const fotoSelecionada = ref(null);
    const indiceAtual = ref(0);
    const saldo = computed(() => {
      const arrecadado = parseFloat(props.evento.valor_arrecadado || 0);
      const gasto = parseFloat(props.evento.valor_gasto || 0);
      return arrecadado - gasto;
    });
    const saldoCorBorda = computed(() => {
      if (saldo.value > 0) return "border-blue-400";
      if (saldo.value < 0) return "border-yellow-400";
      return "border-gray-300";
    });
    const saldoCorTexto = computed(() => {
      if (saldo.value > 0) return "text-blue-600";
      if (saldo.value < 0) return "text-yellow-600";
      return "text-gray-600";
    });
    const saldoCorIcone = computed(() => {
      if (saldo.value > 0) return "text-blue-500";
      if (saldo.value < 0) return "text-yellow-500";
      return "text-gray-400";
    });
    const totalDoacoes = computed(() => {
      if (!props.evento.doacoes) return 0;
      return props.evento.doacoes.reduce((total, doacao) => {
        return total + parseFloat(doacao.valor || 0);
      }, 0);
    });
    function calcularValorSemResponsavel(cardapio) {
      if (!cardapio.ingredientes) return 0;
      return cardapio.ingredientes.reduce((total, ingrediente) => {
        if (!ingrediente.pessoa) {
          return total + parseFloat(ingrediente.valor_total || 0);
        }
        return total;
      }, 0);
    }
    function formatarData(data) {
      if (!data) return "-";
      try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
      } catch (e) {
        return data;
      }
    }
    function formatarMoeda(valor) {
      if (!valor && valor !== 0) return "R$ 0,00";
      const numero = parseFloat(valor);
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(numero);
    }
    function getFotoUrl(foto) {
      if (!foto || !foto.hash) return "";
      const hash = foto.hash.replace("public/", "");
      return `/storage/${hash}`;
    }
    function abrirModal(foto) {
      fotoSelecionada.value = foto;
      indiceAtual.value = props.evento.fotos.findIndex((f) => f.id === foto.id);
      modalAberto.value = true;
      document.body.style.overflow = "hidden";
    }
    function fecharModal() {
      modalAberto.value = false;
      fotoSelecionada.value = null;
      document.body.style.overflow = "";
    }
    function proximaFoto() {
      if (indiceAtual.value < props.evento.fotos.length - 1) {
        indiceAtual.value++;
        fotoSelecionada.value = props.evento.fotos[indiceAtual.value];
      }
    }
    function fotoAnterior() {
      if (indiceAtual.value > 0) {
        indiceAtual.value--;
        fotoSelecionada.value = props.evento.fotos[indiceAtual.value];
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => {
        if (modalAberto.value) {
          if (e.key === "Escape") fecharModal();
          if (e.key === "ArrowRight") proximaFoto();
          if (e.key === "ArrowLeft") fotoAnterior();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPublico, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container mx-auto px-4 py-8 max-w-7xl" data-v-32707b48${_scopeId}><div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8" data-v-32707b48${_scopeId}><div class="bg-gradient-to-r from-amber-500 to-amber-600 h-2" data-v-32707b48${_scopeId}></div><div class="p-6 md:p-10" data-v-32707b48${_scopeId}><div class="flex flex-col md:flex-row justify-between items-start gap-6" data-v-32707b48${_scopeId}><div class="flex-1" data-v-32707b48${_scopeId}><h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}>${ssrInterpolate(__props.evento.nome)}</h1><div class="flex flex-wrap gap-4" data-v-32707b48${_scopeId}><div class="flex items-center gap-2 text-gray-700" data-v-32707b48${_scopeId}><div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-calendar text-amber-600" data-v-32707b48${_scopeId}></i></div><div data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Data</p><p class="font-semibold" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarData(__props.evento.data))}</p></div></div><div class="flex items-center gap-2 text-gray-700" data-v-32707b48${_scopeId}><div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-clock text-amber-600" data-v-32707b48${_scopeId}></i></div><div data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Horário</p><p class="font-semibold" data-v-32707b48${_scopeId}>${ssrInterpolate(__props.evento.hora)}</p></div></div></div></div><a${ssrRenderAttr("href", `/publico/evento/${__props.evento.id}/pdf`)} target="_blank" class="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm" data-v-32707b48${_scopeId}><i class="fa fa-file-pdf" data-v-32707b48${_scopeId}></i><span data-v-32707b48${_scopeId}>Baixar PDF</span></a></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-v-32707b48${_scopeId}><div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400 hover:shadow-lg transition-shadow" data-v-32707b48${_scopeId}><div class="flex items-center justify-between" data-v-32707b48${_scopeId}><div data-v-32707b48${_scopeId}><p class="text-sm text-gray-500 mb-1 font-medium" data-v-32707b48${_scopeId}>Valor Gasto</p><p class="text-2xl font-bold text-red-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(__props.evento.valor_gasto))}</p></div><div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-arrow-down text-2xl text-red-500" data-v-32707b48${_scopeId}></i></div></div></div><div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400 hover:shadow-lg transition-shadow" data-v-32707b48${_scopeId}><div class="flex items-center justify-between" data-v-32707b48${_scopeId}><div data-v-32707b48${_scopeId}><p class="text-sm text-gray-500 mb-1 font-medium" data-v-32707b48${_scopeId}>Valor Arrecadado</p><p class="text-2xl font-bold text-green-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(__props.evento.valor_arrecadado))}</p></div><div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-arrow-up text-2xl text-green-500" data-v-32707b48${_scopeId}></i></div></div></div><div class="${ssrRenderClass([saldoCorBorda.value, "bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow"])}" data-v-32707b48${_scopeId}><div class="flex items-center justify-between" data-v-32707b48${_scopeId}><div data-v-32707b48${_scopeId}><p class="text-sm text-gray-500 mb-1 font-medium" data-v-32707b48${_scopeId}>Saldo</p><p class="${ssrRenderClass([saldoCorTexto.value, "text-2xl font-bold"])}" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(saldo.value))}</p></div><div class="${ssrRenderClass([saldo.value > 0 ? "bg-blue-50" : saldo.value < 0 ? "bg-yellow-50" : "bg-gray-50", "w-12 h-12 rounded-full flex items-center justify-center"])}" data-v-32707b48${_scopeId}><i class="${ssrRenderClass([[
              saldo.value >= 0 ? "fa-check-circle" : "fa-exclamation-triangle",
              saldoCorIcone.value
            ], "fa text-2xl"])}" data-v-32707b48${_scopeId}></i></div></div></div></div>`);
            if (__props.comissao) {
              _push2(`<div class="mb-8" data-v-32707b48${_scopeId}><div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500" data-v-32707b48${_scopeId}><div class="text-center" data-v-32707b48${_scopeId}><h2 class="text-4xl font-bold text-gray-800 mb-3" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}>${ssrInterpolate(__props.comissao.nome)}</h2><div class="inline-block" data-v-32707b48${_scopeId}><span class="bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold" data-v-32707b48${_scopeId}> Ano ${ssrInterpolate(__props.comissao.ano)}</span></div>`);
              if (__props.comissao.descricao) {
                _push2(`<p class="text-gray-700 mt-4 max-w-3xl mx-auto" data-v-32707b48${_scopeId}>${ssrInterpolate(__props.comissao.descricao)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mb-6" data-v-32707b48${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" data-v-32707b48${_scopeId}> Pároco </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-32707b48${_scopeId}><div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-green-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1" data-v-32707b48${_scopeId}><div class="flex items-start gap-4" data-v-32707b48${_scopeId}><div class="flex-shrink-0" data-v-32707b48${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" data-v-32707b48${_scopeId}><i class="fa fa-user" data-v-32707b48${_scopeId}></i></div></div><div class="flex-1 min-w-0" data-v-32707b48${_scopeId}><h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight" data-v-32707b48${_scopeId}> Pe. Pedro Canísio Schroeder sj </h4></div></div></div></div></div>`);
              if (__props.comissao.integrantes && __props.comissao.integrantes.filter((i) => i.cargo.nome !== "Festeiro de Promessa").length > 0) {
                _push2(`<div class="mb-6" data-v-32707b48${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" data-v-32707b48${_scopeId}> Integrantes da Comissão </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-32707b48${_scopeId}><!--[-->`);
                ssrRenderList(__props.comissao.integrantes.filter((i) => i.cargo.nome !== "Festeiro de Promessa"), (integrante) => {
                  _push2(`<div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-amber-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1" data-v-32707b48${_scopeId}><div class="flex items-start gap-4" data-v-32707b48${_scopeId}><div class="flex-shrink-0" data-v-32707b48${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" data-v-32707b48${_scopeId}><i class="fa fa-user" data-v-32707b48${_scopeId}></i></div></div><div class="flex-1 min-w-0" data-v-32707b48${_scopeId}><h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight" data-v-32707b48${_scopeId}>${ssrInterpolate(integrante.pessoa.nome)}</h4><p class="text-gray-900 font-semibold text-sm mb-2" data-v-32707b48${_scopeId}>${ssrInterpolate(integrante.cargo.nome)}</p></div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.comissao.integrantes && __props.comissao.integrantes.filter((i) => i.cargo.nome === "Festeiro de Promessa").length > 0) {
                _push2(`<div class="mb-10" data-v-32707b48${_scopeId}><h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center" data-v-32707b48${_scopeId}> Festeiros de Promessa </h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-32707b48${_scopeId}><!--[-->`);
                ssrRenderList(__props.comissao.integrantes.filter((i) => i.cargo.nome === "Festeiro de Promessa"), (integrante) => {
                  _push2(`<div class="bg-gradient-to-br rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1" data-v-32707b48${_scopeId}><div class="flex items-start gap-4" data-v-32707b48${_scopeId}><div class="flex-shrink-0" data-v-32707b48${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" data-v-32707b48${_scopeId}><i class="fa fa-user" data-v-32707b48${_scopeId}></i></div></div><div class="flex-1 min-w-0" data-v-32707b48${_scopeId}><h4 class="font-bold text-gray-900 text-lg mb-1 leading-tight" data-v-32707b48${_scopeId}>${ssrInterpolate(integrante.pessoa.nome)}</h4><p class="text-purple-800 font-semibold text-sm mb-2" data-v-32707b48${_scopeId}>${ssrInterpolate(integrante.cargo.nome)}</p></div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.evento.cardapios && __props.evento.cardapios.length > 0) {
              _push2(`<div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" data-v-32707b48${_scopeId}><h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}><span class="text-4xl mr-3" data-v-32707b48${_scopeId}>🍽️</span> Cardápio do Evento </h2><!--[-->`);
              ssrRenderList(__props.evento.cardapios, (cardapio) => {
                _push2(`<div class="mb-6 last:mb-0" data-v-32707b48${_scopeId}><div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border-l-4 border-orange-400" data-v-32707b48${_scopeId}><div class="flex justify-between items-center" data-v-32707b48${_scopeId}><div data-v-32707b48${_scopeId}><h3 class="text-xl font-bold text-gray-800" data-v-32707b48${_scopeId}>${ssrInterpolate(cardapio.nome)}</h3>`);
                if (cardapio.descricao) {
                  _push2(`<p class="text-gray-600 text-sm mt-1" data-v-32707b48${_scopeId}>${ssrInterpolate(cardapio.descricao)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex gap-6" data-v-32707b48${_scopeId}><div class="text-right" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Valor Total</p><p class="text-xl font-bold text-orange-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(cardapio.valor_total))}</p></div><div class="text-right" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Sem Responsável</p><p class="text-xl font-bold text-red-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(calcularValorSemResponsavel(cardapio)))}</p></div></div></div></div>`);
                if (cardapio.ingredientes && cardapio.ingredientes.length > 0) {
                  _push2(`<div class="space-y-3" data-v-32707b48${_scopeId}><!--[-->`);
                  ssrRenderList(cardapio.ingredientes, (ingrediente) => {
                    _push2(`<div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200" data-v-32707b48${_scopeId}><div class="flex flex-col md:flex-row md:items-center justify-between gap-3" data-v-32707b48${_scopeId}><div class="flex-1" data-v-32707b48${_scopeId}><div class="flex items-start gap-3" data-v-32707b48${_scopeId}><div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0" data-v-32707b48${_scopeId}><i class="fa fa-utensils text-orange-600" data-v-32707b48${_scopeId}></i></div><div class="flex-1" data-v-32707b48${_scopeId}><h4 class="font-semibold text-gray-800 text-lg" data-v-32707b48${_scopeId}>${ssrInterpolate(ingrediente.nome)}</h4>`);
                    if (ingrediente.pessoa) {
                      _push2(`<div class="mt-2 flex items-center gap-2" data-v-32707b48${_scopeId}><div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-user text-green-600 text-xs" data-v-32707b48${_scopeId}></i></div><span class="text-sm text-gray-600" data-v-32707b48${_scopeId}> Responsável: <span class="font-medium text-green-700" data-v-32707b48${_scopeId}>${ssrInterpolate(ingrediente.pessoa.nome)}</span></span></div>`);
                    } else {
                      _push2(`<div class="mt-2 flex items-center gap-2" data-v-32707b48${_scopeId}><div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-user-slash text-gray-500 text-xs" data-v-32707b48${_scopeId}></i></div><span class="text-sm text-gray-500 italic" data-v-32707b48${_scopeId}>Sem responsável definido</span></div>`);
                    }
                    _push2(`</div></div></div><div class="flex flex-wrap gap-4 md:gap-6" data-v-32707b48${_scopeId}><div class="text-center" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Quantidade</p><p class="font-bold text-gray-800" data-v-32707b48${_scopeId}>${ssrInterpolate(ingrediente.quantidade)} ${ssrInterpolate(ingrediente.unidade_medida)}</p></div><div class="text-center" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Valor Unit.</p><p class="font-semibold text-gray-700" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(ingrediente.valor_unitario))}</p></div><div class="text-center" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium" data-v-32707b48${_scopeId}>Valor Total</p><p class="font-bold text-orange-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(ingrediente.valor_total))}</p></div></div></div></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div class="text-center py-6 text-gray-500" data-v-32707b48${_scopeId}><i class="fa fa-info-circle text-2xl mb-2" data-v-32707b48${_scopeId}></i><p data-v-32707b48${_scopeId}>Nenhum ingrediente cadastrado para este cardápio</p></div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.evento.doacoes && __props.evento.doacoes.length > 0) {
              _push2(`<div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" data-v-32707b48${_scopeId}><h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}><span class="text-4xl mr-3" data-v-32707b48${_scopeId}>💰</span> Doações Recebidas </h2><div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border-l-4 border-green-400" data-v-32707b48${_scopeId}><div class="flex justify-between items-center" data-v-32707b48${_scopeId}><div data-v-32707b48${_scopeId}><p class="text-sm text-gray-600 font-medium" data-v-32707b48${_scopeId}>Total de Doações</p><p class="text-2xl font-bold text-green-700" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(totalDoacoes.value))}</p></div><div class="text-right" data-v-32707b48${_scopeId}><p class="text-sm text-gray-600 font-medium" data-v-32707b48${_scopeId}>Quantidade</p><p class="text-2xl font-bold text-gray-700" data-v-32707b48${_scopeId}>${ssrInterpolate(__props.evento.doacoes.length)}</p></div></div></div><div class="space-y-3" data-v-32707b48${_scopeId}><!--[-->`);
              ssrRenderList(__props.evento.doacoes, (doacao) => {
                _push2(`<div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200" data-v-32707b48${_scopeId}><div class="flex items-center justify-between gap-4" data-v-32707b48${_scopeId}><div class="flex items-center gap-3 flex-1" data-v-32707b48${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" data-v-32707b48${_scopeId}><i class="fa fa-heart text-white text-lg" data-v-32707b48${_scopeId}></i></div><div data-v-32707b48${_scopeId}><h4 class="font-semibold text-gray-800 text-lg" data-v-32707b48${_scopeId}>${ssrInterpolate(doacao.pessoa.nome)}</h4></div></div><div class="text-right" data-v-32707b48${_scopeId}><p class="text-xs text-gray-500 font-medium mb-1" data-v-32707b48${_scopeId}>Valor Doado</p><p class="text-2xl font-bold text-green-600" data-v-32707b48${_scopeId}>${ssrInterpolate(formatarMoeda(doacao.valor))}</p></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" data-v-32707b48${_scopeId}><h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}><span class="text-4xl mr-3" data-v-32707b48${_scopeId}>💰</span> Doações Recebidas </h2><div class="text-center py-8 text-gray-500" data-v-32707b48${_scopeId}><i class="fa fa-info-circle text-3xl mb-3" data-v-32707b48${_scopeId}></i><p class="text-lg" data-v-32707b48${_scopeId}>Nenhuma doação registrada para este evento</p></div></div>`);
            }
            if (__props.evento.fotos && __props.evento.fotos.length > 0) {
              _push2(`<div class="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8" data-v-32707b48${_scopeId}><h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}><span class="text-4xl mr-3" data-v-32707b48${_scopeId}>📸</span> Galeria de Fotos </h2><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-32707b48${_scopeId}><!--[-->`);
              ssrRenderList(__props.evento.fotos, (foto) => {
                _push2(`<div class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md hover:shadow-xl" data-v-32707b48${_scopeId}><img${ssrRenderAttr("src", getFotoUrl(foto))}${ssrRenderAttr("alt", foto.descricao || "Foto do evento")} class="w-full h-full object-cover" data-v-32707b48${_scopeId}></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.arquivos && __props.arquivos.length > 0) {
              _push2(`<div class="bg-white rounded-xl shadow-lg p-6 md:p-8" data-v-32707b48${_scopeId}><h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center" style="${ssrRenderStyle({ "font-family": "Georgia, serif" })}" data-v-32707b48${_scopeId}><span class="text-4xl mr-3" data-v-32707b48${_scopeId}>📎</span> Arquivos do Evento </h2><div class="space-y-3" data-v-32707b48${_scopeId}><!--[-->`);
              ssrRenderList(__props.arquivos, (arquivo) => {
                _push2(`<a${ssrRenderAttr("href", `/publico/arquivo/${arquivo.id}`)} target="_blank" class="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200" data-v-32707b48${_scopeId}><div class="flex items-center gap-3" data-v-32707b48${_scopeId}><div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" data-v-32707b48${_scopeId}><i class="fa fa-file text-amber-600" data-v-32707b48${_scopeId}></i></div><span class="font-medium text-gray-800" data-v-32707b48${_scopeId}>${ssrInterpolate(arquivo.descricao || "Documento")}</span></div><i class="fa fa-download text-amber-600" data-v-32707b48${_scopeId}></i></a>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            ssrRenderTeleport(_push2, (_push3) => {
              if (modalAberto.value) {
                _push3(`<div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" data-v-32707b48${_scopeId}><div class="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center" data-v-32707b48${_scopeId}><button class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors z-10" data-v-32707b48${_scopeId}><i class="fa fa-times text-2xl" data-v-32707b48${_scopeId}></i></button>`);
                if (fotoSelecionada.value) {
                  _push3(`<img${ssrRenderAttr("src", getFotoUrl(fotoSelecionada.value))}${ssrRenderAttr("alt", fotoSelecionada.value.descricao || "Foto do evento")} class="max-w-full max-h-full object-contain" data-v-32707b48${_scopeId}>`);
                } else {
                  _push3(`<!---->`);
                }
                if (indiceAtual.value > 0) {
                  _push3(`<button class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors" data-v-32707b48${_scopeId}><i class="fa fa-chevron-left text-2xl" data-v-32707b48${_scopeId}></i></button>`);
                } else {
                  _push3(`<!---->`);
                }
                if (indiceAtual.value < __props.evento.fotos.length - 1) {
                  _push3(`<button class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors" data-v-32707b48${_scopeId}><i class="fa fa-chevron-right text-2xl" data-v-32707b48${_scopeId}></i></button>`);
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode("div", { class: "container mx-auto px-4 py-8 max-w-7xl" }, [
                createVNode("div", { class: "bg-white rounded-2xl shadow-lg overflow-hidden mb-8" }, [
                  createVNode("div", { class: "bg-gradient-to-r from-amber-500 to-amber-600 h-2" }),
                  createVNode("div", { class: "p-6 md:p-10" }, [
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-start gap-6" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("h1", {
                          class: "text-3xl md:text-4xl font-bold text-gray-800 mb-6",
                          style: { "font-family": "Georgia, serif" }
                        }, toDisplayString(__props.evento.nome), 1),
                        createVNode("div", { class: "flex flex-wrap gap-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-gray-700" }, [
                            createVNode("div", { class: "w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" }, [
                              createVNode("i", { class: "fa fa-calendar text-amber-600" })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Data"),
                              createVNode("p", { class: "font-semibold" }, toDisplayString(formatarData(__props.evento.data)), 1)
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2 text-gray-700" }, [
                            createVNode("div", { class: "w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" }, [
                              createVNode("i", { class: "fa fa-clock text-amber-600" })
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Horário"),
                              createVNode("p", { class: "font-semibold" }, toDisplayString(__props.evento.hora), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("a", {
                        href: `/publico/evento/${__props.evento.id}/pdf`,
                        target: "_blank",
                        class: "bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm"
                      }, [
                        createVNode("i", { class: "fa fa-file-pdf" }),
                        createVNode("span", null, "Baixar PDF")
                      ], 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, [
                  createVNode("div", { class: "bg-white rounded-xl shadow-md p-6 border-l-4 border-red-400 hover:shadow-lg transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-500 mb-1 font-medium" }, "Valor Gasto"),
                        createVNode("p", { class: "text-2xl font-bold text-red-600" }, toDisplayString(formatarMoeda(__props.evento.valor_gasto)), 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-red-50 rounded-full flex items-center justify-center" }, [
                        createVNode("i", { class: "fa fa-arrow-down text-2xl text-red-500" })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400 hover:shadow-lg transition-shadow" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-500 mb-1 font-medium" }, "Valor Arrecadado"),
                        createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatarMoeda(__props.evento.valor_arrecadado)), 1)
                      ]),
                      createVNode("div", { class: "w-12 h-12 bg-green-50 rounded-full flex items-center justify-center" }, [
                        createVNode("i", { class: "fa fa-arrow-up text-2xl text-green-500" })
                      ])
                    ])
                  ]),
                  createVNode("div", {
                    class: ["bg-white rounded-xl shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow", saldoCorBorda.value]
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-500 mb-1 font-medium" }, "Saldo"),
                        createVNode("p", {
                          class: ["text-2xl font-bold", saldoCorTexto.value]
                        }, toDisplayString(formatarMoeda(saldo.value)), 3)
                      ]),
                      createVNode("div", {
                        class: ["w-12 h-12 rounded-full flex items-center justify-center", saldo.value > 0 ? "bg-blue-50" : saldo.value < 0 ? "bg-yellow-50" : "bg-gray-50"]
                      }, [
                        createVNode("i", {
                          class: ["fa text-2xl", [
                            saldo.value >= 0 ? "fa-check-circle" : "fa-exclamation-triangle",
                            saldoCorIcone.value
                          ]]
                        }, null, 2)
                      ], 2)
                    ])
                  ], 2)
                ]),
                __props.comissao ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-8"
                }, [
                  createVNode("div", { class: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500" }, [
                    createVNode("div", { class: "text-center" }, [
                      createVNode("h2", {
                        class: "text-4xl font-bold text-gray-800 mb-3",
                        style: { "font-family": "Georgia, serif" }
                      }, toDisplayString(__props.comissao.nome), 1),
                      createVNode("div", { class: "inline-block" }, [
                        createVNode("span", { class: "bg-blue-600 text-white px-6 py-2 rounded-full text-xl font-semibold" }, " Ano " + toDisplayString(__props.comissao.ano), 1)
                      ]),
                      __props.comissao.descricao ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-gray-700 mt-4 max-w-3xl mx-auto"
                      }, toDisplayString(__props.comissao.descricao), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h3", { class: "text-2xl font-bold text-gray-800 mb-6 flex items-center" }, " Pároco "),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-green-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1" }, [
                        createVNode("div", { class: "flex items-start gap-4" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" }, [
                              createVNode("i", { class: "fa fa-user" })
                            ])
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("h4", { class: "font-bold text-gray-900 text-lg mb-1 leading-tight" }, " Pe. Pedro Canísio Schroeder sj ")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  __props.comissao.integrantes && __props.comissao.integrantes.filter((i) => i.cargo.nome !== "Festeiro de Promessa").length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-6"
                  }, [
                    createVNode("h3", { class: "text-2xl font-bold text-gray-800 mb-6 flex items-center" }, " Integrantes da Comissão "),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.comissao.integrantes.filter((i) => i.cargo.nome !== "Festeiro de Promessa"), (integrante) => {
                        return openBlock(), createBlock("div", {
                          key: integrante.id,
                          class: "bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-l-4 border-amber-300 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                        }, [
                          createVNode("div", { class: "flex items-start gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" }, [
                                createVNode("i", { class: "fa fa-user" })
                              ])
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("h4", { class: "font-bold text-gray-900 text-lg mb-1 leading-tight" }, toDisplayString(integrante.pessoa.nome), 1),
                              createVNode("p", { class: "text-gray-900 font-semibold text-sm mb-2" }, toDisplayString(integrante.cargo.nome), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  __props.comissao.integrantes && __props.comissao.integrantes.filter((i) => i.cargo.nome === "Festeiro de Promessa").length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mb-10"
                  }, [
                    createVNode("h3", { class: "text-2xl font-bold text-gray-800 mb-6 flex items-center" }, " Festeiros de Promessa "),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.comissao.integrantes.filter((i) => i.cargo.nome === "Festeiro de Promessa"), (integrante) => {
                        return openBlock(), createBlock("div", {
                          key: integrante.id,
                          class: "bg-gradient-to-br rounded-xl p-6 border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                        }, [
                          createVNode("div", { class: "flex items-start gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" }, [
                                createVNode("i", { class: "fa fa-user" })
                              ])
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("h4", { class: "font-bold text-gray-900 text-lg mb-1 leading-tight" }, toDisplayString(integrante.pessoa.nome), 1),
                              createVNode("p", { class: "text-purple-800 font-semibold text-sm mb-2" }, toDisplayString(integrante.cargo.nome), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])) : createCommentVNode("", true),
                __props.evento.cardapios && __props.evento.cardapios.length > 0 ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
                }, [
                  createVNode("h2", {
                    class: "text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "text-4xl mr-3" }, "🍽️"),
                    createTextVNode(" Cardápio do Evento ")
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.evento.cardapios, (cardapio) => {
                    return openBlock(), createBlock("div", {
                      key: cardapio.id,
                      class: "mb-6 last:mb-0"
                    }, [
                      createVNode("div", { class: "bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4 border-l-4 border-orange-400" }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xl font-bold text-gray-800" }, toDisplayString(cardapio.nome), 1),
                            cardapio.descricao ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-gray-600 text-sm mt-1"
                            }, toDisplayString(cardapio.descricao), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex gap-6" }, [
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Valor Total"),
                              createVNode("p", { class: "text-xl font-bold text-orange-600" }, toDisplayString(formatarMoeda(cardapio.valor_total)), 1)
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Sem Responsável"),
                              createVNode("p", { class: "text-xl font-bold text-red-600" }, toDisplayString(formatarMoeda(calcularValorSemResponsavel(cardapio))), 1)
                            ])
                          ])
                        ])
                      ]),
                      cardapio.ingredientes && cardapio.ingredientes.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(cardapio.ingredientes, (ingrediente) => {
                          return openBlock(), createBlock("div", {
                            key: ingrediente.id,
                            class: "bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                          }, [
                            createVNode("div", { class: "flex flex-col md:flex-row md:items-center justify-between gap-3" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("div", { class: "flex items-start gap-3" }, [
                                  createVNode("div", { class: "w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0" }, [
                                    createVNode("i", { class: "fa fa-utensils text-orange-600" })
                                  ]),
                                  createVNode("div", { class: "flex-1" }, [
                                    createVNode("h4", { class: "font-semibold text-gray-800 text-lg" }, toDisplayString(ingrediente.nome), 1),
                                    ingrediente.pessoa ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-2 flex items-center gap-2"
                                    }, [
                                      createVNode("div", { class: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center" }, [
                                        createVNode("i", { class: "fa fa-user text-green-600 text-xs" })
                                      ]),
                                      createVNode("span", { class: "text-sm text-gray-600" }, [
                                        createTextVNode(" Responsável: "),
                                        createVNode("span", { class: "font-medium text-green-700" }, toDisplayString(ingrediente.pessoa.nome), 1)
                                      ])
                                    ])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "mt-2 flex items-center gap-2"
                                    }, [
                                      createVNode("div", { class: "w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center" }, [
                                        createVNode("i", { class: "fa fa-user-slash text-gray-500 text-xs" })
                                      ]),
                                      createVNode("span", { class: "text-sm text-gray-500 italic" }, "Sem responsável definido")
                                    ]))
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-wrap gap-4 md:gap-6" }, [
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Quantidade"),
                                  createVNode("p", { class: "font-bold text-gray-800" }, toDisplayString(ingrediente.quantidade) + " " + toDisplayString(ingrediente.unidade_medida), 1)
                                ]),
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Valor Unit."),
                                  createVNode("p", { class: "font-semibold text-gray-700" }, toDisplayString(formatarMoeda(ingrediente.valor_unitario)), 1)
                                ]),
                                createVNode("div", { class: "text-center" }, [
                                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Valor Total"),
                                  createVNode("p", { class: "font-bold text-orange-600" }, toDisplayString(formatarMoeda(ingrediente.valor_total)), 1)
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-6 text-gray-500"
                      }, [
                        createVNode("i", { class: "fa fa-info-circle text-2xl mb-2" }),
                        createVNode("p", null, "Nenhum ingrediente cadastrado para este cardápio")
                      ]))
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                __props.evento.doacoes && __props.evento.doacoes.length > 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
                }, [
                  createVNode("h2", {
                    class: "text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "text-4xl mr-3" }, "💰"),
                    createTextVNode(" Doações Recebidas ")
                  ]),
                  createVNode("div", { class: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border-l-4 border-green-400" }, [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm text-gray-600 font-medium" }, "Total de Doações"),
                        createVNode("p", { class: "text-2xl font-bold text-green-700" }, toDisplayString(formatarMoeda(totalDoacoes.value)), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "text-sm text-gray-600 font-medium" }, "Quantidade"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-700" }, toDisplayString(__props.evento.doacoes.length), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.evento.doacoes, (doacao) => {
                      return openBlock(), createBlock("div", {
                        key: doacao.id,
                        class: "bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                          createVNode("div", { class: "flex items-center gap-3 flex-1" }, [
                            createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center flex-shrink-0 shadow-md" }, [
                              createVNode("i", { class: "fa fa-heart text-white text-lg" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-semibold text-gray-800 text-lg" }, toDisplayString(doacao.pessoa.nome), 1)
                            ])
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "text-xs text-gray-500 font-medium mb-1" }, "Valor Doado"),
                            createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(formatarMoeda(doacao.valor)), 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
                }, [
                  createVNode("h2", {
                    class: "text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "text-4xl mr-3" }, "💰"),
                    createTextVNode(" Doações Recebidas ")
                  ]),
                  createVNode("div", { class: "text-center py-8 text-gray-500" }, [
                    createVNode("i", { class: "fa fa-info-circle text-3xl mb-3" }),
                    createVNode("p", { class: "text-lg" }, "Nenhuma doação registrada para este evento")
                  ])
                ])),
                __props.evento.fotos && __props.evento.fotos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
                }, [
                  createVNode("h2", {
                    class: "text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "text-4xl mr-3" }, "📸"),
                    createTextVNode(" Galeria de Fotos ")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.evento.fotos, (foto) => {
                      return openBlock(), createBlock("div", {
                        key: foto.id,
                        class: "aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-md hover:shadow-xl",
                        onClick: ($event) => abrirModal(foto)
                      }, [
                        createVNode("img", {
                          src: getFotoUrl(foto),
                          alt: foto.descricao || "Foto do evento",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ], 8, ["onClick"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                __props.arquivos && __props.arquivos.length > 0 ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: "bg-white rounded-xl shadow-lg p-6 md:p-8"
                }, [
                  createVNode("h2", {
                    class: "text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center",
                    style: { "font-family": "Georgia, serif" }
                  }, [
                    createVNode("span", { class: "text-4xl mr-3" }, "📎"),
                    createTextVNode(" Arquivos do Evento ")
                  ]),
                  createVNode("div", { class: "space-y-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.arquivos, (arquivo) => {
                      return openBlock(), createBlock("a", {
                        key: arquivo.id,
                        href: `/publico/arquivo/${arquivo.id}`,
                        target: "_blank",
                        class: "flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      }, [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center" }, [
                            createVNode("i", { class: "fa fa-file text-amber-600" })
                          ]),
                          createVNode("span", { class: "font-medium text-gray-800" }, toDisplayString(arquivo.descricao || "Documento"), 1)
                        ]),
                        createVNode("i", { class: "fa fa-download text-amber-600" })
                      ], 8, ["href"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                modalAberto.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4",
                  onClick: fecharModal
                }, [
                  createVNode("div", { class: "relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center" }, [
                    createVNode("button", {
                      onClick: withModifiers(fecharModal, ["stop"]),
                      class: "absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-colors z-10"
                    }, [
                      createVNode("i", { class: "fa fa-times text-2xl" })
                    ]),
                    fotoSelecionada.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: getFotoUrl(fotoSelecionada.value),
                      alt: fotoSelecionada.value.descricao || "Foto do evento",
                      class: "max-w-full max-h-full object-contain",
                      onClick: withModifiers(() => {
                      }, ["stop"])
                    }, null, 8, ["src", "alt", "onClick"])) : createCommentVNode("", true),
                    indiceAtual.value > 0 ? (openBlock(), createBlock("button", {
                      key: 1,
                      onClick: withModifiers(fotoAnterior, ["stop"]),
                      class: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors"
                    }, [
                      createVNode("i", { class: "fa fa-chevron-left text-2xl" })
                    ])) : createCommentVNode("", true),
                    indiceAtual.value < __props.evento.fotos.length - 1 ? (openBlock(), createBlock("button", {
                      key: 2,
                      onClick: withModifiers(proximaFoto, ["stop"]),
                      class: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors"
                    }, [
                      createVNode("i", { class: "fa fa-chevron-right text-2xl" })
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true)
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Publico/EventoDetalhes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventoDetalhes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-32707b48"]]);
export {
  EventoDetalhes as default
};
