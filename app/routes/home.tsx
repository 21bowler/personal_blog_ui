import type { Route } from './+types/home';
import HeroSection from 'components/HeroSection';
import EditorsPick from '../../components/EditorsPick';
import CallToAction from '../../components/CTA';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <HeroSection />
      <EditorsPick />
      <CallToAction />
    </div>
  );
}
