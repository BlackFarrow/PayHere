import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Success from './Success';
import Home from './Home';
import Cancel from './Cancel';




const App = () => {
    return (
<>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/success" element={<Success />} />
<Route path="/cancel" element={<Cancel />} />

</Routes>
</>
    );
};

export default App;
