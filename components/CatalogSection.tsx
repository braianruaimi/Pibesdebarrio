import type { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

type CatalogSectionProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const CatalogSection = ({ products, onAddToCart }: CatalogSectionProps) => {
  return (
    <section id="productos" className="page-container pb-20">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="section-stack">
          <p className="section-label tracking-[0.35em]">La merch del barrio</p>
          <h2 className="section-title">La merch del barrio</h2>
        </div>
        <p className="section-copy max-w-xl">
          Sumate a la movida y llevate algo que represente la esencia de los pibes. No es solo merch, es identidad.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </section>
  );
};