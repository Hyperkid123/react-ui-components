import React, { Component } from 'react';
import { Button, Form as PfForm, Grid, Row, Icon } from 'patternfly-react';
import { Form } from 'react-final-form';
import {
  Wizard,
  WizardHeader,
  WizardStep,
  WizardSteps,
  WizardRow,
  WizardBody,
  WizardMain,
  WizardFooter,
} from 'patternfly-react/dist/js/components/Wizard';
import PropTypes from 'prop-types';
import { renderWizardBody } from './formRenderer';


const providerSteps = [{
  index: 0,
  label: '1',
  title: 'Provider type',
}];

const microsoftSteps = [{
  index: 1,
  label: '2',
  title: 'Credentials',
}, {
  index: 2,
  label: '3',
  title: 'Events',
}, {
  index: 3,
  label: '4',
  title: 'RSA Key Pair (optional)',
}];
const openStackSteps = [];

const mapSteps = stepIndex => ({
  0: microsoftSteps,
  1: openStackSteps,
})[stepIndex];


class ProviderWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      activeIndex: 0,
      steps: providerSteps,
    };
  }

  handleShowModal = () => this.setState({ showModal: true });
  handleCloseModal = () => this.setState({ showModal: false });
  handleStepClick = values => console.log('stepValue: ', values);
  handleUpdateSteps = additionalSteps => this.setState(prevState => ({
    steps: [
      ...prevState.steps.slice(0, prevState.activeIndex + 1),
      ...additionalSteps,
    ],
  }));
  handleEmsTypeChange = stepIndex => this.handleUpdateSteps(mapSteps(stepIndex));

  // control wizard
  handleBackStep = () => this.setState(prevState => ({ activeIndex: prevState.activeIndex - 1 }));
  canBack = () => this.state.activeIndex > 0;
  handleNextStep = () => this.setState(prevState => ({ activeIndex: prevState.activeIndex + 1 }));
  canNext = () => this.state.activeIndex < this.state.steps.length - 1;
  isLast = () => this.state.activeIndex === this.state.steps.length - 1;

  mapWizardBody = componentList => renderWizardBody(componentList, value => this.handleEmsTypeChange(value));

  renderWizardSteps = (steps, activeIndex, onStepClick) => steps.map((step, index) => (
    <WizardStep
      key={`provider-step-${index}`}
      stepIndex={index}
      step={step.index}
      label={step.label}
      title={step.title}
      activeStep={activeIndex}
      onClick={onStepClick}
    />
  ));

  renderNextButton = (isLast, canNext, handleSubmit, isValid) => (
    <Button
      disabled={isLast ? !isValid : (!canNext || !isValid)}
      bsStyle="primary"
      onClick={canNext ? this.handleNextStep : handleSubmit}
    >
      {canNext ? 'Next' : 'Submit'}
      {canNext && <Icon type="fa" name="angle-right" />}
    </Button>
  );

  render() {
    const { steps, showModal, activeIndex } = this.state;
    return (
      <div>
        <Button onClick={this.handleShowModal}>Show modal</Button>
        <Form
          onSubmit={values => console.log('onSubmit: ', values)}
          render={({ valid, handleSubmit }) => (
            <Wizard show={showModal} onHide={this.handleCloseModal}>
              <WizardHeader title="Provider wizard" onClose={this.handleCloseModal} />
              <WizardBody>
                <WizardSteps steps={this.renderWizardSteps(steps, activeIndex, this.handleStepClick)} />
                <WizardRow>
                  <WizardMain>
                    <PfForm horizontal>
                      <Grid fluid>
                        <Row>
                          {this.mapWizardBody(this.props.stepsMap(activeIndex))}
                        </Row>
                      </Grid>
                    </PfForm>
                  </WizardMain>
                </WizardRow>
              </WizardBody>
              <WizardFooter>
                <Button
                  bsStyle="default"
                  className="btn-cancel"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  bsStyle="default"
                  className="btn-cancel"
                  onClick={this.handleBackStep}
                  disabled={!this.canBack()}
                >
                  <Icon type="fa" name="angle-left" />Back
                </Button>
                {this.renderNextButton(this.isLast, this.canNext(), handleSubmit, valid)}
              </WizardFooter>
            </Wizard>
            )}
        />
      </div>
    );
  }
}

ProviderWizard.propTypes = {
  stepsMap: PropTypes.func.isRequired,
};

export default ProviderWizard;
