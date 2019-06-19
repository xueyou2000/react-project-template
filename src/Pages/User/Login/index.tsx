import AntIcon from "@/Components/AntIcon";
import { LoginDto } from "@/Interface/AuthorizeInterface";
import AuthorizeService from "@/Services/AuthorizeService";
import { ForgetPasswordtPath } from "@/WebApplication/RoutesConfig";
import React, { useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Alert from "xy-alert";
import "xy-alert/assets/index.css";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { Form, FormItem, FormSubmitButton } from "xy-form";
import "xy-form/assets/index.css";
import { ValidateConfig } from "xy-form/es/ValidateUtils/ValidateInterface";
import "xy-grid/assets/index.css";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import "./index.scss";

const authorizeService = new AuthorizeService();

const LoginValidConfig: ValidateConfig<LoginDto> = {
    username: [{ name: "Required", errMsg: "账号必填" }, { name: "RangeLength", params: [5, 12] }],
    password: [{ name: "Required", errMsg: "密码必填" }, { name: "RangeLength", params: [6, 18] }]
};

function UserLogin({ history }: RouteComponentProps) {
    const [failError, setFailError] = useState<string>(null);

    function submit(data: any) {
        return authorizeService
            .login(data)
            .then(() => {
                history.push("/");
            })
            .catch((error) => {
                setFailError(error.message);
            });
    }

    return (
        <div>
            <p className="landing-title">欢迎登录</p>
            <div className="login-inner">
                <Alert message={failError} type="error" visible={!!failError} onClose={() => setFailError(null)} showIcon={true} closable={true} />

                <Form validConfig={LoginValidConfig} onSubmit={submit}>
                    <FormItem prop="username">
                        <Input prefix={<AntIcon icon="user" />} placeholder="输入账号/手机号" />
                    </FormItem>
                    <FormItem prop="password">
                        <Input prefix={<AntIcon icon="lock" />} placeholder="输入您的密码" type="password" />
                    </FormItem>
                    <FormItem>
                        <FormSubmitButton>
                            <Button long={true} size="large" type="primary">
                                登陆
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

export default React.memo(withRouter(UserLogin));
