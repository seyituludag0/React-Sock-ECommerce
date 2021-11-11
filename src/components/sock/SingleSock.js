import React, { useState, useEffect } from "react";
import SockService from "../../services/SockService";
import AllSockPageAddToCartButton from "../../layouts/allSockPageAddToCartButton/AllSockPageAddToCartButton";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import compare from "../sock/img/icon/compare.png";
import disCompare from "../sock/img/icon/discompare.png";
import search from "../sock/img/icon/search.png";
import FavoriteService from "../../services/FavoriteService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addToComparison,
  removeToComparison,
} from "../../store/actions/compareAction";
import empytFavorite from "./img/icon/empytFavorite.png"
import favoriteAdded from "./img/icon/favoriteAdded.png"

export default function SingleSock({ products, addToCompare, removeToCompare }) {
  let favoriteService = new FavoriteService();
  let sockService = new SockService();

  const [socks, setSocks] = useState([]);
  const [addedCompare, setAddedCompare] = useState(false);
  const [addedFavorite, setAddedFavorite] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const dispatch = useDispatch();

  const product = products;

  useEffect(() => {
    sockService
      .getAllPagination(activePage, pageSize)
      .then((result) => setSocks(result.data.data));
  }, [activePage, pageSize]);



  const handleAddFavorite = (sockId) => {
    setAddedFavorite(true);
    favoriteService.addFavorites(106, sockId)
      .then((result) => toast.success(result.data.message));
  };

  const handleRemoveFromFavorite = (sockId) => {
    setAddedFavorite(false);
    favoriteService.removeFromFavorites(106, sockId)
      .then((result) => toast.success("Favorilerinizden kaldırıldı"));
  };

  const checkFavoriteByCustomer = (sockId) =>{
    favoriteService.existsByCustomerIdAndSockId(106, sockId).then((result)=>console.log(result.data))
  } 

  const addToCompareProduct = (product) => {
    setAddedCompare(true);
    dispatch(addToComparison(product));
  };

  const removeToCompareProduct = (product) => {
    setAddedCompare(false);
    dispatch(removeToComparison(product));
  };

  const favoriteFunctions = () => {
    handleAddFavorite(1);
    checkFavoriteByCustomer(1)
  }

  return (
    <div>
      <div className="product__item" key={product.id}>
        <div className="product__item__pic set-bg">
          <img src={product.sockImage?.image1} alt={product.name} />
          <ul className="product__hover">
            <li>
            {addedFavorite ? (
                <>
                  <img
                    src={favoriteAdded}
                    alt="compare-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemoveFromFavorite(product.id)}
                  />
                  <span>Kaldır</span>
                </>
              ) : (
                <>
                  <img
                    src={empytFavorite}
                    alt="compare-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => favoriteFunctions()}
                  />
                  <span>Favorilere Ekle</span>
                </>
              )}
            </li>
            <li>
              {addedCompare ? (
                <>
                  <img
                    src={disCompare}
                    alt="compare-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeToCompareProduct(product)}
                  />
                  <span>Kaldır</span>
                </>
              ) : (
                <>
                  <img
                    src={compare}
                    alt="compare-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => addToCompareProduct(product)}
                  />
                  <span>Karşılaştır</span>
                </>
              )}
            </li>
            <li>
              <Link to={`/sock-detail/${product.id}`}>
                <img src={search} alt="search-icon" />
                <span style={{ left: "-7rem" }}>Detayları Gör</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6> {product.name} </h6>
          <AllSockPageAddToCartButton sock={product} />
          <div className="rating">
            <Rating name="read-only" value={3} readOnly />
          </div>
          <h5> {product.price}₺</h5>
          <div className="product__color__select">
            <label htmlFor="pc-4">
              <input type="radio" id="pc-4" />
            </label>
            <label className="active black" htmlFor="pc-5">
              <input type="radio" id="pc-5" />
            </label>
            <label className="grey" htmlFor="pc-6">
              <input type="radio" id="pc-6" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
