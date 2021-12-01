import { ErrorMessage, Field, FormikHandlers } from "formik";

export default function FormInput({
  name,
  type,
  className,
  label,
  placeholder,
  hint,
  optional,
  nullable,
  value,
  handlers,
}: {
  name: string;
  type: string;
  className?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
  nullable?: boolean;
  value?: number | null | "";
  handlers?: Pick<FormikHandlers, "handleBlur" | "handleChange">;
}) {
  const inputStyle = `focus:ring-primary focus:border-primary block w-full pl-3 text-sm border-gray-300 rounded-md`;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex flex-row justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 w-full tracking-wide"
        >
          <div className="flex justify-between">
            <span className="capitalize">{label ? label : name}</span>{" "}
            {hint && <span className="text-gray-400 font-normal">{hint}</span>}
          </div>
        </label>
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        {name === "fee" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
        )}
        {nullable ? (
          <input
            type={type}
            name={name}
            className={inputStyle}
            placeholder={placeholder && ""}
            value={value === null ? "" : (value as unknown as number)}
            onChange={handlers?.handleChange}
            onBlur={handlers?.handleBlur}
          />
        ) : (
          <Field className={inputStyle} type={type} name={name} />
        )}
      </div>
      <ErrorMessage className="text-red-600" name={name} component="div" />
    </div>
  );
}
