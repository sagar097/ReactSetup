import React,{memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Button,CardMedia,CardContent,CardActionArea,CardActions,Card,Grid} from '@material-ui/core';
import { API_GATEWAY_URL } from '../../helper/constants';
import Dialog from './DialogComponent';
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 150,
  },
});

 function TechCard1(props) {
  const classes = useStyles();
  const {subjectList } = props;
  return (
   <Grid container spacing={1}>
    {subjectList&&subjectList.map((card,index)=>(
            <Grid item  xs={12} md={4} sm={6}  key={card.id} key={card._id}>
             <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={API_GATEWAY_URL + card.subjectImage}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.subjectName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       {card.examTime}:00 Hours Score: 0%
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                      Start Exam
                    </Button>
                       <Dialog title={card.subjectName} description={card.subjectDescription}/>
                </CardActions>
                </Card>
            </Grid>  )
        )}
    </Grid>
  );
}
TechCard1.defaultProps={
    subjectList:[
      {
          id:1,
          subjectName :'Javascript',
          description:"Sample Test For Javascript",
          img : 'js'
      },
      {
         id:2,
         subjectName : 'Reactjs',
         description : "Sample Test For React-Js" ,
         img :  'Reactjs'
      },
      { 
          id:3,
          subjectName : 'Nodejs',
          description : "Sample Test For Node-Js",
          img : 'Nodejs'
      }
  ]
}
export default memo(TechCard1);
