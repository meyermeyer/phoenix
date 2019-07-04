// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import SavedRequirements from './SavedRequirements';

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';


// ----- STYLES ----- //
import './Profile.css';

class ProfileRequirements extends Component {

    state = {
        requireList: {},
        oldRequirement: {},
        editMode: false
    }

    requirementCounter = 0

    addRequirementInput(event) {
        console.log('this.requirementCounter', this.requirementCounter);
        console.log('this.state.requireList', this.state.requireList);
        console.log('this.state.oldRequirement', this.state.oldRequirement);
        this.setState({
            ...this.state,
            requireList: {
                ...this.state.requireList,
                [this.requirementCounter]: {
                    requirement: ''
                }
            }
        })
        this.requirementCounter += 1
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            // oldRequirement: 'doodaaa',
            editMode: !this.state.editMode
        });
    }

    handleEditChange = propertyName => (event) => {
        console.log('edit old Requirement info', event.target.value);
        this.setState({
            ...this.state,
            oldRequirement: {
                [event.target.value]: {
                    ...this.state.newRequirement,
                    [propertyName]: event.target.value,
                }
            }
        });
    }

    handleNewReqChange = (index) => (event) => {
        console.log('edit NewReq info', this.state.requireList);
        this.setState({
            requireList: {
                ...this.state.requireList,
                [index]: {
                    requirement: event.target.value
                }

            }
        });
    }

    submitNewRequirements = () => {
        this.setState({
            ...this.state,
            editMode: false,
        });
        console.log('this.state', this.state);
    }

    render() {

        let requirementsView;

        if (this.state.editMode === false) {
            requirementsView =
                <div className="profileRequirementDisplay">
                    <Card>
                        <h2>
                            Employment Requirements 
                            <IconButton 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleEdit}
                            >
                                <EditIcon />
                            </IconButton>
                        </h2>
                        {
                            this.props.require.map((user, i) => {
                                return (
                                    <p>{user.requirement}</p>
                                )
                            })
                        }
                    </Card>
                </div>
        } else {
            requirementsView =
                <div >
                    <Card>
                        <div className="profileRequirementDisplay">
                            
                                <h2>
                                    Edit Employment Requirements
                                <Tooltip
                                        title="Submit Change"
                                    >
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            onClick={this.submitNewRequirements}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                </h2>
                                {this.props.require.map((userReq, i) => {
                                    return (
                                        <div>
                                                <SavedRequirements 
                                                    key={userReq.id}
                                                    id={i}
                                                    userReq={userReq}
                                                />
                                        {/* <p>
                                            <TextField
                                                key={userReq.id}
                                                id={i}
                                                value={this.state.oldRequirement}
                                                label="Requirement"
                                                className="profileInput"
                                                margin="dense"
                                                onChange={this.handleEditChange('requirement')}
                                                variant="outlined"
                                                userReq={userReq}
                                            />
                                        </p> */}
                                        </div>
                                    )
                                })}
                            
                            {Object.entries(this.state.requireList).map((requirement, index) => {
                                return (
                                    <p>
                                        <TextField
                                            id="standard-dense"
                                            label="New Requirement"
                                            className="profileInput"
                                            margin="dense"
                                            onChange={this.handleNewReqChange(index)}
                                            variant="outlined"
                                        />
                                    </p>
                                )
                            })}
                            <p ><Tooltip
                                title="Add New Employment Requirement"
                            >
                                <IconButton>
                                    <AddIcon
                                        className="profileAddIcon"
                                        onClick={(event) => this.addRequirementInput(event)}
                                    />
                                </IconButton>
                            </Tooltip></p>
                        </div>
                    </Card>
                </div>
        }

        return (
            <div>
                {requirementsView}
            </div>
        ) // end return
    } // end render
} // end class

const mapStateToProps = (reduxState) => ({
    profile: reduxState.user,
    require: reduxState.requirements
});
export default connect(mapStateToProps)(ProfileRequirements);