import React from 'react';

import { isTrue } from '../utils/common';

import Input from './Input';
import Switch from './Switch';
import List from './List';

const forms = {
  input: Input,
  switch: Switch,
  list: List,
};

const FormItem = (props: any) => {
  const { config, data, onChange } = props;

  const show = isTrue(data, config.show, true);
  if (!show) {
    return null;
  }

  const C = forms[config.type] || forms.input;
  return (
    <C config={config} data={data} onChange={onChange}>
      {config.work && config.work.map((d: any, i: number) => (
        <FormItem key={i} config={d}/>
      ))}
    </C>
  );
}

export default FormItem;