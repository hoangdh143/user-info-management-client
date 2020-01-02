import React, {useState, useEffect} from "react";
import {Auth} from "aws-amplify";
import {FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>

                <div className="social-login-buttons">
                    <Button variant="outline-primary" onClick={() => {
                        Auth.federatedSignIn({provider: 'Facebook'})
                    }}>Login with Facebook</Button>

                    <Button variant="outline-primary" onClick={() => {
                        Auth.federatedSignIn({provider: 'Google'})
                    }}>Login with Google</Button>
                </div>
            </form>
            {/*<div className="g-signin2" data-onsuccess="onSignIn">Sign In With Google</div>*/}
        </div>
    );
}
