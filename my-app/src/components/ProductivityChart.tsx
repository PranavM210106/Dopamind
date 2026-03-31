import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

function ProductivityChart(){

const data={
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Focus Hours",
data:[3,4,5,4,6,5,7],
backgroundColor:"#38bdf8"
}
]
}

return(

<div className="card">

<h3>Weekly Productivity</h3>

<Bar data={data}/>

</div>

)

}

export default ProductivityChart