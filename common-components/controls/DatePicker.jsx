import { useRef, useEffect } from 'react';
import Flatpickr from 'flatpickr';
import {
  string, oneOfType, oneOf, bool, shape, arrayOf, func,
} from 'prop-types';
import isEqual from 'lodash/isEqual';

import usePrevious from '../../hooks/usePrevious';
import Input from './Input';

function useFlatpickr(options) {
  const ref = useRef();
  const picker = useRef();

  useEffect(() => {
    if (ref.current) {
      picker.current = Flatpickr(ref.current, options);
    }
    return () => {
      if (picker.current) { picker.current.destroy(); }
    };
  }, []);
  return { ref, picker: picker.current };
}

function DatePicker(props) {
  const {
    onChange,
    value,
    placeholder,
    block,
    className,
    style,
    ...rest
  } = props;
  const options = { ...rest };
  const prevOptions = usePrevious(options);
  const optionsKeyArray = Object.keys(options);

  // effect for initializing picker
  const { mode } = options;
  const newOptions = {
    ...options,
    onChange: (selectedDates) => {
      if (mode === 'single') {
        onChange(selectedDates[0].toISOString());
      }
      if (mode === 'multiple') {
        onChange(selectedDates.map(d => d.toISOString()));
      }
      if (mode === 'range' && selectedDates.length === 2) {
        onChange(selectedDates.map(d => d.toISOString()));
      }
    },
  };
  const { ref, picker } = useFlatpickr(newOptions);

  // effect for updating options if it changes
  useEffect(() => {
    if (ref.current && picker) {
      optionsKeyArray.forEach((optionKey) => {
        if (!isEqual(options[optionKey], (prevOptions || {})[optionKey])) {
          picker.set(optionKey, options[optionKey]);
        }
      });
    }
  }, [...Object.values(options)]);

  // assigning value to date
  useEffect(() => {
    if (ref.current && picker && value) {
      picker.setDate(new Date(value), false);
    }
  }, [value]);

  const { dateFormat } = options;
  let dateStrings = '';
  if (picker) {
    const pickerValue = picker.selectedDates;
    if (pickerValue[0] && picker && mode === 'single') {
      dateStrings = picker.formatDate(new Date(pickerValue[0]), dateFormat);
    }
    if (picker && mode === 'multiple') {
      dateStrings = pickerValue
        .map(singleDate => picker.formatDate(new Date(singleDate), dateFormat)).join(', ');
    }
    if (picker && mode === 'range') {
      dateStrings = pickerValue
        .map(singleDate => picker.formatDate(new Date(singleDate), dateFormat)).join(' ~ ');
    }
  }
  return (
    <Input
      ref={ref}
      value={dateStrings}
      placeholder={placeholder}
      block={block}
      className={className}
      style={style}
    />
  );
}

DatePicker.propTypes = {
  onChange: func,
  value: oneOfType([string, arrayOf(string)]),
  mode: oneOf(['single', 'multiple', 'range']),
  dateFormat: string,
  placeholder: string,
  block: bool,
  className: shape({}),
  style: shape({}),
};

DatePicker.defaultProps = {
  onChange: () => {},
  value: undefined,
  mode: 'single',
  dateFormat: 'd M Y',
  placeholder: '',
  block: false,
  className: undefined,
  style: undefined,
};

export default DatePicker;
