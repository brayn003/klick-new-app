import Select from 'common-components/controls/select/Select';

const options = [
  { label: 'Business', value: 'business' },
  { label: 'Personal', value: 'personal' },
];

const SelectTaxInclusion = ({ ...props }) => (
  <Select
    {...props}
    options={options}
  />
);

export default SelectTaxInclusion;
