# dsh-archived-sessions 维护手册（交接文档）

> 本文件面向**接手维护的人（或 AI）**。0.2.0 这一轮把插件从"手改产物 + 私有配置存储"迁到了**官方 settings 通道 + 规范依赖声明**，下面的规则都是照着 DSH 源码与实际踩坑核对过的，改动前先读完「依赖与解析」「配置通道」「常见坑」三节。

## 0. Fork 血统

- **上游**：`https://github.com/Zephyr-vibe/dsh-archived-sessions`（作者 Zephyr-vibe，MIT，版权声明保留在 `LICENSE` 里，**不要改动它**）
- **本仓库**：`https://github.com/AkotaP/dsh-archived-sessions`（fork，由 AkotaP 二次开发维护）
- 提交信息、README 的 Fork 声明、`package.json` 的 `author/contributors/repository/bugs` 都要与这两条保持一致；发布到 npm 时包名仍是 `dsh-archived-sessions`（fork 若要另发一版建议改名或加 scope）

## 1. 项目概况

- **host 端**：`lib/index.js`（Node ESM；把 `/archived/api/*` 挂在官方 webServer 上：details / delete / delete-file / open-folder / archive / unarchive）
- **client 端**：`lib/client.js`（浏览器 bundle，形如 `window.__ModuleLoader__.load({ id, factory })`；设置页 UI + 三个删除入口）
- **清单**：`package.json` 的 `dsh.bundle.patch`（`cordis.patch.yml` 里 insert 一个 id 为 `dsh-archived-sessions` 的条目）+ `dsh.client.inject`（客户端半边用到的包）
- **当前版本**：0.2.0（未发版——上游最后发布的是 0.1.5，本 fork 自 0.2.0 起独立编号，本批未提交的改动全部计入 0.2.0）；core 目标 0.1.7-rc.2

## 2. 代码位置与安装方式

| 用途 | 路径 |
|---|---|
| 开发仓库（唯一真相） | `E:\Data\Project\dsh\dsh-archived-sessions` |
| desktop profile 里的挂载 | `%USERPROFILE%\.dsh\profiles\desktop\node_modules\dsh-archived-sessions`（**junction** 指向上面那个仓库） |
| profile 清单 | `%USERPROFILE%\.dsh\profiles\desktop\package.json` 的 `dsh.profile.bundles` |

- 这是 **link 安装**：仓库改了就是"运行版"改了，**不存在第二份副本、也不需要 SHA 同步**（旧文档里的"双份逐字节一致"已作废）。
- 仓库里的 `node_modules` 只在**链接安装下**供宿主解析（见第 3 节），不要提交进 git。

## 3. 依赖与解析规则（★ 最容易踩）

| 半边 | 解析方式 | 结论 |
|---|---|---|
| **host**（`lib/index.js`） | Node 原生 ESM：裸包名只沿**模块自己所在目录**往上找 | 要用 DSH 的包就必须**声明并在插件自己的 node_modules 里装好**；`@deepseek-ai/*` 不会从 app.asar 里"顺便"解析到 |
| **client**（`lib/client.js`） | DSH 自己的客户端模块表（`__ModuleLoader__`） | 只要把包名写进 `package.json` 的 `dsh.client.inject`，**不需要安装** |

- `dsh-app-boot` 里的 `bareModuleBaseUrl` 只特判 **cordis 条目名**从哪加载，**不管条目内部的 import**；全仓唯一的 `registerHooks` 只搬 `libreoffice-kit-*` 的原生二进制。
- 生态惯例（可直接抄）：`dependencies` 放**宿主真 import** 的包（如 `@deepseek-ai/schemastery`），`peerDependencies` 只留 `@deepseek-ai/cordis`，其余 DSH 包进 `peerDependencies` + `peerDependenciesMeta.optional`（仅供类型/文档，不强制安装）。
- `engines.dsh` 用生态同款形态（`">=0.1.7-rc.2"`）。

## 4. 配置通道（★ 官方 settings 文档）

