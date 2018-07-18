const html = `<pre><code class="language-css">
<span class="hljs-selector-class">.markdown-body</span> <span class="hljs-selector-tag">code</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">position</span>: absolute;
</code></pre>
<pre><code class="language-css">
</code></pre>`;
const reg = /(<code class="language-)([a-z]+)"(>[\w\W]*?<\/code>)/g;
// console.log(reg.exec(html));
console.log(html.replace(reg, (match, p1, p2, p3) => {
  return [p1, p2, `" data-language="${p2}"`, p3].join('');
}));







let hljsMarkdown = md.render(content);
const reg = /(<code class="language-)([a-z]+)"(>[\w\W]*?<\/code>)/g;
const result = hljsMarkdown.replace(reg, (match, p1, p2, p3) => {
  return [p1, p2, `" data-language="${p2}"`, p3].join('');
}); // result 带有data-language 属性的dom字符串。