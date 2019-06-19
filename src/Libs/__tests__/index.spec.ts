jest.mock("axios");
import Request, { RequestError } from "../request";
import Axios, { AxiosInstance } from "axios";
import { ResponseGeneric } from "@/Interface/ResponseInterface";

describe("Request", () => {
    test("use post methods fetch data", () => {
        Axios.create = jest.fn(() => ({ post: jest.fn() })) as any;
        const data: ResponseGeneric = { status: "200", data: { name: "XueYou", age: 66 } };
        const request = new Request("/boss");
        const mockFetch: jest.Mocked<AxiosInstance> = request.fetch as any;
        mockFetch.post.mockImplementation(() => Promise.resolve({ data, status: 200 }));
        return request.post("/user").then((d) => expect(d).toEqual(data));
    });

    test("fetch fail", () => {
        Axios.create = jest.fn(() => ({ post: jest.fn() })) as any;
        const data: ResponseGeneric = { status: "401", msg: "请先登录" };
        const request = new Request("/boss");
        const mockFetch: jest.Mocked<AxiosInstance> = request.fetch as any;
        mockFetch.post.mockImplementation(() => Promise.resolve({ data, status: 200 }));
        return request
            .post("/user")
            .then((d) => expect(d).toEqual(data))
            .catch((error: RequestError) => {
                expect(error.message).toBe("请先登录");
                expect(error.response.data).toEqual(data);
                expect(error.statusCode).toBe("401");
            });
    });
});
