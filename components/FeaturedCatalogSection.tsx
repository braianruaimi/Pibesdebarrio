import type { Product } from "../data/products";
import { ProductCard } from "./ProductCard";

type FeaturedCatalogSectionProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const FeaturedCatalogSection = ({ products, onAddToCart }: FeaturedCatalogSectionProps) => {
  return (
    <section id="catalogo-limitado" className="page-container pb-16 sm:pb-20">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="section-stack">
          <p className="section-label tracking-[0.35em]">Ediciones limitadas</p>
          <h2 className="section-title">Catalogo</h2>
        </div>
        <p className="section-copy max-w-xl">
          Una seleccion rapida de productos para entrar directo al drop, con la misma dinamica de compra del catalogo principal.
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