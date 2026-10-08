import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import bomb from "../images/bomb.png";
import thustedimg from "../images/thrustedimg2.png";
import heart from "../images/wishlist.svg";

import LazyImage from "./LazyImage";
import LazyloaderImage from "./LazyloaderImage";

function HomePage({ data }) {
  const initialTime = 1 * 60 * 60 + 15 * 60;

  const [time, setTime] = useState(initialTime);
  const [activebanner, setActivebanner] = useState(0);
  const [homepagebigbannersilder, setHomepagebigbannersilder] =
    useState([]);

  const navigate = useNavigate();

  /* =========================================
     SALE BANNER DIRECT URL
  ========================================= */

  const saleBanner =
    "https://images.meesho.com/images/widgets/W5AQ5/mwccw.gif";

  /* =========================================
     COUNTDOWN
  ========================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        }

        return initialTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =========================================
     SLIDER CONFIG
  ========================================= */

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("/slider-config.json")
      .then((r) => r.json())
      .then((config) => {
        setHomepagebigbannersilder(
          config.bigBannerSlider || []
        );
      })
      .catch((e) => {
        console.error("Slider config error:", e);
      });
  }, []);

  /* =========================================
     FORMAT TIME
  ========================================= */

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hrs: String(hrs).padStart(2, "0"),
      min: String(mins).padStart(2, "0"),
      sec: String(secs).padStart(2, "0"),
    };
  };

  const formattedTime = formatTime(time);

  /* =========================================
     OPEN PRODUCT
  ========================================= */

  const openProduct = (product) => {
    navigate(
      "/productdetails/" +
        product.id +
        "/" +
        encodeURIComponent(product.title || "product")
    );
  };

  /* =========================================
     DISCOUNT
  ========================================= */

  const getDiscount = (product) => {
    const price = Number(
      String(product?.price || "").replace(/[^0-9.]/g, "")
    );

    const cancelPrice = Number(
      String(product?.cancelprice || "").replace(
        /[^0-9.]/g,
        ""
      )
    );

    if (!price || !cancelPrice || cancelPrice <= price) {
      return null;
    }

    return Math.round(
      ((cancelPrice - price) / cancelPrice) * 100
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f6f8]">
      {/* =========================================
          ALL CUSTOM CSS
      ========================================= */}

      <style>{`

        /* =================================
           SALE BANNER
        ================================= */

        .sale-banner-wrapper {
          width: 100%;
          background: #ffffff;
          padding: 14px 16px;
        }

        .sale-banner-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: contain;
          object-position: center;
        }


        /* =================================
           MOVING OFFER
        ================================= */

        .offer-marquee {
          position: relative;

          width: 100%;
          height: 40px;

          display: flex;
          align-items: center;

          overflow: hidden;

          background: #9f007c;

          color: #ffffff;
        }

        .offer-marquee-track {
          display: flex;
          align-items: center;

          width: max-content;

          white-space: nowrap;

          animation: offerMove 12s linear infinite;
        }

        .offer-marquee-track span {
          display: inline-block;

          padding: 0 22px;

          font-size: 16px;
          font-weight: 700;
        }

        @keyframes offerMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }


        /* =================================
           BENEFITS
        ================================= */

        .benefits-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          width: 100%;

          padding: 13px 8px;

          background: #fff8e8;

          border-bottom: 1px solid #f2eadb;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          min-width: 0;
        }

        .benefit-icon {
          width: 31px;
          height: 31px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #9f2089;

          color: #ffffff;

          font-size: 17px;
          font-weight: 800;
        }

        .benefit-text {
          color: #9f2089;

          font-size: 12px;
          font-weight: 700;
          line-height: 13px;
        }


        /* =================================
           HOT SELL
        ================================= */

        .hot-sell-badge {
          position: absolute;

          top: 7px;
          left: 50%;

          z-index: 15;

          padding: 4px 7px;

          background: linear-gradient(
            135deg,
            #72145f,
            #9f2089,
            #c02aa4
          );

          color: #ffffff;

          border-radius: 4px;

          font-size: 10px;
          font-weight: 700;
          line-height: 1;

          white-space: nowrap;

          box-shadow:
            0 2px 7px rgba(159, 32, 137, 0.35);

          transform-origin: center;

          animation:
            hotSellAnimation
            2.4s
            ease-in-out
            infinite;
        }

        @keyframes hotSellAnimation {

          0% {
            transform:
              translateX(-50%)
              scale(0.65);

            opacity: 0;
          }

          12% {
            transform:
              translateX(-50%)
              scale(1.22);

            opacity: 1;
          }

          22% {
            transform:
              translateX(-50%)
              scale(0.95);

            opacity: 1;
          }

          30% {
            transform:
              translateX(-50%)
              scale(1.08);

            opacity: 1;
          }

          40% {
            transform:
              translateX(-50%)
              scale(1);

            opacity: 1;
          }

          72% {
            transform:
              translateX(-50%)
              scale(1);

            opacity: 1;
          }

          86% {
            transform:
              translateX(-50%)
              scale(1.18);

            opacity: 1;
          }

          100% {
            transform:
              translateX(-50%)
              scale(0.65);

            opacity: 0;
          }
        }


        /* =================================
           PRODUCT TIMER
        ================================= */

        .product-deal-timer {
          position: relative;
          overflow: hidden;
        }

        .product-deal-timer::after {
          content: "";

          position: absolute;

          top: 0;
          left: -60%;

          width: 35%;
          height: 100%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.9),
            transparent
          );

          transform: skewX(-20deg);

          animation:
            timerShine
            3s
            linear
            infinite;
        }

        @keyframes timerShine {

          0% {
            left: -60%;
          }

          45% {
            left: 130%;
          }

          100% {
            left: 130%;
          }
        }


        /* =================================
           BUY NOW
        ================================= */

        .home-buy-now {
          transition:
            transform 0.15s ease,
            background 0.15s ease;
        }

        .home-buy-now:active {
          transform: scale(0.98);
        }


        /* =================================
           MOBILE
        ================================= */

        @media screen and (max-width: 640px) {

          .sale-banner-wrapper {
            padding: 14px 16px;
          }

          .sale-banner-img {
            width: 100%;
            height: auto;
            object-fit: contain;
          }

          .offer-marquee {
            height: 40px;
          }

          .offer-marquee-track span {
            padding: 0 18px;

            font-size: 16px;
          }

          .benefits-strip {
            padding: 12px 4px;
          }

          .benefit-item {
            gap: 5px;
          }

          .benefit-icon {
            width: 27px;
            height: 27px;

            font-size: 14px;
          }

          .benefit-text {
            font-size: 10px;
            line-height: 11px;
          }

          .hot-sell-badge {
            top: 6px;

            padding: 4px 6px;

            font-size: 9px;
          }
        }


        @media (prefers-reduced-motion: reduce) {

          .hot-sell-badge,
          .product-deal-timer::after,
          .offer-marquee-track {
            animation: none;
          }
        }

      `}</style>

      <div className="mx-auto w-full max-w-[1280px] bg-white">

        {/* =========================================
            EXISTING BIG BANNER SLIDER
        ========================================= */}

        {homepagebigbannersilder.length > 0 && (
          <section className="py-2">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={homepagebigbannersilder.length > 1}
              slidesPerView={1}
              onSlideChange={(swiper) => {
                setActivebanner(swiper.realIndex);
              }}
            >
              {homepagebigbannersilder.map((img, i) => (
                <SwiperSlide key={i}>
                  <LazyImage
                    src={img}
                    className="
                      block
                      h-auto
                      max-h-[350px]
                      w-full
                      object-cover
                      md:object-contain
                    "
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* DOTS */}

            <div className="mt-2 flex justify-center gap-1.5">
              {homepagebigbannersilder.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activebanner === i
                      ? "w-4 bg-[#9f2089]"
                      : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {/* =========================================
            SALE IS LIVE BANNER
        ========================================= */}

       

        {/* =========================================
            MOVING BUY 2 GET 1 FREE
        ========================================= */}

        <div className="offer-marquee">
          <div className="offer-marquee-track">

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

            <span>
              Buy 2 Get 1 Free (Add 3 item to cart)
            </span>

          </div>
        </div>

        {/* =========================================
            BENEFITS
        ========================================= */}

        <div className="benefits-strip">

          {/* EASY RETURNS */}

          <div className="benefit-item">

            <div className="benefit-icon">
              ↩
            </div>

            <div className="benefit-text">
              Easy returns
              <br />
              & refunds
            </div>

          </div>

          {/* CASH ON DELIVERY */}

          <div className="benefit-item">

            <div className="benefit-icon">
              🤝
            </div>

            <div className="benefit-text">
              Cash on
              <br />
              delivery
            </div>

          </div>

          {/* LOWEST PRICE */}

          <div className="benefit-item">

            <div className="benefit-icon">
              ₹
            </div>

            <div className="benefit-text">
              Lowest
              <br />
              price
            </div>

          </div>

        </div>

        {/* =========================================
            DAILY DEALS
        ========================================= */}

        <section className="border-b border-gray-100 px-3 py-4">

          <div className="flex flex-wrap items-center justify-center gap-3">

            <h2 className="text-[18px] font-bold text-[#353543] md:text-[21px]">
              Daily Deals ⚡
            </h2>

            <div className="inline-flex h-[27px] items-center rounded-md border border-orange-400 bg-orange-100 px-2">

              <LazyImage
                src={bomb}
                className="h-4 w-4 object-contain"
              />

              <span className="ml-1 text-[12px] font-semibold tracking-[0.3px] text-[#570d48]">

                {formattedTime.hrs}h :{" "}
                {formattedTime.min}m :{" "}
                {formattedTime.sec}s

              </span>

            </div>

          </div>

        </section>

        {/* =========================================
            PRODUCTS FOR YOU
        ========================================= */}

        <section>

          {/* HEADING */}

          <div className="flex items-center justify-between border-b border-gray-100 px-3 py-4 md:px-5">

            <h1 className="text-[18px] font-semibold text-[#353543] md:text-[22px]">
              Products For You
            </h1>

            <span className="hidden text-[12px] text-gray-500 md:block">
              {data?.length || 0} Products
            </span>

          </div>

          {/* =========================================
              PRODUCT GRID
          ========================================= */}

          <div className="grid grid-cols-2 bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {data?.map((product, index) => {

              const discount = getDiscount(product);

              return (
                <article
                  key={product?.id || index}
                  onClick={() => openProduct(product)}
                  className="
                    group
                    relative
                    cursor-pointer
                    border-b
                    border-r
                    border-gray-200
                    bg-white
                    p-2
                    transition-shadow
                    duration-300
                    hover:z-10
                    hover:shadow-md
                    md:p-3
                  "
                >

                  {/* =================================
                      WISHLIST
                  ================================= */}

                  <button
                    type="button"
                    aria-label="Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="
                      absolute
                      right-3
                      top-3
                      z-20
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      shadow-sm
                    "
                  >
                    <img
                      src={heart}
                      alt=""
                      className="h-[18px] w-[18px]"
                    />
                  </button>

                  {/* =================================
                      PRODUCT IMAGE
                  ================================= */}

                  <div
                    className="
                      relative
                      flex
                      aspect-[3/4]
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      bg-white
                    "
                  >

                    {/* HOT SELL */}

                    <div className="hot-sell-badge">
                      Hot Sell
                    </div>

                    {/* IMAGE */}

                    <LazyloaderImage
                      src={Array.isArray(product?.image) ? product.image[0] : (product?.image || product?.images?.[0])}
                      className="
                        block
                        h-full
                        w-full
                        object-contain
                        object-center
                        transition-transform
                        duration-500
                        group-hover:scale-[1.03]
                      "
                    />

                  </div>

                  {/* =================================
                      PRODUCT DETAILS
                  ================================= */}

                  <div className="pt-2">

                    {/* TITLE */}

                    <p className="truncate text-[12px] text-[#616173] md:text-[13px]">
                      {product?.title}
                    </p>

                    {/* PRICE */}

                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">

                      <span className="text-[17px] font-bold text-[#353543] md:text-[19px]">
                        ₹{product?.price}
                      </span>

                      {product?.cancelprice && (
                        <span className="text-[10px] text-gray-400 line-through md:text-[11px]">
                          ₹{product.cancelprice}
                        </span>
                      )}

                      {discount && (
                        <span className="text-[10px] font-medium text-[#353543] md:text-[11px]">
                          {discount}% off
                        </span>
                      )}

                    </div>

                    {/* =================================
                        PRODUCT TIMER
                    ================================= */}

                    <div
                      className="
                        product-deal-timer
                        mt-2
                        flex
                        h-[28px]
                        w-full
                        items-center
                        justify-center
                        rounded-[5px]
                        border
                        border-[#ff6b35]
                        bg-[#fff9f6]
                        px-1
                      "
                    >

                      <span
                        className="
                          relative
                          z-[2]
                          whitespace-nowrap
                          text-[11px]
                          font-semibold
                          tracking-[0.4px]
                          text-[#9f2089]
                          sm:text-[12px]
                          md:text-[13px]
                        "
                      >
                        ⚫ {formattedTime.hrs}h :{" "}
                        {formattedTime.min}m :{" "}
                        {formattedTime.sec}s
                      </span>

                    </div>

                    {/* =================================
                        BUY NOW
                    ================================= */}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProduct(product);
                      }}
                      className="
                        home-buy-now
                        mt-2
                        flex
                        h-[40px]
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-[4px]
                        bg-[#9f2089]
                        px-2
                        text-[12px]
                        font-bold
                        text-white
                        hover:bg-[#851873]
                        md:text-[14px]
                      "
                    >

                      {/* DOUBLE ARROW */}

                      <svg
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
                      </svg>

                      <span>
                        Buy Now
                      </span>

                    </button>

                    {/* =================================
                        RATING + TRUSTED
                    ================================= */}

                    <div className="mt-2 flex min-h-[24px] items-center justify-between gap-1">

                      <div className="flex min-w-0 items-center">

                        {/* RATING */}

                        <span className="inline-flex items-center rounded-full bg-[#038d63] px-1.5 py-[3px] text-[11px] font-semibold text-white md:text-[12px]">

                          {product?.rate || "4.2"}

                          <span className="ml-1 text-[9px]">
                            ★
                          </span>

                        </span>

                        {/* REVIEW COUNT */}

                        <span className="ml-1 truncate text-[9px] text-gray-400 md:text-[11px]">

                          (
                          {product?.ratenum?.toLocaleString?.() ||
                            "1,234"}
                          )

                        </span>

                      </div>

                      {/* TRUSTED */}

                      <img
                        src={thustedimg}
                        alt=""
                        className="h-[18px] max-w-[55px] object-contain md:h-[21px]"
                      />

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </section>

      </div>

    </main>
  );
}

export default HomePage;