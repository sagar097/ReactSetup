import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {getQuestionApi} from '../../redux/services/QuestionAnswer/QuestionAnswer';


 class Exam extends Component{
   constructor(props){
     super(props);
   }

   

   async componentDidMount(){

       await getQuestionApi(this.props).then(res=>{
        console.log(res,"New Exam DATa");
      });    
   }

     
 
  
  render(){
     const classes = {
        backgroundColor:'#cfe8fc',
        width:'auto',
        height:'100vh'
     }
 
   return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography component="div" style={classes} />

      </Container>
    </React.Fragment>
  );
   }
}



export default Exam;