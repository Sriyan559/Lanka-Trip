const fs = require('fs');
const files = [
  'src/mocks/admin/ecosystemModuleDetail.mock.ts',
  'src/mocks/admin/ecosystemModules.mock.ts',
  'src/services/api/ecosystemModuleDetail.ts',
  'src/services/api/ecosystemModules.ts',
  'src/tests/admin.test.tsx',
  'src/tests/ecosystem-module-detail.test.tsx',
  'src/tests/ecosystem-modules.test.tsx',
  'src/tests/returns-queue.test.tsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
     let content = fs.readFileSync(f, 'utf8');
     content = content.replace(/@\/features\/admin\/([^\/]+)(?:\/components)?\/(.*?)(['"`])/g, '@/components/admin/$1/$2$3');
     content = content.replace(/@\/features\/admin\/([^\/]+)(?:\/components)?(['"`])/g, '@/components/admin/$1$2');
     fs.writeFileSync(f, content);
  }
});
console.log('Fixed imports');
