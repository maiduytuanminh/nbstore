import React, { useState, useMemo } from "react";
import { Excel } from "antd-table-saveas-excel";
import {
    StyledTable,
    TableActions,
    DeleteAllButton,
    ExportButton,
} from "./style";

const TableComponent = (props) => {
    const {
        selectionType = "checkbox",
        data: dataSource = [],
        columns = [],
        handleDelteMany,
        pagination = { pageSize: 7 },
        dataSource: propDataSource, // Thêm prop này để xử lý
        exportConfig = {
            fileName: "Danh-sach-du-lieu",
            sheetName: "Danh sách dữ liệu"
        }
    } = props;

    // Sử dụng dataSource từ props hoặc data
    const finalDataSource = propDataSource || dataSource || [];

    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const newColumnExport = useMemo(() => {
        return columns?.filter((col) => {
            // Loại bỏ các cột hành động
            return col.dataIndex !== "action" &&
                   col.key !== "action" &&
                   col.title !== "Hành động" &&
                   col.title !== "Thao tác";
        });
    }, [columns]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            name: record.name,
        }),
    };

    const handleDeleteAll = () => {
        handleDelteMany(rowSelectedKeys);
    };

    const exportExcel = () => {
        console.log("Export Excel - Columns:", newColumnExport);
        console.log("Export Excel - Final DataSource:", finalDataSource);

        // Kiểm tra nếu không có dữ liệu
        if (!finalDataSource || finalDataSource.length === 0) {
            console.warn("Không có dữ liệu để xuất Excel");
            return;
        }

        // Chuyển đổi data để phù hợp với Excel export
        const exportData = finalDataSource?.map((item, index) => {
            const row = {};
            newColumnExport.forEach(col => {
                if (col.dataIndex) {
                    let value = item[col.dataIndex];

                    // Sử dụng render function nếu có để xử lý data
                    if (col.render && typeof col.render === 'function') {
                        try {
                            const renderedValue = col.render(value, item, index);

                            // Xử lý các trường hợp đặc biệt dựa trên dataIndex
                            if (col.dataIndex === 'isBestSeller') {
                                // Với Switch component, lấy giá trị boolean gốc
                                value = value ? 'Có' : 'Không';
                            } else if (col.dataIndex === 'isAdmin') {
                                // Xử lý boolean isAdmin
                                value = value ? 'Có' : 'Không';
                            } else if (typeof renderedValue === 'string' || typeof renderedValue === 'number') {
                                // Nếu render return string hoặc number, sử dụng trực tiếp
                                value = renderedValue;
                            } else if (typeof renderedValue === 'object' && renderedValue !== null) {
                                // Xử lý React element
                                if (renderedValue.props) {
                                    // Nếu có props.children, lấy children
                                    if (renderedValue.props.children !== undefined) {
                                        const children = renderedValue.props.children;
                                        if (typeof children === 'string' || typeof children === 'number') {
                                            value = children;
                                        } else if (Array.isArray(children)) {
                                            // Nếu children là array, join lại
                                            value = children.join(' ');
                                        } else {
                                            value = '';
                                        }
                                    } else {
                                        // Fallback cho các component không có children
                                        value = '';
                                    }
                                } else {
                                    value = '';
                                }
                            } else {
                                value = renderedValue || '';
                            }
                        } catch (error) {
                            console.warn(`Error rendering column ${col.dataIndex}:`, error);
                            // Fallback: xử lý giá trị gốc
                            if (col.dataIndex === 'isBestSeller' || col.dataIndex === 'isAdmin') {
                                value = value ? 'Có' : 'Không';
                            } else {
                                value = '';
                            }
                        }
                    } else {
                        // Xử lý object data
                        if (typeof value === 'object' && value !== null) {
                            // Nếu là object, cố gắng lấy một field phù hợp
                            if (col.dataIndex === 'shippingAddress' && value.address) {
                                value = value.address;
                            } else if (value.name) {
                                value = value.name;
                            } else if (value.toString && typeof value.toString === 'function') {
                                value = value.toString();
                            } else {
                                value = JSON.stringify(value);
                            }
                        }

                        // Xử lý boolean cho các trường đặc biệt
                        if (col.dataIndex === 'isAdmin' || col.dataIndex === 'isBestSeller') {
                            value = value ? 'Có' : 'Không';
                        }
                    }                    row[col.title] = value || '';
                }
            });
            return row;
        }) || [];

        console.log("Export Excel - Processed Data:", exportData);

        const excel = new Excel();
        excel
            .addSheet(exportConfig.sheetName)
            .addColumns(newColumnExport.map(col => ({ title: col.title, dataIndex: col.title })))
            .addDataSource(exportData, {
                str2Percent: true,
            })
            .saveAs(`${exportConfig.fileName}.xlsx`);
    };

    return (
        <div>
            <TableActions>
                {!!rowSelectedKeys.length && (
                    <DeleteAllButton onClick={handleDeleteAll}>
                        Xóa tất cả
                    </DeleteAllButton>
                )}
                <ExportButton onClick={exportExcel}>Xuất Excel</ExportButton>
            </TableActions>

            <StyledTable
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={finalDataSource}
                pagination={pagination}
                {...props}
            />
        </div>
    );
};

export default TableComponent;
