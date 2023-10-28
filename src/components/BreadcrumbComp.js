import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./BreacrumbComp.css";

const BreadcrumbComp = ({ children }) => {
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item className="breadcrumbItem">Home</Breadcrumb.Item>
      <Breadcrumb.Item className="breadcrumbItem" active>
        {children}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadcrumbComp;
