import React from 'react';
import { Field } from 'redux-form';

import s from './FormsControls.module.css';
export const TextArea = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
export const InputArea = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
const FormControl = ({ input, meta: { touched, error }, children }) => {
  return (
    <div className={s.formControl + ' ' + (error && touched && s.error)}>
      {children}
      {error && touched && <span>Ошибка: {error}</span>}
    </div>
  );
};

export const CreateField = (
  placeholder,
  name,
  validators,
  component,
  type,
  text,
  img
) => (
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
