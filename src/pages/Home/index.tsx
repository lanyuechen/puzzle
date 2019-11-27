import React from 'react';
import Link from 'umi/link';

import style from './style.less';

export default function(props: any) {

  return (
    <div>
      <header className={style.header}>
        <h1>Puzzle</h1>
        <h2>Puzzle is a simple but powerful tool for designers and developers.</h2>
        
        <Link to="/editor" className={style.btn}>开始编辑</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://github.com/lanyuechen/puzzle" className={style.btn}>Github</a>
      </header>
    </div>
  );
}
