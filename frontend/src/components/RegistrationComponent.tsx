import React, { useState } from 'react';

type RegistrationComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const RegistrationComponent: React.FC<RegistrationComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'username': '',
        'password': '',
        'passwordConfirm': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { status } = data;

    const contextPath = pageContext.request.contextPath;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice("This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.");
    
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
            <a className="navbar-brand" href="/">App Name</a>
        </nav>
        </header>
        
        <div className="container">
        
            <form onSubmit={handleSubmit} method="POST" modelAttribute="userForm" className="form-signin">
                <h2 className="form-signin-heading">Create your account</h2>
                <spring:bind path="username">
                    <div className="form-group {status?.error ? 'has-error' : ''}">
                        <form:input type="text" path="username" className="form-control" placeholder="Username" autofocus="true"></form:input>
                        <form:errors path="username"></form:errors>
                    </div>
                </spring:bind>
        
                <spring:bind path="password">
                    <div className="form-group {status?.error ? 'has-error' : ''}">
                        <form:input type="password" path="password" className="form-control" placeholder="Password"></form:input>
                        <form:errors path="password"></form:errors>
                    </div>
                </spring:bind>
        
                <spring:bind path="passwordConfirm">
                    <div className="form-group {status?.error ? 'has-error' : ''}">
                        <form:input type="password" path="passwordConfirm" className="form-control" placeholder="Confirm your password"></form:input>
                        <form:errors path="passwordConfirm"></form:errors>
                    </div>
                </spring:bind>
        
                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>
        
        </div>
        </>
    );
};

export default RegistrationComponent;
