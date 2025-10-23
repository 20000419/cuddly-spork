
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface SceneDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
}

const SceneDisplay: React.FC<SceneDisplayProps> = ({ imageUrl, isLoading }) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <LoadingSpinner />
            <p className="text-gray-300 mt-2 text-sm">Generating scene...</p>
          </div>
        </div>
      )}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Current scene"
          className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
        />
      ) : (
         <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <p className="text-gray-500">Your adventure begins...</p>
         </div>
      )}
    </div>
  );
};

export default SceneDisplay;
   