import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import { merchantBaseURL, token } from "../../config";
import FullScreenLoader from "./core/loaders/FullScreen";
import { useParams } from "react-router-dom";
import Table from "./Table";

export default function Merchant() {
  const [merchantsData, setMerchantsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { merchantId } = useParams();
  useEffect(() => {
    setLoader(true);
    getMerchants();
    return () => {};
  }, []);

  const getMerchants = () => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetchData(`${merchantBaseURL}${merchantId}`, "GET", headers)
      .then((data) => {
        data?.data && setMerchantsData(data.data);
        setLoader(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  if (loader) return <FullScreenLoader className={"flex h-screen w-screen justify-center items-center text-red-300"} />;

  return (
    <div className="flex my-12 items-center justify-center">
      <Table rowData={merchantsData} setRowData={setMerchantsData} merchantId={merchantId} />
    </div>
  );
}
