import React, { useEffect, forwardRef, useRef } from 'react';
import _ from 'lodash';

import style from './style.less';

const Magic = forwardRef((props: any, outerRef: any) => {
  const { children, onClick = () => {} } = props;

  useEffect(() => {
    const target = _.get(ref, 'current.children.0');

    // 每个元素都加了8个像素的margin，浮动元素宽度减去16，防止元素换行异常
    const sty: any = getComputedStyle(target);
    if (sty.float === 'left' || sty.float === 'right') {
      target.style.width = `${parseFloat(sty.width) - 16}px`;
    }
    
    outerRef.current = target;  // ref指向容器下第一个元素，元素拖动需要
    props.onChange(outerRef);
  }, []);

  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={style.container}
      onClick={onClick}
    >
      {typeof(children) === 'string' ? (
        <span>{children}</span>
      ) : {
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