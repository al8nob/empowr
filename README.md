# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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
import img12 from "./images/2661458.jpg";

const PRODUCTS = [
{
id: 0,
productName: "White T-Shirt Oversize",
price: 50.0,
sizes: [
{ sizeId: 0, size: "S" },
{ sizeId: 1, size: "M" },
{ sizeId: 2, size: "L" },
{ sizeId: 3, size: "XL" },
],
colors: ["black", "white"],
productImage: product1,
nestedImgs: [
{ id: 0, imgPrd: img1 },
{ id: 1, imgPrd: img2 },
{ id: 2, imgPrd: img3 },
{ id: 3, imgPrd: img1 },
],
availability: true,
},
{
id: 1,
productName: "White Sweatshirt Oversize",
price: 50.0,
sizes: [
{ sizeId: 0, size: "S" },
{ sizeId: 1, size: "M" },
{ sizeId: 2, size: "L" },
{ sizeId: 3, size: "XL" },
],
colors: ["black", "white"],
productImage: product2,
nestedImgs: [
{ id: 0, imgPrd: img4 },
{ id: 1, imgPrd: img5 },
{ id: 2, imgPrd: img6 },
{ id: 3, imgPrd: img4 },
],
availability: false,
},
{
id: 2,
productName: "White T-shirt",
price: 50.0,
sizes: [
{ sizeId: 0, size: "S" },
{ sizeId: 1, size: "M" },
{ sizeId: 2, size: "L" },
{ sizeId: 3, size: "XL" },
],
colors: ["black", "white"],
productImage: product3,
nestedImgs: [
{ id: 0, imgPrd: img7 },
{ id: 1, imgPrd: img8 },
{ id: 2, imgPrd: img9 },
{ id: 3, imgPrd: img7 },
],
availability: false,
},
{
id: 3,
productName: "Black Socks Sigma",
price: 50.0,
sizes: [
{ sizeId: 0, size: "S" },
{ sizeId: 1, size: "M" },
{ sizeId: 2, size: "L" },
{ sizeId: 3, size: "XL" },
],
colors: ["black", "white"],
productImage: product4,
nestedImgs: [
{ id: 0, imgPrd: img10 },
{ id: 1, imgPrd: img11 },
{ id: 2, imgPrd: img12 },
{ id: 2, imgPrd: img10 },
],
availability: true,
},
];

export default PRODUCTS;
