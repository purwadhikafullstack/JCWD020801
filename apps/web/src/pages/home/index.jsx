import { Navbar } from "../navbar"
import { useEffect, useState } from "react"
import { RxDotFilled } from "react-icons/rx"
import { CgLoadbar } from "react-icons/cg"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import arrowLong from '../../assets/home/arrow-long-up.svg'
import { ProductCards } from "./components/productCards"
import { BrowseProducts } from "./components/browseProducts"
import { Footer } from "../footer"
import homeLogin from '../../assets/home/home-login.jpg'
import { Link } from "react-router-dom"
import { DiscountedProducts } from "./components/discountedProducts"
import { useSelector } from "react-redux"
import slide1 from "../../assets/home/img-slides-1.png"
import slide2 from "../../assets/home/img-slides-2.png"
// import slide3 from "../../assets/home/img-slides-3.jpg"
import slide4 from "../../assets/home/img-slides-4.png"
import slide7 from "../../assets/home/img-slides-7.png"
import axios from "../../api/axios"
import { GrocerySteps } from "./components/grocerySteps"

const imgSlides = [
  { url: slide7 },
  { url: slide1 },
  { url: slide2 },
  // { url: slide3 },
  { url: slide4 },
]

export const HomePage = () => {
  const customer = useSelector((state) => state.customer.value);
  const [currentIndex, setCurrentIndex] = useState(0)

  const { coordinates, loaded } = useSelector((state) => state.geolocation);
  const [branchData, setBranchData] = useState(null);

  const [nearestBranchProduct, setNearestBranchProduct] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [branchId, setBranchId] = useState()

  const fetchNearestBranch = async () => {
    if (loaded) {
      try {
        const response = await axios.post(
          `branches/get-nearest?latitude=${coordinates.lat}&longitude=${coordinates.lng}`,
        );
        setBranchData(response.data.result[0]);
        fetchNearestBranchProduct(response.data.result[0].id)
        setBranchId(response.data.result[0].id)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchMainBranch = async () => {
    try {
      const response = await axios.get('branches/super-store');
      setBranchData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNearestBranchProduct = async (branch_id) => {
    try {
      const response = await axios.get(`products/all?page=1&sortBy=createdAt&sortOrder=desc&branch_id=${branch_id}&category_id=${categoryId}`)
      setNearestBranchProduct(response.data.result.rows)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (coordinates === null) {
      console.log('Location permission denied. Fetching data from main store.');
      fetchMainBranch();
    } else if (coordinates && loaded) {
      console.log(
        'Location permission granted. Fetching data from nearest store.',
      );
      fetchNearestBranch();
    }
  }, [loaded, coordinates?.lat, coordinates?.lng, categoryId]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imgSlides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === imgSlides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const [categoryList, setCategoryList] = useState([])

  const getCategory = async () => {
    try {
      const response = await axios.get(`/categories/all?all=true}`)
      setCategoryList(response.data.result.rows)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getCategory();
  }, [])

  return (
    <>
      <Navbar />
      {/* ----- Hero Section ----- */}
      {/* <div className="mx-[16px] md:mx-[32px] lg:mx-[160px] h-[80vh] md:h-[35vh] lg:h-[40vh] xl:h-[50vh] mt-4 mb-3 flex flex-col"> */}
      <div className="mx-[16px] md:mx-[32px] lg:mx-[160px] mt-4 mb-3 flex flex-col h-[65vh] md:h-[35vh] lg:40-[vh] xl:h-[42vh]">
        {/* Hero: Img & Text */}
        <div className="flex flex-col md:flex-row w-full h-full rounded-2xl border border-[#D1D5D8] hover:shadow-md">
          <div className="flex flex-col py-6 px-7 gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col text-[28px] md:text-[28px] font-semibold md:max-w-[380px] lg:max-w-[350px]">
                <h1 className="tracking-tight"> <span className="bg-gradient-to-r from-[#86CBB8] to-[#067627] text-transparent bg-clip-text">Fresh Groceries</span> at Your Doorstep!</h1>
              </div>
              <span className="text-gray-600 max-w-[240px] text-[15px]">
                get the best fresh foods, drinks, household goods, health care, and many more
              </span>
            </div>
            <Link to={'/catalogue'}>
              <button
                type="submit"
                className="gap-2.5 flex items-center mt-4 md:mt-3 rounded-full bg-[#28302A] px-4 py-2.5 w-max text-[14px] font-medium text-white transition delay-100 ease-in-out hover:bg-[#151a17] "
              >
                <span>Shop Now</span>
                <img src={arrowLong} alt="" className="pt-[0.1rem]" />
              </button>
            </Link>
          </div>
          <div className="w-full h-full relative group">
            <div
              style={{ backgroundImage: `url(${imgSlides[currentIndex].url})` }}
              className="w-full h-full rounded-bl-2xl rounded-br-2xl md:rounded-bl-none md:rounded-r-2xl bg-center bg-cover duration-500"
            ></div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex justify-center items-center gap-2">
        {/* Left arrow */}
        <div className="rounded-full text-[#BFBFBF] hover:text-gray-800 cursor-pointer">
          <IoIosArrowBack onClick={prevSlide} size={22} />
        </div>
        <div className="flex items-center justify-center">
          {imgSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`${currentIndex === slideIndex
                ? 'text-gray-800 text-4xl'
                : 'text-[#BFBFBF] hover:text-gray-800 text-2xl'
                }  cursor-pointer `}
            >
              {currentIndex === slideIndex ? <CgLoadbar /> : <RxDotFilled />}
            </div>
          ))}
        </div>
        {/* Right arrow */}
        <div className="rounded-full text-[#BFBFBF] hover:text-gray-800 cursor-pointer">
          <IoIosArrowForward onClick={nextSlide} size={22} />
        </div>
      </div>
      <ProductCards branchData={branchData} coordinates={coordinates} />
      <DiscountedProducts />
      <BrowseProducts product={nearestBranchProduct} categoryList={categoryList} setCategoryId={setCategoryId} branchId={branchId} />
      {/*  */}
      {/* bg-[#f9f9f9]  */}
      <GrocerySteps />
      {!customer.firstname && (
        <div className="px-[16px] md:px-[32px] lg:px-[160px] pb-[3rem] mt-[3rem] flex flex-col">
          {/* Create Account Banner */}
          <div className="flex bg-white flex-col md:flex-row mx-auto h-full rounded-2xl border border-[#D1D5D8] hover:shadow-md">
            <div className="flex flex-col py-6 px-7 gap-2 justify-between mr-20 w-full md:w-max">
              <div className="flex flex-col gap-1.5">
                <span className="whitespace-pre tracking-tight font-semibold text-[24px] bg-gradient-to-r from-[#86CBB8] to-[#067627] text-transparent bg-clip-text">Create Your Account</span>
                <span className="text-gray-600 text-[15px] font-normal">
                  Enjoy even more discounts with a digital account
                </span>
              </div>
              <Link to={'/register'}>
                <button
                  type="submit"
                  className="gap-2.5 flex items-center mt-4 md:mt-3 rounded-full bg-[#28302A] px-4 py-2.5 w-max text-[13.5px] font-medium text-white transition delay-100 ease-in-out hover:bg-[#151a17] "
                >
                  <span>Sign Up</span>
                  <img src={arrowLong} alt="" className="pt-[0.1rem]" />
                </button>
              </Link>
            </div>
            <div className="w-full h-full relative">
              <img src={homeLogin} alt="" className="h-[150px] md:h-[200px] w-full rounded-bl-2xl rounded-br-2xl md:rounded-bl-none md:rounded-r-2xl object-cover" />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
} 