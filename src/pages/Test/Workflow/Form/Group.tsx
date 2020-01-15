import React from 'react';
import _ from 'lodash';

export default (props: any) => {
  const { config, children } = props;

  return React.Children.map(children, (child: any) => ({
    ...child,
    props: {
      ...child.props,
      config: {
        ...config.sub,
        ...child.props.config,
        path: [config.path, child.props.config.path].filter(v => v).join('.'),
      },
    }
  }));
}
