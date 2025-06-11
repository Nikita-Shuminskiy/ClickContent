import configuration from "../config";
import StorageService from "@/core/service/storage-service.ts";

export class ApiError extends Error {
    info: any;
    status: number;
}

export class ApiParseError extends Error {
    info: any;
}

export class ApiAuthError extends Error {
    code: number;
    info: any;
}

export class ApiNetworkError extends Error {
    info: any;
}

const jsonTypes = ["application/json", "application/json; charset=utf-8"];
const textTypes = [
    "text/plain",
    "text/plain; charset=utf-8",
    "text/html; charset=utf-8",
];

async function responseHandler(res: Response) {
    let data;
    try {
        const type =
            res.headers.get("content-type")?.trim().toLocaleLowerCase() ?? "";
        if (textTypes.includes(type)) {
            data = await res.text();
            try {
                data = JSON.parse(data);
            } catch (e) {
            }
        } else if (jsonTypes.includes(type)) {
            data = await res.json();
        } else {
            data = await res.blob();
        }
    } catch (e) {
        console.log("catch ApiParseError", e.message);
        const error = new ApiParseError(e.message);
        error.info = e.stack;
        throw error;
    }
    if ([401, 403].includes(res.status)) {
        const error = new ApiAuthError(data.error);
        error.code = res.status;
        error.info = data;
        throw error;
    }
    if (data.error || data.ErrorType || !res.ok) {
        const errorMessage =
            data.error_message ||
            data.error ||
            data.Message ||
            data.errorMessage ||
            data.Errors?.[0] ||
            "Что-то пошло не так. Ошибка сервера";

        const newData = {...data, error: errorMessage};

        const error = new ApiError(errorMessage);
        error.info = newData;
        error.status = res.status;
        throw error;
    }
    return data;
}

const controllers: Record<string, AbortController[]> = {};

export const get = async (path: string) => {
    if (!controllers[path]) {
        controllers[path] = [];
    } else {
        controllers[path]?.forEach((controller) => {
            controller.abort();
        });
    }

    const currentController = new AbortController();
    controllers[path]?.push(currentController);

    const token = 'StorageService.getUser()?.accessToken;'
    // const token = await read(config.tokenKey);
    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    let res: Response;
    try {
        res = await fetch(`${configuration.API_URL}${path}`, {
            method: "GET",
            headers: headers,
            signal: currentController.signal,
        });

        controllers[path] =
            controllers[path]?.filter((controller) => {
                return controller !== currentController;
            }) || [];
    } catch (e) {
        throw handleNetworkError(e);
    }

    return await responseHandler(res);
};

export const post = async <Request = any>(
    path: string,
    {arg}: { arg: Request },
) => {
    if (!path) {
        return null;
    }
    const token = 'StorageService.getUser()?.accessToken;'
    // const token = await read(config.tokenKey);
    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    let res: Response;
    try {
        res = await fetch(`${configuration.API_URL}${path}`, {
            method: "POST",
            headers,
            body: JSON.stringify(arg),
        });
    } catch (e) {
        throw handleNetworkError(e);
    }
    return await responseHandler(res);
};
export const postBaseURL = async <Request = any>(
    path: string,
    {arg}: { arg: Request },
) => {
    if (!path) {
        return null;
    }
    const token = 'StorageService.getUser()?.accessToken;'
    // const token = await read(config.tokenKey);
    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    let res: Response;
    try {
        res = await fetch(`${configuration.BASE_URL}${path}`, {
            method: "POST",
            headers,
            body: JSON.stringify(arg),
        });
    } catch (e) {
        throw handleNetworkError(e);
    }
    return await responseHandler(res);
};

function handleNetworkError(e: any) {
    if (e.name === "AbortError") {
        return;
    }

    const error = new ApiNetworkError(e.message);
    error.info = {
        stack: e.stack,
        fileds: [{field: "internet", message: "Проблемы с сетью"}],
    };
    return error;
}
