
export default class GitService{
 
    getResource=async(path)=>{ 
        
    const gimmeStat=require('../components/gimme-stat/index');
       return await gimmeStat.json({cwd:path})
       .then(answer=>answer.json)
       
     

    }
}