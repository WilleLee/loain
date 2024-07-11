import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import Cookies from "js-cookie";

const axiosMethods: Record<Method, "get" | "post" | "patch" | "delete"> = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};

const apibase = process.env.NEXT_PUBLIC_API_BASE as string;

const instance = axios.create({
  timeout: 5000,
  baseURL: apibase,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    // 요청 성공 직전 호출
    if (typeof window !== "undefined") {
      console.log("client side fetching");
      const loginToken = Cookies.get("login-token");
      const accessToken = Cookies.get("access-token");
      if (!!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else if (!!loginToken) {
        config.headers.Authorization = `Bearer ${loginToken}`;
      }
    }

    return config;
  },
  function (err) {
    // 에러 핸들링
    console.error(err);
    return Promise.reject("요청에 실패했습니다.");
  },
);

instance.interceptors.response.use(
  function (response: AxiosResponse<any, any>) {
    return response;
  },
  function (err) {
    // console.error(err);
    const errObj = {
      error: err.response?.data?.error?.message || "다시 시도해주세요.",
      code: err.response?.data?.error?.code || "00000",
    };
    return Promise.reject(errObj);
  },
);

export async function fetcher<T>(
  method: Method,
  input: Path,
  options?: AxiosRequestConfig<any>,
): Promise<IResponse<T>> {
  try {
    const data = await instance[axiosMethods[method]](input, options);
    return {
      isSuccessful: true,
      data: data.data,
      error: "",
      code: "",
    };
  } catch (err) {
    const { error, code } = err as { error: string; code: string };
    return {
      isSuccessful: false,
      data: null,
      error: error,
      code: code,
    };
  }
}

type IResponse<T> = {
  isSuccessful: boolean;
  data: T | null;
  error: string;
  code: string;
};

type Path = `/${string}`;

type Method = "GET" | "POST" | "PATCH" | "DELETE";
