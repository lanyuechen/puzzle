import React, { useEffect } from 'react';
import { connect } from 'dva';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Tabs, Layout, Icon } from 'antd';

import Elements from '../Editor/Elements';
import Editor from '../Editor';
import Project from './Project';

import style from './style.less';

const Workspace = (props: any) => {
  const { dispatch, project, component } = props;
  const { actives, current } = project;

  useEffect(() => {
    dispatch({
      type: 'workspace/load',
    });
  }, []);

  // 自动保存 // todo 更好的方式代替
  useEffect(() => {
    dispatch({
      type: 'workspace/save',
    });
  }, [project, component]);

  const handleTabsChange = (key: string, act: string) => {
    if (act === 'remove') {
      dispatch({
        type: 'workspace/setActiveProjects',
        payload: actives.filter((path: any) => path !== key),
      });
    }
  }

  const handleEdit = (path: string, data: any) => {
    dispatch({
      type: 'workspace/setComponent',
      path,
      payload: data,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Layout.Sider theme="light" width={256}>
          <Tabs tabPosition="left" className={style.tabsLeft}>
            <Tabs.TabPane key="files" tab={<Icon type="folder" />}>
              <Project project={project} dispatch={dispatch} />
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
          <Tabs
            activeKey={current}
            type="editable-card"
            onEdit={(key: any, action: any) => handleTabsChange(key, action)}
          >
            {actives && actives.map((d: any) => (
              <Tabs.TabPane key={d.path} tab={d.path}>
                <Editor
                  data={component[d.path]}
                  onChange={(data: any) => handleEdit(d.path, data)}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Layout.Content>
      </Layout>
    </DndProvider>
  )
};

export default connect(({ workspace }: any) => ({
  ...workspace
}))(Workspace);