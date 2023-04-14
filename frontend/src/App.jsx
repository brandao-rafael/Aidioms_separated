import { Route, Switch } from 'react-router-dom';
import React from 'react';
import AiProvider from './hooks/AiProvider';
import './App.css';
// Componentes
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import ImageGenerator from './pages/content/ImageGenerator';
import PageNotFound from './pages/content/PageNotFound';
import Chat from './pages/content/Chat';
import Validation from './pages/user/Validation';
import Playphrase from './pages/content/Playphrase';
import PostVideo from './pages/content/PostVideo';
import ResetPassword from './pages/user/ResetPassword';
import VerifyToken from './pages/user/VerifyToken';

export default function App() {
  return (
    <AiProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/playphrase" component={Playphrase} />
        <Route exact path="/image" component={ImageGenerator} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/validate" component={Validation} />
        <Route exact path="/postvideo" component={PostVideo} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route path="/verify-token/:token?" component={VerifyToken} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </AiProvider>
  );
}
