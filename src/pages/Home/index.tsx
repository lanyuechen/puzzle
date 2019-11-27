import React from 'react';
import Link from 'umi/link';
import { Icon, Avatar } from 'antd';

import logo from '../../assets/logo.svg';
import style from './style.less';

export default function(props: any) {

  return (
    <div className={style.header}>
      <div className={style.container}>
        <h1>
          <Avatar shape="square" size={64} src={logo} alt="logo"/>
          &nbsp;Puzzle
        </h1>
        <h2>Puzzle is a simple but powerful tool for designers and developers.</h2>
        <a href="https://github.com/lanyuechen/puzzle" className={style.btn}>
          <Icon type="github" />&nbsp;&nbsp;Github
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/workspace" className={style.btn}>
          <Icon type="play-circle" />&nbsp;&nbsp;开始编辑
        </Link>
      </div>
    </div>
  );
}
