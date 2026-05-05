import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import { CartSummary } from "../components/CartSummary";
import { CatalogSection } from "../components/CatalogSection";
import { FeaturedCatalogSection } from "../components/FeaturedCatalogSection";
import { FloatingActions } from "../components/FloatingActions";
import { HeroSection } from "../components/HeroSection";
import { HomeHeader } from "../components/HomeHeader";
import { featuredProducts, products, type Product } from "../data/products";
import { sendWhatsAppMessage } from "../services/whatsapp";
import { getCartItemsCount, getCartTotal, type CartItem } from "../utils/cart";
import { formatCurrency } from "../utils/currency";

const HomePage: NextPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = getCartTotal(cart);
  const formattedTotal = formatCurrency(total);
  const cartCount = getCartItemsCount(cart);

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.product.id === product.id);

      if (!existingItem) {
        return [...currentCart, { product, quantity: 1 }];
      }

      return currentCart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  };

  const incrementCartItem = (productId: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementCartItem = (productId: string) => {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        if (item.quantity === 1) {
          return [];
        }

        return { ...item, quantity: item.quantity - 1 };
      }),
    );
  };

  const removeCartItem = (productId: string) => {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    sendWhatsAppMessage(cart, total);
  };

  return (
    <>
      <Head>
        <title>PibesDeBarrio</title>
        <meta
          name="description"
          content="Streetwear de barrio con compra directa por WhatsApp, formularios para sumarte al programa y experiencia mobile-first."
        />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700;800;900&family=Montserrat:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="page-shell">
        <div className="relative isolate">
          <div className="hero-background" />
          <HomeHeader cartCount={cartCount} />
          <HeroSection />
          <FeaturedCatalogSection products={featuredProducts} onAddToCart={addToCart} />
          <CartSummary
            cart={cart}
            formattedTotal={formattedTotal}
            onCheckout={handleCheckout}
            onIncrement={incrementCartItem}
            onDecrement={decrementCartItem}
            onRemove={removeCartItem}
          />
          <FloatingActions />
          <CatalogSection products={products} onAddToCart={addToCart} />
        </div>
      </main>
    </>
  );
};

export default HomePage;