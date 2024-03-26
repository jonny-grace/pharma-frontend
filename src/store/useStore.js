import { create } from "zustand";
import { CreateAuthSlice } from "./slice/AuthSlice";

const useStore = create()((...a) => ({
  ...CreateAuthSlice(...a),
}));

export default useStore;
