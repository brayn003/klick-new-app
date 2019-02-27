import { useState } from 'react';
import isEqual from 'lodash/isEqual';
// import filter from 'lodash/filter';
import mapValues from 'lodash/mapValues';
// import validate from '../../validations';

const useForm = () => {
  const [formValue, setFormValue] = useState({});

  return {
    formField(fieldName, options = {}) {
      if (!fieldName) {
        throw new Error('Field name is required');
      }

      const {
        initialValue = undefined,
        valuePropName = 'value',
        handlerPropName = 'onChange',
        // rules,
      } = options;

      let field = formValue[fieldName];
      if (!field) {
        field = {
          name: fieldName,
          value: initialValue,
          pristine: false,
          isError: false,
          messages: [],
        };
      }

      if (!isEqual(field, formValue[fieldName])) {
        setFormValue({ ...formValue, [fieldName]: field });
      }

      const onChange = (value) => {
        // const isError = validate(fieldName, value, rules);
        setFormValue({
          ...formValue,
          [fieldName]: {
            ...field,
            value,
            pristine: true,
            // isError: !isError.isValid,
            // messages: isError.messages,
          },
        });
      };

      const { value } = field;

      return {
        [valuePropName]: value,
        [handlerPropName]: onChange,
      };
    },

    getValues() {
      return mapValues(formValue, v => v.value);
    },

    // getErrors() {
    //   return filter(formValue, v => !v.isError);
    // },

    formValue,
  };
};

export default useForm;
