import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AntIcon from "../index";

describe("AntIcon", () => {
    test("render icon", () => {
        const wrapper = render(<AntIcon icon="user" />);

        const icon = wrapper.container.querySelector(".ant_icon");
        expect(icon.classList.contains("ant_icon-user")).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test("spin", () => {
        const wrapper = render(<AntIcon icon="user" spin={true} />);
        const icon = wrapper.container.querySelector(".ant_icon");
        expect(icon.classList.contains("ant_icon-spin")).toBeTruthy();
        expect(wrapper).toMatchSnapshot();
    });

    test("onClick", () => {
        const fn = jest.fn();
        const wrapper = render(<AntIcon icon="user" onClick={fn} />);
        const icon = wrapper.container.querySelector(".ant_icon");

        expect(fn).not.toBeCalled();

        fireEvent.click(icon);

        expect(fn).toBeCalled();
    });
});
