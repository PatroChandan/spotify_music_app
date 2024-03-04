import "./PasswordInput.scss";
const PasswordInput = ({ label, placeholder, className, value, setValue }) => {
  return (
    <div className={"textInputDiv"}>
      <label for={label} className="font-bold">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="input"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
export default PasswordInput;
