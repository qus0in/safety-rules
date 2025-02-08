import { initialize } from "./scripts/initialize.js";
import { initForm } from "./scripts/form.js";
import { expectedOrigin } from "./scripts/enums.js";

async function main() {
  //   const expectedOrigin = "https://qus0in.github.io";
  // const expectedOrigin = "";
  // window.location.origin은 프로토콜, 호스트, 포트를 포함한 현재 페이지의 출처(origin)를 반환합니다.
  if (window.location.origin !== expectedOrigin) {
    // console.log(`현재 사이트가 ${expectedOrigin}가 아닙니다.`);
    // alert(`현재 사이트가 ${expectedOrigin}가 아닙니다.`);
    // alert(`현재 사이트가 프로덕션용이 아닙니다.`);
    const ls = localStorage;
    const gak = "GROQ_API_KEY";
    const key1 = ls.getItem(gak);
    if (!key1) {
      ls.setItem(
        gak,
        prompt("GROQ 키를 입력해주세요. (https://console.groq.com/keys)")
      );
    }
    const tak = "TOGETHER_API_KEY";
    const key2 = ls.getItem(tak);
    if (!key2) {
      ls.setItem(
        tak,
        prompt(
          "TOGETHER.AI API KEY를 입력해주세요. (https://api.together.ai/settings/api-keys)"
        )
      );
    }
    // const ici = "IMGUR_CLIENT_ID";
    // const key3 = ls.getItem(ici);
    // if (!key3) {
    //   ls.setItem(
    //     ici,
    //     prompt(
    //       "IMGUR_CLIENT_ID를 입력해주세요. (https://api.imgur.com/oauth2/addclient)"
    //     )
    //   );
    // }
  }
  //   else {
  //     console.log(`현재 사이트는 ${expectedOrigin}입니다.`);
  //   }
  initialize();
  await initForm();
}

main();
