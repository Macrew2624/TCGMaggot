import {useMemo, useState} from 'react'
import HoloEffect from './HoloEffect'

function CardItem({card, selectedSet, onClick}) {
    const [useRemote, setUseRemote] = useState(false)

    const localSrc = useMemo(() => `/cards/${selectedSet}/${card.set}_${card.set_number}_${card.name.replace(/'/g, "'")}_${card.rarity}.png`, [selectedSet, card])

    const variants = useMemo(() => ({
        holoRare: card.rarity.includes('holorare')
    }), [card.rarity])

    return (<HoloEffect variants={variants}>
        <img
            src={localSrc}
            alt={card.name}
            loading="lazy"
            style={{width: '100%', cursor: 'pointer'}}
            onClick={() => onClick(card)}
            onError={() => {
                if (!useRemote) {
                    setUseRemote(true)
                }
            }}
        />
    </HoloEffect>)
}

export default CardItem