import React from 'react';
import './search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const Search = props => {
    return(
        <div className="container">
            <div>{props.error ? displayError() : null}</div>
            <form onSubmit={props.search}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 mt-3 mb-3">
                        <input type="text" className="form-control" name="city" placeholder="City" autoComplete="on"/>
                    </div>
                    <div className="col-md-3 mt-3 mb-3 d-flex justify-content-center">
                        <button className="btn ghost-button"><FontAwesomeIcon icon={faSearchLocation}></FontAwesomeIcon></button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function displayError() {
    return (
        <div className="alert alert-danger error-alert mx-5" role="alert">
            Please Enter a City!
        </div>
    );
}

export default Search;