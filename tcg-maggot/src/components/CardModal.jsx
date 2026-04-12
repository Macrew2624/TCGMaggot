import {useEffect, useState} from 'react'

function CardModal({card, selectedSet, onClose}) {
    if (!card) return null

    const [visible, setVisible] = useState(false)
    const highResSrc = `/cards/${selectedSet}/${card.set}_${card.set_number}_${card.name.replace(/'/g, "'")}_${card.rarity}.png`

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true))
    }, [])

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s ease",
            }}
        >
            <img
                src={highResSrc}
                alt={card.name}
                style={{
                    height: "80vh",
                    transfrom: visible ? "translateY(0) scale(1)" : "translateY(60px), scale(0.92)",
                    transition: "transfrom 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
                    boxShadow: visible
                        ? "0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)"
                        : "0 4px 12px rgba(0,0,0,0.1)",
                    borderRadius: "12px",
                    opacity: visible ? 1 : 0,
                }}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    )
}

export default CardModal