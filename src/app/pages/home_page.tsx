import Head from 'next/head';
import HeroSection from '../components/herosection';
import FeaturedChallenges from '../components/featured_challenges';
import CommunityHighlights from '../components/community_highlights';
import Header from '../components/header';
import Footer from '../components/footer';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>GPTS Prompt - Your AI Prompt Playground</title>
        <meta name="description" content="..." /> 
      </Head>

      <main>
        <Header />
        <HeroSection />
        <FeaturedChallenges />
        <CommunityHighlights />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
