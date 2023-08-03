import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils";
import { mainURL, token } from "../../config";
import FullScreenLoader from "./core/loaders/FullScreen";
import { Link } from "react-router-dom";

export default function MerchantsView() {
  const [merchantsData, setMerchantsData] = useState([]);
  const [loader, setLoader] = useState(true);

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
    fetchData(mainURL, "GET", headers)
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
      <div className="flex space-x-5 flex-wrap items-center justify-center overflow-y-auto">
        {merchantsData &&
          merchantsData.length > 0 &&
          merchantsData.map((merchant: any) => (
            <button key={merchant.id} className="border w-72 border-gray-400 p-4 mb-4">
              <Link to={`/merchant/${merchant.id}`}>
                <div>{merchant.name}</div>
                <div>{merchant.domain_name}</div>
                <div>{merchant.status}</div>
                <div>{merchant.website}</div>
              </Link>
            </button>
          ))}
      </div>
    </div>
  );
}
