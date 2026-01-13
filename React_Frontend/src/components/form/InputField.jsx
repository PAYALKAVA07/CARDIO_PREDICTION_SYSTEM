export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  helper
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-textPrimary mb-1">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 text-sm
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-danger focus:ring-danger"
              : "border-borderSubtle focus:ring-primary"
          }`}
      />

      {helper && !error && (
        <p className="text-xs text-info mt-1">{helper}</p>
      )}

      {error && (
        <p className="text-xs text-danger mt-1">{error}</p>
      )}
    </div>
  );
}
