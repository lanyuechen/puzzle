import React from 'react';

import style from './style.less';

export default (props: any) => {
  const { title, description, children } = props;

  return (
    <section className={style.codeBox}>
      <section className={style.demo}>
        {children}
      </section>
      <section className={style.meta}>
        <div className={style.title}>
          {title}
        </div>
        <div className={style.description}>
          {description}
        </div>
      </section>
    </section>
  );
}