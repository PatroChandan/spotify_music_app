import "./TextInput.scss";
const TextInput = ({ label, placeholder, value, setValue }) => {
  return (
    <div className={"textInputDiv"}>
      <label for={label}>{label}</label>
      <input
        type="text"
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
export default TextInput;
