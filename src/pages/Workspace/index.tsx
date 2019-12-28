import React, { useEffect, createContext, useState } from 'react';
import { connect } from 'dva';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import _ from 'lodash';
import { Tabs, Layout, Icon } from 'antd';
import SplitPane from 'react-split-pane';

import Editor from '../Editor';

import Elements from './Elements';
import Project from './Project';
import Cloud from './Cloud';
import Welcome from './Welcome';
import explode from '@/utils/explode';

import style from './style.less';

const antd = require('antd');

export const WorkspaceContext = createContext({
  libs: antd,
});

const Workspace = (props: any) => {
  const { dispatch, workspace } = props;
  const { component, projects, actives, expands, current } = workspace;
  const [theme, setTheme] = useState(localStorage.theme || 'dark');

  useEffect(() => {
    dispatch({
      type: 'workspace/load',
    });
    document.body.style.filter = theme === 'dark' ? 'invert(1)' : 'none';
  }, []);

  // 自动保存 // todo 更好的方式代替
  useEffect(() => {
    dispatch({
      type: 'workspace/save',
    });
  }, [workspace]);

  const handleTheme = () => {
    localStorage.theme = theme === 'dark' ? 'light' : 'dark';
    document.body.style.filter = theme === 'dark' ? 'none' : 'invert(1)';
    setTheme(localStorage.theme);
  };

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
  };

  const handleEdit = (path: string, data: any) => {
    dispatch({
      type: 'workspace/setComponent',
      path,
      payload: data,
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <WorkspaceContext.Provider value={{ libs: antd }}>
        <Layout>
          <Layout.Header className={style.header}>
            <Icon
              type={theme === 'dark' ? 'frown' : 'smile'}
              onClick={handleTheme}
              style={{ float: 'right', marginTop: 5, cursor: 'pointer' }}
            />
          </Layout.Header>
          <Layout.Content>
            <SplitPane
              split="vertical"
              minSize={128}
              defaultSize={256}
              paneStyle={{ overflow: 'hidden' }}
            >
              <div className={style.sider}>
                <Tabs tabPosition="left" className={style.tabsLeft}>
                  <Tabs.TabPane key="files" tab={<Icon type="folder" />}>
                    <Project
                      projects={projects}
                      current={current}
                      expands={expands}
                      dispatch={dispatch}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane key="antd" tab={<Icon type="ant-design" />}>
                    <Elements />
                  </Tabs.TabPane>
                  <Tabs.TabPane key="web" tab={<Icon type="global" />}>
                    <Cloud />
                  </Tabs.TabPane>
                </Tabs>
              </div>
              <SplitPane
                split="horizontal"
                primary="second"
                minSize={24}
                defaultSize={24}
                paneStyle={{ overflow: 'hidden' }}
              >
                {actives && actives.length > 0 ? (
                  <Tabs
                    className={style.tabsRight}
                    type="editable-card"
                    hideAdd
                    activeKey={current}
                    onEdit={(key: any, action: any) => handleTabsChange(key, action)}
                    onChange={(key: string) => handleTabsChange(key, 'select')}
                  >
                    {actives
                      .filter((path: any) => _.get(projects, path))
                      .map((path: any) => (
                        <Tabs.TabPane key={path} tab={_.get(projects, path, {}).name}>
                          <Editor
                            data={component[path]}
                            onChange={(data: any) => handleEdit(path, data)}
                          />
                        </Tabs.TabPane>
                      ))}
                  </Tabs>
                ) : (
                  <Welcome />
                )}
                <div>props</div>
              </SplitPane>
            </SplitPane>
          </Layout.Content>
        </Layout>
      </WorkspaceContext.Provider>
    </DndProvider>
  );
};

export default connect(({ workspace }: any) => ({
  workspace,
}))(Workspace);
