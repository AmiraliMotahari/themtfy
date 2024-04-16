import {
  default_icon,
  error_icon,
  info_icon,
  success_icon,
  warning_icon,
} from "./icons";

export default class Toast {
  #toastElement;
  #container;
  #autoCloseTimeOut;
  #timeOrigin;
  #autoCloseTime;
  #interval;
  #isPaused = false;
  #defaultOptions = {
    position: "top-right",
    title: "Your title goes here",
    body: "Your text goes here.",
    icon: "default",
    variation: "default",
    autoClose: 1000,
    onClose: () => {},
    canClose: true,
    showProgress: true,
  };
  constructor(options = this.#defaultOptions) {
    this.#toastElement = this.#createToastElement();
    requestAnimationFrame(() => {
      this.#toastElement.classList.add("show");
    });
    const def_op = this.#defaultOptions;
    this.update({ ...def_op, ...options });
  }

  set position(value = "") {
    const prevContainer = this.#container;

    this.#container =
      document.querySelector(`.toast-container[data-position="${value}"]`) ||
      this.#createContainer(value);

    this.#container.insertAdjacentElement("beforeEnd", this.#toastElement);

    if (prevContainer) {
      this.#containerCheck(prevContainer);
    }
  }
  set body(value) {
    this.#toastElement.querySelector(".toast-body").textContent = value;
  }
  set title(value) {
    this.#toastElement.querySelector(".toast-title").textContent = value;
  }
  set icon(value) {
    const iconElement = this.#toastElement.querySelector(".toast-icon");
    if (value === false) {
      iconElement.remove();
      this.#toastElement
        .querySelector(".toast-text-box")
        .classList.add("w-full");
      return;
    }
    if (value === "info") {
      iconElement.innerHTML = info_icon;
    } else if (value === "success") {
      iconElement.innerHTML = success_icon;
    } else if (value === "warning") {
      iconElement.innerHTML = warning_icon;
    } else if (value === "error") {
      iconElement.innerHTML = error_icon;
    } else {
      iconElement.innerHTML = default_icon;
    }
  }
  set variation(value) {
    if (value === false) return;
    this.#toastElement.dataset.variation = value;
  }
  set autoClose(value) {
    this.#autoCloseTime = value;
    this.#timeOrigin = new Date();

    if (value === false) return;
    if (this.#autoCloseTimeOut) clearTimeout(this.#autoCloseTimeOut);
    this.#autoCloseTimeOut = setTimeout(this.remove, value);
  }
  set canClose(value) {
    this.#toastElement.classList.toggle("closeable", value);
    if (value) {
      this.#toastElement.addEventListener("click", this.remove);
    } else {
      this.#toastElement.removeEventListener("click", this.remove);
    }
  }
  set showProgress(value) {
    if (!value) {
      this.#toastElement.querySelector(".progressbar").remove();
      return;
    }
    if (!this.#autoCloseTime) return;

    this.#toastElement.style.setProperty("--progressWidth", 1);

    this.#interval = setInterval(() => {
      //   if (this.#isPaused) return;
      const timeVisible = new Date() - this.#timeOrigin;
      this.#toastElement.style.setProperty(
        "--progressWidth",
        1 - timeVisible / this.#autoCloseTime
      );
    }, 10);
  }
  //todo: implement this later
  //   set pauseOnHover(value) {
  //     if (value === false) return;
  //     this.#toastElement.addEventListener("mouseover", () => {
  //       this.#isPaused = true;
  //     });
  //     this.#toastElement.addEventListener("mouseout", () => {
  //       this.#isPaused = false;
  //     });
  //   }
  //todo: implement this later
  //   set insertionPosition(value){
  //     if(value !== "topToBottom" && value !== "bottomToTop") return;
  //     this.insertionPosition = value;
  //   }
  update = (options) => {
    Object.entries(options).forEach(([key, value]) => {
      {
        this[key] = value;
      }
    });
  };
  remove = () => {
    clearTimeout(this.#autoCloseTimeOut);
    clearInterval(this.#interval);

    this.#toastElement.classList.remove("show");
    this.#toastElement.addEventListener("transitionend", () => {
      this.#toastElement.remove();
      this.#containerCheck(this.#container);
    });
    this.onClose();
    
  };
  #containerCheck = (container) => {
      if (container.hasChildNodes()) return;
      container.remove();
  };
  #createToastElement = () => {
    const toastElement = document.createElement("div");
    toastElement.className = "toast";
    toastElement.innerHTML = `<div class="close-btn">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_976)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.00021 5.58918L7.35729 7.94626C7.43588 8.02216 7.54113 8.06416 7.65038 8.06321C7.75963 8.06226 7.86413 8.01844 7.94139 7.94119C8.01864 7.86393 8.06246 7.75943 8.06341 7.65018C8.06436 7.54093 8.02236 7.43568 7.94646 7.35709L5.58938 5.00001L7.94646 2.64293C8.02236 2.56434 8.06436 2.45909 8.06341 2.34984C8.06246 2.2406 8.01864 2.13609 7.94139 2.05884C7.86413 1.98158 7.75963 1.93776 7.65038 1.93681C7.54113 1.93586 7.43588 1.97786 7.35729 2.05376L5.00021 4.41084L2.64313 2.05376C2.56419 1.97974 2.45955 1.93933 2.35135 1.94109C2.24315 1.94284 2.13987 1.98663 2.06338 2.06318C1.98689 2.13972 1.94318 2.24303 1.9415 2.35123C1.93982 2.45943 1.9803 2.56404 2.05438 2.64293L4.41104 5.00001L2.05396 7.35709C2.01417 7.39553 1.98242 7.44151 1.96059 7.49234C1.93875 7.54318 1.92725 7.59785 1.92677 7.65318C1.92629 7.7085 1.93684 7.76337 1.95779 7.81457C1.97874 7.86578 2.00967 7.9123 2.0488 7.95143C2.08792 7.99055 2.13444 8.02149 2.18565 8.04244C2.23685 8.06339 2.29172 8.07393 2.34704 8.07345C2.40237 8.07297 2.45704 8.06147 2.50788 8.03964C2.55871 8.0178 2.60469 7.98606 2.64313 7.94626L5.00021 5.58918Z"
                  fill="#4F4F4F"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_976">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="toast-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_1017)">
                <path
                  d="M10.9997 1.83331C16.0624 1.83331 20.1663 5.93723 20.1663 11C20.1663 16.0627 16.0624 20.1666 10.9997 20.1666C5.93692 20.1666 1.83301 16.0627 1.83301 11C1.83301 5.93723 5.93692 1.83331 10.9997 1.83331ZM10.9905 9.16665H10.083C9.84937 9.16691 9.62464 9.25637 9.45475 9.41676C9.28486 9.57715 9.18263 9.79635 9.16893 10.0296C9.15524 10.2628 9.23113 10.4925 9.38108 10.6717C9.53104 10.8508 9.74375 10.966 9.97576 10.9936L10.083 11V15.5741C10.083 16.0508 10.4442 16.445 10.908 16.4945L11.0088 16.5H11.458C11.6508 16.5 11.8387 16.4392 11.9949 16.3263C12.1512 16.2134 12.2679 16.0541 12.3284 15.871C12.3889 15.688 12.3901 15.4905 12.332 15.3067C12.2738 15.1229 12.1591 14.9621 12.0043 14.8472L11.9163 14.7895V10.0925C11.9163 9.61581 11.5552 9.22165 11.0913 9.17215L10.9905 9.16665ZM10.9997 6.41665C10.7566 6.41665 10.5234 6.51322 10.3515 6.68513C10.1796 6.85704 10.083 7.0902 10.083 7.33331C10.083 7.57643 10.1796 7.80959 10.3515 7.98149C10.5234 8.1534 10.7566 8.24998 10.9997 8.24998C11.2428 8.24998 11.4759 8.1534 11.6479 7.98149C11.8198 7.80959 11.9163 7.57643 11.9163 7.33331C11.9163 7.0902 11.8198 6.85704 11.6479 6.68513C11.4759 6.51322 11.2428 6.41665 10.9997 6.41665Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_1017">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="toast-text-box">
            <div class="toast-title">This is toast title 2</div>
            <div class="toast-body">This is toast body</div>
          </div>
          <div class="progressbar"></div>`;
    return toastElement;
  };
  #createContainer = (value = "top-right") => {
    const container = document.createElement("div");
    container.className = "toast-container";
    container.dataset.position = value;
    document.body.insertAdjacentElement("beforeend", container);
    return container;
  };
}
//todo: add input validation
