export function NeuralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Subtle gradient overlay */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#00E4FF]/5 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#147BFF]/5 via-transparent to-transparent blur-3xl" />
      
      {/* Neural pattern lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="#00E4FF" />
            <line x1="50" y1="50" x2="100" y2="0" stroke="#147BFF" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="#147BFF" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="0" y2="75" stroke="#147BFF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-grid)" />
      </svg>
    </div>
  );
}
