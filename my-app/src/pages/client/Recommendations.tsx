import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { getAnalytics } from "../../api/api"

import { FaAppleAlt, FaRunning, FaBrain, FaClock } from "react-icons/fa"

/* ---------- TIME OF DAY ---------- */

const getTimeOfDay = () => {
  const hour = new Date().getHours()
  if(hour >= 5 && hour < 12) return "morning"
  if(hour >= 12 && hour < 17) return "noon"
  if(hour >= 17 && hour < 21) return "evening"
  return "night"
}

/* ---------- SCORE LEVEL ---------- */

const getScoreLevel = (score: number) => {
  if(score < 30) return "low"
  if(score < 60) return "medium"
  if(score < 85) return "high"
  return "max"
}

/* ---------- FOOD RECOMMENDATIONS ---------- */

const getFoodTips = (score: number, time: string) => {
  const level = getScoreLevel(score)

  if(time === "morning"){
    if(level === "low") return [
      "🍌 Bananas – boost dopamine fast in the morning",
      "🥚 Eggs with veggies – fuel your brain early",
      "☕ Green tea – gentle caffeine + L-theanine",
      "🫐 Blueberries – start your day with antioxidants"
    ]
    if(level === "medium") return [
      "🥣 Oats with honey – steady energy release",
      "🥑 Avocado toast – healthy fats for focus",
      "🍊 Orange juice – vitamin C boost",
      "🥜 Almonds – protein + good fats"
    ]
    if(level === "high") return [
      "🍳 Protein-rich breakfast – maintain your momentum",
      "🫐 Mixed berries smoothie – keep score rising",
      "🥦 Green veggies – sustain high performance",
      "💧 Stay hydrated – water before coffee"
    ]
    return [
      "🏆 You're at peak! Eat clean to stay there",
      "🥗 Light salad – keep energy stable",
      "🍇 Fresh fruits – natural sugar boost",
      "🫖 Herbal tea – maintain calm focus"
    ]
  }

  if(time === "noon"){
    if(level === "low") return [
      "🍗 Chicken + rice – rebuild your energy",
      "🥬 Spinach salad – iron for focus",
      "🍠 Sweet potato – complex carbs",
      "🥤 Protein shake – quick dopamine fuel"
    ]
    if(level === "medium") return [
      "🥙 Balanced lunch – protein + carbs + veggies",
      "🫘 Lentil soup – slow energy release",
      "🧀 Cheese + whole grain – tyrosine boost",
      "🍵 Green tea – afternoon focus"
    ]
    if(level === "high") return [
      "🥗 Light lunch – don't slow down now",
      "🍱 Meal prep bowl – stay consistent",
      "🐟 Fish – omega 3 for brain power",
      "🫐 Fruit bowl – natural energy top-up"
    ]
    return [
      "🏆 Peak performer lunch – keep it clean",
      "🥩 Lean protein – fuel your afternoon",
      "🥦 Steamed veggies – anti-inflammatory",
      "💧 2 glasses of water before eating"
    ]
  }

  if(time === "evening"){
    if(level === "low") return [
      "🍲 Warm soup – comfort + nutrition",
      "🥚 Boiled eggs – quick protein fix",
      "🍌 Banana + peanut butter – dopamine combo",
      "🫖 Chamomile tea – reduce stress"
    ]
    if(level === "medium") return [
      "🍝 Pasta with veggies – energy replenishment",
      "🥗 Light dinner – don't overeat",
      "🍊 Vitamin C fruits – immune boost",
      "🫘 Beans – plant protein for recovery"
    ]
    if(level === "high") return [
      "🐟 Grilled fish – omega 3 recovery",
      "🥦 Broccoli + brown rice – clean dinner",
      "🍵 Green tea – wind down smartly",
      "🥛 Warm milk – melatonin for sleep"
    ]
    return [
      "🏆 Light dinner – protect your peak score",
      "🥗 Salad + protein – clean end to the day",
      "🫖 Herbal tea – prepare for rest",
      "🍇 Small fruit – natural night snack"
    ]
  }

  // night
  if(level === "low") return [
    "🥛 Warm milk – serotonin boost before sleep",
    "🍌 Small banana – relax your muscles",
    "🫖 Chamomile tea – calm your mind",
    "🥜 Small handful of nuts – overnight fuel"
  ]
  if(level === "medium") return [
    "🫖 Herbal tea – wind down properly",
    "🥛 Warm milk + honey – improve sleep quality",
    "🍎 Small apple – light night snack",
    "Avoid heavy food after 9pm"
  ]
  return [
    "💧 Just water – protect your score overnight",
    "🫖 Sleep tea – maintain recovery",
    "🥛 Warm milk – keep sleep consistent",
    "No screens + no food after 10pm"
  ]
}

