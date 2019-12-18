import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Typography, Divider, Icon, Rate } from 'antd';

import CommentList from './CommentList';

const { Title, Paragraph } = Typography;

export const IconText = ({ text, ...others }: any) => (
  <span style={{fontSize: 12}}>
    <Icon {...others} style={{ margin: 4 }} />
    {text}
  </span>
);

const DrawerContent = (props: any) => {
  const { dispatch, comments, id, title, desc, rating, star, download } = props;

  useEffect(() => {
    dispatch({
      type: 'cloud/comments',
      payload: id,
    })
  }, [id]);

  return (
    <div>
      <Title level={4}>{title}</Title>
      <div>
        <Rate allowHalf value={rating / 2} style={{fontSize: 14}} />&nbsp;
        <small>{rating}</small>
      </div>
      <Paragraph>
        {desc}
      </Paragraph>
      <Paragraph>
        <IconText type="star-o" text={star} key="star" />
        <Divider type="vertical" />
        <IconText type="download" text={download} key="download" />
      </Paragraph>
      <CommentList dataSource={comments} />
    </div>
  );
};

export default connect(({ cloud, loading }: any) => ({
  comments: cloud.comments,
  loading: loading.models.cloud,
}))(DrawerContent);