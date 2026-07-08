import { type PromptRecord, type SortedPromptData } from "./cms-client.js";
import { SUPPORTED_LANGUAGES, t } from "./i18n.js";

const REPO = "awesome-seedream-5-pro-prompts";
const REPO_URL = "https://github.com/AtlasCloudAI/awesome-seedream-5-pro-prompts";
const UTM = `?utm_source=github&utm_campaign=${REPO}`;

function buildCategoryAnchor(index: number): string {
  return `category-${index + 1}`;
}

function buildLocalePrefix(locale: string): string {
  return locale === "en" ? "" : `/${locale}`;
}

function buildPromptLibraryUrl(locale: string): string {
  const q = locale === "zh" ? "&locale=zh-CN" : locale === "zh-TW" ? "&locale=zh-TW" : "";
  return `https://www.atlascloud.ai/prompts-hub/seedream-5-pro-prompt${UTM}${q}`;
}

function buildModelUrl(locale: string): string {
  return `https://www.atlascloud.ai${buildLocalePrefix(locale)}/models/bytedance/seedream-v5.0-pro/text-to-image${UTM}`;
}

function buildEditUrl(locale: string): string {
  return `https://www.atlascloud.ai${buildLocalePrefix(locale)}/models/bytedance/seedream-v5.0-pro/edit${UTM}`;
}

function renderBadges(promptCount: number): string {
  return [
    "[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)",
    `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`,
    `[![GitHub stars](https://img.shields.io/github/stars/AtlasCloudAI/awesome-seedream-5-pro-prompts?style=social)](${REPO_URL})`,
    `[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](${REPO_URL}/pulls)`,
    `[![Prompts](https://img.shields.io/badge/prompts-${promptCount}%2B-blue.svg)](${REPO_URL})`,
  ].join("\n");
}

const SHOWCASE_CDN = "https://static.atlascloud.ai/model/example/seedream-5-0-pro";

type ShowcaseItem = {
  key: string;
  output: string;
  inputs?: string[];
  tag: { en: string; zh: string; "zh-TW": string };
  prompt: string;
};

const SHOWCASES: ShowcaseItem[] = [
  {
    key: "editorial-portrait",
    output: "showcase-editorial-portrait.jpg",
    tag: { en: "Text-to-Image · Editorial portrait", zh: "文生图 · 杂志人像", "zh-TW": "文生圖 · 雜誌人像" },
    prompt:
      "Vibrant close-up editorial portrait, model with piercing gaze, wearing a sculptural hat, rich color blocking, sharp focus on eyes, shallow depth of field, Vogue magazine cover aesthetic, shot on medium format, dramatic studio lighting.",
  },
  {
    key: "material-edit",
    output: "showcase-material-edit.jpg",
    inputs: ["input-material-edit.png"],
    tag: { en: "Image editing · Material swap", zh: "图像编辑 · 材质替换", "zh-TW": "圖像編輯 · 材質替換" },
    prompt:
      "Keep the model's pose and the flowing shape of the liquid dress unchanged. Change the clothing material from silver metal to completely transparent clear water (or glass). Through the liquid water, the model's skin details are visible. Lighting changes from reflection to refraction.",
  },
  {
    key: "outfit-swap",
    output: "showcase-outfit-swap.jpg",
    inputs: ["input-outfit-model.png", "input-outfit-ref.png"],
    tag: { en: "Multi-image fusion · Outfit swap", zh: "多图融合 · 换装", "zh-TW": "多圖融合 · 換裝" },
    prompt: "Replace the clothing in image 1 with the outfit from image 2.",
  },
  {
    key: "scifi-storyboard",
    output: "showcase-scifi-storyboard.jpg",
    tag: { en: "Grouped output · Sci-fi storyboard", zh: "成组输出 · 科幻分镜", "zh-TW": "成組輸出 · 科幻分鏡" },
    prompt:
      "Generate a set of four cinematic sci-fi realistic film storyboard scenes: an astronaut repairs a spacecraft at a space station; suddenly hit by a meteorite belt; the astronaut dodges urgently; the astronaut, injured, escapes back to the spacecraft in a thrilling sequence.",
  },
  {
    key: "brand-vi",
    output: "showcase-brand-vi.jpg",
    inputs: ["input-brand-logo.png"],
    tag: { en: "Image-to-group · Brand visual system", zh: "图生成组 · 品牌视觉系统", "zh-TW": "圖生成組 · 品牌視覺系統" },
    prompt:
      "Using this LOGO as a reference, create a visual design system for an outdoor sports brand named GREEN, including packaging bags, hats, cards, lanyards, etc. Main visual tone is green, with a fun, simple, and modern style.",
  },
  {
    key: "rollercoaster",
    output: "showcase-rollercoaster.jpg",
    inputs: ["input-rc-girl.png", "input-rc-plush.png"],
    tag: { en: "Multi-image → group · Time-of-day series", zh: "多图生成组 · 早午晚系列", "zh-TW": "多圖生成組 · 早午晚系列" },
    prompt:
      "Generate 3 images of a girl and a cow plushie happily riding a roller coaster in an amusement park, depicting morning, noon, and night.",
  },
];

