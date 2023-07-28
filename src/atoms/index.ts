import { atom } from "recoil";

export const isEditing = atom({
  key: "isEditing",
  default: true as boolean,
});
