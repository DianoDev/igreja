import { ref, inject, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import _sfc_main$1 from "./InputLabel-CDsQQ3SF.js";
import _sfc_main$3 from "./InputError-DKvItylr.js";
import _sfc_main$2 from "./TextInput-BEEeI7hx.js";
import { useToast } from "vue-toastification";
const _sfc_main = {
  __name: "AtaForm",
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
    const acao = ref("/admin/atas/");
    inject("events");
    const toast = useToast();
    const errors = ref({});
    const processing = ref(false);
    const ready = ref(false);
    const readOnly = ref(false);
    const selectedFile = ref(null);
    const selectedFileName = ref("");
    const arquivoExistente = ref(null);
    const arquivoRemovido = ref(false);
    const form = ref({
      nome: "",
      descricao: "",
      titulo_arquivo: "",
      descricao_arquivo: ""
    });
    function formatFileSize(bytes) {
      if (!bytes) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    }
    function formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    }
    const loadData = async () => {
      try {
        const response = await axios.get(`/admin/atas/${props.data.id}`);
        Object.keys(form.value).forEach((key) => {
          if (response.data[key] !== void 0) {
            form.value[key] = response.data[key];
          }
        });
        if (response.data.arquivo) {
          arquivoExistente.value = response.data.arquivo;
          form.value.titulo_arquivo = response.data.arquivo.titulo || response.data.arquivo.nome;
          form.value.descricao_arquivo = response.data.arquivo.descricao || "";
        }
        console.log(response.data);
        readOnly.value = Boolean(props.data.readOnly);
      } catch (err) {
        console.error("Error loading data:", err);
        toast.error("Não foi possível recuperar os dados da Ata.");
      } finally {
        ready.value = true;
      }
    };
    onMounted(async () => {
      var _a;
      if ((_a = props.data) == null ? void 0 : _a.id) {
        acao.value = `/admin/atas/${props.data.id}`;
        await loadData();
      } else {
        ready.value = true;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (ready.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "m-2" }, _attrs))}><form><div class="mb-4">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "nome",
          value: "Nome",
          class: "required"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "nome",
          class: "w-full",
          modelValue: form.value.nome,
          "onUpdate:modelValue": ($event) => form.value.nome = $event,
          disabled: readOnly.value
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.nome
        }, null, _parent));
        _push(`</div><div class="mb-4">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          for: "descricao",
          value: "Descrição",
          class: "required"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          id: "descricao",
          class: "w-full",
          modelValue: form.value.descricao,
          "onUpdate:modelValue": ($event) => form.value.descricao = $event,
          disabled: readOnly.value
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: errors.value.descricao
        }, null, _parent));
        _push(`</div>`);
        if (!readOnly.value) {
          _push(`<div class="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50"><h3 class="text-lg font-semibold mb-3 text-gray-700"><i class="fa fa-paperclip mr-2"></i>Anexar Arquivo </h3>`);
          if (arquivoExistente.value && !arquivoRemovido.value && !selectedFile.value) {
            _push(`<div class="mb-3 p-3 bg-green-50 border border-green-200 rounded-md"><div class="flex items-center justify-between"><div><p class="text-sm text-green-800"><i class="fa fa-file-pdf mr-2"></i><strong>Arquivo atual:</strong> ${ssrInterpolate(arquivoExistente.value.nome)}</p><p class="text-xs text-green-600 mt-1"> Tamanho: ${ssrInterpolate(formatFileSize(arquivoExistente.value.tamanho))} | Enviado em: ${ssrInterpolate(formatDate(arquivoExistente.value.created_at))}</p></div><button type="button" class="text-red-600 hover:text-red-800 text-sm" title="Remover arquivo"><i class="fa fa-trash"></i></button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (arquivoRemovido.value) {
            _push(`<div class="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md"><div class="flex items-center justify-between"><p class="text-sm text-yellow-800"><i class="fa fa-exclamation-triangle mr-2"></i><strong>Arquivo será removido ao salvar</strong></p><button type="button" class="text-blue-600 hover:text-blue-800 text-sm" title="Cancelar remoção"><i class="fa fa-undo"></i> Desfazer </button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (!arquivoExistente.value || arquivoRemovido.value) {
            _push(`<div class="mb-3">`);
            _push(ssrRenderComponent(_sfc_main$1, {
              for: "arquivo",
              value: "Arquivo (Opcional)"
            }, null, _parent));
            _push(`<div class="mt-1"><label for="arquivo" class="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"><div class="text-center"><i class="fa fa-upload text-gray-400 text-2xl mb-2"></i><p class="text-sm text-gray-600"><span class="font-semibold text-blue-600">Clique para selecionar</span> ou arraste o arquivo </p><p class="text-xs text-gray-500 mt-1"> PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Máx: 10MB) </p></div></label><input id="arquivo" type="file" class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"></div>`);
            _push(ssrRenderComponent(_sfc_main$3, {
              message: errors.value.arquivo
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedFileName.value) {
            _push(`<div class="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md"><div class="flex items-center justify-between"><p class="text-sm text-blue-800"><i class="fa fa-file mr-2"></i><strong>Novo arquivo selecionado:</strong> ${ssrInterpolate(selectedFileName.value)}</p><button type="button" class="text-red-600 hover:text-red-800 text-sm" title="Remover seleção"><i class="fa fa-times"></i></button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedFile.value || arquivoExistente.value && !arquivoRemovido.value) {
            _push(`<div class="mb-3">`);
            _push(ssrRenderComponent(_sfc_main$1, {
              for: "titulo_arquivo",
              value: "Título do Arquivo (Opcional)"
            }, null, _parent));
            _push(ssrRenderComponent(_sfc_main$2, {
              id: "titulo_arquivo",
              class: "w-full",
              modelValue: form.value.titulo_arquivo,
              "onUpdate:modelValue": ($event) => form.value.titulo_arquivo = $event,
              placeholder: "Ex: Ata da Reunião de Janeiro"
            }, null, _parent));
            _push(`<p class="mt-1 text-sm text-gray-500"> Se não informado, será usado o nome original do arquivo </p>`);
            _push(ssrRenderComponent(_sfc_main$3, {
              message: errors.value.titulo_arquivo
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (readOnly.value && arquivoExistente.value) {
          _push(`<div class="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50"><h3 class="text-lg font-semibold mb-3 text-gray-700"><i class="fa fa-paperclip mr-2"></i>Arquivo Anexo </h3><div class="p-3 bg-blue-50 border border-blue-200 rounded-md"><p class="text-sm text-blue-800"><i class="fa fa-file-pdf mr-2"></i><strong>${ssrInterpolate(arquivoExistente.value.titulo || arquivoExistente.value.nome)}</strong></p><p class="text-xs text-blue-600 mt-1"> Tamanho: ${ssrInterpolate(formatFileSize(arquivoExistente.value.tamanho))}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="w-full pt-4 mt-4 border-t border-gray-200">`);
        if (readOnly.value) {
          _push(`<div class="flex justify-center"><button type="button" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"><i class="mr-1 fa fa-close"></i> Sair </button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!readOnly.value) {
          _push(`<div class="flex justify-center space-x-2"><button type="submit" class="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""}>`);
          if (!processing.value) {
            _push(`<i class="mr-1 fa fa-check"></i>`);
          } else {
            _push(`<i class="mr-1 fa fa-spinner fa-spin"></i>`);
          }
          _push(` ${ssrInterpolate(processing.value ? "Salvando..." : "Salvar")}</button><button type="button" class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"><i class="mr-1 fa fa-close"></i> Cancelar </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Ata/AtaForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
