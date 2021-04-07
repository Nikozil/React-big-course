import React from 'react';
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
const FormControl = ({ input, meta, ...props }) => {
  return (
    <div
      className={s.formControl + ' ' + (meta.error && meta.touched && s.error)}>
      {props.children}
      {meta.error && meta.touched && <span>Ошибка: {meta.error}</span>}
    </div>
  );
};
