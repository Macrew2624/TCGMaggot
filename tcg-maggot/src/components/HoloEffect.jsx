import {useRef, useState} from "react";
import "./HoloEffect.css"

function getHoloClass(variants) {
    if (!variants) return null
    if (variants.holo) return "holo-holo"
    if (variants.reverse) return "holo-reverse"
    if (variants.wPromo) return "holo-promo"
    return null
}

function HoloEffect({variants, children}) {
    const wrapperRef = useRef(null)
    const leaveTimer = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    const holoClass = getHoloClass(variants)
    const isInteractive = true
    const hasOverlay = !holoClass

    function handleMouseMove(e) {
        const el = wrapperRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        el.style.transition = `transform 0.08s linear, box-shadow 0.2s ease`
        el.style.transform = `
        perspective(600px)
        rotateY(${(x - 0.5) * 20}deg)
        rotateX(${(y - 0.5) * -20}deg)
        translateY(-6px)
        `
        el.style.boxShadow = "0 12px 28px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)"
    }

    function handleMouseEnter() {
        clearTimeout(leaveTimer.current)
        setIsHovered(true)
    }

    function handleMouseLeave() {
        clearTimeout(leaveTimer.current)

        const el = wrapperRef.current
        if (!el) return

        el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease"
        el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)"
        el.style.boxShadow = "none"
        setIsHovered(false)
    }

    return (<div
        ref={wrapperRef}
        className="card-wrapper"
        onMouseMove={isInteractive ? handleMouseMove : undefined}
        onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        onMouseEnter={isInteractive ? handleMouseEnter : undefined}
    >
        {children}
        {hasOverlay && (<div
            className={`holo-overlay ${holoClass}`}
            style={{opacity: isHovered ? 1 : 0}}
        />)}
    </div>)
}

export default HoloEffect