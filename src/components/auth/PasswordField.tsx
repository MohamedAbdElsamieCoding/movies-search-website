import type { ChangeEventHandler } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordProps {
  label: string;
  visible: boolean;
  toggle: () => void;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}

const PasswordField = ({
  label,
  visible,
  toggle,
  value,
  onChange,
}: PasswordProps) => {
  return (
    <div className="input_group">
      <label>{label}</label>
      <div className="password_wrapper">
        <input
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
        />
        <span className="eye_icon" onClick={toggle}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
  );
};

export default PasswordField;
