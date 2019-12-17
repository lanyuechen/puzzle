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
  
  const renderChildren = (children: any, defaultValue: any): any => {
    if (!Array.isArray(children)) {
      return defaultValue;
    }
    return children.map((child: any, i: number) => {
      const { type, props = {}, children } = child;
      const C = _.get(antd, type) || type;
      return (
        <C {...props} key={i}>
          {renderChildren(children, props.children)}
        </C>
      );
    });
  };

  return (
    <div className={style.container}>
      <Collapse accordion bordered={false}>
        {config.map((component: any) => (
          <Collapse.Panel 
            header={component.type} 
            key={component.type}
            extra={<Block data={component.groups[0].elements[0]}><Icon style={{fontSize: '18px'}} type="inbox" /></Block>}
          >
            {component.groups.map((group: any, i: number) => (
              <CodeBox title={group.title} description={group.desc} key={i}>
                {group.elements.map((d: Component, j: number) => {
                  const { type, props = {}, children } = d;
                  const C = _.get(antd, type) || type;
                  return (
                    <Block data={d} key={j}>
                      <C {...props}>
                        {renderChildren(children, props.children)}
                      </C>
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