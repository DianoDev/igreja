import { ref, inject, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import { useToast } from "vue-toastification";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ComissaoForm",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: null,
      required: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const acao = ref("/admin/comissao/create");
    inject("events");
    const toast = useToast();
    const errors = ref({});
    const processing = ref(false);
    const ready = ref(false);
    const readOnly = ref(false);
    const form = ref({
      nome: "",
      ano: (/* @__PURE__ */ new Date()).getFullYear()
    });
    const loadData = async () => {
      try {
        const response = await axios.get(`/admin/comissao/${props.data.id}`);
        Object.keys(form.value).forEach((key) => {
          if (response.data[key] !== void 0) {
            form.value[key] = response.data[key];
          }
        });
        readOnly.value = Boolean(props.data.readOnly);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Não foi possível recuperar os dados da comissão.");
      } finally {
        ready.value = true;
      }
    };
    onMounted(() => {
      var _a;
      if ((_a = props.data) == null ? void 0 : _a.id) {
        acao.value = `/admin/comissao/${props.data.id}`;
        loadData();
      } else {
        ready.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-4992430e><form data-v-4992430e><div class="space-y-4" data-v-4992430e><div data-v-4992430e>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "nome",
        value: "Nome da Comissão",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "nome",
        modelValue: form.value.nome,
        "onUpdate:modelValue": ($event) => form.value.nome = $event,
        type: "text",
        class: "mt-1 block w-full",
        disabled: readOnly.value,
        placeholder: "Ex: Comissão de Festas"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.nome ? errors.value.nome[0] : "",
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div data-v-4992430e>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        for: "ano",
        value: "Ano",
        class: "required"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        id: "ano",
        modelValue: form.value.ano,
        "onUpdate:modelValue": ($event) => form.value.ano = $event,
        type: "number",
        class: "mt-1 block w-full",
        disabled: readOnly.value,
        placeholder: "Ex: 2025",
        min: "2000",
        max: "2100"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        message: errors.value.ano ? errors.value.ano[0] : "",
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="flex justify-center gap-3 pt-4" data-v-4992430e>`);
      if (!readOnly.value) {
        _push(`<button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-4992430e><i class="mr-1 fa fa-save" data-v-4992430e></i> ${ssrInterpolate(processing.value ? "Salvando..." : "Salvar")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700" data-v-4992430e><i class="mr-1 fa fa-close" data-v-4992430e></i> Cancelar </button></div></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Comissao/ComissaoForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ComissaoForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4992430e"]]);
export {
  ComissaoForm as default
};
