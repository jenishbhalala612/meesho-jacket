import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShowHeader from "./components/ShowHeader";
import Loading from "./components/Loading";
import UPIPayment from "./components/UPIPayment";
import BottomNav from "./components/BottomNav";

function App() {
  const location = useLocation();

  const HomePage = lazy(() => import("./components/HomePage"));
  const Productpage = lazy(() => import("./components/Productpage"));
  const CategoryPage = lazy(() => import("./components/CategoryPage"));
  const AddAddresspage = lazy(() => import("./components/AddAddresspage"));
  const CheckOutpage = lazy(() => import("./components/CheckOutpage"));
  const PaymentPage = lazy(() => import("./components/PaymentPage"));
  const Cartpage = lazy(() => import("./components/Cartpage"));
  const OrderThankYou = lazy(() => import("./components/OrderThankYou"));

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================
     LOAD PRODUCTS (JACKETS)
  ========================================= */

  const normalizeImagePath = (src) => {
    if (!src) return "";
    return String(src)
      .replace(/^\/assets\/jacket\//, "/jacket/")
      .replace(/^assets\/jacket\//, "/jacket/")
      .replace(/^jacket\//, "/jacket/");
  };

  const transformProduct = (d) => {
    // Normalise images list
    const rawImages = Array.isArray(d.images) && d.images.length > 0
      ? d.images
      : (Array.isArray(d.image) ? d.image : (d.image ? [d.image] : []));
    let normalizedImages = rawImages.map(normalizeImagePath).filter(Boolean);
    if (normalizedImages.length === 0 && d.image) {
      normalizedImages = [normalizeImagePath(d.image)];
    }

    // Sizes
    const sizes = Array.isArray(d.sizes) && d.sizes.length > 0
      ? d.sizes.map((s) => (typeof s === "string" ? s : s.label || s.size))
      : (Array.isArray(d.size) && d.size.length > 0 ? d.size : ["S", "M", "L", "XL", "XXL"]);

    // Price & Cancelprice
    const price = String(d.price ?? "");
    const cancelprice = String(d.mrp || d.cancelprice || Math.round(Number(d.price || 0) * 1.4));

    // Description fallback
    const highlightsHtml = d.highlights
      ? Object.entries(d.highlights)
          .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
          .join("")
      : "";
    const detailsHtml = d.additionalDetails
      ? Object.entries(d.additionalDetails)
          .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
          .join("")
      : "";
    const desc = d.desc || `
      <p><strong>Product:</strong> ${d.title}</p>
      ${highlightsHtml}
      <br/>
      ${detailsHtml}
      <br/>
      <p><strong>Return Policy:</strong> ${d.returnPolicy || "7-day Returns"}</p>
      <p><strong>Delivery:</strong> Free Delivery & Cash on Delivery Available</p>
    `.trim();

    // Similar products images
    const similarProducts = (d.similarProducts || []).map((sp) => ({
      ...sp,
      image: normalizeImagePath(sp.image),
    }));

    // Reviews images
    const reviews = (d.reviews || []).map((r) => ({
      ...r,
      images: (r.images || []).map(normalizeImagePath),
    }));

    return {
      ...d,
      id: String(d.id),
      image: normalizedImages,
      images: normalizedImages,
      price: price,
      cancelprice: cancelprice,
      mrp: Number(d.mrp || cancelprice || 0),
      size: sizes,
      sizes: d.sizes || sizes.map((s) => ({ label: s, inStock: true })),
      rate: String(d.rating || d.rate || (Math.random() * 1.5 + 3.5).toFixed(1)),
      ratenum: d.ratingCount || d.ratenum || Math.floor(Math.random() * 99901 + 100),
      reviewCount: d.reviewCount || (d.reviews ? d.reviews.length : 1681),
      desc: desc,
      category: d.category || "jackets",
      similarProducts: similarProducts,
      reviews: reviews,
    };
  };

  useEffect(() => {
    fetch("/jacket-products.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load jacket-products.json");
        return r.json();
      })
      .then((productdata) => {
        setData(productdata.map(transformProduct));
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error loading jacket products:", e);
        fetch("/products.json")
          .then((r) => r.json())
          .then((productdata) => {
            setData(productdata.map(transformProduct));
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      });
  }, []);

  /* =========================================
     DISABLE RIGHT CLICK / DEV SHORTCUTS
  ========================================= */

  useEffect(() => {
    const h = (e) => {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
      }
    };

    const c = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", h);
    document.addEventListener("contextmenu", c);

    return () => {
      document.removeEventListener("keydown", h);
      document.removeEventListener("contextmenu", c);
    };
  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* =========================================
          ROUTES
      ========================================= */}

      <Routes>
        {/* =========================================
            HEADER ROUTES
        ========================================= */}

        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <ShowHeader />
            </Suspense>
          }
        >
          {/* HOME */}

          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <HomePage data={data} />
              </Suspense>
            }
          />

          {/* CATEGORY */}

          <Route
            path="category/:category"
            element={
              <Suspense fallback={<Loading />}>
                <CategoryPage data={data} />
              </Suspense>
            }
          />

          {/* PRODUCT */}

          <Route
            path="productdetails/:id/:name"
            element={
              <Suspense fallback={<Loading />}>
                <Productpage data={data} />
              </Suspense>
            }
          />

          {/* ADDRESS */}

          <Route
            path="addaddress"
            element={
              <Suspense fallback={<Loading />}>
                <AddAddresspage />
              </Suspense>
            }
          />
        </Route>

        {/* =========================================
            CART
        ========================================= */}

        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cartpage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            CHECKOUT
        ========================================= */}

        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckOutpage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            PAYMENT
        ========================================= */}

        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading />}>
              <PaymentPage data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            UPI
        ========================================= */}

        <Route
          path="/upi"
          element={
            <Suspense fallback={<Loading />}>
              <UPIPayment data={data} />
            </Suspense>
          }
        />

        {/* =========================================
            THANK YOU
        ========================================= */}

        <Route
          path="/thank-you"
          element={
            <Suspense fallback={<Loading />}>
              <OrderThankYou />
            </Suspense>
          }
        />
      </Routes>

      {/* =========================================
          BOTTOM NAV - ONLY HOME PAGE
      ========================================= */}

      {location.pathname === "/" && <BottomNav />}

      {/* =========================================
          TOAST
      ========================================= */}

      <ToastContainer
        className={
          location.pathname === "/"
            ? "!bottom-[80px]"
            : "!bottom-[20px]"
        }
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;