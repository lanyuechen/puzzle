export const prepareOptions = (options: any) => {
  if (!options) {
    return [];
  }
  if (typeof(options) === 'string') {
    options = options.split('|');
  }
  return options.map((option: any) => {
    if (Array.isArray(option)) {
      return [
        option[0],
        option[1] || option[0],
      ];
    }
    let [ key, ...value ]: any = option.split(':');
    key = key.trim();
    value = value.join(':').trim();
    return [key, value || key];
  });
}

export const preparePath = (str: any) => {
  if (!str) {
    return {};
  }
  const [ path, type, label, placeholder ] = str.split('|').map((d: string) => d.trim());
  return { path, type, label, placeholder };
}

export const prepareConfig = (config: any) => {
  if (typeof config === 'string') {
    return preparePath(config);
  }

  const preparedConfig = preparePath(config.path)

  return {
    ...preparedConfig,
    ...config,
    path: preparedConfig.path,
    options: prepareOptions(config.options),
  };
}