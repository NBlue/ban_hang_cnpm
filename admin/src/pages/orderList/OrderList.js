import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../redux/apiCalls";

export default function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
 console.log(orders);
  useEffect(() => {
    getOrders(dispatch);
  }, []);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "userId", headerName: "userId", width: 220 },
    
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
