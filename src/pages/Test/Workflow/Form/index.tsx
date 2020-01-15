import React from 'react';

import { isTrue } from '../utils/common';
import { prepareConfig } from '../utils/prepare';
import enhance from './enhance';

import List from './List';
import Group from './Group';
import Input from './Input';
import Switch from './Switch';
import MultiSelect from './MultiSelect';
import Select from './Select';
import RadioButton from './RadioButton';
import { InputNumber } from 'antd';

const forms = {
  list: List,
  group: Group,
  input: enhance(Input),
  number: enhance(InputNumber),
  switch: enhance(Switch),
  'multi-select': enhance(MultiSelect),
  select: enhance(Select),
  'radio-button': enhance(RadioButton),
};

const FormItem = (props: any) => {
  const { data, onChange } = props;

  const config = prepareConfig(props.config);

  const show = isTrue(data, config.show, true);
  if (!show) {
    return null;
  }

  const C = forms[config.type] || forms.input;
  return (
    <C 
      config={config} 
      data={data} 
      onChange={onChange}
    >
      {config.items && config.items.map((d: any, i: number) => (
        <FormItem key={i} config={prepareConfig(d)} data={data} onChange={onChange} />
      ))}
    </C>
  );
}

export default FormItem;