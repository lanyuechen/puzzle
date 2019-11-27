import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Tabs, Layout, Icon } from 'antd';

import Elements from '../Editor/Elements';
import Editor from '../Editor';

export default function(props: any) {

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light" width={256}>
          <Tabs tabPosition="left" style={{height: '100%'}}>
            <Tabs.TabPane key="1" tab={<Icon type="appstore" />}>
              <Elements />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={<Icon type="folder" />}>
              Content of Tab 2
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={<Icon type="smile" />}>
              Content of Tab 3
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
