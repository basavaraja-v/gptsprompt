import Image from 'next/image';

interface ChallengeCardProps {
  challenge: {
    id: number;
    prompt: string;
    imageUrl?: string; // Image can be optional
    difficulty?: string; // 'Easy', 'Medium', 'Hard', etc.  
  };
}

const ChallengeCard = ({ challenge }: ChallengeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Handling */}
      {challenge.imageUrl ? (
        <Image 
          src={challenge.imageUrl} 
          alt={challenge.prompt} 
          width={300} // Adjust as needed
          height={200} 
          layout="responsive" // Or fixed if you prefer
          className="object-cover" 
        />
      ) : (
        <div className="bg-gray-200 h-64"> 
           {/* Placeholder if no image */} 
        </div>
      )}

      {/* Challenge Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{challenge.prompt}</h3>

        {/* Difficulty Indicator (if available) */}
        {challenge.difficulty && (
          <span 
            className={`inline-block px-3 py-1 text-sm rounded 
                      ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' 
                        : challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'}`}  
          >
            {challenge.difficulty}
          </span>
        )}

    
          <a href={`/challenges/${challenge.id}`} className="block mt-3 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
            View Challenge
          </a>
      </div>
    </div>
  );
};

export default ChallengeCard;
