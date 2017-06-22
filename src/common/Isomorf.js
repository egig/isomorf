import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';


import Login from './modules/user/components/Login';
import ForgetPassword from './modules/user/components/ForgetPassword';
import Dashboard from './modules/system/components/Dashboard';
import UserIndex from './modules/user/components/UserIndex';
import UserCreate from './modules/user/components/UserCreate';
import UserView from './modules/user/components/UserView';
import UserEdit from './modules/user/components/UserEdit';
import TgrIndex from './modules/tgr/components/TgrIndex';
import TgrCreate from './modules/tgr/components/TgrCreate';
import TgrView from './modules/tgr/components/TgrView';
import RiwayatPembayaranCreate from './modules/tgr/components/TgrView/RiwayatPembayaranCreate';
import StatusPenagihanCreate from './modules/tgr/components/TgrView/StatusPenagihanCreate';
import MainLayout from './modules/common/components/MainLayout';

const AdminRoute = (props) => {

	let { children, isAuthenticated,  ...rest } = props;

	return <Route {...rest} render={props => (
		isAuthenticated ? (
				<MainLayout>
					{React.cloneElement(children, ...rest)}
				</MainLayout>
			) : (
				<Redirect to={{
					pathname: '/user/login',
					state: {from: props.location}
				}}/>
			)
	)}/>
};

const Isomorf= function (props) {

	let state = props.store.getState();
	//TODO change isAuthenticated logic
	let isAuthenticated = !!state.user.loggedIn;

	return (
		<Provider store={props.store}>
				<Switch>
					<Route path="/" exact >
						<Redirect to={{
							pathname: '/secure/system/dashboard'
						}}/>
					</Route>
					<Route path="/user/login" exact component={Login} />
					<Route path="/user/forget_password" component={ForgetPassword} />
					<AdminRoute path="/secure" isAuthenticated={isAuthenticated}>
						<Switch>
							<Route path="/secure/users" exact component={UserIndex} />
							<Route path="/secure/users/create" exact component={UserCreate} />
							<Route path="/secure/users/edit/:userId" exact component={UserEdit} />
							<Route path="/secure/users/:userId" exact component={UserView} />
							<Route path="/secure/system/dashboard" exact component={Dashboard} />
						</Switch>
					</AdminRoute>
				</Switch>
		</Provider>
	);
};

module.exports = Isomorf;