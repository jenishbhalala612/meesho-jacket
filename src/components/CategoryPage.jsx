import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import thustedimg from "../images/thrustedimg2.png";

const CATEGORY_CONFIG = {
  "women-ethnic": {
    name: "Women Ethnic",
    saleText: "ETHNIC SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/women-ethnic-1.webp",
      "/category-banners/women-ethnic-2.webp",
      "/category-banners/women-ethnic-3.webp",
    ],
  },
  "women-western": {
    name: "Women Western",
    saleText: "WESTERN WEAR SALE • UP TO 70% OFF",
    banners: [
      "https://i.ytimg.com/vi/hdQRWbXPvvQ/maxresdefault.jpg",
      "https://mulmul.com/cdn/shop/files/4_58f7751c-8e4a-4cab-b9a9-011625389c3f.jpg?v=1746424016&width=1880",
    ],
  },
  men: {
    name: "Men",
    saleText: "MEN'S FASHION SALE • UP TO 70% OFF",
    banners: [
      "https://vitalclothing.in/cdn/shop/files/WhatsApp_Image_2026-02-19_at_10.03.45_AM.jpg?v=1771475718&width=1366",
      "https://www.reprise.co.in/cdn/shop/files/ChatGPT_Image_Jun_10_2026_08_10_37_PM.png?v=1781102454",
      "https://uspoloassn.in/cdn/shop/files/DESKTOP_BANNER__1.2.png?v=1782720519&width=1500",
      "https://bepositiveclothing.in/cdn/shop/files/37_1.png?v=1782302087&width=1200",
    ],
  },
  kids: {
    name: "Kids",
    saleText: "KIDS FASHION SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/kids-1.webp",
      "/category-banners/kids-2.webp",
      "/category-banners/kids-3.webp",
    ],
  },
  "home-kitchen": {
    name: "Home & Kitchen",
    saleText: "HOME & KITCHEN SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/home-kitchen-1.webp",
      "/category-banners/home-kitchen-2.webp",
      "/category-banners/home-kitchen-3.webp",
    ],
  },
  "beauty-health": {
    name: "Beauty & Health",
    saleText: "BEAUTY SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/beauty-1.webp",
      "/category-banners/beauty-2.webp",
      "/category-banners/beauty-3.webp",
    ],
  },
  "jewellery-accessories": {
    name: "Jewellery & Accessories",
    saleText: "JEWELLERY SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/jewellery-1.webp",
      "/category-banners/jewellery-2.webp",
      "/category-banners/jewellery-3.webp",
    ],
  },
  "bags-footwear": {
    name: "Bags & Footwear",
    saleText: "BAGS & FOOTWEAR • UP TO 70% OFF",
    banners: [
      "/category-banners/bags-1.webp",
      "/category-banners/bags-2.webp",
      "/category-banners/bags-3.webp",
    ],
  },
  electronics: {
    name: "Electronics",
    saleText: "ELECTRONICS SALE • UP TO 70% OFF",
    banners: [
      "/category-banners/electronics-1.webp",
      "/category-banners/electronics-2.webp",
      "/category-banners/electronics-3.webp",
    ],
  },
  jackets: {
    name: "Jackets & Outerwear",
    saleText: "WINTER WEAR SALE • UP TO 70% OFF",
    banners: [
      "/jacket/image_408x612_42.jpeg",
      "/jacket/image_459x612_16.png",
      "/jacket/image_612x612_25.jpeg",
    ],
  },
};

const normalizeCategory = (value) =>
  String(value || "").trim().toLowerCase().replace(/\s+/g, "-");