function showcaseHeading(locale: string): string {
  if (locale === "zh") return "## ✨ 官方效果演示 (Official Showcases)";
  if (locale === "zh-TW") return "## ✨ 官方效果演示 (Official Showcases)";
  return "## ✨ Official Showcases";
}

function showcaseTagline(locale: string): string {
  if (locale === "zh") return "> 来自 Seedream 5.0 官方文档的提示词 → 出图效果对照（编辑 / 换装 / 成组分镜 / 品牌 VI）。";
  if (locale === "zh-TW") return "> 來自 Seedream 5.0 官方文件的提示詞 → 出圖效果對照（編輯 / 換裝 / 成組分鏡 / 品牌 VI）。";
  return "> Prompt → output pairs from the official Seedream 5.0 docs — editing, outfit swap, grouped storyboards, brand systems.";
}

function refLabel(locale: string): string {
  return locale === "zh" ? "参考图" : locale === "zh-TW" ? "參考圖" : "Ref";
}

function renderOfficialShowcases(locale: string): string {
  const tagLocale = locale === "zh" || locale === "zh-TW" ? locale : "en";
  const lines: string[] = [showcaseHeading(locale), "", showcaseTagline(locale), "", "<table>"];
  for (let i = 0; i < SHOWCASES.length; i += 2) {
    lines.push("  <tr>");
    for (const item of SHOWCASES.slice(i, i + 2)) {
      const tag = item.tag[tagLocale as keyof ShowcaseItem["tag"]];
      const refs = (item.inputs || [])
        .map((f) => `<img src="${SHOWCASE_CDN}/${f}" height="72" />`)
        .join(" ");
      const refRow = refs ? `<br/><sub>${refLabel(locale)}:</sub> ${refs}` : "";
      lines.push(
        `    <td width="50%" valign="top"><img src="${SHOWCASE_CDN}/${item.output}" width="100%" /><br/><b>${tag}</b>${refRow}<br/><sub>${item.prompt}</sub></td>`,
      );
    }
    lines.push("  </tr>");
  }
  lines.push("</table>", "");
  return lines.join("\n");
}

function renderSupportedModels(): string {
  return [
    "## 🧩 Supported Models",
    "",
    "- 🎬 **Video** — Seedance 2.5 · Seedance 2.0 · Seedance 2.0 Mini · Kling 3 · Sora 2 · Veo 3.1 · HappyHorse 1 · Grok Imagine 1.5 · Wan 2.7",
    "- 🎨 **Image** — Seedream 5.0 Pro · Nano Banana 2/Pro · GPT Image 2 · Flux 2 · Seedream 5",
    "- 🧊 **3D** — Seed3D 2.0 · Hunyuan 3D Pro · Hunyuan 3D Rapid",
    "- 💬 **LLM** — Claude · GPT · DeepSeek · MiniMax · Kimi · GLM · Qwen",
    "- 🔊 **Audio** — Grok TTS",
    `- 📚 **Explore more** — [300+ models »](https://www.atlascloud.ai/models${UTM})`,
    "",
  ].join("\n");
}

function renderRunAnyPrompt(): string {
  return [
    "## ▶ Run any prompt via Atlas Cloud",
    "",
    "**Skill (recommended):** Install [atlas-cloud-skills](https://github.com/AtlasCloudAI/atlas-cloud-skills) in Claude Code, Codex, or Gemini CLI, then just ask it to generate any prompt from this collection.",
    "",
    "**CLI:** Prefer the terminal? Use [atlascloud-cli](https://github.com/AtlasCloudAI/cli) to run prompts directly.",
    "",
    `**[→ Get your free Atlas Cloud API key](https://www.atlascloud.ai/console/api-keys${UTM})**`,
    "",
  ].join("\n");
}

