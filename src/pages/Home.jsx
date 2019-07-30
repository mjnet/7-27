import React from 'react';
import * as axios from 'axios';
import { Row, Col } from 'antd';

function Book(props) {
  const book = props.book;
  return (
    <div>
      <Col span={6}>title : {book.title}</Col>
      <Col span={3}>author : {book.author}</Col>
      <Col span={10}>message : {book.message}</Col>
      <Col span={5}>url : {book.url}</Col>
    </div>
  );
}

export default class Home extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const { token } = this.props;
    try {
      console.log('~~~~~~~~~~~~~');
      console.log(token);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const books = response.data;
      console.log(books);
      this.setState({ books });
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  render() {
    const { books } = this.state;
    return (
      <div>
        <h1>Home</h1>
        {books.map(book => (
          <Book book={book} key={book.bookId} />
        ))}
      </div>
    );
  }
}
