import { useSetRecoilState } from "recoil";
import { api } from "../api/apiProvider";
import { arrayAtomFamily } from "../atoms";
import { config } from "../config";
import { convertFragmentDataIntoOptions } from "../utils";

export function useCoupons() {
  const setFragments = useSetRecoilState(arrayAtomFamily("allFragmentData"));

  const getCouponData = (id: any) => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.coupons_endpoint + "/" + id).then((res: any) => {
        getAllFragments();
        resolve(res);
      });
    });
  };

  const updateCoupon = (id: any, data: any) => {
    return new Promise((resolve) => {
      api.post(config.local_url + config.coupons_endpoint + "/" + id, data).then((res: any) => {
        resolve(res);
      });
    });
  };

  const getAllFragments = () => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.fragments_endpoint).then((res: any) => {
        const convertedData: any = convertFragmentDataIntoOptions(res.data);
        setFragments(convertedData);
        resolve(res.data);
      });
    });
  };

  const refragmentCoupon = (id: any, data: any) => {
    return new Promise((resolve) => {
      api.post(config.local_url + config.refragment_coupon_endpoint + "/" + id, data).then((res: any) => {
        resolve(res);
      });
    });
  };
  return {
    getCouponData,
    updateCoupon,
    getAllFragments,
    refragmentCoupon,
  };
}
