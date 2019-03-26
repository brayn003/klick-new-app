import { useReducer, useEffect } from 'react';
import forEach from 'lodash/forEach';
import set from 'lodash/set';

const initialState = {};

const INITIALIZE_FIELD = 'initialize field';
const SET_FIELD_PROPERTIES = 'set field properties';

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case INITIALIZE_FIELD:
      return {
        ...state,
        [payload.fieldName]: {
          name: payload.fieldName,
          value: payload.initialValue,
          pristine: true,
        },
      };

    case SET_FIELD_PROPERTIES: {
      const { fieldName, ...rest } = payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          ...rest,
        },
      };
    }

    default:
      throw new Error();
  }
};

const useForm = (
  {
    onChange = () => {},
  } = {},
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const intializeField = (fieldName, options) => {
    dispatch({ type: INITIALIZE_FIELD, payload: { fieldName, ...options } });
  };

  const setFieldProperties = (fieldName, properties = {}) => {
    dispatch({ type: SET_FIELD_PROPERTIES, payload: { fieldName, ...properties } });
  };

  const getValues = () => {
    const vals = {};
    forEach(state, (f, key) => set(vals, key, f.value));
    return vals;
  };

  const setValue = (fieldName, value) => {
    setFieldProperties(fieldName, { value });
  };

  const formField = (fieldName, options = {}) => {
    const { valuePropName = 'value' } = options;
    const { handlerPropName = 'onChange' } = options;

    if (!state[fieldName]) {
      intializeField(fieldName, options);
    }

    const props = {
      [handlerPropName]: (value) => {
        setFieldProperties(fieldName, { value, pristine: false });
      },
      [valuePropName]: (state[fieldName] || {}).value,
    };

    return props;
  };

  useEffect(() => {
    onChange(getValues());
  }, [state]);

  return {
    formField,
    getValues,
    state,
    setValue,
  };
};

export default useForm;
