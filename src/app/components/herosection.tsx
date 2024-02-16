import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="custom-background text-white">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">GPTS Prompt: Master AI Creation</h1>
                    <p className="text-lg mb-4">Discover exciting prompts, share results, and collaborate with the AI prompt engineering community.</p>
                    <p className="text-base">Unleash your creativity and explore the ever-evolving world of AI art and text generation.</p>
                    <br />
                    <br />
                    <a href="/challenges" className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded gradient-button">
                        Explore Challenges
                    </a>
                </div>

                <div className="md:w-1/2">
                    <div className="w-full rounded-lg overflow-hidden hero-image-container hidden md:block">
                        <div className="relative w-full" style={{ height: '400px', paddingBottom: '100%' }}>
                            <Image
                                src="/hero-image-new.png"
                                alt="Hero Illustration"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
