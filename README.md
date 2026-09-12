# AI & Data Science 2021 — Interactive Archive

A polished Next.js archive built around the actual contents of `aldariaski/aidatascience2021`.

## Included

- Homepage / course timeline
- 4 lab pages
- 2 assignment pages
- Interactive CSV browser for every CSV in the repository
- Searchable CSV tables and original-file downloads
- Data visualizations generated from the repository datasets
- Selected executed notebook results
- Decision Tree / Random Forest comparison
- K-means and Agglomerative scatter visualizations
- PCA result summary
- Responsive editorial-style UI

## Run locally

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy

This is a normal Next.js app and can be deployed to Vercel, Netlify, or another Node-compatible host.

## Source

Original coursework repository:

https://github.com/aldariaski/aidatascience2021

## Notes

The site deliberately preserves a distinction found in the original Assignment 2 notebook: the written answer proposes 11 clusters for Soal 2, while the executed K-means cell uses `n_clusters=10` and reports a silhouette coefficient of about `0.692915`.

The CSV files included in `public/data` are copies of the uploaded repository data.
