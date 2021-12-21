import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import { Activity } from '../model/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
function App() {

  const [activities, setActivities] = useState<Activity[] >([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode ] = useState(false);
  
  
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:44347/Activities').then(response => {
      setActivities(response.data);
    })
  }, []);

  function handleSelectActivity(id : string){
    setSelectedActivity(activities.find( a => a.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id? : string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  return (
    <> 
     <NavBar openForm = {handleFormOpen}/>
     <Container style={{marginTop: '7em'}}>
       <ActivityDashboard activities={activities}
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity}
        editMode = {editMode}
        openForm = {handleFormOpen}
        closeForm = {handleFormClose}
       />
        </Container>
    </>
  );
}
export default App;