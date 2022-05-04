import "./voucherList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVoucher, getVouchers } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.voucher.vouchers);

  useEffect(() => {
    getVouchers(dispatch);
  }, []);

  const handleDelete = (id) => {
    deleteVoucher(id, dispatch);
  };
  
  const columns = [
    { field: "desc", headerName: "Description", width: 220 },
    { field: "value", headerName: "Value(%)", width: 200 },
    { field: "day", headerName: "Date", width: 220 },
    {
      field: "min",
      headerName: "Minpaid",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/voucher/" + params.row._id}>
              <button className="voucherListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="voucherListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="voucherList">
      <DataGrid
        rows={vouchers}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
