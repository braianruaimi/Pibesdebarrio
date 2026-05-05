(function () {
  if (window.__pdbProductFallbackInit) {
    return;
  }

  window.__pdbProductFallbackInit = true;

  var moneyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
  var originalOpen = window.open ? window.open.bind(window) : null;
  var lastWindowOpenAt = 0;
  var cartItems = [];
  var cartExpanded = true;

  if (originalOpen) {
    window.open = function () {
      lastWindowOpenAt = Date.now();
      return originalOpen.apply(window, arguments);
    };
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function parsePrice(value) {
    var digits = String(value || "").match(/\d+/g);
    return digits ? Number(digits.join("")) : 0;
  }

  function getProductFromArticle(article) {
    if (!article) {
      return null;
    }

    if (article.__pdbProductData) {
      return article.__pdbProductData;
    }

    var title = article.querySelector("h3");
    var price = article.querySelector("p.text-2xl, .text-2xl");

    if (!title || !price) {
      return null;
    }

    var product = {
      id: slugify(title.textContent),
      name: title.textContent.trim(),
      price: parsePrice(price.textContent),
    };

    article.__pdbProductData = product;
    return product;
  }

  function getItemCount() {
    return cartItems.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
  }

  function getTotal() {
    return cartItems.reduce(function (total, item) {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  function openWhatsApp(url) {
    if (originalOpen) {
      originalOpen(url, "_blank");
      lastWindowOpenAt = Date.now();
      return;
    }

    window.location.href = url;
  }

  function buildProductMessage(product) {
    return [
      "Hola, quiero comprar este producto de PibesDeBarrio:",
      product.name + " - " + moneyFormatter.format(product.price),
    ].join("\n");
  }

  function buildCartMessage() {
    return [
      "Hola, quiero finalizar mi compra en PibesDeBarrio.",
      "",
      "Productos:",
      cartItems.map(function (item, index) {
        return (
          index + 1 + ". " + item.product.name + " x" + item.quantity + " - " + moneyFormatter.format(item.product.price * item.quantity)
        );
      }).join("\n"),
      "",
      "Total: " + moneyFormatter.format(getTotal()),
    ].join("\n");
  }

  function removeFallbackCart() {
    var existing = document.querySelector("[data-pdb-cart]");
    if (existing) {
      existing.remove();
    }
  }

  function renderFallbackCart() {
    removeFallbackCart();

    if (!cartItems.length) {
      return;
    }

    var shell = document.createElement("aside");
    shell.setAttribute("data-pdb-cart", "1");
    shell.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:9998;width:min(92vw,360px);font-family:Inter,system-ui,sans-serif";

    var itemCount = getItemCount();
    var total = moneyFormatter.format(getTotal());

    shell.innerHTML =
      '<button type="button" data-pdb-cart-toggle="1" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:#0b0b0b;color:#fff;padding:16px 18px;box-shadow:0 20px 40px rgba(0,0,0,.35);cursor:pointer">' +
      '<div style="text-align:left"><p style="margin:0;font-size:11px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:#ffd700">TU PEDIDO</p><p style="margin:6px 0 0;font-size:18px;font-weight:900">' + itemCount + ' item' + (itemCount === 1 ? '' : 's') + ' · ' + total + '</p></div>' +
      '<span style="min-width:42px;text-align:center;border-radius:999px;background:rgba(255,255,255,.08);padding:8px 10px;font-weight:900">' + (cartExpanded ? '-' : itemCount) + '</span>' +
      '</button>';

    if (cartExpanded) {
      var panel = document.createElement("div");
      panel.id = "pdb-fallback-cart-panel";
      panel.style.cssText = "margin-top:12px;border:1px solid rgba(255,255,255,.12);border-radius:24px;background:#0b0b0b;color:#fff;padding:18px;box-shadow:0 20px 40px rgba(0,0,0,.35)";
      panel.innerHTML =
        '<p style="margin:0;font-size:11px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:#ffd700">TOTAL A PAGAR</p>' +
        '<p style="margin:8px 0 0;font-size:28px;font-weight:900">' + total + '</p>' +
        '<div data-pdb-cart-items style="margin-top:14px;display:grid;gap:12px"></div>' +
        '<button type="button" data-pdb-cart-checkout="1" style="margin-top:16px;width:100%;border:none;border-radius:18px;background:#ffd700;color:#000;padding:16px 18px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;cursor:pointer">Confirmar pedido por WhatsApp</button>';

      var itemsHost = panel.querySelector("[data-pdb-cart-items]");
      cartItems.forEach(function (item) {
        var row = document.createElement("div");
        row.style.cssText = "border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.04);padding:12px";
        row.innerHTML =
          '<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">' +
          '<div><p style="margin:0;font-size:16px;font-weight:900">' + item.product.name + '</p><p style="margin:8px 0 0;font-size:13px;color:#ff8b84">' + moneyFormatter.format(item.product.price * item.quantity) + '</p></div>' +
          '<button type="button" data-pdb-cart-remove="' + item.product.id + '" style="height:32px;width:32px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;font-weight:900;cursor:pointer">×</button>' +
          '</div>' +
          '<div style="margin-top:12px;display:flex;align-items:center;gap:8px">' +
          '<button type="button" data-pdb-cart-minus="' + item.product.id + '" style="height:32px;width:32px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;font-weight:900;cursor:pointer">-</button>' +
          '<span style="min-width:28px;text-align:center;font-weight:900">' + item.quantity + '</span>' +
          '<button type="button" data-pdb-cart-plus="' + item.product.id + '" style="height:32px;width:32px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#fff;font-weight:900;cursor:pointer">+</button>' +
          '</div>';
        itemsHost.appendChild(row);
      });

      shell.appendChild(panel);
    }

    document.body.appendChild(shell);
  }

  function addToFallbackCart(product) {
    var existing = cartItems.find(function (item) {
      return item.product.id === product.id;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ product: product, quantity: 1 });
    }

    cartExpanded = true;
    renderFallbackCart();
  }

  function updateQuantity(productId, delta) {
    cartItems = cartItems
      .map(function (item) {
        if (item.product.id !== productId) {
          return item;
        }

        return {
          product: item.product,
          quantity: item.quantity + delta,
        };
      })
      .filter(function (item) {
        return item.quantity > 0;
      });

    renderFallbackCart();
  }

  function removeItem(productId) {
    cartItems = cartItems.filter(function (item) {
      return item.product.id !== productId;
    });

    renderFallbackCart();
  }

  function afterReactChance(callback) {
    requestAnimationFrame(function () {
      requestAnimationFrame(callback);
    });
  }

  function maybeHandleProductWhatsApp(button) {
    var article = button.closest("article");
    var product = getProductFromArticle(article);

    if (!product) {
      return;
    }

    var before = lastWindowOpenAt;
    afterReactChance(function () {
      if (lastWindowOpenAt !== before) {
        return;
      }

      openWhatsApp("https://wa.me/2215047962?text=" + encodeURIComponent(buildProductMessage(product)));
    });
  }

  function maybeHandleAddToCart(button) {
    var article = button.closest("article");
    var product = getProductFromArticle(article);

    if (!product) {
      return;
    }

    afterReactChance(function () {
      if (document.querySelector(".floating-cart-shell")) {
        return;
      }

      addToFallbackCart(product);
    });
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target.closest("button");
      if (!target) {
        return;
      }

      if (target.closest("[data-pdb-cart]")) {
        if (target.hasAttribute("data-pdb-cart-toggle")) {
          cartExpanded = !cartExpanded;
          renderFallbackCart();
          return;
        }

        if (target.hasAttribute("data-pdb-cart-checkout")) {
          openWhatsApp("https://wa.me/2215047962?text=" + encodeURIComponent(buildCartMessage()));
          return;
        }

        if (target.hasAttribute("data-pdb-cart-plus")) {
          updateQuantity(target.getAttribute("data-pdb-cart-plus"), 1);
          return;
        }

        if (target.hasAttribute("data-pdb-cart-minus")) {
          updateQuantity(target.getAttribute("data-pdb-cart-minus"), -1);
          return;
        }

        if (target.hasAttribute("data-pdb-cart-remove")) {
          removeItem(target.getAttribute("data-pdb-cart-remove"));
        }

        return;
      }

      if (!target.closest("article")) {
        return;
      }

      var label = (target.textContent || "").trim();

      if (label === "Comprar por WhatsApp") {
        maybeHandleProductWhatsApp(target);
      }

      if (label === "LO QUIERO TENER") {
        maybeHandleAddToCart(target);
      }
    },
    true,
  );
})();
