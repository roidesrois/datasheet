import React, { Suspense, lazy, Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import './icons';
import './yup';

import './app.scss';

const loadPage = page => props => {
    const Component = lazy(() => import(`../pages/${page}`));
    return <Component {...props} />;
};

class App extends Component {
    render() {
        return (
            <Fragment>
                <Helmet titleTemplate="%s - Datasheet" defaultTitle="Datasheet" />
                <main role="main">
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route component={loadPage('employees/Employees')} />
                        </Switch>
                    </Suspense>
                </main>
            </Fragment>
        );
    }
}

export default App;
