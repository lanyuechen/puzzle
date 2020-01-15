import React, { useState, useEffect } from 'react';

import Workflow from './Workflow';
import { yaml2json } from './Workflow/utils/common';

const yamlConfig = require('./Workflow/config.yaml');
const yamlData = require('./Workflow/data.yaml');

const loadYaml = (url: string, cb: Function) => {
  fetch(url)
    .then(res => res.text())
    .then(res => yaml2json(res))
    .then(res => cb(res));
}

export default function(props: any): any {
  
  const [ config, setConfig ] = useState();
  const [ data, setData ] = useState();

  useEffect(() => {
    loadYaml(yamlConfig, setConfig);
    loadYaml(yamlData, setData);
  }, []);

  if (!config || !data) {
    return null;
  }

  return (
    <div>
      <Workflow config={config} data={data} />      
    </div>
  );
}