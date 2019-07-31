import React, { useState } from 'react';
import { Input, Modal, Button, Row, Col } from 'antd';
import styled from 'styled-components';
import * as axios from 'axios';

const StyledInput = styled(Input)`
width: 320px;
border-radius: 1px;
border-width: 1px;
font-family: Roboto;
margin-left: 40px;
margin-right: 40px;
`;

export default class Book extends React.Component {
	_title = React.createRef();
	_author = React.createRef();
	_message = React.createRef();
	_url = React.createRef();
	// 	author: 'dddd',
	// 	bookId: 140,
	// 	createdAt: '2019-06-06T04:24:24.000Z',
	// 	deletedAt: null,
	// 	message: 'dddd',
	// 	ownerId: '0cc64415-70fd-4577-894d-130eaedd2e35',
	// 	title: 'ddd',
	// 	updatedAt: '2019-06-06T04:24:24.000Z',
	// 	url: 'dddd'
	// });

	state = { visible: false };

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleOk = (e) => {
		this.setState({
			visible: false
		});
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};

	_addBook = async () => {
		const { token, history } = this.props;

		const title = this._title.current.state.value;
		const author = this._author.current.state.value;
		const message = this._message.current.state.value;
		const url = this._url.current.state.value;

		this.setState({
			visible: false
		});

		try {
			this.setState({
				loading: true
			});
			const response = await axios.post(
				'https://api.marktube.tv/v1/book',
				{
					title,
					author,
					message,
					url
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			console.log(response);
			history.push('/');
		} catch (error) {
			//message.error(error.response.data.error);
			console.log(error);
			this.setState({
				loading: false
			});
		}
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.showModal}>
					Add Book
				</Button>
				<Modal title="add Book" visible={this.state.visible} onOk={this._addBook} onCancel={this.handleCancel}>
					<Row>
						<Col span={4} style={{ textAlign: 'right' }}>
							책 제목
						</Col>
						<Col span={20}>
							<StyledInput ref={this._title} />
						</Col>
					</Row>
					<br />
					<Row>
						<Col span={4} style={{ textAlign: 'right' }}>
							지은이
						</Col>
						<Col span={20}>
							<StyledInput ref={this._author} />
						</Col>
					</Row>
					<br />
					<Row>
						<Col span={4} style={{ textAlign: 'right' }}>
							감상평
						</Col>
						<Col span={20}>
							<StyledInput ref={this._message} />
						</Col>
					</Row>
					<br />
					<Row>
						<Col span={4} style={{ textAlign: 'right' }}>
							구매링크
						</Col>
						<Col span={20}>
							<StyledInput ref={this._url} />
						</Col>
					</Row>
					<br />
				</Modal>
			</div>
		);
	}
}
