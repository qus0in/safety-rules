export function initialize() {
  // 애플리케이션 모듈
  const RulesFormApp = (function () {
    // private 변수
    const state = {
      isAnimating: false,
      isFormVisible: false,
      rulesCount: 10,
    };

    // private DOM 요소 참조
    const elements = {
      loadingScreen: document.getElementById("loadingScreen"),
      imageWrapper: document.getElementById("imageWrapper"),
      loadingImage: null,
      mainForm: document.getElementById("mainForm"),
      rulesCountInput: document.getElementById("rulesCount"),
      rulesValueSpan: document.getElementById("rulesValue"),
      formSection: document.querySelector("#mainForm section"),
      formInputs: document.querySelectorAll(".form-control"),
      submitButton: document.querySelector('button[type="submit"]'),
    };

    // private 유틸리티 함수
    const utils = {
      delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      getScreenSize: () => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
      calculateExpandedSize: () => {
        const { width, height } = utils.getScreenSize();
        return Math.max(width, height) * 1.5;
      },
    };

    // private 이미지 관리자
    const imageManager = {
      expand: () => {
        if (state.isAnimating) return;
        state.isAnimating = true;

        const size = utils.calculateExpandedSize();
        elements.imageWrapper.style.width = `${size}px`;
        elements.imageWrapper.style.height = `${size}px`;
        elements.loadingImage.style.opacity = "0.3";
        elements.loadingImage.style.borderRadius = "0";
        elements.loadingScreen.style.backgroundColor = "transparent";
      },
    };

    // private 폼 관리자
    const formManager = {
      show: () => {
        state.isFormVisible = true;
        elements.mainForm.classList.remove("opacity-0");
      },
      handleFocus: (input, isFocused) => {
        input.classList.toggle("shadow-sm", isFocused);
        input.classList.toggle("border-light", isFocused);
      },
      handleHover: (isHovered) => {
        elements.formSection.style.transform = isHovered
          ? "scale(1.02)"
          : "scale(1)";
      },
      handleButtonHover: (isHovered) => {
        elements.submitButton.classList.toggle("shadow", isHovered);
      },
      updateRulesCount: (value) => {
        state.rulesCount = value;
        elements.rulesValueSpan.textContent = value;
      },
      validate: (event) => {
        const form = event.target;
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
    };

    // private 이벤트 핸들러 설정
    const setupEventListeners = () => {
      elements.loadingImage = elements.imageWrapper.querySelector("img");

      elements.rulesCountInput.addEventListener("input", (e) =>
        formManager.updateRulesCount(e.target.value)
      );

      elements.formInputs.forEach((input) => {
        input.addEventListener("focus", () =>
          formManager.handleFocus(input, true)
        );
        input.addEventListener("blur", () =>
          formManager.handleFocus(input, false)
        );
      });

      elements.formSection.addEventListener("mouseover", () =>
        formManager.handleHover(true)
      );
      elements.formSection.addEventListener("mouseout", () =>
        formManager.handleHover(false)
      );

      elements.submitButton.addEventListener("mouseover", () =>
        formManager.handleButtonHover(true)
      );
      elements.submitButton.addEventListener("mouseout", () =>
        formManager.handleButtonHover(false)
      );

      document
        .querySelector("form")
        .addEventListener("submit", formManager.validate);
    };

    // private 초기 애니메이션
    const startInitialAnimation = async () => {
      await utils.delay(2000);
      imageManager.expand();
      await utils.delay(500);
      formManager.show();
    };

    // public API
    return {
      initialize: () => {
        setupEventListeners();
        startInitialAnimation();
      },
      getRulesCount: () => state.rulesCount,
      isFormVisible: () => state.isFormVisible,
    };
  })();

  // 애플리케이션 초기화
  document.addEventListener("DOMContentLoaded", RulesFormApp.initialize);
}
