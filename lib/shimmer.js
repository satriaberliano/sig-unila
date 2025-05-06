export const shimmer = (width, height) => `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#E0E0E0" offset="20%" />
        <stop stop-color="#F8F8F8" offset="50%" />
        <stop stop-color="#E0E0E0" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#E0E0E0" />
    <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
  </svg>
`;

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
