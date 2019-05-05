import Select from 'common-components/controls/select/Select';

const options = [
  { label: 'Service Based', value: 'service-based' },
  { label: 'Product Based', value: 'product-based' },
];

const SelectIndustryType = ({ ...props }) => (
  <Select
    {...props}
    options={options}
  />
);

export default SelectIndustryType;
