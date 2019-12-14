import React from 'react';
import { Result, Button, Typography, Icon } from 'antd';

const { Paragraph, Text } = Typography;

export default (props: any) => (
  <Result
    icon={<Icon type="smile" theme="twoTone" />}
    title="Welcome!"
    subTitle="Puzzle is a simple but powerful tool for designers and developers."
    extra={[
      <Button type="primary" key="console">
        Let's Begin
      </Button>,
      <Button key="buy">Get Help</Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          With this tool, you can do the following things:
        </Text>
      </Paragraph>
      <Paragraph>
        <Icon type="check" style={{ color: 'green' }} />&nbsp;
        Develop your own projects.
      </Paragraph>
      <Paragraph>
        <Icon type="check" style={{ color: 'green' }} />&nbsp;
        Develop your own Component and publish it for others to use.
      </Paragraph>
      <Paragraph>
        <Icon type="check" style={{ color: 'green' }} />&nbsp;
        Collaborate with your friends on the same project.
      </Paragraph>
      <Paragraph>
        <Icon type="check" style={{ color: 'green' }} />&nbsp;
        Just wasting time like a salted fish.
      </Paragraph>
    </div>
  </Result>
);