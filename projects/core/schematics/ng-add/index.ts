import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from 'schematics-utilities';
import { readFileSync } from 'fs';
import * as path from 'path';

const packageJson = readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8');
const version = JSON.parse(packageJson).version;
// Just return the tree
export function ngAdd(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Default,
      version: version,
      name: '@ngxd/core',
    });
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
