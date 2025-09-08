import React from 'react'
import type { GuideCard as GuideData } from '../data/pageMock'

export default function GuideCard({ guide }: { guide: GuideData }) {
  return (
  <div className="w-full bg-white rounded-2xl p-4 sm:p-6 mb-4">
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
          <button
            type="button"
            className="flex items-center gap-2 border border-orange-400 text-orange-500 px-4 py-2 rounded-[12px] font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12v5a2 2 0 0 1-2 2H5l-4 4V6a2 2 0 0 1 2-2h14" />
            </svg>
            {guide.ctaLabel}
          </button>
        )}
      </div>

      <div className="mt-4 text-gray-800 leading-relaxed text-sm sm:text-base">
        {guide.message}
      </div>
    </div>
  )
}
