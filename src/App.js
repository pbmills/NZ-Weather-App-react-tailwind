import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Today from "./pages/Today";
import Hourly from "./pages/Hourly";

import store from "./store";
import MainLayout from "./hoc/MainLayout";
import Days from "./pages/Days";
import Monthly from "./pages/Monthly";
import About from "./pages/About";

const App = () => {
    return (
        <Provider
            store={store}
        >
            <Router>
                <MainLayout>
                    <Switch>
                        <Route path={'/'} exact component={Today}/>
                        <Route path={'/hourly'} exact component={Hourly}/>
                        <Route path={'/days'} exact component={Days}/>
                        <Route path={'/monthly'} exact component={Monthly}/>
                        <Route path={'/about'} exact component={About}/>
                    </Switch>
                </MainLayout>
            </Router>
        </Provider>
    );
};

export default App;
