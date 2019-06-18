import { ForgetPasswordtPath } from "@/WebApplication/RoutesConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { Form, FormItem, FormSubmitButton } from "xy-form";
import "xy-form/assets/index.css";
import "xy-grid/assets/index.css";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import "./index.scss";
import AntIcon from "@/Components/AntIcon";

function UserLogin() {
    function submit(data: any) {
        console.log("提交", data);
    }

    return (
        <div>
            <p className="landing-title">欢迎登录</p>
            <div className="login-inner">
                <Form onSubmit={submit}>
                    <FormItem prop="username">
                        <Input prefix={<AntIcon icon="user" />} placeholder="输入账号/手机号" />
                    </FormItem>
                    <FormItem prop="password">
                        <Input prefix={<AntIcon icon="lock" />} placeholder="输入您的密码" type="password" />
                    </FormItem>
                    <FormItem>
                        <FormSubmitButton>
                            <Button long={true} size="large" type="primary">
                                登录
                            </Button>
                        </FormSubmitButton>
                    </FormItem>
                </Form>
                <div className="landing-links">
                    <Link to={ForgetPasswordtPath} className="fr">
                        忘记密码?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(UserLogin);
