import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoadComponent from "../index";

describe("LoadComponent", () => {
    const mockMatchMedia = jest
        // 默认
        .fn(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() }))
        // 第一次结果
        .mockImplementationOnce(() => ({ matches: true, addListener: jest.fn(), removeListener: jest.fn() }))
        // 第二次结果
        .mockImplementationOnce(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() }));

    (global as any).matchMedia = mockMatchMedia;

    test("async load component", async () => {
        const fn = jest.fn(() => import(/* webpackChunkName: "user" */ "./TestComponent"));

        const Component = LoadComponent(fn);
        const wrapper = render(<Component />);

        const skeleton = wrapper.container.querySelector(".xy-skeleton");
        expect(skeleton.classList.contains("loading")).toBeTruthy();

        await fn();

        expect(wrapper.getByText("被异步加载的组件")).toBeDefined();
    });
});
