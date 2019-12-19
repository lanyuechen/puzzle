import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Collapse, Icon } from 'antd';
import { Component } from '@/models/workspace';
import _ from 'lodash';

import CodeBox from './CodeBox';
import Magic from '../../Editor/Dragger/Magic';
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

  const scale = 0.5;

  return (
    <div 
      className={style.container}
      style={{
        height: `${1 / scale * 100}%`,
        width: `${1 / scale * 100}%`,
        transform: `scale(${scale})`,
      }}
    >
      <Collapse bordered={false}>
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

  const ref = useRef(null);

  const [, drag] = useDrag({
    item: { type: 'PUZZLE', data },
  });

  drag(ref);

  return (
    <Magic
      ref={ref}
      onChange={(ref: any) => drag(ref)}
      style={{
        margin: 4,
      }}
    >
      {children}
    </Magic>
  );

  return (
    <span ref={drag} className={style.block}>
      {children}
    </span>
  );
}

export default Elements;