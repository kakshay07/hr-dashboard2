import JobOpening from './pages/JobOpening/JobOpening'
import './app.css';
import Router, { Route } from 'preact-router'; 
import Sidebar from './components/Sidebar';
import JobApplicants from './pages/JobApplicants/JobApplicants';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login/Login';
import Departmnet from './pages/department/department';
export function App() {

  return (
    <>
    <PrivateComponent>
    <div className="app_main_container">
      <div className="sideBar">
        <Sidebar/>
        <div className="profileTab">
            <div class="btn-group dropup">
              <i class="fa-solid fa-user" data-bs-toggle="dropdown" ></i>
              <ul class="dropdown-menu bg-dark" >
                <li>
                  <button class="dropdown-item bg-dark text-light" href="#">Logout</button>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div className="main_section">
        <Router>
          <Route path='/' component={JobOpening}/>
          <Route path='/applicants' component={JobApplicants}/>
          <Route path='/department' component={Departmnet}/>

          <Login path='/login' />
        </Router>
      </div>
    </div>
    </PrivateComponent>
    {/* <Router>
      <JobOpening path='/'/>
    </Router> */}
    </>
  )
}
