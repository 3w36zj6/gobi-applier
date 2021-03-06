import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

const Popup = () => {
  const [str, setStr] = useState<string>("")

  useEffect(() => {
    chrome.storage.local.get(
      {
        gobi: "にゃ",
      },
      (value) => {
        setStr(value.gobi)
      }
    )
  }, [])

  const changeGobi = () => {
    const gobi = (document.getElementById("gobi") as HTMLInputElement).value
    chrome.storage.local.set({ "gobi": gobi }, function () { })

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            gobi: gobi,
          }
        )
      }
    })
  }

  return (
    <div>
      <label>語尾</label>
      <input
        id="gobi"
        type="text"
        defaultValue={str}
        onChange={event => setStr(event.target.value)}
      />
      <button onClick={changeGobi}>語尾を変更</button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
)