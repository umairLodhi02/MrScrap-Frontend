import { Pagination } from "react-bootstrap";

const CustomPagination = ({ currentPage, setCurrentPage, nPages }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <Pagination size="lg" className="bg-dark">
      {pageNumbers.map((pgNum) => {
        return (
          <Pagination.Item
            key={pgNum}
            active={currentPage === pgNum}
            onClick={() => setCurrentPage(pgNum)}
          >
            {pgNum}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default CustomPagination;
