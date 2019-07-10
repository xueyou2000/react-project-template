import React from "react";
import { Dict, DictItem } from "@/Interface/ProjectInterface";
import { Select, Option, ValidateError } from "@/Components/MyComponentTools";
import { highlightInputElement } from "./ValidateHelper";

/**
 * 渲染字典值根据key
 * @param dictItems
 * @param key
 */
export function renderDictValue(dictItems: DictItem[], key: string) {
    const item = dictItems.find((x) => x.key === key);
    return <span style={{ color: item && item.color }}>{(item && item.value) || key}</span>;
}

/**
 * 渲染下拉列表
 * @param dictItems
 * @param showAllOption
 */
export function renderSelect(dictItems: DictItem[], showAllOption?: boolean) {
    return (
        <Select>
            {showAllOption && (
                <Option key="all-option" value={null}>
                    全部
                </Option>
            )}
            {dictItems.map((dictItem) => (
                <Option key={dictItem.key} value={dictItem.key}>
                    {dictItem.value}
                </Option>
            ))}
        </Select>
    );
}

/**
 * 表单验证提示工具
 * @param error
 * @param data
 */
export function FormValidateTips(error: ValidateError, data: any) {
    console.error("表单验证失败: ", error.message, data);
    if (error.input) {
        highlightInputElement(error.input);
    }
}
