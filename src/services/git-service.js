
export default class GitService{
 
    getResource=async(path)=>{ 
    const gimmeStat=require('../components/gimme-stat/index');
        gimmeStat.json({path})
       .then(answer=>answer.json)
       
     

    }
}