export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
  if (value) return undefined;
  return 'Field is required';
};

export const maxLengthCreator =
  (lenght: number): FieldValidatorType =>
  (value) => {
    if (value && value.length > lenght) return `Max length = ${lenght}`;
    return undefined;
  };

export const composeValidators =
  (...validators: Array<(value: string) => undefined>): FieldValidatorType =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
