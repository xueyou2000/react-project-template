import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Result from "@/Components/Result";
import { RedirectPath } from "@/WebApplication/RoutesConfig";
import "./index.scss";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import AntIcon from "@/Components/AntIcon";

function ResetPasswordResult({ history, location }: RouteComponentProps<any, any, { phone: string }>) {
    const { state } = location;
    if (!state || !state.phone) {
        history.replace(RedirectPath);
    }

    return (
        <Result
            className="reset-password-result"
            status="success"
            title={`你的账户：${state.phone} 找回成功`}
            description="新密码将通过手机短信发送给您，请注意接收。请及时登录，修改密码。"
            actions={
                <Button type="primary" onClick={() => history.push("/")}>
                    <AntIcon icon="rollback" style={{ marginRight: "4px" }} />
                    返回登录
                </Button>
            }
        />
    );
}

export default React.memo(withRouter(ResetPasswordResult));
