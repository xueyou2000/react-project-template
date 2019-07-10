import { Button, Form, FormItem, FormMethods, FormSubmitButton, Input, InputNumber, MessageBoxPopup, ModelContext, ModelFooter, Spin, ValidateConfig } from "@/Components/MyComponentTools";
import withContext from "@/Components/WithContext";
import { MenuAdd } from "@/Interface/MenuInterface";
import { ApplicationContextProps } from "@/Interface/ProjectInterface";
import MenuService from "@/Services/MenuService";
import { FormValidateTips } from "@/Utils/PageUtils";
import React, { useContext, useRef, useState } from "react";

const menuService = new MenuService();

const MenuAddConfig: ValidateConfig<MenuAdd> = {
    name: [{ name: "Required" }, { name: "RangeLength", params: [1, 7] }],
    path: [{ name: "Required" }],
    levels: [
        { name: "Required" },
        {
            name: "LevelCheck",
            errMsg: "级别必须为1或2",
            method: (val: number) => {
                return val === 1 || val === 2;
            },
        },
    ],
    parentId: [{ name: "Required" }],
};

function MenuAddForm(props: ApplicationContextProps) {
    const [loading, setLoading] = useState(false);
    const close = useContext(ModelContext);
    const formMethodsRef = useRef<FormMethods>(null);
    const defaultModel = useRef<MenuAdd>({
        status: "ENABLE",
    });

    function submit(data: MenuAdd) {
        setLoading(true);
        return menuService
            .addMenu(data)
            .then(() => {
                setLoading(false);
                close();
                return true;
            })
            .catch((error) => {
                setLoading(false);
                MessageBoxPopup.Alert({ title: "新增菜单失败", message: error.message, type: "error" });
            });
    }

    return (
        <Form labelWidth="70px" onValidateFail={FormValidateTips} defaultModel={defaultModel.current} onSubmit={submit} getFormMethods={(methods) => (formMethodsRef.current = methods)} validConfig={MenuAddConfig}>
            <Spin spinning={loading} inline={false}>
                <div className="fake-model-body">
                    <FormItem label="菜单名称" prop="name">
                        <Input />
                    </FormItem>
                    <FormItem label="菜单路径" prop="path">
                        <Input />
                    </FormItem>
                    <FormItem label="级别" prop="levels">
                        <InputNumber />
                    </FormItem>
                    <FormItem label="父节点ID" prop="parentId">
                        <InputNumber />
                    </FormItem>
                    <FormItem label="显示顺序" prop="displayOrder">
                        <InputNumber />
                    </FormItem>
                </div>
            </Spin>

            <ModelFooter>
                <Button type="text">取消</Button>
                <FormSubmitButton>
                    <Button className="submit-btn" type="primary">
                        确定
                    </Button>
                </FormSubmitButton>
            </ModelFooter>
        </Form>
    );
}

export default withContext(MenuAddForm);
