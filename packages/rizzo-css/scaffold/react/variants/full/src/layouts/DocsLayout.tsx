import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DocsSidebar from '@/components/rizzo/DocsSidebar';
import BackToTop from '@/components/rizzo/BackToTop';
import { DOCS_NAV } from '@/config/docsNav';

function openSidebar() {
  const docs = document.querySelector('[data-docs]');
  const toggle = document.querySelector('[data-docs-sidebar-toggle]');
  const overlay = document.querySelector('[data-docs-sidebar-overlay]');
  docs?.classList.add('docs--sidebar-open');
  toggle?.setAttribute('aria-expanded', 'true');
  overlay?.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  const docs = document.querySelector('[data-docs]');
  const toggle = document.querySelector('[data-docs-sidebar-toggle]');
  const overlay = document.querySelector('[data-docs-sidebar-overlay]');
  docs?.classList.remove('docs--sidebar-open');
  toggle?.setAttribute('aria-expanded', 'false');
  overlay?.setAttribute('aria-hidden', 'true');
}

function toggleSidebar() {
  const docs = document.querySelector('[data-docs]');
  if (docs?.classList.contains('docs--sidebar-open')) closeSidebar();
  else openSidebar();
}

export default function DocsLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1025;
    document.documentElement.classList.add(w <= 1024 ? 'docs-sidebar-mobile' : 'docs-sidebar-desktop');

    const container = document.getElementById('docs-sidebar-container');
    if (!container) return;
    const toggle = container.querySelector('[data-docs-sidebar-toggle]');
    const overlay = container.querySelector('[data-docs-sidebar-overlay]');
    const docs = document.querySelector('[data-docs]');
    if (!toggle || !overlay || !docs) return;

    const onToggle = () => (docs.classList.contains('docs--sidebar-open') ? closeSidebar() : openSidebar());
    toggle.addEventListener('click', onToggle);
    overlay.addEventListener('click', closeSidebar);

    if (document.documentElement.classList.contains('docs-sidebar-mobile')) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => container.remove());
      } else {
        container.remove();
      }
    }
    return () => {
      toggle.removeEventListener('click', onToggle);
      overlay.removeEventListener('click', closeSidebar);
    };
  }, []);

  return (
    <div className="docs" data-docs>
      <div id="docs-sidebar-container">
        <button
          type="button"
          className="docs__sidebar-toggle"
          aria-label="Open documentation menu"
          aria-expanded={false}
          aria-controls="docs-sidebar"
          data-docs-sidebar-toggle
          onClick={toggleSidebar}
        >
          <span className="docs__sidebar-toggle-icon" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
          <span className="docs__sidebar-toggle-text">Docs</span>
        </button>
        <div className="docs__sidebar-overlay" data-docs-sidebar-overlay aria-hidden="true" onClick={closeSidebar} role="presentation" />
        <DocsSidebar currentPath={currentPath} pathPrefix="/docs" nav={DOCS_NAV} />
      </div>
      <div className="docs__main">
        <div className="docs__container">
          <div className="docs__content">
            <Outlet />
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
