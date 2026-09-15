import fs from "fs";
import path from "path";
import Link from "next/link";
import JupyterViewer from "../../components/JupyterViewer";
import 'react-ipynb-renderer/dist/styles/monokai.css';

export default async function NotebookPage({
  searchParams,
}: {
  searchParams: Promise<{ file?: string }>;
}) {
  const p = await searchParams;
  const file = p.file || "assignment-1.ipynb";
  const name = file.split("/").pop()?.replace(".ipynb", "") || "Notebook";

  let notebookData = null;
  try {
    const filePath = path.join(process.cwd(), "public/data", file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    notebookData = JSON.parse(fileContent);
  } catch (err) {
    notebookData = null;
  }

  return (
    <>
      <header className="container nav">
        <Link href="/" className="brand">
          AI<span>/</span>DS <small>2021</small>
        </Link>
        <Link href="/" className="back">
          ← Back to archive
        </Link>
      </header>

      <main className="container">
        <section className="detailhero">
          <div className="eyebrow">Notebook room · IPYNB</div>
          <h1>{name}</h1>
          <p className="prose">
            The executed Jupyter Notebook is rendered directly in the browser. 
            Explore markdown cells, source code, and executed outputs.
          </p>
        </section>

        {notebookData ? (
          <div className="ipynb-wrapper">
            <JupyterViewer notebookData={notebookData} />
          </div>
        ) : (
          <div className="notice">
            Unable to load notebook file at <code>public/data/{file}</code>.
          </div>
        )}
      </main>
    </>
  );
}
