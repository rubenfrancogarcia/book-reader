import React from "react"
import { Link } from 'react-router-dom'
import Shelfs  from "../shelfs"
import * as BooksAPI from "../../BooksAPI"

class Mainpage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      books: []
    }
  }


  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({books: resp});
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelfs updateBook={this.updateBook} name="currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")}/>
            <Shelfs updateBook={this.updateBook} name="want to read" books={this.state.books.filter(b => b.shelf === "wantToRead")}/>
            <Shelfs updateBook={this.updateBook} name="read" books={this.state.books.filter(b => b.shelf === "read")}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="search"> Add a book </Link>
        </div>
      </div>
    )}
    ;
  }



export default Mainpage;
