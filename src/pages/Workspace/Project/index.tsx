import React, { useState } from 'react';
import _ from 'lodash';
import { Tree, Dropdown, Menu } from 'antd';

import NameModal from './NameModal';

import style from './style.less';

const Project = (props: any) => {
  let action: string;
  let actionPath: any[];

  const { dispatch, project } = props;
  const { list, current } = project;

  const [ nameModalVisible, setNameModalVisible ] = useState(false);

  const handleMenuClick = (key: string, path: any[]) => {
    action = key;
    actionPath = path;
    if (key === 'delete') {
      return;
    }
    setNameModalVisible(true);
  }

  const handleNameOk = (value: string) => {
    if (action === 'add-file') {

    } else if (action === 'add-folder') {

    } else if (action === 'rename') {

    }
  }
  
  const renderTreeNode = (node: any, path: any[] = []) => {
    const menu = (
      <Menu
        onClick={({ key }: any) => handleMenuClick(key, path)}
        selectable={false}
        theme="dark"
      >
        {!node.isFile && <Menu.Item key="new-file">新建文件</Menu.Item>}
        {!node.isFile && <Menu.Item key="new-folder">新建文件夹</Menu.Item>}
        <Menu.Item key="rename">重命名</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );

    const title = (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <span>{node.name}</span>
      </Dropdown>
    );

    return (
      <Tree.TreeNode
        title={title}
        key={path.join('.')}
        isLeaf={node.isFile}
        children={node.children && node.children.map((d: any, i: number) => renderTreeNode(d, [...path, 'children', i]))}
      />
    );
  };

  const handleSelect = (selectedKeys: string[]) => {
    const key = selectedKeys[0];
    if (_.get(list, key, {}).isFile) {
      dispatch({
        type: 'workspace/setCurrentProject',
        payload: key,
      });
    }
  };

  return (
    <React.Fragment>
      <Tree.DirectoryTree
        className={style.tree}
        onSelect={handleSelect}
        selectedKeys={[current]}
        defaultExpandAll
      >
        {list.map((d: any, i: number) => renderTreeNode(d, [i]))}
      </Tree.DirectoryTree>
      <NameModal
        visible={nameModalVisible}
        onOk={handleNameOk}
        onCancel={() => setNameModalVisible(false)}
      />
    </React.Fragment>
  );
};

export default Project;