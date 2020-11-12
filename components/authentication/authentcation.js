let authForm=document.querySelector("#authenticationForm");
let login=document.querySelector("#login");
let tabs =document.querySelector("#tabs")
let register=document.querySelector('#register');
let auth='';
let form={
    email:"",
    password:""
}


authForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    changeHandler();
})

let changeHandler=()=>{
  form.email=authForm.elements["email"].value;
  form.password =authForm.elements["password"].value;
}

const request = async (url, method = 'GET', body = null, headers = {}) => {
    

    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Http request error')
      }

    

      return data
    } catch (e) {
 
      throw e;
    }
  }


login.addEventListener('click', async()=>{
    changeHandler();
    try {
        const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId);
        authForm.classList.add('hide');
        tabs.classList.remove('hide')
        
      } catch (error) {}
    
});
register.addEventListener('click',async()=>{
    
    changeHandler();
    try {
        const data = await request('/api/auth/register', 'POST', {...form})
        message(data.message)
        console.log('Data', data);
        authForm.classList.add('hide');
        tabs.classList.remove('hide')
      } catch (error) {}
    
    
});