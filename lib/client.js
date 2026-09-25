window.__ModuleLoader__.load({
	id: "dsh-archived-sessions",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		/** Resolve one UI primitive across DSH core versions: 0.1.7 renamed the
		 * size-suffixed icon exports (…16/…14) to weight-suffixed ones
		 * (…Regular/…Medium), so every cell below accepts either name and falls back
		 * to a no-op component instead of crashing the whole slot. */
		const primitive = (legacy, current) => _deepseek_ai_dsh_client_ui_primitives[legacy] ?? _deepseek_ai_dsh_client_ui_primitives[current] ?? (() => null);
		/** The shipped menu-row primitive; a no-op when an older core lacks it. */
		const MenuRow = primitive("MenuItemButton", "MenuItemButton");
		//#region css
		const css = ".aRchv_root{flex-direction:column;gap:12px;display:flex}.aRchv_heading{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:20px}.aRchv_toolbar{box-sizing:border-box;flex-wrap:wrap;align-items:center;gap:8px 12px;min-height:32px;display:flex}.aRchv_selectAll{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:13px;line-height:18px;display:inline-flex}.aRchv_selectAll input{cursor:pointer;accent-color:var(--dsw-accent-strong);width:14px;height:14px}.aRchv_count{color:var(--dsw-alias-label-tertiary);flex:1;min-width:max-content;font-size:12px;line-height:18px}.aRchv_list{flex-direction:column;gap:2px;max-height:min(480px,60vh);display:flex;overflow:auto}.aRchv_row{box-sizing:border-box;cursor:pointer;height:34px;color:var(--dsw-alias-label-primary);user-select:none;border-radius:8px;align-items:center;gap:8px;padding:0 8px;display:flex}.aRchv_row:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_rowSelected{background:var(--dsw-alias-interactive-bg-hover);box-shadow:inset 3px 0 0 var(--dsw-accent-strong);outline:1px solid var(--dsw-alias-border-l2);outline-offset:-1px}.aRchv_subagentRow{padding-left:20px;border-left:2px solid var(--dsw-alias-border-l2);margin-left:9px;border-radius:0 8px 8px 0}.aRchv_check{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkCurrent{width:auto;height:auto;flex:none;justify-content:flex-start;align-items:center;display:inline-flex}.aRchv_checkbox{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:14px;height:14px;border-radius:4px;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkboxChecked{background:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-primary);color:var(--dsw-alias-label-primary-inverted)}.aRchv_title{text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1;font-size:13px;line-height:18px;overflow:hidden}.aRchv_time{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:17px}.aRchv_current{color:var(--dsw-alias-label-tertiary);cursor:not-allowed}.aRchv_currentBadge{color:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap}.aRchv_subagentBadge{color:var(--dsw-accent-strong);border:1px solid var(--dsw-accent-strong);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap;flex:none}.aRchv_toggleSlot{box-sizing:border-box;width:20px;height:20px;flex:none;justify-content:center;align-items:center;display:inline-flex}.aRchv_subagentToggle{cursor:pointer;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:50%;width:20px;height:20px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:transform .15s var(--ds-ease-in-out)}.aRchv_subagentToggle:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.aRchv_subagentToggleOpen{transform:rotate(90deg)}.aRchv_headerDelete.aRchv_headerDelete{box-sizing:border-box;width:28px;height:28px;color:var(--dsw-alias-state-error-secondary);cursor:pointer;background:0 0;border:none;border-radius:28px;justify-content:center;align-items:center;padding:6px;display:inline-flex;transition:color .15s var(--ds-ease-in-out),background .15s var(--ds-ease-in-out)}.aRchv_headerDelete.aRchv_headerDelete:hover,.aRchv_headerDelete.aRchv_headerDelete:focus-visible{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}.aRchv_empty{color:var(--dsw-alias-label-tertiary);padding:18px 8px;font-size:13px;line-height:18px}.aRchv_error{color:var(--dsw-alias-state-error-primary);margin-top:4px;font-size:12px;line-height:18px}.aRchv_notice{color:var(--dsw-alias-state-success-primary,var(--dsw-alias-label-secondary));margin-top:4px;font-size:12px;line-height:18px}.aRchv_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.aRchv_chevron{cursor:pointer;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:50%;width:20px;height:20px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:transform .15s var(--ds-ease-in-out)}.aRchv_chevron:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_chevronOpen{transform:rotate(90deg)}.aRchv_details{border-left:2px solid var(--dsw-alias-border-l2);margin:2px 0 6px 7px;padding:8px 10px 10px 12px;border-radius:0 8px 8px 0;background:var(--dsw-alias-bg-layer-1)}.aRchv_detailBody{flex-direction:column;gap:8px;display:flex}.aRchv_detailGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px;display:grid}.aRchv_detailItem{justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_detailLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:18px}.aRchv_detailSection{color:var(--dsw-alias-label-secondary);margin-top:4px;font-size:12px;font-weight:500;line-height:18px}.aRchv_chips{flex-wrap:wrap;gap:4px;display:flex}.aRchv_chip{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:6px;padding:2px 8px;font-size:11px;line-height:16px}.aRchv_fetchList{flex-direction:column;gap:2px;display:flex}.aRchv_fetchRow{color:var(--dsw-alias-label-secondary);align-items:baseline;gap:8px;font-size:12px;line-height:18px;display:flex}.aRchv_fetchTool{color:var(--dsw-alias-label-primary);flex:none;font-size:11px;line-height:16px}.aRchv_fetchQuery{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.aRchv_lineageRow{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_fileFooter{box-sizing:border-box;align-items:center;gap:10px;min-height:28px;display:flex}.aRchv_tabs{box-sizing:border-box;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2);display:flex}.aRchv_tab{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-bottom:2px solid transparent;border-radius:8px 8px 0 0;padding:6px 12px;font-size:13px;line-height:18px;transition:color .15s var(--ds-ease-in-out),border-color .15s var(--ds-ease-in-out)}.aRchv_tab:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.aRchv_tabActive{color:var(--dsw-accent-strong);border-bottom-color:var(--dsw-accent-strong)}.aRchv_tabActive:hover{color:var(--dsw-accent-strong);background:0 0}.aRchv_viewBar{box-sizing:border-box;align-items:center;gap:12px;min-height:28px;display:flex}.aRchv_viewSwitch{box-sizing:border-box;gap:2px;background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:2px;display:inline-flex}.aRchv_viewSwitchItem{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;padding:3px 10px;font-size:12px;line-height:18px}.aRchv_viewSwitchItem:hover{color:var(--dsw-alias-label-primary)}.aRchv_viewSwitchItemActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgba(0,0,0,.12)}.aRchv_groupHeader{box-sizing:border-box;align-items:center;gap:6px;min-height:28px;margin-top:6px;padding:0 8px;display:flex;width:100%;border:none;background:0 0;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:var(--dsw-radius-xs)}.aRchv_groupHeader:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_groupCaret{flex:none;color:var(--dsw-alias-label-tertiary);display:inline-flex;align-items:center}.aRchv_dangerButton.aRchv_dangerButton:not(:disabled){color:var(--dsw-alias-state-error-primary)}.aRchv_dangerButton.aRchv_dangerButton:hover:not(:disabled),.aRchv_dangerButton.aRchv_dangerButton:focus-visible:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary)}.aRchv_settingsStatus{color:var(--dsw-alias-label-tertiary);margin-top:2px;font-size:11px;line-height:16px}.aRchv_settingsStatusError{color:var(--dsw-alias-state-error-primary)}.aRchv_settingsStatusOk{color:var(--dsw-alias-state-success-primary)}.aRchv_groupHeader:first-child{margin-top:0}.aRchv_groupTitle{color:var(--dsw-alias-label-secondary);flex:1;font-size:12px;font-weight:500;line-height:18px}.aRchv_groupCount{color:var(--dsw-alias-label-tertiary);flex:none;font-size:11px;line-height:16px}.aRchv_search{box-sizing:border-box;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:4px 10px;flex:1;min-width:120px;font-size:13px;line-height:18px;outline:none}.aRchv_search:focus{border-color:var(--dsw-accent-strong)}.aRchv_search::placeholder{color:var(--dsw-alias-label-tertiary)}.aRchv_rowDelete.aRchv_rowDelete{box-sizing:border-box;width:16px;height:16px;color:var(--dsw-alias-state-error-secondary);cursor:pointer;background:0 0;border:none;border-radius:var(--dsw-radius-xs);flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:color .15s var(--ds-ease-in-out),background .15s var(--ds-ease-in-out)}.aRchv_rowDelete.aRchv_rowDelete:hover{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}.aRchv_rowDelete.aRchv_rowDelete:focus-visible{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger);outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}.aRchv_settings{flex-direction:column;gap:12px;display:flex;padding-top:4px}.aRchv_rootSettings>:not(.aRchv_heading):not(.aRchv_tabs):not(.aRchv_settings){display:none}.aRchv_settingsTitle{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:18px}.aRchv_settingsHint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.aRchv_settingsRow{cursor:pointer;align-items:flex-start;gap:8px;display:flex}.aRchv_settingsRow input{cursor:pointer;accent-color:var(--dsw-accent-strong);width:14px;height:14px;margin:2px 0 0}.aRchv_settingsRowText{flex-direction:column;gap:2px;display:flex}.aRchv_settingsRowLabel{color:var(--dsw-alias-label-primary);font-size:13px;line-height:18px}.aRchv_settingsRowHint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.aRchv_deleteOption{box-sizing:border-box;display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:4px 8px;cursor:pointer;transition:color .15s var(--ds-ease-in-out),background .15s var(--ds-ease-in-out),border-color .15s var(--ds-ease-in-out)}.aRchv_deleteOption:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_deleteOptionOn{border-color:var(--dsw-alias-state-error-secondary);background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-label-primary)}.aRchv_deleteOptionOn .aRchv_deleteOptionCount{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}.aRchv_deleteOptionOff{color:var(--dsw-alias-label-tertiary);background:0 0;border-style:dashed;cursor:not-allowed;opacity:.65}.aRchv_deleteOptionOff:hover{background:0 0}.aRchv_deleteOptionLabel{display:inline-flex;align-items:center;gap:6px;min-width:0;cursor:inherit}.aRchv_deleteOptionText{color:inherit}.aRchv_deleteOptionCount{flex:none;color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:6px;padding:0 6px;font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}.aRchv_deleteOption input[type=checkbox]{cursor:pointer;accent-color:var(--dsw-alias-state-error-primary);width:14px;height:14px;margin:0}.aRchv_deleteOptionOff input[type=checkbox]{cursor:not-allowed;accent-color:var(--dsw-alias-border-l2)}.aRchv_deleteOptionDetail{border:none;background:0 0;padding:0;cursor:pointer;display:inline-flex;align-items:center;color:var(--dsw-alias-label-tertiary)}.aRchv_deleteOptionDetail:hover{color:var(--dsw-alias-label-primary)}.aRchv_settingsSection{display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--dsw-alias-border-l2);padding-top:10px}";
		const tagId = "dsh-archived-sessions/ArchivedSessions.module.css";
		// 每次加载都重新投放样式：热更新后旧 <style> 还挂在 head 上，"只插一次"的写法会让
		// 新 CSS 永远不生效（改颜色这类改动看着就像没做）。
		if (typeof document !== "undefined") {
			const selector = "style[data-plugin-css=" + JSON.stringify(tagId) + "]";
			for (const stale of document.querySelectorAll(selector)) stale.remove();
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-archived-sessions";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const pcss = {
			"root": "aRchv_root", "heading": "aRchv_heading", "toolbar": "aRchv_toolbar", "selectAll": "aRchv_selectAll",
			"count": "aRchv_count", "list": "aRchv_list", "row": "aRchv_row", "rowSelected": "aRchv_rowSelected",
			"check": "aRchv_check", "checkCurrent": "aRchv_checkCurrent", "checkbox": "aRchv_checkbox", "checkboxChecked": "aRchv_checkboxChecked",
			"title": "aRchv_title", "time": "aRchv_time", "current": "aRchv_current", "currentBadge": "aRchv_currentBadge",
			"empty": "aRchv_empty", "error": "aRchv_error", "notice": "aRchv_notice", "hint": "aRchv_hint", "chevron": "aRchv_chevron",
			"chevronOpen": "aRchv_chevronOpen", "details": "aRchv_details", "detailBody": "aRchv_detailBody",
			"detailGrid": "aRchv_detailGrid", "detailItem": "aRchv_detailItem", "detailLabel": "aRchv_detailLabel",
			"detailSection": "aRchv_detailSection", "chips": "aRchv_chips", "chip": "aRchv_chip",
			"fetchList": "aRchv_fetchList", "fetchRow": "aRchv_fetchRow", "fetchTool": "aRchv_fetchTool",
			"fetchQuery": "aRchv_fetchQuery", "lineageRow": "aRchv_lineageRow", "fileFooter": "aRchv_fileFooter",
			"tabs": "aRchv_tabs", "tab": "aRchv_tab", "tabActive": "aRchv_tabActive",
			"viewBar": "aRchv_viewBar", "viewSwitch": "aRchv_viewSwitch", "viewSwitchItem": "aRchv_viewSwitchItem", "viewSwitchItemActive": "aRchv_viewSwitchItemActive",
			"search": "aRchv_search",
			"groupHeader": "aRchv_groupHeader", "groupTitle": "aRchv_groupTitle", "groupCount": "aRchv_groupCount", "groupCaret": "aRchv_groupCaret", "dangerButton": "aRchv_dangerButton",
			"subagentBadge": "aRchv_subagentBadge", "subagentRow": "aRchv_subagentRow", "toggleSlot": "aRchv_toggleSlot",
			"subagentToggle": "aRchv_subagentToggle", "subagentToggleOpen": "aRchv_subagentToggleOpen",
			"headerDelete": "aRchv_headerDelete", "rowDelete": "aRchv_rowDelete", "rootSettings": "aRchv_rootSettings", "settings": "aRchv_settings", "settingsTitle": "aRchv_settingsTitle", "settingsHint": "aRchv_settingsHint", "settingsRow": "aRchv_settingsRow", "settingsRowText": "aRchv_settingsRowText", "settingsRowLabel": "aRchv_settingsRowLabel", "settingsRowHint": "aRchv_settingsRowHint", "settingsStatus": "aRchv_settingsStatus", "settingsStatusError": "aRchv_settingsStatusError", "settingsStatusOk": "aRchv_settingsStatusOk", "settingsSection": "aRchv_settingsSection", "deleteOption": "aRchv_deleteOption", "deleteOptionOn": "aRchv_deleteOptionOn", "deleteOptionOff": "aRchv_deleteOptionOff", "deleteOptionLabel": "aRchv_deleteOptionLabel", "deleteOptionText": "aRchv_deleteOptionText", "deleteOptionCount": "aRchv_deleteOptionCount", "deleteOptionDetail": "aRchv_deleteOptionDetail"
		};
		//#endregion
		//#region locales
		const zh = {
			"nav": "会话管理",
			"title": "会话管理",
			"tab.all": "所有对话",
			"tab.archived": "归档会话",
			"tab.settings": "设置",
			"settings.title": "删除入口",
			"settings.hint": "选择在哪些位置显示删除按钮（默认只开侧边栏行内按钮）。改动立即生效，并保存到插件配置。",
			"settings.saved": "已保存",
			"settings.saving": "正在保存…",
			"settings.unavailable": "无法读写插件配置，更改只在本次运行内有效。",
			"settings.saveRefused": "保存插件配置失败。",
			"settings.deleteInHeader": "会话头部的删除按钮",
			"settings.deleteInHeaderHint": "打开对话后，标题栏右侧的垃圾桶图标",
			"settings.deleteInSidebar": "侧边栏会话行的删除按钮",
			"settings.deleteInSidebarHint": "左侧工作区列表里，悬停会话行时「…」右边的垃圾桶图标",
			"settings.deleteInMenu": "「…」菜单里的删除项",
			"settings.deleteInMenuHint": "侧边栏会话行「…」下拉菜单中的「删除会话」",
			"empty": "没有可显示的会话",
			"emptyAll": "没有未归档的对话",
			"emptyArchived": "没有归档的会话",
			"selectAll": "全选",
			"selected": "已选 {n} 项",
			"delete": "删除选中",
			"deleteConfirm": "删除",
			"deleting": "正在删除…",
			"archive": "移动到归档",
			"archiving": "正在归档…",
			"unarchive": "移出归档",
			"unarchiving": "正在移出…",
			"view.workspace": "按工作区",
			"view.flat": "单列表",
			"searchPlaceholder": "搜索会话…",
			"group.ungrouped": "未分组",
			"group.sessions": "{n} 个会话",
			"group.expand": "展开分组",
			"group.collapse": "折叠分组",
			"batchResult": "成功 {ok} 项，失败 {fail} 项",
			"archiveConfirm": "确认将 {n} 个会话移动到归档？它们将从所有对话中隐藏，但记录不会删除。",
			"openFolder": "打开记录文件夹",
			"openFolderHint": "在文件管理器中打开所选会话的记录文件夹",
			"confirm": "确认删除 {n} 个会话？",
			"confirmNote": "会话记录将被永久删除，此操作不可恢复。",
			"deleteCascade": "删除其下子对话（子代理）",
			"deleteFiles": "删除所有下载文件/产出文件",
			"deleteDetail": "详情",
			"deleteDetailHint": "点详情可查看并勾选具体删除项",
			"deleteDetailSubagents": "将删除的子对话",
			"deleteDetailFiles": "将删除的下载/产出文件",
			"deleteDetailFilesNote": "不会显示修改文件信息，只显示下载/产出文件",
			"deleteDetailNone": "无",
			"current": "当前会话",
			"currentHint": "当前打开的会话不能删除，请先切换到其他会话",
			"subagent": "子代理",
			"subagentExpand": "展开子代理",
			"subagentCollapse": "收起子代理",
			"subagentOrphan": "父会话「{n}」不在当前列表",
			"details": "详情",
			"detailsLoading": "正在加载详情…",
			"activity": "活动统计",
			"loading": "正在加载…",
			"retry": "重试",
			"size": "占用空间",
			"updated": "最后更新",
			"turns": "轮次",
			"steps": "步骤",
			"userMessages": "用户消息",
			"assistantMessages": "回复消息",
			"toolCalls": "工具调用",
			"attachments": "附件",
			"tools": "工具使用",
			"fetches": "网络获取 / 下载",
			"noFetches": "无网络获取记录",
			"lineage": "关联对话",
			"parent": "父会话",
			"children": "子会话（分叉）",
			"subagents": "子代理会话",
			"recalledBy": "被其他对话查看/召回",
			"noRecalls": "暂无其他对话查看过本对话",
			"files": "下载 / 产出文件",
			"noFiles": "该对话没有产出文件",
			"fileDelete": "删除选中文件",
			"fileDeleteConfirm": "确认删除选中的 {n} 个文件？文件将被永久删除，此操作不可恢复。",
			"fileDeleteDone": "已删除 {n} 个文件",
			"fileDeleting": "正在删除文件…",
			"count": "{n} 个",
			"none": "无",
			"na": "—",
			"time.now": "刚刚",
			"time.minutes": "{n}分钟",
			"time.hours": "{n}小时",
			"time.days": "{n}天",
			"time.months": "{n}个月",
			"time.years": "{n}年",
			"close": "关闭",
			"cancel": "取消",
			"headerDelete": "删除会话",
			"headerDeleteHint": "删除此会话（记录将被永久删除，无法恢复）",
			"headerDeleteConfirm": "确认删除此会话？其记录将被永久删除，此操作不可恢复。",
			"showPaths": "显示路径",
			"settings.memoryTitle": "删除确认弹窗",
			"settings.memoryHint": "弹窗里的两项选项会显示可删除数量；没有对应内容时自动置灰。",
			"settings.rememberDeleteOptions": "记住上次的选项",
			"settings.rememberDeleteOptionsHint": "开启后，每次打开删除确认弹窗都会沿用上次对「删除子对话」「删除产出文件」的勾选",
			"optionCount": "（{n}）",
			"optionEmpty": "没有可删除的内容"
		};
		const en = {
			"nav": "Session manager",
			"title": "Session manager",
			"tab.all": "All conversations",
			"tab.archived": "Archived",
			"tab.settings": "Settings",
			"settings.title": "Delete entry points",
			"settings.hint": "Choose where the delete button appears (only the sidebar row button is on by default). Changes apply immediately and are saved to the plugin config.",
			"settings.saved": "Saved",
			"settings.saving": "Saving…",
			"settings.unavailable": "The plugin config could not be read or written; changes last only for this run.",
			"settings.saveRefused": "Saving the plugin config failed.",
			"settings.deleteInHeader": "Delete button in the Session header",
			"settings.deleteInHeaderHint": "The trash icon at the right of the title bar once a conversation is open",
			"settings.deleteInSidebar": "Delete button on sidebar Session rows",
			"settings.deleteInSidebarHint": "The trash icon right of the \"…\" trigger when hovering a row in the left workspace list",
			"settings.deleteInMenu": "Delete item inside the \u2026 menu",
			"settings.deleteInMenuHint": "The Delete session row inside a sidebar Session row\u2019s \u2026 menu",
			"empty": "No sessions to show",
			"emptyAll": "No active conversations",
			"emptyArchived": "No archived sessions",
			"selectAll": "Select all",
			"selected": "{n} selected",
			"delete": "Delete selected",
			"deleteConfirm": "Delete",
			"deleting": "Deleting…",
			"archive": "Archive",
			"archiving": "Archiving…",
			"unarchive": "Unarchive",
			"unarchiving": "Unarchiving…",
			"view.workspace": "By workspace",
			"view.flat": "Flat list",
			"searchPlaceholder": "Search sessions…",
			"group.ungrouped": "Ungrouped",
			"group.sessions": "{n} sessions",
			"group.expand": "Expand group",
			"group.collapse": "Collapse group",
			"batchResult": "{ok} succeeded, {fail} failed",
			"archiveConfirm": "Move {n} session(s) to archive? They will be hidden from all conversations, but their records are kept.",
			"openFolder": "Open record folder",
			"openFolderHint": "Open the selected session's record folder in your file manager",
			"confirm": "Delete {n} session(s)?",
			"confirmNote": "Session logs will be permanently removed. This cannot be undone.",
			"deleteCascade": "Delete their sub-conversations (subagents)",
			"deleteFiles": "Delete all downloaded/produced files",
			"deleteDetail": "Details",
			"deleteDetailHint": "Open details to view and select specific items",
			"deleteDetailSubagents": "Sub-conversations to delete",
			"deleteDetailFiles": "Downloaded/produced files to delete",
			"deleteDetailFilesNote": "Only downloaded/produced files are listed (edit/write info is not shown)",
			"deleteDetailNone": "None",
			"current": "Current",
			"currentHint": "The current session cannot be deleted. Switch to another session first.",
			"subagent": "subagent",
			"subagentExpand": "Expand subagents",
			"subagentCollapse": "Collapse subagents",
			"subagentOrphan": "Parent conversation \"{n}\" is not in this list",
			"details": "Details",
			"detailsLoading": "Loading details…",
			"activity": "Activity",
			"loading": "Loading…",
			"retry": "Retry",
			"size": "Size on disk",
			"updated": "Last updated",
			"turns": "Turns",
			"steps": "Steps",
			"userMessages": "User messages",
			"assistantMessages": "Replies",
			"toolCalls": "Tool calls",
			"attachments": "Attachments",
			"tools": "Tool usage",
			"fetches": "Web fetches / downloads",
			"noFetches": "No web fetches",
			"lineage": "Related conversations",
			"parent": "Parent",
			"children": "Children (forks)",
			"subagents": "Subagent sessions",
			"recalledBy": "Viewed / recalled by",
			"noRecalls": "No other conversations recalled this one",
			"files": "Downloads / produced files",
			"noFiles": "This conversation produced no files",
			"fileDelete": "Delete selected files",
			"fileDeleteConfirm": "Delete {n} selected file(s)? Files will be permanently removed. This cannot be undone.",
			"fileDeleteDone": "Deleted {n} file(s)",
			"fileDeleting": "Deleting files…",
			"count": "{n}",
			"none": "None",
			"na": "—",
			"time.now": "now",
			"time.minutes": "{n}min",
			"time.hours": "{n}h",
			"time.days": "{n}d",
			"time.months": "{n}mo",
			"time.years": "{n}y",
			"close": "Close",
			"cancel": "Cancel",
			"headerDelete": "Delete session",
			"headerDeleteHint": "Delete this session (its logs will be permanently removed)",
			"headerDeleteConfirm": "Delete this session? Its logs will be permanently removed. This cannot be undone.",
			"showPaths": "Show paths",
			"settings.memoryTitle": "Delete confirmation dialog",
			"settings.memoryHint": "Both options show how much can be deleted; an option with nothing to delete is greyed out.",
			"settings.rememberDeleteOptions": "Remember the last choice",
			"settings.rememberDeleteOptionsHint": "When on, every delete dialog reuses your last sub-conversation / produced-file choices",
			"optionCount": "({n})",
			"optionEmpty": "nothing to delete"
		};
		//#endregion
		const NS = "archived-sessions";
		const inject = ["slots", "locale", "sessions", "workspaces", "configForms"];
		/** Host-declared delete-entry switches, mirrored client-side so a toggle
		 * re-renders the entries without re-registering their slots. */
		const DELETE_CONFIG_ID = "dsh-archived-sessions";
		const DELETE_TOGGLE_FIELDS = ["deleteInHeader", "deleteInSidebar", "deleteInMenu"];
		/** 删除确认弹窗的「选项记忆」开关：与三个入口开关同一个 settings 文档（都是 volatile 字段）。 */
		const DELETE_MEMORY_FIELD = "rememberDeleteOptions";
		const DELETE_CONFIG_FIELDS = [...DELETE_TOGGLE_FIELDS, DELETE_MEMORY_FIELD];
		/** 默认只开侧边栏行内按钮（「…」右边）；另两处与选项记忆默认关，管理页工具栏按钮常驻。 */
		const DEFAULT_DELETE_TOGGLES = Object.freeze({ deleteInHeader: false, deleteInSidebar: true, deleteInMenu: false, rememberDeleteOptions: false });
		let deleteToggles = DEFAULT_DELETE_TOGGLES;
		let deleteToggleWriter = () => {};
		const deleteToggleListeners = new Set();
		/** Stable snapshot until a switch changes (useSyncExternalStore contract). */
		function getDeleteToggles() { return deleteToggles; }
		function subscribeDeleteToggles(listener) {
			deleteToggleListeners.add(listener);
			return () => { deleteToggleListeners.delete(listener); };
		}
		/** React binding shared by the entries and the settings page. */
		function useDeleteToggles() { return react.useSyncExternalStore(subscribeDeleteToggles, getDeleteToggles, getDeleteToggles); }
		/** 开关在宿主配置里的落地状态：可用性/可写性/保存进度。设置页据此提示用户，
		 * 免得保存失败时"看着改了、重启就复原"却毫无反馈。 */
		let deleteConfigState = Object.freeze({ status: "loading", writable: false, mode: void 0, saving: false, saved: false, error: null });
		const deleteConfigListeners = new Set();
		function getDeleteConfigState() { return deleteConfigState; }
		function subscribeDeleteConfigState(listener) {
			deleteConfigListeners.add(listener);
			return () => { deleteConfigListeners.delete(listener); };
		}
		function useDeleteConfigState() { return react.useSyncExternalStore(subscribeDeleteConfigState, getDeleteConfigState, getDeleteConfigState); }
		function publishDeleteConfigState(patch) {
			const next = { ...deleteConfigState, ...patch };
			if (next.status === deleteConfigState.status && next.writable === deleteConfigState.writable
				&& next.mode === deleteConfigState.mode && next.saving === deleteConfigState.saving && next.saved === deleteConfigState.saved
				&& JSON.stringify(next.error) === JSON.stringify(deleteConfigState.error)) return;
			deleteConfigState = Object.freeze(next);
			for (const listener of [...deleteConfigListeners]) listener();
		}
		function writeFailureText(reason) { return reason instanceof Error ? reason.message : String(reason); }
		/** 客户端 configForms 由兄弟插件（@deepseek-ai/dsh-client-ui-settings）提供：cordis 的服务
		 * 查找只沿父链走、客户端 facade 还按 inject 声明做门禁，所以必须写进 inject 并走属性读；
		 * 极端情况（未声明/旧核）退回宽容读取 ctx.get，缺服务也不阻塞插件加载。 */
		function clientConfigForms(ctx) {
			try {
				const forms = ctx.configForms;
				if (forms !== void 0 && forms !== null) return forms;
			} catch { /* 未声明：客户端 facade 会直接拒绝属性读 */ }
			try { const forms = ctx.get("configForms"); return forms === void 0 ? void 0 : forms; } catch { return void 0; }
		}
		/** 保存成功后短暂显示一行绿字（2.5s 后自动收起），失败则常驻红字直到下次成功。 */
		let deleteConfigNoticeTimer = null;
		function flashDeleteConfigSaved() {
			if (deleteConfigNoticeTimer !== null) clearTimeout(deleteConfigNoticeTimer);
			deleteConfigNoticeTimer = setTimeout(() => {
				deleteConfigNoticeTimer = null;
				publishDeleteConfigState({ saved: false });
			}, 2500);
			publishDeleteConfigState({ saved: true });
		}
		/** 设置页底部的状态行：能读写=安心提示；读写失败=红色告警并附宿主原文。 */
		function deleteConfigStateNode(t, state) {
			if (state.error !== null) {
				const reason = state.error.code === "unavailable" ? t("settings.unavailable") : t("settings.saveRefused");
				const text = state.error.message === void 0 ? reason : reason + " (" + state.error.message + ")";
				return (0, react_jsx_runtime.jsx)("div", { className: pcss.settingsStatus + " " + pcss.settingsStatusError, role: "alert", children: text });
			}
			if (state.saved === true) return (0, react_jsx_runtime.jsx)("div", { className: pcss.settingsStatus + " " + pcss.settingsStatusOk, role: "status", children: t("settings.saved") });
			// 宿主没有这个插件的配置命名空间（缺 ui-settings / schema 不 volatile）也算失败。
			if (state.status === "unavailable") return (0, react_jsx_runtime.jsx)("div", { className: pcss.settingsStatus + " " + pcss.settingsStatusError, role: "alert", children: t("settings.unavailable") });
			return null;
		}
		/** 「…」菜单项点选后会随菜单一起卸载，所以确认弹窗不能长在菜单里
		 * （官方 rename/archive 也把弹窗放进 shell.overlay）。这里用一个模块级请求源：
		 * 三个入口只登记"要删哪个会话"，弹窗由 overlay 条目渲染。 */
		let deleteRequestSessionId = null;
		const deleteRequestListeners = new Set();
		function emitDeleteRequest() { for (const listener of [...deleteRequestListeners]) listener(); }
		function getDeleteRequest() { return deleteRequestSessionId; }
		function subscribeDeleteRequest(listener) {
			deleteRequestListeners.add(listener);
			return () => { deleteRequestListeners.delete(listener); };
		}
		function useDeleteRequest() { return react.useSyncExternalStore(subscribeDeleteRequest, getDeleteRequest, getDeleteRequest); }
		function requestSessionDelete(sessionId) { deleteRequestSessionId = sessionId; emitDeleteRequest(); }
		function clearSessionDelete() {
			if (deleteRequestSessionId === null) return;
			deleteRequestSessionId = null;
			emitDeleteRequest();
		}
		/** 删除确认弹窗的「选项记忆」：记住上次对「删除子对话」「删除产出文件」两个选项的
		 * 勾选（细粒度选择依赖具体会话与文件路径，跨弹窗没有意义，故不记忆）。有 localStorage
		 * 时持久化，刷新页面后仍然沿用；无存储环境只在本次运行内有效。 */
		const DELETE_MEMORY_KEY = "dsh-archived-sessions/delete-options";
		function deleteMemoryStorage() {
			try { return typeof localStorage === "undefined" ? null : localStorage; } catch { return null; }
		}
		function readDeleteOptionMemory() {
			const fallback = { subagents: false, files: false };
			try {
				const storage = deleteMemoryStorage();
				const raw = storage === null ? null : storage.getItem(DELETE_MEMORY_KEY);
				if (raw === null || raw === "") return fallback;
				const parsed = JSON.parse(raw);
				return { subagents: parsed?.subagents === true, files: parsed?.files === true };
			} catch { return fallback; }
		}
		let deleteOptionMemory = readDeleteOptionMemory();
		/** 记录一次显式勾选：无论记忆开关是否开启都记下来，之后打开开关即可继承。 */
		function rememberDeleteOption(field, on) {
			if (deleteOptionMemory[field] === on) return;
			deleteOptionMemory = { ...deleteOptionMemory, [field]: on };
			try { deleteMemoryStorage()?.setItem(DELETE_MEMORY_KEY, JSON.stringify(deleteOptionMemory)); } catch { /* 存储不可用：只记在内存里 */ }
		}
		/** 选项行的勾选展示：有可删项时跟随当前选择；被置灰（这次没有可删内容）时，
		 * 记忆开关开启且上次勾选过就保留勾选态——置灰只表示"这次没东西可删"，
		 * 没必要把记忆里的勾选强行抹掉。 */
		function deleteOptionChecked(field, remember, available, selected) {
			if (available > 0) return selected > 0;
			return remember === true && deleteOptionMemory[field] === true;
		}
		/** 上次对某项的勾选（与记忆开关无关；开关只在打开弹窗时决定要不要沿用）。 */
		function rememberedDeleteOption(field) { return deleteOptionMemory[field] === true; }
		/** 打开弹窗时的预勾选：开关关闭 / 上次未勾选 / 没有可删项 → 空集合。 */
		function rememberedDeleteSelection(field, enabled, all) {
			const items = Array.isArray(all) ? all : [...all];
			if (enabled !== true || deleteOptionMemory[field] !== true || items.length === 0) return new Set();
			return new Set(items);
		}
		/** 「删除子对话 / 删除产出文件」两个选项行的统一渲染：计数徽标 + 勾选后的危险色
		 * 强调；没有可删内容（disabled）时整行置灰、复选框禁用并附上说明。两个删除弹窗共用。 */
		function deleteOptionRow(spec) {
			const className = [pcss.deleteOption, spec.checked === true ? pcss.deleteOptionOn : "", spec.disabled === true ? pcss.deleteOptionOff : ""].filter((name) => name !== "").join(" ");
			return (0, react_jsx_runtime.jsxs)("div", {
				className,
				"data-delete-option": spec.field,
				"data-count": String(spec.count),
				children: [
					(0, react_jsx_runtime.jsxs)("label", {
						className: pcss.deleteOptionLabel,
						title: spec.disabled === true ? spec.emptyHint : void 0,
						children: [
							(0, react_jsx_runtime.jsx)("input", {
								ref: spec.inputRef,
								type: "checkbox",
								checked: spec.checked === true,
								disabled: spec.disabled === true,
								onChange: (event) => {
									rememberDeleteOption(spec.field, event.target.checked);
									spec.onToggle(event.target.checked);
								}
							}),
							(0, react_jsx_runtime.jsx)("span", { className: pcss.deleteOptionText, children: spec.label }),
							(0, react_jsx_runtime.jsx)("span", { className: pcss.deleteOptionCount, children: spec.countText })
						]
					}),
					(0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: pcss.deleteOptionDetail,
						"aria-label": spec.detailLabel,
						title: spec.detailLabel,
						"aria-expanded": spec.detailOpen === true,
						onClick: spec.onDetail,
						style: { transform: spec.detailOpen === true ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" },
						children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {})
					})
				]
			}, spec.key);
		}
		/** Fold one host config document into the switches; an absent field stays on. */
		function adoptDeleteToggles(value) {
			const document = value !== null && typeof value === "object" ? value : {};
			let changed = false;
			const next = {};
			for (const field of DELETE_CONFIG_FIELDS) {
				next[field] = document[field] === void 0 ? DEFAULT_DELETE_TOGGLES[field] : document[field] !== false;
				if (next[field] !== deleteToggles[field]) changed = true;
			}
			if (!changed) return;
			deleteToggles = Object.freeze(next);
			for (const listener of [...deleteToggleListeners]) listener();
		}

		/** Default request timeout; a hung fetch otherwise leaves the row "loading" forever. */
		const API_TIMEOUT_MS = 15e3;
		/** Upper bound for the per-session detail cache (LRU eviction). */
		const DETAILS_CACHE_LIMIT = 50;
		async function api(method, payload, options) {
			const controller = new AbortController();
			// m8: 超时覆盖到响应体读取完成——timer 在 fetch resolve 后不清除，
			// 而是等 response.json() 解析完再 clear，避免响应头到达但 body 挂起
			// 时无限等待（loading 卡住）。
			const timer = setTimeout(() => controller.abort(), options?.timeoutMs ?? API_TIMEOUT_MS);
			let response;
			try {
				response = await fetch(`/archived/api/${method}`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload ?? {}),
					signal: controller.signal
				});
			} catch (error) {
				clearTimeout(timer);
				if (error !== null && typeof error === "object" && error.name === "AbortError") {
					throw new Error(`archived API ${method} timed out`);
				}
				throw error;
			}
			let body;
			try {
				body = await response.json();
			} catch (error) {
				clearTimeout(timer);
				if (error !== null && typeof error === "object" && error.name === "AbortError") {
					throw new Error(`archived API ${method} timed out`);
				}
				throw new Error(`archived API ${method} returned a non-JSON response (${response.status})`);
			}
			clearTimeout(timer);
			if (body === null || typeof body !== "object" || body.ok !== true) {
				throw new Error((body && body.error && body.error.message) || `archived API ${method} failed (${response.status})`);
			}
			return body.value;
		}
		/** 并发上限内的详情读取：host 侧 details 要全量解析会话日志，串行时
		 * "每个子对话一个来回"（有子对话时文件数要等 1~2 秒才出来）；几十个并发
		 * 又会压满事件循环，所以限制 6 路——单会话加几个子对话基本同批返回。 */
		async function mapLimit(items, limit, worker) {
			const list = [...items];
			const results = new Array(list.length);
			let cursor = 0;
			const runners = Array.from({ length: Math.max(1, Math.min(limit, list.length)) }, async () => {
				for (;;) {
					const index = cursor++;
					if (index >= list.length) return;
					try { results[index] = { status: "fulfilled", value: await worker(list[index]) }; }
					catch (reason) { results[index] = { status: "rejected", reason }; }
				}
			});
			await Promise.all(runners);
			return results;
		}
		function formatBytes(bytes) {
			if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
			if (bytes < 1024) return `${bytes} B`;
			const units = ["KB", "MB", "GB", "TB"];
			let value = bytes;
			let unit = -1;
			do {
				value /= 1024;
				unit++;
			} while (value >= 1024 && unit < units.length - 1);
			return `${value >= 100 ? Math.round(value) : Math.round(value * 10) / 10} ${units[unit]}`;
		}
		function shortId(id) {
			return id.length > 20 ? `${id.slice(0, 10)}…${id.slice(-4)}` : id;
		}
		/** 浏览器端路径 dirname/baseName（client bundle 无 node path）。
		 * s6: 提升为模块级——头部删除弹窗（DeleteSessionAction）与设置面板共用，
		 * 避免在组件闭包内定义导致作用域外组件访问不到。 */
		const dirOf = (p) => {
			const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/"));
			return idx > 0 ? p.slice(0, idx) : p;
		};
		const baseName = (p) => {
			const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/"));
			return idx >= 0 ? p.slice(idx + 1) : p;
		};
		/** Resolve the best display title: durable title projection, summary title, display title, then a short id.
		 * m7: session 缺失（如孤儿归档条目）时兜底返回 shortId，避免渲染空标题行。 */
		function sessionTitleOf(s, fallbackId) {
			if (s === void 0) return typeof fallbackId === "string" && fallbackId !== "" ? shortId(fallbackId) : "";
			const projected = s.projectionValues && typeof s.projectionValues === "object" ? s.projectionValues.title : void 0;
			if (typeof projected === "string" && projected !== "") return projected;
			if (typeof s.title === "string" && s.title !== "") return s.title;
			if (typeof s.displayTitle === "string" && s.displayTitle !== "") return s.displayTitle;
			return shortId(s.id);
		}
		function relativeTime(updatedAt, now) {
			const diff = Math.max(0, now - updatedAt);
			const minute = 60 * 1e3;
			const hour = 60 * minute;
			const day = 24 * hour;
			if (diff < minute) return { unit: "now", n: 0 };
			if (diff < hour) return { unit: "minutes", n: Math.floor(diff / minute) };
			if (diff < day) return { unit: "hours", n: Math.floor(diff / hour) };
			if (diff < 30 * day) return { unit: "days", n: Math.floor(diff / day) };
			if (diff < 365 * day) return { unit: "months", n: Math.floor(diff / (30 * day)) };
			return { unit: "years", n: Math.floor(diff / (365 * day)) };
		}
		function timeLabel(updatedAt, now, t) {
			const { unit, n } = relativeTime(updatedAt, now);
			if (unit === "now") return t("time.now");
			return t(`time.${unit}`).replace("{n}", String(n));
		}
		/** 行组件（memo）：props 全部为基本类型/稳定引用，父组件重渲染时未变化的行跳过，
		 * 避免会话高频更新（agent 运行中）导致整个列表反复重建 DOM（打开卡顿优化）。 */
		const SessionRow = (0, react.memo)(function SessionRow(props) {
			const { row, isSelected, isExpanded, hasKids, kidsOpen, depth, timeText, showSubagentBadge,
				currentText, currentHintText, subagentText, detailsLabel, subagentExpandLabel, subagentCollapseLabel,
				onKeyDown, onMouseDown, onMouseEnter, onToggleKids, onToggleDetails, reserveToggle, orphanHintText } = props;
			/** 只有「父行可见」的子代理才缩进：父被归档/过滤掉的孤儿按顶层渲染，
			 * 免得看着像挂在紧邻的无关对话下面。 */
			const nested = row.subagent === true && depth > 0;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: `${pcss.row}${isSelected ? ` ${pcss.rowSelected}` : ""}${row.current ? ` ${pcss.current}` : ""}${nested ? ` ${pcss.subagentRow}` : ""}`,
					// 层级只由子级承担：margin-left 同时决定该层引导线所在的列（depth 1 = 9px，之后每级 +16px）。
					style: nested && depth > 1 ? { marginLeft: 9 + (depth - 1) * 16 } : void 0,
					"aria-selected": isSelected,
					title: row.current ? currentHintText : void 0,
					tabIndex: row.current ? -1 : 0, // m12: 行可聚焦支持键盘选择
					onKeyDown: row.current ? void 0 : (event) => onKeyDown(row.id, event),
					onMouseDown: row.current ? void 0 : (event) => onMouseDown(row.id, event),
					onMouseEnter: row.current ? void 0 : () => onMouseEnter(row.id),
					children: [
						(reserveToggle || hasKids) && (0, react_jsx_runtime.jsx)("span", {
							className: pcss.toggleSlot,
							children: hasKids && (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: `${pcss.subagentToggle}${kidsOpen ? ` ${pcss.subagentToggleOpen}` : ""}`,
								"aria-label": kidsOpen ? subagentCollapseLabel : subagentExpandLabel,
								"aria-expanded": kidsOpen,
								onMouseDown: (e) => e.stopPropagation(),
								onClick: (e) => {
									e.stopPropagation();
									onToggleKids(row.id);
								},
								children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {})
							})
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: row.current ? `${pcss.check} ${pcss.checkCurrent}` : pcss.check,
							children: row.current ? (0, react_jsx_runtime.jsx)("span", { className: pcss.currentBadge, children: currentText }) : (0, react_jsx_runtime.jsx)("span", {
								className: `${pcss.checkbox}${isSelected ? ` ${pcss.checkboxChecked}` : ""}`,
								children: isSelected && (0, react_jsx_runtime.jsx)(primitive("IconCheckOutline16", "IconCheckOutlineRegular"), { size: 12 })
							})
						}),
						(0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: row.subagent && !nested && orphanHintText !== void 0 ? row.title + " · " + orphanHintText : row.title, children: row.title }),
						timeText !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.time, title: new Date(row.updatedAt).toLocaleString(), children: timeText }),
						showSubagentBadge && (0, react_jsx_runtime.jsx)("span", { className: pcss.subagentBadge, children: subagentText }),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${pcss.chevron}${isExpanded ? ` ${pcss.chevronOpen}` : ""}`,
							"aria-label": detailsLabel,
							"aria-expanded": isExpanded,
							onMouseDown: (e) => e.stopPropagation(),
							onClick: (e) => {
								e.stopPropagation();
								onToggleDetails(row);
							},
							children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {})
						})
					]
				}, row.id)]
			});
		});
		function ArchivedSessionsSection({ useSessions, useWorkspaces, refresh, t }) {
			const deleteToggles = useDeleteToggles();
			const deleteConfig = useDeleteConfigState();
			// 拆开订阅：byId 引用变化才触发重渲染（会话集合更新），
			// current/phase 单独订阅，避免 store 顶层对象抖动时全量重渲染（打开卡顿优化）
			const sessionsById = useSessions((s) => s?.byId);
			const sessionCurrent = useSessions((s) => s?.current);
			const sessionPhase = useSessions((s) => s?.phase);
			const sessions = { byId: sessionsById, current: sessionCurrent, phase: sessionPhase };
			const workspaceState = useWorkspaces((s) => s);
			const archivedIds = workspaceState?.archivedSessionIds ?? [];
			const workspaceItems = workspaceState?.items ?? [];
			const byId = sessions?.byId ?? {};
			const current = sessions?.current;
			// H1: arrival/loading/error lifecycle from the official stores
			const listPhase = sessions?.phase;
			const workspacesState = workspaceState?.state;
			const baselinesReady = workspaceState?.baselinesReady;
			const workspaceError = workspaceState?.error;
			// m11: 60s ticker 驱动相对时间标签自动刷新（cleanup 防止 interval 泄漏）
			const [, setTick] = (0, react.useState)(0);
			(0, react.useEffect)(() => {
				const timer = setInterval(() => setTick((t) => t + 1), 60e3);
				return () => clearInterval(timer);
			}, []);
			const now = Date.now();
			const [tab, setTab] = (0, react.useState)("all");
			// 默认按工作区分组（更贴近"会话归属哪个项目"的使用习惯）
			const [viewMode, setViewMode] = (0, react.useState)("workspace");
			const [searchQuery, setSearchQuery] = (0, react.useState)("");
			const [expandedParents, setExpandedParents] = (0, react.useState)(() => new Set());
			const toggleSubagents = (0, react.useCallback)((id) => {
				setExpandedParents((prev) => {
					const next = new Set(prev);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				});
			}, []);
			// 按工作区分组时的折叠状态：key 为 group.key（工作区 id 或 "__ungrouped__"）。
			const [collapsedGroups, setCollapsedGroups] = (0, react.useState)(() => new Set());
			const toggleGroup = (0, react.useCallback)((key) => {
				setCollapsedGroups((prev) => {
					const next = new Set(prev);
					if (next.has(key)) next.delete(key);
					else next.add(key);
					return next;
				});
			}, []);
			const archivedSet = (0, react.useMemo)(() => new Set(archivedIds), [archivedIds]);
			/** id 归一化工具：byId 的 key 与 parentId 的格式可能不一致（有的带
			 * `session-` 前缀、有的是纯 uuid）。所有归属匹配统一经 normId 双向
			 * 归一，避免子代理被误判为孤儿。 */
			const normId = (id) => (typeof id === "string" && id.startsWith("session-") ? id.slice("session-".length) : id);
			const allRows = (0, react.useMemo)(() => {
				const sortRows = (rows) => rows.sort((a, b) => {
					// 当前会话置顶；无当前会话时按最近更新排序
					if (a.current !== b.current) return a.current ? -1 : 1;
					return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
				});
				if (tab === "archived") {
					return sortRows([...archivedIds].map((id) => ({
						id,
						title: sessionTitleOf(byId[id], id),
						updatedAt: byId[id]?.updatedAt,
						current: id === current,
						subagent: byId[id]?.origin === "subagent",
						parentId: byId[id]?.parentId
					})));
				}
				const all = [];
				for (const [id, s] of Object.entries(byId)) {
					if (archivedSet.has(id)) continue;
					if (s.blank) continue;
					all.push({
						id,
						title: sessionTitleOf(s),
						updatedAt: s.updatedAt,
						current: id === current,
						subagent: s.origin === "subagent",
						parentId: s.parentId
					});
				}
				return sortRows(all);
			}, [tab, archivedIds, archivedSet, byId, current]);
			/** O(1) parent lookups (H2: replaces O(N²) scans): rowById 同时登记原始 id 与
			 * normId 变体，parentId 无论带不带 `session-` 前缀都能命中父行——孤儿子代理的
			 * 「父会话不在当前列表」提示要用它；是否「可见」一律由 visibleIds 判定。 */
			const rowIndex = (0, react.useMemo)(() => {
				const rowById = new Map();
				for (const row of allRows) {
					rowById.set(row.id, row);
					rowById.set(normId(row.id), row);
				}
				return { rowById };
			}, [allRows]);
			/** Title/id local filter (search box). Subagents whose parent is filtered out still show when their own title matches. */
			const filteredRows = (0, react.useMemo)(() => {
				const q = searchQuery.trim().toLowerCase();
				if (q === "") return allRows;
				return allRows.filter((row) => row.title.toLowerCase().includes(q) || row.id.toLowerCase().includes(q));
			}, [allRows, searchQuery]);
			/** 当前列表里「真正可见」的行（含 normId 变体）：父子归属、缩进与展开计数
			 * 一律以它为准——父行被归档/搜索过滤掉时，子代理降级成顶层行而不是硬缩进。 */
			const visibleIds = (0, react.useMemo)(() => {
				const set = new Set();
				for (const row of filteredRows) {
					set.add(row.id);
					set.add(normId(row.id));
				}
				return set;
			}, [filteredRows]);
			/** Map from parent session id → number of *visible* direct subagent children.
			 * 只数当前列表里的子代理：否则归档页/搜索后会留下点开却是空的「死箭头」。 */
			const subagentCounts = (0, react.useMemo)(() => {
				const counts = new Map();
				for (const row of filteredRows) {
					if (row.subagent !== true || row.parentId === void 0) continue;
					const pid = normId(row.parentId);
					if (!visibleIds.has(pid)) continue;
					counts.set(pid, (counts.get(pid) ?? 0) + 1);
				}
				return counts;
			}, [filteredRows, visibleIds]);
			/** 只要列表里存在可展开的父行，就给所有行预留同宽的挂件栏：
			 * 父行的内容不会再被展开箭头挤出基线。 */
			const reserveToggle = (0, react.useMemo)(() => filteredRows.some((row) => (subagentCounts.get(normId(row.id)) ?? 0) > 0), [filteredRows, subagentCounts]);
			/** 行深度（树结构决定，与展开状态无关）：每棵可见子树的根 0，子代理逐层 +1。
			 * 每层用自己的 margin-left 占一列，引导线随层级右移，父行永远停在基线。 */
			const depthOf = (0, react.useMemo)(() => {
				const childrenOf = new Map();
				for (const row of filteredRows) {
					if (!row.subagent || row.parentId === void 0) continue;
					const parentKey = normId(row.parentId);
					if (!visibleIds.has(parentKey)) continue;
					const list = childrenOf.get(parentKey) ?? [];
					list.push(row.id);
					childrenOf.set(parentKey, list);
				}
				const depth = new Map();
				const visited = new Set();
				const walk = (id, d) => {
					if (visited.has(id)) return; // 防环（损坏数据）
					visited.add(id);
					depth.set(id, d);
					for (const kid of childrenOf.get(normId(id)) ?? []) walk(kid, d + 1);
				};
				// 每棵可见子树的根都要走一遍：非子代理会话同样可以是父行，只从孤儿 subagent
				// 起走会让孙级拿不到 depth（多级缩进直接失效）。
				for (const row of filteredRows) {
					if (row.parentId === void 0 || !visibleIds.has(normId(row.parentId))) walk(row.id, 0);
				}
				return depth;
			}, [filteredRows, visibleIds]);
			/** Flatten rows into display order: top-level sessions first, then each
			 * row's subagent children indented right beneath it. A subagent whose
			 * parent is absent (deleted/archived/not listed) surfaces as a
			 * top-level row itself. */
			const displayRows = (0, react.useMemo)(() => {
				const childrenOf = new Map();
				const tops = [];
				for (const row of filteredRows) {
					const parentKey = row.parentId === void 0 ? void 0 : normId(row.parentId);
					if (!row.subagent || parentKey === void 0 || !visibleIds.has(parentKey)) {
						tops.push(row);
					} else {
						const list = childrenOf.get(parentKey) ?? [];
						list.push(row);
						childrenOf.set(parentKey, list);
					}
				}
				const result = [];
				// 递归挂子代：展开的节点继续深入，子代理的子代理（孙级）也能显示
				const append = (row) => {
					result.push(row);
					const kids = childrenOf.get(normId(row.id));
					if (kids !== void 0 && expandedParents.has(row.id)) {
						for (const kid of kids.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))) append(kid);
					}
				};
				for (const top of tops) append(top);
				return result;
			}, [filteredRows, expandedParents, visibleIds]);
			/** Grouped rows for the workspace view: each workspace's accounted
			 * sessions, then a trailing ungrouped bucket. Subagents travel with
			 * their parent: a subagent is placed right after its parent row
			 * inside the same group (parent lookup is workspace-independent, so
			 * ungrouped parents carry their subagents into the ungrouped bucket).
			 * A subagent whose parent is absent surfaces as a top-level row and
			 * is bucketed like any other top-level session. */
			const groups = (0, react.useMemo)(() => {
				// 分组视图对「所有对话」与「归档会话」都生效：工作区归属来自
				// ws.sessionIds，而官方归档只是叠加的标记位（归档会话保留它的
				// sessionIds 槽位），所以归档页同样能按工作区分组。
				if (viewMode !== "workspace") return [];
				const childrenOf = new Map();
				for (const row of filteredRows) {
					if (!row.subagent || row.parentId === void 0) continue;
					const parentKey = normId(row.parentId);
					if (!visibleIds.has(parentKey)) continue;
					const list = childrenOf.get(parentKey) ?? [];
					list.push(row);
					childrenOf.set(parentKey, list);
				}
				/** 归属判定与展开状态无关：子代理永远跟随父会话。
				 * m15: visited 防环——损坏数据（parentId 成环）时不至于无限递归。 */
				const lineageOf = (id) => {
					const ids = [];
					const visited = new Set();
					const walk = (nodeId) => {
						if (visited.has(nodeId)) return;
						visited.add(nodeId);
						ids.push(nodeId);
						const kids = childrenOf.get(normId(nodeId));
						if (kids !== void 0) for (const kid of kids) walk(kid.id);
					};
					walk(id);
					return ids;
				};
				const attachKids = (rows) => {
					const result = [];
					// 递归挂子代：孙级子代理在父级展开时逐层显示
					const append = (row) => {
						result.push(row);
						const kids = childrenOf.get(normId(row.id));
						if (kids !== void 0 && expandedParents.has(row.id)) {
							for (const kid of kids.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))) append(kid);
						}
					};
					for (const row of rows) append(row);
					return result;
				};
				const byWorkspace = workspaceItems.map((ws) => {
					const tops = (ws.sessionIds ?? []).map((id) => rowIndex.rowById.get(id) ?? rowIndex.rowById.get(normId(id))).filter((row) => row !== void 0);
					// 组内排序：当前会话置顶，其余按最近更新降序（与单列表一致）
					tops.sort((a, b) => {
						if (a.current !== b.current) return a.current ? -1 : 1;
						return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
					});
					return {
						key: ws.workspaceId,
						label: ws.title,
						rows: attachKids(tops),
						allIds: tops.flatMap((top) => lineageOf(top.id))
					};
				}).filter((group) => group.rows.length > 0);
				const accounted = new Set(byWorkspace.flatMap((group) => group.allIds));
				/** 未分组 = 顶层会话 + 父缺失的孤儿 subagent（与 flat 视图的顶层判定
				 * 一致：`!row.subagent || row.parentId === void 0 || !visibleIds.has(normId(row.parentId))`），
				 * 且不归属任何工作区；已归档的由上层过滤。M5: 修复前孤儿 subagent
				 * 在 workspace 视图下完全不可见。 */
				const ungrouped = filteredRows.filter((row) => !accounted.has(row.id) && (!row.subagent || row.parentId === void 0 || !visibleIds.has(normId(row.parentId))));
				// 未分组同样置顶当前会话
				ungrouped.sort((a, b) => {
					if (a.current !== b.current) return a.current ? -1 : 1;
					return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
				});
				const result = [...byWorkspace];
				if (ungrouped.length > 0) result.push({ key: "__ungrouped__", label: t("group.ungrouped"), rows: attachKids(ungrouped) });
				return result;
			}, [tab, viewMode, workspaceItems, filteredRows, expandedParents, t, rowIndex]);
			const rows = viewMode === "workspace" ? groups.flatMap((group) => group.rows) : displayRows;
			/** 孤儿 subagent（父行不在当前列表）的悬停提示；父会话标题取自全量索引。 */
			const orphanHintOf = (row) => {
				if (row.subagent !== true || (depthOf.get(row.id) ?? 0) > 0) return void 0;
				const parentTitle = row.parentId === void 0 ? void 0 : rowIndex.rowById.get(normId(row.parentId))?.title;
				return t("subagentOrphan").replace("{n}", parentTitle === void 0 ? t("na") : parentTitle);
			};
			/** H1: show "loading…" instead of a misleading empty state while the baseline is still arriving. */
			const loading = (listPhase === "pending" || workspacesState === "loading") && rows.length === 0;
			const selectableIds = (0, react.useMemo)(() => rows.filter((row) => !row.current).map((row) => row.id), [rows]);
			const [selected, setSelected] = (0, react.useState)(() => new Set());
			/** M4: 批量操作分批执行（每批 20 个、批间串行），避免全选上千会话时
			 * 上千并发 fetch 打爆浏览器连接池与 host 端请求队列。 */
			const BATCH_SIZE = 20;
			const runBatch = async (method, targets, extra) => {
				const results = [];
				for (let i = 0; i < targets.length; i += BATCH_SIZE) {
					const chunk = targets.slice(i, i + BATCH_SIZE);
					// 每批内部并行（host 端 mutation 已串行化，安全），批间 await
					const settled = await Promise.allSettled(chunk.map((id) => api(method, { sessionId: id, ...(extra ?? {}) })));
					results.push(...settled);
				}
				const okCount = results.filter((r) => r.status === "fulfilled").length;
				const failCount = results.length - okCount;
				if (failCount > 0) {
					const firstFail = results.find((r) => r.status === "rejected");
					const detail = firstFail && firstFail.reason instanceof Error ? firstFail.reason.message : "";
					throw new Error(t("batchResult").replace("{ok}", String(okCount)).replace("{fail}", String(failCount)) + (detail ? `：${detail}` : ""));
				}
				return okCount;
			};
			const [dragMode, setDragMode] = (0, react.useState)(null);
			const [deleting, setDeleting] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [confirmOpen, setConfirmOpen] = (0, react.useState)(false);
			// 详情扫描令牌：弹窗关闭/重开后，旧的那轮渐进扫描不再写回状态
			const deleteScanRef = (0, react.useRef)(0);
			// 记忆预选是否仍生效：用户手动改动「文件」选项后置 false，渐进扫描不再自动勾选新文件
			const deletePreselectRef = (0, react.useRef)(false);
			// 渐进扫描中已发现的文件/文件夹与「扫描落定」的 promise（确认删除要等它，别只删一半）
			const scanFilesRef = (0, react.useRef)(null);
			const scanDirsRef = (0, react.useRef)(null);
			const scanPromiseRef = (0, react.useRef)(null);
			const cancelDeleteScan = () => { deleteScanRef.current++; };
			// 细粒度删除：详情面板里勾选的子代理 / 文件（默认都不勾选）
			const [deleteSubagentIds, setDeleteSubagentIds] = (0, react.useState)(() => new Set());
			const [deleteFilePaths, setDeleteFilePaths] = (0, react.useState)(() => new Set());
			const [allDeleteSubagentIds, setAllDeleteSubagentIds] = (0, react.useState)(() => new Set());
			const [allDeleteFilePaths, setAllDeleteFilePaths] = (0, react.useState)(() => new Set());
			const [allDeleteDirs, setAllDeleteDirs] = (0, react.useState)(() => new Set());
			const [subagentDetailOpen, setSubagentDetailOpen] = (0, react.useState)(false);
			const [filesDetailOpen, setFilesDetailOpen] = (0, react.useState)(false);
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			// 全选复选框半选态（部分勾选时显示 indeterminate）
			const subagentAllRef = (0, react.useRef)(null);
			const filesAllRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (subagentAllRef.current !== null) {
					subagentAllRef.current.indeterminate = deleteSubagentIds.size > 0 && deleteSubagentIds.size < allDeleteSubagentIds.size;
				}
			}, [deleteSubagentIds, allDeleteSubagentIds]);
			(0, react.useEffect)(() => {
				if (filesAllRef.current !== null) {
					filesAllRef.current.indeterminate = deleteFilePaths.size > 0 && deleteFilePaths.size < allDeleteFilePaths.size;
				}
			}, [deleteFilePaths, allDeleteFilePaths]);
			const [expandedId, setExpandedId] = (0, react.useState)(null);
			const [detailsCache, setDetailsCache] = (0, react.useState)(() => new Map());
			const [detailsBusyIds, setDetailsBusyIds] = (0, react.useState)(() => new Set());
			const [detailsError, setDetailsError] = (0, react.useState)(null);
			const [selectedFiles, setSelectedFiles] = (0, react.useState)(() => new Set());
			const [fileDeleting, setFileDeleting] = (0, react.useState)(false);
			// 详情面板：产出文件夹展开状态（key = 相对文件夹路径）
			const [expandedFileDirs, setExpandedFileDirs] = (0, react.useState)(() => new Set());
			// 详情面板：显示完整文件路径开关（默认关闭，只显示文件名）
			const [showFilePaths, setShowFilePaths] = (0, react.useState)(false);
			const switchTab = (0, react.useCallback)((next) => {
				setTab(next);
				setSelected(new Set());
				setExpandedId(null);
				setDetailsError(null);
				setSelectedFiles(new Set()); // m10: 切 tab 清文件选择残留
			}, []);
			(0, react.useEffect)(() => {
				if (dragMode === null) return;
				const end = () => setDragMode(null);
				// m13: 鼠标移出窗口释放（blur）或离开页面时兜底清理，防止 dragMode 卡住
				const onBlur = () => setDragMode(null);
				const onVisibility = () => { if (document.visibilityState === "hidden") setDragMode(null); };
				window.addEventListener("mouseup", end);
				window.addEventListener("blur", onBlur);
				document.addEventListener("visibilitychange", onVisibility);
				return () => {
					window.removeEventListener("mouseup", end);
					window.removeEventListener("blur", onBlur);
					document.removeEventListener("visibilitychange", onVisibility);
				};
			}, [dragMode]);
			const applyRow = (0, react.useCallback)((id, mode) => {
				setSelected((prev) => {
					const next = new Set(prev);
					if (mode) next.add(id);
					else next.delete(id);
					return next;
				});
			}, []);
			const onRowMouseDown = (0, react.useCallback)((id, event) => {
				event.preventDefault();
				const mode = !selected.has(id);
				applyRow(id, mode);
				setDragMode(mode);
			}, [selected, applyRow]);
			const onRowMouseEnter = (0, react.useCallback)((id) => {
				if (dragMode !== null) applyRow(id, dragMode);
			}, [dragMode, applyRow]);
			/** m12: 键盘选择——行聚焦时 Enter/Space 切换选择（跳过按钮/输入框等交互元素）。 */
			const onRowKeyDown = (0, react.useCallback)((id, event) => {
				const target = event.target;
				if (target !== null && typeof target === "object" && (target.tagName === "BUTTON" || target.tagName === "INPUT")) return;
				if (event.key !== "Enter" && event.key !== " ") return;
				event.preventDefault();
				const mode = !selected.has(id);
				applyRow(id, mode);
			}, [selected, applyRow]);
			/** Id of the most recently requested detail row; stale responses are dropped (M7 race guard). */
			const latestDetailsRequest = (0, react.useRef)(null);
			const toggleDetails = (0, react.useCallback)((row) => {
				if (expandedId === row.id) {
					setExpandedId(null);
					return;
				}
				setExpandedId(row.id);
				// 切换展开行时清空文件选择，避免把上一行的选中文件带过来误删
				setSelectedFiles(new Set());
				setDetailsError(null);
				if (detailsCache.has(row.id)) {
					// LRU touch：把命中的条目移到最近使用位置。注意**不要 return**——缓存只用来首帧直出：
					// 详情是快照，会话随时可能新增产出文件，展开时必须后台重取一次，静默换成最新结果
					// （有缓存时不会显示 loading，失败也不会清空面板）。
					setDetailsCache((prev) => {
						if (!prev.has(row.id)) return prev;
						const next = new Map(prev);
						const value = next.get(row.id);
						next.delete(row.id);
						next.set(row.id, value);
						return next;
					});
				}
				const targetId = row.id;
				latestDetailsRequest.current = targetId;
				setDetailsBusyIds((prev) => new Set(prev).add(targetId));
				api("details", { sessionId: targetId }).then((value) => {
					if (latestDetailsRequest.current !== targetId) return; // 过期响应丢弃，不写缓存不报错
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.delete(targetId);
						next.set(targetId, value);
						// LRU 上限：淘汰最旧条目（Map 按插入序迭代）
						while (next.size > DETAILS_CACHE_LIMIT) {
							const oldest = next.keys().next().value;
							if (oldest === void 0 || oldest === targetId) break;
							next.delete(oldest);
						}
						return next;
					});
				}).catch((reason) => {
					if (latestDetailsRequest.current !== targetId) return;
					setDetailsError(reason instanceof Error ? reason.message : String(reason));
				}).finally(() => {
					setDetailsBusyIds((prev) => {
						const next = new Set(prev);
						next.delete(targetId);
						return next;
					});
				});
			}, [expandedId, detailsCache]);
			const selectedCount = selectableIds.filter((id) => selected.has(id)).length;
			const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
			const toggleAll = () => {
				setSelected(allSelected ? new Set() : new Set(selectableIds));
			};
			/** 打开删除确认：收集选中会话的所有后代子代理（含孙级，来自 byId 树）
			 * 与全部下载/产出文件（逐个拉详情），供详情面板细粒度勾选。默认都不勾选。 */
			const openDeleteConfirm = async () => {
				setConfirmOpen(true);
				setSubagentDetailOpen(false);
				setFilesDetailOpen(false);
				const scanToken = ++deleteScanRef.current;
				const scanAlive = () => deleteScanRef.current === scanToken;
				let settleScan = () => {};
				scanPromiseRef.current = new Promise((resolve) => { settleScan = resolve; });
				const targets = selectableIds.filter((id) => selected.has(id));
				// 子代理树（递归）——比较双方都经 normId：byId 的 key 与 parentId
				// 可能一个带 session- 前缀一个是纯 uuid，单向比较会漏掉子代理
				const kids = new Set();
				const findKids = (id) => {
					const target = normId(id);
					for (const [sid, s] of Object.entries(byId)) {
						if (s.origin === "subagent" && normId(s.parentId) === target && !kids.has(sid)) {
							kids.add(sid);
							findKids(sid);
						}
					}
				};
				for (const id of targets) findKids(id);
				const kidsSet = new Set(kids);
				setAllDeleteSubagentIds(kidsSet);
				// 选项记忆：开关开启、上次勾选过、且确有可删子对话时，预勾选全部后代
				setDeleteSubagentIds(rememberedDeleteSelection("subagents", deleteToggles.rememberDeleteOptions, kidsSet));
				// 文件列表：选中会话 + 全部后代子代理（详情面板里勾选子代理后，
				// 其产出文件也应出现在可勾选列表中）
				setDetailLoading(true);
				const files = new Set();
				const dirs = new Set();
				scanFilesRef.current = files;
				scanDirsRef.current = dirs;
				const wsRoots = new Set((workspaceItems ?? []).map((ws) => ws.path).map((p) => (typeof p === "string" ? p.replace(/[\\/]+$/, "") : "")));
				// 记忆预选：渐进扫描期间新发现的文件也并入勾选，直到用户手动改动这一项
				deletePreselectRef.current = deleteToggles.rememberDeleteOptions === true && rememberedDeleteOption("files");
				// 先清掉上一轮弹窗/选择残留，再交给渐进刷新填充（否则会短暂显示上次的文件）
				setAllDeleteFilePaths(new Set());
				setAllDeleteDirs(new Set());
				setDeleteFilePaths(new Set());
				/** 渐进刷新：每扫完一个会话就更新计数与「有没有东西可删」——发现第一个
				 * 文件就不再置灰，后续响应只更新数字（不必等全部扫完）。 */
				const applyProgress = () => {
					if (!scanAlive()) return;
					const filesSet = new Set(files);
					// 推导产出文件夹（文件的直接父目录去重）——文件夹也能勾选删除。
					// 安全规则：工作区根目录绝不作为可删文件夹（AI 直接在工作区根下
					// 生成的文件只删文件本身）；只有工作区根以下的子文件夹才可整删。
					dirs.clear();
					for (const fp of filesSet) {
						const d = dirOf(fp);
						if (d === "" || d === fp || d.endsWith(":")) continue;
						const dNorm = d.replace(/[\\/]+$/, "");
						if (wsRoots.has(dNorm) || wsRoots.size === 0) continue;
						dirs.add(d);
					}
					setAllDeleteFilePaths(filesSet);
					setAllDeleteDirs(dirs);
					if (deletePreselectRef.current) setDeleteFilePaths(new Set([...filesSet, ...dirs]));
				};
				try {
					// 并发读取（上限 6）：串行时"每个子对话一个来回"，有子对话时会明显变慢
					await mapLimit([...targets, ...kidsSet], 6, async (id) => {
						let detail;
						try {
							detail = await api("details", { sessionId: id });
						} catch {
							return; // 单个会话详情失败不影响其他
						}
						for (const f of detail?.files ?? []) files.add(f.path);
						applyProgress();
					});
					applyProgress();
				} finally {
					settleScan();
					if (scanAlive()) setDetailLoading(false);
				}
			};
			const confirmDelete = async () => {
				if (deleting || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				// 点击那一刻已发现的文件快照；确认时若扫描还没结束，等它落定并补上之后才发现的文件，
				// 免得只删"扫到一半"的那部分（用户手动取消勾选过的文件不会被重新勾上）
				const discoveredAtClick = new Set(scanFilesRef.current ?? []);
				for (const d of scanDirsRef.current ?? []) discoveredAtClick.add(d);
				const fileSelection = new Set(deleteFilePaths);
				setDeleting(true);
				setError(null);
				try {
					if (scanPromiseRef.current !== null) await scanPromiseRef.current;
					if (deletePreselectRef.current) {
						for (const fp of scanFilesRef.current ?? []) if (!discoveredAtClick.has(fp)) fileSelection.add(fp);
						for (const d of scanDirsRef.current ?? []) if (!discoveredAtClick.has(d)) fileSelection.add(d);
					}
					await runBatch("delete", targets, { subagentIds: [...deleteSubagentIds], filePaths: [...fileSelection] });
					setSelected(new Set());
					setConfirmOpen(false);
					// s3: 清理被删会话的详情缓存，避免残留过期数据
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setDeleting(false);
				}
			};
			const openSelectedFolder = async () => {
				setError(null);
				const targets = selectableIds.filter((id) => selected.has(id));
				const sessionId = targets.length > 0 ? targets[0] : (current !== void 0 && byId[current] !== void 0 ? current : void 0);
				if (sessionId === void 0) return;
				try {
					await api("open-folder", { sessionId });
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};
			const [archiving, setArchiving] = (0, react.useState)(false);
			const [archiveConfirmOpen, setArchiveConfirmOpen] = (0, react.useState)(false);
			const archiveSelected = async () => {
				if (archiving || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setArchiving(true);
				setError(null);
				try {
					await runBatch("archive", targets);
					setSelected(new Set());
					setArchiveConfirmOpen(false);
					// s3: 归档后详情缓存同样失效（列表归属已变）
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setArchiving(false);
				}
			};
			const unarchiveSelected = async () => {
				if (archiving || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setArchiving(true);
				setError(null);
				try {
					await runBatch("unarchive", targets);
					setSelected(new Set());
					// s3: 移出归档后同样失效缓存
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setArchiving(false);
				}
			};
			const switchViewMode = (0, react.useCallback)((mode) => {
				setViewMode(mode);
				setSelected(new Set());
				setExpandedId(null);
				setDetailsError(null);
				setSelectedFiles(new Set()); // m10: 切视图清文件选择残留
			}, []);
			const toggleFile = (path) => {
				setSelectedFiles((prev) => {
					const next = new Set(prev);
					if (next.has(path)) next.delete(path);
					else next.add(path);
					return next;
				});
			};
			// 文件夹勾选：全选/取消文件夹内所有文件
			const toggleFolderFiles = (flist) => {
				setSelectedFiles((prev) => {
					const next = new Set(prev);
					const paths = flist.map((f) => f.path);
					const allSelected = paths.every((p) => next.has(p));
					for (const p of paths) {
						if (allSelected) next.delete(p);
						else next.add(p);
					}
					return next;
				});
			};
			// m9: 文件删除带确认弹窗（与会话删除一致），避免误点永久删除产出文件
			const [fileConfirmOpen, setFileConfirmOpen] = (0, react.useState)(false);
			const [pendingFileDeleteRow, setPendingFileDeleteRow] = (0, react.useState)(null);
			// 删除文件成功提示（3 秒后自动消失）
			const [fileNotice, setFileNotice] = (0, react.useState)(null);
			const noticeTimer = (0, react.useRef)(null);
			const flashFileNotice = (text) => {
				if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
				setFileNotice(text);
				noticeTimer.current = window.setTimeout(() => {
					setFileNotice(null);
					noticeTimer.current = null;
				}, 3000);
			};
			const requestFileDelete = (row) => {
				setPendingFileDeleteRow(row);
				setFileConfirmOpen(true);
			};
			const doDeleteSelectedFiles = async () => {
				const row = pendingFileDeleteRow;
				setFileConfirmOpen(false);
				setPendingFileDeleteRow(null);
				if (row === null || row === void 0) return;
				// 只删除当前展开行详情里列出的文件，防止误删其它行残留的选中项
				const current = detailsCache.get(row.id);
				const known = new Set((current?.files ?? []).map((file) => file.path));
				const targets = [...selectedFiles].filter((path) => known.has(path));
				if (targets.length === 0 || fileDeleting) return;
				setFileDeleting(true);
				setError(null);
				try {
					// m9: 并行删除 + 汇总失败（不再因单个失败中断全部）；M6: 传 sessionId
					// 让 host 端校验 path 确属该会话产出文件
					const results = await Promise.allSettled(targets.map((path) => api("delete-file", { path, sessionId: row.id })));
					const failed = results.filter((r) => r.status === "rejected");
					if (failed.length > 0) {
						const detail = failed[0].reason instanceof Error ? failed[0].reason.message : "";
						throw new Error(t("batchResult").replace("{ok}", String(targets.length - failed.length)).replace("{fail}", String(failed.length)) + (detail ? `：${detail}` : ""));
					}
					setSelectedFiles(new Set());
					const value = await api("details", { sessionId: row.id });
					// host 端 files 列表来自会话事件记录（write/edit 的 file_path），
					// 删除物理文件后记录仍在——本地剔除已删路径，避免"文件已删但列表还在"
					const removed = new Set(targets);
					const nextValue = {
						...value,
						files: (value.files ?? []).filter((file) => !removed.has(file.path))
					};
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.set(row.id, nextValue);
						return next;
					});
					flashFileNotice(t("fileDeleteDone").replace("{n}", String(targets.length)));
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setFileDeleting(false);
				}
			};
			const renderDetails = (row, data) => {
				const loading = data === void 0 && detailsBusyIds.has(row.id);
				const failed = data === void 0 && detailsError !== null;
				const subagents = data?.lineage?.subagents ?? [];
				// s4: 客户端再截断一道（与服务端 MAX_FILES=200 对齐，双保险）
				const files = (data?.files ?? []).slice(0, 200);
				const stats = data?.stats;
				const toolNames = stats && typeof stats.toolCounts === "object" && stats.toolCounts !== null ? Object.keys(stats.toolCounts) : [];
				const fetchList = stats?.fetches ?? [];
				const fileSelectedCount = files.filter((file) => selectedFiles.has(file.path)).length;
				const statRows = stats === void 0 ? [] : [
					[ t("turns"), stats.turns ],
					[ t("steps"), stats.steps ],
					[ t("userMessages"), stats.userMessages ],
					[ t("assistantMessages"), stats.assistantMessages ],
					[ t("toolCalls"), stats.toolCalls ],
					[ t("attachments"), stats.attachments ]
				];
				return (0, react_jsx_runtime.jsxs)("div", {
					className: pcss.details,
					children: [
						loading && (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("detailsLoading") }),
						failed && (0, react_jsx_runtime.jsx)("div", { className: pcss.error, role: "alert", children: detailsError }),
						data !== void 0 && (0, react_jsx_runtime.jsxs)("div", {
							className: pcss.detailBody,
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: pcss.detailGrid,
									children: [
										(0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("size") }), (0, react_jsx_runtime.jsx)("span", { children: data.sizeBytes === null ? t("na") : formatBytes(data.sizeBytes) })] }),
										(0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("updated") }), (0, react_jsx_runtime.jsx)("span", { children: data.updatedAt ? timeLabel(data.updatedAt, now, t) : t("na") })] })
									]
								}),
								statRows.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.detailSection,
									children: t("activity")
								}),
								statRows.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
									className: pcss.detailGrid,
									children: statRows.map(([label, value]) => (0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: label }), (0, react_jsx_runtime.jsx)("span", { children: value })] }, label))
								}),
								toolNames.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.detailSection,
									children: t("tools")
								}),
								toolNames.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.chips,
									children: toolNames.slice(0, 12).map((name) => (0, react_jsx_runtime.jsxs)("span", { className: pcss.chip, children: [`${name} ×${stats.toolCounts[name]}`] }, name))
								}),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("fetches") }),
								fetchList.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("noFetches") }) : (0, react_jsx_runtime.jsx)("div", {
									className: pcss.fetchList,
									children: fetchList.map((fetch) => (0, react_jsx_runtime.jsxs)("div", {
										className: pcss.fetchRow,
										children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.fetchTool, children: fetch.tool }), fetch.query !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.fetchQuery, title: fetch.query, children: fetch.query })]
									}, `${fetch.tool}:${fetch.query ?? ""}`))
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
									children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, fontWeight: 500, color: "var(--dsw-alias-label-secondary)", lineHeight: "18px" }, children: t("files") }), (0, react_jsx_runtime.jsxs)("label", {
										style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", cursor: "pointer", lineHeight: "18px", marginTop: 2 },
										children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: showFilePaths, onChange: (e) => setShowFilePaths(e.target.checked), style: { cursor: "pointer", margin: 0 } }), "显示路径"]
									})]
								}),
								files.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("noFiles") }) : (() => {
									// 文件分组：工作区根下的直接文件平铺；子文件夹里的文件归入文件夹节点
									// （文件夹可展开查看内部文件）；文件/文件夹多时整体滚动显示
									const wsRoots = (workspaceItems ?? []).map((ws) => ws.path).filter((p) => typeof p === "string").map((p) => p.replace(/[\\/]+$/, ""));
									const groups = new Map();
									const groupFullDirs = new Map();
									const directFiles = [];
									for (const file of files) {
										let root = "";
										for (const r of wsRoots) {
											if (file.path.startsWith(r + "\\") || file.path.startsWith(r + "/")) {
												root = r;
												break;
											}
										}
										if (root === "") {
											// 匹配不到工作区根（文件在注册工作区之外）：兜底显示文件名，
											// 绝不直接显示完整路径
											directFiles.push({ ...file, relName: baseName(file.path) });
											continue;
										}
										const rel = file.path.slice(root.length + 1);
										const sepIdx = Math.max(rel.lastIndexOf("\\"), rel.lastIndexOf("/"));
										if (sepIdx > 0) {
											const folder = rel.slice(0, sepIdx);
											// 记录文件夹完整路径（显示路径开关开启时与文件一致显示完整路径）
											const list = groups.get(folder) ?? [];
											list.push({ ...file, relName: rel.slice(sepIdx + 1) });
											groups.set(folder, list);
											// s5: 浏览器端无 node path，`sep` 不可用——用字面分隔符拼接完整路径
											// （folder 取自 file.path 的原始分隔符；与 dirOf/baseName 的双查一致）
											groupFullDirs.set(folder, root + "\\" + folder);
										} else {
											directFiles.push({ ...file, relName: rel });
										}
									}
									return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
										children: [
											(0, react_jsx_runtime.jsx)("div", {
												style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
												children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [[...groups.entries()].map(([folder, flist]) => (0, react_jsx_runtime.jsxs)("div", {
													key: folder,
													style: { display: "contents" },
													children: [
														(0, react_jsx_runtime.jsxs)("label", {
															// 与文件行完全同款：label.selectAll（同高同样式，杜绝间距差异）
															className: pcss.selectAll,
															children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: flist.every((f) => selectedFiles.has(f.path)), onChange: () => toggleFolderFiles(flist), title: t("selectAll") }), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																"aria-expanded": expandedFileDirs.has(folder),
																"aria-label": expandedFileDirs.has(folder) ? t("subagentCollapse") : t("subagentExpand"),
																style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", flex: "none" },
																onClick: (e) => { e.stopPropagation(); setExpandedFileDirs((prev) => { const next = new Set(prev); if (next.has(folder)) next.delete(folder); else next.add(folder); return next; }); },
																children: (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", transform: expandedFileDirs.has(folder) ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {}) })
															}), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: showFilePaths ? (groupFullDirs.get(folder) ?? folder) : baseName(folder), style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: `📁 ${showFilePaths ? (groupFullDirs.get(folder) ?? folder) : baseName(folder)}（${flist.length}）` })]
														}),
														expandedFileDirs.has(folder) && (0, react_jsx_runtime.jsx)("div", {
															style: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 24 },
															children: flist.map((f) => (0, react_jsx_runtime.jsxs)("label", {
																className: pcss.selectAll,
																children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: selectedFiles.has(f.path), onChange: () => toggleFile(f.path) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: f.path, style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: showFilePaths ? f.path : f.relName })]
															}, f.path))
														})
													]
												})), directFiles.map((f) => (0, react_jsx_runtime.jsxs)("label", {
													className: pcss.selectAll,
													children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: selectedFiles.has(f.path), onChange: () => toggleFile(f.path) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: f.path, style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: showFilePaths ? f.path : (f.relName ?? f.path) })]
												}, f.path))] })
											}),
											(0, react_jsx_runtime.jsx)("div", {
												className: pcss.fileFooter,
												children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													variant: "outline",
													disabled: fileSelectedCount === 0 || fileDeleting,
													onClick: () => requestFileDelete(row), // m9: 先弹确认再删除
													children: fileDeleting ? t("fileDeleting") : `${t("fileDelete")}（${fileSelectedCount}）`
												})
											})
										]
									});
								})(),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("lineage") }),
								// 关联对话区只显示子代理个数（父会话/分叉会话不在详情里列出）
								(0, react_jsx_runtime.jsxs)("div", { className: pcss.lineageRow, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("subagent") }), (0, react_jsx_runtime.jsx)("span", { children: `（${subagents.length}）` })] })
							]
						})
					]
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: pcss.root + (tab === "settings" ? ` ${pcss.rootSettings}` : ""),
				children: [
					(0, react_jsx_runtime.jsx)("div", { className: pcss.heading, children: t("title") }),
					(0, react_jsx_runtime.jsxs)("div", {
						className: pcss.tabs,
						role: "tablist",
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": tab === "all",
								className: `${pcss.tab}${tab === "all" ? ` ${pcss.tabActive}` : ""}`,
								onClick: () => switchTab("all"),
								children: t("tab.all")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": tab === "archived",
								className: `${pcss.tab}${tab === "archived" ? ` ${pcss.tabActive}` : ""}`,
								onClick: () => switchTab("archived"),
								children: t("tab.archived")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": tab === "settings",
								className: `${pcss.tab}${tab === "settings" ? ` ${pcss.tabActive}` : ""}`,
								onClick: () => switchTab("settings"),
								children: t("tab.settings")
							})
						]
					}),
					tab !== "settings" && (0, react_jsx_runtime.jsx)("div", {
						className: pcss.viewBar,
						children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								(0, react_jsx_runtime.jsx)("input", {
									type: "search",
									className: pcss.search,
									value: searchQuery,
									placeholder: t("searchPlaceholder"),
									onChange: (e) => setSearchQuery(e.target.value)
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: pcss.viewSwitch,
									role: "group",
									children: [
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "workspace" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "workspace",
									onClick: () => switchViewMode("workspace"),
									children: t("view.workspace")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "flat" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "flat",
									onClick: () => switchViewMode("flat"),
									children: t("view.flat")
								})
							]
						})
							]
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: pcss.toolbar,
						children: [
							(0, react_jsx_runtime.jsxs)("label", {
								className: pcss.selectAll,
								children: [(0, react_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: allSelected,
									onChange: toggleAll,
									disabled: selectableIds.length === 0
								}), (0, react_jsx_runtime.jsx)("span", { children: t("selectAll") })]
							}),
							(0, react_jsx_runtime.jsx)("span", { className: pcss.count, children: t("selected").replace("{n}", String(selectedCount)) }),
							tab === "all" && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || archiving,
								onClick: () => setArchiveConfirmOpen(true),
								children: archiving ? t("archiving") : t("archive")
							}),
							tab === "archived" && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || archiving,
								onClick: () => void unarchiveSelected(),
								children: archiving ? t("unarchiving") : t("unarchive")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || deleting,
								onClick: () => void openDeleteConfirm(),
								children: deleting ? t("deleting") : t("delete")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: rows.length === 0,
								title: t("openFolderHint"),
								onClick: () => void openSelectedFolder(),
								children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
									children: [(0, react_jsx_runtime.jsx)(primitive("IconFolderOpenOutline16", "IconFolderOpenOutlineRegular"), { size: 14 }), " ", t("openFolder")]
								})
							})
						]
					}),
					error !== null && (0, react_jsx_runtime.jsx)("div", { className: pcss.error, role: "alert", children: error }),
					fileNotice !== null && (0, react_jsx_runtime.jsx)("div", { className: pcss.notice, role: "status", children: fileNotice }),
					workspaceError !== null && workspaceError !== void 0 && (0, react_jsx_runtime.jsx)("div", {
						className: pcss.error,
						role: "alert",
						children: [String(workspaceError.message ?? workspaceError), " ", (0, react_jsx_runtime.jsx)("button", {
							key: "retry",
							type: "button",
							onClick: () => void refresh(),
							children: t("retry")
						})]
					}),
					rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.empty, children: loading ? t("loading") : t(tab === "all" ? "emptyAll" : "emptyArchived") }) : (viewMode === "workspace" ? (0, react_jsx_runtime.jsx)("div", {
						className: pcss.list,
						children: groups.map((group) => (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								(0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									className: pcss.groupHeader,
									"aria-expanded": !collapsedGroups.has(group.key),
									"aria-label": t(collapsedGroups.has(group.key) ? "group.expand" : "group.collapse"),
									title: t(collapsedGroups.has(group.key) ? "group.expand" : "group.collapse"),
									onClick: () => toggleGroup(group.key),
									children: [
										(0, react_jsx_runtime.jsx)("span", { className: pcss.groupCaret, style: { transform: collapsedGroups.has(group.key) ? "rotate(0deg)" : "rotate(90deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {}) }),
										(0, react_jsx_runtime.jsx)("span", { className: pcss.groupTitle, children: group.label }),
										(0, react_jsx_runtime.jsx)("span", { className: pcss.groupCount, children: t("group.sessions").replace("{n}", String(group.rows.length)) })
									]
								}),
								(collapsedGroups.has(group.key) ? [] : group.rows).map((row) => {
									const isSelected = selected.has(row.id);
									const isExpanded = expandedId === row.id;
									const data = isExpanded ? detailsCache.get(row.id) : void 0;
									return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
										children: [
											(0, react_jsx_runtime.jsx)(SessionRow, {
												row,
												isSelected,
												isExpanded,
												hasKids: (subagentCounts.get(normId(row.id)) ?? 0) > 0,
												kidsOpen: expandedParents.has(row.id),
												depth: depthOf.get(row.id) ?? 0,
									reserveToggle,
									orphanHintText: orphanHintOf(row),
												timeText: row.updatedAt !== void 0 && Number.isFinite(row.updatedAt) ? timeLabel(row.updatedAt, now, t) : void 0,
												showSubagentBadge: row.subagent,
												currentText: t("current"),
												currentHintText: t("currentHint"),
												subagentText: t("subagent"),
												detailsLabel: t("details"),
												subagentExpandLabel: t("subagentExpand"),
												subagentCollapseLabel: t("subagentCollapse"),
												onKeyDown: onRowKeyDown,
												onMouseDown: onRowMouseDown,
												onMouseEnter: onRowMouseEnter,
												onToggleKids: toggleSubagents,
												onToggleDetails: toggleDetails
											}),
											isExpanded && renderDetails(row, data)
										]
									}, row.id);
								})
							]
						}, group.key))
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: pcss.list,
						children: rows.map((row) => {
							const isSelected = selected.has(row.id);
							const isExpanded = expandedId === row.id;
							const data = isExpanded ? detailsCache.get(row.id) : void 0;
							return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
								children: [
									(0, react_jsx_runtime.jsx)(SessionRow, {
										row,
										isSelected,
										isExpanded,
										hasKids: (subagentCounts.get(normId(row.id)) ?? 0) > 0,
										kidsOpen: expandedParents.has(row.id),
										depth: depthOf.get(row.id) ?? 0,
									reserveToggle,
									orphanHintText: orphanHintOf(row),
										timeText: row.updatedAt !== void 0 && Number.isFinite(row.updatedAt) ? timeLabel(row.updatedAt, now, t) : void 0,
										showSubagentBadge: row.subagent,
										currentText: t("current"),
										currentHintText: t("currentHint"),
										subagentText: t("subagent"),
										detailsLabel: t("details"),
										subagentExpandLabel: t("subagentExpand"),
										subagentCollapseLabel: t("subagentCollapse"),
										onKeyDown: onRowKeyDown,
										onMouseDown: onRowMouseDown,
										onMouseEnter: onRowMouseEnter,
										onToggleKids: toggleSubagents,
										onToggleDetails: toggleDetails
									}),
									isExpanded && renderDetails(row, data)
								]
							}, row.id);
						})
					})),
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: confirmOpen,
						onClose: () => { if (!deleting) { cancelDeleteScan(); setConfirmOpen(false); } },
						closeLabel: t("close"),
						title: t("delete"),
						description: t("confirm").replace("{n}", String(selectedCount)),
						children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)", marginTop: -8 }, children: t("confirmNote") }), (0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "stretch", paddingTop: 8 },
								children: [deleteOptionRow({
										key: "subagents",
										field: "subagents",
										inputRef: subagentAllRef,
										label: t("deleteCascade"),
										count: allDeleteSubagentIds.size,
										countText: t("optionCount").replace("{n}", String(allDeleteSubagentIds.size)),
										checked: deleteOptionChecked("subagents", deleteToggles.rememberDeleteOptions, allDeleteSubagentIds.size, deleteSubagentIds.size),
										disabled: deleting || allDeleteSubagentIds.size === 0,
										emptyHint: t("optionEmpty"),
										detailLabel: t("deleteDetail"),
										detailOpen: subagentDetailOpen,
										onDetail: () => setSubagentDetailOpen((v) => !v),
										onToggle: (on) => setDeleteSubagentIds(on ? new Set(allDeleteSubagentIds) : new Set())
									}), subagentDetailOpen && (() => {
									// 只显示子代理（选中会话之外的代理）：所有后代（含孙级）都列出
									const kidIds = [...allDeleteSubagentIds];
									const rows = [];
									if (kidIds.length === 0) {
										rows.push((0, react_jsx_runtime.jsx)("div", { key: "__none__", style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: t("deleteDetailNone") }));
									} else {
										for (const sid of kidIds) {
											rows.push((0, react_jsx_runtime.jsxs)("label", {
												key: sid,
												style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
												children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteSubagentIds.has(sid), disabled: deleting, onChange: (e) => setDeleteSubagentIds((prev) => { const next = new Set(prev); if (e.target.checked) next.add(sid); else next.delete(sid); return next; }) }), byId[sid]?.title ?? shortId(sid)]
											}));
										}
									}
									return (0, react_jsx_runtime.jsxs)("div", {
										style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
										children: [(0, react_jsx_runtime.jsxs)("div", {
											style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 },
											children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500 }, children: t("deleteDetailSubagents") }), kidIds.length > 0 && (0, react_jsx_runtime.jsx)("span", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: `（${kidIds.length}）` })]
										}), (0, react_jsx_runtime.jsx)("div", {
											style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
											children: rows
										})]
									});
								})(), deleteOptionRow({
										key: "files",
										field: "files",
										inputRef: filesAllRef,
										label: t("deleteFiles"),
										count: allDeleteFilePaths.size,
										countText: detailLoading && allDeleteFilePaths.size === 0 ? t("optionCount").replace("{n}", "\u2026") : t("optionCount").replace("{n}", String(allDeleteFilePaths.size)),
										checked: deleteOptionChecked("files", deleteToggles.rememberDeleteOptions, allDeleteFilePaths.size, deleteFilePaths.size),
										disabled: deleting || allDeleteFilePaths.size === 0,
										emptyHint: t("optionEmpty"),
										detailLabel: t("deleteDetail"),
										detailOpen: filesDetailOpen,
										onDetail: () => setFilesDetailOpen((v) => !v),
										onToggle: (on) => { deletePreselectRef.current = false; setDeleteFilePaths(on ? new Set([...allDeleteFilePaths, ...allDeleteDirs]) : new Set()); }
									}), filesDetailOpen && (0, react_jsx_runtime.jsxs)("div", {
									style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
									children: [(0, react_jsx_runtime.jsxs)("div", {
										style: { display: "flex", alignItems: "center", gap: 10, marginTop: 2 },
										children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500, lineHeight: "18px" }, children: t("deleteDetailFiles") }), (0, react_jsx_runtime.jsxs)("label", {
											style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", cursor: "pointer", lineHeight: "18px", marginTop: 2 },
											children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: showFilePaths, onChange: (e) => setShowFilePaths(e.target.checked), style: { cursor: "pointer", margin: 0 } }), "显示路径"]
										})]
									}), (0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)", marginBottom: 2 }, children: t("deleteDetailFilesNote") }), [...allDeleteDirs].length === 0 && [...allDeleteFilePaths].length === 0 ? (0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: detailLoading ? t("loading") : t("deleteDetailNone") }) : (() => {
										// 树形分组：文件归入其父目录（文件夹节点可展开查看内部文件）
										const fileGroups = new Map();
										const directFiles = [];
										for (const fp of [...allDeleteFilePaths]) {
											const parent = dirOf(fp);
											if (allDeleteDirs.has(parent)) {
												const list = fileGroups.get(parent) ?? [];
												list.push(fp);
												fileGroups.set(parent, list);
											} else {
												directFiles.push(fp);
											}
										}
										return (0, react_jsx_runtime.jsx)("div", {
											style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
											children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [[...allDeleteDirs].map((dir) => (0, react_jsx_runtime.jsxs)("div", {
												key: dir,
												style: { display: "contents" },
												children: [
													(0, react_jsx_runtime.jsxs)("label", {
														// 与文件行完全同款：label.selectAll
														className: pcss.selectAll,
														children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(dir), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(dir); else next.delete(dir); return next; }) }), (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															"aria-expanded": expandedFileDirs.has(dir),
															"aria-label": expandedFileDirs.has(dir) ? t("subagentCollapse") : t("subagentExpand"),
															style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", flex: "none" },
															onClick: (e) => { e.stopPropagation(); setExpandedFileDirs((prev) => { const next = new Set(prev); if (next.has(dir)) next.delete(dir); else next.add(dir); return next; }); },
															children: (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", transform: expandedFileDirs.has(dir) ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {}) })
														}), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: showFilePaths ? dir : baseName(dir), style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: `📁 ${showFilePaths ? dir : baseName(dir)}（${fileGroups.get(dir)?.length ?? 0}）` })]
													}),
													expandedFileDirs.has(dir) && (0, react_jsx_runtime.jsx)("div", {
														style: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 22 },
														children: (fileGroups.get(dir) ?? []).map((fp) => (0, react_jsx_runtime.jsxs)("label", {
															key: fp,
															style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
															children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(fp), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(fp); else next.delete(fp); return next; }) }), showFilePaths ? fp : baseName(fp)]
														}))
													})
												]
											})), directFiles.map((fp) => (0, react_jsx_runtime.jsxs)("label", {
												key: fp,
												style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
												children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(fp), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(fp); else next.delete(fp); return next; }) }), showFilePaths ? fp : baseName(fp)]
											}))] })
										});
									})()]
								})]
							})]
						}),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: deleting,
							onClick: () => { cancelDeleteScan(); setConfirmOpen(false); },
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							className: pcss.dangerButton,
							disabled: deleting,
							onClick: confirmDelete,
							children: deleting ? t("deleting") : t("deleteConfirm")
						})] })
					}),
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: archiveConfirmOpen,
						onClose: () => { if (!archiving) setArchiveConfirmOpen(false); },
						closeLabel: t("close"),
						title: t("archive"),
						description: t("archiveConfirm").replace("{n}", String(selectedCount)),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: archiving,
							onClick: () => setArchiveConfirmOpen(false),
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: archiving,
							onClick: archiveSelected,
							children: archiving ? t("archiving") : t("archive")
						})] })
					}),
					// m9: 文件删除确认弹窗
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: fileConfirmOpen,
						onClose: () => { if (!fileDeleting) setFileConfirmOpen(false); },
						closeLabel: t("close"),
						title: t("fileDelete"),
						description: t("fileDeleteConfirm").replace("{n}", String(pendingFileDeleteRow !== null && pendingFileDeleteRow !== void 0 ? [...selectedFiles].filter((path) => (detailsCache.get(pendingFileDeleteRow.id)?.files ?? []).some((file) => file.path === path)).length : 0)),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: fileDeleting,
							onClick: () => setFileConfirmOpen(false),
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: fileDeleting,
							onClick: () => void doDeleteSelectedFiles(),
							children: fileDeleting ? t("fileDeleting") : t("fileDelete")
						})] })
					})
					,
					tab === "settings" && (0, react_jsx_runtime.jsxs)("div", { className: pcss.settings, children: [
						(0, react_jsx_runtime.jsx)("div", { className: pcss.settingsTitle, children: t("settings.title") }),
						(0, react_jsx_runtime.jsx)("div", { className: pcss.settingsHint, children: t("settings.hint") }),
						DELETE_TOGGLE_FIELDS.map((field) =>
							(0, react_jsx_runtime.jsxs)("label", { className: pcss.settingsRow, children: [
								(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteToggles[field], onChange: (event) => deleteToggleWriter(field, event.target.checked) }),
								(0, react_jsx_runtime.jsxs)("span", { className: pcss.settingsRowText, children: [
									(0, react_jsx_runtime.jsx)("span", { className: pcss.settingsRowLabel, children: t("settings." + field) }),
									(0, react_jsx_runtime.jsx)("span", { className: pcss.settingsRowHint, children: t("settings." + field + "Hint") })
								] })
							] }, field)),
						(0, react_jsx_runtime.jsxs)("div", { className: pcss.settingsSection, children: [
							(0, react_jsx_runtime.jsx)("div", { className: pcss.settingsTitle, children: t("settings.memoryTitle") }),
							(0, react_jsx_runtime.jsx)("div", { className: pcss.settingsHint, children: t("settings.memoryHint") }),
							(0, react_jsx_runtime.jsxs)("label", { className: pcss.settingsRow, children: [
								(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteToggles[DELETE_MEMORY_FIELD], onChange: (event) => deleteToggleWriter(DELETE_MEMORY_FIELD, event.target.checked) }),
								(0, react_jsx_runtime.jsxs)("span", { className: pcss.settingsRowText, children: [
									(0, react_jsx_runtime.jsx)("span", { className: pcss.settingsRowLabel, children: t("settings." + DELETE_MEMORY_FIELD) }),
									(0, react_jsx_runtime.jsx)("span", { className: pcss.settingsRowHint, children: t("settings." + DELETE_MEMORY_FIELD + "Hint") })
								] })
							] })
						] }),
						deleteConfigStateNode(t, deleteConfig)
					] })
				]
			});
		}
		/** 会话头部操作区的删除按钮组件（conversation.session.header.actions slot）。
		 * 官方 slot 自动注入 sessionId、t 与 useSessions；删除动作通过 onDelete 回调
		 * 由 apply 闭包提供（内部调用 /archived/api/delete 并刷新会话/工作区列表）。
		 * 确认弹窗与设置面板一致：可细粒度勾选删除的子对话（含孙级）与下载/产出文件，
		 * 默认都不勾选——只删所选会话本身。 */
		function DeleteSessionAction({ sessionId, t, useSessions, onDelete, variant, useMenuOpenState }) {
			const deleteToggles = useDeleteToggles();
			// 菜单项变体：官方只给菜单 slot 注入 useMenuOpenState，点选后要先收菜单。
			const menuOpen = variant === "menu" && typeof useMenuOpenState === "function" ? useMenuOpenState() : void 0;
			// overlay 变体（shell.overlay 里那个常驻确认弹窗）靠这条请求知道删哪个会话。
			const requestId = useDeleteRequest();
			const targetId = variant === "overlay" ? requestId : sessionId;
			const [open, setOpen] = (0, react.useState)(false);
			const [deleting, setDeleting] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			// 详情扫描令牌：弹窗关闭/重开后，旧的那轮渐进扫描不再写回状态
			const deleteScanRef = (0, react.useRef)(0);
			// 记忆预选是否仍生效：用户手动改动「文件」选项后置 false，渐进扫描不再自动勾选新文件
			const deletePreselectRef = (0, react.useRef)(false);
			// 渐进扫描中已发现的文件与「扫描落定」的 promise（确认删除要等它，别只删一半）
			const scanFilesRef = (0, react.useRef)(null);
			const scanPromiseRef = (0, react.useRef)(null);
			// 细粒度选项：全部子对话 / 已勾选子对话；全部文件 / 已勾选文件
			const [allSubagentIds, setAllSubagentIds] = (0, react.useState)(() => new Set());
			const [subagentIds, setSubagentIds] = (0, react.useState)(() => new Set());
			const [allFiles, setAllFiles] = (0, react.useState)(() => new Set());
			const [filePaths, setFilePaths] = (0, react.useState)(() => new Set());
			// 可勾选整删的产出文件夹（文件父目录去重；不外推工作区根）
			const [allDirs, setAllDirs] = (0, react.useState)(() => new Set());
			const [expandedFileDirs, setExpandedFileDirs] = (0, react.useState)(() => new Set());
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			const [subagentDetailOpen, setSubagentDetailOpen] = (0, react.useState)(false);
			const [filesDetailOpen, setFilesDetailOpen] = (0, react.useState)(false);
			const [showFilePaths, setShowFilePaths] = (0, react.useState)(false);
			const byId = (typeof useSessions === "function" ? useSessions((s) => s?.byId) : void 0) ?? {};
			// 会话工作目录作为"根"：根本身绝不整删，根以下的子文件夹才可整删
			const sessionCwd = typeof byId[targetId]?.cwd === "string" ? byId[targetId].cwd : void 0;
			/** 打开确认弹窗：收集该会话的全部后代子对话（递归，byId 树）与
			 * 全部下载/产出文件（主会话 + 子对话逐个拉详情）。默认都不勾选。 */
			const openConfirm = async () => {
				setOpen(true);
				setSubagentDetailOpen(false);
				setFilesDetailOpen(false);
				const scanToken = ++deleteScanRef.current;
				const scanAlive = () => deleteScanRef.current === scanToken;
				let settleScan = () => {};
				scanPromiseRef.current = new Promise((resolve) => { settleScan = resolve; });
				const normId = (id) => (typeof id === "string" && id.startsWith("session-") ? id.slice("session-".length) : id);
				const kids = new Set();
				const findKids = (id) => {
					const target = normId(id);
					for (const [sid, s] of Object.entries(byId)) {
						if (s?.origin === "subagent" && normId(s.parentId) === target && !kids.has(sid)) {
							kids.add(sid);
							findKids(sid);
						}
					}
				};
				findKids(targetId);
				const kidsSet = new Set(kids);
				setAllSubagentIds(kidsSet);
				// 选项记忆：开关开启、上次勾选过、且确有可删子对话时，预勾选全部后代
				setSubagentIds(rememberedDeleteSelection("subagents", deleteToggles.rememberDeleteOptions, kidsSet));
				setDetailLoading(true);
				const files = new Set();
				scanFilesRef.current = files;
				// 用主会话详情返回的 cwd 作为"根"（比 byId 投影更可靠）；
				// 拿不到时宁可不推导文件夹（安全：绝不整删未知根目录）
				let rootCwd = typeof sessionCwd === "string" ? sessionCwd : null;
				// 记忆预选：渐进扫描期间新发现的文件也并入勾选，直到用户手动改动这一项
				deletePreselectRef.current = deleteToggles.rememberDeleteOptions === true && rememberedDeleteOption("files");
				// 先清掉上一轮弹窗/选择残留，再交给渐进刷新填充（否则会短暂显示上次的文件）
				setAllFiles(new Set());
				setAllDirs(new Set());
				setFilePaths(new Set());
				/** 渐进刷新：每扫完一个会话就更新计数与「有没有东西可删」——发现第一个
				 * 文件就不再置灰，后续响应只更新数字（不必等全部扫完）。 */
				const applyProgress = () => {
					if (!scanAlive()) return;
					const filesSet = new Set(files);
					// 推导可整删的产出文件夹：文件父目录去重；安全规则——会话工作目录
					// 根绝不整删（AI 直接在工作区根下生成的文件只删文件本身），根以下的
					// 子文件夹可整删。
					const dirs = new Set();
					if (rootCwd !== null && rootCwd !== "") {
						const cwdNorm = rootCwd.replace(/[\\/]+$/, "");
						for (const fp of filesSet) {
							const d = dirOf(fp);
							if (d === "" || d === fp || d.endsWith(":")) continue;
							const dNorm = d.replace(/[\\/]+$/, "");
							if (dNorm === cwdNorm) continue;
							dirs.add(d);
						}
					}
					setAllFiles(filesSet);
					setAllDirs(dirs);
					if (deletePreselectRef.current) setFilePaths(new Set(filesSet));
				};
				try {
					// 并发读取（上限 6）：串行时"每个子对话一个来回"，有子对话时会明显变慢
					await mapLimit([targetId, ...kidsSet], 6, async (id) => {
						let detail;
						try {
							detail = await api("details", { sessionId: id });
						} catch {
							return; // 单个会话详情失败不影响其他
						}
						if (rootCwd === null && typeof detail?.cwd === "string") rootCwd = detail.cwd;
						for (const f of detail?.files ?? []) files.add(f.path);
						applyProgress();
					});
					applyProgress();
					setExpandedFileDirs(new Set());
				} finally {
					settleScan();
					if (scanAlive()) setDetailLoading(false);
				}
			};
			/** 关掉弹窗；overlay 变体还要清掉请求，否则它一直想开着。 */
			const closeDialog = () => {
				if (deleting) return;
				deleteScanRef.current++; // 关掉弹窗后旧的那轮渐进扫描不再写回状态
				setOpen(false);
				if (variant === "overlay") clearSessionDelete();
			};
			const confirmDelete = async () => {
				if (deleting || typeof onDelete !== "function") return;
				// 点击那一刻已发现的文件快照；确认时若扫描还没结束，等它落定并补上之后才发现的文件
				const discoveredAtClick = new Set(scanFilesRef.current ?? []);
				const fileSelection = new Set(filePaths);
				setDeleting(true);
				setError(null);
				try {
					if (scanPromiseRef.current !== null) await scanPromiseRef.current;
					if (deletePreselectRef.current) {
						for (const fp of scanFilesRef.current ?? []) if (!discoveredAtClick.has(fp)) fileSelection.add(fp);
					}
					await onDelete(targetId, { subagentIds: [...subagentIds], filePaths: [...fileSelection] });
					deleteScanRef.current++;
					setOpen(false);
					if (variant === "overlay") clearSessionDelete();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setDeleting(false);
				}
			};
			const toggleFile = (path) => {
				setFilePaths((prev) => {
					const next = new Set(prev);
					if (next.has(path)) next.delete(path);
					else next.add(path);
					return next;
				});
			};
			// overlay 条目本身没有按钮：请求一到就打开弹窗，请求清空即卸载。
			(0, react.useEffect)(() => {
				if (variant !== "overlay") return;
				if (requestId === null) { setOpen(false); return; }
				void openConfirm();
			}, [variant, requestId]);
			const deleteEntryOn = variant === "menu" ? deleteToggles.deleteInMenu : variant === "row" ? deleteToggles.deleteInSidebar : deleteToggles.deleteInHeader;
			if (variant === "overlay" ? requestId === null : !deleteEntryOn) return null;

			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [
					variant === "menu" ? (0, react_jsx_runtime.jsx)(MenuRow, {
						danger: true,
						separatorBefore: true,
						icon: (0, react_jsx_runtime.jsx)(primitive("IconTrashOutline16", "IconTrashOutlineRegular"), { size: 14 }),
						onSelect: () => {
							if (menuOpen !== void 0) menuOpen[1](false);
							requestSessionDelete(sessionId);
						},
						children: t("headerDelete")
					}) : 					variant === "overlay" ? null : (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: variant === "row" ? pcss.rowDelete : pcss.headerDelete,
						"aria-label": t("headerDelete"),
						title: t("headerDeleteHint"),
						onClick: () => requestSessionDelete(sessionId),
						children: (0, react_jsx_runtime.jsx)(primitive("IconTrashOutline16", "IconTrashOutlineRegular"), {})
					}),
					variant === "menu" ? null : (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: open,
						onClose: () => closeDialog(),
						closeLabel: t("close"),
						title: t("headerDelete"),
						description: t("headerDeleteConfirm"),
						children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								error !== null && (0, react_jsx_runtime.jsx)("div", { className: pcss.error, role: "alert", children: error }),
								(0, react_jsx_runtime.jsxs)("div", {
									style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "stretch", paddingTop: 8 },
									children: [
										deleteOptionRow({
											key: "subagents",
											field: "subagents",
											label: t("deleteCascade"),
											count: allSubagentIds.size,
											countText: t("optionCount").replace("{n}", String(allSubagentIds.size)),
											checked: deleteOptionChecked("subagents", deleteToggles.rememberDeleteOptions, allSubagentIds.size, subagentIds.size),
											disabled: deleting || allSubagentIds.size === 0,
											emptyHint: t("optionEmpty"),
											detailLabel: t("deleteDetail"),
											detailOpen: subagentDetailOpen,
											onDetail: () => setSubagentDetailOpen((v) => !v),
											onToggle: (on) => setSubagentIds(on ? new Set(allSubagentIds) : new Set())
										}),
										subagentDetailOpen && (0, react_jsx_runtime.jsxs)("div", {
											style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 },
													children: [
														(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500 }, children: t("deleteDetailSubagents") }),
														allSubagentIds.size > 0 && (0, react_jsx_runtime.jsx)("span", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: `（${allSubagentIds.size}）` })
													]
												}),
												(0, react_jsx_runtime.jsx)("div", {
													style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
													children: allSubagentIds.size === 0 ? (0, react_jsx_runtime.jsx)("div", { key: "__none__", style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: t("deleteDetailNone") }) : [...allSubagentIds].map((sid) => (0, react_jsx_runtime.jsxs)("label", {
														key: sid,
														style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
														children: [
															(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: subagentIds.has(sid), disabled: deleting, onChange: (e) => setSubagentIds((prev) => { const next = new Set(prev); if (e.target.checked) next.add(sid); else next.delete(sid); return next; }) }),
															(0, react_jsx_runtime.jsx)("span", { className: pcss.title, style: { flex: 1 }, children: byId[sid]?.title ?? shortId(sid) })
														]
													}))
												})
											]
										}),
										deleteOptionRow({
											key: "files",
											field: "files",
											label: t("deleteFiles"),
											count: allFiles.size,
											countText: detailLoading && allFiles.size === 0 ? t("optionCount").replace("{n}", "\u2026") : t("optionCount").replace("{n}", String(allFiles.size)),
											checked: deleteOptionChecked("files", deleteToggles.rememberDeleteOptions, allFiles.size, filePaths.size),
											disabled: deleting || allFiles.size === 0,
											emptyHint: t("optionEmpty"),
											detailLabel: t("deleteDetail"),
											detailOpen: filesDetailOpen,
											onDetail: () => setFilesDetailOpen((v) => !v),
											onToggle: (on) => { deletePreselectRef.current = false; setFilePaths(on ? new Set(allFiles) : new Set()); }
										}),
										filesDetailOpen && (0, react_jsx_runtime.jsxs)("div", {
											style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													style: { display: "flex", alignItems: "center", gap: 10, marginTop: 2 },
													children: [
														(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500, lineHeight: "18px" }, children: t("deleteDetailFiles") }),
														(0, react_jsx_runtime.jsxs)("label", {
															style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", cursor: "pointer", lineHeight: "18px", marginTop: 2 },
															children: [
																(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: showFilePaths, onChange: (e) => setShowFilePaths(e.target.checked), style: { cursor: "pointer", margin: 0 } }),
																t("showPaths")
															]
														})
													]
												}),
												(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)", marginBottom: 2 }, children: t("deleteDetailFilesNote") }),
												allFiles.size === 0 && allDirs.size === 0 ? (0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: detailLoading ? t("loading") : t("deleteDetailNone") }) : (() => {
													// 树形分组：文件归入其父目录（可整删的文件夹节点展开显示内部文件）
													const fileGroups = new Map();
													const directFiles = [];
													for (const fp of [...allFiles]) {
														const parent = dirOf(fp);
														if (allDirs.has(parent)) {
															const list = fileGroups.get(parent) ?? [];
															list.push(fp);
															fileGroups.set(parent, list);
														} else {
															directFiles.push(fp);
														}
													}
													return (0, react_jsx_runtime.jsx)("div", {
														style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
														children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [[...allDirs].map((dir) => (0, react_jsx_runtime.jsxs)("div", {
															key: dir,
															style: { display: "contents" },
															children: [
																(0, react_jsx_runtime.jsxs)("label", {
																	// 与文件行完全同款：label.selectAll（同高同样式，杜绝间距差异）
																	className: pcss.selectAll,
																	children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: filePaths.has(dir), disabled: deleting, onChange: (e) => setFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(dir); else next.delete(dir); return next; }) }), (0, react_jsx_runtime.jsx)("button", {
																		type: "button",
																		"aria-expanded": expandedFileDirs.has(dir),
																		"aria-label": expandedFileDirs.has(dir) ? t("subagentCollapse") : t("subagentExpand"),
																		style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", flex: "none" },
																		onClick: (e) => { e.stopPropagation(); setExpandedFileDirs((prev) => { const next = new Set(prev); if (next.has(dir)) next.delete(dir); else next.add(dir); return next; }); },
																		children: (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", transform: expandedFileDirs.has(dir) ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(primitive("IconTriangleRightFill14", "IconTriangleRightFillRegular"), {}) })
																	}), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: showFilePaths ? dir : baseName(dir), style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: `📁 ${showFilePaths ? dir : baseName(dir)}（${fileGroups.get(dir)?.length ?? 0}）` })]
																}),
																expandedFileDirs.has(dir) && (0, react_jsx_runtime.jsx)("div", {
																	style: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 22 },
																	children: (fileGroups.get(dir) ?? []).map((fp) => (0, react_jsx_runtime.jsxs)("label", {
																		key: fp,
																		style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
																		children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: filePaths.has(fp), disabled: deleting, onChange: () => toggleFile(fp) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, style: { flex: 1 }, children: showFilePaths ? fp : baseName(fp) })]
																	}))
																})
															]
														})), directFiles.map((fp) => (0, react_jsx_runtime.jsxs)("label", {
															key: fp,
															style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
															children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: filePaths.has(fp), disabled: deleting, onChange: () => toggleFile(fp) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, style: { flex: 1 }, children: showFilePaths ? fp : baseName(fp) })]
														}))] })
													});
												})()
											]
										})
									]
								})
							]
						}),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									disabled: deleting,
									onClick: () => closeDialog(),
									children: t("cancel")
								}),
								(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "outline",
									className: pcss.dangerButton,
									disabled: deleting,
									onClick: () => void confirmDelete(),
									children: deleting ? t("deleting") : t("deleteConfirm")
								})
							]
						})
					})
				]
			});
		}
		/** Refresh the client catalogues after a mutation. The Session controller still
 * exposes refresh(); the Workspace service now pushes its model from the Host
 * and dropped refresh(), so it is called only where a deployment still has one. */
async function refreshClientCatalogues(ctx) {
	if (typeof ctx.sessions?.refresh === "function") await ctx.sessions.refresh();
	if (typeof ctx.workspaces?.refresh === "function") await ctx.workspaces.refresh();
}
function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-archived-sessions: dictionaries");
			const t = ctx.locale.bind(NS);
			// 重新挂载（热更新或依赖重启）时复位开关与落地状态，免得沿用上一轮残留。
			adoptDeleteToggles(void 0);
			publishDeleteConfigState({ status: "loading", writable: false, mode: void 0, saving: false, error: null });
			// 删除入口开关 = host Config 里三个 volatile() 字段，走官方 settings 文档：
			// configForms 是兄弟插件（ui-settings）提供的服务（inject 里已声明），写入用官方
			// form.set() 并等待结果；读写失败都会显示在设置页底部。
			const configForms = clientConfigForms(ctx);
			const form = configForms !== void 0 && typeof configForms.get === "function" ? configForms.get(DELETE_CONFIG_ID) : void 0;
			if (form !== void 0 && typeof form.getSnapshot === "function") {
				const sync = () => {
					const snapshot = form.getSnapshot();
					adoptDeleteToggles(snapshot.value);
					publishDeleteConfigState({ status: snapshot.status ?? "loading", writable: snapshot.writable === true, mode: snapshot.mode, saving: false });
				};
				sync();
				ctx.effect(() => form.subscribe(sync), "dsh-archived-sessions: delete toggles");
				deleteToggleWriter = (field, on) => {
					// 先乐观改内存，再写宿主；写失败会把原因显示在设置页底部。
					adoptDeleteToggles({ ...getDeleteToggles(), [field]: on });
					publishDeleteConfigState({ saving: true, error: null });
					let pending;
					try { pending = form.set(field, on); }
					catch (reason) { publishDeleteConfigState({ saving: false, error: { code: "refused", message: writeFailureText(reason) } }); return; }
					Promise.resolve(pending).then((accepted) => {
						if (accepted !== true) { publishDeleteConfigState({ saving: false, error: { code: "refused" } }); return; }
						publishDeleteConfigState({ saving: false, error: null });
						flashDeleteConfigSaved();
					}, (reason) => {
						publishDeleteConfigState({ saving: false, error: { code: "refused", message: writeFailureText(reason) } });
					});
				};
			} else {
				publishDeleteConfigState({ status: "unavailable", writable: false, saving: false });
				deleteToggleWriter = (field, on) => {
					adoptDeleteToggles({ ...getDeleteToggles(), [field]: on });
					publishDeleteConfigState({ saving: false, error: { code: "unavailable" } });
				};
			}

			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "archived-sessions",
				order: 200,
				label: () => t("nav"),
				locale: NS,
				inject: () => ({ refresh: () => refreshClientCatalogues(ctx) })
			}, ArchivedSessionsSection));
			// 会话头部操作区的删除按钮：官方 rc.8 侧边栏行菜单（⋮）只硬编码
			// 重命名/分叉/归档，没有"删除会话"且不暴露插件注入点；会话头部操作区
			// （conversation.session.header.actions）是官方 slot（scope: session，
			// 组件自动接收 sessionId），本插件在此提供删除入口——发布后任何导入本
			// 插件的部署都能获得删除能力。删除走 /archived/api/delete（与设置面板
			// 同一 API，含 running 409 保护与 0.1.5 的 live 会话清理）。
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "archived-sessions-delete",
				order: 300,
				locale: NS
			}, (props) => DeleteSessionAction({
				...props,
				onDelete: async (sessionId, options = {}) => {
					// options: { subagentIds, filePaths } —— 与设置面板删除一致，
					// 空数组=不级联/不删文件，非空=细粒度删除（走 host 的 filePaths 分支）
					await api("delete", { sessionId, ...options });
					await refreshClientCatalogues(ctx);
				}
			})));
			// 侧边栏会话行的悬停按钮条（官方 slot）：order 300 排在官方 archive(100)/pin(200) 之后，
			// 也就是「…」按钮右边的最末位。复用头部同一个确认弹窗，只是换成行内 16px 变体。
			ctx.slots.inject("sidebar.workspaces.session.row.action", () => ctx.slots.register({
				name: "sidebar.workspaces.session.row.action",
				id: "archived-sessions-delete",
				order: 300,
				locale: NS
			}, (props) => DeleteSessionAction({
				...props,
				variant: "row",
				onDelete: async (sessionId, options = {}) => {
					await api("delete", { sessionId, ...options });
					await refreshClientCatalogues(ctx);
				}
			})));
			// 侧边栏会话行「…」菜单里的删除项（官方 slot）：order 450 落在官方 archive(400) 之后，
			// separatorBefore 把它与官方那组隔开；点它先收菜单，再向 overlay 弹窗登记请求。
			ctx.slots.inject("sidebar.workspaces.session.menu.item", () => ctx.slots.register({
				name: "sidebar.workspaces.session.menu.item",
				id: "archived-sessions-delete",
				order: 450,
				locale: NS
			}, (props) => DeleteSessionAction({
				...props,
				variant: "menu",
				onDelete: async (sessionId, options = {}) => {
					await api("delete", { sessionId, ...options });
					await refreshClientCatalogues(ctx);
				}
			})));
			// 确认弹窗本体放进 shell.overlay（frame 级浮层）：菜单项会随菜单一起卸载，
			// 弹窗若长在菜单里就会跟着消失（官方 rename/archive 同款做法）。overlay 的
			// standardProps 自带 useSessions，所以弹窗照旧能读到会话投影。
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "archived-sessions-delete-confirm",
				order: 200,
				locale: NS
			}, (props) => DeleteSessionAction({
				...props,
				variant: "overlay",
				onDelete: async (sessionId, options = {}) => {
					await api("delete", { sessionId, ...options });
					await refreshClientCatalogues(ctx);
				}
			})));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
