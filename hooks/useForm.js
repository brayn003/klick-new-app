import { useState } from 'react';
import isEqual from 'lodash/isEqual';
// import filter from 'lodash/filter';
// import mapValues from 'lodash/mapValues';
// import validate from '../../validations';

// import get from 'lodash/get';
import forEach from 'lodash/forEach';
import set from 'lodash/set';

const useForm = ({
  onChange = () => {},
} = {}) => {
  const [formValue, setFormValue] = useState({});

  const formField = (fieldName, options = {}) => {
    if (!fieldName) {
      throw new Error('Field name is required');
    }

    const {
      initialValue = undefined,
      valuePropName = 'value',
      handlerPropName = 'onChange',
    } = options;

    let field = formValue[fieldName];
    if (!field) {
      field = {
        name: fieldName,
        value: initialValue,
        pristine: true,
      };
    }

    if (!isEqual(field, formValue[fieldName])) {
      setFormValue({ ...formValue, [fieldName]: field });
    }

    const onChangeField = (value) => {
      const newFormValue = {
        ...formValue,
        [fieldName]: {
          ...field,
          value,
          pristine: false,
        },
      };

      const vals = {};
      forEach(newFormValue, (f, key) => set(vals, key, f.value));
      onChange(vals);
      setFormValue(newFormValue);
    };

    const { value } = field;
    return {
      [valuePropName]: value,
      [handlerPropName]: onChangeField,
    };
  };

  const getValues = () => {
    const vals = {};
    forEach(formValue, (field, key) => set(vals, key, field.value));
    return vals;
  };

  return {
    formField,
    getValues,
    formValue,
  };
};

export default useForm;
