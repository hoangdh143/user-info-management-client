import React, { useRef, useState, useEffect } from "react";
import {Table} from 'antd';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Created at',
        dataIndex: 'createAt',
        key: 'createAt',
    },
];

export default function ContactTable({dataSource}) {
    return(
        <Table dataSource={dataSource} columns={columns} />
    );
}
