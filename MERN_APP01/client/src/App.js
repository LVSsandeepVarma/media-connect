import logo from './logo.svg';
import './App.css'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom"
import Login from './component/login'
import Register from './component/register'
import Posts from './component/allPosts'
import Create from './component/create'
import Update from './component/update'
import './App.css';

function App() {
  
  return (
    <div className="body">
    <Router>
      <Switch>
        <Route exact path="/" component={Register}/>
        <Route  exact path="/login" component={Login}/>
        <Route exact path="/posts/:id" component={Posts} />
        <Route exact path="/create/:id" component={Create}/>
        <Route exact path="/posts/update/:id/:postid" component={Update}/>
      </Switch>
    </Router>
    </div>
  );
}


export default App;
