import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js"

import { Pie } from "react-chartjs-2"

ChartJS.register(
ArcElement,
Tooltip,
Legend
)

function HabitChart(){

const data={
labels:["Exercise","Study","Meditation","Social Media"],
datasets:[
{
data:[25,40,15,20],
backgroundColor:[
"#38bdf8",
"#22c55e",
"#facc15",
"#ef4444"
]
}
]
}

return(

<div className="card">

<h3>Habit Distribution</h3>

<Pie data={data}/>

</div>

)

}

export default HabitChart