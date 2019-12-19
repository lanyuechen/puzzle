import React, { useEffect, forwardRef, useRef } from 'react';
import _ from 'lodash';

import style from './style.less';

const Magic = forwardRef((props: any, outerRef: any) => {
  const { children, onClick } = props;

  useEffect(() => {
    const target = _.get(ref, 'current.children.0');
    outerRef.current = target;  // ref指向容器下第一个元素，元素拖动需要
  }, []);

  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={style.container}
      onClick={onClick}
    >
      {{
        ...children,
        props: {
          ...children.props,
          style: _.merge(children.props.style, props.style),
        }
      }}
    </div>
  );
});

export default Magic;