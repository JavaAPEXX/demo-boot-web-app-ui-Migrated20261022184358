import React, { useState } from 'react';

interface LoginComponentData {
    contextPath?: string;
    message?: number;
    error?: string;
}

type LoginComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const LoginComponent: React.FC<LoginComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'username': '',
        'password': '',
        'parameterName': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { _csrf, error, message } = data;

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
        setBackendActionNotice("This form originally submitted to '${contextPath}/login' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '${contextPath}/login' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
            <form onSubmit={handleSubmit} method="POST" action="{contextPath}/login" className="form-signin">
                <h2 className="form-heading">Log in</h2>
        
                <div className="form-group {error != null ? 'has-error' : ''}">
                    <span>{message}</span>
                    <input onChange={handleInputChange} name="username" type="text" className="form-control" placeholder="Username" autofocus="true" />
                    <input onChange={handleInputChange} name="password" type="password" className="form-control" placeholder="Password" />
                    <span>{error}</span>
                    <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
        
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
                    <h4 className="text-center"><a href="{contextPath}/registration">Create an account</a></h4>
                </div>
        
            </form>
        
        </div>
        </>
    );
};

export default LoginComponent;