「删除入口」三个开关 + 删除确认弹窗的「选项记忆」开关的**唯一事实来源**是宿主 `Config` 里四个字段，**必须标 `volatile()`**：

```js
const Config = z.object({
  deleteInHeader: z.boolean().default(false).volatile(),
  deleteInSidebar: z.boolean().default(true).volatile(),
  deleteInMenu: z.boolean().default(false).volatile(),
  rememberDeleteOptions: z.boolean().default(false).volatile(),
});
```

> 只有**开关**进配置文档（客户端 `DELETE_CONFIG_FIELDS` 与之一一对应）；「上次勾选了什么」这类记忆值不进配置，存在浏览器 `localStorage`（`dsh-archived-sessions/delete-options`），无存储环境时只在本次运行内有效。两个删除弹窗共用 `deleteOptionRow` 渲染选项行（计数徽标 + 勾选红色强调 + 无内容置灰禁用；置灰时若记忆开着且上次勾选过仍保留勾选态）。
> 详情读取走 `mapLimit`（上限 6 并发）+ **渐进刷新**：每扫完一个会话就更新计数与可用状态，扫到第一个产出文件立刻解除置灰，后续响应只更新数字；未扫完且一个都没发现时计数显示「（…）」。确认删除时若扫描未结束会先 `await` 扫描 promise，并补上「点下确认之后才发现的文件」（用点击时的快照做差集，用户手动取消过的文件不会被重新勾上）。弹窗关闭/重开用 `deleteScanRef` 令牌作废旧扫描的回写。

- 原因：`dsh-settings` 的 `volatileForm()` / `isVolatilePath()` **只投影 volatile 字段**；不标 → 该条目连 settings 文档都进不去，写入直接被拒（错误文案 `Plugin entry "…" has no volatile fields`）。
- `.volatile()` 是 **DSH 对 schemastery 的补丁**，只在 `@deepseek-ai/schemastery` **3.18.3+**（当前 3.18.4）里有；npm 上游裸包 `schemastery` 与 `@deepseek-ai/schemastery@3.18.2` 都**没有**。所以 `dependencies` 必须钉 `^3.18.4`，并保证它被装进本插件的 `node_modules`。
- 客户端：`inject` 里声明 `"configForms"`（兄弟插件 `dsh-client-ui-settings` 提供的 cordis 服务；服务查找只沿父链走 + facade 按 `inject` 门禁，不声明拿到的是 `undefined`），然后
  ```js
  const form = ctx.configForms.get("dsh-archived-sessions");
  form.subscribe(() => adopt(form.getSnapshot().value));   // snapshot: {status,value,revision,writable,mode}
  form.set(field, value);                                  // 提交一次操作，resolve(true/false)
  ```
- 写失败**必须让用户看见**：设置页底部的状态行事——成功闪绿字（`settings.saved`，2.5s 自动收起），失败红字带宿主原文；**不要**再弄常驻说明行。

## 5. 生效机制

- **client.js 改动**：`dsh-client-hmr` 轮询到文件变化后重新加载 bundle → 页面**不用手动刷新**（但样式要小心，见第 7 节）。
- **index.js（host）改动**：必须**重启 DSH**（host 模块不参与热更新）。⚠️ 重启会打断正在跑的会话，**先问主人**，不要擅自重启。
- 想省掉重启：可在 profile 的 `cordis.patch.yml` 加
  ```yaml
  - id: hmr
    name: "@deepseek-ai/dsh-hmr"
    config: { root: ["E:/Data/Project/dsh/dsh-archived-sessions/lib"] }
  ```
  （`base/ignored/debounce` 都有默认值）——这属于改 `~/.dsh` 配置，需主人点头。

## 6. 槽位契约（删除入口）

