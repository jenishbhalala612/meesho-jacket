import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import meeshologo from "../images/Meesho_logo.png";

import LazyImage from "../components/LazyImage";

export default function Header() {
  const navigate = useNavigate();

  const { cart } = useSelector((s) => s?.cart || {});

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
const saleBanner =
  "https://images.meesho.com/images/widgets/W5AQ5/mwccw.gif";
  const cartCount = cart?.length || 0;

  /* ==============================
     CART
  ============================== */
  const openCart = () => {
    if (cartCount > 0) {
      navigate("/cart");
    }
  };

  return (
    <>
      {/* =================================
          STICKY HEADER + SALE BANNER
      ================================= */}

      <header className=" top-0 z-50 w-full bg-white">

        {/* =================================
            MAIN HEADER
        ================================= */}

        <div
          className="
            mx-auto
            flex
            h-[52px]
            w-full
            max-w-[1280px]
            items-center
            border-b
            border-gray-200
            bg-white
            px-[18px]

            md:h-[72px]
            md:gap-5
            md:px-6
          "
        >

          {/* ===============================
              MOBILE HAMBURGER
          =============================== */}

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="
              mr-[20px]
              flex
              h-[30px]
              w-[25px]
              flex-shrink-0
              flex-col
              items-center
              justify-center
              gap-[4px]

              md:hidden
            "
          >
            <span className="block h-[2px] w-[20px] rounded-full bg-[#353543]" />

            <span className="block h-[2px] w-[20px] rounded-full bg-[#353543]" />

            <span className="block h-[2px] w-[20px] rounded-full bg-[#353543]" />
          </button>

          {/* ===============================
              LOGO
          =============================== */}

          <button
            type="button"
            aria-label="Home"
            onClick={() => navigate("/")}
            className="flex flex-shrink-0 items-center"
          >
            <LazyImage
              src={meeshologo}
              className="
                block
                h-[24px]
                w-auto
                cursor-pointer
                object-contain

                md:h-[34px]
              "
            />
          </button>

          {/* ===============================
              DESKTOP SEARCH
          =============================== */}

          <div className="hidden min-w-0 flex-1 md:block">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try Jacket, Bomber, Denim, Shacket..."
              className="
                h-11
                w-full
                rounded-md
                border
                border-gray-300
                bg-white
                px-4
                text-sm
                text-[#353543]
                outline-none

                focus:border-[#9f2089]
              "
            />
          </div>

          {/* ===============================
              DESKTOP LINKS
          =============================== */}

          <div
            className="
              ml-auto
              hidden
              flex-shrink-0
              items-center
              gap-5
              text-[13px]
              text-[#353543]

              md:flex
            "
          >
            <span className="cursor-pointer">
              Download App
            </span>

            <span className="cursor-pointer">
              Become a Supplier
            </span>

            <span className="cursor-pointer">
              Profile
            </span>
          </div>

          {/* ===============================
              RIGHT ICONS
          =============================== */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-[18px]

              md:gap-4
            "
          >

            {/* ===============================
                HEART
            =============================== */}

            <button
              type="button"
              aria-label="Wishlist"
              className="
                flex
                h-[30px]
                w-[30px]
                items-center
                justify-center
              "
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="
                  h-[23px]
                  w-[23px]
                  fill-[#f4335d]
                "
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            {/* ===============================
                CART
            =============================== */}

            <button
              type="button"
              aria-label="Cart"
              onClick={openCart}
              className="
                relative
                flex
                h-[30px]
                w-[30px]
                items-center
                justify-center
              "
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="
                  h-[25px]
                  w-[25px]
                  fill-[#9f2089]
                "
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C5.09 14.32 5 14.65 5 15c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25 0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.88 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>

              {/* CART COUNT */}

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -right-[5px]
                    -top-[5px]

                    flex
                    h-[16px]
                    min-w-[16px]
                    items-center
                    justify-center

                    rounded-full
                    bg-[#f4335d]

                    px-[4px]

                    text-[9px]
                    font-bold
                    leading-none
                    text-white
                  "
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =================================
            SALE BANNER
        ================================= */}

        <div
          className="
            w-full
            overflow-hidden
            bg-white
          "
        >
          <img
            src={saleBanner}
            alt="Sale is Live"
            className="
              block
              h-[43px]
              w-full
              object-cover
              object-center

              sm:h-[50px]

              md:h-auto
              md:max-h-[80px]
              md:object-cover
            "
          />
        </div>
      </header>

      {/* =================================
          MOBILE SIDE MENU
      ================================= */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">

          {/* DARK BACKGROUND */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="
              absolute
              inset-0
              bg-black/40
            "
          />

          {/* DRAWER */}

          <div
            className="
              relative
              h-full
              w-[82%]
              max-w-[320px]
              bg-white
              shadow-xl
            "
          >

            {/* DRAWER HEADER */}

            <div
              className="
                flex
                h-[58px]
                items-center
                justify-between
                border-b
                border-gray-200
                px-4
              "
            >
              <LazyImage
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                src={meeshologo}
                className="
                  h-[27px]
                  w-auto
                  cursor-pointer
                  object-contain
                "
              />

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  text-[27px]
                  text-[#353543]
                "
              >
                ×
              </button>
            </div>

            {/* ===============================
                SEARCH
            =============================== */}

            <div className="border-b border-gray-200 p-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jackets, bombers, coats..."
                className="
                  h-[42px]
                  w-full
                  rounded-md
                  border
                  border-gray-300
                  px-3
                  text-[13px]
                  outline-none

                  focus:border-[#9f2089]
                "
              />
            </div>

            {/* ===============================
                MENU LINKS
            =============================== */}

            <div className="flex flex-col">

              {/* HOME */}

              <button
                type="button"
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="
                  border-b
                  border-gray-100
                  px-5
                  py-4
                  text-left
                  text-[14px]
                  font-medium
                  text-[#353543]
                "
              >
                Home
              </button>

              {/* DOWNLOAD */}

              <button
                type="button"
                className="
                  border-b
                  border-gray-100
                  px-5
                  py-4
                  text-left
                  text-[14px]
                  font-medium
                  text-[#353543]
                "
              >
                Download App
              </button>

              {/* SUPPLIER */}

              <button
                type="button"
                className="
                  border-b
                  border-gray-100
                  px-5
                  py-4
                  text-left
                  text-[14px]
                  font-medium
                  text-[#353543]
                "
              >
                Become a Supplier
              </button>

              {/* PROFILE */}

              <button
                type="button"
                className="
                  border-b
                  border-gray-100
                  px-5
                  py-4
                  text-left
                  text-[14px]
                  font-medium
                  text-[#353543]
                "
              >
                Profile
              </button>

              {/* CART */}

              <button
                type="button"
                onClick={() => {
                  if (cartCount > 0) {
                    navigate("/cart");
                  }

                  setMenuOpen(false);
                }}
                className="
                  border-b
                  border-gray-100
                  px-5
                  py-4
                  text-left
                  text-[14px]
                  font-medium
                  text-[#353543]
                "
              >
                Cart {cartCount > 0 ? `(${cartCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}