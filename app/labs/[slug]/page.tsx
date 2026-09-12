import Link from "next/link";
import data from "../../../public/site-data.json";
import charts from "../../../public/chart-data.json";
import { BarChart, Scatter } from "../../../components/Charts";

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = data.labs.find((x) => x.slug === slug);

  if (!l)
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
        <Link href="/#labs" className="back">
          ← All labs
        </Link>
      </header>

      <main className="container">
        <section className="detailhero">
          <div className="eyebrow">
            LAB {l.number} · {l.date}
          </div>
          <h1>{l.title}</h1>
          <p className="prose">{l.description}</p>
          <div className="pillnav">
            {l.datasets.map((d) => (
              <Link
                href={"/data?file=" + encodeURIComponent(d.file)}
                key={d.file}
              >
                {d.name} ↗
              </Link>
            ))}
          </div>
        </section>

        {slug === "lab-1" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">What was covered</div>
                <h2>Getting comfortable with the tools.</h2>
              </div>
              <p>
                Pandas work included DataFrames, descriptive statistics,
                indexing and missing-value handling. NumPy covered arrays,
                matrices, slicing and statistics; scikit-learn introduced
                dataset loading and cosine similarity.
              </p>
            </div>
            <div className="notice">
              Melbourne House Prices Lite · 335 rows × 13 columns · includes
              missing house-price values used in the missing-value exercises.
            </div>
          </section>
        )}

        {slug === "lab-2" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Avocado EDA</div>
                <h2>Prices, distributions and volume.</h2>
              </div>
              <p>
                The notebook explores 18,249 avocado records with descriptive
                statistics, KDE distributions, correlations, count plots,
                scatter plots and box plots.
              </p>
            </div>
            <div className="split">
              <div className="chartbox">
                <h3 className="charttitle">Average price by year</h3>
                <BarChart
                  items={charts.avoYear.map((x) => ({
                    name: String(x.year),
                    value: x.price,
                  }))}
                />
              </div>
              <div className="chartbox">
                <h3 className="charttitle">Average price by type</h3>
                <BarChart
                  items={charts.avoType.map((x) => ({
                    name: x.type,
                    value: x.price,
                  }))}
                />
              </div>
            </div>
            <div className="notice">
              Notebook finding: one exploration notes outliers around an average
              price of about 1.0.
            </div>
          </section>
        )}

        {slug === "lab-3" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Titanic preparation</div>
                <h2>Cleaning before modeling.</h2>
              </div>
              <p>
                The work combines two Titanic datasets, inspects distributions
                and outliers, studies missingness, fills selected values and
                prepares data for machine learning.
              </p>
            </div>
            <div className="split">
              <div className="chartbox">
                <h3 className="charttitle">
                  Survival in the 900-row dataset
                </h3>
                <BarChart
                  items={charts.titSurvival.map((x) => ({
                    name: x.status,
                    value: x.count,
                  }))}
                />
              </div>
              <div className="panel light">
                <div className="eyebrow">Missing values</div>
                <h3>What needed attention?</h3>
                <p>
                  Age has 177 missing values; Cabin has 688; Boat has 603. The
                  notebook explores these patterns against survival before
                  choosing cleaning strategies.
                </p>
              </div>
            </div>
          </section>
        )}

        {slug === "lab-4" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Abalone classification</div>
                <h2>How much does model depth matter?</h2>
              </div>
              <p>
                The lab trains Decision Trees and Random Forests on 4,177
                abalone records, then compares accuracy, precision, recall and
                F1 across hyperparameter choices.
              </p>
            </div>
            <div className="chartbox">
              <h3 className="charttitle">
                Accuracy from the executed experiments
              </h3>
              <BarChart
                items={data.findings.models.map((x) => ({
                  name: x.model,
                  value: x.accuracy,
                }))}
              />
            </div>
            <div className="split" style={{ marginTop: 18 }}>
              <div className="panel">
                <div className="eyebrow">Decision Tree</div>
                <h3>max_depth 4 → 7</h3>
                <p>
                  Accuracy rises from 80.38% to 83.13%, recall rises from 44.81%
                  to 51.37%, and F1 reaches 57.14% at depth 7.
                </p>
              </div>
              <div className="panel light">
                <div className="eyebrow">Random Forest</div>
                <h3>50 vs 100 trees</h3>
                <p>
                  The 50-tree model reaches 83.13% accuracy and 51.88% F1; the
                  100-tree model has higher precision at 70.30%.
                </p>
              </div>
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
