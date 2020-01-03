import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import {Link} from "react-router-dom";
import ContactTable from "../components/ContactTable";

export default function Home(props) {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    function renderContactsList(contacts) {
        return (
            <ContactTable dataSource={contacts}/>
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
