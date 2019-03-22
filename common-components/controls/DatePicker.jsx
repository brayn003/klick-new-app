import { useRef, useEffect, useState } from 'react';
import Flatpickr from 'flatpickr';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import usePrevious from '../../hooks/usePrevious';
import Input from './Input';

function useFlatpickr(options) {
  const ref = useRef();
  const [picker, setPicker] = useState();
  useEffect(() => {
    if (ref.current) {
      setPicker(Flatpickr(ref.current, options));
    }
    return () => {
      if (picker) { picker.destroy(); }
    };
  }, []);
  return { ref, picker };
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
        onChange(selectedDates[0]);
      }
      if (mode === 'multiple') {
        onChange(selectedDates);
      }
      if (mode === 'range' && selectedDates.length === 2) {
        onChange(selectedDates);
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
    if (ref.current && picker) {
      picker.setDate(value, false);
    }
  }, [value]);

  const { dateFormat } = options;
  let dateStrings = '';
  if (value && picker && mode === 'single') {
    dateStrings = picker.formatDate(value, dateFormat);
  }
  if (value && picker && mode === 'multiple') {
    dateStrings = value.map(singleDate => picker.formatDate(singleDate, dateFormat)).join(', ');
  }
  if (value && picker && mode === 'range') {
    dateStrings = value.map(singleDate => picker.formatDate(singleDate, dateFormat)).join(' ~ ');
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
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  mode: PropTypes.oneOf(['single', 'multiple', 'range']),
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  block: PropTypes.bool,
  className: PropTypes.shape({}),
  style: PropTypes.shape({}),
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