| 入口 | slot | id / order |
|---|---|---|
| 会话标题栏垃圾桶 | `conversation.session.header.actions` | `archived-sessions-delete` / 300 |
| 侧边栏会话行悬停按钮（「…」右边） | `sidebar.workspaces.session.row.action` | 同上 / 300（官方 archive 100、pin 200 之后） |
| 「…」菜单里的删除项 | `sidebar.workspaces.session.menu.item` | 同上 / 450（官方 pin 100 / rename 200 / fork 300 / archive 400 之后） |
| 确认弹窗 | `shell.overlay` | `archived-sessions-delete-confirm` / 200 |

- **弹窗必须放 `shell.overlay`**：菜单项是 `Menu` 的 children，会随菜单一起卸载；弹窗若长在菜单里，`setMenuOpen(false)` 与 `setOpen(true)` 同批处理后会一起消失（表现为"点了没反应"）。
- 菜单行用官方 `MenuItemButton`（`danger` + `separatorBefore` + 图标），点选先 `useMenuOpenState()[1](false)` 收菜单，再登记删除请求。
- 三个入口共用同一个"请求源"（模块级 `deleteRequestSessionId` + `useSyncExternalStore`），弹窗由 overlay 条目渲染。

## 7. 样式（插件自己注入的 CSS）

- 插件的 `<style data-plugin-css="…">` **每次加载都会先移除同名旧标签再重新投放**；不要改回"head 里没有才插"——热更新后旧标签还在，新 CSS 永远不生效（改颜色这类改动会看着像没做）。
- 与官方样式抢同一条属性时用**双类名提权**（`.aRchv_rowDelete.aRchv_rowDelete:hover`），因为官方 `.iconButton:hover` 与本插件规则同为单类权重。
- 危险操作配色：静止 `--dsw-alias-state-error-secondary`（浅红）→ 悬停/聚焦 `--dsw-alias-state-error-primary`（正红）+ `--dsw-alias-interactive-bg-hover-danger` 红底（与「…」菜单危险行一致）。

## 8. 测试（离线，改完必跑）

```bash
pnpm install     # 依赖：宿主半边必须自带 @deepseek-ai/schemastery
pnpm test        # 等价于仓库根跑 node --test（自动发现 test/**/*.test.mjs）
```

`test/` 里是**桩模块图 + 迷你 React**（`test/harness.mjs`）：直接跑构建产物 `lib/index.js` / `lib/client.js`，用 `node:test` 断言。

| 文件 | 锁住的契约 |
|---|---|
| `test/client-contract.test.mjs` | 五个 slot 的名字/order/id；菜单项结构（危险色 + 分隔线 + 图标，且**菜单树里没有弹窗**）；点选 → `shell.overlay` 弹窗 → `POST /archived/api/delete`；分组折叠（两个标签页 + 单列表）；弹窗文案（`deleteConfirm` + 危险类）与工具栏保留「删除选中」；**选项行计数与「无可删内容置灰禁用」**、**置灰保留记忆勾选**、**选项记忆的继承与关闭**、**渐进刷新（首个文件即解除置灰 / 空集显示占位符）**、**并发读取**、**确认时等待扫描并补上后发现的文件**、**详情缓存只作首帧直出、每次展开都后台重取**；**折叠层级（父行零位移的固定挂件栏、子级 margin-left 逐级 +16、孤儿子代理按顶层渲染并带父会话提示、搜索命中子代理不被吞、无死箭头、归档页子级跟随父级）**；fresh install 默认只开侧边栏；样式规则与 "客户端 `DELETE_CONFIG_ID` 必须等于 `cordis.patch.yml` 里的条目 id" |
| `test/config-channel.test.mjs` | 宿主 `Config` 三字段都是 `volatile`；`volatileForm`/`isVolatilePath`/`projectForm` 能投影与写入（抄自 dsh-settings 的实现）；客户端挂载即读文档、一次勾选 = 一次 `form.set`、成功闪绿字并自动收起、被拒绝/抛错/命名空间缺失都出红字；缺服务仍能加载并用默认值；清单里依赖与 `dsh.client.inject` 的声明 |
| `test/host-api.test.mjs` | 运行中会话 409 `session-busy`；只允许 loopback（外部 Host 403）；缺 sessionId 400；未知 method 404；**已下线的私有 config 接口保持 404**（防止有人把旧通道偷偷加回来） |
| `test/detail-files.test.mjs` | 产出文件判定覆盖 `tool/call` 与内层 `tool/ptc-dispatch-start`/`tool/ptc-dispatch`；相对路径按会话 cwd 绝对化、优先取结果里的 `<path>`；不存在的路径被 stat 过滤；内层调用计入工具分布与 fetch、同一次调用的结果不重复计数；`delete-file` 接受代码内产出文件、仍拒绝非产出文件 |

