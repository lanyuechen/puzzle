import React, { useState, useRef, useEffect } from 'react';
import { Layout, Steps, Form } from 'antd';
import _ from 'lodash';

import FormItem from './Form';

import { updateByPath, trimEmpty, json2yaml } from './utils/common';

import style from './style.less';

const Workflow = (props: any) => {
  const { config } = props;

  const [current, setCurrent] = useState(0);
  const [data, setData] = useState(props.data);
  const ref = useRef(data);

  useEffect(() => {
    ref.current = data;
  }, [data]);

  const work = config[current].work || [];

  const handleChange = (path: string, value: any) => {
    console.log('[workflow onChange]', ref.current, path, value);
    setData(updateByPath(ref.current, path, value));
  };

  return (
    <Layout className={style.workflow}>
      <Layout.Sider theme="light" style={{padding: 16}}>
        <Steps direction="vertical" size="small" current={current} onChange={setCurrent}>
          {config.map((d: any, i: number) => (
            <Steps.Step key={i} title={d.step} description={d.desc} />
          ))}
        </Steps>
      </Layout.Sider>
      <Layout.Content style={{padding: 16, height: '100vh', overflow: 'auto'}}>
        <Form>
          {work.map((d: any, i: number) => {
            return <FormItem key={i} config={d} data={data} onChange={handleChange} />
          })}
        </Form>

        <pre>{json2yaml(trimEmpty(data, config))}</pre>
      </Layout.Content>
    </Layout>
  );
};

export default Workflow;
