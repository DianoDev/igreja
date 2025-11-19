import { inject, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import "./AutoCompletePessoa-DFTP1mc1.js";
import { useToast } from "vue-toastification";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EventoCardapioIngredienteForm",
  __ssrInlineRender: true,
  props: {
    ingrediente: {
      type: Object,
      default: null
    },
    idCardapioEvento: {
      type: Number,
      required: true
    },
    onSuccess: {
      type: Function,
      default: () => {
      }
    },
    onClose: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(__props) {
    inject("events");
    const props = __props;
    useToast();
    const processing = ref(false);
    const errors = ref({});
    const form = ref({
      nome: "",
      quantidade: "",
      unidade_medida: "",
      valor_unitario: "",
      id_pessoa: null
    });
    onMounted(() => {
      if (props.ingrediente) {
        form.value = {
          nome: props.ingrediente.nome || "",
          quantidade: props.ingrediente.quantidade || "",
          unidade_medida: props.ingrediente.unidade_medida || "",
          valor_unitario: props.ingrediente.valor_unitario || "",
          id_pessoa: props.ingrediente.id_pessoa || null
        };
      }
    });
    function calcularValorTotal() {
      const quantidade = parseFloat(form.value.quantidade) || 0;
      const valorUnitario = parseFloat(form.value.valor_unitario) || 0;
      const total = quantidade * valorUnitario;
      return formatarValor(total);
    }
    function formatarValor(valor) {
      return parseFloat(valor || 0).toFixed(2).replace(".", ",");
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-201f1052><form class="space-y-4" data-v-201f1052><div data-v-201f1052>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "nome",
        value: "Nome do Ingrediente",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "nome",
        modelValue: form.value.nome,
        "onUpdate:modelValue": ($event) => form.value.nome = $event,
        type: "text",
        placeholder: "Ex: Arroz, Feijão, Carne...",
        class: "mt-1 block w-full",
        autofocus: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.nome
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-3" data-v-201f1052><div data-v-201f1052>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "quantidade",
        value: "Quantidade",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "quantidade",
        modelValue: form.value.quantidade,
        "onUpdate:modelValue": ($event) => form.value.quantidade = $event,
        type: "number",
        step: "0.01",
        min: "0",
        placeholder: "0.00",
        class: "mt-1 block w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.quantidade
      }, null, _parent));
      _push(`</div><div data-v-201f1052>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "unidade_medida",
        value: "Unidade",
        class: "required"
      }, null, _parent));
      _push(`<select id="unidade_medida" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" data-v-201f1052><option value="" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "") : ssrLooseEqual(form.value.unidade_medida, "")) ? " selected" : ""}>Selecione</option><option value="kg" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "kg") : ssrLooseEqual(form.value.unidade_medida, "kg")) ? " selected" : ""}>kg (quilograma)</option><option value="g" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "g") : ssrLooseEqual(form.value.unidade_medida, "g")) ? " selected" : ""}>g (grama)</option><option value="l" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "l") : ssrLooseEqual(form.value.unidade_medida, "l")) ? " selected" : ""}>l (litro)</option><option value="ml" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "ml") : ssrLooseEqual(form.value.unidade_medida, "ml")) ? " selected" : ""}>ml (mililitro)</option><option value="un" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "un") : ssrLooseEqual(form.value.unidade_medida, "un")) ? " selected" : ""}>unidade</option><option value="cx" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "cx") : ssrLooseEqual(form.value.unidade_medida, "cx")) ? " selected" : ""}>caixa</option><option value="pct" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "pct") : ssrLooseEqual(form.value.unidade_medida, "pct")) ? " selected" : ""}>pacote</option><option value="dz" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "dz") : ssrLooseEqual(form.value.unidade_medida, "dz")) ? " selected" : ""}>dúzia</option><option value="lata" data-v-201f1052${ssrIncludeBooleanAttr(Array.isArray(form.value.unidade_medida) ? ssrLooseContain(form.value.unidade_medida, "lata") : ssrLooseEqual(form.value.unidade_medida, "lata")) ? " selected" : ""}>lata</option></select>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.unidade_medida
      }, null, _parent));
      _push(`</div></div><div data-v-201f1052>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "valor_unitario",
        value: "Valor Unitário (R$)",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "valor_unitario",
        modelValue: form.value.valor_unitario,
        "onUpdate:modelValue": ($event) => form.value.valor_unitario = $event,
        type: "number",
        step: "0.01",
        min: "0",
        placeholder: "0.00",
        class: "mt-1 block w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.valor_unitario
      }, null, _parent));
      _push(`</div><div class="p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-201f1052><p class="text-sm text-blue-700 font-medium mb-1" data-v-201f1052>Valor Total</p><p class="text-2xl font-bold text-blue-900" data-v-201f1052> R$ ${ssrInterpolate(calcularValorTotal())}</p><p class="text-xs text-blue-600 mt-1" data-v-201f1052>${ssrInterpolate(form.value.quantidade || 0)} ${ssrInterpolate(form.value.unidade_medida || "un")} × R$ ${ssrInterpolate(formatarValor(form.value.valor_unitario))}</p></div><div class="flex justify-end gap-2 pt-4 border-t" data-v-201f1052><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-201f1052> Cancelar </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-201f1052><i class="fa fa-save mr-2" data-v-201f1052></i> ${ssrInterpolate(((_a = __props.ingrediente) == null ? void 0 : _a.id) ? "Atualizar" : "Salvar")}</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventoCardapioIngredienteForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventoCardapioIngredienteForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-201f1052"]]);
export {
  EventoCardapioIngredienteForm as default
};
