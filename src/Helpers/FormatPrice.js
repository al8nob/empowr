const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("fr-TN", {
    currency: "TND",
    style: "currency",
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormatPrice;
