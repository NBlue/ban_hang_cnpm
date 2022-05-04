import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link,useLocation } from "react-router-dom";
import "./user.css";
import { useDispatch,useSelector } from "react-redux";
export default function User() {
  const dispatch=useDispatch();
  const location = useLocation();
  const usersId = location.pathname.split("/")[2];
  
  
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === usersId)
  );
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User</h1>
       
      </div>
      <div className="userContainer">
        
        <div className="userUpdate">
          <span className="userUpdateTitle">Information</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>CreatedAt</label>
                <input
                  type="text"
                  placeholder={user.createdAt}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
