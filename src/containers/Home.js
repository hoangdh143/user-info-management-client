import React, {useState, useEffect, useRef} from "react";
import {API} from "aws-amplify";
import {LinkContainer} from "react-router-bootstrap";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import "./Home.css";
import ContactTable from "../components/ContactTable";
import {Button, Modal, Input, PageHeader} from 'antd';
import {Link} from "react-router-dom";

const {TextArea} = Input;

export default function Home(props) {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const messageQueue = useRef([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [messageResult, setMessageResult] = useState(null);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const contacts = await loadContacts();
                setContacts(contacts);
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);

    function loadContacts() {
        return API.get("contacts", "/contacts");
    }

    function addToMessageQueue(e, contact) {
        if (e.target.checked) {
            messageQueue.current.push(contact);
        } else {
            messageQueue.current.splice(messageQueue.current.indexOf(contact), 1);
        }
    }

    function handleCancel() {
        setModalVisible(false);
    }

    function openMessageForm() {
        setMessageResult(null);
        setModalVisible(true);
    }

    function handleOk() {
        setModalLoading(true);
        const numbers = messageQueue.current.map(contact => contact.phone);
        API.post('contacts', '/message', {
            body: {
                type: 'selected',
                to: numbers,
                message: messageContent,
            }
        }).then((response) => {
            setModalLoading(false);
            const results = response.map(res => (
                <p key={res.number}>
                    {res.status === 'success' ? `${res.number}: Message sent successfully`
                        : `${res.number} : Message sent error: ${res.message}`}
                </p>)
            );
            console.log(results);
            setMessageResult(results);
        }).catch((error) => {
                setModalLoading(false);
                setMessageResult(`Message sent error: ${error}`)
            }
        );
    }

    function renderContactsList(contacts) {
        const contactsWithButton = contacts.map(contact => ({...contact, key: contact.contactId, addToMessageQueue}));
        return (
            <React.Fragment>
                <ContactTable dataSource={contactsWithButton}
                              footer={() => (<Button onClick={openMessageForm} type='primary'>Send Message</Button>)}/>
                <Modal
                    visible={modalVisible}
                    title="Message"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        messageResult ? <span key="submit"/> :
                            <Button key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                                Send Message
                            </Button>,
                    ]}
                >
                    {messageResult ? <div>{messageResult}</div> :
                        <div>
                            <p style={{overflow: "hidden"}}>To: {messageQueue.current.map(contact => contact.phone).join("; ")}</p>
                            <TextArea rows={4} onChange={e => setMessageContent(e.target.value)}
                                      value={messageContent}/>
                        </div>
                    }
                </Modal>
            </React.Fragment>
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>User Info Management</h1>
                <p>A simple contact taking app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    function renderContacts() {
        return (
            <div className="contacts">
                <PageHeader>Your Contacts</PageHeader>
                <ListGroup>
                    {!isLoading && renderContactsList(contacts)}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            <LinkContainer key="new" to="/contacts/new">
                <ListGroupItem>
                    <h4>
                        <b>{"\uFF0B"}</b> Create a new contact
                    </h4>
                </ListGroupItem>
            </LinkContainer>
            {props.isAuthenticated ? renderContacts() : renderLander()}
        </div>
    );
}