加新功能时：新 slot / 新接口 / 新配置字段，**先在这三个文件里补断言**再改实现。注意 harness 会把 `setInterval` 变成 no-op（组件的 60s 计时器不清除会让 `node --test` 挂住），而 `setTimeout` 保持真实（绿字那条靠它）。

## 9. 发版流程

1. 改 `package.json` 的 `version`（当前工作区已是 **0.2.0** 且未发布，可直接发；上游最后发布的是 0.1.5，本 fork **自 0.2.0 起独立编号**。改号时记得同时把 README **中英**两处 changelog 段落改名）。
2. README 的「更新日志 / Changelog」中英双语补条目（写清**为什么**，不只写改了什么）。
3. `pnpm install`（改过依赖时）→ 确认 `pnpm-lock.yaml` 同步。
4. `files` 白名单已含 `lib / cordis.patch.yml / README.md / docs / LICENSE`。
5. `npm publish`（`publishConfig.access: public`）。

## 10. 常见坑清单

1. 宿主半边**不要** import 没装进自己 node_modules 的 `@deepseek-ai/*`（会 ERR_MODULE_NOT_FOUND，整个插件不加载）。
2. `Config` 字段少了 `.volatile()` → 设置项静默失效、写入被宿主编译拒绝。
3. 客户端服务没写进 `inject` → `ctx.get()` 返回 `undefined`，功能"看着有、实际不生效"。
4. 弹窗放在会卸载的容器里 → 交互彻底无声（见第 6 节）。
5. 样式"只插一次" → 热更新后 CSS 不生效。
6. `lib/client.js` 是**手写产物**（CRLF、超长 CSS 字符串、`pcss` 类名映射）：用工具改、别手抄；改完必须过语法检查 + harness。
7. 运行中会话删除会被 409 拒绝（`会话正在运行，无法删除；请先停止该会话`）；批量删除会"部分成功"并汇总失败数。
8. 宿主拿不到"浏览器当前会话"，所以**单个删除**可以删掉你正在看的空闲会话（批量路径靠 `selectableIds` 排除了 current 行）。
9. 产出文件判定必须同时认 `tool/call` 和代码内派发的 `tool/ptc-dispatch-start`/`tool/ptc-dispatch`，且相对路径按**会话 cwd** 绝对化——当前 harness 里 agent 只直接调 `run_code`，只认外层 `write`/`edit` 会让所有新会话的产出文件、删除弹窗的「删除产出文件」计数与单个文件删除（归属校验）一起失效。

## 11. 路线图（规范化剩余项）

- **B**：把上面第 8 节的 harness 落成仓库里的 `test/`（`node --test`），加一条 `pnpm test`。
- **C**：把 `lib/*.js` 换成 **TS 源码 + tsdown 构建**（官方生态做法，产物仍是 `lib/index.js` / `lib/client.js` + `lib/types/**`）；先迁 host（纯逻辑），再迁 client（JSX + slots），可保留现有产物对照。
- 可选：给桌面 profile 开 `dsh-hmr`，省掉 host 改动重启。

---

## 12. 文档维护（README / USAGE / HANDOFF）

