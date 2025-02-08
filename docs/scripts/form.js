// import { chaining, ensemble, uploadImage } from "./api.js";
import { chaining, ensemble } from "./api.js";
import { AI_MODEL } from "./enums.js";

const validator = async ({ keyword, size, category }) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 100 + Math.random() * 200)
  );
  if (typeof keyword !== "string") return false;
  if (keyword.length > size) return false;
  return (
    (
      await ensemble(
        `${keyword.trim()}(이)가 ${category}의 일종인지 아닌지 판단하여 true, false의 json boolean으로 answer를 key로 응답. 여러 번 실행해도 일관되게 느껴질 예상가능한 기준을 적용. 욕설이나 외설적인 표현, 이해하기 힘든 표현, 단순한 사람 이름 등은 false로 처리.`,
        [
          // AI_MODEL.GROQ.MIXTRAL_8X7B_32768,
          AI_MODEL.GROQ.GEMMA2_9B_IT,
          AI_MODEL.GROQ.LLAMA_3_1_8B_INSTANT,
          AI_MODEL.GROQ.LLAMA3_70B_8192,
          AI_MODEL.GROQ.LLAMA3_8B_8192,
        ]
      )
    )
      .filter((el) => typeof el === "boolean")
      .reduce((acc, cur) => {
        return cur ? acc + 1 : acc - 1;
      }, 0.5) > 0
  );
};

export async function initForm() {
  document
    .querySelector("#mainForm form")
    .addEventListener("submit", mainFormHandler);
}

async function mainFormHandler(event) {
  event.preventDefault();
  const reviewModal = new bootstrap.Modal(
    document.querySelector("#reviewModal")
  );
  reviewModal.show();
  const mainContainer = document.querySelector("main");
  const mainForm = document.querySelector("#mainForm form");
  const formData = new FormData(mainForm);
  const place = formData.get("place");
  const task = formData.get("task");
  const rulesCount = formData.get("rulesCount");
  try {
    let validation = true;
    const placeValidator = await validator({
      keyword: place,
      size: 20,
      category: "장소",
    });
    if (!placeValidator) {
      mainForm.place.setCustomValidity("부적절한 장소입니다");
      mainForm.place.classList.add("is-invalid");
      const feedback = mainForm.place.nextElementSibling;
      feedback.textContent = "부적절한 장소입니다";
      validation = false;
    } else {
      mainForm.place.setCustomValidity("");
      if (
        mainForm.place.nextElementSibling.textContent === "부적절한 장소입니다"
      )
        mainForm.place.nextElementSibling.textContent = "";
    }

    const taskValidator = await validator({
      keyword: task,
      size: 20,
      category: "업무",
    });
    if (!taskValidator) {
      mainForm.task.setCustomValidity("부적절한 업무입니다");
      mainForm.task.classList.add("is-invalid");
      const feedback = mainForm.task.nextElementSibling;
      feedback.textContent = "부적절한 업무입니다";
      validation = false;
    } else {
      mainForm.task.setCustomValidity("");
      if (
        mainForm.task.nextElementSibling.textContent === "부적절한 업무입니다"
      )
        mainForm.task.nextElementSibling.textContent = "";
    }

    if (!mainForm.checkValidity()) {
      mainForm.classList.add("was-validated");
      validation = false;
    }
    if (!validation) return;
  } finally {
    reviewModal.hide();
  }
  const cmEl = document.querySelector("#creatingModal");
  const creatingModal = new bootstrap.Modal(cmEl);
  cmEl.querySelector("h5").textContent = "이미지를 생성중입니다...";
  creatingModal.show();
  try {
    const step1 = await chaining(
      {
        content: `${place}에서 ${task}(을)를 맡은 당신이 직면할 만한 광경 이미지 생성을 목적으로 하는 영문 프롬프트를 작성. 전체적으로는 평화로워 보이지만 볼수록 불안하고 섬뜩함. 약간 환상적이고 몽환적인 것은 괜찮지만 현실성과 사실성을 잃어서는 안 됨.`,
        maxTokens: 2048,
        ...AI_MODEL.TOGETHER_AI.DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE,
      },
      {
        content:
          "뒤에서 이미지 생성을 목적으로 하는 영문 프롬프트를 추출하여 prompt를 key로 하는 json string으로 응답",
        jsonKey: "prompt",
        jsonMode: true,
        ...AI_MODEL.GROQ.MIXTRAL_8X7B_32768,
      },
      {
        imageMode: true,
        ...AI_MODEL.TOGETHER_AI.FLUX_1_SCHNELL_FREE,
      }
    );
    // console.log(result);
    // const step1URL = (await uploadImage(step1)).data.link;
    // console.log(step1URL);
    const step1URL = step1;
    cmEl.querySelector("h5").textContent = "이미지 생성 완료!";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    cmEl.querySelector("h5").textContent = "안전수칙을 작성중입니다...";
    const step2 = await chaining({
      content: `${place}에서 ${task}(을)를 맡은 당신의 안전을 보장하기 위한 안전 수칙을 마크다운 을 사용하지 않은 개행 문자로 구분된 한글로 작성된 평문으로 ${rulesCount}개 작성. 처음엔 정상적(절반 이상)으로 보이지만 뒤로 갈 수록 점점 기묘해지며 나폴리탄 괴담 형식으로 작성됨. 같은 번호가 다른 곳에서 반복되거나 표시된 숫자의 순서가 뒤죽박죽이거나, 안전수칙이 서로 모순되거나, 초현실적 현상이 언급 되는 등 간접적인 공포를 일으켜야 함. 의도적으로 여러 글자(영어, 일본어, 한자, 그리스 문자, 특수문자 등)를 섞거나 문장을 중간에 끊는 것, 소리나는 대로 작성하는 것, 두세 번씩 같은 문장을 반복하는 것 등을 허용함. 결과적으로 한글로 80% 이상 작성되어야 하며 처음의 절반까지는 평이한 내용과 표시로 구성되어야하며 수칙 간 한 줄의 여백을 두도록 하고 마크다운 문법을 사용하지 않도록 다시 점검.`,
      maxTokens: 2048,
      ...AI_MODEL.TOGETHER_AI.DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE,
    });
    // console.log(step2);
    const step2Content = step2.split("</think>")[1].trim();
    // console.log(step1URL, step2Content);
    mainContainer.style.opacity = "0";
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    const resultSection = document.querySelector("#resultSection");
    resultSection.style.visibility = "visible";
    resultSection.classList.remove("opacity-0");
    resultSection.style.opacity = "1";
    mainContainer.remove();
    const rulesTitle = resultSection.querySelector("#rulesTitle");
    const rulesImg = resultSection.querySelector("#rulesImg");
    const rulesContents = resultSection.querySelector("#rulesContents");
    rulesTitle.textContent = `${place} ${task} 근무자를 위한 안전수칙`;
    rulesContents.textContent = step2Content;
    rulesImg.setAttribute("src", step1URL);
  } catch {
    const errorModal = bootstrap.Modal(document.querySelector("#errorModal"));
    errorModal.show();
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    errorModal.hide();
  } finally {
    creatingModal.hide();
  }
}
