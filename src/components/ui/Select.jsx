const Select = (props) => {
  const { label, value, options, ...other } = props;

  return (
    <>
      <label className="label">{label}</label>
      <select value={value} className="select focus:border-none" {...other}>
        <option disabled={true}></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
