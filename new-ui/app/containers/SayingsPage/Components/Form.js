import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import PropTypes from 'prop-types';
import { Grid, Typography, Button, Modal, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';

import sayingsIcon from '../../../images/sayings-icon.svg';
import playHelpIcon from '../../../images/play-help-icon.svg';
import searchIcon from '../../../images/search-icon.svg';

import SayingsDataForm from './SayingsDataForm';

const styles = {
  headerContainer: {
    backgroundColor: '#f6f7f8',
    border: '1px solid #c5cbd8',
    borderRadius: '5px',
    marginBottom: '60px'
  },
  titleContainer: {
    padding: '25px'
  },
  sayingsIcon: {
    display: 'inline',
    paddingRight: '10px',
    height: '30px'
  },
  titleTextHelpContainer: {
    display: 'inline',
    position: 'relative',
    bottom: '6px'
  },
  title: {
    display: 'inline',
    paddingRight: '25px'
  },
  helpButton: {
    display: 'inline',
    width: '50px',
    height: '20px'
  },
  playIcon: {
    height: '10px'
  },
  helpText: {
    fontSize: '9px',
    fontWeight: 300,
    position: 'relative',
    bottom: '2px',
    paddingLeft: '2px'
  },
  agentTabs: {
    paddingLeft: '5px'
  },
  modalContent: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: window.window.innerWidth < 675 ? 350 : 600,
    height: window.window.innerWidth < 675 ? 215 : 375,
    backgroundColor: '#fff',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
  },
  searchForm: {
    display: 'inline',
    paddingLeft: '25px'
  },
  searchInputField: {
    width: '250px',
    paddingLeft: '5px',
    fontSize: '14px'
  }
};

/* eslint-disable react/prefer-stateless-function */
class Form extends React.Component {
  state = {
    openModal: false
  };

  handleOpen = () => {
    this.setState({
      openModal: true
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false
    });
  };

  render() {
    const { classes, intl } = this.props;
    return (
      <Grid className={classes.headerContainer} container item xs={12}>
        <Grid className={classes.titleContainer} item xs={12}>
          <img className={classes.sayingsIcon} src={sayingsIcon} />
          <Grid className={classes.titleTextHelpContainer} container>
            <Typography className={classes.title} variant='display3'>
              <FormattedMessage {...messages.formTitle} />
            </Typography>
            <Button
              className={classes.helpButton}
              variant='outlined'
              onClick={this.handleOpen}
            >
              <img
                className={classes.playIcon}
                src={playHelpIcon}
                alt={intl.formatMessage(messages.playHelpAlt)}
              />
              <span className={classes.helpText}>
                <FormattedMessage {...messages.help} />
              </span>
            </Button>
            <form className={classes.searchForm}>
              <img src={searchIcon} alt={intl.formatMessage(messages.searchSayingsAlt)} />
              <Input
                inputProps={{
                  style: {
                    border: 'none'
                  }
                }}
                disableUnderline
                className={classes.searchInputField}
                placeholder={intl.formatMessage(messages.searchSayingPlaceholder)}
                onChange={(evt) => { this.props.onSearchSaying(evt.target.value) }}
              />
            </form>
            <Modal open={this.state.openModal} onClose={this.handleClose}>
              <Grid className={classes.modalContent} container>
                <iframe
                  width={styles.modalContent.width}
                  height={styles.modalContent.height}
                  src='https://www.youtube.com/embed/o807YDeK6Vg'
                  frameBorder='0'
                  allow='autoplay; encrypted-media'
                  allowFullScreen
                />
              </Grid>
            </Modal>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {<SayingsDataForm
            agentId={this.props.agentId}
            sayings={this.props.sayings}
            agentKeywords={this.props.agentKeywords}
            onAddSaying={this.props.onAddSaying}
            onDeleteSaying={this.props.onDeleteSaying}
            onDeleteAction={this.props.onDeleteAction}
            onTagKeyword={this.props.onTagKeyword}
            onUntagKeyword={this.props.onUntagKeyword}
            onAddAction={this.props.onAddAction}
            onCreateAction={this.props.onCreateAction}
            currentPage={this.props.currentPage}
            numberOfPages={this.props.numberOfPages}
            changePage={this.props.changePage}
            movePageBack={this.props.movePageBack}
            movePageForward={this.props.movePageForward}
          />}
        </Grid>
      </Grid>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  sayings: PropTypes.array,
  agentId: PropTypes.number,
  agentKeywords: PropTypes.object,
  onAddSaying: PropTypes.func,
  onDeleteSaying: PropTypes.func,
  onDeleteAction: PropTypes.func,
  onTagKeyword: PropTypes.func,
  onUntagKeyword: PropTypes.func,
  onSearchSaying: PropTypes.func,
  onAddAction: PropTypes.func,
  onCreateAction: PropTypes.func,
  currentPage: PropTypes.number,
  numberOfPages: PropTypes.number,
  changePage: PropTypes.func,
  movePageBack: PropTypes.func,
  movePageForward: PropTypes.func,
};

export default injectIntl(withStyles(styles)(Form));