/* ---------- EXERCISE RECOMMENDATIONS ---------- */

const getExerciseTips = (score: number, time: string) => {
  const level = getScoreLevel(score)

  if(time === "morning"){
    if(level === "low") return [
      "🚶 10 min light walk – start small",
      "🧘 5 min breathing exercises",
      "🙆 Full body stretch – wake up muscles",
      "Don't skip – even 5 mins counts today"
    ]
    if(level === "medium") return [
      "🏃 20 min morning jog – boost dopamine",
      "💪 15 min bodyweight workout",
      "🧘 10 min yoga – set positive tone",
      "🚴 Cycling if possible – great morning exercise"
    ]
    if(level === "high") return [
      "💪 30 min strength training – push harder",
      "🏃 5km run – you have the energy",
      "🧘 15 min yoga + meditation combo",
      "🏋️ Add weights to your routine today"
    ]
    return [
      "🏆 Intense workout – you're at peak!",
      "🏃 Long run or HIIT session",
      "💪 Full body strength training",
      "🧘 Post-workout meditation to lock in gains"
    ]
  }

  if(time === "noon"){
    if(level === "low") return [
      "🚶 10 min walk after lunch",
      "🙆 Desk stretches every 30 mins",
      "🧘 5 min breathing at your desk",
      "Avoid sitting for more than 1 hour"
    ]
    if(level === "medium") return [
      "🚶 15 min brisk walk after lunch",
      "🙆 10 min stretching session",
      "💃 5 min movement break every hour",
      "Take stairs instead of elevator"
    ]
    if(level === "high") return [
      "🏃 Lunch time jog – 20 mins",
      "💪 Quick 15 min resistance workout",
      "🚴 Cycle instead of drive today",
      "🧘 10 min mindfulness after exercise"
    ]
    return [
      "🏆 Active lunch break – 30 min workout",
      "🏃 High intensity interval training",
      "💪 Upper body or lower body focus",
      "🧘 Cool down + stretch properly"
    ]
  }

  if(time === "evening"){
    if(level === "low") return [
      "🚶 Evening walk – 15 mins minimum",
      "🧘 10 min relaxing yoga",
      "🙆 Light stretching before dinner",
      "No intense exercise – keep it gentle"
    ]
    if(level === "medium") return [
      "🏃 30 min evening jog",
      "💪 20 min home workout",
      "🧘 15 min yoga session",
      "🚴 Evening cycling – great stress relief"
    ]
    if(level === "high") return [
      "💪 45 min gym session",
      "🏃 5km evening run",
      "🧘 Yoga + meditation combo",
      "🏋️ Focus on weak areas today"
    ]
    return [
      "🏆 Peak workout – go all out!",
      "🏃 Long run – 7-10km",
      "💪 Full body intense workout",
      "🧘 30 min recovery yoga after"
    ]
  }

  // night
  return [
    "🧘 10 min bedtime yoga – wind down",
    "🙆 Light stretching – release tension",
    "🚶 Short walk if you haven't exercised",
    "No intense exercise after 9pm"
  ]
}

/* ---------- DOPAMINE TIPS ---------- */

