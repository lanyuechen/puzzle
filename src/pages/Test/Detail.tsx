import React, { useEffect } from 'react';
import { connect } from 'dva';

const Detail: React.FC<any> = (props) => {
  const { data, dispatch } = props;

  useEffect(() => {
    if (!data) {
      dispatch({
        type: 'test/list'
      });
    }
  }, []);

  return (
    <div>
      <h2>Detail</h2>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  )
}

export default connect(({ test }: any, props: any) => ({
  data: test.list.find((d: any) => d.id === props.match.params.id),
}))(Detail);