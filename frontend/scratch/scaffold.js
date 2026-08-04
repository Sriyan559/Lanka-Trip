const fs = require('fs');
const path = require('path');

const routes = [
  'approvals/page.tsx', 
  'approvals/[productId]/page.tsx', 
  'inventory/page.tsx', 
  'inventory/batches/[batchId]/page.tsx', 
  'page.tsx', 
  'products/page.tsx', 
  'products/[productId]/page.tsx', 
  'products/create/page.tsx', 
  'products/[productId]/edit/page.tsx', 
  'categories/page.tsx', 
  'brands/page.tsx', 
  'attributes/page.tsx', 
  'media/page.tsx', 
  'import-export/page.tsx', 
  'quality/page.tsx'
];

const base = 'src/app/admin/catalogue';

routes.forEach(r => {
  const p = path.join(base, r);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  if (!fs.existsSync(p)) {
    const name = 'Catalogue' + r.replace(/[^a-zA-Z0-9]/g, '');
    fs.writeFileSync(p, `export default function ${name}() { return <div className="p-6"><h2>Catalogue / ${r}</h2></div>; }`);
  }
});

console.log('Routes scaffolded successfully!');
