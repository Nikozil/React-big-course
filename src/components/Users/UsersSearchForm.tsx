import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../Redax/users-reducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../Redax/users-selectors';

const usersSearchFormValidate = (values: any) => {
  const errors = {};

  return errors;
};
type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};
type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
  term: string;
  friend: FriendFormType;
};

export const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(
  ({ onFilterChanged }) => {
    const filter = useSelector(getUsersFilter);

    const onSubmit = (
      values: FormType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      const filter: FilterType = {
        term: values.term,
        friend:
          values.friend === 'null'
            ? null
            : values.friend === 'true'
            ? true
            : false,
      };
      onFilterChanged(filter);
      setSubmitting(false);
    };

    return (
      <Formik
        enableReinitialize
        initialValues={{
          term: filter.term,
          friend: String(filter.friend) as FriendFormType,
        }}
        validate={usersSearchFormValidate}
        onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    );
  }
);
