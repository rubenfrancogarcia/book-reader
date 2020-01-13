import React from "react"
import Book from "./books";


class Shelfs extends React.Component {

  render() {
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            this.props.books.map((book, key) => <Book updateBook={this.props.updateBook} book={book} key={book.id} />)
          }
        </ol>
      </div>
    </div>
    );
  }
}

export default Shelfs;
