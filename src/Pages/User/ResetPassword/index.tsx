import AntIcon from "@/Components/AntIcon";
import React, { useState, useRef } from "react";
import { ResetPasswordDto } from "@/Interface/AuthorizeInterface";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { RedirectPath, ForgetPasswordtResultPath } from "@/WebApplication/RoutesConfig";
import AuthorizeService from "@/Services/AuthorizeService";
import Alert from "xy-alert";
import "xy-alert/assets/index.css";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { Form, FormItem, FormSubmitButton } from "xy-form";
import "xy-form/assets/index.css";
import { ValidateConfig, ValidateResult } from "xy-form/es/ValidateUtils/ValidateInterface";
import "xy-grid/assets/index.css";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import Countdown from "@/Components/Countdown";
import { FormMethods } from "xy-form/es/interface";
import "../Login/index.scss";

import Tooltip from "xy-tooltip";
import "xy-tooltip/assets/index.css";
import { highlightInputElement } from "@/Utils/ValidateHelper";

const authorizeService = new AuthorizeService();

const ResetPasswordValidConfig: ValidateConfig<ResetPasswordDto> = {
    phone: [{ name: "Required", errMsg: "手机号必填" }, { name: "PhoneNo" }],
    verifyCode: [{ name: "Required", errMsg: "验证码必填" }, { name: "RangeLength", params: [6, 6], errMsg: "验证码应为6位数" }]
};

function UserResetPassword({ history }: RouteComponentProps) {
    const formMethodsRef = useRef<FormMethods>(null);
    const [disabledCountdown, setDisabledCountdown] = useState(true);
    const [failError, setFailError] = useState<string>(null);

    function submit(data: ResetPasswordDto) {
        return authorizeService
            .resetPassword(data)
            .then(() => {
                history.push(ForgetPasswordtResultPath, { phone: data.phone });
            })
            .catch((error) => {
                setFailError(error.message);
            });
    }

    async function sendValidCode(disabled: boolean) {
        const formMethods = formMethodsRef.current;
        const phone = formMethods.getFieldValue("phone");

        try {
            if (disabled) {
                highlightInputElement(formMethods.getFieldInput("phone"));
                return false;
            }
            await formMethods.validateField("phone");
            await authorizeService.sendVerifyCodeByPhone(phone);
            return true;
        } catch (error) {
            setFailError(error.message);
            highlightInputElement(formMethods.getFieldInput("phone"));
            return false;
        }
    }

    function onPhoneValidateChange(val: string, validateResult: ValidateResult) {
        if (validateResult.status === disabledCountdown) {
            setDisabledCountdown(!validateResult.status);
        }
    }

    return (
        <div>
            <p className="landing-title">找回密码</p>
            <div className="login-inner">
                <Alert message={failError} type="error" visible={!!failError} onClose={() => setFailError(null)} showIcon={true} closable={true} />

                <Form validConfig={ResetPasswordValidConfig} onSubmit={submit} getFormMethods={(methods) => (formMethodsRef.current = methods)}>
                    <FormItem prop="phone" onValidate={onPhoneValidateChange}>
                        <Input prefix={<AntIcon icon="phone" />} placeholder="输入登录手机号" />
                    </FormItem>
                    <FormItem prop="verifyCode">
                        <Input
                            prefix={<AntIcon icon="unlock" />}
                            placeholder="输入短信验证码"
                            addonAfter={
                                <Countdown disabled={disabledCountdown} onStart={sendValidCode}>
                                    获取验证码
                                </Countdown>
                            }
                        />
                    </FormItem>
                    <FormItem>
                        <FormSubmitButton>
                            <Button long={true} size="large" type="primary">
                                确定
                            </Button>
                        </FormSubmitButton>
                    </FormItem>
                </Form>
                <div className="landing-links">
                    <Link to={RedirectPath} className="fr">
                        已有账号，请登录 》
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(withRouter(UserResetPassword));
