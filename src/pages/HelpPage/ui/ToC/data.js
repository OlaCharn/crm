export const sections = [
  {
    id: 'section1',
    title: 'Where You Start',
    content: (
      <>
        <p>
          The first action is to log in to the system. You can find the login button in the upper right corner of the application's web page. After clicking it, you will be prompted to enter your credentials.
        </p>
        <p>
          You received your username and initial password from the administrator who registered you. 
          Please change the initial password to your own. To do this, go to <i >Settings</i>, select your username in the list of users, and click the edit button. Enter your new password in the corresponding input field in the edit form and save the changes. You will remain logged into the system. The next time you log in, you will be required to use your new password.
        </p>
      </>
    )
  },
  {
    id: 'section2',
    title: 'Browsing and Editing Data',
    content: (
      <>
        <p>
          You can browse the data from the database on the <i>Browse</i> page. The data is presented in a scrollable table. 
          You can change the sorting order using the controls in the column headers. You can also use the search input field above the table for full-text search.
        </p>
        <p>
          There are buttons for adding a new record, editing an existing one, or deleting a record. 
          Please note that the actions you can perform may be restricted based on your user rights.
        </p>
      </>
    )
  },
  {
    id: 'section3',
    title: 'Users and Roles',
    content: (
      <>
        <p>
          You are assigned one of the user roles during registration. These roles are: "Viewer," "Editor," and "Admin."
        </p>
        <ul>
          <li><b>Viewer</b>: Can browse the data but is not allowed to edit it.</li>
          <li><b>Editor</b>: Can edit data.</li>
          <li><b>Admin</b>: Can edit data, manage application settings, and manage users.</li>
        </ul>
        <p>
          Each user is always allowed to edit their own profile, such as updating their email address or changing their password. 
          An Admin can edit the data for any user.
        </p>
      </>
    )
  },
  {
    id: 'section4',
    title: 'Dashboard',
    content: (
      <>
        <p>
          The Dashboard provides status and summary information about the database and the application. 
          Note that the functionality of the Dashboard is still under development and is subject to change.
        </p>
      </>
    )
  }
];


    
