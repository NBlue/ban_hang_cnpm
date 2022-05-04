import { Link, useLocation } from "react-router-dom";
import "./voucher.css";
import Chart from "../../components/chart/Chart";
import { voucherData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {updateVoucher} from "../../redux/apiCalls";
import { getVoucher } from "../../redux/apiCalls";
export default function Voucher() {
  const dispatch=useDispatch();
  const location = useLocation();
  let voucherId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  if (voucherId.indexOf("?")!=-1) voucherId=voucherId.pathname.split("?")[0];
  console.log(voucherId)
  const voucher = useSelector((state) =>
    state.voucher.vouchers.find((voucher) => voucher._id === voucherId)
  );
 console.log(voucher)
  const [value,setValue]=useState(voucher.value);
  const [desc,setDesc]=useState(voucher.desc);
  const [day,setDay]=useState(voucher.day);
 
  const [min,setMin]=useState(voucher.min);
  
  const handleChange=(e)=>{
    const name=e.target.name;
    console.log(name);
    if(name=="day") setDay(e.target.value);
    if(name=="desc") setDesc(e.target.value);
    if(name=="min") setMin(e.target.value);
    if(name=="value") setValue(e.target.value);
  }
  const handleUpdate=(e,id)=>{
    updateVoucher(id,{value,desc,day,min},dispatch);
    alert("Sửa thành công")
  }
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    console.log(voucher)
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + voucherId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [voucherId, MONTHS]);

  return (
    <div className="voucher">
      <div className="voucherTitleContainer">
        <h1 className="voucherTitle">Voucher</h1>
        <Link to="/newvoucher">
          <button className="voucherAddButton">Create</button>
        </Link>
      </div>
      <div className="voucherTop">
        <div className="voucherTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="voucherTopRight">
          <div className="voucherInfoTop">
            <img src={voucher.img} alt="" className="voucherInfoImg" />
            <span className="voucherName">{voucher.title}</span>
          </div>
          <div className="voucherInfoBottom">
            <div className="voucherInfoItem">
              <span className="voucherInfoKey">id:</span>
              <span className="voucherInfoValue">{voucher._id}</span>
            </div>
            <div className="voucherInfoItem">
              <span className="voucherInfoKey">sales:</span>
              <span className="voucherInfoValue">5123</span>
            </div>
            
          </div>
        </div>
      </div>
      <div className="voucherBottom">
        <form className="voucherForm">
          <div className="voucherFormLeft">
            <label>Voucher value</label>
            <input type="text" name="value" placeholder={voucher.value} onChange={(e)=>{handleChange(e)}} />
            <label>Voucher Description</label>
            <input type="text" name="desc" placeholder={voucher.desc} onChange={(e)=>{handleChange(e)}} />
            <label>Date</label>
            <input type="date" name="day" placeholder={voucher.day} onChange={(e)=>{handleChange(e)}}/>
            <label>Minpaid</label>
            <input type="text" name="min" placeholder={voucher.min} onChange={(e)=>{handleChange(e)}}/>
            
          </div>
          <div className="voucherFormRight">
            <div className="voucherUpload">
              <img src={voucher.img} alt="" className="voucherUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <Link to="/vouchers">
            <button  className="voucherButton" onClick={(e)=>{handleUpdate(e,voucher._id)}}>Update</button>

            </Link>
            
          
          </div>
        </form>
      </div>
    </div>
  );
}