function CategoryPage({ data = [] }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60 * 60 + 37 * 60 + 58);
  const [activeBanner, setActiveBanner] = useState(0);

  const normalizedRouteCategory = normalizeCategory(category);
  const config = CATEGORY_CONFIG[normalizedRouteCategory] || {
    name: normalizedRouteCategory ? normalizedRouteCategory.replace(/-/g, " ").toUpperCase() : "Jackets",
    saleText: "SEASON SALE • BEST PRICES",
    banners: [],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveBanner(0);
  }, [normalizedRouteCategory]);

  useEffect(() => {
    setTimeLeft(60 * 60 + 37 * 60 + 58);
    const timer = setInterval(() => {
      setTimeLeft((previous) =>
        previous <= 1 ? 60 * 60 + 37 * 60 + 58 : previous - 1
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [normalizedRouteCategory]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const filteredProducts = data.filter((product) => {
    const cat = normalizeCategory(product?.category);
    const subCat = normalizeCategory(product?.subCategory);
    const gender = normalizeCategory(product?.gender);
    const aud = normalizeCategory(product?.audience);

    if (normalizedRouteCategory === "jackets" || normalizedRouteCategory === "jacket" || normalizedRouteCategory === "all") {
      return true;
    }
    if (normalizedRouteCategory === "men") {
      return gender === "men" || aud === "men" || cat === "men";
    }
    if (normalizedRouteCategory === "kids") {
      return gender === "kids" || aud === "kids" || cat === "kids";
    }
    if (normalizedRouteCategory === "women" || normalizedRouteCategory === "women-western" || normalizedRouteCategory === "women-ethnic") {
      return gender === "women" || aud === "women" || cat === "women";
    }
    return (
      cat === normalizedRouteCategory ||
      subCat === normalizedRouteCategory ||
      gender === normalizedRouteCategory ||
      aud === normalizedRouteCategory
    );
  });

  const openProduct = (product) => {
    navigate(
      `/productdetails/${product?.id}/${encodeURIComponent(
        product?.title || "product"
      )}`
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <style>{`
        @keyframes categoryMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes hotSellPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.08); opacity: .82; }
        }
        .category-hot-sell {
          animation: hotSellPulse 1.4s ease-in-out infinite;
        }
        .category-sale-marquee {
          width: 100%;
          overflow: hidden;
          background: #9f2089;
          color: #fff;
          white-space: nowrap;
        }
        .category-sale-track {
          display: flex;
          width: max-content;
          animation: categoryMarquee 18s linear infinite;
          will-change: transform;
        }
        .category-sale-copy {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .category-sale-copy span {
          display: inline-block;
          padding: 9px 18px;
          font-size: 14px;
          line-height: 20px;
          font-weight: 800;
        }
        .category-sale-copy b {
          font-size: 7px;
        }
        @media (max-width: 640px) {
          .category-sale-track { animation-duration: 12s; }
          .category-sale-copy span {
            padding: 8px 14px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1280px] bg-white">
        <div className="category-sale-marquee">
          <div className="category-sale-track">
            {[0, 1].map((copy) => (
              <div className="category-sale-copy" key={copy} aria-hidden={copy === 1}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <React.Fragment key={`${copy}-${item}`}>
                    <span>{config.saleText}</span>
                    <b>●</b>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {config.banners.length > 0 && (
          <section className="relative w-full overflow-hidden bg-[#f7f1e8]">
            <Swiper
              key={normalizedRouteCategory}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={0}
              speed={650}
              loop={config.banners.length > 1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => setActiveBanner(swiper.realIndex)}
            >
              {config.banners.map((banner, index) => (
                <SwiperSlide key={`${normalizedRouteCategory}-${index}`}>
                  <div className="relative min-h-[120px] w-full overflow-hidden bg-[#f5ead9] sm:min-h-[180px]">
                    <img
                      src={banner}
                      alt={`${config.name} banner ${index + 1}`}
                      className="block max-h-[420px] min-h-[120px] w-full object-cover object-center sm:min-h-[180px]"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {config.banners.length > 1 && (
              <div className="absolute bottom-[10px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[7px]">
                {config.banners.map((_, index) => (
                  <span
                    key={index}
                    className={`block h-[6px] rounded-full shadow-sm transition-all duration-300 ${
                      activeBanner === index
                        ? "w-[18px] bg-[#d0009b]"
                        : "w-[7px] bg-white/90"
                    }`}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        <section className="grid grid-cols-3 border-b border-gray-200 bg-[#fff8ee] px-1 py-[17px] md:px-8 md:py-[22px]">
          <Benefit icon="↩" line1="Easy returns" line2="& refunds" border />
          <Benefit icon="₹" line1="Cash on" line2="delivery" border />
          <Benefit icon="₹" line1="Lowest" line2="price" />
        </section>

        <section className="flex flex-wrap items-center justify-center gap-[7px] border-b border-gray-200 bg-white px-2 py-[17px]">
          <h2 className="text-[17px] font-bold text-[#5c6170] md:text-[22px]">
            {config.name} Daily Deals
          </h2>
          <span className="text-[20px]">⚡</span>
          <div className="rounded-md bg-[#fff0df] px-[8px] py-[4px] text-[11px] font-semibold text-[#ff6d3a] md:text-[13px]">
            ⏱ {hours}h : {minutes}m : {seconds}s
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white px-3 py-4 md:px-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] text-gray-400 md:text-[11px]">
                Home / {config.name}
              </p>
              <h1 className="mt-[2px] text-[18px] font-semibold text-[#353543] md:text-[22px]">
                {config.name}
              </h1>
            </div>
            <span className="text-[10px] text-gray-500 md:text-[12px]">
              {filteredProducts.length} Products
            </span>
          </div>
        </section>

        {filteredProducts.length === 0 ? (
          <section className="flex min-h-[350px] flex-col items-center justify-center px-4 text-center">
            <div className="text-[45px]">🛍️</div>
            <h2 className="mt-3 text-[19px] font-semibold text-[#353543]">
              No products found
            </h2>
            <p className="mt-1 text-[12px] text-gray-500">
              Products are not available in this category.
            </p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-5 rounded-md bg-[#9f2089] px-6 py-3 text-[13px] font-semibold text-white"
            >
              Continue Shopping
            </button>
          </section>
        ) : (
          <section className="grid grid-cols-2 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product, index) => {
              const image = Array.isArray(product?.image)
                ? product.image[0]
                : product?.image;

              const price = Number(
                String(product?.price ?? "0").replace(/[^\d.]/g, "")
              ) || 0;

              const cancelPrice = Number(
                String(product?.cancelprice ?? "0").replace(/[^\d.]/g, "")
              ) || 0;

              const discount =
                cancelPrice > price && cancelPrice > 0
                  ? Math.round(((cancelPrice - price) / cancelPrice) * 100)
                  : 0;

              return (
                <article
                  key={product?.id || index}
                  onClick={() => openProduct(product)}
                  className="group relative cursor-pointer border-b border-r border-gray-200 bg-white px-[8px] pb-[12px] pt-[16px] transition hover:z-10 hover:shadow-md md:px-[12px] md:pb-[14px] md:pt-[18px]"
                >
                  <div className="relative">
                    <span className="category-hot-sell absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-[5px] bg-[#a61b88] px-[10px] py-[4px] text-[10px] font-extrabold leading-none text-white shadow-[0_1px_5px_rgba(159,32,137,.45)] md:text-[11px]">
                      Hot Sell
                    </span>

                    <button
                      type="button"
                      aria-label="Wishlist"
                      onClick={(event) => event.stopPropagation()}
                      className="absolute right-0 top-0 z-20 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gray-100 bg-white text-[18px] text-gray-500 shadow-sm"
                    >
                      ♡
                    </button>

                    <div className="mt-[32px] flex aspect-square w-full items-center justify-center overflow-hidden bg-[#fafafa]">
                      {image ? (
                        <img
                          src={image}
                          alt={product?.title || "Product"}
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <span className="text-[11px] text-gray-400">No Image</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-[10px]">
                    <p className="truncate text-[11px] text-[#4f5365] md:text-[12px]">
                      {product?.title || "Product"}
                    </p>

                    <div className="mt-[6px] flex flex-wrap items-baseline gap-[5px]">
                      <span className="text-[17px] font-extrabold text-[#202124] md:text-[19px]">
                        ₹{product?.price || 0}
                      </span>

                      {cancelPrice > price && (
                        <span className="text-[9px] text-gray-400 line-through md:text-[10px]">
                          ₹{product?.cancelprice}
                        </span>
                      )}

                      {discount > 0 && (
                        <span className="text-[9px] font-semibold text-[#3d4352] md:text-[10px]">
                          {discount}% off
                        </span>
                      )}
                    </div>

                    <div className="mt-[9px] flex h-[29px] w-full items-center justify-center rounded-[5px] border border-[#ff5a52] bg-white text-[10px] font-semibold text-[#a61b88] md:text-[11px]">
                      <span className="mr-[6px] text-[11px] text-[#4b4b58]">●</span>
                      {hours}h : {minutes}m : {seconds}s
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openProduct(product);
                      }}
                      className="mt-[7px] flex h-[40px] w-full items-center justify-center gap-[7px] rounded-[3px] bg-[#a91b8f] text-[12px] font-extrabold text-white transition hover:bg-[#8f1679] md:text-[13px]"
                    >
                      <span className="text-[16px] leading-none"> <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384ZM11.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384Z"
                          fill="white"
                        />
                      </svg></span>
                      Buy Now
                    </button>

                    <div className="mt-[9px] flex min-w-0 items-center gap-[4px]">
                      <span className="inline-flex shrink-0 items-center rounded-full bg-[#038d63] px-[7px] py-[3px] text-[10px] font-bold text-white md:text-[11px]">
                        {product?.rate || "4.2"}
                        <span className="ml-[2px] text-[8px]">★</span>
                      </span>

                      <span className="min-w-0 truncate text-[9px] text-[#9aa0ad] md:text-[10px]">
                        ({Number(product?.ratenum || 1234).toLocaleString()})
                      </span>

                      <img
                        src={thustedimg}
                        alt="Trusted"
                        className="ml-auto h-[17px] max-w-[52px] shrink-0 object-contain md:h-[20px]"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

function Benefit({ icon, line1, line2, border = false }) {
  return (
    <div
      className={`flex items-center justify-center gap-[7px] ${
        border ? "border-r border-gray-200" : ""
      }`}
    >
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#9f2089] text-[17px] font-bold text-white md:h-[42px] md:w-[42px]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold leading-[13px] text-[#9f2089] sm:text-[12px] md:text-[15px] md:leading-[18px]">
          {line1}
        </p>
        <p className="text-[10px] font-semibold leading-[13px] text-[#9f2089] sm:text-[12px] md:text-[14px]">
          {line2}
        </p>
      </div>
    </div>
  );
}

export default CategoryPage;
