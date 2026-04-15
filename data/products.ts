export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "buzo" | "remera" | "vaso" | "accesorio";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Buzo PibesDeBarrio Oversize",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80",
    category: "buzo",
  },
  {
    id: "2",
    name: 'Remera Estampada "Sin Filtro"',
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    category: "remera",
  },
  {
    id: "3",
    name: "Vaso Termico Edicion Limitada",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=1200&q=80",
    category: "vaso",
  },
  {
    id: "4",
    name: "Gorra PDB Street",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80",
    category: "accesorio",
  },
];

export const featuredProductIds: Product["id"][] = ["4", "1", "3"];

export const featuredProducts: Product[] = featuredProductIds
  .map((productId) => products.find((product) => product.id === productId))
  .filter((product): product is Product => Boolean(product));
