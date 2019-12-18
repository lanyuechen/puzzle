import React from 'react';
import { Typography, Divider, Icon, Rate } from 'antd';

const { Title, Paragraph } = Typography;

export const IconText = ({ type, text }: any) => (
  <span style={{fontSize: 12}}>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

export default (props: any) => {
  const { title, desc, rating, star, download } = props;

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
    </div>
  );
};
