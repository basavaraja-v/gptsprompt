import Image from 'next/image';

const CommunityHighlights = () => {
  // Sample Data 
  const recentSubmissions = [
    { 
      id: 1, 
      prompt: "A cat cosmonaut exploring Mars", 
      imageUrl: 'https://via.placeholder.com/300x200' // Placeholder image
    },
    // Add 2-3 more ...
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Community Highlights</h2>

        {/* Recent Submissions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={submission.imageUrl} alt={submission.prompt}  width={300} // Adjust as needed
          height={200} 
          layout="responsive" // Or fixed if you prefer
          className="object-cover" />
              <div className="p-4">
                <p className="text-lg font-medium mb-2">{submission.prompt}</p>
                  <a href={`/submission/${submission.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded">
                    View Result
                  </a>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Snapshot (Optional) */}
        {/* Will require actual data fetching logic later */}
      </div> 
    </section>
  );
};

export default CommunityHighlights;
