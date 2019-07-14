import React from 'react';
import { Router } from '@reach/router';
import Home from '../App'
import Loan from './Loan'

const router = () => (
    <Router>
        <Home path="/" />
        <Loan path="loan/:Id" />
    </Router>
)

export default router;