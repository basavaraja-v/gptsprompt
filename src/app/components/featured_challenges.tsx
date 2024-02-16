import ChallengeCard from "./challenge_card";

const FeaturedChallenges = () => {
  // Sample Challenge Data (You'll replace  this with data fetching)
  const challenges = [
    { id: 1, prompt: "An oil painting of a robot dreaming of electric sheep", imageUrl: 'https://via.placeholder.com/300x200' /* ... more data */ },
    { id: 1, prompt: "An oil painting of a robot dreaming of electric sheep", imageUrl: 'https://via.placeholder.com/300x200' /* ... more data */ },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Featured Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
