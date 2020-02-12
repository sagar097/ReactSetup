import React, { Component } from 'react'
import TechCard from '../../components/TechCards/TechCard';
import { getAllTechnologyDetail } from '../../redux/actions/technologyListAction';
import {connect} from 'react-redux';

export class Technology extends Component {
    constructor(props){
        super(props);
        // this.state=({

        // })
    }


    componentDidMount(){
        this.props.getAllTechnologyDetail();
    }
    render() {
       // console.log("SubjectList",this.props.SubjectList)

        return (
            <React.Fragment>
             <TechCard subjectList ={this.props.SubjectList}/>
            </React.Fragment>
        )
    }
}

const mapStateToProps=({TechnologyListData})=>({
   Loading: TechnologyListData.isLoading,
   SubjectList: TechnologyListData.TechnologyDataList
})

const mapDispatchToProps={
    getAllTechnologyDetail
}

export default connect(mapStateToProps,mapDispatchToProps) (Technology);
