import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, List, Typography, Drawer, Skeleton, Tag, Badge } from 'antd';

import DrawerContent, { IconText } from './DrawerContent';

import style from './style.less';

const scale = 1;

const Cloud = (props: any) => {
  const { dispatch, list, loading } = props;

  useEffect(() => {
    dispatch({
      type: 'cloud/list',
    });
  }, []);

  const [ drawerVisible, setDrawerVisible ] = useState(false);
  const [ drawerContent, setDrawerContent ] = useState();

  const showDrawer = (item: any) => {
    setDrawerContent(item);
    setDrawerVisible(true);
  };
  
  const handleSearch = (value: string) => {
    dispatch({
      type: 'cloud/list',
      payload: {
        keywords: value,
      },
    });
  };

  return (
    <div
      className={style.container}
      style={{
        height: `${1 / scale * 100}%`,
        width: `${1 / scale * 100}%`,
        transform: `scale(${scale})`,
      }}
    >
      <Input.Search placeholder="搜索" onSearch={handleSearch} />

      <Skeleton loading={loading} active>
        <List itemLayout="vertical">
          {list.map((item: any, i: number) => (
            <List.Item 
              key={i}
              actions={[
                <IconText type="star-o" text={item.star} key="star" />,
                <IconText type="download" text={item.download} key="download" />,
              ]}
            >
              <List.Item.Meta
                title={<a onClick={() => showDrawer(item)} style={{fontSize: 14}}>{item.title}</a>}
                description={<Tag color="cyan" className={style.version}>{item.rating}</Tag>}
              />
              <Typography.Paragraph ellipsis={{ rows: 3 }} style={{fontSize: 12}}>
                {item.desc}
              </Typography.Paragraph>
            </List.Item>
          ))}
        </List>
      </Skeleton>
      
      <Drawer
        width={'calc(100% - 256px)'}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        {drawerContent && (
          <DrawerContent {...drawerContent} />
        )}
      </Drawer>
    </div>
  );
};

export default connect(({ cloud, loading }: any) => ({
  list: cloud.list,
  loading: loading.models.cloud,
}))(Cloud);
