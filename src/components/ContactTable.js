import React, { useRef, useState, useEffect } from "react";
import {Checkbox, DatePicker, Table} from 'antd';
import moment from "moment";

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
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
        render: text => text ? <DatePicker disabled value={moment(text)}/> : ''
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
