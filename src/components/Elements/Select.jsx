const Select = (props) => {
  const {
    label = "Label",
    name,
    value,
    selected = "Pilih Pilihan",
    listSelected = [],
    onChange = () => {},
    required = true,
  } = props;

  return (
    <form className="">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="" disabled>
          {selected}
        </option>
        {listSelected.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Select;
