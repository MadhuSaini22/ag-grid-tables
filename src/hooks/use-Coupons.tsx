import { api } from "../api/apiProvider";
import { config } from "../config";

export function useCoupons() {
  const getCouponData = (id: any) => {
    return new Promise((resolve) => {
      api.get(config.local_url + config.coupons_endpoint + "/" + id).then((res: any) => {
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

  return {
    getCouponData,
    updateCoupon,
  };
}
