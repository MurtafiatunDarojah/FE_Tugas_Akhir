const Button = (props) => {
  const {
    type,
    onClick,
    classname = "bg-yellow-500 text-white w-full mb-5",
    children,
    disabled = false,
  } = props;
  return (
    <button
      type={type}
      className={`${classname} font-medium rounded-md text-sm px-10 py-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

const tambah = (a, b) => {
  return a + b;
};

// -------------

tambah(1, 2);