| 文件 | 作用 | 约定 |
|---|---|---|
| `README.md` | 门面：Fork 声明 + 功能 + 截图 + 安装 + 兼容性 + 更新日志（中英双语） | 每次发版都补 changelog（中英各一份，写清**为什么**不只是**改了什么**）；Fork 声明里必须同时给出**上游**与本 **fork** 两个地址，安装命令一律指向 fork `AkotaP/dsh-archived-sessions` |
| `USAGE.md` | 纯使用手册（中英双语），标题带版本号 `（v0.2.0）` | 加功能就同步改标题版本号与对应小节；「按住左键滑动批量勾选」、三个删除入口与设置页开关都写在这里 |
| `HANDOFF.md` | 维护/交接手册（本文件） | 槽位、配置通道、依赖、坑清单有变化时必须同步 |

**截图清单**（`docs/` 下的文件必须全部被 README 引用，少一张就是死链；README 里按**使用顺序**排列，序号与此表一致）：

| 文件 | 内容 |
|---|---|
| `docs/分组折叠.png` | ① 列表：按工作区分组 + 点标题折叠 / 展开 |
| `docs/详细.png` | ② 详情：占用空间、活动统计、产出文件、关联对话 |
| `docs/子智能体.png` | ③ 子代理：子对话嵌套在父会话下 |
| `docs/删除.png` | ④ 删除入口：侧边栏会话行「…」右边的删除按钮（悬停提示） |
| `docs/删除详细.png` | ⑤ 删除确认弹窗（子对话 / 产出文件计数与展开列表） |
| `docs/归档.png` | ⑥ 归档：归档会话标签页（含「移出归档」） |
| `docs/设置.png` | ⑦ 设置：三个删除入口开关 + 记住上次的选项 |

> 换截图直接用**同名文件覆盖**，不要改扩展名后把旧文件留在仓库里（旧版用过 `.jpg`，README 里若还写 `.jpg` 就是死链）；README 的**中英两处**图片块都要改。

---

## English (condensed)

**Maintenance manual for dsh-archived-sessions.** Key rules, all verified against the DSH source and real breakage in 0.2.0:

- **Layout**: host half `lib/index.js` (Node ESM, `/archived/api/*` on the official webServer), client half `lib/client.js` (browser bundle), manifest via `dsh.bundle.patch` + `dsh.client.inject`.
- **Install**: the repo is *linked* into the desktop profile; the repo **is** the running copy — no second copy, no SHA sync.
- **Resolution**: the host half resolves bare imports with plain Node rules **from its own directory**, so any DSH package it imports must be installed into this plugin's `node_modules`; the client half resolves through DSH's client module table, so its packages only need to be listed in `dsh.client.inject`. `bareModuleBaseUrl` only helps **entry names**, and the single `registerHooks` call only redirects `libreoffice-kit-*` binaries.
- **Dependencies**: `dependencies: @deepseek-ai/schemastery ^3.18.4`; `peerDependencies`: cordis (required) plus DSH packages marked optional via `peerDependenciesMeta`; `engines.dsh`.
- **Config channel**: the three switches are `volatile()` fields of the host `Config` (dsh-settings only projects volatile fields; without it the entry never shows up and writes are refused). The client declares `configForms` in `inject` and uses `ctx.configForms.get("dsh-archived-sessions")` with `form.set()`; failures must surface in the Settings tab (green flash on success, red with the host's text on failure).
- **Effect timing**: client edits hot-reload; host edits need a DSH restart (ask the owner first) unless `dsh-hmr` is enabled in the profile.
- **Slots**: header / row hover / "…" menu row (order 450) plus the confirm dialog in `shell.overlay` — the dialog must not live inside the menu, which unmounts.
- **Styles**: re-inject the plugin's `<style>` on every load, and double the class name when competing with shipped rules of equal specificity.
- **Testing**: keep the offline stub-module harness green (slot contract, delete flow, grouping, dialog wording, config channel, running-session 409).
- **Docs**: `README.md` (bilingual: fork notice + features + screenshots + install + changelog) and `USAGE.md` (bilingual usage manual, version in the title) must be updated together with the code; every file under `docs/` has to stay referenced by README — overwrite screenshots with the same file name instead of leaving an old `.jpg` behind.
- **Roadmap**: (B) move the harness into `test/` + `pnpm test`; (C) port to TypeScript + tsdown like the rest of the ecosystem.
