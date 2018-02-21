import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap'
import store from 'store/'
import style from './edit_profile.css'
import SelectField from 'components/form/inputs/select_field.js'
import TextField from 'components/form/inputs/text_field.js'
import Textarea from 'components/form/inputs/textarea.js'
import CheckboxField from 'components/form/inputs/checkbox_field.js';
import BtnMain from 'components/form/buttons/main_button.js';

class EditProfile extends Component {
   constructor(props) {
    super(props)
    this.other = {};
  }
  getLanguageLevel = () => {
    return [
      {value: 'A1', name: 'A1'},
      {value: 'A2', name: 'A2'},
      {value: 'B1', name: 'B1'},
      {value: 'B2', name: 'B2'},
      {value: 'C1', name: 'C1'},
      {value: 'C2', name: 'C2'}
    ];
  }

  getUserInfo = () => {
    return {
      gender: 'male'
    };
  }

  oppositeGender = () => {
      return this.getUserInfo().gender == 'male' ? 'Female' : 'Male';
  }

  getHeight = () => {
    return [
      {value: '180', name: '180cm / 5\'10'},
      {value: '179', name: '179cm / 5\'9'}
    ];
  }

  getWeight = () => {
    return [
      {value: '85', name: '85kg / 187 lbs'},
      {value: '84', name: '84kg / 186 lbs'}
    ];
  }

  getEyesColors = () => {
    return [
      {value: 'Blue', name: 'Blue'},
      {value: 'Green', name: 'Green'},
      {value: 'Brown', name: 'Brown'}
    ];
  }

  getHairColors = () => {
    return [
      {value: 'Blond', name: 'Blond'},
      {value: 'Brunet', name: 'Brunet'},
      {value: 'Shaten', name: 'Shaten'}
    ];
  }
  render() {
   	return (
   		<div className={style.wrapper}>
        <div className={style.title}>
          Basic Information
        </div>
        
        <Row>
          <Col xs={6} md={3} className="text-right">
            <div>
              First Name:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.value}>
            <div>
              {this.props.info.firstName}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            <div>
              Middle Name:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.value}>
            <div>
              {this.props.info.middleName}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            <div>
              Last Name:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.value}>
            <div>
              {this.props.info.lastName}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            <div>
              Birth Date:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.value}>
            <div>
              {this.props.info.birthDate}
            </div>
          </Col>
        </Row>

        <div className={style.title}>
          Language
        </div>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Primary Language:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              English Fluency:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
             <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              German Fluency:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              French Fluency:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Spanish Fluency:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Russian Fluency:
            </div>
          </Col>

           <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getLanguageLevel()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Other Languages:
            </div>
          </Col>

          <Col xs={12} md={4} className={style.select}>
            <div className={style.otherField}>
              <TextField
                type="text"
                placeholder=""
                name="Other Languages"
                value=""
                inputRef={ref => { this.other.langs = ref }}
              />
            </div>
          </Col>
        </Row>

        <div className={style.title}>
          Others
        </div>

        <Row>
          <Col xs={6} md={3} className="text-right">
            <span className={style.required}>interests:</span>
          </Col>

          <Col xs={12} md={9} className={style.textarea}>
            <Textarea
              inputRef={ref => { this.other.interests = ref }}
              value=""
            />
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            Personality:
          </Col>

          <Col xs={12} md={9} className={style.textarea}>
            <Textarea
              inputRef={ref => { this.other.personality = ref }}
              value=""
            />
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            <span className={style.required}>Message:</span>
          </Col>

          <Col xs={12} md={9} className={style.textarea}>
            <Textarea
              inputRef={ref => { this.other.message = ref }}
              value=""
            />
          </Col>
        </Row>

        <div className={style.title}>
          About Me
        </div>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Height:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHeight()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Weight:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getWeight()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Eyes Color:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getEyesColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>hair Color:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Hair Length:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Education:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Other Education:
            </div>
          </Col>

          <Col xs={12} md={4} className={style.select}>
            <div className={style.otherField}>
              <TextField
                type="text"
                placeholder=""
                name="other education"
                value=""
                inputRef={ref => { this.other.education = ref }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Ethnicity:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Proffesion:
            </div>
          </Col>

          <Col xs={12} md={4} className={style.select}>
            <div className={style.otherField}>
              <TextField
                type="text"
                placeholder=""
                name="proffesion"
                value=""
                inputRef={ref => { this.other.proffesion = ref }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Occupation:
            </div>
          </Col>

          <Col xs={12} md={4} className={style.select}>
            <div className={style.otherField}>
              <TextField
                type="text"
                placeholder=""
                name="proffesion"
                value=""
                inputRef={ref => { this.other.occupation = ref }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Religion:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Other religion:
            </div>
          </Col>

          <Col xs={12} md={4} className={style.select}>
            <div className={style.otherField}>
              <TextField
                type="text"
                placeholder=""
                name="other religion"
                value=""
                inputRef={ref => { this.other.religion = ref }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Smoking:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Drinking:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <div className={style.title}>
          Family and Children:
        </div>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>martial status:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              <span className={style.required}>Children:</span>
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={9} mdOffset={3}>
            If you have children, please include gender and year of birth (for example: 'i have 2 children: boy, bornn 1999; girl, born 2003')
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className="text-right">
            Children Details:
          </Col>

          <Col xs={12} md={9} className={style.textarea}>
            <Textarea
              inputRef={ref => { this.other.childrenDetails = ref }}
              value=""
            />
          </Col>
        </Row>

        <Row>
          <Col xs={6} md={3} className={style.names + ' text-right'}>
            <div>
              Wanting Children:
            </div>
          </Col>

          <Col xs={6} md={4} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <div className={style.title}>
          Seeking a {this.oppositeGender()}:
        </div>

        <Row>
          <Col xs={8} md={3} className={style.names + ' text-right'}>
            <div>
              Looking for age from:
            </div>
          </Col>

          <Col xs={12} md={2} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>

          <Col xs={6} md={1} className={style.names}>
            <div>
              To
            </div>
          </Col>

          <Col xs={12} md={2} className={style.select}>
            <div>
              <SelectField
                options={this.getHairColors()}
                componentClass="select"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={7} md={3} className={style.names + ' text-right'}>
            <div>
              Looking For Ethnicity:
            </div>
          </Col>

          <Col xs={12} md={5} className={style.select}>
            <Row>
              <Col xs={6}>
                <CheckboxField
                  text="Not Important"
                />
              </Col>

              <Col xs={5} mdOffset={1}>
                <CheckboxField
                  text="African/Black"
                />
              </Col>

              <Col xs={6}>
                <CheckboxField
                  text="White/European"
                />
              </Col>

              <Col xs={5} mdOffset={1}>
                <CheckboxField
                  text="multiracial"
                />
              </Col>

              <Col xs={6}>
                <CheckboxField
                  text="Hispanic"
                />
              </Col>

              <Col xs={5} mdOffset={1}>
                <CheckboxField
                  text="Asian"
                />
              </Col>

              <Col xs={6}>
                <CheckboxField
                  text="Other"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col xs={10} md={3} className="text-right">
            Looking for other requirements (education, personality, etc)
          </Col>

          <Col xs={12} md={9} className={style.textarea}>
            <Textarea
              inputRef={ref => { this.other.interestPersonality = ref }}
              value=""
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={9} mdOffset={3}>
            <BtnMain
              type="submit"
              bsStyle="success"
              text="Update"
            />
          </Col>
        </Row>
   		</div>
   	);
  }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(
    mapStateToProps
)(EditProfile);