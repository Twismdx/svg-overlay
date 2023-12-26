import { useEffect, useState } from "react"
import { experimental_useEffectEvent as useEffectEvent } from "react"
import "./home.css"
import { RadioCard } from "./components/RadioCard"
import { Multi } from "./components/Multi"
import { Overlay } from "./components/Overlay"
import { useGlobalContext } from "./components/Context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { Helmet } from "react-helmet"
import { SvgTeam } from './components/SvgTeam'

function App() {
  const {
    compId,
    setCompId,
    isLoading,
    setIsLoading,
    matchId,
    copy,
    setCopy,
    setPostDone,
    postDone,
    setMatchId,
    url,
    setUrl,
    selected,
    link,
    setLink,
  } = useGlobalContext()

  const [stats, setStats] = useState([])

  const handleMatchIdChange = (e) => {
    // console.log(e.target.value);
    setMatchId(e.target.value)
  }
  const handleCompIdChange = (e) => {
    // console.log(e.target.value);
    setCompId(e.target.value)
  }

  // function Post() {
  //   axios
  //     .post("https://twism.vercel.app/ids", null, {
  //       params: {
  //         matchId,
  //       },
  //     })
  //     .then(function (response) {
  //       setCopy(response.data)
  //       setLink(response.data)
  //       var res = Object.keys(response.data).map(function (key) {
  //         return response.data[key]
  //       })
  //       setStats(res)
  //     })
  //     .catch((err) => console.warn(err))
  // }

  // const appPost = () => {
  //   const interval = setInterval(() => {
  //     axios
  //       .post("https://twism.vercel.app/ids", null, {
  //         params: {
  //           matchId,
  //         },
  //       })
  //       .then(function (response) {
  //         setCopy(response.data)
  //         setLink(response.data)
  //         var res = Object.keys(response.data).map(function (key) {
  //           return response.data[key]
  //         })
  //         setStats(res)
  //       })
  //       .catch((err) => console.warn(err))
  //   }, 10000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }

  // appPost()

  useEffect(() => {
    appPost()
  }, [isLoading, matchId])

  function getStats() {
    axios.get("https://twism.vercel.app/overlay", null)
      .then(function (response) {
        setMatchId(response.data[0].matchId)
      })
  }

  getStats()

  const appPost = () => {
    const interval = setInterval(() => {
      axios
        .post("https://twism.vercel.app/ids", null, {
          params: {
            matchId,
          },
        })
        .then(function (response) {
          setCopy(response.data)
          setLink(response.data)
          var res = Object.keys(response.data).map(function (key) {
            return response.data[key]
          })
          setStats(res)
        })
        .catch((err) => console.warn(err))
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }

  appPost()


  // if (stats[0]) {
  return (
    <>
      <Helmet>
        <style>
          {
            "body { background-image: none; background-color: transparent !important; }"
          }
        </style>
      </Helmet>
      <div className="container-3">
        <SvgTeam stats={stats} />
      </div>
    </>
  )
  // }
  // else if (stats[1] && selected === "Multi")
  //   return (
  //     <>
  //       <Helmet>
  //         <style>
  //           {
  //             "body { background-image: none; background-color: transparent !important; }"
  //           }
  //         </style>
  //       </Helmet>
  //       <div className="main-container">
  //         <div className="container-1">
  //           <Multi />
  //         </div>
  //         <div className="container-2">
  //           <Overlay />
  //         </div>
  //       </div>
  //     </>
  //   );
}

export default App
