import { useState, useEffect } from "react";
import { RiLoader2Line } from "react-icons/ri";

import styles from "./app.module.scss";
import ProductCart from "./component/ProductCart";
import Pagination from "./component/Pagination";

const productsPerPage = 10;

function App() {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=500`);
    const data = await response.json();
    setData(data.products);
  };

  const totalProducts = data.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Pagination</h1>
      <>
        {data.length === 0 ? (
          <div className={styles.loader}>
            <RiLoader2Line />
          </div>
        ) : (
          <ProductCart data={data} start={start} end={end} />
        )}
      </>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}

export default App;
