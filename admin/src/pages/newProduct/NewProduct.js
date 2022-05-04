import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color,setColor]=useState("")
  const dispatch = useDispatch();

  const handleChange = (e) => {
      if(e.target.type=="checkbox"){
        let colors=[...color];
        if(e.target.checked==true){
          console.log(colors)
          colors.push(e.target.value)
          setColor(colors)
        }
        
        else{
        let filterResult = colors.filter(function(element){
            return element !== e.target.value;
          }
          );
          setColor(filterResult);

        };
        setInputs((prev) => {
          return { ...prev, color };
      })
    }
        
        else{
          setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        }
       
    );
  };

  }
  const handleCat = (e) => {
    setCat(e.target.value);
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
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
        });
      }
    );
  };
  console.log(file)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Color</label>
          <div className="Item"><input type='checkbox' value="white" onChange={handleChange}/><p>Trắng</p></div>
          <div className="Item"><input type='checkbox' value="pink" onChange={handleChange}/><p>Hồng</p></div>
          <div className="Item"><input type='checkbox' value="green" onChange={handleChange}/><p>Xanh lá</p></div>
          <div className="Item"><input type='checkbox' value="black" onChange={handleChange}/><p>Đen</p></div>
          <div className="Item"><input type='checkbox' value="blue" onChange={handleChange}/><p>Xanh biển</p></div>
          <div className="Item"><input type='checkbox' value="yellow" onChange={handleChange}/><p>Vàng</p></div>
        </div>

        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,shirt,jacket" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
