// PaymentPage.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartTotalAction } from "../redux/actions/AddTocart.action";

export default function PaymentPage() {
  const { buydata } = useSelector((state) => state?.buydata);

  const dispatch = useDispatch();

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showUPIApps, setShowUPIApps] = useState(false);
  const [copied, setCopied] = useState(false);

  const toNumber = (v) =>
    Number(String(v).replace(/[^\d.-]/g, "")) || 0;

  const mainProduct = buydata?.[0];

  const price = toNumber(mainProduct?.price);
  const qty = toNumber(mainProduct?.qty || 1);
  const checkoutItems = mainProduct?.checkoutItems || [];

  const checkoutTotal = checkoutItems.reduce((acc, item) => {
    const itemPrice = toNumber(item?.price);
    const itemQty = toNumber(item?.qty || 1);

    return acc + itemPrice * itemQty;
  }, 0);

  const totalAmount = price * qty + checkoutTotal;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("rajpatel1861997@okaxis");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // =========================================
  // UPI DETAILS
  // =========================================

  // ==========================================
  // CONFIGURATION
  // ==========================================
  const upiId = "rajpatel1861997@okaxis";
  const verifiedAccountName = "Raj Patel"; // Or "Meesho"
  const payeeName = verifiedAccountName;

  // =========================================
  // OPEN UPI PAYMENT
  // =========================================

  const createOrderId = () => {
    const part = () =>
      Math.floor((1 + Math.random()) * 65536)
        .toString(16)
        .substring(1);

    return `${part()}${part()}-${part()}-${part()}-${part()}-${part()}`;
  };

  const createTxnRef = () => {
    return `EZYS${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const openUPIApp = (app = "upi") => {
    const amount = Number(totalAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    if (!upiId || !upiId.includes("@")) {
      alert("UPI ID not configured");
      return;
    }

    dispatch(setCartTotalAction(amount));

    const formattedAmount = amount.toFixed(2);
    const orderNote = `Order_${Date.now()}`;
    const amountInPaise = Math.round(amount * 100);

    const isIOS =
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod/i.test(navigator.userAgent);

    let paymentUrl = "";

    if (app === "phonepe") {
      if (isIOS) {
        paymentUrl =
          `phonepe:upi://pay?pa=${encodeURIComponent(upiId)}` +
          `&pn=${encodeURIComponent(verifiedAccountName)}` +
          `&am=${formattedAmount}` +
          `&cu=INR` +
          `&tn=${encodeURIComponent(orderNote)}`;
      } else {
        const payload = {
          p2pPaymentCheckoutParams: {
            checkoutType: "COLLECT",
            initialAmount: amountInPaise,
            note: {
              type: "text",
              message: orderNote,
            },
            supportedInstruments: -1,
          },
          contact: {
            type: "EXTERNAL_MERCHANT",
            name: verifiedAccountName,
            vpa: upiId,
          },
        };

        const encodedPayload = btoa(
          unescape(encodeURIComponent(JSON.stringify(payload)))
        );

        paymentUrl =
          `phonepe://native?data=${encodeURIComponent(encodedPayload)}` +
          `&id=p2ppayment`;
      }
    } else if (app === "paytm") {
      paymentUrl =
        `paytmmp://cash_wallet?pa=${encodeURIComponent(upiId)}` +
        `&pn=${encodeURIComponent(verifiedAccountName)}` +
        `&am=${formattedAmount}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent(orderNote)}` +
        `&featuretype=money_transfer`;
    } else {
      // BHIM / WhatsApp / Default UPI
      paymentUrl =
        `upi://pay?pa=${encodeURIComponent(upiId)}` +
        `&pn=${encodeURIComponent(verifiedAccountName)}` +
        `&am=${formattedAmount}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent(orderNote)}`;
    }

    setShowPaymentOptions(false);
    setShowUPIApps(false);

    window.location.href = paymentUrl;
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">

          {/* ========================================= */}
          {/* MAIN PRODUCT */}
          {/* ========================================= */}

          {mainProduct && (
            <div className="flex gap-4 items-center border-b pb-4 mb-4">

              <img
                src={mainProduct?.image?.[0]}
                alt={mainProduct?.title}
                className="w-28 h-28 rounded-lg object-cover border"
              />

              <div className="flex-1">

                <h2 className="font-semibold text-lg text-black">
                  {mainProduct?.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {mainProduct?.desc?.slice(0, 60)}
                  {mainProduct?.desc?.length > 60 ? "..." : ""}
                </p>

                <div className="mt-2 flex items-center gap-3">

                  <p className="font-bold text-xl text-black">
                    ₹{price}
                  </p>

                  {mainProduct?.cancelprice && (
                    <p className="line-through text-gray-400 text-sm">
                      {mainProduct?.cancelprice}
                    </p>
                  )}

                </div>

                <p className="text-sm text-gray-600 mt-1">
                  Qty:{" "}
                  <span className="font-semibold">
                    {qty}
                  </span>
                </p>

              </div>

            </div>
          )}

          {/* ========================================= */}
          {/* ADDITIONAL ITEMS */}
          {/* ========================================= */}

          {checkoutItems?.length > 0 && (
            <div className="mb-4 border-b pb-4">

              <h3 className="font-semibold text-lg mb-3 text-black">
                Additional Items
              </h3>

              {checkoutItems.map((item, idx) => {

                const itemPrice = toNumber(item?.price);
                const itemQty = toNumber(item?.qty || 1);

                return (
                  <div
                    key={item?.id || idx}
                    className="flex gap-4 items-center border-b last:border-b-0 pb-4 mb-4"
                  >

                    <img
                      src={item?.image?.[0]}
                      alt={item?.title}
                      className="w-24 h-24 rounded-lg object-cover border"
                    />

                    <div className="flex-1">

                      <h4 className="font-semibold text-md text-black">
                        {item?.title}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item?.desc?.slice(0, 60)}
                        {item?.desc?.length > 60 ? "..." : ""}
                      </p>

                      <div className="mt-2 flex items-center gap-3">

                        <p className="font-bold text-lg text-black">
                          ₹{itemPrice}
                        </p>

                        {item?.cancelprice && (
                          <p className="line-through text-gray-400 text-sm">
                            {item?.cancelprice}
                          </p>
                        )}

                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        Qty:{" "}
                        <span className="font-semibold">
                          {itemQty}
                        </span>
                      </p>

                    </div>

                    <div className="font-semibold text-lg text-black">
                      ₹{itemPrice * itemQty}
                    </div>

                  </div>
                );
              })}

            </div>
          )}

          {/* ========================================= */}
          {/* ORDER SUMMARY */}
          {/* ========================================= */}

          <div className="mt-6">

            <h3 className="font-semibold text-lg mb-3 text-black">
              Order Summary
            </h3>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Main Product</span>
              <span>₹{price * qty}</span>
            </div>

            {checkoutItems?.length > 0 && (
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Additional Items</span>
                <span>₹{checkoutTotal}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>

              <span className="font-semibold text-green-600">
                FREE
              </span>
            </div>

            <div className="flex justify-between text-black font-semibold text-lg border-t pt-3">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

          </div>

          {/* ========================================= */}
          {/* PAY NOW BUTTON */}
          {/* ========================================= */}

          <button
            type="button"
            onClick={() => {
              setShowPaymentOptions(true);
              setShowUPIApps(false);
            }}
            className="
              mt-6
              w-full
              bg-blue-600
              hover:bg-blue-700
              active:scale-[0.99]
              text-white
              py-3
              rounded-xl
              text-lg
              font-semibold
              shadow-md
              transition-all
            "
          >
            Pay Now
          </button>

        </div>
      </div>

      {/* ========================================= */}
      {/* PAYMENT POPUP */}
      {/* ========================================= */}

      {showPaymentOptions && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-[9999]
            flex
            items-end
            sm:items-center
            justify-center
            px-0
            sm:px-4
          "
          onClick={() => {
            setShowPaymentOptions(false);
            setShowUPIApps(false);
          }}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white
              w-full
              sm:max-w-md
              rounded-t-3xl
              sm:rounded-3xl
              p-6
              shadow-2xl
              max-h-[90vh]
              overflow-y-auto
            "
          >

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="flex justify-between items-start mb-5">

              <div>

                <h2 className="text-xl font-bold text-black">
                  Choose Payment Method
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Total payable ₹{totalAmount}
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowPaymentOptions(false);
                  setShowUPIApps(false);
                }}
                className="
                  w-9
                  h-9
                  shrink-0
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-600
                  text-2xl
                  leading-none
                "
              >
                ×
              </button>

            </div>

            {/* ========================================= */}
            {/* UPI APP OPTION */}
            {/* ========================================= */}

            {/* ========================================= */}
            {/* QR CODE PAYMENT SECTION */}
            {/* ========================================= */}
            <div className="mb-5 border border-blue-200 bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-4 text-center shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    QR
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm">Scan to Pay via Any UPI App</p>
                    <p className="text-[11px] text-gray-500">PhonePe, Paytm, BHIM & all UPI apps</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Instant
                </span>
              </div>

              {/* QR Code Container */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 inline-block mx-auto my-1">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(
                    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(verifiedAccountName)}&am=${Number(totalAmount).toFixed(2)}&cu=INR`
                  )}`}
                  alt="UPI Payment QR Code"
                  className="w-48 h-48 sm:w-52 sm:h-52 mx-auto object-contain rounded-lg"
                />
                  <div className="mt-2 text-center">
                    <p className="text-sm font-bold text-gray-900">₹{totalAmount}</p>
                    <p className="text-[11px] text-gray-500 font-medium">{payeeName}</p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-2">
                  Scan with PhonePe, Paytm or any UPI app to complete payment.
                </p>
              </div>

            {/* ========================================= */}
            {/* UPI APP OPTION */}
            {/* ========================================= */}

            <button
              type="button"
              onClick={() => setShowUPIApps((prev) => !prev)}
              className="
                w-full
                border
                border-gray-200
                hover:border-blue-500
                hover:bg-blue-50
                rounded-2xl
                px-4
                py-3.5
                flex
                items-center
                justify-between
                transition-all
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-11
                    h-11
                    bg-purple-50
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                    text-purple-700
                  "
                >
                  APP
                </div>

                <div className="text-left">

                  <p className="font-semibold text-black text-sm">
                    Pay via UPI App Directly
                  </p>

                  <p className="text-xs text-gray-500">
                    PhonePe, Paytm, BHIM & more
                  </p>

                </div>

              </div>

              <span className="text-xl text-gray-400">
                {showUPIApps ? "⌃" : "›"}
              </span>

            </button>

            {/* ========================================= */}
            {/* UPI APPS */}
            {/* ========================================= */}

            {showUPIApps && (
              <div
                className="
                  mt-3
                  border
                  border-gray-200
                  rounded-2xl
                  overflow-hidden
                "
              >

                {/* PHONEPE */}

                <button
                  type="button"
                  onClick={() => openUPIApp("phonepe")}
                  className="
                    w-full
                    px-4
                    py-4
                    flex
                    items-center
                    justify-between
                    bg-white
                    hover:bg-gray-50
                    border-b
                    border-gray-100
                    transition-all
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-purple-50
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-purple-600
                      "
                    >
                      P
                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-black">
                        PhonePe
                      </p>

                      <p className="text-xs text-gray-500">
                        Pay ₹{totalAmount}
                      </p>

                    </div>

                  </div>

                  <span className="text-2xl text-gray-400">
                    ›
                  </span>

                </button>

                {/* BHIM UPI */}

                <button
                  type="button"
                  onClick={() => openUPIApp("bhim_upi")}
                  className="
                    w-full px-4 py-4 flex items-center justify-between
                    bg-white hover:bg-gray-50 border-b border-gray-100 transition-all
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center font-bold text-green-700">
                      B
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-black">BHIM UPI</p>
                      <p className="text-xs text-gray-500">Pay ₹{totalAmount}</p>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">›</span>
                </button>

                {/* WHATSAPP PAY */}

                <button
                  type="button"
                  onClick={() => openUPIApp("whatspp_pay")}
                  className="
                    w-full px-4 py-4 flex items-center justify-between
                    bg-white hover:bg-gray-50 border-b border-gray-100 transition-all
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center font-bold text-green-600">
                      W
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-black">WhatsApp Pay</p>
                      <p className="text-xs text-gray-500">Pay ₹{totalAmount}</p>
                    </div>
                  </div>
                  <span className="text-2xl text-gray-400">›</span>
                </button>

                {/* PAYTM */}

                <button
                  type="button"
                  onClick={() => openUPIApp("paytm")}
                  className="
                    w-full
                    px-4
                    py-4
                    flex
                    items-center
                    justify-between
                    bg-white
                    hover:bg-gray-50
                    transition-all
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-blue-500
                      "
                    >
                      P
                    </div>

                    <div className="text-left">

                      <p className="font-semibold text-black">
                        Paytm
                      </p>

                      <p className="text-xs text-gray-500">
                        Pay ₹{totalAmount}
                      </p>

                    </div>

                  </div>

                  <span className="text-2xl text-gray-400">
                    ›
                  </span>

                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}