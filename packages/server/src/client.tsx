import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { LoginPage } from './loginPage';

//@ts-ignore
ReactDOMClient.hydrateRoot(document.getElementById('root'), <LoginPage />);
