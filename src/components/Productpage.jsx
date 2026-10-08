import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import bomb from "../images/bomb.png";
import shopicon from "../images/shopicon.webp";
import codimage from "../images/cod_new.png";
import lowpriceimage from "../images/lowest_price_new.png";
import returnimage from "../images/return_new.png";
import thustedimg from "../images/thrustedimg2.png";
import heart from "../images/wishlist.svg";
import { BaynowandaddtocartAction } from "../redux/actions/Baynowdata";
import { useNavigate, useParams } from "react-router-dom";
import homerupeeicon from "../images/rupeeIcon.jpeg";
import { addtocartAction } from "../redux/actions/AddTocart.action";
import { toast } from "react-toastify";
import checkpurple from "../images/checkpurple.png";
import LazyImage from "./LazyImage";

function Productpage({ data }) {
  const { cart } = useSelector((state) => state?.cart);
  const [apiData, setapiData] = useState(data);
  const initialTime = 120 * 60;
  const [time, setTime] = useState(initialTime);
  const [selecedSize, setSelecedSize] = useState("");
  const [addtocartyn, setaddtocartyn] = useState(false);
  const [buynowyn, setbuynowyn] = useState(false);
  const [randomReviews, setRandomReviews] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const reatingtextandcolor = [
    { name: "Excellent", num: 2717, color: "#06A759", width: "43%" },
    { name: "Very Good", num: 1342, color: "#06A759", width: "21%" },
    { name: "Good", num: 953, color: "#F4B743", width: "14%" },
    { name: "Average", num: 1342, color: "#EC803D", width: "6%" },
    { name: "Poor", num: 1342, color: "#F52833", width: "14%" },
  ];
  const [Readless, setReadless] = useState(false);
  const [videodata, setvideodata] = useState(false);
  const addtocartsidebar = useRef(null);
  const [addtocartpopup, setaddtocartpopup] = useState(false);
  const buynowsidebar = useRef(null);
  const [buynowpopup, setbuynowpopup] = useState(false);
  const viewdetailwssidebar = useRef(null);
  const [viewdetailwspopup, setviewdetailwspopup] = useState(false);
  useEffect(() => {
    let timer;
    const countDown = () => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        setTime(initialTime);
      }
    };
    timer = setInterval(countDown, 1000);
    return () => clearInterval(timer);
  }, [time, initialTime]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return {
      hr: `${hours < 10 ? "0" : ""}${hours}`,
      min: `${minutes < 10 ? "0" : ""}${minutes}`,
      sec: `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`,
    };
  };
  // const { iddata } = useSelector((state) => state?.iddata);
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const silderrefdata = useRef(null);
  const [filterdata, setfilterdata] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setapiData(data);
    }
  }, [data]);

  useEffect(() => {
    const found = apiData?.find((dataf) => String(dataf?.id) === String(id));
    const filterdata = found ? [found] : [];
    setfilterdata(filterdata);
    if (filterdata[0]) {
      const defaultSize = filterdata[0]?.size?.[0] || filterdata[0]?.sizes?.[0]?.label || "M";
      setSelecedSize(defaultSize);
      setSelectedImageIndex(0);
      localStorage.setItem("idname", JSON.stringify({ id, name }));
    }
  }, [id, name, apiData]);

  const similerproductclick = (id, name) => {
    window.scrollTo(0, 0);
    navigate("/productdetails/" + id + "/" + encodeURIComponent(name || "jacket"));
  };
  const filtersimilarproduct = apiData
    ?.slice(
      apiData?.find((datafrind, index) => index === apiData?.length - 7)?.id <
        id
        ? 0
        : apiData?.findIndex((item) => item.id === id),
      apiData?.find((datafrind, index) => index === apiData?.length - 7)?.id <
        id
        ? 6
        : apiData?.findIndex((item) => item.id === id) + 7
    )
    ?.filter((datafilterid) => datafilterid?.id !== id);
  const handleSizeSelect = (size) => {
    setSelecedSize(size);
  };

  const buynowProductData = (buydata) => {
    const payload = {
      ...buydata,
      size: selecedSize,
      qty: 1,
      yesnoval: buynowyn,
      free: false
    };
    dispatch(BaynowandaddtocartAction(payload));
    setbuynowpopup(false);
    navigate("/cart");
    window?.scrollTo(0, 0);
  };
  const addtocartButton = (id) => {
    const productExists = cart?.some((product) => product.id === id);
    if (productExists) {
      toast.error("Product already exists in the cart.");
    } else {
      dispatch(
        addtocartAction({
          id: id,
          sizeselect: selecedSize,
          qty: 1,
          yesnoval: addtocartyn,
          free: false
        })
      );
      toast.success("Product Is Added to Cart.");
    }
    setaddtocartpopup(false);
  };

  const sellerNames = [
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
    'meesho official',
  ];

  const reviewsProduct = [
    { text: "😍😍wow amazing products and price" },
    { text: "🤞🏻best forever" },
    { text: "😎lokking awesome and price reasonable" },
    { text: "🔥🔥🔥🔥 products is good 🔥🔥🔥" },
    { text: "⭐⭐⭐⭐⭐⭐ unlimited star" },
    { text: "😘😘😘😘best products & price" },
    { text: "👌🏻👌🏻fast shipping best price & quality" },
    { text: "💥💥Thank you flipkart best experiance" },
    { text: "killer products,best quality" },
    { text: "🥳🥳🥳awesome products" },
    { text: "🥰🥰best from other 🥰🥰" },
    { text: "⚡⚡best in shopping thank you Meesho" },
    { text: "❤️❤️❤️loved products" },
    { text: "best product ever" },
    { text: "5/5 ratings best products" },
    { text: "😙quality is good😙😙" },
    { text: "💯/💯 best forever best shopping app" },
  ];

  const reviewsProductName = [
    { name: "Val Pockey" },
    { name: "Mina Sharma" },
    { name: "Rina Pande" },
    { name: "Katuri Vadhale" },
    { name: "Ravina Bhale" },
    { name: "Sima Roy" },
    { name: "Menka Tandon" },
    { name: "Asha Aggarwal" },
    { name: "Lakshmi Mhutumale" },
    { name: "Meera Panchal" },
    { name: "Annu Kesri" },
    { name: "Kavita Ghosh" },
    { name: "Shreya Bairagya" },
    { name: "Asifa Khan" },
    { name: "Kautliya Suman" },
  ];

  const reviewsProductdate = [
    { date: "19 Mar" },
    { date: "21 Mar" },
    { date: "10 Apr" },
    { date: "9 Mar" },
    { date: "15 Mar" },
    { date: "5 Apr" },
    { date: "1 Mar" },
    { date: "25 Mar" },
    { date: "11 Mar" },
    { date: "10 Mar" },
    { date: "8 Mar" },
    { date: "6 Apr" },
    { date: "3 Mar" },
    { date: "1 Mar" },
    { date: "4 Mar" },
  ];
  const getRandomReviews = () => {
    const randomReviewsData = [];
    const availableReviewsProduct = [...reviewsProduct];
    const availableReviewsProductName = [...reviewsProductName];
    const availableReviewsProductdate = [...reviewsProductdate];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(
        Math.random() * availableReviewsProduct.length
      );
      const randomIndex2 = Math.floor(
        Math.random() * availableReviewsProductName.length
      );
      const randomIndex3 = Math.floor(
        Math.random() * availableReviewsProductdate.length
      );
      randomReviewsData.push({
        text: availableReviewsProduct[randomIndex]?.text,
        name: availableReviewsProductName[randomIndex2]?.name,
        rate: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        helpful: parseInt(Math.random() * (20 - 100) + 100),
        date: availableReviewsProductdate[randomIndex3]?.date,
      });
      availableReviewsProduct.splice(randomIndex, 1);
      availableReviewsProductName.splice(randomIndex2, 1);
    }

    setRandomReviews(randomReviewsData);
  };

  const getRandomSellerName = () => {
    const randomIndex = Math.floor(
      Math.random() * sellerNames.length
    );

    setVendorName(sellerNames[randomIndex]);
  }

  useEffect(() => {
    console.log('test');
    if (filterdata?.length) {
      getRandomReviews();
      getRandomSellerName();
    }
  }, [filterdata?.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        addtocartsidebar.current &&
        !addtocartsidebar.current.contains(event.target)
      ) {
        setaddtocartpopup(addtocartpopup && viewdetailwspopup ? true : false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addtocartsidebar, viewdetailwspopup]);

  const handleBodyScroll1 = () => {
    if (addtocartpopup) {
      window?.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    handleBodyScroll1();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [addtocartpopup]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buynowsidebar.current &&
        !buynowsidebar.current.contains(event.target)
      ) {
        setbuynowpopup(buynowpopup && viewdetailwspopup ? true : false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buynowsidebar, viewdetailwspopup]);

  const handleBodyScroll2 = () => {
    if (buynowpopup) {
      window?.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    handleBodyScroll2();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [buynowpopup]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        viewdetailwssidebar.current &&
        !viewdetailwssidebar.current.contains(event.target)
      ) {
        setviewdetailwspopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewdetailwssidebar]);

  const handleBodyScroll3 = () => {
    if (viewdetailwspopup) {
      window?.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    handleBodyScroll3();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewdetailwspopup]);
  return (
    <>
      <div className="w-full">
        <div>
          {/* PRODUCT MAIN IMAGE + DYNAMIC THUMBNAILS */}
          {filterdata?.length > 0 && Array.isArray(filterdata[0]?.image) && (
            <div className="w-full bg-white">
              <div className="w-full flex justify-center items-center px-2 pt-2">
                <LazyImage
                  src={filterdata[0]?.image?.[selectedImageIndex]}
                  className="w-full max-h-[520px] h-auto object-contain"
                />
              </div>

              {filterdata[0]?.image?.length > 0 && (
                <div className="px-[16px] pt-[14px] pb-[16px]">
                  <p className="text-[14px] text-[#353543] font-[500] mb-[12px]">
                    {filterdata[0]?.image?.length} Product Images & Styles
                  </p>

                  <div className="w-full border-t border-[#e5e5e5] pt-[12px]">
                    <div className="flex gap-[10px] overflow-x-auto pb-1"
                         style={{ scrollbarWidth: "none" }}>
                      {filterdata[0]?.image?.map((img, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`shrink-0 w-[60px] h-[60px] rounded-[8px] overflow-hidden bg-white ${
                            selectedImageIndex === index
                              ? "border-2 border-[#9f2089]"
                              : "border border-[#d9d9d9]"
                          }`}
                        >
                          <LazyImage
                            src={img}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {filterdata[0]?.similarProducts?.length > 0 && (
          <div className="bg-white px-[16px] py-[14px] mb-2 border-b border-[#e5e5e5]">
            <p className="text-[#353543] text-[14px] font-[600] mb-[10px]">
              Similar Jackets & Styles ({filterdata[0].similarProducts.length})
            </p>
            <div className="flex gap-[10px] overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {filterdata[0].similarProducts.map((sp, idx) => {
                const fullProd = apiData?.find((p) => String(p.id) === String(sp.id));
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => similerproductclick(sp.id, fullProd?.title || "jacket")}
                    className="shrink-0 w-[68px] h-[68px] rounded-[8px] overflow-hidden border border-[#d9d9d9] hover:border-[#9f2089]"
                  >
                    <LazyImage src={sp.image} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full pt-[8px] px-[16px] bg-white pb-[18px]">
            <div
              className="grid grid-cols-auto overflow-hidden w-full"
              style={{ gridTemplateColumns: "auto 64px 64px" }}
            >
              <span className="text-[rgb(0_0_1)] truncates text-[15px] font-bold">
                {filterdata[0]?.title}
              </span>
              <div className="flex justify-center items-center flex-col">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  iconsize="17"
                  className="mb-[6px]"
                >
                  <g clip-path="url(#wishlist-product_svg__a)">
                    <path
                      d="M4.616 2.048c.856 0 1.672.384 2.416 1.144a1.35 1.35 0 0 0 1.936 0c.744-.76 1.56-1.136 2.416-1.136 1.28 0 2.52.888 3.08 2.2.584 1.376.264 2.856-.888 4.056L8.336 13.8a.478.478 0 0 1-.336.152.447.447 0 0 1-.336-.152l-5.24-5.488C1.272 7.104.952 5.624 1.536 4.248c.56-1.312 1.8-2.2 3.08-2.2Zm0-1.248c-3.584 0-6.52 4.784-3.088 8.376l5.24 5.488c.336.36.784.536 1.232.536.448 0 .896-.176 1.232-.536l5.24-5.488C17.896 5.592 14.96.8 11.376.8c-1.096 0-2.248.448-3.296 1.512a.103.103 0 0 1-.08.032.103.103 0 0 1-.08-.032C6.872 1.248 5.712.8 4.616.8Z"
                      fill="#333"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="wishlist-product_svg__a">
                      <path
                        fill="#fff"
                        transform="translate(0 .8)"
                        d="M0 0h16v14.4H0z"
                      ></path>
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[rgb(53_53_67)] text-[13px]">
                  Wishlist
                </span>
              </div>
              <div className="flex justify-center items-center flex-col">
                <svg
                  width="17"
                  height="17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  iconsize="17"
                  className="mb-[6px]"
                >
                  <path fill="#fff" d="M.947.979h16v16h-16z"></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.489 3.912c0-1.62 1.266-2.933 2.829-2.933 1.562 0 2.828 1.313 2.828 2.933 0 1.62-1.266 2.933-2.828 2.933a2.784 2.784 0 0 1-2.175-1.057L7.071 8.303a3.007 3.007 0 0 1 .295 1.866l3.643 2.18a2.797 2.797 0 0 1 2.309-1.238c1.562 0 2.828 1.314 2.828 2.934s-1.266 2.933-2.828 2.933c-1.563 0-2.829-1.313-2.829-2.933 0-.172.014-.34.042-.504l-3.636-2.176a2.798 2.798 0 0 1-2.32 1.254c-1.562 0-2.828-1.314-2.828-2.934s1.266-2.933 2.828-2.933a2.75 2.75 0 0 1 1.674.568l4.33-2.673a3.042 3.042 0 0 1-.09-.735Zm4.423 0c0-.914-.714-1.654-1.594-1.654-.88 0-1.595.74-1.595 1.653s.714 1.654 1.595 1.654c.88 0 1.594-.74 1.594-1.654ZM6.17 9.684c0-.913-.714-1.653-1.595-1.653-.88 0-1.594.74-1.594 1.653s.714 1.653 1.594 1.653c.88 0 1.595-.74 1.595-1.653Zm7.148 2.706c.88 0 1.594.74 1.594 1.653s-.714 1.654-1.594 1.654c-.88 0-1.595-.74-1.595-1.654 0-.913.714-1.653 1.595-1.653Z"
                    fill="#353543"
                  ></path>
                  <mask
                    id="share_svg__a"
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="0"
                    width="16"
                    height="17"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.318.979c-1.563 0-2.829 1.313-2.829 2.933 0 .254.031.5.09.735L6.249 7.32a2.75 2.75 0 0 0-1.674-.568c-1.562 0-2.828 1.313-2.828 2.933 0 1.62 1.266 2.934 2.828 2.934.96 0 1.808-.496 2.32-1.254l3.636 2.176a3.064 3.064 0 0 0-.042.504c0 1.62 1.266 2.933 2.829 2.933 1.562 0 2.828-1.313 2.828-2.933 0-1.62-1.266-2.934-2.828-2.934-.953 0-1.796.49-2.309 1.238l-3.643-2.18a3.06 3.06 0 0 0-.295-1.866l4.072-2.515a2.784 2.784 0 0 0 2.175 1.057c1.562 0 2.828-1.313 2.828-2.933 0-1.62-1.266-2.933-2.828-2.933Z"
                      fill="#fff"
                    ></path>
                  </mask>
                </svg>
                <span className="text-[rgb(53_53_67)] text-[13px]">Share</span>
              </div>
            </div>
            <div className="w-full pt-1 flex gap-1 items-center">
              <span className="text-[25px] font-[700] text-[rgb(53_53_67)]">
                ₹{filterdata[0]?.price}
              </span>
              <span className="text-[15px] font-[500] line-through text-[rgb(139_139_163)]">
                ₹{filterdata[0]?.cancelprice}
              </span>
              <span className="text-[15px] font-[500] text-[rgb(53_53_67)]">
                {filterdata[0]?.cancelprice && filterdata[0]?.price
                  ? Math.round(
                    ((+filterdata[0]?.cancelprice - +filterdata[0]?.price) /
                      +filterdata[0]?.cancelprice) *
                    100
                  )
                  : 0}
                % Off
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {Array.isArray(filterdata[0]?.size) &&
                filterdata[0].size.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSizeSelect(s)}
                    className={`cursor-pointer px-3 py-1 rounded border 
          ${selecedSize === s ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {s}
                  </div>
                ))}
            </div>

            {filterdata[0]?.specialOfferPrice ? (
              <div className="w-full mt-[10px]">
                <div className="flex items-center bg-green-100 text-green-600 rounded-full text-[15px] font-[500] w-fit px-2 py-[2px]">
                  ₹{filterdata[0]?.specialOfferPrice} {filterdata[0]?.specialOffer?.label || "with Special Offer"}
                  <svg
                    width="16"
                    height="16"
                    className="ml-1"
                    fill="#91E5BD"
                    xmlns="http://www.w3.org/2000/svg"
                    iconsize="16"
                    class="sc-gswNZR EaPUQ"
                  >
                    <rect width="16" height="16" rx="8"></rect>
                    <path
                      d="M6.387 4.59a.647.647 0 0 0 0 .908L8.86 8l-2.474 2.502a.647.647 0 0 0 0 .91.63.63 0 0 0 .899 0l2.927-2.96a.647.647 0 0 0 0-.91l-2.927-2.96a.636.636 0 0 0-.9.007Z"
                      fill="#038D63"
                    ></path>
                  </svg>
                </div>
              </div>
            ) : null}
            <div className="w-full mt-[10px] flex gap-1 items-center justify-start">
              <p className="text-[13px] text-black">Daily Deals</p>
              <div className="inline-flex items-center whitespace-nowrap font-nums bg-orange-200 rounded-md h-[20px] px-[8px] border border-orange-500">
                <LazyImage
                  className={'w-[16px] h-[16px] object-contain'}
                  width="16"
                  height="16"
                  src={bomb}
                />
                <span className="text-[#570d48] font-semibold text-[13px] leading-[16px] ml-[5px] p-0">
                  {formatTime(time)?.hr}h : {formatTime(time)?.min}m :{" "}
                  {formatTime(time)?.sec}s
                </span>
              </div>
            </div>
            <div className="w-full mt-[12px] flex justify-start items-center gap-1">
              <div className="flex justify-center items-center gap-1 w-fit m-0 px-[6px] py-[2px] bg-[rgb(35_187_117)] rounded-full">
                <p className="text-white text-[13px] font-[500] text-center">
                  {filterdata[0]?.rate}
                </p>
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 20 20"
                  fill="#ffffff"
                  className="w-[10px] h-[10px]"
                  xmlns="http://www.w3.org/2000/svg"
                  ml="4"
                  iconsize="10"
                  class="sc-gswNZR eMqtuK"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z"
                      fill="#ffffff"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="20" height="19.08" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="text-[rgb(139_139_163)] font-[500] text-[11px]">
                {filterdata[0]?.ratenum?.toLocaleString()} Ratings, {filterdata[0]?.reviewCount ? Number(filterdata[0].reviewCount).toLocaleString() : "1,076"} Reviews
              </p>
              <span className="bg-[rgb(206_206_222)] w-[4px] h-[4px] rounded-full mx-[8px] inline-block"></span>
              <LazyImage
                src={thustedimg}
                className="w-auto h-[20px] ml-2 object-contain"
              />
            </div>
            <div className="w-full pt-[8px]">
              <div className="bg-[rgb(248_248_255)] text-[rgb(97_97_115)] py-1 w-fit text-[10px] font-[600] rounded-full px-2">
                Free Delivery
              </div>
            </div>
          </div>
        </div>
        {/* {filterdata[0]?.size?.length > 0 && (
          <div className="bg-[rgb(234_234_242)] pb-2 w-full">
            <div className="w-full py-[20px] px-[16px] bg-white">
              <h5 className="text-[17px] text-[rgb(53_53_67)] font-[700] mb-[16px]">
                Select Size
              </h5>
              <div className="flex justify-start items-center gap-2 w-full flex-wrap">
                {filterdata[0]?.size?.map((datasize) => {
                  return (
                    <button
                      onClick={() => {
                        setSelecedSize(datasize);
                      }}
                      type="button"
                      className={`m-0 px-[16px] py-[6px] w-fit ${
                        selecedSize === datasize
                          ? "bg-[rgb(255_231_251)] border-[rgb(159_32_137)] text-[rgb(159_32_137)]"
                          : "bg-[rgb(255_255_251)] border-[rgb(0_0_0)] text-[rgb(0_0_0)]"
                      } text-[15px] font-[500] rounded-full border-[1px] flex justify-center items-center capitalize`}
                    >
                      {datasize}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )} */}
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full py-[20px] px-[16px] bg-white">
            <p className="text-[17px] text-[rgb(53_53_67)] font-[700]">
              Product Details
            </p>
            <div
              className={`mt-4 ${Readless ? "mb-4" : "mb-0"
                } text-[13px] text-[rgb(97_97_115)] font-[500]`}
              dangerouslySetInnerHTML={{
                __html: Readless
                  ? filterdata[0]?.desc
                  : filterdata[0]?.desc?.split("<br/>")[0],
              }}
            ></div>
            <button
              type="button"
              onClick={() => {
                setReadless(!Readless);
              }}
              className="m-0 p-0 w-fit uppercase text-[rgb(159_32_137)] text-[13px] font-[500]"
            >
              {Readless ? "read less" : "read more"}
            </button>
          </div>
        </div>
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full py-[20px] px-[16px] bg-white">
            <p className="text-[17px] text-[rgb(53_53_67)] font-[700]">
              Sold By
            </p>
            <div className="w-full pt-[12px] flex justify-start items-center">
              <div className="w-[48px] h-[48px]">
                <div className="w-full h-full">
                  <LazyImage
                    src={shopicon}
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="w-[calc(100%_-_48px)]">
                <div className="flex justify-between items-center">
                  <span className="text-[15px] text-[#353543] uppercase font-[500] pl-2 pr-4">
                    {filterdata[0]?.seller?.name || vendorName}
                  </span>
                  <button
                    type="button"
                    className={`m-0 px-[8px] py-[6px] w-fit
                    border-[rgb(159_32_137)] text-[rgb(159_32_137)] bg-transparent text-[13px] font-[500] rounded-[4px] border-[1px] flex justify-center items-center`}
                  >
                    View Shop
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full pl-[56px] pt-4 pb-0 pr-0">
              <div className="w-fit flex gap-6 justify-between items-center">
                <div>
                  <div className="flex justify-center items-center gap-1 w-fit m-0 px-[6px] py-[2px] bg-transparent border-[1px] border-[rgb(231_238_255)] rounded-full">
                    <p className="text-[#5585F8] text-[13px] font-[500] text-center">
                      {filterdata[0]?.rate}
                    </p>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 20 20"
                      fill="#5585F8"
                      className="w-[10px] h-[10px]"
                      xmlns="http://www.w3.org/2000/svg"
                      ml="4"
                      iconsize="10"
                      class="sc-gswNZR eMqtuK"
                    >
                      <g clip-path="url(#clip0)">
                        <path
                          d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z"
                          fill="#5585F8"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="20" height="19.08" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <p className="text-[rgb(139_139_163)] pt-1 font-[500] text-[13px]">
                    {filterdata[0]?.ratenum?.toLocaleString()}Ratings
                  </p>
                </div>
                <div>
                  <p className="text-[#353543] font-[500] text-[15px]">154</p>
                  <p className="text-[rgb(139_139_163)] pt-1 font-[500] text-[13px]">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="text-[#353543] font-[500] text-[15px]">{filterdata[0]?.seller?.productCount || "1,251"}</p>
                  <p className="text-[rgb(139_139_163)] pt-1 font-[500] text-[13px]">
                    Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full py-[20px] px-[16px] bg-white">
            <p className="text-[17px] text-[rgb(53_53_67)] font-[700]">
              Product Ratings & Reviews
            </p>
            <div className="w-full pt-[16px] pb-[20px] flex justify-start items-start border-b-[1px] border-[#CECEDE]">
              <div className="w-[110px]">
                <div className="w-full">
                  <div className="w-[70px]">
                    <div className="flex justify-center items-center gap-1 w-fit m-0 p-0 bg-transparent border-none">
                      <p className="text-[#038d63] text-[35px] font-[500] text-center">
                        {filterdata[0]?.rate}
                      </p>
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 20 20"
                        fill="#038d63"
                        className="w-[10px] h-[10px]"
                        xmlns="http://www.w3.org/2000/svg"
                        ml="4"
                        iconsize="10"
                        class="sc-gswNZR eMqtuK"
                      >
                        <g clip-path="url(#clip0)">
                          <path
                            d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z"
                            fill="#038d63"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="20" height="19.08" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="text-[rgb(139_139_163)] font-[500] text-[11px]">
                      {filterdata[0]?.ratenum?.toLocaleString()} Ratings,
                    </p>
                    <p className="text-[rgb(139_139_163)] font-[500] text-[11px]">
                      {filterdata[0]?.reviewCount ? Number(filterdata[0].reviewCount).toLocaleString() : "1,076"} Reviews
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[calc(100%_-_110px)]">
                <div className="flex flex-col w-full">
                  {(filterdata[0]?.ratingSummary?.breakdown
                    ? [
                        { name: "Excellent", num: filterdata[0].ratingSummary.breakdown.excellent, color: "#06A759", width: `${Math.min(100, Math.round((filterdata[0].ratingSummary.breakdown.excellent / (filterdata[0].ratenum || 1)) * 100))}%` },
                        { name: "Very Good", num: filterdata[0].ratingSummary.breakdown.veryGood, color: "#06A759", width: `${Math.min(100, Math.round((filterdata[0].ratingSummary.breakdown.veryGood / (filterdata[0].ratenum || 1)) * 100))}%` },
                        { name: "Good", num: filterdata[0].ratingSummary.breakdown.good, color: "#F4B743", width: `${Math.min(100, Math.round((filterdata[0].ratingSummary.breakdown.good / (filterdata[0].ratenum || 1)) * 100))}%` },
                        { name: "Average", num: filterdata[0].ratingSummary.breakdown.average, color: "#EC803D", width: `${Math.min(100, Math.round((filterdata[0].ratingSummary.breakdown.average / (filterdata[0].ratenum || 1)) * 100))}%` },
                        { name: "Poor", num: filterdata[0].ratingSummary.breakdown.poor, color: "#F52833", width: `${Math.min(100, Math.round((filterdata[0].ratingSummary.breakdown.poor / (filterdata[0].ratenum || 1)) * 100))}%` },
                      ]
                    : reatingtextandcolor
                  ).map((datarateing) => {
                    return (
                      <div className="flex-1 flex items-center gap-3 mb-1">
                        <div className="w-[61px] text-right">
                          <p className="text-[rgb(53_53_67)] font-[400] text-[11px]">
                            {datarateing?.name}
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="w-full h-1 rounded-full bg-[rgb(234_234_242)] relative">
                            <span
                              style={{
                                backgroundColor: datarateing?.color,
                                width: datarateing?.width,
                              }}
                              className="h-full absolute top-0 left-0 rounded-full"
                            ></span>
                          </div>
                        </div>
                        <div style={{ flex: "0.1 1 0%" }}>
                          <p className="text-[rgb(53_53_67)] font-[400] text-[11px] text-right">
                            {datarateing?.num}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full pt-[16px] border-b-[1px] border-[#CECEDE]">
              <p className="text-[#353543] font-[500] text-[13px]">
                Real Images and videos from customers
              </p>
              <div className="mt-[12px] mb-[16px] flex justify-start flex-wrap items-center gap-2">
                {filterdata?.length > 0 &&
                  filterdata[0]?.image?.map((dataimagesf) => {
                    return (
                      <div className="w-[48px] h-[48px] overflow-hidden rounded">
                        <LazyImage
                          src={dataimagesf}
                          className="w-full h-full object-cover aspect-square"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            {(filterdata[0]?.reviews?.length > 0 ? filterdata[0].reviews : randomReviews)?.map((datashowreview, index) => {
              return (
                <div
                  key={index}
                  className={`w-full pt-[16px] border-b-[1px] border-[#CECEDE]`}
                >
                  <div className="w-full flex gap-2 justify-start items-center">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      iconsize="16"
                      className="w-[16px] h-[16px]"
                    >
                      <path
                        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
                        fill="#F7F9FF"
                      ></path>
                      <mask
                        id="user_svg__a"
                        mask-type="alpha"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                      >
                        <path
                          d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
                          fill="#F7F9FF"
                        ></path>
                      </mask>
                      <g mask="url(#user_svg__a)">
                        <path
                          d="M27.222 15.222C27.222 11.24 23.982 8 20 8s-7.222 3.24-7.222 7.222c0 3.983 3.24 7.222 7.222 7.222s7.222-3.24 7.222-7.222ZM20 22.444c-7.168 0-13 5.832-13 13v1.354c0 .41.175.802.48 1.076C11 41.027 15.446 42.763 20 42.763s9.001-1.736 12.52-4.89c.305-.273.48-.664.48-1.075v-1.354c0-7.168-5.832-13-13-13Z"
                          fill="#D6E2FF"
                        ></path>
                      </g>
                    </svg>
                    <p className="text-[#353543] font-[500] text-[13px]">
                      {datashowreview?.name}
                    </p>
                  </div>
                  <div className="w-full mt-[12px] flex justify-start items-center gap-1">
                    <div className="flex justify-center items-center gap-1 w-fit m-0 px-[6px] py-[2px] bg-[rgb(35_187_117)] rounded-full">
                      <p className="text-white text-[13px] font-[500] text-center">
                        {datashowreview?.rate}
                      </p>
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 20 20"
                        fill="#ffffff"
                        className="w-[10px] h-[10px]"
                        xmlns="http://www.w3.org/2000/svg"
                        ml="4"
                        iconsize="10"
                        class="sc-gswNZR eMqtuK"
                      >
                        <g clip-path="url(#clip0)">
                          <path
                            d="M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C15.8099 19.08 15.8099 19.08 15.8199 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z"
                            fill="#ffffff"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0">
                            <rect width="20" height="19.08" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="bg-[rgb(206_206_222)] w-[4px] h-[4px] rounded-full mx-[8px] inline-block"></span>
                    <p className="text-[rgb(139_139_163)] font-[500] text-[11px]">
                      Posted on {datashowreview?.date} 2024
                    </p>
                  </div>
                  <div className="w-full mt-2">
                    <p className="text-[#353543] font-[500] text-[13px]">
                      {datashowreview?.text}
                    </p>
                  </div>
                  <div className="mt-[12px] w-full flex justify-start flex-wrap items-center gap-2">
                    {datashowreview?.images?.length > 0
                      ? datashowreview.images.map((rImg, rIdx) => (
                          <div
                            key={rIdx}
                            className="w-[48px] h-[48px] overflow-hidden rounded border border-gray-200"
                          >
                            <LazyImage
                              src={rImg}
                              className="w-full h-full object-cover aspect-square"
                            />
                          </div>
                        ))
                      : filterdata?.length > 0 &&
                        filterdata[0]?.image?.length > 0 &&
                        [0, 1].map((offset) => {
                          const images = filterdata[0].image;
                          const imageIndex =
                            (index * 2 + offset) % images.length;
                          const reviewImage = images[imageIndex];

                          return (
                            <div
                              key={`${index}-${imageIndex}-${offset}`}
                              className="w-[48px] h-[48px] overflow-hidden rounded"
                            >
                              <LazyImage
                                src={reviewImage}
                                className="w-full h-full object-cover aspect-square"
                              />
                            </div>
                          );
                        })}
                  </div>
                  <div className="mt-2 mb-4 w-full flex gap-2 justify-start items-center">
                    <svg
                      viewBox="0 0 16 16"
                      fill="greyT1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[20px] h-[20px]"
                      size="16"
                      iconsize="20"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.712 5.245 8.68 1.13a1.039 1.039 0 0 1 1.51-.008c.258.268.366.647.294 1.018l-.68 3.402h4.046c1.54 0 2.578 1.635 1.977 3.106L13.492 14.3c-.229.542-.745.899-1.318.899H5.73c-.788 0-1.432-.669-1.432-1.486V6.293c0-.394.15-.773.415-1.048Zm-1.847 8.471c0 .818-.645 1.486-1.433 1.486-.787 0-1.432-.668-1.432-1.486V7.773c0-.817.645-1.486 1.432-1.486.788 0 1.433.67 1.433 1.486v5.943Z"
                        fill="#666"
                      ></path>
                    </svg>
                    <p className="text-[#616173] font-[500] text-[13px]">
                      Helpful ({datashowreview?.helpful})
                    </p>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className={`mt-[16px] mx-0 mb-0 w-fit text-[rgb(159_32_137)] uppercase bg-transparent text-[13px] font-bold flex justify-center items-center`}
            >
              View all reviews
              <svg
                width="20"
                height="20"
                fill="#570d48"
                xmlns="http://www.w3.org/2000/svg"
                iconsize="20"
                className="w-[20px] h-[20px]"
              >
                <path
                  d="M7.31 4.316a1.079 1.079 0 0 0 0 1.515l4.125 4.17-4.124 4.17a1.079 1.079 0 0 0 0 1.515 1.05 1.05 0 0 0 1.499 0l4.88-4.933a1.079 1.079 0 0 0 0-1.515L8.81 4.305a1.06 1.06 0 0 0-1.5.01Z"
                  fill="#570d48"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full py-[20px] px-[16px] bg-[#E7EEFF] flex justify-between items-center">
            <div className="w-[33%] border-r-2 border-white px-2">
              <div className="w-full flex gap-[12px] justify-start md:justify-center items-center overflow-hidden">
                <LazyImage
                  src={lowpriceimage}
                  className="w-[40px] rounded-full bg-white object-cover"
                />
                <p className="text-[rgb(53_53_67)] font-[500] text-[11px]">
                  Lowest Price
                </p>
              </div>
            </div>
            <div className="w-[33%] border-r-2 border-white px-2">
              <div className="w-full flex gap-[12px] justify-start md:justify-center items-center overflow-hidden">
                <LazyImage
                  src={codimage}
                  className="w-[40px] rounded-full bg-white object-cover"
                />
                <p className="text-[rgb(53_53_67)] font-[500] text-[11px]">
                  Cash on Delivery
                </p>
              </div>
            </div>
            <div className="w-[33%] px-2">
              <div className="w-full flex gap-[12px] justify-start md:justify-center items-center overflow-hidden">
                <LazyImage
                  src={returnimage}
                  className="w-[40px] rounded-full bg-white object-cover"
                />
                <p className="text-[rgb(53_53_67)] font-[500] text-[11px]">
                  7-day Returns
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[rgb(234_234_242)] pb-2 w-full">
          <div className="w-full py-[12px] px-[16px] border-t-[1px] border-[#CECEDE] bg-white flex justify-between items-center fixed bottom-0 z-[9999999]">
            <button
              onClick={() => {
                // addtocartButton(filterdata[0]?.id);
                setaddtocartpopup(true);
              }}
              type="button"
              className={`mr-[12px] ml-0 mx-0 h-[46px] w-[50%]
                    border-[rgb(159_32_137)] p-[10px] text-[rgb(159_32_137)] bg-transparent text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
            >
              <svg
                width="21"
                height="21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ml="4"
                mr="4"
                iconsize="20"
                className="w-[20px] h-[20px]"
              >
                <g clip-path="url(#cart_svg__a)">
                  <path fill="#fff" d="M.394.479h20v20h-20z"></path>
                  <g clip-path="url(#cart_svg__b)">
                    <g clip-path="url(#cart_svg__c)">
                      <path
                        d="M4.396 4.293h15.139c.507 0 .907.491.849 1.046l-.762 7.335c-.068.619-.536 1.1-1.102 1.12l-12.075.492-2.05-9.993Z"
                        fill="#C53EAD"
                      ></path>
                      <path
                        d="M10.193 20.478c.674 0 1.22-.598 1.22-1.335s-.546-1.334-1.22-1.334c-.674 0-1.22.597-1.22 1.334 0 .737.546 1.335 1.22 1.335ZM15.181 20.478c.674 0 1.22-.598 1.22-1.335s-.546-1.334-1.22-1.334c-.674 0-1.22.597-1.22 1.334 0 .737.546 1.335 1.22 1.335Z"
                        fill="#570d48"
                      ></path>
                      <path
                        d="M1.126 3.28 4.152 4.7 6.68 16.784c.127.608.615 1.035 1.18 1.035h9.615"
                        stroke="#570d48"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </g>
                </g>
                <defs>
                  <clipPath id="cart_svg__a">
                    <path
                      fill="#fff"
                      transform="translate(.394 .479)"
                      d="M0 0h20v20H0z"
                    ></path>
                  </clipPath>
                  <clipPath id="cart_svg__b">
                    <path
                      fill="#fff"
                      transform="translate(.394 .479)"
                      d="M0 0h20v20H0z"
                    ></path>
                  </clipPath>
                  <clipPath id="cart_svg__c">
                    <path
                      fill="#fff"
                      transform="translate(.394 2.479)"
                      d="M0 0h20v18H0z"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
              Add to Cart
            </button>
            <button
              onClick={() => {
                setbuynowpopup(true);
              }}
              type="button"
              className={`m-0 h-[46px] w-[50%]
                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
            >
              <svg
                width="21"
                height="21"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                ml="4"
                mr="4"
                stroke="transparent"
                btntype="solid"
                className="w-[20px] h-[20px]"
                iconsize="20"
              >
                <path
                  d="M1.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384ZM11.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384Z"
                  fill="#fff"
                ></path>
              </svg>
              Buy Now
            </button>
          </div>
        </div>
        <div className="w-full pt-[20px] pb-[16px] px-[16px] bg-white">
          <p className="text-[17px] text-[rgb(53_53_67)] font-[700]">
            People also viewed
          </p>
        </div>
        <div className="w-full bg-white">
          <div className="mx-0 grid grid-cols-2 text-sm mt-0 gap-0 bg-white">
            {apiData?.slice(0, 6).map((dataproduct, inx) => {
              return (
                <div
                  className="border border-slate-200 py-1 relative"
                  key={inx}
                  onClick={() => {
                    similerproductclick(dataproduct?.id, dataproduct?.title);
                  }}
                >
                  <div className="absolute right-2 top-2">
                    <button
                      type="button"
                      className="m-0 p-0 bg-transparent border-none"
                    >
                      <LazyImage
                        src={heart}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                  <div className="h-[175px] flex items-center justify-center">
                    <LazyImage
                      src={dataproduct?.image[0]}
                      className="max-h-[180px] mx-auto"
                    />
                  </div>
                  <div className="w-full p-3">
                    <p className="mt-1 text-[12px] text-[#8B8BA3] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                      {dataproduct?.title}
                    </p>
                    <p className="mt-1 flex items-center">
                      <span className="text-[16px]">₹{dataproduct?.price}</span>
                      <span className="text-gray-400 line-through ml-2 text-[12px] mr-2">
                        ₹{dataproduct?.cancelprice}
                      </span>
                      <span className="text-[12px] font-[500] text-[rgb(53_53_67)]">
                        {dataproduct?.cancelprice && dataproduct?.price
                          ? Math.round(
                            ((+dataproduct?.cancelprice -
                              +dataproduct?.price) /
                              +dataproduct?.cancelprice) *
                            100
                          )
                          : 0}
                        % Off
                      </span>
                    </p>
                    <div className="w-full mt-[6px]">
                      <div className="flex justify-start gap-1 bg-[rgb(211_244_234)] px-[6px] text-[10px] items-center w-full h-[20px] text-[rgb(3_141_99)] rounded-full">
                        <LazyImage
                          src={homerupeeicon}
                          className="w-[12px] h-[12px] object-contain"
                        />
                        Special Offer
                      </div>
                    </div>
                    <div className="flex justify-start items-center gap-[10px]">
                      <div className="bg-[rgb(234_234_242)] text-slate-600 rounded-full text-[12px] w-fit px-2 py-[1px] mt-1">
                        {" "}
                        Free delivery
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[13px]">
                      <div className="flex items-center">
                        <div className="bg-[#038d63] px-[5px] py-[2px] rounded-full text-white flex items-center mr-2">
                          {dataproduct?.rate}
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth={"0"}
                            viewBox="0 0 576 512"
                            className="ml-1 mt-[-2px]"
                            height="11"
                            width="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                          </svg>
                        </div>
                        <div className="text-slate-400 text-[12px]">
                          ({dataproduct?.ratenum?.toLocaleString()})
                        </div>
                        <LazyImage
                          src={thustedimg}
                          className="w-auto h-[20px] ml-2 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {addtocartpopup && (
          <div
            className={`fixed left-0 right-0 bottom-0 top-0 transition-all block bg-[#353543]/90 z-[999999999999999999]`}
          >
            <div
              className={`absolute bottom-0 right-0 left-0 ${addtocartpopup ? "opacity-100 h-fit" : "opacity-0 h-0 hidden"
                } w-full h-fit duration-1000 transition-all rounded-[8px_8px_0_0] bg-white cursor-default z-[999999999999999999]`}
              ref={addtocartsidebar}
            >
              <div className="w-full h-fit">
                <div className="p-[16px] flex justify-between items-center border-b-[1px] border-[#dddddd]">
                  <p className="text-[13px] font-medium uppercase text-[#353543]">
                    Add to Cart
                  </p>
                  <button
                    className="m-0 p-0 bg-transparent w-fit h-fit border-none outline-none"
                    type="button"
                    onClick={() => {
                      setaddtocartpopup(false);
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      iconSize="20"
                      class="w-[20px] h-[20px]"
                    >
                      <path
                        d="M14.3034 15.7767L10.0124 11.4858L5.70897 15.7892C5.24694 16.2512 4.58159 16.3419 4.11956 15.8799C3.65753 15.4178 3.76954 14.7738 4.23157 14.3117L8.53496 10.0083L4.22267 5.69605C3.76064 5.23402 3.65753 4.58108 4.11956 4.11905C4.58159 3.65702 5.22039 3.77427 5.68243 4.2363L9.99472 8.54859L14.3123 4.23106C14.7743 3.76902 15.4183 3.65702 15.8804 4.11905C16.3424 4.58108 16.2517 5.24643 15.7897 5.70846L11.4721 10.026L15.7631 14.317C16.2251 14.779 16.3424 15.4178 15.8804 15.8799C15.4183 16.3419 14.7654 16.2388 14.3034 15.7767Z"
                        fill="#666666"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  {/* {filterdata[0]?.size?.length > 0 && <div className="w-full pt-[20px] pb-[28px] px-[16px] border-[1px] border-b-[#dddddd]">
                <h5 className="text-[17px] text-[rgb(53_53_67)] font-[700] mb-[16px]">
                  Select Size
                </h5>
                <div className="flex justify-start items-center gap-2 w-full flex-wrap">
                  {filterdata[0]?.size?.map((datasize) => {
                    return (
                      <button
                        onClick={() => {
                          setSelecedSize(datasize);
                        }}
                        type="button"
                        className={`m-0 px-[16px] py-[6px] w-fit ${
                          selecedSize === datasize
                            ? "bg-[rgb(255_231_251)] border-[rgb(159_32_137)] text-[rgb(159_32_137)]"
                            : "bg-[rgb(255_255_251)] border-[rgb(0_0_0)] text-[rgb(0_0_0)]"
                        } text-[15px] font-[500] rounded-full border-[1px] flex justify-center items-center capitalize`}
                      >
                        {datasize}
                      </button>
                    );
                  })}
                </div>
              </div>} */}
                  <div className="w-full p-[16px] border-[1px] border-b-[#dddddd]">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[15px] text-[#616173] font-medium">
                        Do you want Easy Returns?
                      </p>
                      <button
                        onClick={() => {
                          setviewdetailwspopup(true);
                        }}
                        type="button"
                        className="m-0 p-0 w-fit bg-transparent border-none text-[15px] text-[#570d48] font-medium"
                      >
                        View Details
                      </button>
                    </div>
                    <div className="flex justify-between items-center w-full mt-[16px]">
                      <div
                        onClick={() => {
                          setaddtocartyn(true);
                        }}
                        className={`w-[48%] h-[125px] relative border-[1px] ${addtocartyn ? "border-[#570d48]" : "border-[#eaeaf2]"
                          } rounded-lg`}
                      >
                        {addtocartyn && (
                          <div className="absolute top-[-8px] right-[-8px] w-fit h-fit">
                            <LazyImage
                              src={checkpurple}
                              className="h-[21px] w-auto object-contain"
                            />
                          </div>
                        )}
                        <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                          <div className="bg-[#616173] text-[11px] text-white w-fit px-[5px] py-[2px] rounded-[5px]">
                            Yes
                          </div>
                          <p className="text-[10px] text-[#616173] font-[600] leading-3">
                            All issue easy returns allowed
                          </p>
                        </div>
                        <div className="p-[10px]">
                          <p className="text-[17px] text-black font-[600]">
                            ₹{+filterdata[0]?.price + 20}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setaddtocartyn(false);
                        }}
                        className={`w-[48%] h-[125px] relative border-[1px] ${addtocartyn === false
                          ? "border-[#570d48]"
                          : "border-[#eaeaf2]"
                          } rounded-lg`}
                      >
                        {addtocartyn === false && (
                          <div className="absolute top-[-8px] right-[-8px] w-fit h-fit">
                            <LazyImage
                              src={checkpurple}
                              className="h-[21px] w-auto object-contain"
                            />
                          </div>
                        )}
                        <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                          <div className="bg-[#616173] text-[11px] text-white w-fit px-[5px] py-[2px] rounded-[5px]">
                            No
                          </div>
                          <p className="text-[10px] text-[#616173] font-[600] leading-3">
                            Only wrong/defect item returns allowed
                          </p>
                        </div>
                        <div className="p-[10px]">
                          <p className="text-[17px] text-black font-[600]">
                            ₹{+filterdata[0]?.price}
                          </p>
                        </div>
                        <div className="w-full px-[6px] py-[1px]">
                          <div className="flex justify-start gap-1 bg-[rgb(211_244_234)] px-[6px] text-[10px] items-center w-full h-[20px] text-[rgb(3_141_99)] rounded-full">
                            <LazyImage
                              src={homerupeeicon}
                              className="w-[12px] h-[12px] object-contain"
                            />
                            Special Offer | Save ₹20
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-[12px] px-[16px] bg-white border-none flex justify-between items-center">
                    <button
                      onClick={() => {
                        addtocartButton(filterdata[0]?.id);
                      }}
                      type="button"
                      className={`mr-[12px] ml-0 mx-0 h-[46px] w-[100%]
                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
                    >
                      <svg
                        width="21"
                        height="21"
                        fill="transparent"
                        xmlns="http://www.w3.org/2000/svg"
                        ml="4"
                        mr="4"
                        iconsize="20"
                        className="w-[20px] h-[20px]"
                      >
                        <g clip-path="url(#cart_svg__a)">
                          <path fill="transparent" d="M.394.479h20v20h-20z"></path>
                          <g clip-path="url(#cart_svg__b)">
                            <g clip-path="url(#cart_svg__c)">
                              <path
                                d="M4.396 4.293h15.139c.507 0 .907.491.849 1.046l-.762 7.335c-.068.619-.536 1.1-1.102 1.12l-12.075.492-2.05-9.993Z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M10.193 20.478c.674 0 1.22-.598 1.22-1.335s-.546-1.334-1.22-1.334c-.674 0-1.22.597-1.22 1.334 0 .737.546 1.335 1.22 1.335ZM15.181 20.478c.674 0 1.22-.598 1.22-1.335s-.546-1.334-1.22-1.334c-.674 0-1.22.597-1.22 1.334 0 .737.546 1.335 1.22 1.335Z"
                                fill="#fff"
                              ></path>
                              <path
                                d="M1.126 3.28 4.152 4.7 6.68 16.784c.127.608.615 1.035 1.18 1.035h9.615"
                                stroke="#fff"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="cart_svg__a">
                            <path
                              fill="#fff"
                              transform="translate(.394 .479)"
                              d="M0 0h20v20H0z"
                            ></path>
                          </clipPath>
                          <clipPath id="cart_svg__b">
                            <path
                              fill="#fff"
                              transform="translate(.394 .479)"
                              d="M0 0h20v20H0z"
                            ></path>
                          </clipPath>
                          <clipPath id="cart_svg__c">
                            <path
                              fill="#fff"
                              transform="translate(.394 2.479)"
                              d="M0 0h20v18H0z"
                            ></path>
                          </clipPath>
                        </defs>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {buynowpopup && (
          <div
            className={`fixed left-0 right-0 bottom-0 top-0 transition-all block bg-[#353543]/90 z-[999999999999999999]`}
          >
            <div
              className={`absolute bottom-0 right-0 left-0 ${buynowpopup ? "opacity-100 h-fit" : "opacity-0 h-0 hidden"
                } w-full h-fit duration-1000 transition-all rounded-[8px_8px_0_0] bg-white cursor-default z-[999999999999999999]`}
              ref={buynowsidebar}
            >
              <div className="w-full h-fit">
                <div className="p-[16px] flex justify-between items-center border-b-[1px] border-[#dddddd]">
                  <p className="text-[13px] font-medium uppercase text-[#353543]">
                    Buy Now
                  </p>
                  <button
                    className="m-0 p-0 bg-transparent w-fit h-fit border-none outline-none"
                    type="button"
                    onClick={() => {
                      setbuynowpopup(false);
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      iconSize="20"
                      class="w-[20px] h-[20px]"
                    >
                      <path
                        d="M14.3034 15.7767L10.0124 11.4858L5.70897 15.7892C5.24694 16.2512 4.58159 16.3419 4.11956 15.8799C3.65753 15.4178 3.76954 14.7738 4.23157 14.3117L8.53496 10.0083L4.22267 5.69605C3.76064 5.23402 3.65753 4.58108 4.11956 4.11905C4.58159 3.65702 5.22039 3.77427 5.68243 4.2363L9.99472 8.54859L14.3123 4.23106C14.7743 3.76902 15.4183 3.65702 15.8804 4.11905C16.3424 4.58108 16.2517 5.24643 15.7897 5.70846L11.4721 10.026L15.7631 14.317C16.2251 14.779 16.3424 15.4178 15.8804 15.8799C15.4183 16.3419 14.7654 16.2388 14.3034 15.7767Z"
                        fill="#666666"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full">
                  {/* {filterdata[0]?.size?.length > 0 &&<div className="w-full pt-[20px] pb-[28px] px-[16px] border-[1px] border-b-[#dddddd]">
                <h5 className="text-[17px] text-[rgb(53_53_67)] font-[700] mb-[16px]">
                  Select Size
                </h5>
                <div className="flex justify-start items-center gap-2 w-full flex-wrap">
                  {filterdata[0]?.size?.map((datasize) => {
                    return (
                      <button
                        onClick={() => {
                          setSelecedSize(datasize);
                        }}
                        type="button"
                        className={`m-0 px-[16px] py-[6px] w-fit ${
                          selecedSize === datasize
                            ? "bg-[rgb(255_231_251)] border-[rgb(159_32_137)] text-[rgb(159_32_137)]"
                            : "bg-[rgb(255_255_251)] border-[rgb(0_0_0)] text-[rgb(0_0_0)]"
                        } text-[15px] font-[500] rounded-full border-[1px] flex justify-center items-center capitalize`}
                      >
                        {datasize}
                      </button>
                    );
                  })}
                </div>
              </div>} */}
                  <div className="w-full p-[16px] border-[1px] border-b-[#dddddd]">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-[15px] text-[#616173] font-medium">
                        Do you want Easy Returns?
                      </p>
                      <button
                        onClick={() => {
                          setviewdetailwspopup(true);
                        }}
                        type="button"
                        className="m-0 p-0 w-fit bg-transparent border-none text-[15px] text-[#570d48] font-medium"
                      >
                        View Details
                      </button>
                    </div>
                    <div className="flex justify-between items-center w-full mt-[16px]">
                      <div
                        onClick={() => {
                          setbuynowyn(true);
                        }}
                        className={`w-[48%] h-[125px] relative border-[1px] ${buynowyn ? "border-[#570d48]" : "border-[#eaeaf2]"
                          } rounded-lg`}
                      >
                        {buynowyn && (
                          <div className="absolute top-[-8px] right-[-8px] w-fit h-fit">
                            <LazyImage
                              src={checkpurple}
                              className="h-[21px] w-auto object-contain"
                            />
                          </div>
                        )}
                        <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                          <div className="bg-[#616173] text-[11px] text-white w-fit px-[5px] py-[2px] rounded-[5px]">
                            Yes
                          </div>
                          <p className="text-[10px] text-[#616173] font-[600] leading-3">
                            All issue easy returns allowed
                          </p>
                        </div>
                        <div className="p-[10px]">
                          <p className="text-[17px] text-black font-[600]">
                            ₹{+filterdata[0]?.price + 20}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setbuynowyn(false);
                        }}
                        className={`w-[48%] h-[125px] relative border-[1px] ${buynowyn === false
                          ? "border-[#570d48]"
                          : "border-[#eaeaf2]"
                          } rounded-lg`}
                      >
                        {buynowyn === false && (
                          <div className="absolute top-[-8px] right-[-8px] w-fit h-fit">
                            <LazyImage
                              src={checkpurple}
                              className="h-[21px] w-auto object-contain"
                            />
                          </div>
                        )}
                        <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                          <div className="bg-[#616173] text-[11px] text-white w-fit px-[5px] py-[2px] rounded-[5px]">
                            No
                          </div>
                          <p className="text-[10px] text-[#616173] font-[600] leading-3">
                            Only wrong/defect item returns allowed
                          </p>
                        </div>
                        <div className="p-[10px]">
                          <p className="text-[17px] text-black font-[600]">
                            ₹{+filterdata[0]?.price}
                          </p>
                        </div>
                        <div className="w-full px-[6px] py-[1px]">
                          <div className="flex justify-start gap-1 bg-[rgb(211_244_234)] px-[6px] text-[10px] items-center w-full h-[20px] text-[rgb(3_141_99)] rounded-full">
                            <LazyImage
                              src={homerupeeicon}
                              className="w-[12px] h-[12px] object-contain"
                            />
                            Special Offer | Save ₹3
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-[12px] px-[16px] bg-white border-none flex justify-between items-center">
                    <button
                      onClick={() => {
                        buynowProductData(filterdata[0]);
                      }}
                      type="button"
                      className={`mr-[12px] ml-0 mx-0 h-[46px] w-[100%]
                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center gap-1 items-center`}
                    >
                      <svg
                        width="21"
                        height="21"
                        fill="#ffffff"
                        xmlns="http://www.w3.org/2000/svg"
                        ml="4"
                        mr="4"
                        stroke="transparent"
                        btnType="solid"
                        icon="[object Object]"
                        iconSize="20"
                        class="sc-gswNZR dXbsni"
                      >
                        <path
                          d="M1.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384ZM11.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384Z"
                          fill="#fff"
                        ></path>
                      </svg>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {viewdetailwspopup && (
          <div
            className={`fixed left-0 right-0 bottom-0 top-0 transition-all block bg-[#353543]/90 z-[999999999999999999]`}
          >
            <div
              className={`absolute bottom-0 right-0 left-0 ${viewdetailwspopup ? "opacity-100 h-fit" : "opacity-0 h-0 hidden"
                } w-full h-fit duration-1000 transition-all rounded-[8px_8px_0_0] bg-white cursor-default z-[999999999999999999]`}
              ref={viewdetailwssidebar}
            >
              <div className="w-full h-fit">
                <div className="p-[16px] flex justify-between items-center border-b-[1px] border-[#dddddd]">
                  <p className="text-[13px] font-medium uppercase text-[#353543]">
                    RETURN TYPES
                  </p>
                  <button
                    className="m-0 p-0 bg-transparent w-fit h-fit border-none outline-none"
                    type="button"
                    onClick={() => {
                      setviewdetailwspopup(false);
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      iconSize="20"
                      class="w-[20px] h-[20px]"
                    >
                      <path
                        d="M14.3034 15.7767L10.0124 11.4858L5.70897 15.7892C5.24694 16.2512 4.58159 16.3419 4.11956 15.8799C3.65753 15.4178 3.76954 14.7738 4.23157 14.3117L8.53496 10.0083L4.22267 5.69605C3.76064 5.23402 3.65753 4.58108 4.11956 4.11905C4.58159 3.65702 5.22039 3.77427 5.68243 4.2363L9.99472 8.54859L14.3123 4.23106C14.7743 3.76902 15.4183 3.65702 15.8804 4.11905C16.3424 4.58108 16.2517 5.24643 15.7897 5.70846L11.4721 10.026L15.7631 14.317C16.2251 14.779 16.3424 15.4178 15.8804 15.8799C15.4183 16.3419 14.7654 16.2388 14.3034 15.7767Z"
                        fill="#666666"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full pt-[16px] px-[16px] pb-[32px]">
                  <div className="flex justify-between items-center w-full">
                    <div
                      className={`w-[48%] h-[125px] border-[1px] border-[#eaeaf2] rounded-lg`}
                    >
                      <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                        <p className="text-[13px] text-[#616173] font-[600] leading-4">
                          All issue easy returns allowed
                        </p>
                      </div>
                      <div className="p-[10px]">
                        <p className="text-[17px] text-black font-[600]">
                          ₹{+filterdata[0]?.price + 20}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-[48%] h-[125px] border-[1px] border-[#eaeaf2] rounded-lg`}
                    >
                      <div className="w-full h-[48px] border-b-[1px] bg-[#f8f8ff] border-[#eaeaf2] p-[10px] flex  justify-start items-center rounded-t-lg gap-[5px]">
                        <p className="text-[13px] text-[#616173] font-[600] leading-4">
                          Only wrong/defect item returns allowed
                        </p>
                      </div>
                      <div className="p-[10px]">
                        <p className="text-[17px] text-black font-[600]">
                          ₹{+filterdata[0]?.price}
                        </p>
                      </div>
                      <div className="w-full px-[6px] py-[1px]">
                        <div className="flex justify-start gap-1 bg-[rgb(211_244_234)] px-[6px] text-[10px] items-center w-full h-[20px] text-[rgb(3_141_99)] rounded-full">
                          <LazyImage
                            src={homerupeeicon}
                            className="w-[12px] h-[12px] object-contain"
                          />
                          Special Offer | Save ₹3
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-[16px] w-full border-b border-black"></div>
                  <div>
                    <p className="text-[17px] text-[#353543] font-[700] mb-[16px]">
                      Watch this video to know more
                    </p>
                    <div className="bg-black h-[270px] rounded-[10px]">
                      <div className="h-[56px] flex justify-start gap-2 items-center px-[16px] py-[12px]">
                        <button
                          onClick={() => {
                            setvideodata(false);
                          }}
                          className={`rounded-full py-2 px-3 ${videodata === false ? "bg-[#570d48]" : "bg-gray-700"
                            } m-0 border-none outline-none text-[15px] font-bold text-white`}
                          type="button"
                        >
                          English
                        </button>
                        <button
                          onClick={() => {
                            setvideodata(true);
                          }}
                          className={`rounded-full py-2 px-3 ${videodata ? "bg-[#570d48]" : "bg-gray-700"
                            } m-0 border-none outline-none text-[15px] font-bold text-white`}
                          type="button"
                        >
                          Hindi
                        </button>
                      </div>
                      {videodata && (
                        <video
                          controls={true}
                          autoPlay={true}
                          muted={true}
                          className="w-[100%] h-[216px] object-contain overflow-clip"
                          style={{ overflowClipMargin: "content-box" }}
                        >
                          <source
                            src={
                              "https://images.meesho.com/images/marketing/1677653869508.mp4"
                            }
                            type="video/mp4"
                          />
                        </video>
                      )}
                      {videodata === false && (
                        <video
                          controls={true}
                          autoPlay={true}
                          muted={true}
                          className="w-[100%] h-[216px] object-contain overflow-clip"
                          style={{ overflowClipMargin: "content-box" }}
                        >
                          <source
                            src={
                              "https://images.meesho.com/images/marketing/1677653893053.mp4"
                            }
                            type="video/mp4"
                          />
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Productpage;