const getDopamineTips = (score: number, time: string) => {
  const level = getScoreLevel(score)

  if(level === "low"){
    if(time === "morning") return [
      "⚠️ Low score – complete at least 1 task today",
      "Start with the easiest habit first",
      "Write down 3 things you're grateful for",
      "Avoid phone for first 30 mins after waking"
    ]
    if(time === "noon") return [
      "⚠️ Score still low – take action now",
      "Complete one pending task immediately",
      "Take a short walk to reset your mood",
      "Avoid doom-scrolling during lunch"
    ]
    if(time === "evening") return [
      "Reflect on what you did complete today",
      "Plan tomorrow's top 3 tasks tonight",
      "Avoid social media for rest of evening",
      "Early sleep will reset your score tomorrow"
    ]
    return [
      "Poor sleep = low dopamine – sleep by 10:30pm",
      "No screens 1 hour before bed",
      "Write tomorrow's plan before sleeping",
      "Tomorrow is a fresh start – rest well"
    ]
  }

  if(level === "medium"){
    if(time === "morning") return [
      "Good start – build on yesterday's progress",
      "Set 3 clear goals for today",
      "Listen to upbeat music while working",
      "Avoid social media until noon"
    ]
    if(time === "noon") return [
      "Halfway through the day – stay focused",
      "Complete your hardest task in next 2 hours",
      "Take a proper lunch break – no screens",
      "Review your morning progress"
    ]
    if(time === "evening") return [
      "Good day so far – finish strong",
      "Complete your remaining habits",
      "Reflect on what went well today",
      "Prepare for tomorrow tonight"
    ]
    return [
      "Decent day – aim higher tomorrow",
      "Review all completed tasks with pride",
      "Sleep by 10:30pm for better tomorrow",
      "No screens – let your brain rest"
    ]
  }

  if(level === "high"){
    if(time === "morning") return [
      "🌟 Great score – maintain this momentum!",
      "Challenge yourself with a harder task",
      "Help someone today – social dopamine boost",
      "Try a new habit to push score higher"
    ]
    if(time === "noon") return [
      "🌟 Crushing it – keep the streak alive",
      "Don't slack in the afternoon – push through",
      "Review and complete all pending tasks",
      "Share your progress with someone"
    ]
    if(time === "evening") return [
      "🌟 Excellent day – complete remaining habits",
      "Add one bonus task to push score to max",
      "Journal your wins from today",
      "Prepare a strong plan for tomorrow"
    ]
    return [
      "🌟 Great day – protect this score",
      "Sleep early to maintain high score",
      "Review all achievements from today",
      "Plan to beat today's score tomorrow"
    ]
  }

  // max
  return [
    "🏆 PERFECT SCORE – incredible work!",
    "Share your streak to inspire others",
    "Set a new personal challenge for tomorrow",
    "You're in the top tier – stay consistent"
  ]
}

/* ---------- PRODUCTIVITY TIPS ---------- */

const getProductivityTips = (score: number, time: string) => {
  const level = getScoreLevel(score)

  if(time === "morning"){
    if(level === "low") return [
      "Start with just ONE small task",
      "Use a timer – work for 10 mins only",
      "Remove all distractions from your desk",
      "Write your top 3 priorities for today"
    ]
    if(level === "medium") return [
      "Use Pomodoro – 25 min work, 5 min break",
      "Tackle your hardest task first",
      "No social media until noon",
      "Set a clear goal for this morning"
    ]
    if(level === "high") return [
      "Deep work session – 90 mins no distraction",
      "Batch similar tasks together",
      "Review and update your habit list",
      "Plan your week if it's Monday"
    ]
    return [
      "🏆 You're at peak – go into deep work mode",
      "Work on your most important project",
      "Mentor or help a teammate today",
      "Challenge yourself with a stretch goal"
    ]
  }

  if(time === "noon"){
    if(level === "low") return [
      "You still have the afternoon – start now",
      "Pick ONE task and finish it completely",
      "Pomodoro – just one 25 min session",
      "Turn off notifications for 1 hour"
    ]
    if(level === "medium") return [
      "Review morning progress – adjust plans",
      "Focus on top 2 remaining tasks",
      "Avoid meetings if possible – stay in flow",
      "Take a proper break – away from screen"
    ]
    if(level === "high") return [
      "Keep momentum – don't slow down now",
      "Complete your task list before 5pm",
      "Help a colleague – boosts your mood too",
      "Prepare tomorrow's task list now"
    ]
    return [
      "🏆 Stay in flow – you're performing amazingly",
      "Finish all tasks before evening",
      "Document your process – others can learn",
      "Keep distractions at zero"
    ]
  }

  if(time === "evening"){
    if(level === "low") return [
      "Last chance today – complete 1 task",
      "Plan tomorrow in detail tonight",
      "Reflect on what blocked you today",
      "Set an earlier start time for tomorrow"
    ]
    if(level === "medium") return [
      "Review today – what can improve?",
      "Complete remaining habits before sleep",
      "Prepare tomorrow's top 3 tasks",
      "Disconnect from work by 8pm"
    ]
    if(level === "high") return [
      "Finish strong – complete all habits",
      "Journal your productivity wins",
      "Set ambitious goals for tomorrow",
      "Review your weekly progress"
    ]
    return [
      "🏆 Wind down properly – protect your score",
      "Complete final tasks of the day",
      "Write down tomorrow's plan",
      "Celebrate today's achievements"
    ]
  }

  // night
  return [
    "Plan tomorrow's top 3 tasks now",
    "Review what you completed today",
    "Set your wake up time for tomorrow",
    "Sleep is productivity – don't skip it"
  ]
}

