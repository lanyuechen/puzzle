import React, { useState } from 'react';
import _ from 'lodash';
import { useDrag } from 'react-dnd';
import { updateByPath, toCamelCase } from '@/utils/utils';
import { Tree, Dropdown, Menu } from 'antd';

import NameModal from './NameModal';

import style from './style.less';

let action: string;
let actionPath: any[]; // 定义在函数中会读不到

const Project = (props: any) => {
  const { dispatch, projects, expands, current } = props;

  const [ nameModalVisible, setNameModalVisible ] = useState(false);

  const handleMenuClick = (e: any, key: string, path: any[]) => {
    e.stopPropagation();
    
    action = key;
    actionPath = path;
    if (key === 'delete') {
      const idx = actionPath.pop();
      dispatch({
        type: 'workspace/setProject',
        payload: updateByPath(projects, actionPath, {
          $splice: [
            [idx, 1],
          ],
        }),
      });
      return;
    }
    setNameModalVisible(true);
  }

  const handleNameOk = (value: string) => {
    if (action === 'new-file') {
      dispatch({
        type: 'workspace/setProject',
        payload: updateByPath(projects, [...actionPath, 'children'], {
          $push: [{
            name: value,
            isFile: true,
          }],
        }),
      });
    } else if (action === 'new-folder') {
      dispatch({
        type: 'workspace/setProject',
        payload: updateByPath(projects, [...actionPath, 'children'], {
          $push: [{
            name: value,
            children: [],
          }],
        }),
      });
    } else if (action === 'rename') {
      dispatch({
        type: 'workspace/setProject',
        payload: updateByPath(projects, [...actionPath, 'name'], {
          $set: value,
        }),
      });
    }
    setNameModalVisible(false);
  }
  
  const renderTreeNode = (node: any, path: any[] = []) => {
    const menu = (
      <Menu
        onClick={({ key, domEvent }: any) => handleMenuClick(domEvent, key, path)}
        selectable={false}
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

    if (node.isFile) {
      return (
        <Tree.TreeNode
          title={(
            <Block path={path} name={node.name}>
              {title}
            </Block>
          )}
          key={path.join('.')}
          isLeaf
        />
      );
    }

    return (
      <Tree.TreeNode
        title={title}
        key={path.join('.')}
        children={node.children && node.children.map((d: any, i: number) => renderTreeNode(d, [...path, 'children', i]))}
      />
    );
  };

  const handleSelect = (selectedKeys: string[]) => {
    const key = selectedKeys[0];
    if (_.get(projects, key, {}).isFile) {
      dispatch({
        type: 'workspace/setCurrentProject',
        payload: key,
      });
    } else {
      dispatch({
        type: 'workspace/setExpands',
        payload: key,
      })
    }
  };

  return (
    <React.Fragment>
      <Tree.DirectoryTree
        className={style.tree}
        onSelect={handleSelect}
        selectedKeys={[current]}
        expandedKeys={expands}
      >
        {projects.map((d: any, i: number) => renderTreeNode(d, [i]))}
      </Tree.DirectoryTree>
      <NameModal
        visible={nameModalVisible}
        onOk={handleNameOk}
        onCancel={() => setNameModalVisible(false)}
      />
    </React.Fragment>
  );
};

const Block: React.FC<any> = (props) => {
  const { children, path, name } = props;

  const [, drag] = useDrag({
    item: {
      type: 'PUZZLE',
      data: {
        type: toCamelCase(name),
        ref: path,
      },
    },
  });

  return (
    <span ref={drag}>
      {children}
    </span>
  );
}

export default Project;