function renderMoreTools(): string {
  return [
    "## More Atlas Cloud Tools",
    "",
    "- [atlascloud-cli](https://github.com/AtlasCloudAI/cli) — run prompts from your terminal.",
    "- 🔌 [MCP Server](https://github.com/AtlasCloudAI/mcp-server) — connect Atlas Cloud to any MCP client.",
    "- [atlas-cloud-skills](https://github.com/AtlasCloudAI/atlas-cloud-skills) — skills for Claude Code, Codex, and Gemini CLI.",
    "- [atlascloud_comfyui](https://github.com/AtlasCloudAI/atlascloud_comfyui) — ComfyUI nodes for Atlas Cloud.",
    "- [n8n-nodes-atlascloud](https://github.com/AtlasCloudAI/n8n-nodes-atlascloud) — n8n automation nodes.",
    "- [Discord](https://discord.gg/MWmMr4q9es) — join the community.",
    `- [Website](https://www.atlascloud.ai${UTM}) — explore all models and docs.`,
    "",
  ].join("\n");
}

function renderContents(data: SortedPromptData, locale: string): string {
  const lines = ["## 📖 Contents", ""];
  // 模拟 GitHub 锚点：emoji/标点被删、空格转 -，不 trim（emoji 前缀留下前导 -）
  const anchor = (heading: string) =>
    heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  lines.push(`- [🌐 ${t("viewInGallery", locale)}](#${anchor("🌐 " + t("viewInGallery", locale))})`);
  lines.push("- [🧩 Supported Models](#-supported-models)");
  lines.push("- [▶ Run any prompt via Atlas Cloud](#-run-any-prompt-via-atlas-cloud)");
  lines.push(`- [📊 ${t("stats", locale)}](#${anchor("📊 " + t("stats", locale))})`);
  lines.push(`- [🏷️ ${t("browseByCategory", locale)}](#${anchor("🏷️ " + t("browseByCategory", locale))})`);
  lines.push(`- [🔥 ${t("featuredPrompts", locale)}](#${anchor("🔥 " + t("featuredPrompts", locale))})`);
  lines.push(`- [📋 ${t("allPrompts", locale)}](#${anchor("📋 " + t("allPrompts", locale))})`);
  lines.push("- [More Atlas Cloud Tools](#more-atlas-cloud-tools)");
  lines.push(`- [📄 ${t("license", locale)}](#${anchor("📄 " + t("license", locale))})`);
  lines.push("");
  return lines.join("\n");
}

function renderLanguageNavigation(currentLocale: string): string {
  const badges = SUPPORTED_LANGUAGES.map((lang) => {
    const isCurrent = lang.code === currentLocale;
    const color = isCurrent ? "brightgreen" : "lightgrey";
    const text = isCurrent ? t("current", currentLocale) : t("view", currentLocale);
    return `[![${lang.name}](https://img.shields.io/badge/${encodeURIComponent(lang.name)}-${encodeURIComponent(text)}-${color})](${REPO_URL}/blob/main/${lang.readmeFileName})`;
  }).join(" ");

  return `${badges}\n\n---\n`;
}

function renderPrompt(prompt: PromptRecord, index: number, locale: string): string {
  const lines = [
    `### No. ${index + 1}: ${prompt.title}`,
    "",
    `- **${t("category", locale)}:** \`${prompt.category}\``,
    `- **${t("source", locale)}:** \`${prompt.source_platform}\``,
    `- **${t("author", locale)}:** ${prompt.author_name}`,
    `- **${t("language", locale)}:** \`${prompt.language}\``,
  ];

  if (prompt.image_url) {
    lines.push(`- **${t("video", locale)}:** [${t("view", locale)}](${prompt.image_url})`);
    lines.push("");
    lines.push(`<img src="${prompt.image_url}" alt="${prompt.title}" width="480" />`);
  }

  if (prompt.source_link) {
    lines.push(`- **${t("sourceLink", locale)}:** [${t("view", locale)}](${prompt.source_link})`);
  }

  lines.push(
    "",
    `#### ${t("description", locale)}`,
    "",
    prompt.description,
    "",
    `#### ${t("prompt", locale)}`,
    "",
    "```text",
    prompt.prompt,
    "```",
    ""
  );

  return lines.join("\n");
}

