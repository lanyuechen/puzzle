import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Tabs, Layout, Icon, Tree } from 'antd';

import Elements from '../Editor/Elements';
import Editor from '../Editor';

import style from './style.less';

export default function(props: any) {

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light" width={256}>
          <Tabs tabPosition="left" className={style.tabs}>
            <Tabs.TabPane key="files" tab={<Icon type="folder" />}>
              <Tree.DirectoryTree defaultExpandAll className={style.tree}>
                <Tree.TreeNode title="parent 0" key="0-0">
                  <Tree.TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                  <Tree.TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                </Tree.TreeNode>
                <Tree.TreeNode title="parent 1" key="0-1">
                  <Tree.TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                  <Tree.TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                </Tree.TreeNode>
              </Tree.DirectoryTree>
            </Tabs.TabPane>
            <Tabs.TabPane key="antd" tab={<Icon type="appstore" />}>
              <Elements />
            </Tabs.TabPane>
            <Tabs.TabPane key="other" tab={<Icon type="smile" />}>
              there is nothing
            </Tabs.TabPane>
          </Tabs>
        </Layout.Sider>
        <Layout.Content style={{padding: 15}}>
          <Editor />
        </Layout.Content>
      </Layout>
    </DndProvider>
  )
}
