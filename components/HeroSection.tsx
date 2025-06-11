import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const HeroSection = () => {
  return (
    <section className="hero container">
      <p className="pill">Our blog</p>
      <div>
        <h2>The DevLog blog</h2>
        <p>A blog about development, Learning and New Technologies</p>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute top-2.5 size-5 left-3 text-gray-600 z-10 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for article"
            className="search"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
