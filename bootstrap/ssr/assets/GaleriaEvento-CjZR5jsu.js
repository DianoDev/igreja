import { ref, computed, onMounted, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, withModifiers, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import "./AuthenticatedLayout-DyvGWEOW.js";
import { useToast } from "vue-toastification";
import { L as LayoutPrincipal } from "./LayoutPrincipal-Bz1Wo-ND.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ApplicationLogo-kz99UxNd.js";
import "./Dropdown-jKwN3SeX.js";
import "./DropdownLink-CS6OTd7u.js";
import "./NavLink-OTmYlOWh.js";
import "./ResponsiveNavLink-C9P1mtob.js";
import "./Modal-D4SsQX3D.js";
import "axios";
const _sfc_main = {
  __name: "GaleriaEvento",
  __ssrInlineRender: true,
  props: {
    idEvento: {
      type: Number,
      required: true
    },
    evento: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const toast = useToast();
    const loading = ref(true);
    const uploading = ref(false);
    const fotos = ref([]);
    const fotosParaUpload = ref([]);
    const fotosSelecionadas = ref([]);
    const modalAberto = ref(false);
    const fotoSelecionadaModal = ref(null);
    const modalEdicaoAberto = ref(false);
    const fotoParaEditar = ref({});
    computed(() => {
      const total = fotos.value.reduce((sum, foto) => sum + (foto.tamanho || 0), 0);
      return formatFileSize(total);
    });
    onMounted(() => {
      console.log(props);
      carregarGaleria();
    });
    async function carregarGaleria() {
      loading.value = true;
      try {
        const response = await axios.get(`/admin/evento/${props.idEvento}/galeria/list`);
        fotos.value = response.data.fotos;
      } catch (error) {
        console.error("Erro ao carregar galeria:", error);
        toast.error("Erro ao carregar galeria de fotos");
      } finally {
        loading.value = false;
      }
    }
    function handleFileSelect(event) {
      const files = Array.from(event.target.files);
      adicionarFotosParaUpload(files);
    }
    function handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      adicionarFotosParaUpload(files);
    }
    function adicionarFotosParaUpload(files) {
      if (fotosParaUpload.value.length + files.length > 20) {
        toast.warning("Você pode enviar no máximo 20 fotos por vez");
        return;
      }
      files.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`A foto ${file.name} excede o tamanho máximo de 10MB`);
          return;
        }
        if (!file.type.startsWith("image/")) {
          toast.error(`O arquivo ${file.name} não é uma imagem válida`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          fotosParaUpload.value.push({
            file,
            preview: e.target.result
          });
        };
        reader.readAsDataURL(file);
      });
    }
    function removerFotoSelecao(index) {
      fotosParaUpload.value.splice(index, 1);
    }
    function limparSelecao() {
      fotosParaUpload.value = [];
    }
    async function uploadFotos() {
      var _a, _b;
      if (fotosParaUpload.value.length === 0) {
        toast.warning("Selecione pelo menos uma foto");
        return;
      }
      uploading.value = true;
      const formData = new FormData();
      fotosParaUpload.value.forEach((foto, index) => {
        formData.append(`fotos[${index}]`, foto.file);
      });
      try {
        const response = await axios.post(`/admin/evento/${props.idEvento}/galeria/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        toast.success(response.data.message);
        fotosParaUpload.value = [];
        await carregarGaleria();
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Erro ao fazer upload das fotos");
        }
      } finally {
        uploading.value = false;
      }
    }
    function toggleSelecao(id) {
      const index = fotosSelecionadas.value.indexOf(id);
      if (index > -1) {
        fotosSelecionadas.value.splice(index, 1);
      } else {
        fotosSelecionadas.value.push(id);
      }
    }
    function isSelecionada(id) {
      return fotosSelecionadas.value.includes(id);
    }
    function selecionarTodas() {
      fotosSelecionadas.value = fotos.value.map((f) => f.id);
    }
    function deselecionarTodas() {
      fotosSelecionadas.value = [];
    }
    async function excluirSelecionadas() {
      if (fotosSelecionadas.value.length === 0) {
        toast.warning("Selecione pelo menos uma foto");
        return;
      }
      if (!confirm(`Deseja realmente excluir ${fotosSelecionadas.value.length} foto(s)?`)) {
        return;
      }
      try {
        await axios.post(`/admin/evento/${props.idEvento}/galeria/excluir-multiplas`, {
          ids: fotosSelecionadas.value
        });
        toast.success("Fotos excluídas com sucesso!");
        fotosSelecionadas.value = [];
        await carregarGaleria();
      } catch (error) {
        console.error("Erro ao excluir fotos:", error);
        toast.error("Erro ao excluir fotos");
      }
    }
    async function excluirFoto(id) {
      if (!confirm("Deseja realmente excluir esta foto?")) {
        return;
      }
      try {
        await axios.delete(`/admin/evento/${props.idEvento}/galeria/${id}`);
        toast.success("Foto excluída com sucesso!");
        await carregarGaleria();
      } catch (error) {
        console.error("Erro ao excluir foto:", error);
        toast.error("Erro ao excluir foto");
      }
    }
    function editarFoto(foto) {
      fotoParaEditar.value = {
        id: foto.id,
        titulo: foto.titulo || foto.nome,
        descricao: foto.descricao || ""
      };
      modalEdicaoAberto.value = true;
    }
    async function salvarEdicao() {
      try {
        await axios.put(`/admin/evento/${props.idEvento}/galeria/${fotoParaEditar.value.id}`, {
          titulo: fotoParaEditar.value.titulo,
          descricao: fotoParaEditar.value.descricao
        });
        toast.success("Foto atualizada com sucesso!");
        fecharModalEdicao();
        await carregarGaleria();
      } catch (error) {
        console.error("Erro ao atualizar foto:", error);
        toast.error("Erro ao atualizar foto");
      }
    }
    function fecharModalEdicao() {
      modalEdicaoAberto.value = false;
      fotoParaEditar.value = {};
    }
    function abrirModal(foto) {
      fotoSelecionadaModal.value = foto;
      modalAberto.value = true;
    }
    function fecharModal() {
      modalAberto.value = false;
      fotoSelecionadaModal.value = null;
    }
    function getImageUrl(hash) {
      if (!hash) return "";
      const match = hash.match(/public\/uploads\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)/);
      if (match) {
        const [, ano, mes, dia, filename] = match;
        return `/storage/uploads/${ano}/${mes}/${dia}/${filename}`;
      }
      return `/storage/${hash.replace("public/", "")}`;
    }
    function handleImageError(event) {
      event.target.src = "/images/placeholder.jpg";
    }
    function formatFileSize(bytes) {
      if (!bytes) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    }
    function formatarData(data) {
      if (!data) return "";
      return new Date(data).toLocaleDateString("pt-BR");
    }
    function formatarDataHora(dataHora) {
      if (!dataHora) return "";
      return new Date(dataHora).toLocaleString("pt-BR");
    }
    function voltarParaEvento() {
      router.visit(`/admin/eventos`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Galeria de Fotos" }, null, _parent));
      _push(ssrRenderComponent(LayoutPrincipal, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="py-6" data-v-92043048${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8" data-v-92043048${_scopeId}><div class="flex items-center justify-between mb-10" data-v-92043048${_scopeId}><div data-v-92043048${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight" data-v-92043048${_scopeId}> 📸 Galeria de Fotos </h2>`);
            if (__props.evento) {
              _push2(`<p class="text-sm text-gray-600 mt-1" data-v-92043048${_scopeId}> Evento: <strong data-v-92043048${_scopeId}>${ssrInterpolate(__props.evento.nome)}</strong> - ${ssrInterpolate(formatarData(__props.evento.data))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition" data-v-92043048${_scopeId}><i class="fa fa-arrow-left mr-2" data-v-92043048${_scopeId}></i>Voltar </button></div><div class="bg-white rounded-lg shadow-md p-6 mb-6" data-v-92043048${_scopeId}><h3 class="text-lg font-semibold mb-4 flex items-center" data-v-92043048${_scopeId}><i class="fa fa-upload mr-2 text-blue-600" data-v-92043048${_scopeId}></i> Adicionar Fotos </h3><div class="mb-4" data-v-92043048${_scopeId}><label for="fotos-upload" class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors" data-v-92043048${_scopeId}><div class="flex flex-col items-center justify-center pt-5 pb-6" data-v-92043048${_scopeId}><i class="fa fa-cloud-upload text-6xl text-gray-400 mb-3" data-v-92043048${_scopeId}></i><p class="mb-2 text-sm text-gray-500" data-v-92043048${_scopeId}><span class="font-semibold" data-v-92043048${_scopeId}>Clique para selecionar</span> ou arraste as fotos aqui </p><p class="text-xs text-gray-500" data-v-92043048${_scopeId}> JPG, PNG, GIF, WEBP (máx. 10MB por foto - até 20 fotos por vez) </p></div></label><input id="fotos-upload" type="file" multiple accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" class="hidden" data-v-92043048${_scopeId}></div>`);
            if (fotosParaUpload.value.length > 0) {
              _push2(`<div class="mt-4" data-v-92043048${_scopeId}><div class="flex items-center justify-between mb-3" data-v-92043048${_scopeId}><p class="text-sm font-semibold text-gray-700" data-v-92043048${_scopeId}>${ssrInterpolate(fotosParaUpload.value.length)} foto(s) selecionada(s) </p><button class="text-sm text-red-600 hover:text-red-700" data-v-92043048${_scopeId}><i class="fa fa-times mr-1" data-v-92043048${_scopeId}></i>Limpar </button></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" data-v-92043048${_scopeId}><!--[-->`);
              ssrRenderList(fotosParaUpload.value, (foto, index) => {
                _push2(`<div class="relative group" data-v-92043048${_scopeId}><img${ssrRenderAttr("src", foto.preview)}${ssrRenderAttr("alt", foto.file.name)} class="w-full h-24 object-cover rounded-lg border-2 border-gray-200" data-v-92043048${_scopeId}><button class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" data-v-92043048${_scopeId}><i class="fa fa-times text-xs" data-v-92043048${_scopeId}></i></button></div>`);
              });
              _push2(`<!--]--></div><div class="mt-4 flex gap-2" data-v-92043048${_scopeId}><button${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed" data-v-92043048${_scopeId}>`);
              if (!uploading.value) {
                _push2(`<i class="fa fa-check mr-2" data-v-92043048${_scopeId}></i>`);
              } else {
                _push2(`<i class="fa fa-spinner fa-spin mr-2" data-v-92043048${_scopeId}></i>`);
              }
              _push2(` ${ssrInterpolate(uploading.value ? "Enviando..." : "Enviar Fotos")}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-md p-6 mb-6" data-v-92043048${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-92043048${_scopeId}><div class="bg-blue-50 rounded-lg p-4 border border-blue-200" data-v-92043048${_scopeId}><div class="flex items-center" data-v-92043048${_scopeId}><i class="fa fa-images text-3xl text-blue-600 mr-3" data-v-92043048${_scopeId}></i><div data-v-92043048${_scopeId}><p class="text-sm text-gray-600" data-v-92043048${_scopeId}>Total de Fotos</p><p class="text-2xl font-bold text-gray-800" data-v-92043048${_scopeId}>${ssrInterpolate(fotos.value.length)}</p></div></div></div><div class="bg-green-50 rounded-lg p-4 border border-green-200" data-v-92043048${_scopeId}><div class="flex items-center" data-v-92043048${_scopeId}><i class="fa fa-check-circle text-3xl text-green-600 mr-3" data-v-92043048${_scopeId}></i><div data-v-92043048${_scopeId}><p class="text-sm text-gray-600" data-v-92043048${_scopeId}>Selecionadas</p><p class="text-2xl font-bold text-gray-800" data-v-92043048${_scopeId}>${ssrInterpolate(fotosSelecionadas.value.length)}</p></div></div></div></div></div>`);
            if (fotosSelecionadas.value.length > 0) {
              _push2(`<div class="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6" data-v-92043048${_scopeId}><div class="flex items-center justify-between" data-v-92043048${_scopeId}><p class="text-sm font-semibold text-amber-800" data-v-92043048${_scopeId}>${ssrInterpolate(fotosSelecionadas.value.length)} foto(s) selecionada(s) </p><div class="flex gap-2" data-v-92043048${_scopeId}><button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm" data-v-92043048${_scopeId}><i class="fa fa-times mr-1" data-v-92043048${_scopeId}></i>Desmarcar Todas </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm" data-v-92043048${_scopeId}><i class="fa fa-trash mr-1" data-v-92043048${_scopeId}></i>Excluir Selecionadas </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-md p-6" data-v-92043048${_scopeId}><div class="flex items-center justify-between mb-4" data-v-92043048${_scopeId}><h3 class="text-lg font-semibold flex items-center" data-v-92043048${_scopeId}><i class="fa fa-images mr-2 text-purple-600" data-v-92043048${_scopeId}></i> Fotos do Evento </h3><div class="flex gap-2" data-v-92043048${_scopeId}>`);
            if (fotos.value.length > 0) {
              _push2(`<button class="text-sm text-blue-600 hover:text-blue-700" data-v-92043048${_scopeId}><i class="fa fa-check-square mr-1" data-v-92043048${_scopeId}></i>Selecionar Todas </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (loading.value) {
              _push2(`<div class="flex items-center justify-center py-12" data-v-92043048${_scopeId}><i class="fa fa-spinner fa-spin text-4xl text-gray-400" data-v-92043048${_scopeId}></i></div>`);
            } else if (fotos.value.length === 0) {
              _push2(`<div class="text-center py-12" data-v-92043048${_scopeId}><i class="fa fa-images text-6xl text-gray-300 mb-4" data-v-92043048${_scopeId}></i><p class="text-gray-500" data-v-92043048${_scopeId}>Nenhuma foto adicionada ainda</p><p class="text-sm text-gray-400 mt-2" data-v-92043048${_scopeId}>Faça upload de fotos usando o campo acima</p></div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-92043048${_scopeId}><!--[-->`);
              ssrRenderList(fotos.value, (foto) => {
                _push2(`<div class="${ssrRenderClass([isSelecionada(foto.id) ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300", "relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all"])}" data-v-92043048${_scopeId}><div class="absolute top-2 left-2 z-10" data-v-92043048${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(isSelecionada(foto.id)) ? " checked" : ""} class="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" data-v-92043048${_scopeId}></div><div class="relative" data-v-92043048${_scopeId}><img${ssrRenderAttr("src", getImageUrl(foto.hash))}${ssrRenderAttr("alt", foto.titulo)} class="w-full h-48 object-cover" data-v-92043048${_scopeId}><div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center" data-v-92043048${_scopeId}><i class="fa fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" data-v-92043048${_scopeId}></i></div></div><div class="p-3 bg-white" data-v-92043048${_scopeId}><p class="text-sm font-semibold text-gray-800 truncate" data-v-92043048${_scopeId}>${ssrInterpolate(foto.titulo || foto.nome)}</p><p class="text-xs text-gray-500 mt-1" data-v-92043048${_scopeId}>${ssrInterpolate(formatFileSize(foto.tamanho))} • ${ssrInterpolate(formatarDataHora(foto.created_at))}</p></div><div class="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" data-v-92043048${_scopeId}><button class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition" title="Editar" data-v-92043048${_scopeId}><i class="fa fa-edit text-xs" data-v-92043048${_scopeId}></i></button><button class="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition" title="Excluir" data-v-92043048${_scopeId}><i class="fa fa-trash text-xs" data-v-92043048${_scopeId}></i></button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div>`);
            if (modalAberto.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" data-v-92043048${_scopeId}><div class="relative max-w-6xl w-full" data-v-92043048${_scopeId}><button class="absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition z-10" data-v-92043048${_scopeId}><i class="fa fa-times" data-v-92043048${_scopeId}></i></button><div class="bg-white rounded-lg overflow-hidden" data-v-92043048${_scopeId}><img${ssrRenderAttr("src", getImageUrl((_a = fotoSelecionadaModal.value) == null ? void 0 : _a.hash))}${ssrRenderAttr("alt", (_b = fotoSelecionadaModal.value) == null ? void 0 : _b.titulo)} class="w-full max-h-[70vh] object-contain bg-gray-100" data-v-92043048${_scopeId}><div class="p-6" data-v-92043048${_scopeId}><h3 class="text-xl font-bold text-gray-800 mb-2" data-v-92043048${_scopeId}>${ssrInterpolate(((_c = fotoSelecionadaModal.value) == null ? void 0 : _c.titulo) || ((_d = fotoSelecionadaModal.value) == null ? void 0 : _d.nome))}</h3><p class="text-sm text-gray-600" data-v-92043048${_scopeId}>${ssrInterpolate(formatFileSize((_e = fotoSelecionadaModal.value) == null ? void 0 : _e.tamanho))} • Enviado em ${ssrInterpolate(formatarDataHora((_f = fotoSelecionadaModal.value) == null ? void 0 : _f.created_at))}</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (modalEdicaoAberto.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-v-92043048${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full" data-v-92043048${_scopeId}><h3 class="text-xl font-bold text-gray-800 mb-4" data-v-92043048${_scopeId}><i class="fa fa-edit mr-2 text-blue-600" data-v-92043048${_scopeId}></i>Editar Foto </h3><div class="mb-4" data-v-92043048${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-92043048${_scopeId}>Título</label><input${ssrRenderAttr("value", fotoParaEditar.value.titulo)} type="text" class="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Título da foto" data-v-92043048${_scopeId}></div><div class="mb-4" data-v-92043048${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-92043048${_scopeId}>Descrição (Opcional)</label><textarea rows="3" class="w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Descrição da foto" data-v-92043048${_scopeId}>${ssrInterpolate(fotoParaEditar.value.descricao)}</textarea></div><div class="flex gap-2 justify-end" data-v-92043048${_scopeId}><button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition" data-v-92043048${_scopeId}><i class="fa fa-times mr-1" data-v-92043048${_scopeId}></i>Cancelar </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" data-v-92043048${_scopeId}><i class="fa fa-check mr-1" data-v-92043048${_scopeId}></i>Salvar </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-10" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " 📸 Galeria de Fotos "),
                      __props.evento ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-sm text-gray-600 mt-1"
                      }, [
                        createTextVNode(" Evento: "),
                        createVNode("strong", null, toDisplayString(__props.evento.nome), 1),
                        createTextVNode(" - " + toDisplayString(formatarData(__props.evento.data)), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      onClick: voltarParaEvento,
                      class: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    }, [
                      createVNode("i", { class: "fa fa-arrow-left mr-2" }),
                      createTextVNode("Voltar ")
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-md p-6 mb-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold mb-4 flex items-center" }, [
                      createVNode("i", { class: "fa fa-upload mr-2 text-blue-600" }),
                      createTextVNode(" Adicionar Fotos ")
                    ]),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("label", {
                        for: "fotos-upload",
                        class: "flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors",
                        onDragover: withModifiers(() => {
                        }, ["prevent"]),
                        onDrop: withModifiers(handleDrop, ["prevent"])
                      }, [
                        createVNode("div", { class: "flex flex-col items-center justify-center pt-5 pb-6" }, [
                          createVNode("i", { class: "fa fa-cloud-upload text-6xl text-gray-400 mb-3" }),
                          createVNode("p", { class: "mb-2 text-sm text-gray-500" }, [
                            createVNode("span", { class: "font-semibold" }, "Clique para selecionar"),
                            createTextVNode(" ou arraste as fotos aqui ")
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500" }, " JPG, PNG, GIF, WEBP (máx. 10MB por foto - até 20 fotos por vez) ")
                        ])
                      ], 40, ["onDragover"]),
                      createVNode("input", {
                        id: "fotos-upload",
                        type: "file",
                        multiple: "",
                        accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp",
                        onChange: handleFileSelect,
                        class: "hidden"
                      }, null, 32)
                    ]),
                    fotosParaUpload.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-4"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                        createVNode("p", { class: "text-sm font-semibold text-gray-700" }, toDisplayString(fotosParaUpload.value.length) + " foto(s) selecionada(s) ", 1),
                        createVNode("button", {
                          onClick: limparSelecao,
                          class: "text-sm text-red-600 hover:text-red-700"
                        }, [
                          createVNode("i", { class: "fa fa-times mr-1" }),
                          createTextVNode("Limpar ")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(fotosParaUpload.value, (foto, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "relative group"
                          }, [
                            createVNode("img", {
                              src: foto.preview,
                              alt: foto.file.name,
                              class: "w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            }, null, 8, ["src", "alt"]),
                            createVNode("button", {
                              onClick: ($event) => removerFotoSelecao(index),
                              class: "absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            }, [
                              createVNode("i", { class: "fa fa-times text-xs" })
                            ], 8, ["onClick"])
                          ]);
                        }), 128))
                      ]),
                      createVNode("div", { class: "mt-4 flex gap-2" }, [
                        createVNode("button", {
                          onClick: uploadFotos,
                          disabled: uploading.value,
                          class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        }, [
                          !uploading.value ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "fa fa-check mr-2"
                          })) : (openBlock(), createBlock("i", {
                            key: 1,
                            class: "fa fa-spinner fa-spin mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(uploading.value ? "Enviando..." : "Enviar Fotos"), 1)
                        ], 8, ["disabled"])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-md p-6 mb-6" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", { class: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("i", { class: "fa fa-images text-3xl text-blue-600 mr-3" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-600" }, "Total de Fotos"),
                            createVNode("p", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(fotos.value.length), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-green-50 rounded-lg p-4 border border-green-200" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("i", { class: "fa fa-check-circle text-3xl text-green-600 mr-3" }),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-gray-600" }, "Selecionadas"),
                            createVNode("p", { class: "text-2xl font-bold text-gray-800" }, toDisplayString(fotosSelecionadas.value.length), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  fotosSelecionadas.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("p", { class: "text-sm font-semibold text-amber-800" }, toDisplayString(fotosSelecionadas.value.length) + " foto(s) selecionada(s) ", 1),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode("button", {
                          onClick: deselecionarTodas,
                          class: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                        }, [
                          createVNode("i", { class: "fa fa-times mr-1" }),
                          createTextVNode("Desmarcar Todas ")
                        ]),
                        createVNode("button", {
                          onClick: excluirSelecionadas,
                          class: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                        }, [
                          createVNode("i", { class: "fa fa-trash mr-1" }),
                          createTextVNode("Excluir Selecionadas ")
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white rounded-lg shadow-md p-6" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold flex items-center" }, [
                        createVNode("i", { class: "fa fa-images mr-2 text-purple-600" }),
                        createTextVNode(" Fotos do Evento ")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        fotos.value.length > 0 ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: selecionarTodas,
                          class: "text-sm text-blue-600 hover:text-blue-700"
                        }, [
                          createVNode("i", { class: "fa fa-check-square mr-1" }),
                          createTextVNode("Selecionar Todas ")
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center py-12"
                    }, [
                      createVNode("i", { class: "fa fa-spinner fa-spin text-4xl text-gray-400" })
                    ])) : fotos.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-12"
                    }, [
                      createVNode("i", { class: "fa fa-images text-6xl text-gray-300 mb-4" }),
                      createVNode("p", { class: "text-gray-500" }, "Nenhuma foto adicionada ainda"),
                      createVNode("p", { class: "text-sm text-gray-400 mt-2" }, "Faça upload de fotos usando o campo acima")
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(fotos.value, (foto) => {
                        return openBlock(), createBlock("div", {
                          key: foto.id,
                          class: ["relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all", isSelecionada(foto.id) ? "border-blue-500 shadow-lg" : "border-gray-200 hover:border-gray-300"]
                        }, [
                          createVNode("div", { class: "absolute top-2 left-2 z-10" }, [
                            createVNode("input", {
                              type: "checkbox",
                              checked: isSelecionada(foto.id),
                              onChange: ($event) => toggleSelecao(foto.id),
                              class: "w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            }, null, 40, ["checked", "onChange"])
                          ]),
                          createVNode("div", {
                            onClick: ($event) => abrirModal(foto),
                            class: "relative"
                          }, [
                            createVNode("img", {
                              src: getImageUrl(foto.hash),
                              alt: foto.titulo,
                              class: "w-full h-48 object-cover",
                              onError: handleImageError
                            }, null, 40, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center" }, [
                              createVNode("i", { class: "fa fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" })
                            ])
                          ], 8, ["onClick"]),
                          createVNode("div", { class: "p-3 bg-white" }, [
                            createVNode("p", { class: "text-sm font-semibold text-gray-800 truncate" }, toDisplayString(foto.titulo || foto.nome), 1),
                            createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(formatFileSize(foto.tamanho)) + " • " + toDisplayString(formatarDataHora(foto.created_at)), 1)
                          ]),
                          createVNode("div", { class: "absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" }, [
                            createVNode("button", {
                              onClick: withModifiers(($event) => editarFoto(foto), ["stop"]),
                              class: "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition",
                              title: "Editar"
                            }, [
                              createVNode("i", { class: "fa fa-edit text-xs" })
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: withModifiers(($event) => excluirFoto(foto.id), ["stop"]),
                              class: "bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition",
                              title: "Excluir"
                            }, [
                              createVNode("i", { class: "fa fa-trash text-xs" })
                            ], 8, ["onClick"])
                          ])
                        ], 2);
                      }), 128))
                    ]))
                  ])
                ])
              ]),
              modalAberto.value ? (openBlock(), createBlock("div", {
                key: 0,
                onClick: fecharModal,
                class: "fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              }, [
                createVNode("div", { class: "relative max-w-6xl w-full" }, [
                  createVNode("button", {
                    onClick: fecharModal,
                    class: "absolute top-4 right-4 bg-white text-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition z-10"
                  }, [
                    createVNode("i", { class: "fa fa-times" })
                  ]),
                  createVNode("div", {
                    onClick: withModifiers(() => {
                    }, ["stop"]),
                    class: "bg-white rounded-lg overflow-hidden"
                  }, [
                    createVNode("img", {
                      src: getImageUrl((_g = fotoSelecionadaModal.value) == null ? void 0 : _g.hash),
                      alt: (_h = fotoSelecionadaModal.value) == null ? void 0 : _h.titulo,
                      class: "w-full max-h-[70vh] object-contain bg-gray-100"
                    }, null, 8, ["src", "alt"]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h3", { class: "text-xl font-bold text-gray-800 mb-2" }, toDisplayString(((_i = fotoSelecionadaModal.value) == null ? void 0 : _i.titulo) || ((_j = fotoSelecionadaModal.value) == null ? void 0 : _j.nome)), 1),
                      createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(formatFileSize((_k = fotoSelecionadaModal.value) == null ? void 0 : _k.tamanho)) + " • Enviado em " + toDisplayString(formatarDataHora((_l = fotoSelecionadaModal.value) == null ? void 0 : _l.created_at)), 1)
                    ])
                  ], 8, ["onClick"])
                ])
              ])) : createCommentVNode("", true),
              modalEdicaoAberto.value ? (openBlock(), createBlock("div", {
                key: 1,
                onClick: fecharModalEdicao,
                class: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              }, [
                createVNode("div", {
                  onClick: withModifiers(() => {
                  }, ["stop"]),
                  class: "bg-white rounded-lg p-6 max-w-md w-full"
                }, [
                  createVNode("h3", { class: "text-xl font-bold text-gray-800 mb-4" }, [
                    createVNode("i", { class: "fa fa-edit mr-2 text-blue-600" }),
                    createTextVNode("Editar Foto ")
                  ]),
                  createVNode("div", { class: "mb-4" }, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Título"),
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => fotoParaEditar.value.titulo = $event,
                      type: "text",
                      class: "w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
                      placeholder: "Título da foto"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, fotoParaEditar.value.titulo]
                    ])
                  ]),
                  createVNode("div", { class: "mb-4" }, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Descrição (Opcional)"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => fotoParaEditar.value.descricao = $event,
                      rows: "3",
                      class: "w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
                      placeholder: "Descrição da foto"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, fotoParaEditar.value.descricao]
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-2 justify-end" }, [
                    createVNode("button", {
                      onClick: fecharModalEdicao,
                      class: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    }, [
                      createVNode("i", { class: "fa fa-times mr-1" }),
                      createTextVNode("Cancelar ")
                    ]),
                    createVNode("button", {
                      onClick: salvarEdicao,
                      class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    }, [
                      createVNode("i", { class: "fa fa-check mr-1" }),
                      createTextVNode("Salvar ")
                    ])
                  ])
                ], 8, ["onClick"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/GaleriaEvento.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GaleriaEvento = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92043048"]]);
export {
  GaleriaEvento as default
};
