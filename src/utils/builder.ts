import JSZip from 'jszip';
import _ from 'lodash';

import { toCamelCase } from '@/utils/utils';
import { Workspace, Project, Component } from '@/models/workspace';

export default class {
  workspace: Workspace;
  constructor(workspace: Workspace) {
    this.workspace = workspace;
  }

  build() {
    const { projects } = this.workspace;

    const zip = new JSZip();
    const src = zip.folder('src');
    this.buildProject(projects, src);
  
    // zip.generateAsync({type: 'blob'}).then((content) => {
    //   download('example.zip', content);
    // });
  }

  buildProject(projects: Project[], zip: any, path: any[] = []) {
    projects.forEach((project: Project, i: number) => {
      if (project.isFile) {
        zip.file(`${project.name}.tsx`, this.parseComponent(project.name, [...path, i]));
      } else if (project.children) {
        this.buildProject(project.children, zip.folder(project.name), [...path, i, 'children']);
      }
    });
  }

  parseComponent(name: string, path: string[]) {
    const c = this.workspace.component[path.join('.')];
    const className = toCamelCase(name);
    
    const imports: string[] = [];
    if (c && c.children) {
      c.children.forEach((cc: any) => {
        if (cc.ref) {
          imports.push(`import ${cc.type} from '${this.getPath(cc.ref)}';`);
        }
      })
    }
  
    const body = [
      'import React from \'react\'',
      ...imports,
      '',
      `const ${className} = (props: any) => {`,
      '  return (',
      this.parseContent(c, 4),
      '  );',
      '};',
      '',
      `export default ${className};`,
    ].join('\n');

    console.log(`++++++++++++++++++++++++++++++++++\n${body}`);
  
    return body;
  }

  parseContent(component: Component, space: number): string {
    if (!component) {
      return '';
    }
    const s = ' '.repeat(space);
    if (typeof(component) === 'string') {
      return `${s}${component}`;
    }
    let propsStr = ''
    if (component.props) {
      propsStr = ' ' + Object.entries(component.props).map(([k, v]: any) => {
        if (v.includes('props.')) {
          return `${k}={${v}}`
        }
        return `${k}="${v}"`;
      }).join(' ');
    }
  
    if (!component.children) {
      return `${s}<${component.type}${propsStr} />`;
    }
    return [
      `${s}<${component.type}${propsStr}>`,
      `${component.children.map(c => this.parseContent(c, space + 2)).join('\n')}`,
      `${s}</${component.type}>`,
    ].join('\n');
  }

  getPath(path: any[]) {
    const { projects } = this.workspace;
    let res = '@';
    for (let i = 0; i < path.length; i++) {
      if (path[i] !== 'children') {
        const d = _.get(projects, path.slice(0, i + 1));
        res += `/${d.name}`;
      }
    }
    return res;
  }
}

function download(filename: string, blob: any) {
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = filename;
  a.href = blobUrl;
  a.click();
}