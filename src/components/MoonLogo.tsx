export function MoonLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E4B8" />
          <stop offset="100%" stopColor="#EBCB6B" />
        </linearGradient>
      </defs>
      {/* 초승달 */}
      <path
        d="M22 4a12 12 0 1 0 6 21.5A9.5 9.5 0 0 1 22 4z"
        fill="url(#moonGrad)"
      />
      {/* 별들 */}
      <circle cx="9" cy="8" r="1.4" fill="url(#moonGrad)" />
      <circle cx="6" cy="15" r="1" fill="url(#moonGrad)" />
      <circle cx="12" cy="24" r="1.1" fill="url(#moonGrad)" />
    </svg>
  );
}
