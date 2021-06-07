import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Today from "./pages/Today";
import Hourly from "./pages/Hourly";

import store from "./store";
import MainLayout from "./hoc/MainLayout";

const App = () => {
    return (
        <Provider
            store={store}
        >
            <Router>
                <MainLayout>
                    <Switch>
                        <Route path={'/'} exact component={Today}/>
                    </Switch>
                </MainLayout>
            </Router>
        </Provider>
    );
};

export default App;
