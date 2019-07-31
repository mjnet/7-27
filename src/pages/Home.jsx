import React from 'react';
import * as axios from 'axios';
import { Layout, Menu, Button, Col, Table, Divider, message } from 'antd';
import styled from 'styled-components';

import Book from '../components/Book';

const { Header, Content, Footer } = Layout;

const BooksArea = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	margin-left: 40px;
	margin-right: 40px;
`;
// const StyledButton = styled(Button)`
//   border-color: #28546a;
//   background-color: #28546a;
//   text-transform: uppercase;
//   border-radius: 1px;
//   border-width: 2px;
//   color: white;
//   width: 120px;

//   &:hover {
//     background-color: #28546a;
//     color: white;
//   }
// `;

let _token;
let _history;

const deleteBook = async (record) => {
	try {
		console.log(record.bookId);
		console.log(_token);
		console.log('>>>>>>>>>>>>>>>>>>>> delewte book : ' + record.bookId);
		await axios.delete('https://api.marktube.tv/v1/book/' + record.bookId, {
			headers: {
				Authorization: `Bearer ${_token}`
			}
		});
	} catch (error) {
		message.error(error.response.data.error);
		console.log(error);
	}
	//return <Redirect to="/" />;
	_history.push('/');
};

const columns = [
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title'
		// render: (text, record) => <a href="javascript:alert({record.bookId});">{text}</a>
	},
	{
		title: 'Author',
		dataIndex: 'author',
		key: 'author'
	},
	{
		title: 'Message',
		dataIndex: 'message',
		key: 'message'
	},
	{
		title: 'url',
		dataIndex: 'url',
		key: 'url'
	},
	{
		title: 'CreatedAt',
		dataIndex: 'createdAt',
		key: 'createdAt'
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record, index) => (
			<span>
				<Divider type="vertical" />
				<a
					onClick={() => {
						deleteBook(record);
					}}
				>
					Delete
				</a>
				<Divider type="vertical" />
			</span>
		)
	}
];

// author: 'dddd',
// bookId: 140,
// createdAt: '2019-06-06T04:24:24.000Z',
// deletedAt: null,
// message: 'dddd',
// ownerId: '0cc64415-70fd-4577-894d-130eaedd2e35',
// title: 'ddd',
// updatedAt: '2019-06-06T04:24:24.000Z',
// url: 'dddd',

export default class Home extends React.Component {
	state = {
		books: []
	};

	async componentDidMount() {
		const { token, history } = this.props;
		_token = token;
		_history = history;
		try {
			console.log('~~~~~~~~~~~~~');
			console.log(token);
			const response = await axios.get('https://api.marktube.tv/v1/book', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const books = response.data;
			console.log(books);
			this.setState({ books });
		} catch (error) {
			console.log(error);
		}
	}

	_clickSignOut = async () => {
		const { token, history } = this.props;

		try {
			console.log('>>>>>>>>>>>>>>>>>>>> signout');
			localStorage.removeItem('token');
			await axios.delete('https://api.marktube.tv/v1/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error) {
			//message.error(error.response.data.error);
			console.log(error.response.data.error);
		}
		history.push('/');
	};

	render() {
		const { token, history } = this.props;
		const { books } = this.state;

		return (
			<BooksArea>
				<Layout className="layout">
					<Header>
						<div>
							<Col span={2}>
								<h1 style={{ color: 'white' }}>Books list</h1>
							</Col>
							<Col span={2}>
								<Book token={token} />
							</Col>
							<Col span={2} offset={18}>
								<Button loading={false} onClick={this._clickSignOut}>
									Logout
								</Button>
							</Col>
						</div>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={[ '2' ]}
							style={{ lineHeight: '64px' }}
						/>
					</Header>
					<Content style={{ padding: '0 50px' }}>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							{/* {books.map(book => (
          <Book book={book} key={book.bookId} />
        ))} */}
							<Table columns={columns} dataSource={books} rowKey={(record) => record.bookId} />
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						FastCampus 2019 리액트 실전 활용법 &nbsp; ( created by MJNeT ){' '}
					</Footer>
				</Layout>
			</BooksArea>
		);
	}
}
