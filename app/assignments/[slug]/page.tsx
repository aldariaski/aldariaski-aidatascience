import Link from "next/link";
import data from "../../../public/site-data.json";
import charts from "../../../public/chart-data.json";
import { BarChart, Scatter } from "../../../components/Charts";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import JupyterViewer from '../../../components/JupyterViewer';

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
          <div className="eyebrow">ASSIGNMENT {a.number} · {a.year}</div>
          <h1>{a.title}</h1>
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {a.description}
            </ReactMarkdown>
          </div>
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

        {/* ASSIGNMENT 1 */}
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
                  items={Object.entries(charts.startupStatus || {}).map(
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
              <BarChart items={charts.startupFundingCorr || []} />
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

        {/* ASSIGNMENT 2 */}
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
                <Scatter points={charts.scatter2 || []} x="x1" y="x2" />
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
                <Scatter points={charts.scatter3 || []} x="x" y="y" />
              </div>
              <div className="chartbox">
                <h3 className="charttitle">Soal 4 · PCA dataset</h3>
                <Scatter points={charts.scatter4 || []} x="A" y="B" />
              </div>
            </div>

            <div className="notice">
              Soal 4 contains 1,000 rows and 3 features. The notebook compares
              clustering after PCA with clustering before PCA, then reduces the
              results to two dimensions for visualization.
            </div>
          </section>
        )}

        {/* NLP SENTIMENT ANALYSIS (TP3) */}
        {(slug === "assignment-3") && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">NLP Sentiment Analysis · TP3</div>
                <h2>Classical ML vs. Fine-Tuned BERT</h2>
              </div>
              <p>
                This experiment compares classical text classification based on TF-IDF features with 
                contextual language representations from fine-tuned BERT embeddings.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Feature Matrix</div>
                <h3>25,000 × 4,001</h3>
                <p>
                  TF-IDF documents represented through 4,001 statistical n-gram term frequencies. Evaluated via 
                  Random Forest (~69.5% accuracy) and Support Vector Classification (~72.404% accuracy).
                </p>
              </div>

              <div className="panel light">
                <div className="eyebrow">Contextual Model</div>
                <h3>Fine-Tuned BERT</h3>
                <p>
                  BERT captures word meanings based on surrounding bidirection context. Across 3 fine-tuning epochs, 
                  training accuracy reached 80.04% with training loss dropping to 0.4415.
                </p>
              </div>
              {/* Classical Model Comparison Bar Chart */}
              <div className="chartbox">
                <h3 className="charttitle">Model Comparison (Accuracy %)</h3>
                <BarChart
                  items={(charts.sentimentAnalysis?.modelComparison || []).map((m) => ({
                    name: m.name,
                    value: Number((m.accuracy * 100).toFixed(2)),
                  }))}
                />
              </div>
              
            </div>

            <div className="sectionhead" style={{ marginTop: 70 }}>
              <div>
                <div className="eyebrow">Training progression</div>
                <h2>Fine-Tuned BERT Epoch Performance</h2>
              </div>
            </div>

            <div className="chartbox">
              <BarChart
                items={[
                  { name: "Epoch 1 (Acc: 61.29%)", value: 61.29 },
                  { name: "Epoch 2 (Acc: 71.58%)", value: 71.58 },
                  { name: "Epoch 3 (Acc: 80.04%)", value: 80.04 }
                ]}
              />
            </div>

            <div className="notice" style={{ marginTop: 30 }}>
              <strong>Methodological Note:</strong> TF-IDF represents documents through the statistical importance of 
              individual terms, while BERT represents words according to their surrounding context. In the recorded experiment, 
              SVC achieved 72.4% test accuracy, while BERT training accuracy increased to 80.0% after three fine-tuning epochs. 
              Note that 80.04% represents training performance across displayed epochs rather than a held-out test metric.
            </div>
          </section>
        )}

        {/* SOCIAL NETWORK ANALYSIS (TP4) */}
          {(slug === "assignment-4") && (
            <section className="section">
              <div className="sectionhead">
                <div>
                  <div className="eyebrow">Social Network Analysis · TP4</div>
                  <h2>Retweet & Mention Graph Structure</h2>
                </div>
                <p>
                  Directed graph construction and community detection across Twitter/X interaction topologies.
                </p>
              </div>

              <div className="split">
                {/* Retweet Network Panel */}
                <div className="panel">
                  <div className="eyebrow">Retweet Network</div>
                  <h3>
                    {(charts.socialNetwork?.retweet?.nodes || 0).toLocaleString()} Nodes /{" "}
                    {(charts.socialNetwork?.retweet?.edges || 0).toLocaleString()} Edges
                  </h3>
                  <p>
                    Density ≈ {(charts.socialNetwork?.retweet?.density || 0).toFixed(5)}. Contains{" "}
                    {charts.socialNetwork?.retweet?.connectedComponents || 0} weakly connected components and{" "}
                    {charts.socialNetwork?.retweet?.stronglyConnectedComponents || 0} strongly connected components. 
                    Greedy Modularity optimization detected{" "}
                    {charts.socialNetwork?.retweet?.communities?.greedyModularity || 0} distinct communities.
                  </p>
                </div>

                {/* Mention Network Panel */}
                <div className="panel light">
                  <div className="eyebrow">Mention Network</div>
                  <h3>
                    {(charts.socialNetwork?.mention?.nodes || 0).toLocaleString()} Nodes /{" "}
                    {(charts.socialNetwork?.mention?.edges || 0).toLocaleString()} Edges
                  </h3>
                  <p>
                    Density ≈ {(charts.socialNetwork?.mention?.density || 0).toFixed(5)}. Contains{" "}
                    {charts.socialNetwork?.mention?.connectedComponents || 0} weakly connected components and{" "}
                    {charts.socialNetwork?.mention?.stronglyConnectedComponents || 0} strongly connected components. 
                    Greedy Modularity optimization partitioned the graph into{" "}
                    {charts.socialNetwork?.mention?.communities?.greedyModularity || 0} communities.
                  </p>
                </div>
              </div>

              {/* Network Topology Visual Comparison Chart */}
              <div className="sectionhead" style={{ marginTop: 50 }}>
                <div>
                  <div className="eyebrow">Graph Metrics</div>
                  <h2>Topology Comparison</h2>
                </div>
              </div>

              <div className="chartbox">
                <h3 className="charttitle">Total Node Count</h3>
                <BarChart
                  items={[
                    {
                      name: "Retweet Network",
                      value: charts.socialNetwork?.retweet?.nodes || 0,
                    },
                    {
                      name: "Mention Network",
                      value: charts.socialNetwork?.mention?.nodes || 0,
                    },
                  ]}
                />
              </div>

              <div className="sectionhead" style={{ marginTop: 70 }}>
                <div>
                  <div className="eyebrow">Graph Centrality Definitions</div>
                  <h2>Structural Node Importance</h2>
                </div>
              </div>

              <div className="split">
                <div className="panel light">
                  <h4>In-Degree & Out-Degree</h4>
                  <p style={{ fontSize: 14 }}>
                    In-degree counts incoming links (accounts pointing to this node), whereas Out-degree counts outgoing connections.
                  </p>

                  <h4>Betweenness Centrality</h4>
                  <p style={{ fontSize: 14 }}>
                    Measures how often a node acts as a bridge along the shortest path connecting two other nodes.
                  </p>
                </div>

                <div className="panel light">
                  <h4>Closeness & Eigenvector</h4>
                  <p style={{ fontSize: 14 }}>
                    Closeness measures mean distance to all other nodes. Eigenvector centrality evaluates whether a node connects to other highly-connected, structurally central nodes.
                  </p>

                  <h4>Community Structure</h4>
                  <p style={{ fontSize: 14 }}>
                    Identified via Louvain, Label Propagation, and Greedy Modularity algorithm implementations.
                  </p>
                </div>
              </div>
            </section>
          )}

        {/* DATMIN 1 */}
        {slug === "datmin-1" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Data exploration</div>
                <h2>Analyzing 52,466 books.</h2>
              </div>
              <p>
                The dataset covers key attributes including price, rating, votes, score, 
                page count, and format to evaluate pricing drivers and reader behavior.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Book dataset</div>
                <h3>52,466 records</h3>
                <p>
                  Explored price distributions, central tendencies, and key correlations across formats. 
                  While format significantly affects price (ANOVA F ≈ 7.65, p ≈ 1.8 × 10⁻³⁰), 
                  practical effect sizes vary widely across variables.
                </p>
              </div>
              <div className="chartbox">
                <h3 className="charttitle">Price by format</h3>
                <BarChart
                  items={Object.entries(charts.bookFormatPrice || {}).map(
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
                <div className="eyebrow">Correlation analysis</div>
                <h2>Rating vs. vote counts.</h2>
              </div>
              <p>
                A strong positive relationship exists between a book's rating and its total 
                number of votes (Pearson r ≈ 0.709), indicating popular books consistently maintain 
                higher average ratings.
              </p>
            </div>
            <div className="chartbox">
              <BarChart items={charts.bookRatingCorr || []} />
            </div>

            <div className="sectionhead" style={{ marginTop: 70 }}>
              <div>
                <div className="eyebrow">Statistical insight</div>
                <h2>Significance vs. effect size.</h2>
              </div>
              <p>
                With a sample size of 52,466, minor correlations (such as r ≈ 0.026) produce 
                statistically significant p-values despite having minimal practical predictive power.
              </p>
            </div>
            <div className="panel light">
              <h3>r ≈ 0.709 vs. r ≈ 0.026</h3>
              <p>
                Demonstrates the critical statistical distinction between p-value significance 
                driven by large N and actual practical effect size in portfolio-level data analysis.
              </p>
            </div>
          </section>
        )}

        {/* DATMIN 2 */}
        {slug === "datmin-2" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Regression & Classification · TP2</div>
                <h2>Online News Popularity.</h2>
              </div>
              <p>
                A comprehensive pipeline analyzing ~29,643 articles across 50 variables. 
                The project explored several regression and classification approaches for predicting 
                online-news popularity while emphasizing proper metric selection.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Dataset Pipeline</div>
                <h3>29,643 articles × 50 variables</h3>
                <p>
                  Performed complete EDA, missing-value and duplicate checks, zero-content 
                  detection, correlation analysis, outlier handling, feature engineering, 
                  and scaling with PowerTransformer.
                </p>
              </div>

              <div className="panel light">
                <div className="eyebrow">EDA Anomaly Detection</div>
                <div
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: 48,
                    letterSpacing: "-0.04em",
                    margin: "8px 0",
                  }}
                >
                  862
                </div>
                <p>
                  Articles identified with zero content tokens. These required dedicated isolation 
                  since content-derived features become meaningless without text tokens.
                </p>
              </div>
            </div>

            <div className="sectionhead" style={{ marginTop: 70 }}>
              <div>
                <div className="eyebrow">Model Evaluation</div>
                <h2>Algorithms & Metric Considerations.</h2>
              </div>
              <p>
                Evaluated Logistic Regression, Random Forest, AdaBoost, Linear Regression, 
                and Gradient Boosting using K-fold validation, ROC/AUC, and T-tests.
              </p>
            </div>

            <div className="notice">
              <strong>Technical Evaluation Caveat:</strong> The experiments highlighted the critical 
              importance of selecting evaluation metrics appropriate to the prediction task. 
              The notebook explored both classification and regression paradigms, demonstrating 
              that non-standard accuracy formulations in regression models serve as methodological 
              experiments rather than standardized performance metrics.
            </div>
          </section>
        )}

        {/* TK9 */}
        {slug === "tk9" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">Visualization & Analytics · TK9</div>
                <h2>Traffic Accident Analysis.</h2>
              </div>
              <p>
                An investigation of Puerto Rico traffic accidents from 2017 to 2020 examining 
                timing, alcohol involvement, road types, urban vs. rural locations, pedestrian 
                accidents, and fatality predictors.
              </p>
            </div>

            <div className="split">
              <div className="panel light">
                <div className="eyebrow">Strongest Feature Relationship</div>
                <div
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: 44,
                    letterSpacing: "-0.04em",
                    margin: "8px 0",
                  }}
                >
                  r ≈ 0.982
                </div>
                <p>
                  Extremely high Pearson correlation observed between <strong>PEDS</strong> and <strong>PERNOTMVIT</strong>. 
                  While variables move closely together in this dataset, this reflects strong structural 
                  co-occurrence rather than direct linear causation.
                </p>
              </div>

              <div className="panel">
                <div className="eyebrow">Model Diagnostics</div>
                <h3>Predictive Baseline Reality</h3>
                <p>
                  Predictive models yielded weak explanatory power (Random Forest R² ≈ -0.0208, 
                  Linear Regression MSE ≈ 0.0377, R² ≈ 0).
                </p>
                <div style={{ marginTop: 12, fontSize: 13, color: "#aaa" }}>
                  A low MSE alone does not imply predictive utility; an R² near zero shows the model 
                  explains no variance beyond a baseline mean estimate.
                </div>
              </div>
            </div>

            <div className="notice" style={{ marginTop: 30 }}>
              This project demonstrates rigorous model evaluation principles by prioritizing transparent 
              R² diagnostic reporting over selectively highlighting favorable metrics.
            </div>
          </section>
        )}

        {/* NLP TI1 */}
        {slug === "nlp-ti1" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">NLP TI1</div>
                <h2>BPE vs. WordPiece Subword Tokenization</h2>
              </div>
              <p>
                Comparing Byte-Pair Encoding (BPE) and WordPiece subword tokenization across vocabulary sizes of 
                500, 1,000, 5,000, and 10,000 tokens on Indonesian text corpora.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Algorithm Mechanism</div>
                <h3>Merge Criteria</h3>
                <p>
                  <strong>BPE</strong> merges subword units based directly on adjacent symbol pair frequency. 
                  <br /><br />
                  <strong>WordPiece</strong> selects merges that maximize the likelihood of the language model corpus.
                </p>
              </div>

              <div className="panel light">
                <div className="eyebrow">Morphological Impact</div>
                <h3>Indonesian Affixes</h3>
                <p>
                  Larger vocabularies preserve full words, while smaller vocabularies heavily segment affixes such as 
                  <em>ber-</em>, <em>me-</em>, <em>-kan</em>, and <em>-nya</em>.
                </p>
              </div>
            </div>

            <div className="notice" style={{ marginTop: 30 }}>
              <strong>Key Conclusion:</strong> Increasing vocabulary size allows tokenizers to represent common words 
              with fewer splits, but a larger vocabulary is not inherently superior. Accuracy evaluates how closely the 
              generated token sequence aligns with the gold-standard sequence at size 10,000.
            </div>
          </section>
        )}

        {/* NLP TI2 */}
        {slug === "nlp-ti2" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">NLP TI2</div>
                <h2>N-gram Language Modeling & Perplexity</h2>
              </div>
              <p>
                Preprocessing, Aksara tokenization, unigram/bigram modeling, OOV standard handling, 
                Laplace add-one smoothing, and perplexity evaluation for Indonesian text generation.
              </p>
            </div>

            <div className="split">
              <div className="panel light">
                <div className="eyebrow">Mathematical Formulation</div>
                <h3>Laplace Add-One Smoothing</h3>
                <div style={{ margin: "16px 0", fontSize: 16 }}>
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {"$$P(w_i|w_{i-1}) = \\frac{C(w_{i-1},w_i)+1}{C(w_{i-1})+V}$$"}
                  </ReactMarkdown>
                </div>
                <p style={{ fontSize: 13, color: "#aaa" }}>
                  Prevents unseen bigrams from zeroing out complete sequence probabilities.
                </p>
              </div>

              <div className="panel">
                <div className="eyebrow">Out-of-Vocabulary & Metrics</div>
                <h3>OOV Handling & Perplexity</h3>
                <p>
                  Unseen words are mapped to <code>&lt;UNK&gt;</code> during preprocessing. 
                  Perplexity measures sequence predictability: lower perplexity indicates higher model confidence.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TI3 */}
        {slug === "assignment3" && (
          <section className="section">
            <div className="sectionhead">
              <div>
                <div className="eyebrow">NLP TI3</div>
                <h2>Spelling Correction Algorithms & Structures</h2>
              </div>
              <p>
                Benchmarking Levenshtein vs. Damerau-Levenshtein edit distance paired with Trie vs. 
                Dictionary search structures across Candidate Accuracy, Best Match Accuracy, and Runtime.
              </p>
            </div>

            <div className="split">
              <div className="panel">
                <div className="eyebrow">Edit Distance Algorithms</div>
                <h3>Levenshtein vs. Damerau-Levenshtein</h3>
                <p>
                  Levenshtein supports insertion, deletion, and substitution. 
                  Damerau-Levenshtein adds adjacent character transposition, capturing real-world typing errors 
                  such as <em>"teh"</em> → <em>"the"</em> in a single operation.
                </p>
              </div>

              <div className="panel light">
                <div className="eyebrow">Data Structure Comparison</div>
                <h3>Trie vs. Dictionary</h3>
                <p>
                  Tries arrange tokens by shared prefixes, enabling early branch pruning during candidate generation. 
                  Hash-based Dictionaries offer O(1) exact lookups but lack structural prefix traversal.
                </p>
              </div>
            </div>

            <div className="notice" style={{ marginTop: 30 }}>
              <strong>Accuracy Metrics:</strong> <em>Candidate Accuracy</em> verifies if the target word exists within 
              the generated candidate list, while <em>Best Match Accuracy</em> measures whether it is ranked first.
            </div>
          </section>
        )}

        {/* RESEARCH PAPER */}
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