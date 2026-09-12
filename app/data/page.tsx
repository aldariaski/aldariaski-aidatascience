import Link from "next/link";
import CsvViewer from "../../components/CsvViewer";

export default async function DataPage({
  searchParams,
}: {
  searchParams: Promise<{ file?: string }>;
}) {
  const p = await searchParams;
  const file =
    p.file ||
    "lab1-introtodatasciencetools/MELBOURNE_HOUSE_PRICES_LITE.csv";
  const name = file.split("/").pop()?.replace(".csv", "") || "Dataset";

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
          <div className="eyebrow">Data room · CSV</div>
          <h1>{name}</h1>
          <p className="prose">
            The original CSV is rendered directly in the browser. Search the
            first 100 matching rows or download the untouched file.
          </p>
        </section>

        <CsvViewer file={file} />
      </main>
    </>
  );
}
