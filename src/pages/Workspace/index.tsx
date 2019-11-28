import React, { useEffect } from 'react';
import { connect } from 'dva';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import _ from 'lodash';
import { Tabs, Layout, Icon } from 'antd';

import Elements from './Elements';
import Project from './Project';
import Editor from '../Editor';

import style from './style.less';

const Workspace = (props: any) => {
  const { dispatch, project, component } = props;
  const { actives, current } = project;

  console.log('>>>', actives, current)

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
    } else if (act === 'select') {
      dispatch({
        type: 'workspace/setCurrentProject',
        payload: key,
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
        <Layout.Sider className={style.sider} theme="light" width={256}>
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
        <Layout.Content className={style.content}>
          <Tabs
            className={style.tabsRight}
            type="editable-card"
            activeKey={current}
            onEdit={(key: any, action: any) => handleTabsChange(key, action)}
            onChange={(key: string) => handleTabsChange(key, 'select')}
          >
            {actives && actives.map((path: any) => (
              <Tabs.TabPane
                key={path} 
                tab={_.get(project.list, path, {}).name}
              >
                <Editor
                  data={component[path]}
                  onChange={(data: any) => handleEdit(path, data)}
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