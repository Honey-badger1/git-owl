import React from 'react';

import GitServiceContext from '../git-service-context';


const WithStoreService =()=>(Wrapped)=>{

    return(props)=>{
        return(
            <GitServiceContext.Consumer>
             {
                 (GitService)=>{

                    return <Wrapped {...props} GitService={GitService}/>

                 }
             }

            </GitServiceContext.Consumer>

        )
    } 

};

export default WithStoreService;
