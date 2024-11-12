export const VerticalDotsIcon = ({ size = 16, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 16 16"
    width={size || width}
    {...props}
  >
    <path
      d="M8 6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 0-1.5.67-1.5 1.5S7.17 5.5 8 5.5 9.5 4.83 9.5 4 8.83 2.5 8 2.5zm0 8c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
      fill="currentColor"
    />
  </svg>
);
