import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPath} from '../../actions';
import ReportList from '../report';



class InputPanel extends Component{
    
  render(){
          
    return(
        <>
        <form onSubmit={(e)=>{
          e.preventDefault();
          this.props.getPath(e.target[0].value)}}>
          
        <label htmlFor="pathToRepo">Path</label>
        <input id="pathToRepo" name="pathToRepo" type='text'/>
        <button type='submit' >Submit</button>
        <button type='reset'>Reset</button>
        </form>
      
        <ReportList/>
        </>
    )
  }



}


  
  const mapDispatchToProps={
    getPath
}

  export default connect(null,mapDispatchToProps)(InputPanel)
  
 



