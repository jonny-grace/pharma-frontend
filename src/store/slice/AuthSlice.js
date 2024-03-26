export const CreateAuthSlice = (set, get) => ({
  user: null,
  token: null,
  error: null,
  organizations: null,
  pageLoade: true,
  auth: false,
  loading: false,
  async setUser(data) {
    set((state) => ({ ...state, user: data }));
  },
  async setAuthTrue() {
    set((state) => ({ ...state, auth: true }));
  },
  async setAuthFalse() {
    console.log(false);

    set((state) => ({ ...state, auth: false }));
  },
});
