import Select from 'common-components/controls/select/Select';

const SelectTaxInclusion = ({ ...props }) => (
  <Select
    {...props}
    options={[
      { label: 'Inclusive', value: 'inclusive' },
      { label: 'Exclusive', value: 'exclusive' },
    ]}
  />
);

export default SelectTaxInclusion;
