import {
  close_icon,
  default_icon,
  error_icon,
  info_icon,
  success_icon,
  warning_icon,
} from "./icons";
import {
  AutoCloseOptions,
  IconOptions,
  PositionOptions,
  ThemtfyOptions,
  VariationOptions,
} from "./types";

export default class Themtfy {
  private toastElement: HTMLDivElement = document.createElement("div");
  private container: HTMLDivElement = document.createElement("div");
  private autoCloseTimeOut: number = 0;
  private timeOrigin: Date = new Date();
  private autoCloseTime: number = 0;
  private interval: number = 0;
  private onClose: Function = ()=>{};
  //   private isPaused = false;
  private defaultOptions: ThemtfyOptions = {
    position: "top-right",
    title: "Your title goes here",
    body: "Your text goes here.",
    icon: "default",
    variation: "default",
    autoClose: 1000,
    onClose: () => {},
    canClose: true,
    showProgress: true,
    backgroundColor: false,
    textColor: false,
    distanceX: false,
    distanceY: false,
  };

  constructor(
    options: Partial<ThemtfyOptions> = {
      position: "top-right",
      title: "Your title goes here",
      body: "Your text goes here.",
      icon: "default",
      variation: "default",
      autoClose: 1000,
      onClose: () => {},
      canClose: true,
      showProgress: true,
      backgroundColor: false,
      textColor: false,
      distanceX: false,
      distanceY: false,
    }
  ) {
    this.toastElement = this.createToastElement();
    requestAnimationFrame(() => {
      this.toastElement.classList.add("show");
    });
    const def_op = this.defaultOptions;
    this.update({ ...def_op, ...options });
  }

  set position(value: PositionOptions) {
    const prevContainer = this.container;

    this.container =
      document.querySelector(`.toast-container[data-position="${value}"]`) ||
      this.createContainer(value);

    this.container.insertAdjacentElement("beforeend", this.toastElement);

    if (prevContainer) {
      this.containerCheck(prevContainer);
    }
  }

  set body(value: string) {
    this.toastElement.querySelector(".toast-body")!.textContent = value;
  }

  set title(value: string) {
    this.toastElement.querySelector(".toast-title")!.textContent = value;
  }

  set icon(value: IconOptions) {
    const iconElement = this.toastElement.querySelector(".toast-icon")!;
    if (value === false) {
      iconElement.remove();
      this.toastElement
        .querySelector(".toast-text-box")
        ?.classList.add("w-full");
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

  set variation(value: VariationOptions) {
    if (value === false) return;
    this.toastElement.dataset.variation = value;
  }

  set autoClose(value: AutoCloseOptions) {
    if (value === false) return;

    this.autoCloseTime = value;
    this.timeOrigin = new Date();

    if (this.autoCloseTimeOut) clearTimeout(this.autoCloseTimeOut);
    this.autoCloseTimeOut = setTimeout(this.remove, value);
  }

  set canClose(value: boolean) {
    
    if (typeof value !== "boolean") {
      return;
    }
    
    this.toastElement.classList.toggle("closeable", true);
    if (value) {
      
      this.toastElement.addEventListener("click", this.remove);
    } else {
      this.toastElement.removeEventListener("click", this.remove);
    }
  }

  set showProgress(value: boolean) {
    if (!value) {
      this.toastElement.querySelector(".progressbar")?.remove();
      return;
    }
    if (!this.autoCloseTime) return;

    this.toastElement.style.setProperty("--progressWidth", "1");

    this.interval = setInterval(() => {
      //   if (this.isPaused) return;
      const timeVisible = Number(new Date()) - Number(this.timeOrigin);
      this.toastElement.style.setProperty(
        "--progressWidth",
        `${1 - timeVisible / this.autoCloseTime}`
      );
    }, 10);
  }

  set backgroundColor(value: string) {
    if (!value) return;
    this.toastElement.style.setProperty("--toast-bg", value);
  }

  set textColor(value: string) {
    if (!value) return;
    this.toastElement.style.setProperty("--text-color", value);
  }

  set distanceX(value: string) {
    if (!value) return;
    this.container.style.setProperty("--distance-x", value);
  }

  set distanceY(value: string) {
    if (!value) return;
    this.container.style.setProperty("--distance-y", value);
  }
  set onCloseHandler(value: Function) {
    if (!value) return;
    this.onClose = value;
  }

  update = (options: Partial<ThemtfyOptions>) => {
    const mergedOptions = { ...this, ...options };

    Object.entries(mergedOptions).forEach(
      ([key, value]: [key: string, value: any]) => {
        {
          if (key in this) {
            (this as any)[key] = value;
          }
        }
      }
    );
  };
  remove = () => {
    clearTimeout(this.autoCloseTimeOut);
    clearInterval(this.interval);

    this.toastElement.classList.remove("show");
    this.toastElement.addEventListener("transitionend", () => {
      this.toastElement.remove();
      this.containerCheck(this.container);
    });
    this.onClose();
  };
  private containerCheck = (container: HTMLDivElement) => {
    if (container.hasChildNodes()) return;
    container.remove();
  };
  private createToastElement = () => {
    const toastElement = document.createElement("div");
    toastElement.className = "toast";
    toastElement.innerHTML = `<div class="close-btn">
            ${close_icon}
          </div>
          <div class="toast-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(clip0_17_1017)">
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
  private createContainer = (value = "top-right") => {
    const container = document.createElement("div");
    container.className = "toast-container";
    container.dataset.position = value;
    document.body.insertAdjacentElement("beforeend", container);
    return container;
  };
}
