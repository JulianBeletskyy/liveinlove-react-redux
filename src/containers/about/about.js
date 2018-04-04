import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import style from './style.css'

class About extends Component {
    render() {
        return (
            <div className="pt-100">
                <Grid>
                    <div className="bg-white p-15">
                        <h1 className="font-bebas">About Agency</h1>
                        <hr />
                        <div className="text-center">
                            <span className={style.title}>Unique, truly responsive and functional websites that impress!</span>
                        </div>
	                </div>
	            </Grid>
            </div>
        );
    }
}

export default About