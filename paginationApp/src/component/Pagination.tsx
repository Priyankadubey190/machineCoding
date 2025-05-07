import React from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  handlePageChange,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className={styles.container}>
      <button
        disabled={currentPage === 1}
        className={`${styles.navButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevPage}
      >
        Prev
      </button>
      {[...Array(totalPages).keys()].map((n, i) => {
        console.log("n", n, "i", i, "currentPage", currentPage);
        return (
          <button
            key={i}
            className={`${styles.pageNumber} ${
              currentPage === i + 1 ? styles.active : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        );
      })}
      <button
        disabled={currentPage === totalPages}
        className={`${styles.navButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
