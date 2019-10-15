import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import SentimentVeryDissatisfiedTwoToneIcon from '@material-ui/icons/SentimentVeryDissatisfiedTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      isToggled: true,
      content: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if (this.props.question.category){
      this.setState({
        category: this.props.question.category,
        question: this.props.question,
        content: this.props.question.question
      })
    };
  };

  handleClick() {
    this.setState(prevState => ({
      content: this.props.question.answer.toUpperCase()
    }))
    setTimeout(() =>
      this.setState({isToggled: false}), 1000)
  };

  render() {
    const { classes } = this.props;

    return(
      <Card className={classes.card} onClick={this.handleClick} style={{cursor: this.state.isToggled && 'pointer'}}>
        <CardContent>
          <Typography variant="body1" component="p" color="primary">
            {this.state.category ? this.state.category.title.toUpperCase() : "MYSTERY" }
          </Typography>
          <Typography variant="h5" component="h2">
            {this.state.content ? this.state.content : "MYSTERY QuESTION"}
          </Typography>
        </CardContent>
        <CardActions style={{display: this.state.isToggled && "none"}}>
          <Typography variant="body2" component="p">
            How'd you do?
          </Typography>
          <Tooltip title={`Great! +${this.state.question.value}`} aria-label="Great!">
            <Button size="small" color="primary" onClick={() => this.props.updateScore(this.state.question.value, true)}><EmojiEmotionsTwoToneIcon /></Button>
          </Tooltip>
          <Tooltip title={`Eh. -${this.state.question.value}`} aria-label="Eh.">
            <Button size="small" onClick={() => this.props.updateScore(-this.state.question.value, true)}><SentimentVeryDissatisfiedTwoToneIcon /></Button>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
};

FlashCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlashCard);
