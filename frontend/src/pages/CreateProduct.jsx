
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   createProfiles,
//   getProfileDetail,
//   editProfiles,
// } from "../api/profileService";
// import { useParams, useNavigate } from "react-router-dom";
// import "../index.css";


import { useState, useEffect } from "react";
import axios from "axios";
import {
  createProducts,
  getProductDetail,
  editProducts
} from "../api/productService";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

function CreateProduct() {
// function CreateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    Name: "",
    Type: "",
    Category: "",
    Description: "",
    Price: "",
    Price_Type: "",
    Customizable: "",
    Available: "true",
  });

  const [selectedFile, setSelectedFile] = useState([]);

  // ---------------- FETCH PRODUCT (EDIT MODE) ----------------
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProduct = async () => {
      try {
        const res = await getProductDetail(id);

        const data = res.data;

        setFormData({
          Name: data.Name || "",
          Type: data.Type || "",
          Category: data.Category || "",
          Description: data.Description || "",
          Price: data.Price || "",
          Price_Type: data.Price_Type || "",
          Customizable: data.Customizable || "",
          Available:
            data.Available !== undefined
              ? data.Available.toString()
              : "true",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const productCategories = [
    "Bouquet",
    "Varmala",
    "Flower Jewellery",
    "Other",
  ];
  
  const serviceCategories = [
    "Wedding Decoration",
    "Car Decoration",
    "Home Decoration",
    "Festival Decoration",
    "Pratima Decoration",
    "Stage Decoration",
    "Other",
  ];

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- HANDLE FILE ----------------
  const handleFileChange = (e) => {
    setSelectedFile((prev) => [
      ...prev,
      ...e.target.files
    ]);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();

      Object.keys(formData).forEach((key) => {
        userData.append(key, formData[key]);
      });

      selectedFile.forEach((file) => {
        userData.append("imageURL", file);
      });

      let res;

      if (isEditMode) {
        res = await editProducts(id, userData);
      } else {
        res = await createProducts(userData);
      }

      alert(
        `Product ${res.data.Name} ${
          isEditMode ? "updated" : "created"
        } successfully`
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const star = <span className="text-red-500">*</span>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit Listing" : "Add New Listing"}
        </h1>

        <p className="text-gray-500 mt-2">
          Add your flower products and decoration services
        </p>
      </div>

      <div className="flex justify-center">

        <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8">

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-8">

              {/* LEFT */}
              <div>

                {/* Name */}
                <label>
                  Listing Name {star}
                </label>

                <input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="e.g. Red Rose Bouquet"
                  required
                  className="input-field"
                />
                {/* Type */}
                <label className="mt-4">
                  Listing Type {star}
                </label>

                <select
                  name="Type"
                  value={formData.Type}
                  onChange={(e) => {
                    handleChange(e);
                  
                    // Reset category when type changes
                    setFormData((prev) => ({
                      ...prev,
                      Type: e.target.value,
                      Category: "",
                    }));
                  }}
                  required
                  className="input-field"
                >
                  <option value="">Select Type</option>
                
                  <option value="product">
                    Product
                  </option>
                
                  <option value="service">
                    Service
                  </option>
                </select>
                
                
                {/* Category */}
                <label className="mt-4">
                  Category {star}
                </label>
                
                <select
                  name="Category"
                  value={formData.Category}
                  onChange={handleChange}
                  required
                  disabled={!formData.Type}
                  className="input-field"
                >
                  <option value="">
                    {formData.Type
                      ? "Select Category"
                      : "Select Type First"}
                  </option>
                    
                  {(formData.Type === "product"
                    ? productCategories
                    : formData.Type === "service"
                    ? serviceCategories
                    : []
                  ).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {formData.Category === "Other" && ( <input type="text" name="Other_Category" value={formData.Other_Category} onChange={handleChange} placeholder={ formData.Type === "product" ? "Enter custom product category" : "Enter custom service category" } required className="input-field mt-2" /> )}

                {/* Price */} 
                <label className="mt-4">
                 Price {star} 
                 </label> 
                 <input type="number"
                  name="Price"
                   value={formData.Price} 
                   onChange={handleChange}
                   placeholder="Enter price" 
                   required 
                   className="input-field" />

                  {/* Images */} 
                  <label className="mt-4"> 
                   Upload Images {star} 
                   </label> 
                   <input type="file" multiple accept="image/*"
                   onChange={handleFileChange}
                   className="input-field" /> 

              </div>


              {/* RIGHT */}
              <div>

                {/* Description */}
                <label>
                  Description {star}
                </label>

                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder="Describe your product or service..."
                  required
                  rows="5"
                  className="input-field"
                />

                {/* Price Type */}
                <label className="mt-4">
                  Price Type {star}
                </label>

                <select
                  name="Price_Type"
                  value={formData.Price_Type}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">
                    Select Price Type
                  </option>

                  <option value="fixed">
                    Fixed Price
                  </option>

                  <option value="starting">
                    Starting From
                  </option>

                  <option value="quote">
                    Contact for Price
                  </option>
                </select>


                {/* Customization */}
                <div className="mt-4">

                  <p>
                    Customization Available? {star}
                  </p>

                  <label>
                    <input
                      type="radio"
                      name="Customizable"
                      value="true"
                      checked={formData.Customizable === "true"}
                      onChange={handleChange}
                    />

                    {" "}Yes
                  </label>

                  <label className="ml-4">
                    <input
                      type="radio"
                      name="Customizable"
                      value="false"
                      checked={formData.Customizable === "false"}
                      onChange={handleChange}
                    />

                    {" "}No
                  </label>

                </div>


                {/* Availability */}
                <div className="mt-4">

                  <p>
                    Availability {star}
                  </p>

                  <label>
                    <input
                      type="radio"
                      name="Available"
                      value="true"
                      checked={formData.Available === "true"}
                      onChange={handleChange}
                    />

                    {" "}Available
                  </label>

                  <label className="ml-4">
                    <input
                      type="radio"
                      name="Available"
                      value="false"
                      checked={formData.Available === "false"}
                      onChange={handleChange}
                    />

                    {" "}Not Available
                  </label>

                </div>

              </div>

            </div>


            {/* Submit */}
            <div className="text-center mt-6">

              <button className="primary-btn">

                {isEditMode
                  ? "Update Listing"
                  : "Add Listing"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateProduct;




// export default CreateProfile;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { createProfiles,getProfileDetail,editProfiles } from "../api/profileService";
// import { useParams, useNavigate } from "react-router-dom";
// import "../index.css";

// function CreateProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!id;

//   const [formData, setFormData] = useState({
//     Name: "",
//     Age: "",
//     Height_Ft: "",
//     Height_In: "",
//     Weight: "",
//     Caste: "",
//     Religion: "",
//     Education: "",
//     Job_Details: "",
//     Income: "",
//     Location: "",
//     Contacts: "",
//     Gender: "",
//     Martial_Status: "",
//   });

//   const [selectedFile, setSelectedFile] = useState([]);

//   // ---------------- FETCH PROFILE (EDIT MODE) ----------------
//   useEffect(() => {
//     if (!isEditMode) return;

//     const fetchProfile = async () => {
//       try {
//           const res = await getProfileDetail(id);
           
//         const data = res.data;

//         setFormData({
//           Name: data.Name || "",
//           Age: data.Age || "",
//           Height_Ft: data.Height_Ft || "",
//           Height_In: data.Height_In || "",
//           Weight: data.Weight || "",
//           Caste: data.Caste || "",
//           Religion: data.Religion || "",
//           Education: data.Education || "",
//           Job_Details: data.Job_Details || "",
//           Income: data.Income || "",
//           Location: data.Location || "",
//           Contacts: data.Contacts || "",
//           Gender: data.Gender || "",
//           Martial_Status: data.Martial_Status || "",
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   // ---------------- HANDLE INPUT ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ---------------- HANDLE FILE ----------------
//   const handleFileChange = (e) => {
//     setSelectedFile((prev) => [...prev, ...e.target.files]);
//   };

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userData = new FormData();

//       Object.keys(formData).forEach((key) => {
//         userData.append(key, formData[key]);
//       });

//       selectedFile.forEach((file) => {
//         userData.append("imageURL", file);
//       });

//       let res;

//       if (isEditMode) {
//         res = await editProfiles(id,userData);
//       } else {
//         res = await createProfiles(userData);
//       }

//       alert(
//         `User ${res.data.Name} ${
//           isEditMode ? "updated" : "created"
//         } successfully`
//       );

//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong");
//     }
//   };

//   const star = <span className="text-red-500">*</span>;

//   return (
//     <div className="min-h-screen bg-pink-50 py-10 px-4">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {isEditMode ? "Edit Profile" : "Create Profile"}
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Complete your profile to get better matches
//         </p>
//       </div>

//       <div className="flex justify-center">
//         <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8">
//           <form onSubmit={handleSubmit}>
//             <div className="grid md:grid-cols-2 gap-8">
              
//               {/* LEFT */}
//               <div>
//                 <label>Name {star}</label>
//                 <input name="Name" value={formData.Name} onChange={handleChange} required className="input-field"/>

//                 <label className="mt-4">Age {star}</label>
//                 <input type="number" name="Age" value={formData.Age} onChange={handleChange} required className="input-field"/>

//                 <label className="mt-4">Location</label>
//                 <input name="Location" value={formData.Location} onChange={handleChange} className="input-field"/>

//                 <label className="mt-4">Contact</label>
//                 <input name="Contacts" value={formData.Contacts} onChange={handleChange} className="input-field"/>

//                 <label className="mt-4">Height</label>
//                 <div className="flex gap-2">
//                   <input name="Height_Ft" placeholder="Ft" value={formData.Height_Ft} onChange={handleChange} className="input-field"/>
//                   <input name="Height_In" placeholder="In" value={formData.Height_In} onChange={handleChange} className="input-field"/>
//                 </div>

//                 {/* Images */}
//                 <label className="mt-4">Upload Images</label>
//                 <input type="file" multiple onChange={handleFileChange} className="input-field"/>
//               </div>

//               {/* RIGHT */}
//               <div>
//                 <label>Education</label>
//                 <input name="Education" value={formData.Education} onChange={handleChange} className="input-field"/>

//                 <label className="mt-4">Income</label>
//                 <input name="Income" value={formData.Income} onChange={handleChange} className="input-field"/>

//                 <label className="mt-4">Religion</label>
//                 <select name="Religion" value={formData.Religion} onChange={handleChange} className="input-field">
//                   <option value="">Select</option>
//                   <option value="Hindu">Hindu</option>
//                   <option value="Muslim">Muslim</option>
//                 </select>

//                 {/* Gender */}
//                 <div className="mt-4">
//                   <p>Gender {star}</p>
//                   <label>
//                     <input type="radio" name="Gender" value="male"
//                       checked={formData.Gender === "male"} onChange={handleChange}/> Male
//                   </label>
//                   <label className="ml-4">
//                     <input type="radio" name="Gender" value="female"
//                       checked={formData.Gender === "female"} onChange={handleChange}/> Female
//                   </label>
//                 </div>

//                 {/* Marital Status */}
//                 <div className="mt-4">
//                   <p>Marital Status</p>
//                   <input type="radio" name="Martial_Status" value="Never Married"
//                     checked={formData.Martial_Status === "Never Married"} onChange={handleChange}/> Never Married
//                 </div>
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="text-center mt-6">
//               <button className="primary-btn">
//                 {isEditMode ? "Update Profile" : "Create Profile"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateProfile;
