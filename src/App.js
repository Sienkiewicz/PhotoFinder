import { Route, Switch } from 'react-router-dom';
import './App.css';
import Photos from './components/Photos';
import SearcherPhoto from './components/SearcherPhoto';



function App() {
	
	return (
		<div className="App">
		<Switch>
				<Route exact path='/' render={() => <SearcherPhoto />} />
				<Route exact path='/s/photos/:query?' render={() => <Photos />} />
		</Switch>
			
		</div>
	);
}

export default App;
