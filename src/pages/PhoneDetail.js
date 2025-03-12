import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhoneDetail } from "../services/apiService";
import { CartContext } from "../context/CartContext";
import "./PhoneDetail.css";

const PhoneDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [price, setPrice] = useState(0);
  const { addToCart } = useContext(CartContext);

  const getFullImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http")
      ? url
      : `https://prueba-tecnica-api-tienda-moviles.onrender.com${url}`;
  };

  useEffect(() => {
    const loadPhoneDetail = async () => {
      try {
        const data = await fetchPhoneDetail(id);
        console.log("Detalle del teléfono:", data);
        setPhone(data);
        setPrice(data.basePrice || data.price);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhoneDetail();
  }, [id]);

  useEffect(() => {
    if (phone) {
      const basePrice = phone.basePrice || phone.price;
      const storageOption = phone.storageOptions
        ? phone.storageOptions.find(
            (option) => option.capacity === selectedStorage
          )
        : null;

      let colorAdjustment = 0;
      if (selectedColor) {
        if (selectedColor === "Obsidiana") colorAdjustment = 10;
        else if (selectedColor === "Porcelana") colorAdjustment = 20;
        else if (selectedColor === "Celeste") colorAdjustment = 30;
      }

      const finalPrice = storageOption
        ? storageOption.price + colorAdjustment
        : basePrice + colorAdjustment;
      setPrice(finalPrice);
    }
  }, [selectedColor, selectedStorage, phone]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;
    let imageUrl;
    if (phone.colorOptions && phone.colorOptions.length > 0) {
      const selectedOption =
        phone.colorOptions.find((option) => option.name === selectedColor) ||
        phone.colorOptions[0];
      imageUrl = getFullImageUrl(selectedOption.imageUrl);
    } else {
      imageUrl = getFullImageUrl(phone.imageUrl);
    }

    const newItem = {
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      image: imageUrl,
      color: selectedColor,
      storage: selectedStorage,
      price: price,
    };
    addToCart(newItem);
    alert("Producto añadido al carrito");
  };

  const handleSimilarClick = (similarId) => {
    navigate(`/phones/${similarId}`);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!phone) return <div>No se encontró el teléfono</div>;

  let imageSrc;
  if (phone.colorOptions && phone.colorOptions.length > 0) {
    const selectedOption =
      phone.colorOptions.find((option) => option.name === selectedColor) ||
      phone.colorOptions[0];
    imageSrc = getFullImageUrl(selectedOption.imageUrl);
  } else {
    imageSrc = getFullImageUrl(phone.imageUrl);
  }
  const finalImageSrc = imageSrc || "https://via.placeholder.com/300";
  console.log("Image URL final:", finalImageSrc);

  return (
    <div>
      <div className="phone-detail-container">
        <div className="phone-detail-image">
          <img
            src={finalImageSrc}
            alt={phone.name}
            className="phone-detail-image"
          />
        </div>
        <div className="phone-detail-info">
          <h2>{phone.name}</h2>
          <p className="phone-detail-brand">{phone.brand}</p>
          <p className="phone-detail-price">Precio: {price} EUR</p>
          <p className="phone-detail-description">{phone.description}</p>

          <div className="phone-detail-selectors">
            <div className="selector storage-selector">
              <label>STORAGE. HOW MUCH DO YOU NEED?</label>
              <div className="storage-options">
                {phone.storageOptions &&
                  phone.storageOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`storage-btn ${
                        selectedStorage === option.capacity ? "selected" : ""
                      }`}
                      onClick={() => setSelectedStorage(option.capacity)}
                    >
                      {option.capacity}
                    </button>
                  ))}
              </div>
            </div>
            <div className="selector color-selector">
              <label>COLOR. PICK YOUR FAVORITE</label>
              <div className="color-options">
                {phone.colorOptions &&
                  phone.colorOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`color-swatch ${
                        selectedColor === option.name ? "selected" : ""
                      }`}
                      style={{ backgroundColor: option.hexCode }}
                      onClick={() => setSelectedColor(option.name)}
                      title={option.name}
                    ></div>
                  ))}
              </div>
            </div>
          </div>

          <button className="storage-btn"
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            Añadir al carrito
          </button>
          <div className="phone-detail-specs">
            <h3>Especificaciones técnicas</h3>
            <ul>
              {phone.specs &&
              typeof phone.specs === "object" &&
              !Array.isArray(phone.specs) ? (
                Object.entries(phone.specs).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))
              ) : Array.isArray(phone.specs) ? (
                phone.specs.map((spec, index) => <li key={index}>{spec}</li>)
              ) : phone.specs ? (
                <li>{phone.specs}</li>
              ) : (
                <li>No hay especificaciones disponibles para este dispositiov.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="similar-products">
        <h3>PRODUCTOS SIMILARES</h3>
        {phone.similarProducts && phone.similarProducts.length > 0 ? (
          <div className="similar-products-grid">
            {phone.similarProducts.map((similar) => (
              <div
                key={similar.id}
                className="similar-product-card"
                onClick={() => handleSimilarClick(similar.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={getFullImageUrl(similar.imageUrl)}
                  alt={similar.name}
                  className="similar-product-image"
                />
                <h4 className="similar-product-name">{similar.name}</h4>
                <p className="similar-product-brand">{similar.brand}</p>
                <p className="similar-product-price">{similar.price} EUR</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos similares.</p>
        )}
      </div>
    </div>
  );
};

export default PhoneDetail;