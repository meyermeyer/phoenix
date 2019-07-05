// ----- SAVED REQUIREMENTS ----- //
// Individual Employment Requirement
// Child of ProfileRequirements

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import TextField from '@material-ui/core/TextField';

// ----- MATERIAL UI ICONS ----- //


// ----- STYLES ----- //
import './Profile.css';



class SavedRequirements extends Component {

    componentDidMount () {
        console.log('requirementName', this.props.userReq.requirement)
        let requirementName = this.props.userReq.requirement;
        this.setState({
            requirementName: requirementName,
        });
    }

    componentWillUnmount () {
        this.updateChange()
    }

    state = {
        requirementName: '',
        
    }

    handleEditChange = (event) => {
        console.log('edit saved Requirement', event.target.value);
        this.setState({
            requirementName: event.target.value,
        });
    }

    updateChange = () => {
        if (this.state.requirementName !== this.props.userReq.requirement){
            console.log('in updateChange', this.props.id, this.props.userReq.requirement, 'to' , this.state.requirementName );
            this.props.dispatch({ type: 'UPDATE_REQUIREMENT', payload: { id: this.props.userReq.id, requirement: this.state.requirementName } })
        }
        else {
            console.log('in updateChange - NO CHANGE', this.props.id, this.state.requirementName);
        }
    }

    render () {

        return (
            <>
            <div>
                <TextField
                    key={this.props.userReq.id}
                    id={this.props.i}
                    value={this.state.requirementName}
                    label="Requirement"
                    className="profileInput"
                    margin="dense"
                    onChange={this.handleEditChange}
                    variant="outlined"
                />
            </div>
            </>
        ) // end return
    } // end render
} // end class

const mapStateToProps = (state) => ({
    profile: state.user,
    require: state.requirements
});
export default connect(mapStateToProps)(SavedRequirements);