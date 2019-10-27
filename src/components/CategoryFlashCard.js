import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class CategoryFlashCard extends React.Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }

  render() {
    return(
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.category}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default CategoryFlashCard
