import "../css/main.css";
import Toast from "./Toast";

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  new Toast({autoClose: 10000, showProgress: true, icon: "success", variation: "success"});
  new Toast({autoClose: 10000, showProgress: true, icon: "info", variation: "info"});
  new Toast({autoClose: 10000, showProgress: true, icon: "warning", variation: "warning"});
  new Toast({autoClose: 10000, showProgress: true, icon: "error", variation: "error"});
  new Toast({autoClose: 10000, showProgress: true});
});
