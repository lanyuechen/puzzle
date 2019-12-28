import React from 'react';
import Workflow from './Workflow';
import config, { demo } from './Workflow/config';
import explode from '@/utils/explode';

export default function(props: any): any {
  return (
    <div>
      <div>
        <a onClick={explode}>爆炸</a>
      </div>
      <div id="aaa" style={{display: 'inline-block', padding: 20, border: '1px solid #000', background: 'cyan'}}>
        aaaa
        <div id="bbb" style={{display: 'inline-block', padding: 20, border: '1px solid #000', background: 'cyan'}}>
          bbbb
          <div id="ccc" style={{display: 'inline-block', padding: 20, border: '1px solid #000', background: 'cyan'}}>
            cccc
          </div>
        </div>
      </div>
    </div>
  );
}