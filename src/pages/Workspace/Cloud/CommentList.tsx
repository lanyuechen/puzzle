import React from 'react';
import { Comment, Divider, Avatar } from 'antd';
import moment from 'moment';

import { IconText } from './DrawerContent';

const COLORS = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const CommentItem = (props: any) => {
  const { user, msg, children } = props;

  const actions = [
    <IconText type="like" text={msg.like} theme={false ? 'filled' : 'outlined'} />,
    <Divider type="vertical" />,
    <IconText type="dislike" text={msg.dislike} theme={false ? 'filled' : 'outlined'} />,
    <Divider type="vertical" />,
    <IconText type="message" />,
  ];

  const randColor = () => {
    return COLORS[Math.floor(COLORS.length * Math.random())];
  };

  return (
    <Comment
      actions={actions}
      author={<a>{user.name}</a>}
      avatar={<Avatar style={{background: randColor()}}>{user.name[0].toUpperCase()}</Avatar>}
      content={msg.content}
      datetime={moment().fromNow()}
    >
      {children}
    </Comment>
  );
}

const CommentList = (props: any): any => {
  const { dataSource } = props;

  return dataSource.map((cmt: any, i: number) => (
    <CommentItem
      key={i}
      user={cmt.user}
      msg={cmt.msg}
    >
      {cmt.children && (
        <CommentList dataSource={cmt.children} />
      )}
    </CommentItem>
  ));
};

export default CommentList;