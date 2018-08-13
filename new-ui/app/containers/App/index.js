/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';

import AgentsPage from 'containers/AgentsPage/Loadable';
import AgentPage from 'containers/AgentPage/Loadable';
import SayingsPage from 'containers/SayingsPage/Loadable';
import KeywordsPage from 'containers/KeywordsPage/Loadable';
import KeywordsEditPage from 'containers/KeywordsEditPage/Loadable';
import ActionPage from 'containers/ActionPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import MissingAPIPage from 'containers/MissingAPIPage/Loadable';


import {
  checkAPI
} from './actions';

import {
  makeSelectMissingAPI,
  makeSelectLocation,
} from './selectors';

class App extends React.Component {

  componentWillMount(){
    this.props.onCheckAPI();
  }

  componentDidMount(){
    if (this.props.missingAPI){
      this.props.onMissingAPI(this.props.location.pathname);
    }
  }

  componentWillUpdate(){
    this.props.onCheckAPI(this.props.location.pathname);
  }

  componentDidUpdate(){
    if (this.props.missingAPI){
      this.props.onMissingAPI(this.props.location.pathname);
    }
  }

  render (){
    return (
      <div>
        <AppHeader/>
        <AppContent>
          <Switch>
            <Route exact path='/' component={AgentsPage} />
            <Route exact path='/agent/:id' component={AgentPage} />
            <Route exact path='/agent/:id/sayings' component={SayingsPage} />
            <Route exact path='/agent/:id/keywords' component={KeywordsPage} />
            <Route exact path='/agent/:id/keyword/:keywordId' component={KeywordsEditPage} />
            <Route exact path='/agent/:id/action/:actionId' component={ActionPage} />
            <Route exact path='/settings' component={SettingsPage} />
            <Route exact path='/missing-api' component={MissingAPIPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AppContent>
      </div>
    );
  }
}

App.propTypes = {
  missingAPI: PropTypes.bool,
  location: PropTypes.object,
  onMissingAPI: PropTypes.func,
  onCheckAPI: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onMissingAPI: (refURL) => {
      if (refURL !== '/missing-api'){
        dispatch(push('/missing-api'));
      }
    },
    onCheckAPI: (refURL) => {
      if (refURL && refURL !== '/missing-api'){
        dispatch(checkAPI(refURL));
      }
      dispatch(checkAPI());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  missingAPI: makeSelectMissingAPI(),
  location: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default withConnect(App);
