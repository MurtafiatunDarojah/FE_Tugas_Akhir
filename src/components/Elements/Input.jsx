const Input = (props) => {
  const {
    label = "Label",
    type = "text",
    name,
    value,
    placeholder = "Masukkan Inputan ....",
    required = true,
    onChange = () => {},
    classname = "w-full",
    disabled = false,
  } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={`${classname} bg-gray-50 border border-gray-400 text-black text-sm rounded-lg block p-2`}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
