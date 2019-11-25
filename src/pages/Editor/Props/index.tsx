import React from 'react';

import { Row, Col, Drawer, Breadcrumb, Select, Input } from 'antd';

import EditableTable from './EditableTable';

export default function(props: any) {
  const { path, data, visible, onClose, onSelect, onChange } = props;

  const simplePath = path.reduce((p: any, n: any, i: number, ds: any) => (
    i % 2 ? p : p.concat([`${n}${ds[i + 1]}`])
  ), []);

  const Bread = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a onClick={() => onSelect([])}>root</a>
      </Breadcrumb.Item>
      {simplePath.map((d: any, i: number) => i < simplePath.length - 1 ? (
        <Breadcrumb.Item key={i}>
          <a onClick={() => onSelect(path.slice(0, 2 * i + 2))}>{d}</a>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={i}>
          {d}
        </Breadcrumb.Item>
      ))}
      {data.children && (
        <Breadcrumb.Item>
          <Select
            defaultValue="选择子组件"
            size="small"
            onChange={(idx: number) => onSelect([...path, 'children', idx])}
          >
            {data.children.map((d: any, i: number) => (
              <Select.Option key={i} value={i}>
                data.children{i}
              </Select.Option>
            ))}
          </Select>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );

  return (
    <Drawer
      title={Bread}
      placement="bottom"
      visible={visible}
      onClose={onClose}
    >
      <Row>
        <Col span={8}>
          <Input placeholder="组件名称" />
        </Col>
        <Col span={8}>
          <EditableTable
            data={data.props}
            onChange={(value: any) => onChange([...path, 'props'], {$merge: value})}
          />
        </Col>
        <Col span={8}>
          其它
        </Col>
      </Row>
    </Drawer>
  )
}