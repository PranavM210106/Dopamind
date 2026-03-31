type Props={
title:string
value:string
icon:any
}

function StatCard({title,value,icon:Icon}:Props){

return(

<div className="card">

<Icon size={40}/>

<h3>{title}</h3>

<h2>{value}</h2>

</div>

)

}

export default StatCard