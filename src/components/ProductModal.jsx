/* eslint-disable react/prop-types */
import Modal from "react-modal";

const ProductModal = ({ product, onClose }) => (
  <Modal
    isOpen
    onRequestClose={onClose}
    ariaHideApp={false}
    style={{
      overlay: {
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "500px",
        maxHeight: "80%",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        overflow: "auto",
        fontFamily: "'Murecho', sans-serif",
      },
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "50%", height: "50%", borderRadius: "10px" }}
      />
    </div>
    <h2>{product.title}</h2>
    <p>{product.description}</p>
    <p>Price: ৳{product.price}</p>
    <button
      onClick={onClose}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1em",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
    >
      Close
    </button>
  </Modal>
);

export default ProductModal;
