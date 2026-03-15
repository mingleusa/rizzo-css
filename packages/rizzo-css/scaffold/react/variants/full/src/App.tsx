import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/rizzo/Navbar';
import Footer from '@/components/rizzo/Footer';
import Settings from '@/components/rizzo/Settings';
import BackToTop from '@/components/rizzo/BackToTop';
import Home from './views/Home';
import BlocksLayout from './layouts/BlocksLayout';
import BlocksIndex from './views/BlocksIndex';
import DocsLayout from './layouts/DocsLayout';
import DocsIndex from './views/DocsIndex';
import DocsOverview from './views/DocsOverview';
import DocsGettingStarted from './views/DocsGettingStarted';
import DocsComponents from './views/DocsComponents';
import Themes from './views/Themes';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar siteName="Rizzo CSS" />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks" element={<BlocksLayout />}>
            <Route index element={<BlocksIndex />} />
          </Route>
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path="overview" element={<DocsOverview />} />
            <Route path="getting-started" element={<DocsGettingStarted />} />
            <Route path="components" element={<DocsComponents />} />
          </Route>
          <Route path="/themes" element={<Themes />} />
        </Routes>
      </main>
      <Footer
        siteName="Rizzo CSS"
        links={[
          { href: '/docs/getting-started', label: 'Getting Started' },
          { href: '/docs', label: 'Docs' },
          { href: '/docs/components', label: 'Components' },
          { href: '/blocks', label: 'Blocks' },
          { href: '/themes', label: 'Themes' },
          { href: 'https://github.com', label: 'GitHub' },
        ]}
      />
      <BackToTop />
      <Settings />
    </>
  );
}
