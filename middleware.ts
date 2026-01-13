import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <title>Wartungsarbeiten</title>
        <meta name="robots" content="noindex" />
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #0f172a;
            color: #e5e7eb;
            text-align: center;
          }
          .box {
            max-width: 420px;
          }
          h1 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }
          p {
            opacity: 0.8;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🚧 Wartungsarbeiten</h1>
          <p>Die Website ist aktuell vorübergehend nicht erreichbar.</p>
          <p>Bitte später erneut versuchen.</p>
        </div>
      </body>
    </html>
    `,
    {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Retry-After': '3600',
      },
    }
  )
}

