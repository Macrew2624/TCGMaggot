import {useEffect, useState} from 'react'
import './SetPicker.css'

function SetPicker({sets, selectedSet, onSelect, onClose}) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    const filtered = sets.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    return (<div className="set-picker-backdrop" onClick={onClose}>
        <div className="set-picker" onClick={e => e.stopPropagation()}>
            <div className="set-picker-header">
                <h2>Choose a Set</h2>
                <button className="set-picker-close" onClick={onClose}>✕</button>
            </div>
            <input
                type="text"
                className="set-picker-search"
                placeholder="Search sets…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
            />
            <div className="set-picker-grid">
                {filtered.map(set => (
                    <button
                        key={set.id}
                        className={`set-picker-btn ${set.id === selectedSet ? 'active' : ''}`}
                        onClick={() => { onSelect(set.id); onClose() }}
                    >
                        {set.name}
                    </button>
                ))}
            </div>
        </div>
    </div>)
}

export default SetPicker
