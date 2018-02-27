import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import style from './style.css'
import AboutMe from 'components/profile/about_me.js'
import { Link } from 'react-router-dom';


class GirlProfile extends Component {
    getContacts = () => {
        return ['Email: sdfsdf@mail.com', 'Mobile: 42323423423'];
    }

    getMessage = () => {
        return ['message  very personal'];
    }

    getPersonality = () => {
        return ['sdfsdfsdfsdfsdfsdf'];
    }

    getName = () => {
        return ['John Doe'];
    }

    getAdress = () => {
        return ['33, Kiev, Ukraine'];
    }

    getLanguages = () => {
        return ['Russian: Good, English: Good'];
    }

    getEducation = () => {
        return ['Trade school'];
    }

    getAbout = () => {
        return {sign: 'Capricorn'}
    }

    getInterests = () => {
        return ['Shopping, Sailing, Singing, Hobbies & Craft'];
    }

    getInfo = () => {
        return {
            sign: 'Vodoley',
            height: '153',
            weight: '50kg',
            eyeColor: 'Light Blue',
            hairColor: 'Blond',
            hairLength: 'very short (2-3c m)',
            ethnisity: 'White/European',
            martialStatus: 'Never Married',
            children: 'no',
            wantsChildren: 'yes',
            proffesion: 'teacher',
            occupation: 'teacher',
            religion: 'Christian',
            smoking: 'no',
            drinking: 'no',
            lookFor: 'Man',
            lookAge: '18 to 50',
            lookEthnicity: 'NA',
            lookOther: 'NA'
        }
    }
    render() {
        return (
            <div className={style.wrapper}>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(GirlProfile);