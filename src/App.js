import { Container } from 'semantic-ui-react';
import './App.css';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from './layouts/Footer';

function App() {
  return (
    <div className="App">
      
      <Container className='main'>
        <Dashboard />
      </Container>
      <Footer/>
    
    </div>
  );
}

export default App;
