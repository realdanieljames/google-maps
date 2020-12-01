import React from 'react';
import "./Product.css";
import axios from 'axios';






export default class Product extends React.Component {

state ={
jobs: []
}
componentDidMount() {

axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/10?&where=11203&distance=20`)
.then((response)=>{
let results = response.data.results

console.log(results)

this.setState({jobs: results})
// 


})}

render(){

    return (
        <div >
            <div 
            className="product_info"
            
            >



                {this.state.jobs.length !== 0 
                ? (this.state.jobs.map((jobs)=> {
                    
                    const{id,latitude, longitude, location, title, company, description, salary_max, salary_min} =jobs
                    console.log(description.length)
            

                    return (
                        <div>

                    <button id={id} className='product' onClick={()=>{console.log(latitude, longitude)}}>
                        <div className="company_logo"> 💼 </div>
                        <a className="title"><strong> {title} </strong></a>                          
                        <a className="company_name">{company.display_name}</a>      
                        <div className="location_name">{location.display_name}</div>        
                    {/* <li className="job_description">{description}</li>             */}
                    {/* <span>{salary_max}</span> */}
                    </button>
                        </div>
                    )
                }))
                :""}
                    


            </div>
            
        </div>
    )
}
    
}

