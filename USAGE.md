# dsh-archived-sessions 使用手册（v0.2.0）

> 安装方法见 README（方式一 tarball / 方式二让智能体安装）。本文只讲**怎么用**。

> **关于本项目**：这是 [Zephyr-vibe/dsh-archived-sessions](https://github.com/Zephyr-vibe/dsh-archived-sessions) 的 **fork**，由 **AkotaP** 二次开发维护，仓库在 [AkotaP/dsh-archived-sessions](https://github.com/AkotaP/dsh-archived-sessions)；相对上游的改动见 README 的更新日志。本手册对应 **v0.2.0**（面向 DSH 核心 **0.1.7-rc.2**）。

## 中文

### 会话列表

- **双标签**：所有对话 / 归档会话
- **视图**：默认按工作区（无归属会话归入「未分组」），可切换单列表；**点工作区标题即可折叠 / 展开该组**（标题前有三角指示），「所有对话」和「归档会话」两个标签页都支持
- **搜索框**：按标题或 ID 实时过滤
- **行操作**：勾选 / 全选 / 展开详情 / 展开子代理（箭头）
- **滑动批量勾选（长按左键拖选）**：在某一行**按住左键**不放，那一行的状态决定方向——原本没勾就进入「连续加选」，原本已勾就进入「连续取消」；然后**上下滑动**，滑过哪些会话行就跟着变，**松开左键**结束（在窗口外松开、或切走页面也会自动结束）。单独点复选框仍是逐行切换
- 当前打开的会话带「当前」徽标，不可删除

### 详情面板（点行右侧箭头展开）

- **基本信息**：占用空间、最后更新、活动统计（轮次 / 步骤 / 消息数 / 工具调用分布 / fetch 记录）
- **关联对话**：只显示子代理个数
- **下载/产出文件**：
  - 树形显示：文件夹可展开查看内部文件，文件多时列表内滚动
  - **显示路径开关**：默认只显示文件名，打开后实时切换完整路径
  - **文件夹勾选** = 全选内部文件；单个文件可独立勾选
- **删除选中文件**：带确认弹窗；删除后自动清理空父目录

### 删除会话（勾选后点「删除选中」）

确认弹窗包含：

```
确认删除 N 个会话？
会话记录将被永久删除，此操作不可恢复。
☐ 删除其下子对话（子代理）      ← 勾选 = 级联删所有后代子代理（含孙级）
☐ 删除所有下载文件/产出文件    ← 勾选 = 删除文件
```

- 两个选项**默认都不勾选**——只删会话本身
- 两项右侧显示**可删数量**，并且**边扫边刷新**：有子对话时数字会逐个会话补上来，扫到第一个产出文件就不再置灰（还没扫完时可能显示「（…）」）；某项没有可删内容时整行**置灰、复选框禁用**（悬停说明「没有可删除的内容」）
- 开启「设置 → 删除确认弹窗 → 记住上次的选项」后，每次打开弹窗都**沿用上次对这两项的勾选**
- 点选项右侧箭头可展开查看详情：
  - 子代理区：只显示子代理（含孙级等全部后代）+ 个数，可逐个勾选
  - 文件区：文件夹/文件树，可勾选文件夹（整删，含递归）或单个文件
- 删除后自动清理空父目录（直到非空或工作区根）

### 删除入口与设置

删除入口有三处，都弹同一个细粒度确认框；是否显示可在 **会话管理 → 设置** 里分别开关（默认**只开**侧边栏行内那个）：

| 入口 | 位置 | 默认 |
|---|---|---|
| 侧边栏会话行删除按钮 | 左侧工作区列表里，**悬停会话行**时「…」右边的垃圾桶图标 | 开 |
| 会话头部删除按钮 | 打开对话后，标题栏右侧的垃圾桶图标 | 关 |
| 「…」菜单里的删除项 | 会话行「…」下拉菜单中的「删除会话」 | 关 |

「设置」标签页还有第二个分区 **删除确认弹窗 → 记住上次的选项**：开启后，每次打开删除确认弹窗都沿用上次对「删除子对话」「删除产出文件」的勾选（记忆值存在浏览器 `localStorage`；细粒度勾选依赖具体文件路径，不记忆）。开关改完立即生效，成功时设置页底部闪一行绿字，失败则红字显示宿主原文。

### 归档

- 勾选后「归档」= 隐藏记录（**不删除**），可随时移出归档
- 归档页有独立的批量删除入口

### 注意事项

1. **删除不可恢复**：会话记录/文件删除后无法找回
2. **工作区根目录绝不删除**：即使勾选了文件/文件夹，根本身受保护；根下直接文件只删文件本身
3. **文件列表是历史记录**：显示该会话产出过的文件；已物理删除的文件不再显示
4. **默认不勾选**：删除弹窗两个选项默认关闭，按需手动勾选
5. **API 仅本机**：`--host 0.0.0.0` 启动时插件不可用（403）
6. **运行中的会话**删除会被拒绝（409），先停止会话
7. 当前会话（UI 打开的那个）不可删除

---

## English

> For installation, see README (Option 1 tarball / Option 2 let an agent install it). This document covers **usage only**.

> **About this project**: this is a **fork** of [Zephyr-vibe/dsh-archived-sessions](https://github.com/Zephyr-vibe/dsh-archived-sessions), further developed and maintained by **AkotaP** at [AkotaP/dsh-archived-sessions](https://github.com/AkotaP/dsh-archived-sessions); see the README changelog for what the fork changed. This manual covers **v0.2.0** (built for DSH core **0.1.7-rc.2**).

### Session list

- **Two tabs**: All conversations / Archived
- **View**: by workspace by default (unassigned sessions fall into "Ungrouped"); switchable to a flat list — **click a workspace heading to collapse / expand that group** (with a disclosure triangle), on both the All conversations and Archived tabs
- **Search box**: filter by title or id in real time
- **Row actions**: checkbox / select-all / expand details / expand subagents (arrow)
- **Press-and-drag multi-select**: **hold the left button** on a row — its current state picks the direction (unchecked = "keep adding", checked = "keep removing") — then **slide up or down**: every session row you pass follows that direction. Releasing the button ends the gesture (as does releasing outside the window or switching away from the page). Clicking a single checkbox still toggles one row
- The currently open session shows a "Current" badge and cannot be deleted

### Detail panel (click the chevron on a row)

- **Basics**: size on disk, last update, activity stats (turns / steps / messages / tool-call distribution / fetches)
- **Related conversations**: shows only the subagent count
- **Downloaded/produced files**:
  - Tree view: folders expand to show inner files; the list scrolls when long
  - **"Show paths" toggle**: filenames by default, full paths in real time
  - **Folder checkbox** = select all inner files; individual files can be checked separately
- **Delete selected files**: confirmation dialog; empty parent directories are pruned automatically

### Deleting sessions (select rows, then "Delete selected")

The confirmation dialog contains:

```
Confirm deleting N session(s)?
Session logs will be permanently removed. This cannot be undone.
☐ Delete their sub-conversations (subagents)      <- cascades to ALL descendant subagents (incl. grandchildren)
☐ Delete all downloaded/produced files            <- deletes files
```

- Both options are **unchecked by default** — only the session itself is removed
- Each option shows a **count** that **fills in as the scan runs** (with subagents the number grows session by session, and the first produced file un-greys the option; an incomplete scan may show "（…）"); an option with nothing to delete is **greyed out with its checkbox disabled** (hover says "nothing to delete")
- With Settings → Delete confirmation dialog → "Remember the last choice" on, every dialog **reuses your last selections**
- Click the arrow next to an option to inspect:
  - Subagents: only subagents (all descendants incl. grandchildren) with a count; check each individually
  - Files: folder/file tree; check a folder (whole removal, recursive) or single files
- Empty parent directories are pruned after deletion (up to the first non-empty dir or the workspace root)

### Delete entries & Settings

There are three delete entries, all sharing one fine-grained confirmation dialog; each can be switched on or off under **Session manager → Settings** (only the in-row sidebar button starts on):

| Entry | Where | Default |
|---|---|---|
| Sidebar row delete button | Trash icon right of the "…" trigger **while hovering a session row** in the left workspace list | On |
| Session header delete button | Trash icon at the right of the title bar once a conversation is open | Off |
| "Delete session" row in the "…" menu | The session row's "…" dropdown | Off |

The Settings tab has a second section, **Delete confirmation dialog → Remember the last choice**: when on, every dialog reuses your last "delete sub-conversations" / "delete produced files" choices (the memory lives in the browser's `localStorage`; fine-grained per-file selections depend on concrete paths and are not remembered). Switches apply immediately — a green line flashes on success, and a failure shows the host's message in red.

### Archive

- Select rows and "Archive" = hide the records (**no deletion**); unarchive anytime
- The Archived tab has its own batch-delete entry

### Notes

1. **Deletion is irreversible**: session logs/files cannot be recovered
2. **Workspace roots are never deleted**: even with files/folders selected, the root itself is protected; files directly under the root are removed as files only
3. **The file list is history**: it reflects files produced by the session; physically deleted files no longer appear
4. **Nothing is checked by default** in the delete dialog — opt in deliberately
5. **Loopback-only API**: starting the web app with `--host 0.0.0.0` makes the plugin unavailable (403)
6. **Running sessions** are refused on delete (409) — stop them first
7. The session currently open in the UI cannot be deleted
