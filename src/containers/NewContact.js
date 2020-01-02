import React, {useRef, useState} from "react";
import {API} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {s3Upload} from "../libs/awsLib";
import config from "../config";
import "./NewContact.css";
import {Form, Select, Input, Button, Typography} from 'antd';

const {Title} = Typography;
const {Option} = Select;

export default function NewContact(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await createContact({name, phone, email, address});
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    async function createContact(contact) {
        const token = await API.get("contacts", "/token", {});
        return API.post("contacts", `/contacts?token=${token}`, {
            body: contact
        });
    }

    return (
        <div className="NewContact">
            <Title>Create new contact</Title>
            <Form labelCol={{span: 5}} wrapperCol={{span: 12}} onSubmit={handleSubmit}>
                <Form.Item label="Name">
                    <Input type="text" value={name} onChange={e => setName(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Phone">
                    <Input type="text" value={phone} onChange={e => setPhone(e.target.value)}/>
                </Form.Item>
                <Form.Item label="Address">
                    <Input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                    >
                        Create
                    </LoaderButton>
                </Form.Item>
            </Form>
        </div>
    );
}
