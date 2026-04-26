const fs = require('fs');
const path = require('path');

const files = [
  'services/auth-service/src/modules/auth/application/use-cases/index.ts',
  'services/order-service/src/modules/order/application/use-cases/index.ts',
  'services/auth-service/src/modules/auth/infrastructure/repositories/index.ts',
  'services/order-service/src/modules/order/infrastructure/repositories/index.ts',
  'services/auth-service/src/modules/auth/infrastructure/services/index.ts',
  'services/order-service/src/modules/order/infrastructure/services/index.ts'
];

function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
            .replace('use-case', '.use-case')
            .replace('repository-impl', '.repository.impl')
            .replace('service-impl', '.service.impl')
            .replace('repository', '.repository');
}

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\r\n/g, '\n');
  const importLines = content.split('\n').filter(line => line.trim().startsWith('import '));
  const parts = content.split('@Injectable()');
  if (parts.length <= 1) return;

  const classMatches = [];
  for (let i = 1; i < parts.length; i++) {
    const classContent = '@Injectable()' + parts[i];
    const match = classContent.match(/export class ([A-Za-z0-9_]+)/);
    if (match) {
      classMatches.push({ className: match[1], content: classContent.trim() });
    }
  }

  const dir = path.dirname(file);
  const exports = [];

  classMatches.forEach(cm => {
    let filename = camelToKebab(cm.className) + '.ts';
    if (filename.endsWith('.use-case.ts') === false && cm.className.endsWith('UseCase')) {
       filename = camelToKebab(cm.className.replace('UseCase', '')) + '.use-case.ts';
    }
    if (filename.endsWith('.repository.impl.ts') === false && cm.className.endsWith('RepositoryImpl')) {
       filename = camelToKebab(cm.className.replace('RepositoryImpl', '')) + '.repository.impl.ts';
    } else if (filename.endsWith('.repository.ts') === false && cm.className.endsWith('Repository')) {
       filename = camelToKebab(cm.className.replace('Repository', '')) + '.repository.ts';
    }
    if (filename.endsWith('.service.impl.ts') === false && cm.className.endsWith('ServiceImpl')) {
       filename = camelToKebab(cm.className.replace('ServiceImpl', '')) + '.service.impl.ts';
    }

    const fullPath = path.join(dir, filename);
    const fileContent = importLines.join('\n') + '\n\n' + cm.content + '\n';
    fs.writeFileSync(fullPath, fileContent);
    console.log('Created: ' + fullPath);
    exports.push(`export * from './${filename.replace('.ts', '')}';`);
  });

  if (exports.length > 0) {
    fs.writeFileSync(file, exports.join('\n') + '\n');
    console.log('Updated index: ' + file);
  }
});
