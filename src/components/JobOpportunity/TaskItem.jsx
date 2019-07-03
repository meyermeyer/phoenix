import React, { Component } from 'react'
import { connect } from 'react-redux';


import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TaskItem extends Component {
    state = {
        task: {
            jobId: this.props.reduxState.jobStages.length,
            task_name: this.props.task.task_name,
            note: this.props.task.note,
            due_date: this.props.task.due_date
        },
    }
    handleRemove = () => {
        console.log('handleRemove task', this.props.i)
        this.props.dispatch({
            type: 'REMOVE_TASK_FROM_REDUX',
            payload: this.props.i
        })
        this.props.handleForceUpdate()
    }

    handleTaskChange = propertyName => (event) => {
        console.log('taskInfo', event.target.value);
        this.setState({
            tasks: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }
    render() {
        return(
            <Grid container>
                <Grid item sm={2}>
                    <IconButton className="oppsSubBut" onClick={this.handleRemove}>
                        <RemoveIcon />
                    </IconButton>
                    <span style={{ fontSize: 20 }}>
                        Tasks:
                    </span>

                </Grid>
                <Grid item sm={3}>
                    <Input
                        style={{ width: 415, paddingTop: 16 }}
                        placeholder="Task Details"
                        onChange={this.handleTaskChange('task_name')}
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                </Grid>
                <Grid item sm={2} >
                    <TextField
                        id="date"
                        type="date"
                        style={{ paddingTop: 16 }}
                        onChange={this.handleTaskChange('due_date')}
                        // defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(TaskItem)
