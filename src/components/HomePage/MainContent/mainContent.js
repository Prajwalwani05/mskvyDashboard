import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Loader from "../../Common/Loader/loader";

const MainContent = () => {
  const {data, setData, setSubstationData} = useContext(DataContext);
  
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const augumny = "N";
  useEffect(() => {
    setLoading(true);
        axios
        .get(
          `/api/DistrictWiseSummary/GetAllDistrictSummary`,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          // Check if response status is 200
          if (response.status === 200) {
            // Data is now available here
            console.log("DATA>>>", response.data);
           setData(response.data);
            setLoading(false);
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          setLoading(false);
        })
    
  }, []);



  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    console.log(selectedDistrict)
  }

  const handleApiRequest = (districtCode) => {
    setLoading(true);
    axios.get(
      `/api/SubStation/GetSubStationData?dist_code=${districtCode}&augmny=${augumny}`
    )
    .then((response) =>{
      console.log(response);
      if(response){
        console.log("Substation Data" ,response.data)
        setSubstationData(response.data)
        navigate(`/SubstationStatus/${districtCode}/${augumny}`)
      }
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(() => {
      setLoading(false); // Set loading to false after the API request is completed
    });
  };

  //Total 
  // Initialize total variables
let tSubStation = 0;
let tSolarCapacity = 0;
let tLandRequired = 0;
let tLandRequiredWith5Tolerance = 0;
let tJMLandArea = 0;

// Iterate through the data and calculate totals
data && data.forEach(element => {
    tSubStation += Number(element.TotalSubStation);
    tSolarCapacity += Number(element.TotalSolarCapacity);
    tLandRequired += Number(element.TotalLandRequired);
    tLandRequiredWith5Tolerance += Number(element.TotalLandRequiredwith_5_tolerance);
    tJMLandArea += Number(element.JM_LAND_AREA);
});
let totalSubStation = tSubStation.toFixed(2);
let totalSolarCapacity = tSolarCapacity.toFixed(2);
let totalLandRequired = tLandRequired.toFixed(2);
let totalLandRequiredWith5Tolerance = tLandRequiredWith5Tolerance.toFixed(2);
let totalJMLandArea = tJMLandArea.toFixed(2);

  return (
    <>
    {
      loading ? 
      <Loader></Loader>
      : 
      
    <div className="mainContent">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Dashboard</h1>
        <div style={{display:"flex",alignItems:"center", gap:"5px", margin:"10px 0px"}}>
          <h4>Select District</h4>
          <select onChange={handleDistrictChange}  placeholder="Select District">
            {(data) ? data.map((element, index) => (
              <option key={index} value={element.DIST_CODE}>{element.DIST_NAME}</option>
            )) : <div></div>}
          </select>
          <button onClick={()=>handleApiRequest(selectedDistrict)}>Submit</button>
        </div>
      </div>


      <div className="districtTable">
        <table>
            <thead>
                <tr>
                    <th className="firstTh">District Name</th>
                    <th>Number of Identified Substations</th>
                    <th>Total Solar Capacity (in MW)</th>
                    <th>Total Land Required (in Acre)</th>
                    <th>Land Required with 5% Tolerance (in Acre)</th>
                    <th className="lastTh">Land Cleared (in Acre)</th>
                </tr>
            </thead>
            <tbody>
                {
                  (data) ? 
                    data.map((element, index) => (
                        <tr key={index} onClick={()=>handleApiRequest(element.DIST_CODE)} style={{cursor:"pointer"}}>
                            <td ><p className="firstTd" >{element.DIST_NAME}</p></td>
                            <td>{element.TotalSubStation}</td>
                            <td>{element.TotalSolarCapacity}</td>
                            <td>{element.TotalLandRequired}</td>
                            <td>{element.TotalLandRequiredwith_5_tolerance}</td>
                            <td>{element.JM_LAND_AREA}</td>
                        </tr>
                    ))
                  : <div>No Data FOund</div>
                  }
                  <tr>
                    <td style={{fontWeight:"700"}}>Total</td>
                    <td>{totalSubStation}</td>
                    <td>{totalSolarCapacity}</td>
                    <td>{totalLandRequired}</td>
                    <td>{totalLandRequiredWith5Tolerance}</td>
                    <td>{totalJMLandArea}</td>
                  </tr>
            </tbody>
        </table>
      </div>
  
    </div>
        
    }
    </>


  );
};

export default MainContent;
