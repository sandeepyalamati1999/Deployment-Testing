import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about">
      <h1 className="about__title">About MyApp</h1>
      <p className="about__lead">
        MyApp is a production-ready React + TypeScript starter project designed to give teams a
        clean foundation for building scalable web applications.
      </p>

      <section className="about__section">
        <h2>Tech Stack</h2>
        <ul className="about__stack-list">
          {stack.map((item) => (
            <li key={item.name} className="about__stack-item">
              <strong>{item.name}</strong> — {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="about__section">
        <h2>Project Structure</h2>
        <pre className="about__code">{projectStructure}</pre>
      </section>
    </div>
  );
}

const stack = [
  { name: 'React 18', description: 'UI library with concurrent features' },
  { name: 'TypeScript', description: 'Static typing for JavaScript' },
  { name: 'Vite', description: 'Next-generation frontend tooling' },
  { name: 'React Router v6', description: 'Declarative client-side routing' },
  { name: 'Axios', description: 'Promise-based HTTP client' },
  { name: 'ESLint + Prettier', description: 'Code linting and formatting' },
];

const projectStructure = `src/
├── assets/        # Static assets (images, fonts)
├── components/    # Reusable UI components
│   └── Layout/    # Header, Footer, Layout wrapper
├── hooks/         # Custom React hooks
├── pages/         # Route-level page components
├── services/      # API service layer
├── types/         # TypeScript type definitions
└── utils/         # Pure utility functions`;
