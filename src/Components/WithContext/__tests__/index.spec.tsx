import React from "react";
import { render, fireEvent } from "@testing-library/react";
import WithContext from "../index";
import { diContext } from "@/WebApplication/DIContext";

function Profile({ name, age }) {
    return (
        <div>
            <p className="name">{name}</p>
            <p className="age">{age}</p>
        </div>
    );
}

const WithContextProfile = WithContext(Profile);

describe("WithContext", () => {
    test("auto injection context to props", () => {
        diContext.name = "XueYou";
        diContext.age = 16;
        const wrapper = render(<WithContextProfile />);

        const name = wrapper.container.querySelector(".name");
        const age = wrapper.container.querySelector(".age");
        expect(name.textContent).toBe("XueYou");
        expect(age.textContent).toBe("16");
        expect(wrapper).toMatchSnapshot();
    });
});
