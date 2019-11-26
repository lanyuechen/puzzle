import React from 'react';
import Link from 'umi/link';

export default function(props: any) {

  return (
    <div>
      <h2>Puzzle</h2>
      
      <Link to="/editor">编辑器</Link>
      <Link to="/test">测试</Link>
    </div>
  );
}
