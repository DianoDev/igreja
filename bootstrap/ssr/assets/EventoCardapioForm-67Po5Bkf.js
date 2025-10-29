import { inject, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EventoCardapioForm",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Number,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const toast = useToast();
    inject("events");
    const loading = ref(true);
    const processing = ref(false);
    const errors = ref({});
    const cardapios = ref([]);
    const cardapiosSelecionados = ref([]);
    const valorTotal = ref(0);
    async function carregarDados() {
      loading.value = true;
      try {
        const response = await axios.get(`/admin/cardapio-evento/${props.data.id}/edit`);
        cardapios.value = response.data.cardapios;
        cardapiosSelecionados.value = response.data.selecionados;
        valorTotal.value = response.data.valor_total;
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar os cardápios");
      } finally {
        loading.value = false;
      }
    }
    function formatarValor(valor) {
      return parseFloat(valor || 0).toFixed(2).replace(".", ",");
    }
    onMounted(() => {
      console.log(props.id);
      carregarDados();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))} data-v-fb3aae09>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-8" data-v-fb3aae09><i class="fa fa-spinner fa-spin text-3xl text-blue-600" data-v-fb3aae09></i></div>`);
      } else {
        _push(`<div data-v-fb3aae09><div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-fb3aae09><p class="text-lg font-semibold text-blue-900" data-v-fb3aae09> Valor Total do Evento: R$ ${ssrInterpolate(formatarValor(valorTotal.value))}</p></div><div class="space-y-3 max-h-96 overflow-y-auto" data-v-fb3aae09><!--[-->`);
        ssrRenderList(cardapios.value, (cardapio) => {
          _push(`<div class="${ssrRenderClass([{
            "bg-blue-50 border-blue-300": cardapiosSelecionados.value.includes(cardapio.id),
            "bg-white border-gray-200": !cardapiosSelecionados.value.includes(cardapio.id)
          }, "flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"])}" data-v-fb3aae09><input${ssrRenderAttr("id", `cardapio-${cardapio.id}`)} type="checkbox"${ssrRenderAttr("value", cardapio.id)}${ssrIncludeBooleanAttr(Array.isArray(cardapiosSelecionados.value) ? ssrLooseContain(cardapiosSelecionados.value, cardapio.id) : cardapiosSelecionados.value) ? " checked" : ""} class="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" data-v-fb3aae09><label${ssrRenderAttr("for", `cardapio-${cardapio.id}`)} class="ml-3 flex-1 cursor-pointer" data-v-fb3aae09><div class="flex justify-between items-start" data-v-fb3aae09><div class="flex-1" data-v-fb3aae09><p class="font-semibold text-gray-900" data-v-fb3aae09>${ssrInterpolate(cardapio.nome)}</p>`);
          if (cardapio.descricao) {
            _push(`<p class="text-sm text-gray-600 mt-1" data-v-fb3aae09>${ssrInterpolate(cardapio.descricao)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="ml-4 text-right" data-v-fb3aae09><p class="font-bold text-green-600" data-v-fb3aae09> R$ ${ssrInterpolate(formatarValor(cardapio.valor_total))}</p></div></div></label></div>`);
        });
        _push(`<!--]-->`);
        if (cardapios.value.length === 0) {
          _push(`<div class="text-center text-gray-500 py-8" data-v-fb3aae09><i class="fa fa-utensils text-4xl mb-3" data-v-fb3aae09></i><p data-v-fb3aae09>Nenhum cardápio cadastrado</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (errors.value.cardapios) {
          _push(`<div class="mt-3 text-sm text-red-600" data-v-fb3aae09>${ssrInterpolate(errors.value.cardapios)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-6 flex justify-end space-x-3" data-v-fb3aae09><button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-fb3aae09> Cancelar </button><button type="button" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"${ssrIncludeBooleanAttr(processing.value || cardapiosSelecionados.value.length === 0) ? " disabled" : ""} data-v-fb3aae09>`);
        if (processing.value) {
          _push(`<i class="fa fa-spinner fa-spin mr-2" data-v-fb3aae09></i>`);
        } else {
          _push(`<i class="fa fa-save mr-2" data-v-fb3aae09></i>`);
        }
        _push(` ${ssrInterpolate(processing.value ? "Salvando..." : "Salvar Cardápios")}</button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventoCardapioForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventoCardapioForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fb3aae09"]]);
export {
  EventoCardapioForm as default
};
