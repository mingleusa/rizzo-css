import { Link } from 'react-router-dom';
import ThemeIcon from '@/components/rizzo/ThemeIcon';
import ThemeSwitcher from '@/components/rizzo/ThemeSwitcher';
import Card from '@/components/rizzo/Card';
import CopyToClipboard from '@/components/rizzo/CopyToClipboard';
import { THEMES_DARK, THEMES_LIGHT } from '@/components/rizzo/themes';

const defaultTheme = 'github-dark-classic';
const snippet = `<html lang="en" data-theme="${defaultTheme}">`;

const themeCardContent: Record<string, { description: string; author: string }> = {
  'github-dark-classic': { description: 'Official GitHub dark theme for VS Code', author: 'Primer (GitHub)' },
  'shades-of-purple': { description: 'Professional theme with bold purple shades', author: 'Ahmad Awais' },
  'sandstorm-classic': { description: 'Dark, red-based theme for late-night coding', author: 'Devan Sisson' },
  'rocky-blood-orange': { description: 'Dark theme with blood-orange accent', author: 'Luca Heyworth' },
  'minimal-dark-neon-yellow': { description: 'Minimal dark theme with neon yellow accent', author: 'Gabriel D Sanchez' },
  'hack-the-box': { description: 'Dark blue with lime green accent, built for hackers', author: 'silofy' },
  'pink-cat-boo': { description: 'Sweet and cute dark theme with rose pink accents', author: 'Fiona Fan' },
  'github-light': { description: 'Official GitHub light theme for VS Code', author: 'Primer (GitHub)' },
  'red-velvet-cupcake': { description: 'Velvet-cupcake light theme with red accent', author: 'Fahad Ashraf Chaudhry' },
  'orangy-one-light': { description: 'Light theme with orange accent', author: 'maher-cshub' },
  sunflower: { description: 'Yellow light theme', author: 'Hashirama Naiff' },
  'green-breeze-light': { description: 'Green and blue focused light theme with good contrast', author: 'icy9ptcl' },
  'cute-pink': { description: 'Cute pink light theme for VSCode', author: 'WebFreak' },
  'semi-light-purple': { description: 'Light aesthetic theme with soft purple tones', author: 'Kapil Yadav' },
};

function applyTheme(value: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value);
  }
}

export default function Themes() {
  return (
    <div className="themes-page">
      <div className="themes-page__container">
        <header className="themes-page__hero">
          <h1 id="available-themes" className="themes-page__title">Available Themes</h1>
          <p className="themes-page__subtitle">
            Rizzo CSS includes 14 themes. Switch instantly via the Settings panel (gear icon in the navbar) or try the Theme Switcher below. Each theme uses semantic OKLCH variables.
          </p>
          <div className="themes-page__hero-demo example">
            <div className="example-title">Try Themes</div>
            <ThemeSwitcher idPrefix="page" />
          </div>
          <div className="themes-page__hero-ctas">
            <a href="https://rizzo-css.vercel.app/docs/theming" className="btn btn-primary themes-page__hero-cta" target="_blank" rel="noopener noreferrer">Theming docs</a>
            <Link to="/docs/components" className="btn btn-outline themes-page__hero-cta">Components</Link>
          </div>
        </header>

        <div className="themes-page__main">
          <section className="themes-page__section" aria-labelledby="dark-themes">
            <h2 id="dark-themes" className="themes-page__section-title">Dark Themes</h2>
            <div className="themes-page__grid">
              {THEMES_DARK.map((theme) => {
                const content = themeCardContent[theme.value];
                return (
                  <Card key={theme.value} variant="elevated">
                    <div className="card__body">
                      <div className="themes-page__card-header">
                        <ThemeIcon themeId={theme.value} size={24} className="themes-page__card-icon" />
                        <h3 className="themes-page__card-title">
                          <button type="button" className="themes-page__card-title-btn" onClick={() => applyTheme(theme.value)}>
                            {theme.label}
                          </button>
                        </h3>
                      </div>
                      {content && <p className="themes-page__card-desc">{content.description}</p>}
                      {content && <p className="themes-page__card-meta"><strong>Author:</strong> {content.author}</p>}
                      <p className="themes-page__card-meta"><code>{theme.value}</code></p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="themes-page__section" aria-labelledby="light-themes">
            <h2 id="light-themes" className="themes-page__section-title">Light Themes</h2>
            <div className="themes-page__grid">
              {THEMES_LIGHT.map((theme) => {
                const content = themeCardContent[theme.value];
                return (
                  <Card key={theme.value} variant="elevated">
                    <div className="card__body">
                      <div className="themes-page__card-header">
                        <ThemeIcon themeId={theme.value} size={24} className="themes-page__card-icon" />
                        <h3 className="themes-page__card-title">
                          <button type="button" className="themes-page__card-title-btn" onClick={() => applyTheme(theme.value)}>
                            {theme.label}
                          </button>
                        </h3>
                      </div>
                      {content && <p className="themes-page__card-desc">{content.description}</p>}
                      {content && <p className="themes-page__card-meta"><strong>Author:</strong> {content.author}</p>}
                      <p className="themes-page__card-meta"><code>{theme.value}</code></p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="using-themes" className="themes-page__copy-section" aria-labelledby="copy-heading">
            <h2 id="copy-heading" className="themes-page__section-title">Use a theme in your app</h2>
            <p className="themes-page__copy-desc">Set the theme on your HTML root. For persistence and custom themes, see the <a href="https://rizzo-css.vercel.app/docs/theming" target="_blank" rel="noopener noreferrer">theming docs</a>.</p>
            <div className="themes-page__code-block">
              <pre><code>{snippet}</code></pre>
              <CopyToClipboard value={snippet} buttonLabel="Copy" format="code" label="Copy snippet" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