function renderModelIntro(locale: string): string {
  if (locale === "zh") {
    return [
      "## 🤔 Seedream 5.0 Pro 模型简介",
      "",
      "Seedream 5.0 Pro 是 ByteDance 的旗舰文生图模型，也是 Seedream 5.0 家族的顶配版本。它把生成与编辑统一在同一个模型里，擅长照片级写实、精准的画面文字渲染，以及跨风格的多元素提示词还原——从社论海报、信息图到人像、产品图和动漫都能稳定输出。",
      "",
      "**核心能力**",
      "",
      "- **原生高分辨率** — 最高 4K 输出，另有 2K/3K 与灵活画幅（1:1、4:3、16:9、21:9 …）。",
      "- **多图参考** — 最多融合 14 张参考图，迁移服装、风格、角色或产品，并保持主体一致性。",
      "- **成组/连续生成** — 一次调用产出一组相关图：漫画分镜、四季系列、完整品牌视觉系统。",
      "- **画面文字** — 稳定还原密集版式与确切文案，适合海报、信息图与包装。",
      `- **图像编辑** — 用自然语言从一张参考图替换材质、背景、服装或视角。[打开图像编辑模型 »](${buildEditUrl(locale)})`,
      "",
      "### 推荐写法",
      "",
      "- 主体: 先写清主角、物体或场景。",
      "- 构图: 版式、画幅、焦点和视角。",
      "- 风格: 美术方向、光影、色彩、材质和氛围。",
      "- 文字: 如有文案，写明确切文字内容与排版层级。",
      "",
    ].join("\n");
  }

  if (locale === "zh-TW") {
    return [
      "## 🤔 Seedream 5.0 Pro 模型簡介",
      "",
      "Seedream 5.0 Pro 是 ByteDance 的旗艦文生圖模型，也是 Seedream 5.0 家族的頂配版本。它把生成與編輯統一在同一個模型裡，擅長照片級寫實、精準的畫面文字渲染，以及跨風格的多元素提示詞還原——從社論海報、資訊圖到人像、產品圖與動漫都能穩定輸出。",
      "",
      "**核心能力**",
      "",
      "- **原生高解析度** — 最高 4K 輸出，另有 2K/3K 與靈活畫幅（1:1、4:3、16:9、21:9 …）。",
      "- **多圖參考** — 最多融合 14 張參考圖，遷移服裝、風格、角色或產品，並保持主體一致性。",
      "- **成組/連續生成** — 一次調用產出一組相關圖：漫畫分鏡、四季系列、完整品牌視覺系統。",
      "- **畫面文字** — 穩定還原密集版式與確切文案，適合海報、資訊圖與包裝。",
      `- **圖像編輯** — 用自然語言從一張參考圖替換材質、背景、服裝或視角。[開啟圖像編輯模型 »](${buildEditUrl(locale)})`,
      "",
      "### 推薦寫法",
      "",
      "- 主體: 先寫清主角、物體或場景。",
      "- 構圖: 版式、畫幅、焦點與視角。",
      "- 風格: 美術方向、光影、色彩、材質與氛圍。",
      "- 文字: 如有文案，寫明確切文字內容與排版層級。",
      "",
    ].join("\n");
  }

  return [
    "## 🤔 Seedream 5.0 Pro Overview",
    "",
    "Seedream 5.0 Pro is ByteDance's flagship text-to-image model and the top tier of the Seedream 5.0 family. It unifies generation and editing in one model, with standout strengths in photorealism, accurate in-image text rendering, and faithful multi-element prompt following across styles — from editorial posters and infographics to portraits, product shots, and anime.",
    "",
    "**What it does well**",
    "",
    "- **Native high resolution** — up to 4K output, plus 2K/3K and flexible aspect ratios (1:1, 4:3, 16:9, 21:9 …).",
    "- **Multi-image reference** — blend up to 14 reference images to transfer outfits, styles, characters, or products while keeping subject consistency.",
    "- **Grouped / sequential generation** — produce a set of related images in one call: comic storyboards, seasonal series, or a full brand visual system.",
    "- **In-image text** — renders dense layouts and exact copy reliably — ideal for posters, infographics, and packaging.",
    `- **Image editing** — swap materials, backgrounds, clothing, or perspective from a single reference via natural-language instructions. [Open the edit model »](${buildEditUrl(locale)})`,
    "",
    "### Recommended Structure",
    "",
    "- Subject: define the main object, person, or scene.",
    "- Composition: layout, framing, aspect ratio, and focal point.",
    "- Style: art direction, lighting, color, texture, and mood.",
    "- Text: exact copy and typographic hierarchy when the image contains text.",
    "",
  ].join("\n");
}

