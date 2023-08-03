export const config = {
  local_url: "https://eenfeed.enactweb.com/api/editor",
  merchants_endpoint: "/merchants",
  coupons_endpoint: "/coupons",
  token: "adsi9209-c8ae-4ffer5-bfsf6c-c4c11fafer",
  limitOptions: [10, 100, 500, 1000],
  actionButtons : {
    not_published: ["Publish", "Trash"],
    rejected: ["Restore ", "Trash "],
    active: ["Trash"],
    expired: ["Trash"],
    stale: ["Trash"],
    trashed: ["Restore"],
    missing: ["Trash"],
    publish: ["Trash"],
    "not expiry": ["Trash"],
  }
};
