import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FlashCard from "./components/FlashCard";
import CategoryFlashCard from "./components/CategoryFlashCard";
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
      loading: true,
      questionsData: {},
      score: 0
    }
  };

  componentDidMount() {
    this.fetchQuestionsData()
  };

  // fetchQuestion() {
  //   fetch("http://jservice.io/api/random")
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         questionData: data[0],
  //         loading: false
  //       })
  //     })
  // }

  fetchQuestionsData() {
    // fetch 6 categories
    fetch("http://jservice.io/api/category?id=11508")
      .then(response => response.json())
      .then(data => {
        this.setState({
          questionsData: data,
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
            <div>
              <CategoryFlashCard category={this.state.questionsData.title}/>
              {this.state.questionsData.clues.map(question => <FlashCard question={question} updateScore={this.updateScore.bind(this)}/>)}
            </div>
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
