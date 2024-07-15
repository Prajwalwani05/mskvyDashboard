import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import DataContext from '../context/DataContext';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const ClusterSummary = () => {
    const { clusterSummaryData, setClusterSummaryData } = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [totalItems, setTotalItems] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = () =>{
       axios.get(`/data`)
       .then((response) => {
        if (response.status === 200) {
          console.log("ClusterSummaryData>>>", response.data);
          setClusterSummaryData(response.data);
          setTotalItems(response.data.length)
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      })

    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clusterSummaryData.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);

    const goToNextPage = () => {
        if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

  return (
    <>
    {
        clusterSummaryData ?
            <div className='mainContent'>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center" , padding:"0 10px;", marginBottom:"5px"}}>
                        <h2 style={{marginBottom:"10px"}}>Cluster Summary List</h2>
                        <button className="download-table-xls-button" >Add +</button>
                </div>
                <div className='districtTable'> 
                <table>
                    <thead>
                    {/* District Name	Cluster Name	RFS Number	Date OF RFS	Bid Submission Date	SPV Name	Scheduled LOI Issuance Date	Actual LOI Issuance Date	Status	Action	View */}
                        <th className='firstTh'>District Name</th>
                        <th>Cluster Name</th>
                        <th>RFS Number</th>
                        <th>Date of RFS</th>
                        <th>Bid Submission Date</th>
                        <th>SPV Name</th>
                        <th>Scheduled LOI Issuance Date</th>
                        <th>Actual LOI Issuance Date</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th className='lastTh'>View</th>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((element, index) =>(
                                <tr key={index}>
                                        <td>{element.District_Name}</td>
                                        <td>Cluster(i)</td>
                                        <td>{element.RFS_Number}</td>
                                        <td>{new Date(element.Date_OF_RFS).toLocaleDateString('en-GB')}</td>
                                        <td>{new Date(element.Bid_Submission_Date).toLocaleDateString('en-GB')}</td>
                                        <td>MSKVY {element.SPVName} Solar SPV Limited</td>
                                        <td>{element.Scheduled_LOI_Issuance_Date !== "0000-00-00 00:00:00.000" ? new Date(element.Scheduled_LOI_Issuance_Date).toLocaleDateString('en-GB') : "-"}</td>
                                        <td>{element.Scheduled_LOI_Issuance_Date !== "0000-00-00 00:00:00.000" ? new Date(element.Actual_LOI_Issuance_Date).toLocaleDateString('en-GB') : "-"}</td>
                                        <td>{element.Status}</td>
                                        <td><a href='/'>View</a></td>
                                        <td><a href='/'>Action</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
                         <div className='pagination'>
                            <GoChevronLeft className='paginationArrows' onClick={() => goToPreviousPage()}/>
                            <span className='paginationPage'>{currentPage}</span>
                            <GoChevronRight className='paginationArrows' onClick={() => goToNextPage()}/>
                        </div>
            </div>
        :
        <div>No Data</div>
    }
    </>
  )
}

export default ClusterSummary;