import React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import { PropsType } from '../../Header/Header';
import { FieldValidatorType } from '../../utils/validators/validates';

import s from './FormsControls.module.css';
export const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
export const InputArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

type FormControlPropsType = {
  input: any;
  meta: WrappedFieldProps;
  // children: React.ReactNode;
};

const FormControl: React.FC<WrappedFieldProps> = ({
  input,
  meta: { touched, error },
  children,
}) => {
  return (
    <div className={s.formControl + ' ' + (error && touched && s.error)}>
      {children}
      {error && touched && <span>Ошибка: {error}</span>}
    </div>
  );
};

export function CreateField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps> | string,
  type: string,
  text?: string | null,
  img?: string
) {
  return (
    <div>
      {img ? <img src={img} alt="" /> : null}
      <Field
        component={component}
        validate={validators}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {text}
    </div>
  );
}
