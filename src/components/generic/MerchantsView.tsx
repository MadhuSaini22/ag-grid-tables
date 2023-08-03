import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils";
import { mainURL, token } from "../../../config";
import FullScreenLoader from "../core/loaders/FullScreen";
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
    <div className=" my-10 ">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4">
          {merchantsData &&
            merchantsData.length > 0 &&
            merchantsData.map((merchant: any) => (
              <button
                key={merchant.id}
                className="border text-start flex break-all rounded bg-gray-100/30 hover:bg-gray-100 shadow-sm border-gray-400 p-2"
              >
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
    </div>
  );
}
