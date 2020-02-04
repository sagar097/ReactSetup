import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Button,CardMedia,CardContent,CardActionArea,CardActions,Card,Grid} from '@material-ui/core';
import Reactjs from '../../assets/images/png/Reactjs.png';
import Nodejs from '../../assets/images/png/Nodejs.png';
import js from '../../assets/images/png/Javascript.png';
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 90,
  },
});

 function TechCard(props) {
  const classes = useStyles();

  return (
   <Grid container>
    {props.technology&&props.technology.map((card,index)=>(
            <Grid item xs={4} key={card.id}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={card.img}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {card.description}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                </CardActions>
                </Card>
            </Grid>  )
        )}
    </Grid>
  );
}
TechCard.defaultProps={
  technology:[
      {
          id:1,
          title :'Javascript',
          description:"Sample Test For Javascript",
          img : js
      },
      {
         id:2,
         title : 'Reactjs',
         description : "Sample Test For React-Js" ,
         img :  Reactjs
      },
      { 
          id:3,
          title : 'Nodejs',
          description : "Sample Test For Node-Js",
          img : Nodejs
      }
  ]
}
export default TechCard;
