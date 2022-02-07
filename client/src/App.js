import React from 'react';
import {AppolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'appollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  request: operation =>{
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers:{
        authorization: token ? `Bearer ${token}`  : ''
      }
    });
  },
  uri:'/graphql'
});

function App() {
  return (
    <AppolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </AppolloProvider>
  );
}

export default App;
