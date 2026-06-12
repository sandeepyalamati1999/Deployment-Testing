import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Welcome to MyApp</h1>
        <p className="home__subtitle">
          A modern React + TypeScript starter built with Vite, React Router, and Axios.
        </p>
        <div className="home__actions">
          <a href="/about" className="btn btn--primary">Learn More</a>
          <a
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            Vite Docs
          </a>
        </div>
      </section>

      <section className="home__features">
        <h2 className="home__section-title">Features</h2>
        <div className="home__grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <span className="feature-card__icon">{feature.icon}</span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: '⚡',
    title: 'Vite',
    description: 'Lightning-fast HMR and optimized production builds out of the box.',
  },
  {
    icon: '🔷',
    title: 'TypeScript',
    description: 'Full type safety across the entire codebase for confident refactoring.',
  },
  {
    icon: '🗺️',
    title: 'React Router',
    description: 'Client-side routing with nested layouts and code splitting support.',
  },
  {
    icon: '🌐',
    title: 'Axios',
    description: 'Reusable API service with interceptors, auth tokens, and error handling.',
  },
];
