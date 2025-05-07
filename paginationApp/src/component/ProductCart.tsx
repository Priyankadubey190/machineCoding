import React from "react";
import styles from "./productCart.module.scss";
import StarRating from "./StarRating";

interface ProductCartProps {
  data: any[];
  start: number;
  end: number;
}

const ProductCart: React.FC<ProductCartProps> = ({ data, start, end }) => {
  return (
    <div className={styles.cardContainer}>
      {data.slice(start, end).map((item: any) => {
        return (
          <div key={item.id} className={styles.card}>
            <img src={item.images[0]} alt={item.title} />
            <div>
              <StarRating rating={item.rating} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>
                <div>{item.title}</div>
                <div>{item.brand}</div>
              </div>
              <div className={styles.price}>
                <div>{item.category}</div>
                <div>Price: {item.price}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCart;
