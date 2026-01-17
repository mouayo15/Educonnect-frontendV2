import React, { useState } from 'react';
import { Flame } from 'lucide-react';

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.8);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.4s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.5s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.5s ease-out 0.2s both;
  }
  
  .animate-spin-slow {
    animation: spinSlow 3s linear infinite;
  }
`;

export default function StreakPopup({ streak = 7, onClose }) {
  return (
    <>
      <style>{styles}</style>
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 mx-4 animate-scaleIn"
          style={{ maxWidth: '28rem', width: 'min(92%, 28rem)' }}
        >
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Flame className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-800 mb-2 animate-slideDown">
              {streak} Day Streak!
            </h2>
            <p className="text-gray-600 mb-6 text-lg animate-slideUp">
              You're on fire! Keep it up! 🔥
            </p>
            
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 mb-6 animate-fadeIn">
              <p className="text-orange-800 font-semibold mb-2">Streak Milestones</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">7 days</span>
                  <span className="text-green-600 font-bold">✓ Unlocked!</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">30 days</span>
                  <span className="text-gray-400">{30 - streak} days to go</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">100 days</span>
                  <span className="text-gray-400">{100 - streak} days to go</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
            >
              LET'S GO!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}