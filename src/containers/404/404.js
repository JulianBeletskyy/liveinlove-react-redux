import React, { Component } from 'react'

class NotFound extends Component {
    render() {
        return (
        	<div className="main-content-wrapper">
	            <div className="error-404 not-found">
					<div className="page-content">
						<div className="no-results-page">
							<p className="no-results-page__label _404">404</p>

							<h2 className="no-results-page__title">
								Oops! That page can&rsquo;t be found.
							</h2>

							<p className="no-results-page__desc">
								It looks like nothing was found at this location. Maybe try a search?
							</p>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default NotFound