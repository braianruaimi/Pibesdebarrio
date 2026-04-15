import { ProductCard } from "./ProductCard";
import type { Product } from "../data/products";

type CatalogSectionProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export const CatalogSection = ({
  products,
  onAddToCart,
}: CatalogSectionProps) => {
  return (
    <section id="productos" className="page-container pb-20">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="section-stack">
          <p className="section-label tracking-[0.35em]">Catalogo editable</p>
          <h2 className="section-title">Productos destacados</h2>
        </div>
        <p className="section-copy max-w-xl">
          Agregá o editá productos desde data/products.ts y mantené la compra directa por WhatsApp, sin registro ni pasos extra.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </section>
  );
};
