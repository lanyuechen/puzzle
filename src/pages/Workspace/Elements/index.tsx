import React from 'react';
import { useDrag } from 'react-dnd';
import { Row, Col } from 'antd';

import config from './config';

import style from './style.less';

const Elements: React.FC<any> = (props) => {
  return (
    <div className={style.container}>
      <Row gutter={[8, 8]}>
        {config.map((d: any) => (
          <Col span={12} key={d.type}>
            <Block data={d}>
              <a className={style.btn}>{d.type}</a>
            </Block>
          </Col>
        ))}
      </Row>
    </div>
  );
}

const Block: React.FC<any> = (props) => {
  const { children, data } = props;

  const [, drag] = useDrag({
    item: { type: 'PUZZLE', data },
  });

  return (
    <div ref={drag}>
      {children}
    </div>
  );
}

export default Elements;