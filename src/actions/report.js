  
const commitsLoaded=(commits)=>{
    return{
        type:"COMMITS_LOADED",
        payload:commits
    };
};

const getPath=(pathToRepo)=>{
    return{
        type:"GET_PATH",
        payload:pathToRepo
        
    };
};






export {
    commitsLoaded,
    getPath
 


    
   
};