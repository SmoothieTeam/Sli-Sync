import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import "./HeaderIcon.css";
import "./HeaderTextIcon.css";
import "./HeaderUploadButton.css";

function Header({ children }) {
  return <header className="header">{children}</header>;
}

function HeaderIcon() {
  return (
    <Link to="/" className="header-icon">
      <div></div>
      <div></div>
      <div></div>
    </Link>
  );
}

function HeaderTextIcon() {
  return <p className="header-text-icon">Sli-Sync</p>;
}

function HeaderUploadButton({ to }) {
  return (
    <Link className="header-upload-button" to={to}>
      Upload files
    </Link>
  );
}

function HeaderBuilder() {
  const childern = [];

  this.addIcon = () => {
    childern.push(HeaderIcon());
    return this;
  };

  this.addTextIcon = () => {
    childern.push(HeaderTextIcon());
    return this;
  };

  this.addUploadButton = ({ to }) => {
    childern.push(HeaderUploadButton({ to }));
    return this;
  };

  this.build = () => {
    return <Header>{childern}</Header>;
  };
}

export default HeaderBuilder;
