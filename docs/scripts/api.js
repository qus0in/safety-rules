import { expectedOrigin } from "./enums.js";

// export async function uploadImage(base64Image) {
//   // please use localhost instead 127.0.0.1!
//   const IMGUR_CLIENT_ID = localStorage.getItem("IMGUR_CLIENT_ID");
//   try {
//     const uploadResponse = await axios.post(
//       "https://api.imgur.com/3/image",
//       { image: base64Image, type: "base64" },
//       {
//         headers: {
//           Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("업로드 성공:", uploadResponse.data);
//     return uploadResponse.data;
//   } catch (error) {
//     console.error("업로드 에러:", error);
//     throw error;
//   }
// }

const fetchData = async ({ url, payload, token }) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

const callAI = async ({
  content,
  endpoint,
  cd,
  provider,
  maxTokens,
  jsonMode = false,
  //   imageMode = false,
}) => {
  const payload = {
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: cd,
    max_tokens: maxTokens,
  };
  if (jsonMode) payload.response_format = { type: "json_object" };
  //   if (imageMode) payload.response_format = "b64_json";

  if (window.location.origin === expectedOrigin) {
    // 아직 뭔가... 뭔가 잘못됨...
    payload.provider = provider;
    payload.endpoint = endpoint;
    const url = "https://safety-rules-wrapper.glitch.me";
    return axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  }
  let API_KEY = "";
  let BASE_URL = "";

  switch (provider) {
    case "groq":
      // https://console.groq.com/keys
      API_KEY = localStorage.getItem("GROQ_API_KEY");
      BASE_URL = "https://api.groq.com/openai";
      break;
    case "together-ai":
      // https://api.together.ai/settings/api-keys
      API_KEY = localStorage.getItem("TOGETHER_API_KEY");
      BASE_URL = "https://api.together.xyz";
      break;
    default:
      throw new Error("잘못된 공급자");
  }
  return fetchData({
    url: `${BASE_URL}${endpoint}`,
    payload,
    token: API_KEY,
  });
};

export const chaining = async (...tasks) => {
  let result = null;
  for (const task of tasks) {
    const { jsonKey, imageMode } = task;
    if (task.content && result) {
      //   console.log("* 컨텐츠와 결과 둘 다 감지");
      task.content += " : ";
      task.content += result;
    } else if (!task.content) {
      //   console.log("* 컨텐츠가 없다?");
      task.content = result;
    } else if (!task.content && !result) {
      throw new Error("뭔가 많이 잘못됨");
    }
    console.log(task.content);
    const data = await callAI({
      ...task,
    });
    if (jsonKey) {
      result = JSON.parse(data.choices[0].message.content)[jsonKey];
    } else if (imageMode) {
      result = data.data[0].url;
      //   result = data.data[0].b64_json;
    } else {
      result = data.choices[0].message.content;
    }
  }
  return result;
};

export const ensemble = async (content, models) => {
  return Promise.all(
    models.map((model) =>
      callAI({
        content,
        endpoint: model.endpoint,
        cd: model.cd,
        provider: model.provider,
        jsonMode: true,
      })
        .then((data) => {
          return JSON.parse(data.choices[0].message.content).answer;
        })
        .catch((err) => {
          console.error(err);
          return undefined;
        })
    )
  );
};
