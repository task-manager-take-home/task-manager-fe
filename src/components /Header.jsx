import React from "react";

const Header = () => {
  return (
    <div>
      <div class="usa-overlay"></div>
      <header class="usa-header usa-header--basic">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo">
              <em class="usa-logo__text">
                <a href="/" title="<Project title>">
                  Task Manager
                </a>
              </em>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
