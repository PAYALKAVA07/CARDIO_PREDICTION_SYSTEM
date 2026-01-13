export default function RadioGroup({
  label,
  options,
  value,
  onChange
}) {
  return (
    <div>
      <p className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </p>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="text-sm text-slate-700">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
