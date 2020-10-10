
import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithStoreService from '../hoc';
import {commitsLoaded} from '../../actions';
import TableItem from '../table-item';


import './report.css';

class ReportList extends Component {
 

        componentDidUpdate(prevProps){
        const {pathToRepo}=this.props;
        if (prevProps.pathToRepo !== this.props.pathToRepo) {
            const {GitService}=this.props;

            console.log(pathToRepo);
            
           
         
            GitService.getResource(pathToRepo)
            .then(answer=>this.props.commitsLoaded(answer))
               
        }   
              
         
                 
    }


    render() {

        const{items, pathToRepo}=this.props;
     


        console.log(items);
        if(!pathToRepo){
            return(<>
            <h2>Stats</h2>
            </>)
        }
           

        return (
            <>
           
           <h2>Stats</h2>
           
       
       <div className="first">
       <table className="tableStats">
        <tr>
           <th>Name</th>
           <th>Rows added</th>
           <th>Rows Deleted</th>
           <th>Commits</th>
           
           </tr>
               {
            
                items.map(item=>{
                return <TableItem  
                item={item} 
                />
                
                
                })
               
                }
        </table>
        </div>
                       
            
           </>
           
        )
    } 
    
};

const mapStateToProps=(state)=>{
    
        
    return{
        items:state.commitsReducer.commits,
        pathToRepo:state.commitsReducer.pathToRepo    

       
    }
}

const mapDispatchToProps={
    commitsLoaded,
    
    
}

export default WithStoreService()(connect(mapStateToProps,mapDispatchToProps)(ReportList));