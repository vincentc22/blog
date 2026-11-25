// 中英段落交錯 / Bilingual paragraph pairing.
// Markdown 寫法：中文段落後面緊接英文段落；沒有中文字的段落會自動標成英文 (.en)。
// 標題寫成「中文 | English」會拆成中英兩行。
const CJK = /[㐀-鿿豈-﫿　-〿＀-￯]/;

function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children || []).map(textOf).join("");
}

function addClass(node, cls) {
  node.properties = node.properties || {};
  const c = node.properties.className || [];
  node.properties.className = [...(Array.isArray(c) ? c : [c]), cls];
}

function isEl(node, tag) {
  return node && node.type === "element" && (!tag || node.tagName === tag);
}

function markParagraphs(parent) {
  for (const child of parent.children || []) {
    if (isEl(child, "p") || isEl(child, "ol") || isEl(child, "ul")) addClass(child, CJK.test(textOf(child)) ? "zh" : "en");
  }
}

function splitHeading(h) {
  const last = h.children[h.children.length - 1];
  if (!last || last.type !== "text" || !last.value.includes(" | ")) return;
  const idx = last.value.lastIndexOf(" | ");
  const en = last.value.slice(idx + 3);
  last.value = last.value.slice(0, idx);
  h.children.push({
    type: "element",
    tagName: "span",
    properties: { className: ["en"] },
    children: [{ type: "text", value: en }],
  });
}

export default function rehypeBilingual() {
  return (tree) => {
    markParagraphs(tree);
    for (const node of tree.children) {
      if (isEl(node, "blockquote")) {
        markParagraphs(node);
        addClass(node, "quote");
      }
      if (isEl(node) && /^h[2-4]$/.test(node.tagName)) splitHeading(node);
    }
    // 把「中文段落 + 英文段落」包成一組 .pair
    const out = [];
    const kids = tree.children;
    for (let i = 0; i < kids.length; i++) {
      const node = kids[i];
      if (isEl(node, "p") && node.properties.className.includes("zh")) {
        let j = i + 1;
        while (j < kids.length && kids[j].type === "text" && !kids[j].value.trim()) j++;
        const next = kids[j];
        if (isEl(next, "p") && next.properties.className.includes("en")) {
          out.push({
            type: "element",
            tagName: "div",
            properties: { className: ["pair"] },
            children: [node, { type: "text", value: "\n" }, next],
          });
          i = j;
          continue;
        }
      }
      out.push(node);
    }
    tree.children = out;
  };
}
