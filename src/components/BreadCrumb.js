import React from 'react';
import { useHistory } from "react-router-dom";

const GoBackButton = () => {
    let history = useHistory();
    return (
        <>
            <button className="btn btn-goback" onClick={() => history.goBack()}>
                <i className="fas fa-arrow-left" style={{ fontSize: "1rem" }}></i> <span>Go Back</span>
            </button>
        </>
    );
};
export const BreadCrumb = ({ name }) => {
    return (
        <div className="bread-crumb-items">
            <GoBackButton />
            <div className="bread-crumb-name">
                {name}
            </div>
        </div>
    );
}