/* ============ COMPONENT ============ */

function Recommendations(){

const [sidebarOpen, setSidebarOpen] = useState(true)
const [analytics, setAnalytics] = useState<any>(null)
const [loading, setLoading] = useState(true)

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await getAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error("Failed to fetch analytics", err)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])

const score = analytics?.dopamineScore ?? 0
const time = getTimeOfDay()
const level = getScoreLevel(score)

const scoreColor =
  level === "low" ? "#f87171" :
  level === "medium" ? "#facc15" :
  level === "high" ? "#38bdf8" :
  "#22c55e"

const scoreLabel =
  level === "low" ? "Low – Take Action 🚨" :
  level === "medium" ? "Medium – Keep Pushing 💪" :
  level === "high" ? "High – Great Work 🌟" :
  "Peak – Outstanding 🏆"

const timeLabel =
  time === "morning" ? "🌅 Morning" :
  time === "noon" ? "☀️ Afternoon" :
  time === "evening" ? "🌆 Evening" :
  "🌙 Night"

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Recommendations</h1>

{/* SCORE + TIME BANNER */}

<div className="card" style={{marginBottom:"25px"}}>

<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

<div>
<h3>Your Dopamine Score</h3>
<h2 style={{color: scoreColor, marginTop:"6px"}}>
  {loading ? "..." : score} pts — {loading ? "" : scoreLabel}
</h2>
</div>

<div style={{textAlign:"right"}}>
<h3>Time of Day</h3>
<h2 style={{marginTop:"6px"}}>{timeLabel}</h2>
</div>

</div>

</div>

{/* RECOMMENDATIONS GRID */}

<div className="analytics-grid">

{/* FOOD */}

<div className="card">
<h3><FaAppleAlt/> Healthy Foods</h3>
<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  {getFoodTips(score, time).map((tip, i) => (
    <li key={i}>{tip}</li>
  ))}
</ul>
</div>

{/* EXERCISE */}

<div className="card">
<h3><FaRunning/> Exercise</h3>
<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  {getExerciseTips(score, time).map((tip, i) => (
    <li key={i}>{tip}</li>
  ))}
</ul>
</div>

{/* DOPAMINE BOOST */}

<div className="card">
<h3><FaBrain/> Dopamine Boost Tips</h3>
<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  {getDopamineTips(score, time).map((tip, i) => (
    <li key={i}>{tip}</li>
  ))}
</ul>
</div>

{/* PRODUCTIVITY */}

<div className="card">
<h3><FaClock/> Productivity Tips</h3>
<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  {getProductivityTips(score, time).map((tip, i) => (
    <li key={i}>{tip}</li>
  ))}
</ul>
</div>

</div>

</div>

</div>

</div>

)

}

export default Recommendations