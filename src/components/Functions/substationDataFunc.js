import axios from "axios";

export const fetchData = (DIST_CODE, augmentation, setSubstationData, setLoading, navigate) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const substationDataFunc =  
  setLoading(true);
  axios
      .get(
        `/api/SubStation/GetSubStationData?dist_code=${DIST_CODE}&augmny=${augmentation}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSubstationData(response.data);
          console.log(response.data);
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      });

      return substationDataFunc;
  };
  