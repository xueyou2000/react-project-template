import modelPopup from "@/Components/ModelPopup";
import { Button, Col, DatePicker, Divider, FormArrayBlock, FormBlock, FormItem, FormItemField, Input, InputNumber, Row, TableColumn } from "@/Components/MyComponentTools";
import QueryPage from "@/Components/QueryPage";
import withContext from "@/Components/WithContext";
import { MenuQueryDto, MenuQueryResult } from "@/Interface/MenuInterface";
import { ApplicationContextProps, DictItemsMap } from "@/Interface/ProjectInterface";
import MenuService from "@/Services/MenuService";
import { renderDictValue, renderSelect } from "@/Utils/PageUtils";
import React, { useRef, useState } from "react";
import { useMount } from "utils-hooks";
import MenuAddForm from "./MenuAddForm";

const menuService = new MenuService();

function MenuQuery(props: ApplicationContextProps) {
    const { dictService } = props;
    // 字典
    const [dictMaps, setDictMaps] = useState<DictItemsMap>({
        ENABLE_OR_UNENABLE: [],
    });
    // 查询条件
    const queryDtoRef = useRef<MenuQueryDto>({
        queryBaseDto: {
            dateTimeIntervals: [
                {
                    startTime: null,
                    endTime: null,
                    columnsField: "createTime",
                },
            ],
        },
        menu: {
            name: null,
            path: null,
            displayOrder: null,
            levels: null,
            parentId: null,
            status: "ENABLE",
            label: null,
        },
    });
    // 表格列
    const columusRef = useRef<TableColumn[]>([
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "路径",
            dataIndex: "path",
        },
        {
            title: "级别",
            dataIndex: "levels",
        },
        {
            title: "父节点ID",
            dataIndex: "parentId",
        },
        {
            title: "状态",
            dataIndex: "status",
            render: (record: MenuQueryResult, rowIndex) => {
                return renderDictValue(dictMaps.ENABLE_OR_UNENABLE, record.statusLabel || record.status);
            },
        },
        {
            title: "操作",
            width: 100,
            fixed: "right",
            render: (record: MenuQueryResult, rowIndex) => {
                return (
                    <div>
                        <a>修改</a>
                        <Divider type="vertical" />
                        <a>删除</a>
                    </div>
                );
            },
        },
    ]);

    // 获取字典
    function fetchDependDict() {
        dictService
            .findDictItems(["ENABLE_OR_UNENABLE"])
            .then((dictMaps) => {
                setDictMaps(dictMaps);
            })
            .catch((error) => {
                console.error("加载字典失败", error.message);
            });
    }

    function showAddModel() {
        modelPopup("新增菜单", <MenuAddForm />);
    }

    useMount(() => {
        fetchDependDict();
    });

    return (
        <QueryPage title="菜单管理" queryDto={queryDtoRef.current} columus={columusRef.current} findPage={(a, b) => menuService.findByPage(a, b)} extedBtns={<Button onClick={showAddModel}>添加</Button>}>
            <FormBlock prop="menu">
                <FormItem prop="name" label="菜单名称">
                    <Input />
                </FormItem>
                <FormItem prop="path" label="菜单路径">
                    <Input />
                </FormItem>
                <FormItem prop="levels" label="级别">
                    <InputNumber />
                </FormItem>
                <FormItem prop="parentId" label="父节点ID">
                    <InputNumber />
                </FormItem>
                <FormItem prop="status" label="状态">
                    {renderSelect(dictMaps.ENABLE_OR_UNENABLE, true)}
                </FormItem>
            </FormBlock>
            <FormBlock prop="queryBaseDto">
                <FormBlock prop="dateTimeIntervals">
                    <FormArrayBlock index={0}>
                        <FormItem label="创建时间" className="not-width-limit">
                            <Row gutter={10}>
                                <Col span={11}>
                                    <FormItemField prop="startTime">
                                        <DatePicker showTime={true} />
                                    </FormItemField>
                                </Col>
                                <Col span={11}>
                                    <FormItemField prop="endTime">
                                        <DatePicker showTime={true} />
                                    </FormItemField>
                                </Col>
                            </Row>
                        </FormItem>
                    </FormArrayBlock>
                </FormBlock>
            </FormBlock>
        </QueryPage>
    );
}

export default React.memo(withContext(MenuQuery));
