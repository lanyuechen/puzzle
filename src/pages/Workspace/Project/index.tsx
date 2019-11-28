import React from 'react';
import { Tree } from 'antd';

import style from './style.less';

const Project = (props: any) => {
  const { dispatch, project } = props;
  const { list, current } = project;
  
  const renderTreeNode = (node: any, path: any) => (
    <Tree.TreeNode
      title={node.name}
      key={path}
      isLeaf={node.isFile}
      children={node.children && node.children.map((d: any) => renderTreeNode(d, `${path}/${name}`))}
    />
  );

  const handleSelect = (selectedKeys: string[]) => {
    console.log('>>>>', selectedKeys);
    dispatch({
      type: 'workspace/setCurrentProject',
      payload: selectedKeys[0],
    })
  };

  return (
    <Tree.DirectoryTree
      className={style.tree}
      onSelect={handleSelect}
      selectedKeys={[current]}
      defaultExpandAll
    >
      {list.map((d: any) => renderTreeNode(d, 'root'))}
    </Tree.DirectoryTree>
  );
};

export default Project;