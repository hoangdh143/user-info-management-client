import React, { useRef, useState, useEffect } from "react";
import {Checkbox, Table} from 'antd';

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
        title: 'Select to send message',
        dataIndex: 'selected',
        key: 'selected',
        render: (text, record) => {
            return (<>
                <Checkbox onChange={e => {record.addToMessageQueue(e, record)}}/>
            </>)
        }
    },
];

export default function ContactTable({dataSource, ...props}) {
    return(
        <Table dataSource={dataSource} columns={columns} {...props}/>
    );
}
