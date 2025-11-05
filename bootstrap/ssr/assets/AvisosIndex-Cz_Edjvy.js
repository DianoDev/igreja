import { inject, ref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { D as Datatable } from "./Datatable-DbtrSLIX.js";
import { L as LayoutPrincipal } from "./LayoutPrincipal-uVBkpBd2.js";
import _sfc_main$1 from "./PopupButton-DLi_hd91.js";
import { useToast } from "vue-toastification";
import "pinia";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue3-daterange-picker";
import "moment/moment.js";
import "moment";
import "@inertiajs/vue3";
import "./Modal-D4SsQX3D.js";
import "axios";
const _sfc_main = {
  __name: "AvisosIndex",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    inject("events");
    const source = ref("/admin/avisos/list");
    const truncateText = (value, maxLength = 50) => {
      if (!value) return "-";
      const texto = String(value).trim();
      if (texto.length <= maxLength) return texto;
      return texto.substring(0, maxLength).trim() + "...";
    };
    const formatDate = (value) => {
      if (!value) return "-";
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    const formatAtivo = (value) => {
      if (value === true || value === 1 || value === "1") {
        return '<span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full"><i class="fa fa-check mr-1"></i>Ativo</span>';
      }
      return '<span class="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full"><i class="fa fa-times mr-1"></i>Inativo</span>';
    };
    const columns = ref([
      { name: "nome", title: "Nome", width: "20%", sort: "nome" },
      {
        name: "descricao",
        title: "Descricao",
        width: "30%",
        sort: "descricao",
        formatter: (value) => truncateText(value, 80)
      },
      {
        name: "data_expiração",
        title: "Data Expiração",
        width: "15%",
        sort: "data_expiração",
        nowrap: true,
        formatter: formatDate
      },
      {
        name: "ativo",
        title: "Ativo",
        width: "15%",
        sort: "ativo",
        nowrap: true,
        formatter: formatAtivo
      },
      {
        name: "id",
        title: "Ações",
        width: "10%",
        nowrap: true,
        contentClass: "text-center",
        headerClass: "text-center",
        template: "dropdown",
        formatter: (val, row) => [
          {
            type: "modal",
            icon: "fa-edit",
            dataSize: "xl",
            dataComponent: "AvisosForm",
            dataTitle: "Editar  Avisos",
            dataJson: { id: row.id },
            text: "Editar"
          },
          {
            type: "delete",
            icon: "fa-trash",
            text: "Remover",
            deleteUrl: `/admin/avisos/${row.id}`,
            dataTitle: "Confirmação de Remoção",
            dataMessage: "Você deseja realmente excluir este registro?"
          }
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-content"${_scopeId}><div class="flex items-center justify-between mb-4 w-100"${_scopeId}><h2 class="text-2xl font-semibold text-primary"${_scopeId}></h2><div class="flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "novo-avisos",
              title: "Novo  Avisos",
              size: "xl",
              component: "AvisosForm",
              variant: "secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="mr-2 fa fa-plus"${_scopeId2}></i> Novo Avisos `);
                } else {
                  return [
                    createVNode("i", { class: "mr-2 fa fa-plus" }),
                    createTextVNode(" Novo Avisos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(Datatable, {
              id: "avisos",
              columns: columns.value,
              source: source.value
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "page-content" }, [
                createVNode("div", { class: "flex items-center justify-between mb-4 w-100" }, [
                  createVNode("h2", { class: "text-2xl font-semibold text-primary" }),
                  createVNode("div", { class: "flex" }, [
                    createVNode(_sfc_main$1, {
                      id: "novo-avisos",
                      title: "Novo  Avisos",
                      size: "xl",
                      component: "AvisosForm",
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", { class: "mr-2 fa fa-plus" }),
                        createTextVNode(" Novo Avisos ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", null, [
                  createVNode(Datatable, {
                    id: "avisos",
                    columns: columns.value,
                    source: source.value
                  }, null, 8, ["columns", "source"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Avisos/AvisosIndex.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
