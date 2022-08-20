import React from "react";
import { format } from "functions/dom";
import { Link } from "react-router-dom";
import { getRequestThenDispatch } from "hooks";
import Search from "components/SearchComponent";
import ListComponent from "components/ListComponent";
import TourContainerComponent from "components/container/TourContainerComponent";

function HomePage() {
  const { state, callReducer } = getRequestThenDispatch(
    "/api/products",
    "UPDATE_PRODUCTS"
  );

  let Container = TourContainerComponent;

  const list = state.products;

  const callback = function (props) {
    const renderCartButton = (data) => {
      if (state.cart[data.id]) {
        //prettier-ignore
        return <a onClick={() => {callReducer({ dispatch: "REMOVE_FROM_CART", data });}}>
          <span className="material-icons notranslate">remove_shopping_cart</span> Remove
        </a>
      }

      return (
        //prettier-ignore
        <a onClick={() => {callReducer({ dispatch: "ADD_TO_CART", data });}}>
          <span className="material-icons notranslate">add_shopping_cart</span> Add
        </a>
      );
    };
    return (
      <div className="col l4 m6 s6" key={props.id}>
        <div className="card medium animated fadeInUp">
          <div className="card-image">
            <img src={`${props.image_one}`} />
          </div>
          <div className="card-content">
            <center>
              <Link to={{ pathname: `/shop/products/${props.slug}`, props }}>
                {props.title}
              </Link>

              <br />
              <p>{format("NGN", props.price)}</p>
            </center>
          </div>
          <div className="card-action" style={{ fontSize: "1rem" }}>
            <center>
              {renderCartButton(props)}
              <Link to="/shop/cart.html" className="waves-effect">
                <span className="material-icons notranslate">
                  shopping_cart
                </span>{" "}
                Cart
              </Link>
            </center>
          </div>
        </div>
      </div>
    );
  };

  const nav = [
    {
      label: "All Products",
    },
  ];

  return (
    <Container bread={nav}>
      <div className="row">
        <div className="container">
          <Search dispatch="UPDATE_PRODUCTS" endpoint="/api/products/search" />
          <ListComponent {...{ list, callback }} dispatch="UPDATE_PRODUCTS" />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
