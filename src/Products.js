import product1 from "./images/t-shirt oversize.png";
import product2 from "./images/oversized tshirt.png";
import product3 from "./images/white tshirt.png";
import product4 from "./images/Socks.jpg";

// nested Images for first product
import img1 from "./images/t-shirt oversize.png";
import img2 from "./images/Black oversized t shirt.png";
import img3 from "./images/white t-shirt oversize 2.png";

// nested images for second product
import img4 from "./images/oversized tshirt.png";
import img5 from "./images/white t-shirt oversize 3.png";
import img6 from "./images/white t-shirt oversize 3 women.png";

// nested images for second product
import img7 from "./images/white tshirt.png";
import img8 from "./images/apple airpods.jfif";
import img9 from "./images/iphone.jpg";

// nested images for second product
import img10 from "./images/Socks.jpg";
import img11 from "./images/Black socks SIGMA leftside.png";
import img12 from "./images/Black and white socks SIGMA backside.png";
import img13 from "./images/gymsharkSocks.jpg";

// JSON tree database
const PRODUCTS = [
  {
    id: 0,
    productName: "T-Shirt Oversize",
    price: 89.0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["dark", "warning"],
    productImage: product1,
    nestedImgs: [
      { id: 0, imgPrd: img1 },
      { id: 1, imgPrd: img2 },
      { id: 2, imgPrd: img3 },
      { id: 3, imgPrd: img1 },
    ],
    stock: 10,
    featured: true,
  },
  {
    id: 1,
    productName: "Sweatshirt Oversize",
    price: 120.0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["dark", "warning"],
    productImage: product2,
    nestedImgs: [
      { id: 0, imgPrd: img4 },
      { id: 1, imgPrd: img5 },
      { id: 2, imgPrd: img6 },
      { id: 3, imgPrd: img4 },
    ],
    stock: 0,
    featured: true,
  },
  {
    id: 2,
    productName: "White T-shirt",
    price: 89.0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["dark", "warning"],
    productImage: product3,
    nestedImgs: [
      { id: 0, imgPrd: img7 },
      { id: 1, imgPrd: img8 },
      { id: 2, imgPrd: img9 },
      { id: 3, imgPrd: img7 },
    ],
    stock: 7,
    featured: true,
  },
  {
    id: 3,
    productName: "Black Socks Sigma",
    price: 7.0,
    sizes: ["S", "M", "L", "XL"],
    colors: ["dark", "warning"],
    productImage: product4,
    nestedImgs: [
      { id: 0, imgPrd: img10 },
      { id: 1, imgPrd: img11 },
      { id: 2, imgPrd: img12 },
      { id: 3, imgPrd: img13 },
    ],
    stock: 3,
    featured: true,
  },
];

export default PRODUCTS;
