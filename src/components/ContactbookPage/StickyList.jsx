import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import './StickyList.css'

//Material-UI stuff
import ContactCard from './ContactCard'
import { makeStyles } from '@material-ui/core/styles';
import {Button, ListItem, Fab, Tooltip, InputLabel, MenuItem, Input, Select} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonAddIcon from '@material-ui/icons/PersonAdd'



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        overflow: 'auto',
        maxHeight: 1000,
        height:'75vh'
    },
    container: {
        backgroundColor: theme.palette.background.paper,
        width: '80%',
        // padding: '10px',
        borderRadius: '5px'
    },
    listSection: {
        backgroundColor: 'inherit',
        padding: 0
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        position: 'relative',
        width:'100%'

    },
    card: {
        borderWidth:'2px',
        borderColor: 'black',
        borderStyle: 'solid',
        width: '100%'

    },
    sorting: {
        position: 'sticky',
        textAlign: 'right',
        paddingTop: '15px',
        paddingRight: '15px'
    },
    manageOrder: {
        display: 'inline'
    },
    search: {
        // maxWidth: 200,
        // marginRight: 0,
        fontSize: '20pt',
        textAlign: 'center',
        color: theme.palette.primary.main
    },
    listSubheader: {
        color: theme.palette.primary.main
    },
    contactCard: {
        width: '100%',
        paddingLeft:'5px',
        paddingRight: '5px'
        // padding: 0
    },
    addNewBtn: {
        position: 'absolute',
        right: 100,
        
    }
}));

function PinnedSubheaderList(props) {
    const classes = useStyles();
    useEffect(()=>{
        console.log('props', props)
    })

    //define 'key' in local state.  default sort is by last name
    const [key, setKey] = React.useState('last');
    

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    //function defines what word to sort by, sets local state 'key' to that word
    const setSorting = (event) =>{
        setKey(event.target.value)
        console.log('doc', document)
        var myDiv = document.getElementById('containerDiv');
        myDiv.scrollTop = 0;
        console.log(event.target.value)
        console.log('key', key)

    }

    const scrollToLetter = (letter) => {
        document.getElementById(letter).scrollIntoView();
    }

    const addNewContact = () => {
        console.log('in addNewContact')
        props.dispatch({ type:'SET_TO_CREATE_MODE'})
        props.history.push('/contact/add')
    }

    return (
        <>
        <Tooltip title="Add a new contact">
            <Fab className={classes.addNewBtn} color="primary" aria-label="add new contact" onClick={addNewContact} >
                <PersonAddIcon />
            </Fab>
        </Tooltip>
        <div className={classes.container}>        
            <div className={classes.manageOrder}>
                    <div className={classes.sorting}>
                        <InputLabel htmlFor="sort by:">Sort by</InputLabel>
                        <Select
                            value={key}
                            onChange={setSorting}
                            input={<Input name="sorting" id="sorting" />}
                        >
                            <MenuItem value={'first'}>First Name</MenuItem>
                            <MenuItem value={'last'}>Last Name</MenuItem>
                            <MenuItem value={'company'}>Company</MenuItem>
                        </Select>
                    </div>
                    <div className={classes.search}>
                        {alphabet.map(letter => (
                            <a onClick={() => { scrollToLetter(letter) }}>{letter}</a>
                        ))}
                    </div>
                    
            </div>    
            
            <List id="containerDiv" className={classes.root} subheader={<li />}>
                {alphabet.map(sectionId => (
                    <ListItem key={`section-${sectionId}`} className={classes.listSection}>
                        <List className={classes.ul}>
                            <ListSubheader className={classes.listSubheader}>
                                    <a id={sectionId}>
                                        {sectionId}
                                    </a>
                            </ListSubheader>
                            {props.reduxState.contacts.map(contact => {
                                let word
                                if (key==='first'&&contact.first_name){
                                    word = contact.first_name
                                }
                                else if (key==='last'&&contact.last_name){
                                    word=contact.last_name
                                }
                                else if (contact.company){
                                    word=contact.company
                                }
                                else
                                    word='a'
                                
                                let firstLetter = word[0]
                                if (firstLetter.toLowerCase() === sectionId) {
                                    console.log('alphabetize', contact)
                                    return (
                                        <ListItem className={classes.contactCard}><ContactCard contact={contact} /> </ListItem>                               
                                    )
                                }
                            })}
                        </List>
                    </ListItem>
                ))}
            </List>
        </div>
    </>
        
    );
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default withRouter(connect(mapStateToProps)(PinnedSubheaderList))