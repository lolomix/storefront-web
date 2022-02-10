import React from 'react';

const Login = () => (
    <div>
        <GlobalStyles/>
        <section className='jumbotron breadcumb no-bg gradient-animation'>
            <div className='mainbreadcumb no-bg'>
            <div className='container'>
                <div className='row align-items-center px-0'>
                <div className="col-lg-5 offset-lg-5 m-auto px-0">
                    <div className="box-login">
                    <h3 className="mb10">Sign In</h3>
                    <p>Login using an existing account or create a new account <span>here</span>.</p>
                    <form name="contactForm" id='contact_form' className="form-border" action='#'>

                        <div className="field-set">
                            <input type='text' name='email' id='email' className="form-control" placeholder="username"/>
                        </div>
                        
                        <div className="field-set">
                            <input type='password' name='password' id='password' className="form-control" placeholder="password"/>
                        </div>
                        
                        <div className="field-set">
                        <input type='submit' id='send_message' value='Submit' className="btn btn-main btn-fullwidth color-2"/>
                        </div>
                        
                        <div className="clearfix"></div>  
                        <ul className="list s3">
                            <li>Login with:</li>
                            <li><span >Instagram</span></li>
                            <li><span >Google</span></li>
                            <li><span >Twitter</span></li>
                        </ul>
                        <div className="spacer-half"></div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    </div>
);

export default Login;