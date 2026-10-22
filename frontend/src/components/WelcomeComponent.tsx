import React, { useState } from 'react';

interface WelcomeComponentData {
    contextPath?: string;
    pageContext?: number;
}

type WelcomeComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'parameterName': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { _csrf, docsList } = data;

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
        setBackendActionNotice("This form originally submitted to '${contextPath}/logout' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '${contextPath}/logout' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
            {(pageContext.request.userPrincipal.name != null) && (<>
                <form onSubmit={handleSubmit} id="logoutForm" method="POST" action="{contextPath}/logout">
                    <input type="hidden" name={_csrf?.parameterName} value={_csrf?.token} />
                </form>
                <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <a style={{ color: '#FFFFFF' }} href="#">{pageContext.request.userPrincipal.name}</a>
                    </li>
                    <li className="nav-item">
                    	<a className="nav-link" onclick="document.forms['logoutForm'].submit()">Logout</a>
                    </li>
                 </ul>
                 </div>
            </>)}
        </nav>
        </header>
        
        <div className="container">
        
            {(pageContext.request.userPrincipal.name != null) && (<>
        		
        		<div className="row col-md-9 col-md-offset-2 custyle">
        	        <h3>Document List</h3>
        		</div>
               
                
                
        	    <div className="row col-md-6 col-md-offset-2 custyle">
        	    	{
        	        	(!!(docsList)) ? (<>
        				    <table className="table table-striped custab">
        					    <thead>
        					        <tr>
        					            <th>Title</th>
        				        		<th>Description</th>
        					            <th className="text-center">Action</th>
        					        </tr>
        					    </thead>
        					    {docsList && docsList?.map((doc: any, index: number) => (<>
        				            <tr>
        				                <td>{doc.title}</td>
        		   						<td>{doc.description}</td>
        				                <td className="text-center"><a className='btn btn-info btn-xs' href={doc.link} download><span className="glyphicon glyphicon-download"></span> Download</a></td>
        				            </tr>
        			            </>))}
        			    	</table>
        		    	</>) :
        		    	(<>
        		        	<h5>No document to display</h5>
        		        </>)
        	        }
        	    </div>
            </>)}
        
        </div>
        </>
    );
};

export default WelcomeComponent;
