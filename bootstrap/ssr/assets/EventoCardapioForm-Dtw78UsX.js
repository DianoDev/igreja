import { inject, ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import { useToast } from "vue-toastification";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "EventoCardapioForm",
  __ssrInlineRender: true,
  props: {
    cardapio: {
      type: Object,
      default: null
    },
    idEvento: {
      type: Number,
      required: false
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
      descricao: "",
      ingredientes: []
    });
    onMounted(() => {
      var _a;
      if (props.cardapio) {
        form.value = {
          nome: props.cardapio.nome || "",
          descricao: props.cardapio.descricao || "",
          ingredientes: ((_a = props.cardapio.ingredientes) == null ? void 0 : _a.map((ing) => ({
            id: ing.id,
            nome: ing.nome || "",
            quantidade: ing.quantidade || "",
            unidade_medida: ing.unidade_medida || "",
            valor_unitario: ing.valor_unitario || ""
          }))) || []
        };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-cf83e871><form class="space-y-4" data-v-cf83e871><div data-v-cf83e871>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "nome",
        value: "Nome",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "nome",
        modelValue: form.value.nome,
        "onUpdate:modelValue": ($event) => form.value.nome = $event,
        type: "text",
        placeholder: "Nome do cardápio",
        class: "mt-1 block w-full",
        autofocus: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.nome
      }, null, _parent));
      _push(`</div><div data-v-cf83e871>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "descricao",
        value: "Descrição"
      }, null, _parent));
      _push(`<textarea id="descricao" rows="3" placeholder="Descrição do cardápio" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" data-v-cf83e871>${ssrInterpolate(form.value.descricao)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.descricao
      }, null, _parent));
      _push(`</div><div class="flex justify-end gap-2 pt-4 border-t" data-v-cf83e871><button type="button" class="btn btn-secondary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-cf83e871> Cancelar </button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-cf83e871><i class="fa fa-save mr-2" data-v-cf83e871></i> ${ssrInterpolate(((_a = __props.cardapio) == null ? void 0 : _a.id) ? "Atualizar" : "Salvar")}</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventoCardapioForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EventoCardapioForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf83e871"]]);
export {
  EventoCardapioForm as default
};
