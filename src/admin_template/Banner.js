import React from "react";

export default function Banner(props) {
  return (
    <div className="app-page-title">
      <div className="page-title-wrapper">
        <div className="page-title-heading">
          <div className="page-title-icon">
            <i className={props.icon}></i>
          </div>
          <div>{props.title}</div>
        </div>
      </div>
    </div>
  );
}
