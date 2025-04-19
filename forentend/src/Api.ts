import axios from "axios";

export type ApiCallPAramType = {
    endpoint: string;
    payload?: any;
};

const BaseUrl = "https://5bdb-105-102-32-127.ngrok-free.app";
const header = { headers: { Authorization: `Bearer ${window.localStorage.getItem("accessToken")}` } };

export async function getApi({ endpoint, payload }: ApiCallPAramType) {
    try {
        const res = await axios.get(`${BaseUrl}${endpoint}/`, header);
        const { status, data } = res;

        return { data, error: false };
    } catch (error) {
        console.log("🚀 ~ file: Api.ts:12 ~ getApi ~ error:", error);
        return { error: true, data: error.message };
    }
}
export async function postApi({ endpoint, payload }: ApiCallPAramType) {
    try {
        const res = await axios.post(`${BaseUrl}${endpoint}/`, payload, header);
        const { status, data } = res;

        return { data, error: false };
    } catch (error) {
        console.log("🚀 ~ file: Api.ts:12 ~ getApi ~ error:", error);
        return { error: true, data: error.message };
    }
}
export async function putApi({ endpoint, payload }: ApiCallPAramType) {
    try {
        const res = await axios.put(`${BaseUrl}${endpoint}/`, payload, header);
        const { status, data } = res;

        return { data, error: false };
    } catch (error) {
        console.log("🚀 ~ file: Api.ts:12 ~ getApi ~ error:", error);
        return { error: true, data: error.message };
    }
}
export async function patchApi({ endpoint, payload }: ApiCallPAramType) {
    try {
        const res = await axios.patch(`${BaseUrl}${endpoint}`, payload, header);
        const { status, data } = res;

        return { data, error: false };
    } catch (error) {
        console.log("🚀 ~ file: Api.ts:12 ~ getApi ~ error:", error);
        return { error: true, data: error.message };
    }
}
