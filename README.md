# Duang 合成工坊

原生 Canvas 物理合成游戏，支持手机与桌面。玩法参考 https://yhsome.github.io/BigNaiWa/ ，本项目独立实现游戏与后台，未复制原站人物素材。

## 游戏

鼠标移动、点击投放；手机拖动后松手；方向键瞄准、空格投放、R 重开。相同图片碰撞升级，终阶两两消除。弹性振荡实现压扁、回弹和 Duang 动画。

## 管理

右上角创作后台。上传 PNG/JPG/WebP（自动压缩至最长边 700 像素），调整 2–16 级合成顺序、名字、尺寸和专属特效，保存并发布。图片保留透明度；设置保存在 D1，图片存入 R2。每个层级可预览碰撞合成。

支持弹弹回弹、磁力相吸、闪电、爱心氛围、星光爆发、无特效。磁力模式在相同图片靠近时增加吸引力。

## 部署

此版本需要 Cloudflare Workers、D1 与 R2。GitHub Pages 仅能托管静态前端，不能单独运行云端管理员后台。服务端变量 `ADMIN_USER`、`ADMIN_PASSWORD` 必须配置为运行环境变量；密码不应提交进仓库。管理员校验、限速、HttpOnly 会话、来源校验均在服务端执行。

安装项目依赖后运行 `pnpm dev`；构建 `pnpm build`。数据库 schema 位于 db/schema.ts，迁移位于 drizzle/。

已验证：TypeScript 类型检查、同级合成与计分、连续投放边界约束、管理员登录/退出、未登录写入拦截、并发配置冲突与跨站请求拦截。图形界面需要浏览器进一步实测。

## GitHub Pages 公网版本

Pages 从 main 分支的 docs 目录发布游戏。浏览器直接运行合成物理与动画；仅在加载配置时访问云端后台，上传与管理在云端后台完成。后台地址：https://duang-merge-studio.kasun11.chatgpt.site/?admin=1 。

前端构建：`pnpm build:pages`（输出 github-pages）；发布时复制输出到 docs。源码与构建产物均保存在本仓库，管理密码仅在云端运行环境保存。
