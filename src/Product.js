import React from "react";
import "./Product.css";
import {adzunaAppID, adzunaAppKey} from "./key";
import axios from "axios";
import GoogleMap from "./App";
import { Marker } from "@react-google-maps/api";

// console.log(GoogleMap)

export default class Product extends React.Component {
state = {
    jobs: [],
    jobSearchInput: "",
};

componentDidMount() {

const search = async ()=>{

    const jobList = await axios.get(
        `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${adzunaAppID}&app_key=${adzunaAppKey}&results_per_page=50&what=javascript&sort_by=salary&salary_min=1&salary_include_unknown=1`
        )

            let results = jobList.data.results;
            
            // console.log(results);
            
            this.setState({
                jobs: results,
            });
            // const search = 
            
        // }
        // );
    }
    search()
}
//==========================================================================================//
//==========================================================================================//
// handleOnJobSearch = async (event)=>{
//     console.log(event)
// }


//==========================================================================================//
//==========================================================================================//
render() {
    return (
    <div>
        <div className="product_info">
        {this.state.jobs.length !== 0
            ? this.state.jobs.map((jobs) => {
console.log(jobs)
                // if(jobs.salary_max !== undefined ||  jobs.salary_max !== ''){
                //     return jobs.salary_max
                // }
                // if(jobs.salary_min !== undefined || ''){
                //     console.log(jobs.salary_min)
                //     return jobs.salary_min
                // }



                let {
                id,
                latitude,
                longitude,
                location,
                title,
                company,
                description,
                redirect_url,
                salary_max,
                salary_min,
                } = jobs;


                // if(salary_max !== undefined){
                //     let salaryMax =salary_max
                //     return salaryMax
                // }
                // console.log(salaryMax)

                // salary_max.filter(value => value !== undefined)


                //shorten description on preview
                const summaryDescription = description.substring(0, 50);
                const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                });
                salary_max = formatter.format(salary_max); // "$1,000.00"
                salary_min = formatter.format(salary_min); // "$1,000.00"

//                 let noNan = salary_max.filter((nanValues)=> console.log(nanValues))
// console.log(noNan)
                function onProductClick() {

                    window.open(redirect_url, '_blank')

                }

                return (
                <div>
                    <button className="product" onClick={onProductClick}>
                    <div className="company_logo"> 💼 </div>
                    <a className="title">
                        <strong> {title} </strong>
                    </a>
                    <a className="company_name">{company.display_name}</a>
                    <div className="location_name">
                        {location.display_name}
                    </div>
                    <li className="job_description">{summaryDescription}</li>
                    {/* <li className="job_description">{description}</li>  */}
                    <div className="salary">
                        <span className="minimum">
                        minimum salary: <strong>{salary_min}</strong>
                        </span>
                        <br />
                        <br />
                        <span className="maximum">
                       maximum salary: <strong> {salary_max}</strong>
                        </span>
                    </div>
                    </button>
                </div>
                );
            })
            : ""}
        </div>
    </div>
    );
}
}