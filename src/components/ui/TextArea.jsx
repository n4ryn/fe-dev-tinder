const TextInput = (props) => {
  const { label, value, ...other } = props;

  return (
    <>
      <label className="label">{label}</label>
      <textarea
        value={value}
        placeholder="Type here"
        className="textarea textarea-bordered w-full max-w-xs focus:border-none"
        {...other}
      />
    </>
  );
};

export default TextInput;
