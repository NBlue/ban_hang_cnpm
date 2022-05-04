import { useState } from "react";
import "./newVoucher.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addVoucher } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewVoucher() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        alert("Upload is " + progress + "% done");
        
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error)
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const voucher = { ...inputs, img: downloadURL };
          addVoucher(voucher, dispatch);
        });
      }
    );
   
  };
  console.log(file)
  return (
    <div className="newVoucher">
      <h1 className="addVoucherTitle">New Voucher</h1>
      <form className="addVoucherForm">
        <div className="addVoucherItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addVoucherItem">
          <label>Value</label>
          <input
            name="value"
            type="number"
            placeholder="30"
            onChange={handleChange}
          />
        </div>
        <div className="addVoucherItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addVoucherItem">
          <label>Minpaid</label>
          <input
            name="min"
            type="number"
            placeholder="100000"
            onChange={handleChange}
          />
        </div>
        <div className="addVoucherItem">
        <label>Date</label>
          <input type="date" name="day" onChange={handleChange} />
        </div>
        
        <button onClick={handleClick} className="addVoucherButton">
          Create
        </button>
      </form>
    </div>
  );
}
