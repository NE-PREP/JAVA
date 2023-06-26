import { useEffect, useState } from "react";
import { API_URL, API_DATA_LIMIT, sendRequest } from "../utils/Api";
import TablePagination from "../components/table/TablePagination";
import TableComponent from "../components/table/TableComponent";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadData() {
      let response = await sendRequest(API_URL + "/users/current-user", "GET");
      if(response?.data?.data?.role != "ADMIN") navigate("/products")
    }
    loadData();
  }, []);


  const changePage = async (newPage) => {
    if (newPage !== data.currentPage) {
      setLoading(true);
      await fetchTableData(newPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await fetchTableData(0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const fetchTableData = async (page) => {
    let response = await sendRequest(
      API_URL + `/product-purchased/all/paginated?page=${page}&limit=${API_DATA_LIMIT}`,
      "GET"
    );
    setData(response?.data?.data?.content);
    setCurrentPage(response?.data?.data?.number);
    setPages(response?.data?.data?.totalPages);
    return response;
  };

  const transformData = (data) => {
    return data.map((item,index) => {
      return {
        No: index + 1,
        customerName: item?.customer?.firstname,
        date: item?.createdAt,
        productCode: item?.productQuantity?.product?.code,
        productName: item?.productQuantity?.product?.name,
        quantity: item?.productQuantity?.quantity,
        unitPrice: `${item?.productQuantity?.product?.price} RWF`,
        total: `${item?.total} RWF`
      };
    });
  };

  const tableHeaders = [
    "No",
    "Customer name",
    "Date",
    "Product code",
    "Product name",
    "Quantity",
    "Unit price",
    "Total"
  ];

  return (
    <>
      <h2>Purchasing Report</h2>
      <TableComponent
        headers={tableHeaders}
        data={transformData(data)}
        loading={loading}
      />
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
    </>
  );
};
