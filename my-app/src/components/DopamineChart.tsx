import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement
} from "chart.js"

import {Line} from "react-chartjs-2"

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement
)

function DopamineChart(){

const data={
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[
{
label:"Dopamine Score",
data:[60,70,65,80,75,85,90],
borderColor:"#22c55e",
backgroundColor:"#22c55e"
}
]
}

return(

<div className="card">

<h2>Dopamine Trend</h2>

<Line data={data}/>

</div>

)

}

export default DopamineChart