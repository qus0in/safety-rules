export const AI_MODEL = Object.freeze({
  /**
   * [GROQ](https://groq.com/)
   * - https://console.groq.com/docs/models
   * - https://console.groq.com/docs/rate-limits
   * - https://console.groq.com/docs/text-chat
   */
  GROQ: Object.freeze({
    /**
     * - ID: `distil-whisper-large-v3-en`
     * - Developer: `HuggingFace`
     * - State: `Production`
     * - Usage: `Automatic Speech Recognition`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 20  | 2,000 |
     */
    DISTIL_WHISPER_LARGE_V3_EN: Object.freeze({
      cd: "distil-whisper-large-v3-en",
      rpm: 20,
      rpd: 2000,
      provider: "groq",
      state: "prod",
      usage: "stt",
    }),

    /**
     * - ID: `gemma2-9b-it`
     * - Developer: `Google`
     * - State: `Production`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    GEMMA2_9B_IT: Object.freeze({
      cd: "gemma2-9b-it",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.3-70b-versatile`
     * - Developer: `Meta`
     * - State: `Production`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 1,000 |
     */
    LLAMA_3_3_70B_VERSATILE: Object.freeze({
      cd: "llama-3.3-70b-versatile",
      rpm: 30,
      rpd: 1000,
      provider: "groq",
      state: "prod",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.1-8b-instant`
     * - Developer: `Meta`
     * - State: `Production`
     * - Usage: `Fast Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    LLAMA_3_1_8B_INSTANT: Object.freeze({
      cd: "llama-3.1-8b-instant",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "fast-tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama3-70b-8192`
     * - Developer: `Meta`
     * - State: `Production`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    LLAMA3_70B_8192: Object.freeze({
      cd: "llama3-70b-8192",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama3-8b-8192`
     * - Developer: `Meta`
     * - State: `Production`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    LLAMA3_8B_8192: Object.freeze({
      cd: "llama3-8b-8192",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-guard-3-8b`
     * - Developer: `Meta`
     * - State: `Production`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    LLAMA_GUARD_3_8B: Object.freeze({
      cd: "llama-guard-3-8b",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "tg",
      canJSON: false,
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `mixtral-8x7b-32768`
     * - Developer: `Mistral`
     * - State: `Production`
     * - Usage: `Long-Context Text Generation`
     * - Rate Limits:
     *   | RPM | RPD    |
     *   | --- | ------ |
     *   | 30  | 14,400 |
     */
    MIXTRAL_8X7B_32768: Object.freeze({
      cd: "mixtral-8x7b-32768",
      rpm: 30,
      rpd: 14400,
      provider: "groq",
      state: "prod",
      usage: "long-tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `whisper-large-v3`
     * - Developer: `OpenAI`
     * - State: `Production`
     * - Usage: `Automatic Speech Recognition`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 20  | 2,000 |
     */
    WHISPER_LARGE_V3: Object.freeze({
      cd: "whisper-large-v3",
      rpm: 20,
      rpd: 2000,
      provider: "groq",
      state: "prod",
      usage: "stt",
    }),

    /**
     * - ID: `whisper-large-v3-turbo`
     * - Developer: `OpenAI`
     * - State: `Production`
     * - Usage: `Automatic Speech Recognition`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 20  | 2,000 |
     */
    WHISPER_LARGE_V3_TURBO: Object.freeze({
      cd: "whisper-large-v3-turbo",
      rpm: 20,
      rpd: 2000,
      provider: "groq",
      state: "prod",
      usage: "stt",
    }),

    /**
     * - ID: `deepseek-r1-distill-llama-70b-specdec`
     * - Developer: `DeepSeek`
     * - State: `Preview`
     * - Usage: `Reasoning`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 1,000 |
     */
    DEEPSEEK_R1_DISTILL_LLAMA_70B_SPECDEC: Object.freeze({
      cd: "deepseek-r1-distill-llama-70b-specdec",
      rpm: 30,
      rpd: 1000,
      provider: "groq",
      state: "prev",
      usage: "rsn",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `deepseek-r1-distill-llama-70b`
     * - Developer: `DeepSeek`
     * - State: `Preview`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 1,000 |
     */
    DEEPSEEK_R1_DISTILL_LLAMA_70B: Object.freeze({
      cd: "deepseek-r1-distill-llama-70b",
      rpm: 30,
      rpd: 1000,
      provider: "groq",
      state: "prev",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.3-70b-specdec`
     * - Developer: `Meta`
     * - State: `Preview`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 1,000 |
     */
    LLAMA_3_3_70B_SPECDEC: Object.freeze({
      cd: "llama-3.3-70b-specdec",
      rpm: 30,
      rpd: 1000,
      provider: "groq",
      state: "prev",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.2-1b-preview`
     * - Developer: `Meta`
     * - State: `Preview`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 7,000 |
     */
    LLAMA_3_2_1B_PREVIEW: Object.freeze({
      cd: "llama-3.2-1b-preview",
      rpm: 30,
      rpd: 7000,
      provider: "groq",
      state: "prev",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.2-3b-preview`
     * - Developer: `Meta`
     * - State: `Preview`
     * - Usage: `Text Generation`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 7,000 |
     */
    LLAMA_3_2_3B_PREVIEW: Object.freeze({
      cd: "llama-3.2-3b-preview",
      rpm: 30,
      rpd: 7000,
      provider: "groq",
      state: "prev",
      usage: "tg",
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `llama-3.2-11b-vision-preview`
     * - Developer: `Meta`
     * - State: `Preview`
     * - Usage: `Multimodal (Vision & Language)`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 30  | 7,000 |
     */
    LLAMA_3_2_11B_VISION_PREVIEW: Object.freeze({
      cd: "llama-3.2-11b-vision-preview",
      rpm: 30,
      rpd: 7000,
      provider: "groq",
      state: "prev",
      usage: "mm",
    }),

    /**
     * - ID: `llama-3.2-90b-vision-preview`
     * - Developer: `Meta`
     * - State: `Preview`
     * - Usage: `Multimodal (Vision & Language)`
     * - Rate Limits:
     *   | RPM | RPD   |
     *   | --- | ----- |
     *   | 15  | 3,500 |
     */
    LLAMA_3_2_90B_VISION_PREVIEW: Object.freeze({
      cd: "llama-3.2-90b-vision-preview",
      rpm: 15,
      rpd: 3500,
      provider: "groq",
      state: "prev",
      usage: "mm",
    }),
  }),
  /**
   * [TOGETHER_AI](https://www.together.ai)
   * - https://www.together.ai/pricing
   * - https://api.together.ai/settings/plans
   *    - 기본 분당 60회
   *    - 신용카드 등록 시 분당 600회 (Build Tier 1)
   *    - 추가금 충전 시 최대 분당 6000회까지 지원 (Build Tier 2~5)
   * - https://docs.together.ai/docs/introduction
   * - https://docs.together.ai/reference
   */
  TOGETHER_AI: Object.freeze({
    /**
     * - ID: `meta-llama/Llama-3.3-70B-Instruct-Turbo-Free`
     * - Developer: `Meta`
     * - Usage: `Fast Text Generation`
     */
    META_LLAMA_3_3_70B_INSTRUCT_TURBO_FREE: Object.freeze({
      cd: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      rpm: 60,
      rpd: 1440,
      provider: "together-ai",
      state: "free",
      usage: "fast-tg",
      canJSON: false,
      endpoint: "/v1/chat/completions",
    }),

    /**
     * - ID: `stabilityai/stable-diffusion-xl-base-1.0`
     * - Developer: `Stability AI`
     * - Usage: `Image Generation`
     */
    STABLE_DIFFUSION_XL_1_0: Object.freeze({
      cd: "stabilityai/stable-diffusion-xl-base-1.0",
      rpm: 60,
      rpd: 1440,
      provider: "together-ai",
      state: "free",
      usage: "img",
      endpoint: "/v1/images/generations",
    }),

    /**
     * - ID: `black-forest-labs/FLUX.1-schnell-Free`
     * - Developer: `Black Forest Labs`
     * - Usage: `Image Generation`
     */
    FLUX_1_SCHNELL_FREE: Object.freeze({
      cd: "black-forest-labs/FLUX.1-schnell-Free",
      rpm: 60,
      rpd: 1440,
      provider: "together-ai",
      state: "free",
      usage: "img",
      endpoint: "/v1/images/generations",
    }),

    /**
     * - ID: `meta-llama/Llama-Vision-Free`
     * - Developer: `Meta`
     * - Usage: `Multimodal (Vision & Language)`
     */
    META_LLAMA_VISION_FREE: Object.freeze({
      cd: "meta-llama/Llama-Vision-Free",
      rpm: 60,
      rpd: 1440,
      provider: "together-ai",
      state: "free",
      usage: "mm",
    }),

    /**
     * - ID: `deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free`
     * - Developer: `DeepSeek`
     * - Usage: `Reasoning`
     */
    DEEPSEEK_R1_DISTILL_LLAMA_70B_FREE: Object.freeze({
      cd: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
      rpm: 60,
      rpd: 1440,
      provider: "together-ai",
      state: "free",
      usage: "rsn",
      endpoint: "/v1/chat/completions",
    }),
  }),
});

// export const expectedOrigin = window.location.origin;
export const expectedOrigin = "!!!";
