import React, { useState } from 'react';
import EditableTable from '../Editor/Props/EditableTable';

export default function(props: any): any {

  const [ data, setData ] = useState({
    test: 'xxx',
    test2: 'xxx2',
  });

  const handleChange = (value: any) => {
    setData(value);
  }

  return (
    <div>
      <EditableTable
        data={data}
        onChange={handleChange}
      />
    </div>
  );
}