import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FlashCard from "./components/FlashCard";
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  chip: {
    margin: theme.spacing(0, 0, 2, 0),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      questionData: {},
      score: 0
    }
  };

  componentDidMount() {
    this.setState({loading: true})
    this.fetchQuestion()
  };

  fetchQuestion() {
    fetch("http://jservice.io/api/random")
      .then(response => response.json())
      .then(data => {
        this.setState({
          questionData: data[0],
          loading: false
        })
      })
  }

  updateScore(value, nextQuestion){
    this.setState(prevState => ({
      score: prevState.score + (value)
    }))
    if (nextQuestion) {
      this.setState({loading: true})
      setTimeout(() => this.fetchQuestion(), 1500)
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="sm">
        <CssBaseline />
        <Paper className={classes.root}>
          <Chip className={classes.chip} icon={<AttachMoneyIcon />} label={this.state.score} />
          {this.state.loading ? (
            <div>
              <Typography variant="h5" component="h3">
                Question Loading...
              </Typography>
            </div>
          ) : (
            <FlashCard question={this.state.questionData} updateScore={this.updateScore.bind(this)}/>
          )}
        </Paper>
      </Container>
    );
  }
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
