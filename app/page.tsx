import Link from "next/link";
import data from "../public/site-data.json";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';


const fmt = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

export default function Home() {
  return (
    <>
      <header className="container nav">
        <Link href="/" className="brand">
          AI<span>/</span>DS <small>2021</small>
        </Link>

        <nav className="navlinks">
          <a href="#labs">Labs</a>
          <a href="#assignments">Assignments</a>
          <a href="#results">Results</a>
          <a href="#datasets">Datasets</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="container hero">
          <div className="eyebrow">
            Class B · Universitas Indonesia · 2021
          </div>

          <h1>
            Learning to see
            <br />
            <em>through data.</em>
          </h1>

          <p>
            An interactive archive of Yusuf Fakhri Aldrian&apos;s AI &
            Data Science coursework — from Python and Pandas to
            visualization, preprocessing, clustering and machine
            learning.
          </p>

          <a className="button" href="#labs">
            Explore the work ↓
          </a>
        </section>

        {/* STATS */}
        <section className="container stats">
          <div className="stat">
            <strong>04</strong>
            <span>Labs</span>
          </div>

          <div className="stat">
            <strong>02</strong>
            <span>Assignments</span>
          </div>

          <div className="stat">
            <strong>09</strong>
            <span>Datasets</span>
          </div>

          <div className="stat">
            <strong>2021</strong>
            <span>Academic year</span>
          </div>
        </section>

        {/* LABS */}
        <section id="labs" className="container section">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">The curriculum</div>
              <h2>Four steps into data science.</h2>
            </div>

            <p>
              The archive follows the progression in the original
              notebooks, but presents the work as a visual story
              rather than a folder of files.
            </p>
          </div>

          <div className="cards">
            {data.labs.map((lab) => (
              <Link
                className="card"
                href={`/labs/${lab.slug}`}
                key={lab.slug}
              >
                <div className="cardtop">
                  <span>LAB {lab.number}</span>
                  <span>{lab.date}</span>
                </div>

                <h3>{lab.title}</h3>

                <p>{lab.description}</p>

                <div className="tags">
                  {lab.topics.map((topic) => (
                    <span className="tag" key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>

                <span className="arrow">
                  Open lab →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ASSIGNMENTS */}
        <section id="assignments" className="container section">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">Deep dives</div>
              <h2>Two bigger experiments.</h2>
            </div>

            <p>
              Assignments move from data quality and dimensionality
              reduction into clustering and model comparison.
            </p>
          </div>

          <div className="cards">
            {data.assignments.map((assignment) => (
              <Link
                className="card"
                href={`/assignments/${assignment.slug}`}
                key={assignment.slug}
              >
                <div className="cardtop">
                  <span>
                    ASSIGNMENT {assignment.number}
                  </span>

                  <span>{assignment.year}</span>
                </div>

                <h3>{assignment.title}</h3>

                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]} 
                    components={{
                      p: ({ children }) => (
                        <p className="text-sm leading-relaxed text-neutral-300">
                          {children}
                        </p>
                    ),
                  }}>
                      {assignment.description}
                </ReactMarkdown>

                <div className="tags">
                  {assignment.datasets.map((dataset) => (
                    <span
                      className="tag"
                      key={dataset.file}
                    >
                      {dataset.name}
                    </span>
                  ))}
                </div>

                <span className="arrow">
                  Explore assignment →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="container section">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">Selected results</div>
              <h2>The numbers behind the notebooks.</h2>
            </div>

            <p>
              These values are taken from the executed notebooks
              in the repository and surfaced here as the most
              useful results.
            </p>
          </div>

          <div className="split">
            {/* MODEL RESULTS */}
            <div className="panel">
              <div className="eyebrow">
                Classification
              </div>

              <h3>Abalone model comparison</h3>

              {data.findings.models.map((model) => (
                <div className="metric" key={model.model}>
                  <label>{model.model}</label>

                  <div className="bar">
                    <i
                      style={{
                        width: `${model.accuracy * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <p
                style={{
                  color: "#aaa",
                  fontSize: 12,
                }}
              >
                Accuracy shown above. The notebooks also report
                precision, recall and F1-score for each experiment.
              </p>
            </div>

            {/* PCA */}
            <div className="panel light">
              <div className="eyebrow">
                Dimensionality reduction
              </div>

              <h3>
                PCA found a dominant first component.
              </h3>

              <div
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: 55,
                  letterSpacing: "-0.06em",
                }}
              >
                {(data.findings.pca.explained[0] * 100).toFixed(2)}%
              </div>

              <p>
                The first principal component&apos;s explained
                variance in the cancer-registry PCA experiment.
                Together, the first two components explain{" "}
                {(
                  100 *
                  (
                    data.findings.pca.explained[0] +
                    data.findings.pca.explained[1]
                  )
                ).toFixed(3)}
                %.
              </p>
            </div>
          </div>
        </section>

        {/* DATASETS */}
        <section id="datasets" className="container section">
          <div className="sectionhead">
            <div>
              <div className="eyebrow">Data room</div>
              <h2>Open the datasets.</h2>
            </div>

            <p>
              Every CSV from the repository is available as an
              interactive table. Search it, inspect columns, and
              download the original file.
            </p>
          </div>

          <DatasetLinks />
        </section>

        <div className="container">
          <Link
              href="https://django-server-production-a05b.up.railway.app/medex/"
              className="medex-banner">
              <div className="medex-track">
                  <span>ALSO LOOK AT MEDEX</span>
                  <span>↗</span>
              </div>
          </Link>
      </div>
      </main>

      {/* FOOTER */}
      <footer className="container footer">
        <span>AI & Data Science · 2021</span>
        <span>Yusuf Fakhri Aldrian · Class B</span>
      </footer>
    </>
  );
}

function DatasetLinks() {
  const datasets = [
    ...data.labs.flatMap((lab) => lab.datasets),
    ...data.assignments.flatMap(
      (assignment) => assignment.datasets
    ),
  ];

  // Prevent the same CSV from appearing multiple times.
  const uniqueDatasets = Array.from(
    new Map(
      datasets.map((dataset) => [
        dataset.file,
        dataset,
      ])
    ).values()
  );

  return (
    <div className="cards">
      {uniqueDatasets.map((dataset) => (
        <Link
          className="card"
          href={`/data?file=${encodeURIComponent(
            dataset.file
          )}`}
          key={dataset.file}
        >
          <div className="cardtop">
            <span>CSV</span>
            <span>{fmt(dataset.rows)} rows</span>
          </div>

          <h3>{dataset.name}</h3>

          <p>
            {dataset.columns} columns · original repository
            data
          </p>

          <span className="arrow">
            Open data →
          </span>
        </Link>
      ))}
    </div>
  );
}

