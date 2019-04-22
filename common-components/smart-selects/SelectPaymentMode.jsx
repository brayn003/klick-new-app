import Select from 'common-components/controls/select/Select';

const options = [
  { label: 'Cash', value: 'cash' },
  { label: 'Cheque', value: 'Cheque' },
  { label: 'Card', value: 'Card' },
  { label: 'Bank', value: 'Bank' },
];

const SelectPaymentMode = ({ ...props }) => (
  <Select
    {...props}
    options={options}
  />
);

export default SelectPaymentMode;
