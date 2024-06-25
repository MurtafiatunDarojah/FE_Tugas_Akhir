const Search = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <label
        htmlFor="search"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <input
        type="text"
        id="search"
        name="search"
        className="bg-gray-50 border border-gray-400 text-black text-sm rounded-lg block w-full p-2 mb-5"
        value={value}
        onChange={onChange}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default Search;
