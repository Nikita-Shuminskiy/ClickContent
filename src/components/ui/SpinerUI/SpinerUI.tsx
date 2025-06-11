const SpinerUI = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="url(#gradient)"
      stroke-width="4"
    ></circle>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#835ADA" }} />
        <stop offset="100%" style={{ stopColor: "#BE70DA" }} />
      </linearGradient>
    </defs>
    <path
      fill="#2e2e2e"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default SpinerUI;
