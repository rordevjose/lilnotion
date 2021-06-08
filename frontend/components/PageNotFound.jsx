import React from 'react';
import { Link } from 'react-router-dom';
import NavBarContainer from './navbar/NavBarContainer'

const PageNotFound = () => {

  return (
    <>
      <NavBarContainer />
      <div className="auth-page-wrapper">
        <section className="auth-section-wrapper">
          <div className="auth-header-wrapper">
            <h1 className="auth-title">404: Page Not Found</h1>
            <Link className="auth-subtitle" to="/">Home Page</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default PageNotFound;