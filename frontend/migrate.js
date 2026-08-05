const fs = require('fs');
const path = require('path');

const featuresDir = 'src/features/admin';
const componentsDir = 'src/components/admin';

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

// 1. Move files
const featureFiles = getFiles(featuresDir);
featureFiles.forEach(srcPath => {
  const relPath = path.relative(featuresDir, srcPath);
  const relPathNormalized = relPath.split(path.sep).filter(p => p !== 'components').join('/');
  const destPath = path.join(componentsDir, relPathNormalized);
  
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(srcPath, destPath);
});

// 2. Update imports across the codebase
const allCodeFiles = [
  ...getFiles('src/app'),
  ...getFiles('src/components'),
].filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx'));

allCodeFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace absolute aliases
  // e.g. @/features/admin/catalogue/components/TopKPICards -> @/components/admin/catalogue/TopKPICards
  const regexAbsolute = /@\/features\/admin\/([^\/]+)(?:\/components)?\/(.*?)(['"`])/g;
  if (regexAbsolute.test(content)) {
    content = content.replace(regexAbsolute, '@/components/admin/$1/$2$3');
    changed = true;
  }
  
  // Replace absolute aliases that just point to the folder without sub-paths
  const regexAbsoluteRoot = /@\/features\/admin\/([^\/]+)(?:\/components)?(['"`])/g;
  if (regexAbsoluteRoot.test(content)) {
    content = content.replace(regexAbsoluteRoot, '@/components/admin/$1$2');
    changed = true;
  }
  
  // Clean up relative imports that might have been broken by flattening
  // If the file itself was moved from features/admin/.../components/...
  // For simplicity, let's fix relative imports like `../../components/X` to `../X`
  // Actually, we'll let TypeScript compilation errors guide us on relative imports,
  // since trying to regex them automatically is very error prone.

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log('Migration complete.');
