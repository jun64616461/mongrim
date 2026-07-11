import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#141935,#0a0e27)',
          borderRadius: 8,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M22 4a12 12 0 1 0 6 21.5A9.5 9.5 0 0 1 22 4z" fill="#EBCB6B" />
          <circle cx="9" cy="8" r="1.6" fill="#F4E4B8" />
          <circle cx="7" cy="16" r="1.1" fill="#F4E4B8" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