export function generateMarkdown(data: SortedPromptData, locale: string): string {
  const now = new Date().toISOString();
  const lines: string[] = [];
  const promptsByCategory = new Map<string, PromptRecord[]>();

  for (const prompt of data.all) {
    const categoryPrompts = promptsByCategory.get(prompt.category) || [];
    categoryPrompts.push(prompt);
    promptsByCategory.set(prompt.category, categoryPrompts);
  }

  lines.push(`# 🎨 ${t("title", locale)}`);
  lines.push("");
  lines.push(renderBadges(data.stats.total));
  lines.push("");
  lines.push(`> ${t("subtitle", locale)}`);
  lines.push("");
  lines.push(`> ${t("copyright", locale)}`);
  lines.push("");
  lines.push(renderLanguageNavigation(locale));
  lines.push(renderOfficialShowcases(locale));
  lines.push(renderContents(data, locale));
  lines.push(`## 🌐 ${t("viewInGallery", locale)}`);
  lines.push("");
  lines.push(`- ${t("promptLibrary", locale)}: [${t("view", locale)}](${buildPromptLibraryUrl(locale)})`);
  lines.push(`- ${t("modelPage", locale)}: [${t("view", locale)}](${buildModelUrl(locale)})`);
  lines.push("");
  lines.push(renderSupportedModels());
  lines.push(renderRunAnyPrompt());
  lines.push(renderModelIntro(locale));
  lines.push(`## 📊 ${t("stats", locale)}`);
  lines.push("");
  lines.push(`| ${t("metric", locale)} | ${t("count", locale)} |`);
  lines.push("|--------|-------|");
  lines.push(`| ${t("totalPrompts", locale)} | **${data.stats.total}** |`);
  lines.push(`| ${t("categories", locale)} | **${data.categoryCounts.length}** |`);
  lines.push(`| ${t("previewVideos", locale)} | **${data.stats.images}** |`);
  lines.push(`| ${t("lastUpdated", locale)} | **${now}** |`);
  lines.push("");
  lines.push(`## 🏷️ ${t("browseByCategory", locale)}`);
  lines.push("");

  data.categoryCounts.forEach((item, index) => {
    const anchor = buildCategoryAnchor(index);
    lines.push(`- [\`${item.category}\`](#${anchor}): **${item.count}**`);
  });

  lines.push("");
  lines.push(`## 🔥 ${t("featuredPrompts", locale)}`);
  lines.push("");
  data.featured.forEach((prompt, index) => lines.push(renderPrompt(prompt, index, locale)));
  lines.push(`## 📋 ${t("allPrompts", locale)}`);
  lines.push("");

  data.categoryCounts.forEach((item, index) => {
    const anchor = buildCategoryAnchor(index);
    const prompts = promptsByCategory.get(item.category) || [];
    lines.push(`<a id="${anchor}"></a>`);
    lines.push("");
    lines.push(`### ${item.category} (${prompts.length})`);
    lines.push("");
    prompts.forEach((prompt, promptIndex) => lines.push(renderPrompt(prompt, promptIndex, locale)));
  });

  lines.push(`## ${t("localUsage", locale)}`);
  lines.push("");
  lines.push("```bash");
  lines.push("npm install");
  lines.push("npm run build-all");
  lines.push("```");
  lines.push("");
  lines.push(renderMoreTools());
  lines.push(`## 📄 ${t("license", locale)}`);
  lines.push("");
  lines.push("[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)");
  lines.push("");
  lines.push(`> ${t("autoGenerated", locale)} ${now}`);
  lines.push("");

  return lines.join("\n");
}
