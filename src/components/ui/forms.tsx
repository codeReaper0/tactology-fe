"use client";
import {ErrorMessage, Field} from "formik";
import {EyeIcon} from "icons/index";
import {useState} from "react";

export const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  label,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-xs font-medium text-text-dark" htmlFor={name}>
        {label}
      </label>
      <div>
        <Field
          type={type}
          id={name}
          name={name}
          autoComplete="off"
          className="border border-border-light rounded-4 h-10 px-4 bg-transparent py-3 focus:outline-primary focus:border-inherit text-text-primary w-full text-sm"
          placeholder={placeholder}
        />
        <ErrorMessage
          name={name}
          component="p"
          className="text-xs text-primary italic mt-1"
        />
      </div>
    </div>
  );
};

export const InputPassword: React.FC<PasswordInput> = ({
  label,
  name,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-xs font-medium text-text-dark" htmlFor={name}>
        {label}
      </label>
      <div>
        <div className="flex relative">
          <Field
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            autoComplete="off-autofill"
            className="border border-border-light rounded-4 h-10 px-4 bg-transparent py-3 focus:outline-primary focus:border-inherit text-text-primary w-full text-sm"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute bottom-2 right-3 p-1 z-10"
          >
            {showPassword ? <EyeIcon /> : <EyeIcon />}
          </button>
        </div>
        <ErrorMessage
          name={name}
          component="p"
          className="text-xs text-primary italic mt-1"
        />
      </div>
    </div>
  );
};
