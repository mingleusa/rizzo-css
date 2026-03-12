<script lang="ts">
  import Card from '$lib/rizzo/Card.svelte';
  import Badge from '$lib/rizzo/Badge.svelte';
  import Button from '$lib/rizzo/Button.svelte';

  const skills = [
    { name: 'Skill one' },
    { name: 'Skill two' },
    { name: 'Skill three' },
    { name: 'Skill four' },
    { name: 'Skill five' },
  ];

  const projects = [
    {
      title: 'Project one',
      description: 'Short description placeholder. Replace with your project summary and tech stack.',
      tags: ['Tag A', 'Tag B', 'Tag C'],
      href: '#',
    },
    {
      title: 'Project two',
      description: 'Short description placeholder. Replace with your project summary and tech stack.',
      tags: ['Tag A', 'Tag B'],
      href: '#',
    },
    {
      title: 'Project three',
      description: 'Short description placeholder. Replace with your project summary and tech stack.',
      tags: ['Tag A', 'Tag B', 'Tag C'],
      href: '#',
    },
  ];
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content" class="home portfolio">
  <div class="home__container">
    <header class="home__hero portfolio__hero" id="top">
      <h1 class="home__title portfolio__title">Your name</h1>
      <p class="home__subtitle portfolio__subtitle">
        Short tagline here. Replace with your role or focus (e.g. full stack developer, designer).
      </p>
      <div class="home__hero-ctas portfolio__ctas">
        <a href="#projects" class="btn btn-primary home__hero-cta">View projects</a>
        <a href="#contact" class="btn btn-outline home__hero-cta">Get in touch</a>
      </div>
    </header>

    <section class="portfolio__section" id="about">
      <h2 class="home__section-title">About</h2>
      <p class="portfolio__about-text">
        Replace with a short bio: what you do, your focus areas, and what you enjoy. Keep it to one or two
        paragraphs so visitors can quickly understand your background.
      </p>
    </section>

    <section class="portfolio__section" id="skills">
      <h2 class="home__section-title">Skills & tools</h2>
      <div class="portfolio__skills">
        {#each skills as skill}
          <div class="portfolio__skill">
            <span class="portfolio__skill-name">{skill.name}</span>
          </div>
        {/each}
      </div>
      <p class="portfolio__skills-note">Plus: add more tools or categories as needed.</p>
    </section>

    <section class="portfolio__section" id="projects">
      <h2 class="home__section-title">Selected projects</h2>
      <div class="home__docs-grid portfolio__projects-grid">
        {#each projects as project}
          <Card variant="elevated" class="portfolio__project-card">
            <div class="card__header">
              <h3 class="card__title">{project.title}</h3>
            </div>
            <div class="card__body">
              <p>{project.description}</p>
              <div class="portfolio__tags">
                {#each project.tags as tag}
                  <Badge variant="primary" size="sm">{tag}</Badge>
                {/each}
              </div>
            </div>
            <div class="card__footer">
              <a href={project.href} class="btn btn-outline btn--sm" target="_blank" rel="noopener noreferrer">
                View project
              </a>
            </div>
          </Card>
        {/each}
      </div>
    </section>

    <section class="portfolio__section portfolio__contact" id="contact">
      <h2 class="home__section-title">Contact</h2>
      <p class="portfolio__contact-text">
        Interested in working together? Replace with your own message and add your email and social links below.
      </p>
      <div class="portfolio__contact-ctas">
        <a href="mailto:you@example.com" class="btn btn-primary">Email me</a>
        <a href="https://linkedin.com" class="btn btn-outline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com" class="btn btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </section>
  </div>
</main>

<style>
  .portfolio__hero {
    margin-bottom: var(--spacing-8);
  }
  .portfolio__title {
    margin-bottom: var(--spacing-2);
  }
  .portfolio__subtitle {
    margin-bottom: var(--spacing-6);
  }
  .portfolio__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }
  .portfolio__section {
    margin-bottom: var(--spacing-10);
  }
  .portfolio__about-text {
    max-width: 65ch;
    margin: 0;
    color: var(--text);
  }
  .portfolio__skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-2);
  }
  .portfolio__skill {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--surface);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
  }
  .portfolio__skills-note {
    margin: 0;
    font-size: var(--text-sm);
    color: var(--text-dim);
  }
  .portfolio__projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: var(--spacing-6);
  }
  .portfolio__project-card :global(.card__body) {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
  .portfolio__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }
  .portfolio__contact-text {
    margin: 0 0 var(--spacing-4);
    color: var(--text);
  }
  .portfolio__contact-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }
</style>
