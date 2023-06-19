import React from 'react';
import spinning from '../spinning.svg'

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-30 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
    <div>
      <img src={spinning} alt="Loading..." className="h-24" />
    </div>
  </div>
  )
}
