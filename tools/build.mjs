// Builds Nyordr.html from src/Nyordr.src.html by embedding every third-party library inline,
// so the app runs fully offline with no external requests. Run: npm install && npm run build
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LIBS = [
  ['https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js', 'Chart.js 4.4.1 (MIT)', 'chart.js/dist/chart.umd.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', 'SheetJS Community Edition 0.18.5 (Apache-2.0)', 'xlsx/dist/xlsx.core.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'jsPDF 2.5.1 (MIT)', 'jspdf/dist/jspdf.umd.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js', 'jsPDF-AutoTable 3.8.2 (MIT)', 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js'],
];

let html = readFileSync('src/Nyordr.src.html', 'utf8');
// The app's own markup may load nothing from outside except the libraries embedded below
const own = LIBS.reduce((h, [url]) => h.replace(`<script src="${url}"></script>`, ''), html);
if (/<script[^>]+src=|<link[^>]+href="https?:|@import|url\(https?:/i.test(own)) throw new Error('External resource in src/Nyordr.src.html');
for (const [url, name, path] of LIBS) {
  const tag = `<script src="${url}"></script>`;
  if (!html.includes(tag)) throw new Error(`Script tag not found in source: ${url}`);
  let code = readFileSync(join('node_modules', path), 'utf8')
    .replaceAll('</script', '<\\/script')
    .replaceAll('//# sourceMappingURL=', '// ');
  html = html.replace(tag, () => `<script>/* ${name}, embedded for offline use */\n${code}\n</script>`);
}
writeFileSync('Nyordr.html', html);
console.log(`Nyordr.html written (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
