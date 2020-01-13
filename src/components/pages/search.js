import React from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from "../../BooksAPI"
import Book from "../books"


/* this approach to the search page was made from help from https://www.youtube.com/watch?v=acJHkd6K5kI&t=374s credit to Ryan Waite*/
class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(resp => {
      this.setState({books: resp});
    });
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }

  submitSearch(){
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({ results: [] });
      }
      else  {
        res.forEach(b => {
          let a = this.state.books.filter(B => B.id === b.id);
          b.shelf = a[0] ? a[0].shelf :null;
        });
        return this.setState({results: res});
      }
    });
  }


  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(resp => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(B => B.id !== book.id).concat([book])
      }))
    });
  }



  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/"> Close </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-book-results">
          <ol className="books-grid">
            {
              this.state.results.map((book, key) => <Book updateBook={this.updateBook} key={book.id} book={book}  />)
            }
          </ol>
          </div>
        </div>
    );
  }
}

export default Search;
