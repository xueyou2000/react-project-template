import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AuthorizedRoute from "../index";
import { MemoryRouter, Route } from "react-router-dom";
import { diContext } from "@/WebApplication/DIContext";
import Authorization from "@/Stores/Authorization";
import { RedirectPath } from "@/WebApplication/RoutesConfig";

describe("AuthorizedRoute", () => {
    test("when does not exist bearer token, redirect route", () => {
        diContext.authorization = new Authorization();

        const wrapper = render(
            <MemoryRouter initialEntries={["/abc"]}>
                <AuthorizedRoute path="/" />
                <Route path={RedirectPath} render={() => <p>请登录</p>} />
            </MemoryRouter>
        );
        expect(wrapper.getByText("请登录")).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    test("when exist bearer token, allowed to pass route", () => {
        sessionStorage.setItem(Authorization.StorageKeyWord, "asdsadsad");
        diContext.authorization = new Authorization();

        function Home() {
            return <p>Home</p>;
        }

        const wrapper = render(
            <MemoryRouter initialEntries={["/abc"]}>
                <AuthorizedRoute path="/" component={Home} />
                <Route path={RedirectPath} render={() => <p>请登录</p>} />
            </MemoryRouter>
        );
        expect(wrapper.getByText("Home")).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });
});
