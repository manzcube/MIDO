const Input = ({ type, value, onChange, placeholder, name, label }) => {
  return (
    <div className="input-pack">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        className="input"
        placeholder={placeholder}
        type={type}
        name={name}
        id={name}
        value={value}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
