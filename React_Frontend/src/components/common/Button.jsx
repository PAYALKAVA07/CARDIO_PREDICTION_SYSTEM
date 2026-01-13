export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary"
}) {
  const base =
    "w-full py-2 rounded-md font-medium transition";

  const styles = {
    primary: disabled
      ? "bg-muted text-white cursor-not-allowed"
      : "bg-primary text-white hover:bg-indigo-700",
    secondary:
      "border border-borderSubtle text-textPrimary hover:bg-bgMain"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
