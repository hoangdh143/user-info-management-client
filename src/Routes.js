import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewContact from "./containers/NewContact";
import Contacts from "./containers/Contacts";
import Settings from "./containers/Settings";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
        <AuthenticatedRoute path="/contacts/new" exact component={NewContact} appProps={appProps} />
        <AuthenticatedRoute path="/contacts/:id" exact component={Contacts} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}
