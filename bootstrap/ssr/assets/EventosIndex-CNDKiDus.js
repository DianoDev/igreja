import { inject, ref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { D as Datatable } from "./Datatable-DbtrSLIX.js";
import { L as LayoutPrincipal } from "./LayoutPrincipal-m5WNT2c3.js";
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
  __name: "EventosIndex",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    inject("events");
    const source = ref("/admin/eventos/list");
    const columns = ref([
      { name: "nome", title: "Nome", width: "20%", sort: "nome", nowrap: true },
      {
        name: "data",
        title: "Data",
        width: "20%",
        sort: "data",
        nowrap: true,
        formatter: (val) => formatarData(val)
      },
      { name: "hora", title: "Hora", width: "20%", sort: "hora", nowrap: true },
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
            type: "anchor",
            icon: "fa-tag",
            href: `/admin/eventos/${row.id}/info`,
            text: "Responsáveis e Doações"
          },
          {
            type: "anchor",
            icon: "fa-tag",
            href: `/admin/evento/${row.id}/galeria`,
            text: "Galeria de Fotos"
          },
          {
            type: "modal",
            icon: "fa-utensils",
            dataSize: "lg",
            dataComponent: "EventoCardapioForm",
            dataTitle: "Cardápios do Evento",
            dataJson: { id: row.id },
            text: "Gerenciar Cardápios"
          },
          {
            type: "modal",
            icon: "fa-edit",
            dataSize: "xl",
            dataComponent: "EventosForm",
            dataTitle: "Editar  Eventos",
            dataJson: { id: row.id },
            text: "Editar"
          },
          {
            type: "delete",
            icon: "fa-trash",
            text: "Remover",
            deleteUrl: `/admin/eventos/${row.id}`,
            dataTitle: "Confirmação de Remoção",
            dataMessage: "Você deseja realmente excluir este registro?"
          }
        ]
      }
    ]);
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(LayoutPrincipal, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="page-content"${_scopeId}><div class="flex items-center justify-between mb-4 w-100"${_scopeId}><h2 class="text-2xl font-semibold text-primary"${_scopeId}></h2><div class="flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "novo-eventos",
              title: "Novo  Eventos",
              size: "xl",
              component: "EventosForm",
              variant: "secondary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="mr-2 fa fa-plus"${_scopeId2}></i> Novo Eventos `);
                } else {
                  return [
                    createVNode("i", { class: "mr-2 fa fa-plus" }),
                    createTextVNode(" Novo Eventos ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}>`);
            _push2(ssrRenderComponent(Datatable, {
              id: "eventos",
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
                      id: "novo-eventos",
                      title: "Novo  Eventos",
                      size: "xl",
                      component: "EventosForm",
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        createVNode("i", { class: "mr-2 fa fa-plus" }),
                        createTextVNode(" Novo Eventos ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", null, [
                  createVNode(Datatable, {
                    id: "eventos",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Eventos/EventosIndex.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
