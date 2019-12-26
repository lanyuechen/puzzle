import React, { useState, useRef, useEffect } from 'react';
import { Layout, Steps, Form, Button } from 'antd';
import _ from 'lodash';

import FormInput from './Form/Input';

import { updateByPath, isTrue, trimEmpty, json2yaml } from './utils/common';

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
    <Layout>
      <Layout.Sider theme="light">
        <Steps direction="vertical" size="small" current={current} onChange={setCurrent}>
          {config.map((d: any, i: number) => (
            <Steps.Step key={i} title={d.step} description={d.desc} />
          ))}
        </Steps>
      </Layout.Sider>
      <Layout.Content>
        <Form>
          {work.map((d: any, i: number) => {
            const show = isTrue(data, d.show, true);
            return show && <FormInput key={i} config={d} data={data} onChange={handleChange} />;
          })}
        </Form>

        <pre>{json2yaml(trimEmpty(data, config))}</pre>
      </Layout.Content>
    </Layout>
  );
};

export default Workflow;
