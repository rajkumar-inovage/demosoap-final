import SEO from "~/components/seo";
import { Container, Row, Col } from "reactstrap";
import React, { useContext, useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import StoreContext from "~/context/store";
// import $ from 'jquery'

import GridIcon from "~/components/grid-icon";
import ListIcon from "~/components/list-icon";
const CollectionsPage = ({ data }) => {


  const context = useContext(StoreContext);
  const [sort, setSort] = useState(context.filteredSort)

  useEffect(() => {
    context.updateFilterSort(sort)
  }, [context, sort])

  const sorts = []

  sorts.push(
    <>
      <option key={0} value="featured">
        Featured
      </option>
      <option key={1} value="A-Z">
        Alphabetically, A-Z
      </option>
      <option key={2} value="Z-A">
        Alphabetically, Z-A
      </option>
      <option key={3} value="low">
        Price, low to high
      </option>
      <option key={4} value="high">
        Price, high to low
      </option>
    </>
  )


  const MAX_LENGTH = 100;
  const [gridClass, setGridClass] = useState("col-md-4");
  const [imgClass, setImgClass] = useState("col-md-12");
  const [cntClass, setCntClass] = useState("col-md-12");
  const [displayClass, setDisplayClass] = useState("d-unset");
  const [descClass, setDescClass] = useState("d-none");
  const [rowpriceClass, setRowpriceClass] = useState("d-inline-block");
  const [addcartClass, setAddcartClass] = useState("d-block");
  
  const { checkout } = context;
  const buttonClasses =
    "btn-link bg-transparent border-0 text-decoration-none text-body p-0";
  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "CAD",
      minimumFractionDigits: 2,
      style: "currency"
    }).format(parseFloat(price ? price : 0));
  const toggleGrid = (event, size) => {
    event.preventDefault();
    if (size === 1) {
      setGridClass("col-md-12 one-col");
      setCntClass("col-md-9");
      setDisplayClass("d-flex");
      setDescClass("d-flex");
      setImgClass("col-md-3");
      setRowpriceClass("d-none");
      setAddcartClass("d-none");
    }
    if (size === 2) {
      setGridClass("col-md-6");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
    if (size === 3) {
      setGridClass("col-md-4");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
    if (size === 4) {
      setGridClass("col-md-3");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
  };
  return (
    <>
      <SEO title={data.shopifyCollection.title} />
      <section
        className="collection-banner py-100"
        style={{ backgroundColor: "#e7e7e7" }}
      >
        <Container className="py-0 py-lg-5">
          <Row className="mx-0">
            <Col className="banner-data text-center col-12 mt-5">
              <div
                className="breadcrump josefin-sans"
                style={{ fontSize: "1.3rem" }}
              >
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  <span>Home</span>
                </Link>
                <span> / </span>
                <Link
                  to="/collections"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  <span>Collections</span>
                </Link>
                <span> / </span>
                <span>{data.shopifyCollection.title}</span>
              </div>
              <div className="collection-title mt-4 d-inline-flex">
                <Link
                  to="/collections"
                  className="text-decoration-none d-none d-lg-block"
                  style={{ color: "#000" }}
                >
                  <i
                    className="fa fa-long-arrow-left"
                    style={{ fontSize: "1.8rem" }}
                  ></i>
                </Link>
                <h1
                  className="m-0 josefin-sans-b"
                  style={{
                    fontSize: "2.5rem",
                    color: "#000",
                    lineHeight: "24px"
                  }}
                >
                  {data.shopifyCollection.title}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5">
        <Container>
          <Row className="mx-0">
            <Col className="col-6 d-none d-lg-block">
              <button onClick={e => toggleGrid(e, 1)} className={buttonClasses}>
                <ListIcon />
              </button>
              <button
                onClick={e => toggleGrid(e, 2)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">2</sup>
              </button>
              <button
                onClick={e => toggleGrid(e, 3)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">3</sup>
              </button>
              <button
                onClick={e => toggleGrid(e, 4)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">4</sup>
              </button>
            </Col>
            <Col className="col-6 text-right">
            <label htmlFor="sortBy" className="has-text-weight-semibold is-uppercase" style={{ margin: "-20px" }}>SORT BY :
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          defaultValue={sort}
                          onBlur={e => setSort(e.target.value)}
                          id="sortBy"
                        >
                          {sorts}
                        </select>
                      </div>
                    </div>
                  </div>
                </label>
            </Col>
          </Row>
          <Row className="mt-3 mt-lg-5 product-layout">

                

            {data.shopifyCollection.products ? (
              data.shopifyCollection.products.map(
                ({ id, title, handle, description, images, priceRange }) => (
                  <div className={gridClass + " mb-3 mb-lg-5"}>
                    <div className={displayClass + " trending-products"}>
                      <div className={imgClass}>
                        <Link to={`/product/${handle}/`} className="">
                          <div className="tp-image">
                            {images[0] &&
                              images[0].localFile.childImageSharp.fluid.src && (
                                <img
                                  src={
                                    images[0].localFile.childImageSharp.fluid
                                      .src
                                  }
                                  alt=""
                                />
                              )}

                            <div className="add-to-cart d-inline w-auto p-0">
                              <button
                                className={addcartClass + " josefin-sans-b cart-btn border border-dark btns position-relative"}
                                style={{ fontSize: "0.8rem" }}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className={cntClass}>
                        <div className="tp-details">
                          <div className="review-and-price d-block mt-3">
                            <span className="star-value d-none w-50 pl-2 pl-lg-3">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <span
                              className={
                                rowpriceClass +
                                " price josefin-sans-sb text-right w-100 pr-2 pr-lg-3"
                              }
                              style={{ fontSize: "1.2rem", color: "#000" }}
                            >
                              {getPrice(priceRange.maxVariantPrice.amount)}
                            </span>
                          </div>

                          <Link
                            to={`/product/${handle}/`}
                            className="josefin-sans-b mt-2 d-block"
                            style={{ textDecoration: "none" }}
                          >
                            <h3
                              className=""
                              style={{ fontSize: "1.8rem", color: "#000" }}
                            >
                              {title}
                            </h3>
                          </Link>
                          <div className={descClass}>
                            <span
                              className="price josefin-sans-b d-inline-block text-left w-50 pr-2 pr-lg-3"
                              style={{ fontSize: "1.2rem", color: "#000" }}
                            >
                              {getPrice(priceRange.maxVariantPrice.amount)}
                            </span>
                          </div>
                          <div className={descClass + " p-desc"}>
                            <div className="desc-p col-12 col-lg-9 px-0">
                              <p
                                className="josefin-sans"
                                style={{ fontSize: "1.2rem" }}
                              >
                                {description.substring(0, MAX_LENGTH)}...
                              </p>
                              <Link
                                to={`/product/${handle}/`}
                                className="more josefin-sans-sb text-decoration-none position-relative"
                                style={{ fontSize: "1.3rem", color: "#000" }}
                              >
                                More
                              </Link>
                            </div>
                            <div
                              className="atc text-center col-12 col-lg-3 px-0"
                              style={{ minWidth: "150px" }}
                            >
                              <Link
                                to={`/product/${handle}/`}
                                className="text-decoration-none px-3 py-3 d-block josefin-sans-b cart-btn border border-dark btns position-relative"
                                style={{ fontSize: "0.8rem" }}
                              >
                                ADD TO CART
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No Products found!</p>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};
export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      handle
      products {
        handle
        title
        description
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          altText
          localFile {
            childImageSharp {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
`;

export default CollectionsPage;
