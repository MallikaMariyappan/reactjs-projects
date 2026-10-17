"use client";

export type ButtonVariant =
  | "digit"
  | "operator"
  | "equals"
  | "function"
  | "memory"
  | "clear"
  | "special";

interface Props {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  span?: number;   // colspan
  small?: boolean; // smaller text
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  digit:    "bg-gray-700 hover:bg-gray-600 text-white",
  operator: "bg-indigo-600 hover:bg-indigo-500 text-white",
  equals:   "bg-orange-500 hover:bg-orange-400 text-white font-extrabold",
  function: "bg-gray-600 hover:bg-gray-500 text-cyan-300",
  memory:   "bg-teal-700 hover:bg-teal-600 text-white",
  clear:    "bg-red-600 hover:bg-red-500 text-white",
  special:  "bg-gray-800 hover:bg-gray-700 text-yellow-300",
};

export default function CalcButton({
  label,
  onClick,
  variant = "digit",
  span = 1,
  small = false,
  disabled = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        ${variantStyles[variant]}
        ${span === 2 ? "col-span-2" : ""}
        ${small ? "text-xs" : "text-sm"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "active:scale-95 cursor-pointer"}
        rounded-xl font-semibold h-12 flex items-center justify-center
        transition-all duration-100 shadow select-none
      `}
    >
      {label}
    </button>
  );
}
