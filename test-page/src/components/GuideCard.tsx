import React from 'react'
import type { GuideCard as GuideData } from '../data/pageMock'

export default function GuideCard({ guide }: { guide: GuideData }) {
  return (
  <div className="w-full bg-white rounded-12 shadow-[0_1px_4px_rgb(0_0_0_/_0.1)] p-4 sm:p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={guide.avatar}
            alt={guide.author}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <div className="text-lg font-semibold text-black">{guide.author}</div>
          </div>
        </div>

        {guide.ctaLabel && (
          <div style={{ backgroundImage: 'linear-gradient(to right, #FF2600 0%, #FF5900 75%, #FF9500 100%)', padding: '2px', borderRadius: '12px', display: 'inline-block' }}>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-12 font-medium"
              style={{
                // inner button should mask the wrapper so only the 2px "border" shows the gradient
                backgroundColor: '#ffffff',
                borderRadius: '10px'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="url(#guide-cta-gradient)">
                <defs>
                  <linearGradient id="guide-cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF2600" />
                    <stop offset="75%" stopColor="#FF5900" />
                    <stop offset="100%" stopColor="#FF9500" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12v5a2 2 0 0 1-2 2H5l-4 4V6a2 2 0 0 1 2-2h14" />
              </svg>
              <span style={{
                backgroundImage: 'linear-gradient(to right, #FF2600 0%, #FF5900 75%, #FF9500 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}>{guide.ctaLabel}</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-gray-800 leading-relaxed text-sm sm:text-base">
        {guide.message}
      </div>
    </div>
  )
}
