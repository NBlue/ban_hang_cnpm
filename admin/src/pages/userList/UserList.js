import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { getUsers } from "../../redux/apiCalls";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    getUsers(dispatch);
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "username", headerName: "username", width: 220 },   
   
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 220,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Show</button>
            </Link>
            
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
