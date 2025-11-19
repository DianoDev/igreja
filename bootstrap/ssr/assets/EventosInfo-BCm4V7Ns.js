import { inject, ref, computed, onMounted, withCtx, createVNode, toDisplayString, createTextVNode, withDirectives, createBlock, openBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { L as LayoutPrincipal } from "./LayoutPrincipal-CkoRPw-8.js";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$2 from "./InputError-DKvItylr.js";
import _sfc_main$3 from "./TextInput-BEEeI7hx.js";
import Autocomplete from "./AutoCompletePessoa-DFTP1mc1.js";
import { useToast } from "vue-toastification";
import { router } from "@inertiajs/vue3";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Modal-D4SsQX3D.js";
const _sfc_main = {
  __name: "EventosInfo",
  __ssrInlineRender: true,
  props: {
    evento: {
      type: Object,
      required: true
    },
    doacoesEvento: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const events = inject("events");
    const props = __props;
    const toast = useToast();
    const processing = ref(false);
    const errors = ref({});
    const cardapiosEvento = ref([]);
    const evento = ref([]);
    const cardapiosModelo = ref([]);
    const doacoesEvento = ref([...props.doacoesEvento]);
    const cardapioSelecionado = ref("");
    ref(false);
    ref(null);
    const novaDoacao = ref({
      id_pessoa: null,
      valor: "",
      id_evento: props.evento.id
    });
    const totalDoacoes = computed(() => {
      return doacoesEvento.value.reduce((total, doacao) => {
        return total + parseFloat(doacao.valor || 0);
      }, 0);
    });
    const saldo = computed(() => {
      const arrecadado = parseFloat(evento.value.valor_arrecadado || 0);
      const gasto = parseFloat(evento.value.valor_gasto || 0);
      return arrecadado - gasto;
    });
    const saldoClass = computed(() => {
      if (saldo.value > 0) return "bg-blue-50 border-blue-200";
      if (saldo.value < 0) return "bg-yellow-50 border-yellow-200";
      return "bg-gray-50 border-gray-200";
    });
    const saldoTextClass = computed(() => {
      if (saldo.value > 0) return "text-blue-900";
      if (saldo.value < 0) return "text-yellow-900";
      return "text-gray-900";
    });
    onMounted(() => {
      carregarCardapiosModelo();
      carregarCardapiosEvento();
      carregarEvento();
      events.on("recarrega-evento", carregarTudo);
    });
    async function removerIngrediente(idIngrediente) {
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/cardapio-evento/ingrediente/${idIngrediente}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
        }
      } catch (error) {
        toast.error("Erro ao remover ingrediente");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    function carregarTudo() {
      carregarCardapiosEvento();
      recarregarDoacoes();
      carregarEvento();
    }
    async function carregarCardapiosModelo() {
      try {
        const response = await axios.get("/admin/cardapio-evento/cardapios-modelo");
        cardapiosModelo.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar cardápios modelo:", error);
      }
    }
    async function carregarEvento() {
      try {
        const response = await axios.get(`/admin/eventos/${props.evento.id}`);
        evento.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar cardápios modelo:", error);
      }
    }
    async function carregarCardapiosEvento() {
      try {
        const response = await axios.get(`/admin/cardapio-evento/evento/${props.evento.id}`);
        cardapiosEvento.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar cardápios do evento:", error);
      }
    }
    async function importarCardapio() {
      errors.value = {};
      if (!cardapioSelecionado.value) {
        errors.value.cardapio_modelo = "Selecione um cardápio";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/cardapio-evento/importar", {
          id_evento: props.evento.id,
          id_cardapio: cardapioSelecionado.value
        });
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
          cardapioSelecionado.value = "";
        }
      } catch (error) {
        toast.error("Erro ao importar cardápio");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function associarPessoaIngrediente(idIngrediente, pessoa) {
      processing.value = true;
      try {
        const response = await axios.post(
          `/admin/cardapio-evento/ingrediente/${idIngrediente}/associar-pessoa`,
          {
            id_pessoa: pessoa ? pessoa.id : null
          }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
        }
      } catch (error) {
        toast.error("Erro ao associar pessoa");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function removerPessoaIngrediente(idIngrediente) {
      await associarPessoaIngrediente(idIngrediente, null);
      await carregarTudo();
    }
    async function removerCardapio(id) {
      if (!confirm("Tem certeza que deseja remover este cardápio?")) {
        return;
      }
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/cardapio-evento/${id}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
        }
      } catch (error) {
        toast.error("Erro ao remover cardápio");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    function onPessoaDoacaoSelecionada(pessoa) {
      novaDoacao.value.id_pessoa = pessoa ? pessoa.id : null;
    }
    async function adicionarDoacao() {
      errors.value = {};
      if (!novaDoacao.value.id_pessoa) {
        errors.value.id_pessoa_doacao = "Selecione uma pessoa";
        return;
      }
      if (!novaDoacao.value.valor || parseFloat(novaDoacao.value.valor) <= 0) {
        errors.value.valor = "Informe um valor válido";
        return;
      }
      processing.value = true;
      try {
        const response = await axios.post("/admin/doacao-evento/adicionar", novaDoacao.value);
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
          novaDoacao.value = {
            id_pessoa: null,
            valor: "",
            id_evento: props.evento.id
          };
        }
      } catch (error) {
        toast.error("Erro ao registrar doação");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    function editarCardapio(cardapio) {
      events.emit("popup", {
        title: "Editar Cardápio",
        component: "EventoCardapioForm",
        data: {
          cardapio,
          idEvento: props.evento.id,
          onSuccess: () => {
            carregarCardapiosEvento();
          }
        },
        size: "lg",
        id: "form-cardapio"
      });
    }
    function adicionarIngredienteAoCardapio(cardapioId) {
      events.emit("popup", {
        title: "Adicionar Ingrediente",
        component: "EventoCardapioIngredienteForm",
        data: {
          idCardapioEvento: cardapioId,
          onSuccess: () => {
            carregarTudo();
          }
        },
        size: "md",
        id: "form-ingrediente"
      });
    }
    function editarIngrediente(ingrediente, cardapioId) {
      events.emit("popup", {
        title: "Editar Ingrediente",
        component: "EventoCardapioIngredienteForm",
        data: {
          ingrediente,
          idCardapioEvento: cardapioId,
          onSuccess: () => {
            carregarCardapiosEvento();
          }
        },
        size: "md",
        id: "form-ingrediente"
      });
    }
    const formatarData = (data) => {
      if (!data) return "-";
      try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
      } catch (error) {
        console.error("Erro ao formatar data:", error);
        return data;
      }
    };
    async function removerDoacao(id) {
      processing.value = true;
      try {
        const response = await axios.delete(`/admin/doacao-evento/${id}`);
        if (response.data.success) {
          toast.success(response.data.message);
          await carregarTudo();
          router.reload({ only: ["evento"] });
        }
      } catch (error) {
        toast.error("Erro ao remover doação");
        console.error(error);
      } finally {
        processing.value = false;
      }
    }
    async function recarregarDoacoes() {
      try {
        const response = await axios.get(`/admin/doacao-evento/evento/${props.evento.id}`);
        doacoesEvento.value = response.data;
      } catch (error) {
        console.error("Erro ao recarregar doações:", error);
      }
    }
    function formatarValor(valor) {
      return parseFloat(valor || 0).toFixed(2).replace(".", ",");
    }
    function voltar() {
      router.visit("/admin/eventos");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-content" data-v-ccee39d2${_scopeId}><div class="mb-6" data-v-ccee39d2${_scopeId}><h2 class="text-2xl font-semibold text-primary mb-2" data-v-ccee39d2${_scopeId}>${ssrInterpolate(evento.value.nome)}</h2><div class="text-gray-600 mb-4" data-v-ccee39d2${_scopeId}><p data-v-ccee39d2${_scopeId}><strong data-v-ccee39d2${_scopeId}>Data:</strong> ${ssrInterpolate(formatarData(evento.value.data))}</p><p data-v-ccee39d2${_scopeId}><strong data-v-ccee39d2${_scopeId}>Hora:</strong> ${ssrInterpolate(evento.value.hora)}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" data-v-ccee39d2${_scopeId}><div class="p-4 bg-red-50 border border-red-200 rounded-lg" data-v-ccee39d2${_scopeId}><p class="text-sm text-red-700 font-medium" data-v-ccee39d2${_scopeId}>Valor Gasto</p><p class="text-2xl font-bold text-red-900" data-v-ccee39d2${_scopeId}> R$ ${ssrInterpolate(formatarValor(evento.value.valor_gasto || 0))}</p><p class="text-xs text-red-600 mt-1" data-v-ccee39d2${_scopeId}> Ingredientes sem responsável </p></div><div class="p-4 bg-green-50 border border-green-200 rounded-lg" data-v-ccee39d2${_scopeId}><p class="text-sm text-green-700 font-medium" data-v-ccee39d2${_scopeId}>Valor Arrecadado</p><p class="text-2xl font-bold text-green-900" data-v-ccee39d2${_scopeId}> R$ ${ssrInterpolate(formatarValor(evento.value.valor_arrecadado || 0))}</p></div><div class="${ssrRenderClass([saldoClass.value, "p-4 border rounded-lg"])}" data-v-ccee39d2${_scopeId}><p class="${ssrRenderClass([saldoTextClass.value, "text-sm font-medium"])}" data-v-ccee39d2${_scopeId}>Saldo</p><p class="${ssrRenderClass([saldoTextClass.value, "text-2xl font-bold"])}" data-v-ccee39d2${_scopeId}> R$ ${ssrInterpolate(formatarValor(saldo.value))}</p></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-ccee39d2${_scopeId}><div class="card" data-v-ccee39d2${_scopeId}><div class="card-header" data-v-ccee39d2${_scopeId}><h3 class="text-xl font-semibold" data-v-ccee39d2${_scopeId}>Cardápios do Evento</h3></div><div class="card-body" data-v-ccee39d2${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-ccee39d2${_scopeId}><h4 class="font-semibold mb-3" data-v-ccee39d2${_scopeId}>Importar Cardápio</h4><div class="space-y-3" data-v-ccee39d2${_scopeId}><div data-v-ccee39d2${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "cardapio_modelo",
              value: "Cardápio Modelo",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(`<select id="cardapio_modelo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" data-v-ccee39d2${_scopeId}><option value="" data-v-ccee39d2${ssrIncludeBooleanAttr(Array.isArray(cardapioSelecionado.value) ? ssrLooseContain(cardapioSelecionado.value, "") : ssrLooseEqual(cardapioSelecionado.value, "")) ? " selected" : ""}${_scopeId}>Selecione um cardápio</option><!--[-->`);
            ssrRenderList(cardapiosModelo.value, (cardapio) => {
              _push2(`<option${ssrRenderAttr("value", cardapio.id)} data-v-ccee39d2${ssrIncludeBooleanAttr(Array.isArray(cardapioSelecionado.value) ? ssrLooseContain(cardapioSelecionado.value, cardapio.id) : ssrLooseEqual(cardapioSelecionado.value, cardapio.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cardapio.nome)}</option>`);
            });
            _push2(`<!--]--></select>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.cardapio_modelo
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(processing.value || !cardapioSelecionado.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-ccee39d2${_scopeId}><i class="fa fa-download mr-2" data-v-ccee39d2${_scopeId}></i> Importar Cardápio </button></div></div><div class="space-y-4" data-v-ccee39d2${_scopeId}><h4 class="font-semibold mb-3" data-v-ccee39d2${_scopeId}>Cardápios Importados</h4><!--[-->`);
            ssrRenderList(cardapiosEvento.value, (cardapio) => {
              _push2(`<div class="p-4 bg-white border rounded-lg" data-v-ccee39d2${_scopeId}><div class="flex items-start justify-between mb-3" data-v-ccee39d2${_scopeId}><div class="flex-1" data-v-ccee39d2${_scopeId}><p class="font-medium text-lg" data-v-ccee39d2${_scopeId}>${ssrInterpolate(cardapio.nome)}</p>`);
              if (cardapio.descricao) {
                _push2(`<p class="text-sm text-gray-600 mt-1" data-v-ccee39d2${_scopeId}>${ssrInterpolate(cardapio.descricao)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-sm font-semibold text-blue-700 mt-2" data-v-ccee39d2${_scopeId}> Valor Total: R$ ${ssrInterpolate(formatarValor(cardapio.valor_total))}</p></div><div class="flex gap-2" data-v-ccee39d2${_scopeId}><button class="text-blue-600 hover:text-blue-800" title="Editar" data-v-ccee39d2${_scopeId}><i class="fa fa-edit" data-v-ccee39d2${_scopeId}></i></button><button class="text-red-600 hover:text-red-800" title="Remover" data-v-ccee39d2${_scopeId}><i class="fa fa-trash" data-v-ccee39d2${_scopeId}></i></button></div></div>`);
              if (cardapio.ingredientes && cardapio.ingredientes.length > 0) {
                _push2(`<div class="mt-3 pt-3 border-t" data-v-ccee39d2${_scopeId}><div class="flex items-center justify-between mb-2" data-v-ccee39d2${_scopeId}><p class="text-sm font-medium text-gray-700" data-v-ccee39d2${_scopeId}>Ingredientes:</p><button class="text-sm text-blue-600 hover:text-blue-800" data-v-ccee39d2${_scopeId}><i class="fa fa-plus mr-1" data-v-ccee39d2${_scopeId}></i> Adicionar Ingrediente </button></div><div class="space-y-2" data-v-ccee39d2${_scopeId}><!--[-->`);
                ssrRenderList(cardapio.ingredientes, (ingrediente) => {
                  _push2(`<div class="${ssrRenderClass([ingrediente.id_pessoa ? "border-green-200 bg-green-50" : "border-gray-200", "p-3 bg-gray-50 rounded border"])}" data-v-ccee39d2${_scopeId}><div class="flex justify-between items-start mb-2" data-v-ccee39d2${_scopeId}><div class="flex-1" data-v-ccee39d2${_scopeId}><p class="font-medium text-sm" data-v-ccee39d2${_scopeId}>${ssrInterpolate(ingrediente.nome)}</p><p class="text-xs text-gray-600" data-v-ccee39d2${_scopeId}>${ssrInterpolate(ingrediente.quantidade)} ${ssrInterpolate(ingrediente.unidade_medida)} × R$ ${ssrInterpolate(formatarValor(ingrediente.valor_unitario))}</p></div><div class="flex items-center gap-2" data-v-ccee39d2${_scopeId}><p class="${ssrRenderClass([ingrediente.id_pessoa ? "text-green-700" : "text-gray-700", "text-sm font-bold"])}" data-v-ccee39d2${_scopeId}> R$ ${ssrInterpolate(formatarValor(ingrediente.valor_total))}</p><button class="text-blue-600 hover:text-blue-800" title="Editar" data-v-ccee39d2${_scopeId}><i class="fa fa-edit" data-v-ccee39d2${_scopeId}></i></button><button class="text-red-600 hover:text-red-800" title="Remover" data-v-ccee39d2${_scopeId}><i class="fa fa-trash" data-v-ccee39d2${_scopeId}></i></button></div></div><div class="mt-2" data-v-ccee39d2${_scopeId}><div class="flex items-center gap-2" data-v-ccee39d2${_scopeId}><div class="flex-1" data-v-ccee39d2${_scopeId}>`);
                  _push2(ssrRenderComponent(Autocomplete, {
                    modelValue: ingrediente.id_pessoa,
                    placeholder: "Pessoa responsável...",
                    "onUpdate:modelValue": (pessoa) => associarPessoaIngrediente(ingrediente.id, pessoa),
                    class: "text-sm"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                  if (ingrediente.id_pessoa) {
                    _push2(`<button class="text-red-600 hover:text-red-800 text-sm" title="Remover pessoa" data-v-ccee39d2${_scopeId}><i class="fa fa-times" data-v-ccee39d2${_scopeId}></i></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><div class="mt-1" data-v-ccee39d2${_scopeId}>`);
                  if (ingrediente.pessoa) {
                    _push2(`<p class="text-xs text-green-600" data-v-ccee39d2${_scopeId}> ✓ ${ssrInterpolate(ingrediente.pessoa.nome)} - Valor não entra no gasto do evento </p>`);
                  } else {
                    _push2(`<p class="text-xs text-yellow-600" data-v-ccee39d2${_scopeId}> ⚠️ Sem responsável - Valor entra no gasto do evento </p>`);
                  }
                  _push2(`</div></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<div class="text-sm text-gray-500 text-center py-2" data-v-ccee39d2${_scopeId}> Nenhum ingrediente neste cardápio </div>`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (cardapiosEvento.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4" data-v-ccee39d2${_scopeId}> Nenhum cardápio importado ainda </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="card" data-v-ccee39d2${_scopeId}><div class="card-header" data-v-ccee39d2${_scopeId}><h3 class="text-xl font-semibold" data-v-ccee39d2${_scopeId}>Doações do Evento</h3></div><div class="card-body" data-v-ccee39d2${_scopeId}><div class="mb-4 p-4 bg-gray-50 rounded-lg" data-v-ccee39d2${_scopeId}><h4 class="font-semibold mb-3" data-v-ccee39d2${_scopeId}>Registrar Doação</h4><div class="space-y-3" data-v-ccee39d2${_scopeId}><div data-v-ccee39d2${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "pessoa_doacao",
              value: "Buscar Pessoa",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(Autocomplete, {
              modelValue: novaDoacao.value.id_pessoa,
              "onUpdate:modelValue": [($event) => novaDoacao.value.id_pessoa = $event, onPessoaDoacaoSelecionada],
              placeholder: "Digite o nome da pessoa..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.id_pessoa_doacao
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ccee39d2${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              for: "valor",
              value: "Valor (R$)",
              class: "required"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "valor",
              modelValue: novaDoacao.value.valor,
              "onUpdate:modelValue": ($event) => novaDoacao.value.valor = $event,
              type: "number",
              step: "0.01",
              min: "0",
              placeholder: "0.00",
              class: "mt-1 block w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: errors.value.valor
            }, null, _parent2, _scopeId));
            _push2(`</div><button${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="btn btn-primary w-full" data-v-ccee39d2${_scopeId}><i class="fa fa-plus mr-2" data-v-ccee39d2${_scopeId}></i> Registrar Doação </button></div></div><div class="space-y-2" data-v-ccee39d2${_scopeId}><h4 class="font-semibold mb-3" data-v-ccee39d2${_scopeId}>Doações Registradas</h4><!--[-->`);
            ssrRenderList(doacoesEvento.value, (doacao) => {
              _push2(`<div class="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50" data-v-ccee39d2${_scopeId}><div data-v-ccee39d2${_scopeId}><p class="font-medium" data-v-ccee39d2${_scopeId}>${ssrInterpolate(doacao.pessoa.nome)}</p><p class="text-sm text-green-600 font-semibold" data-v-ccee39d2${_scopeId}> R$ ${ssrInterpolate(formatarValor(doacao.valor))}</p></div><button class="text-red-600 hover:text-red-800" title="Remover" data-v-ccee39d2${_scopeId}><i class="fa fa-trash" data-v-ccee39d2${_scopeId}></i></button></div>`);
            });
            _push2(`<!--]-->`);
            if (doacoesEvento.value.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4" data-v-ccee39d2${_scopeId}> Nenhuma doação registrada ainda </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (doacoesEvento.value.length > 0) {
              _push2(`<div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg" data-v-ccee39d2${_scopeId}><p class="text-lg font-semibold text-green-800" data-v-ccee39d2${_scopeId}> Total de Doações: R$ ${ssrInterpolate(formatarValor(totalDoacoes.value))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="mt-6" data-v-ccee39d2${_scopeId}><button class="btn btn-secondary" data-v-ccee39d2${_scopeId}><i class="fa fa-arrow-left mr-2" data-v-ccee39d2${_scopeId}></i> Voltar </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "page-content" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("h2", { class: "text-2xl font-semibold text-primary mb-2" }, toDisplayString(evento.value.nome), 1),
                  createVNode("div", { class: "text-gray-600 mb-4" }, [
                    createVNode("p", null, [
                      createVNode("strong", null, "Data:"),
                      createTextVNode(" " + toDisplayString(formatarData(evento.value.data)), 1)
                    ]),
                    createVNode("p", null, [
                      createVNode("strong", null, "Hora:"),
                      createTextVNode(" " + toDisplayString(evento.value.hora), 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" }, [
                    createVNode("div", { class: "p-4 bg-red-50 border border-red-200 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-red-700 font-medium" }, "Valor Gasto"),
                      createVNode("p", { class: "text-2xl font-bold text-red-900" }, " R$ " + toDisplayString(formatarValor(evento.value.valor_gasto || 0)), 1),
                      createVNode("p", { class: "text-xs text-red-600 mt-1" }, " Ingredientes sem responsável ")
                    ]),
                    createVNode("div", { class: "p-4 bg-green-50 border border-green-200 rounded-lg" }, [
                      createVNode("p", { class: "text-sm text-green-700 font-medium" }, "Valor Arrecadado"),
                      createVNode("p", { class: "text-2xl font-bold text-green-900" }, " R$ " + toDisplayString(formatarValor(evento.value.valor_arrecadado || 0)), 1)
                    ]),
                    createVNode("div", {
                      class: ["p-4 border rounded-lg", saldoClass.value]
                    }, [
                      createVNode("p", {
                        class: ["text-sm font-medium", saldoTextClass.value]
                      }, "Saldo", 2),
                      createVNode("p", {
                        class: ["text-2xl font-bold", saldoTextClass.value]
                      }, " R$ " + toDisplayString(formatarValor(saldo.value)), 3)
                    ], 2)
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Cardápios do Evento")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Importar Cardápio"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "cardapio_modelo",
                              value: "Cardápio Modelo",
                              class: "required"
                            }),
                            withDirectives(createVNode("select", {
                              id: "cardapio_modelo",
                              "onUpdate:modelValue": ($event) => cardapioSelecionado.value = $event,
                              class: "mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            }, [
                              createVNode("option", { value: "" }, "Selecione um cardápio"),
                              (openBlock(true), createBlock(Fragment, null, renderList(cardapiosModelo.value, (cardapio) => {
                                return openBlock(), createBlock("option", {
                                  key: cardapio.id,
                                  value: cardapio.id
                                }, toDisplayString(cardapio.nome), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, cardapioSelecionado.value]
                            ]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.cardapio_modelo
                            }, null, 8, ["message"])
                          ]),
                          createVNode("button", {
                            onClick: importarCardapio,
                            disabled: processing.value || !cardapioSelecionado.value,
                            class: "btn btn-primary w-full"
                          }, [
                            createVNode("i", { class: "fa fa-download mr-2" }),
                            createTextVNode(" Importar Cardápio ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Cardápios Importados"),
                        (openBlock(true), createBlock(Fragment, null, renderList(cardapiosEvento.value, (cardapio) => {
                          return openBlock(), createBlock("div", {
                            key: cardapio.id,
                            class: "p-4 bg-white border rounded-lg"
                          }, [
                            createVNode("div", { class: "flex items-start justify-between mb-3" }, [
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "font-medium text-lg" }, toDisplayString(cardapio.nome), 1),
                                cardapio.descricao ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-gray-600 mt-1"
                                }, toDisplayString(cardapio.descricao), 1)) : createCommentVNode("", true),
                                createVNode("p", { class: "text-sm font-semibold text-blue-700 mt-2" }, " Valor Total: R$ " + toDisplayString(formatarValor(cardapio.valor_total)), 1)
                              ]),
                              createVNode("div", { class: "flex gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => editarCardapio(cardapio),
                                  class: "text-blue-600 hover:text-blue-800",
                                  title: "Editar"
                                }, [
                                  createVNode("i", { class: "fa fa-edit" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => removerCardapio(cardapio.id),
                                  class: "text-red-600 hover:text-red-800",
                                  title: "Remover"
                                }, [
                                  createVNode("i", { class: "fa fa-trash" })
                                ], 8, ["onClick"])
                              ])
                            ]),
                            cardapio.ingredientes && cardapio.ingredientes.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-3 pt-3 border-t"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-700" }, "Ingredientes:"),
                                createVNode("button", {
                                  onClick: ($event) => adicionarIngredienteAoCardapio(cardapio.id),
                                  class: "text-sm text-blue-600 hover:text-blue-800"
                                }, [
                                  createVNode("i", { class: "fa fa-plus mr-1" }),
                                  createTextVNode(" Adicionar Ingrediente ")
                                ], 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(cardapio.ingredientes, (ingrediente) => {
                                  return openBlock(), createBlock("div", {
                                    key: ingrediente.id,
                                    class: ["p-3 bg-gray-50 rounded border", ingrediente.id_pessoa ? "border-green-200 bg-green-50" : "border-gray-200"]
                                  }, [
                                    createVNode("div", { class: "flex justify-between items-start mb-2" }, [
                                      createVNode("div", { class: "flex-1" }, [
                                        createVNode("p", { class: "font-medium text-sm" }, toDisplayString(ingrediente.nome), 1),
                                        createVNode("p", { class: "text-xs text-gray-600" }, toDisplayString(ingrediente.quantidade) + " " + toDisplayString(ingrediente.unidade_medida) + " × R$ " + toDisplayString(formatarValor(ingrediente.valor_unitario)), 1)
                                      ]),
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("p", {
                                          class: ["text-sm font-bold", ingrediente.id_pessoa ? "text-green-700" : "text-gray-700"]
                                        }, " R$ " + toDisplayString(formatarValor(ingrediente.valor_total)), 3),
                                        createVNode("button", {
                                          onClick: ($event) => editarIngrediente(ingrediente, cardapio.id),
                                          class: "text-blue-600 hover:text-blue-800",
                                          title: "Editar"
                                        }, [
                                          createVNode("i", { class: "fa fa-edit" })
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          onClick: ($event) => removerIngrediente(ingrediente.id),
                                          class: "text-red-600 hover:text-red-800",
                                          title: "Remover"
                                        }, [
                                          createVNode("i", { class: "fa fa-trash" })
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("div", { class: "flex-1" }, [
                                          createVNode(Autocomplete, {
                                            modelValue: ingrediente.id_pessoa,
                                            placeholder: "Pessoa responsável...",
                                            "onUpdate:modelValue": (pessoa) => associarPessoaIngrediente(ingrediente.id, pessoa),
                                            class: "text-sm"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        ingrediente.id_pessoa ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          onClick: ($event) => removerPessoaIngrediente(ingrediente.id),
                                          class: "text-red-600 hover:text-red-800 text-sm",
                                          title: "Remover pessoa"
                                        }, [
                                          createVNode("i", { class: "fa fa-times" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "mt-1" }, [
                                        ingrediente.pessoa ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-xs text-green-600"
                                        }, " ✓ " + toDisplayString(ingrediente.pessoa.nome) + " - Valor não entra no gasto do evento ", 1)) : (openBlock(), createBlock("p", {
                                          key: 1,
                                          class: "text-xs text-yellow-600"
                                        }, " ⚠️ Sem responsável - Valor entra no gasto do evento "))
                                      ])
                                    ])
                                  ], 2);
                                }), 128))
                              ])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-sm text-gray-500 text-center py-2"
                            }, " Nenhum ingrediente neste cardápio "))
                          ]);
                        }), 128)),
                        cardapiosEvento.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-4"
                        }, " Nenhum cardápio importado ainda ")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card" }, [
                    createVNode("div", { class: "card-header" }, [
                      createVNode("h3", { class: "text-xl font-semibold" }, "Doações do Evento")
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("div", { class: "mb-4 p-4 bg-gray-50 rounded-lg" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Registrar Doação"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "pessoa_doacao",
                              value: "Buscar Pessoa",
                              class: "required"
                            }),
                            createVNode(Autocomplete, {
                              modelValue: novaDoacao.value.id_pessoa,
                              "onUpdate:modelValue": [($event) => novaDoacao.value.id_pessoa = $event, onPessoaDoacaoSelecionada],
                              placeholder: "Digite o nome da pessoa..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.id_pessoa_doacao
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$1, {
                              for: "valor",
                              value: "Valor (R$)",
                              class: "required"
                            }),
                            createVNode(_sfc_main$3, {
                              id: "valor",
                              modelValue: novaDoacao.value.valor,
                              "onUpdate:modelValue": ($event) => novaDoacao.value.valor = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              placeholder: "0.00",
                              class: "mt-1 block w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$2, {
                              message: errors.value.valor
                            }, null, 8, ["message"])
                          ]),
                          createVNode("button", {
                            onClick: adicionarDoacao,
                            disabled: processing.value,
                            class: "btn btn-primary w-full"
                          }, [
                            createVNode("i", { class: "fa fa-plus mr-2" }),
                            createTextVNode(" Registrar Doação ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h4", { class: "font-semibold mb-3" }, "Doações Registradas"),
                        (openBlock(true), createBlock(Fragment, null, renderList(doacoesEvento.value, (doacao) => {
                          return openBlock(), createBlock("div", {
                            key: doacao.id,
                            class: "flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50"
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(doacao.pessoa.nome), 1),
                              createVNode("p", { class: "text-sm text-green-600 font-semibold" }, " R$ " + toDisplayString(formatarValor(doacao.valor)), 1)
                            ]),
                            createVNode("button", {
                              onClick: ($event) => removerDoacao(doacao.id),
                              class: "text-red-600 hover:text-red-800",
                              title: "Remover"
                            }, [
                              createVNode("i", { class: "fa fa-trash" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128)),
                        doacoesEvento.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center text-gray-500 py-4"
                        }, " Nenhuma doação registrada ainda ")) : createCommentVNode("", true),
                        doacoesEvento.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                        }, [
                          createVNode("p", { class: "text-lg font-semibold text-green-800" }, " Total de Doações: R$ " + toDisplayString(formatarValor(totalDoacoes.value)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("button", {
                    onClick: voltar,
                    class: "btn btn-secondary"
                  }, [
                    createVNode("i", { class: "fa fa-arrow-left mr-2" }),
                    createTextVNode(" Voltar ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventosInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventosInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ccee39d2"]]);
export {
  EventosInfo as default
};
