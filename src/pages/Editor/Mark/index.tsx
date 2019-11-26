import React from 'react';

import style from './style.less';

export default function(props: any) {
  const { rect } = props;

  if (!rect) {
    return null;
  }

  return (
    <div
      className={style.mark}
      style={{
        left: rect.left, 
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    />
  )
}