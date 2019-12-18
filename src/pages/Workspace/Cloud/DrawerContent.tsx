import React from 'react';
import { Typography, Divider, Icon } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const IconText = ({ type, text }: any) => (
  <span style={{fontSize: 12}}>
    <Icon type={type} style={{ marginRight: 4 }} />
    {text}
  </span>
);

export default (props: any) => {
  const { title, desc } = props;

  return (
    <div>
      <Typography>
        <Title level={4}>{title}</Title>
        <Paragraph>
          {desc}
        </Paragraph>
        <Paragraph>
          <IconText type="star-o" text="12" key="star" />
          <Divider type="vertical" />
          <IconText type="download" text="2" key="download" />
        </Paragraph>
        <Divider /> 
      </Typography>
    </div>
  );
};
