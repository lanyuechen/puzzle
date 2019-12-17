import React from 'react';
import { useDrag } from 'react-dnd';
import { Collapse, Icon } from 'antd';
import { Component } from '@/models/workspace';
import _ from 'lodash';

import CodeBox from './CodeBox';

import config from './config';

import style from './style.less';

const antd = require('antd');

const Elements: React.FC<any> = (props) => {
  return (
    <div className={style.container} style={{width: 256}}>
      <Collapse accordion>
        {config.map((component: any) => (
          <Collapse.Panel 
            header={component.type} 
            key={component.type}
            extra={<Block data={component.groups[0].elements[0]}><Icon type="inbox" /></Block>}
          >
            {component.groups.map((group: any, i: number) => (
              <CodeBox title={group.title} description={group.desc} key={i}>
                {group.elements.map((d: Component, j: number) => {
                    const C = _.get(antd, d.type) || d.type;
                    return (
                      <Block data={d} key={j}>
                        <C {...(d.props || {})} />
                      </Block>
                    );
                  })}
              </CodeBox>
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}

const Block: React.FC<any> = (props) => {
  const { children, data } = props;

  const [, drag] = useDrag({
    item: { type: 'PUZZLE', data },
  });

  return (
    <span ref={drag} style={{display: 'inline-block', margin: 4}}>
      {children}
    </span>
  );
}

export default Elements;