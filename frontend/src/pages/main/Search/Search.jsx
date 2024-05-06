// Library
import { useState, useEffect, useRef } from "react";
import { useParams, useOutletContext } from "react-router-dom";

// Assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Components
import Breadcrumbs from "../../../../public/components/Breadcrumbs/Breadcrumbs";
import ProductShelf from "../../../../public/components/ProductShelf/ProductShelf";
import Pagination from "../../../../public/components/Pagination/Pagination";
import Loader from "../../../../public/components/Loader/Loader";
import Filter from "../../../../public/components/Filter/Filter";

// Style
import "./Search.css";
const Search = () => {
  const domain = "http://localhost:8000/api/v1/user/search/product?limit=8&";
  const { key } = useParams();

  const [productList, setProductList] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loadPage, setLoadPage] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const Page = useRef(1);
  // Filter
  //-- Price
  const [priceFilter, setPriceFilter] = useState("");
  const priceFilterList = ["Below $1000", "$1000 to $2000", "Above $2000"];
  const PriceFilter = useRef("price");
  //-- Category
  const [categoryFilter, setCategoryFilter] = useState("");
  const { categoryList } = useOutletContext();
  const categoryFilterList = categoryList.map((category) => category.name);
  const CategoryFilter = useRef("category");

  useEffect(() => {
    setCurrentPage(1);
    setPriceFilter("");
  }, [key]);

  useEffect(() => {

    if (PriceFilter.current !== priceFilter) {
      setLoadPage(true);
      PriceFilter.current = priceFilter;
    }

    if (CategoryFilter.current !== categoryFilter) {
      setLoadPage(true);
      CategoryFilter.current = categoryFilter;
    }

    if (Page.current !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      Page.current = currentPage;
    }

    let fetchDomain = `page=${currentPage}&search=${key}`;
    let priceFetchDomain = "";

    if (priceFilter === "Below $1000") {
      priceFetchDomain = "&sort=price&filter=0,1000";
    } else if (priceFilter === "$1000 to $2000") {
      priceFetchDomain = "&sort=price&filter=1000,2000";
    } else if (priceFilter === "Above $2000") {
      priceFetchDomain = "&sort=price&filter=2000,100000";
    }
    let categoryFetchDomain = "";
    if (categoryFilter !== "") {
      categoryFetchDomain = "&filtercategory=" + categoryFilter;
    }
    fetch(domain + fetchDomain + priceFetchDomain + categoryFetchDomain)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "fail") {
          setEmpty(true);
        } else {
          setEmpty(false);
          setTotalPages(json.totalPage);
          setProductList(json.data);
        }
        setLoadPage(false);
      });
  }, [key, currentPage, priceFilter, categoryFilter]);

  return (
    <>
      <Breadcrumbs crumbList={[{ name: "Search", link: `/search/${key}` }]} />
      <div className="home-section-banner">
        <div className="srch--title">Search results for: "{key}"</div>
        <div className="srch--filter-container">
          <Filter
            filterName={"Category"}
            filter={categoryFilter}
            filterList={categoryFilterList}
            setFilter={setCategoryFilter}
            setCurrentPage={setCurrentPage}
          />
          <Filter
            filterName={"Price"}
            filter={priceFilter}
            filterList={priceFilterList}
            setFilter={setPriceFilter}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {loadPage ? (
        <div className="srch--loader-container">
          <Loader />
        </div>
      ) : (
        <>
          {empty ? (
            <div className="no-res-msg-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="msg-icon" />
              <div>
                Looks like there are no products fit with your search criteria!
              </div>
              <div>
                Try using different keywords, check your spelling or use another
                filter.
              </div>
            </div>
          ) : (
            <>
              {productList && <ProductShelf products={productList} />}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
