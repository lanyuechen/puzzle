import React from 'react';

import ReactJson from 'react-json-view'

export default function(props: any) {
  const { path, data, onChange } = props;

  if (!data) {
    return null;
  }

  const handleEdit = ({ updated_src }: any) => {
    onChange([...path, 'props'], {$set: updated_src})
  }

  return (
    <ReactJson
      name="props"
      src={data.props}
      enableClipboard={false}
      displayDataTypes={false}
      onEdit={handleEdit}
      onAdd={handleEdit}
      onDelete={handleEdit}
    />
  );
}