import {useEffect, useRef} from "react"

export default function useEvent(event, handler, passive = false) {
   const unsub = useRef()
    useEffect(() => {
        // initiate the event handler
        window.addEventListener(event, handler, passive)

        // this will clean up the event every time the component is re-rendered
        unsub.current = ()=> {
            window.removeEventListener(event, handler)
        }
        return ()=>unsub.current()
    })

 return {unsub: unsub.current}
}