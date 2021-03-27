export const requireField = (value) => {
  if (value) return undefined;
  return 'Field is required';
};

export const maxLengthCreator = (lenght) => (value) => {
  if (value && value.length > lenght) return `Max length = ${lenght}`;
  return undefined;
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
