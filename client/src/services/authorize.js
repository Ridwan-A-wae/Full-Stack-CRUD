export const authenticate = (res) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(res.data.token));
  }
};

export const getToken = () => {
    if (typeof window !== "undefined" && sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  };
  

export const logout = (next) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
  }
  next();
};
