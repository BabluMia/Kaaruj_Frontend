import { toast } from "react-toastify";

export const showToast = (
  type = "success",
  msg,
  autoClose = 3000,
  className = "primaryColor",
  pauseOnHover = true
) => {
  if (type === "success") {
    toast.success(msg, {
      autoClose: autoClose === null ? 3000 : autoClose,
      className: className === null ? "primaryColor" : className,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover
    });
  } else if (type === "error") {
    toast.error(msg, {
      autoClose: autoClose === null ? 3000 : autoClose,
      className: className === null ? "dangerColor" : className,
      position: toast.POSITION.TOP_RIGHT,
      pauseOnHover
    });
  }
};
