import React from "react";
import { useNavigate } from "react-router-dom";
import "./PhoneCard.css";

const PhoneCard = ({ phone }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/phones/${phone.id}`);
  };

  //url relativa  siempre!!!
  const imageUrl = phone.imageUrl.startsWith("http")
    ? phone.imageUrl
    : `https://prueba-tecnica-api-tienda-moviles.onrender.com${phone.imageUrl}`;

  return (
    <div
      className="phone-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imageUrl} alt={phone.name} className="phone-card-image" />
      <h3 className="phone-card-name">{phone.name}</h3>
      <p className="phone-card-brand">{phone.brand}</p>
      <p className="phone-card-price">{phone.basePrice} EUR</p>
    </div>
  );
};

export default PhoneCard;