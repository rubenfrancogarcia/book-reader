import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from "react-router-dom";
import Mainpage from "./components/pages/mainpage";
import Search from "./components/pages/search";



    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */





     class BooksApp extends React.Component {

      render() {
        return (
           <div>
            <Route exact path ="/" component={Mainpage} />
            <Route exact path ="/search" component={Search} />
          </div>
        );
      }
}

export default BooksApp;
