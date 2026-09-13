import Link from "next/link";
import data from "../../../public/site-data.json";
import charts from "../../../public/chart-data.json";
import { BarChart, Scatter } from "../../../components/Charts";

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = data.assignments.find((x) => x.slug === slug);

  if (!a)
    return (
      <main className="container section">
        <h1>Not found</h1>
      </main>
    );

  return (
    <>
      <header className="container nav">
        <Link href="/" className="brand">
          AI<span>/</span>DS <small>2021</small>
        </Link>
        <Link href="/#assignments" className="back">
          ← All assignments
        </Link>
      </header>

      <main className="container">
        <section className="detailhero">
          <div className="eyebrow">ASSIGNMENT {a.number} · 2021</div>
          <h1>{a.title}</h1>
          <p className="prose">{a.description}</p>
          <div className="pillnav">
            {a.datasets.map((d) => (
              <Link
                href={"/data?file=" + encodeURIComponent(d.file)}
                key={d.file}
              >
                {d.name} ↗
              </Link>
            ))}
          </div>
        </section>

        {slug === "assignment-1" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Data quality</div>
                <h2>Start with messy real-world data.</h2>
              </div>
              <p>
                The startup dataset contains 949 records and 18 attributes. The
                notebook checks missingness, duplicates and outliers before
                dimensionality reduction.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Startup data</div>
                <h3>949 records</h3>
                <p>
                  222 missing cells across selected columns and 26 duplicate
                  rows were identified. The preprocessing exercise also examined
                  numerical outliers with the IQR method.
                </p>
              </div>
              <div className="chartbox">
                <h3 className="charttitle">Startup status</h3>
                <BarChart
                  items={Object.entries(charts.startupStatus).map(
                    ([name, value]) => ({
                      name,
                      value: Number(value),
                    })
                  )}
                />
              </div>
            </div>

            <div className="sectionhead" style={{ marginTop: 70 }}>
              <div>
                <div className="eyebrow">Correlation</div>
                <h2>What relates to Top 500?</h2>
              </div>
              <p>
                The notebook highlights funding rounds, average participants and
                age at last funding as more noticeable relationships than
                geographic coordinates.
              </p>
            </div>
            <div className="chartbox">
              <BarChart items={charts.startupFundingCorr} />
            </div>

            <div className="sectionhead" style={{ marginTop: 70 }}>
              <div>
                <div className="eyebrow">Dimensionality reduction</div>
                <h2>t-SNE and PCA.</h2>
              </div>
              <p>
                The cancer registry experiment uses t-SNE for a 2D embedding and
                compares manual PCA with scikit-learn PCA. The executed notebook
                reports 99.873% variance for PC1 and 0.126% for PC2.
              </p>
            </div>
            <div className="panel light">
              <h3>99.873% + 0.126%</h3>
              <p>
                The first two principal components account for approximately
                99.9997% of the variance in the executed PCA experiment.
              </p>
            </div>
          </section>
        )}

        {slug === "assignment-2" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Clustering</div>
                <h2>Finding structure without labels.</h2>
              </div>
              <p>
                The assignment explores K-means, Agglomerative Clustering,
                intra-class similarity, silhouette coefficient, and whether PCA
                should happen before or after clustering.
              </p>
            </div>

            <div className="split">
              <div className="chartbox">
                <h3 className="charttitle">Soal 2 · K-means exploration</h3>
                <Scatter points={charts.scatter2} x="x1" y="x2" />
              </div>
              <div className="panel light">
                <div className="eyebrow">Silhouette coefficient</div>
                <h3>0.693</h3>
                <p>
                  The executed notebook reports 0.692915. The written proposal
                  initially says 11 clusters, while the executed K-means cell
                  uses 10; the archive intentionally preserves that distinction.
                </p>
              </div>
            </div>

            <div className="split" style={{ marginTop: 18 }}>
              <div className="chartbox">
                <h3 className="charttitle">Soal 3 · Agglomerative</h3>
                <Scatter points={charts.scatter3} x="x" y="y" />
              </div>
              <div className="chartbox">
                <h3 className="charttitle">Soal 4 · PCA dataset</h3>
                <Scatter points={charts.scatter4} x="A" y="B" />
              </div>
            </div>

            <div className="notice">
              Soal 4 contains 1,000 rows and 3 features. The notebook compares
              clustering after PCA with clustering before PCA, then reduces the
              results to two dimensions for visualization.
            </div>
          </section>
        )}

        {slug === "nlp-paper" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Research Paper</div>
                <h2>Multilingual Constituency Parsing</h2>
              </div>

              <p>
                A reproduction study of multilingual constituency parsing using
                self-attention and pretrained language models, comparing BERT,
                mBERT, and IndoBERT on English and Indonesian datasets.
              </p>
            </div>

            <div className="pdf-viewer">
              <iframe
                src="/NLP_PA4_B_YusufFakhriAldrian.pdf"
                title="Multilingual Constituency Parsing Paper"
              />
            </div>
          </section>
        )}
      </main>

      <footer className="container footer">
        <span>AI & Data Science · 2021</span>
        <span>
          <Link href="/">Back home</Link>
        </span>
      </footer>
    </>
  );
}
