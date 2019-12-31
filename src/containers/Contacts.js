import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Contacts.css";

export default function Contacts(props) {
    const file = useRef(null);
    const [contact, setContact] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadContact() {
            return API.get("contacts", `/contacts/${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const contact = await loadContact();
                const { content, attachment } = contact;

                if (attachment) {
                    contact.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setContact(contact);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveContact(contact) {
        return API.put("contacts", `/contacts/${props.match.params.id}`, {
            body: contact
        });
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }

        setIsLoading(true);

        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveContact({
                content,
                attachment: attachment || contact.attachment
            });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function deleteContact() {
        return API.del("contacts", `/contacts/${props.match.params.id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteContact();
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Contacts">
            {contact && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}
