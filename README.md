# Task Manager 
 This is the front end of the task manager application. For this app, I used [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/), Cypress for testing, and [create-react-app](https://create-react-app.dev/). This application requires connection to the [Backend](https://github.com/task-manager-take-home/task-manager-be) I created in order to work properly. 

## Features
- Display and filter tasks by priority or completion
- Add new tasks
- Update existing tasks
- Delete tasks
- Responsive design
- e2e testing through Cypress

## Installation 

1. Clone the repository 

``` git clone git@github.com:task-manager-take-home/task-manager-fe.git```

```cd task-manager-fe```

2. Install dependencies

``` npm install```

3. Ensure the BE server is running correctly (can be checked at ```http://localhost:5000/api/v1/tasks```

4. Start the Frontend

```npm start```

## Testing 

Run cypress testing using the command 
```npm run cypress```
