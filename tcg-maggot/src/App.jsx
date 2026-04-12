import {useState, useEffect} from 'react'
import CardGrid from "./components/CardGrid.jsx";
import CardModal from "./components/CardModal.jsx";
import SetPicker from "./components/SetPicker.jsx";
import base1Cards from './data/sets/base1.json'
import base2Cards from './data/sets/base2.json'
import base3Cards from './data/sets/base3.json'
import base4Cards from './data/sets/base4.json'
import base5Cards from './data/sets/base5.json'
import gym1Cards from './data/sets/gym1.json'

const SETS = [{id: "base1", name: "Base Set"}, {id: "base2", name: "Jungle"}, {
    id: "base3", name: "Fossil"
}, {id: "base4", name: "Base Set 2"}, {id: "base5", name: "Team Rocket"}, {id: "gym1", name: "Gym Heroes"}, {
    id: "gym2", name: "Gym Challenge"
},

    {id: "neo1", name: "Neo Genesis"}, {id: "neo2", name: "Neo Discovery"}, {
        id: "neo3", name: "Neo Revelation"
    }, {id: "neo4", name: "Neo Destiny"},

    {id: "lc", name: "Legendary Collection"},

    {id: "ecard1", name: "Expedition Base Set"}, {id: "ecard2", name: "Aquapolis"}, {id: "ecard3", name: "Skyridge"},

    {id: "ex1", name: "EX Ruby & Sapphire"}, {id: "ex2", name: "EX Sandstorm"}, {
        id: "ex3", name: "EX Dragon"
    }, {id: "ex4", name: "EX Team Magma vs Team Aqua"}, {id: "ex5", name: "EX Hidden Legends"}, {
        id: "ex6", name: "EX FireRed & LeafGreen"
    }, {id: "ex7", name: "EX Team Rocket Returns"}, {id: "ex8", name: "EX Deoxys"}, {
        id: "ex9", name: "EX Emerald"
    }, {id: "ex10", name: "EX Unseen Forces"}, {id: "ex11", name: "EX Delta Species"}, {
        id: "ex12", name: "EX Legend Maker"
    }, {id: "ex13", name: "EX Holon Phantoms"}, {id: "ex14", name: "EX Crystal Guardians"}, {
        id: "ex15", name: "EX Dragon Frontiers"
    }, {id: "ex16", name: "EX Power Keepers"},

    {id: "dp1", name: "Diamond & Pearl"}, {id: "dp2", name: "Mysterious Treasures"}, {
        id: "dp3", name: "Secret Wonders"
    }, {id: "dp4", name: "Great Encounters"}, {id: "dp5", name: "Majestic Dawn"}, {
        id: "dp6", name: "Legends Awakened"
    }, {id: "dp7", name: "Stormfront"},

    {id: "pl1", name: "Platinum"}, {id: "pl2", name: "Rising Rivals"}, {id: "pl3", name: "Supreme Victors"}, {
        id: "pl4", name: "Arceus"
    },

    {id: "hgss1", name: "HeartGold & SoulSilver"}, {id: "hgss2", name: "Unleashed"}, {
        id: "hgss3", name: "Undaunted"
    }, {id: "hgss4", name: "Triumphant"},

    {id: "col1", name: "Call of Legends"},

    {id: "bw1", name: "Black & White"}, {id: "bw2", name: "Emerging Powers"}, {
        id: "bw3", name: "Noble Victories"
    }, {id: "bw4", name: "Next Destinies"}, {id: "bw5", name: "Dark Explorers"}, {
        id: "bw6", name: "Dragons Exalted"
    }, {id: "dv1", name: "Dragon Vault"}, {id: "bw7", name: "Boundaries Crossed"}, {
        id: "bw8", name: "Plasma Storm"
    }, {id: "bw9", name: "Plasma Freeze"}, {id: "bw10", name: "Plasma Blast"}, {
        id: "bw11", name: "Legendary Treasures"
    },

    {id: "xy0", name: "Kalos Starter Set"}, {id: "xy1", name: "XY"}, {id: "xy2", name: "Flashfire"}, {
        id: "xy3", name: "Furious Fists"
    }, {id: "xy4", name: "Phantom Forces"}, {id: "xy5", name: "Primal Clash"}, {
        id: "dc1", name: "Double Crisis"
    }, {id: "xy6", name: "Roaring Skies"}, {id: "xy7", name: "Ancient Origins"}, {
        id: "xy8", name: "BREAKthrough"
    }, {id: "xy9", name: "BREAKpoint"}, {id: "g1", name: "Generations"}, {
        id: "xy10", name: "Fates Collide"
    }, {id: "xy11", name: "Steam Siege"}, {id: "xy12", name: "Evolutions"}, {id: "sm1", name: "Sun & Moon"}, {
        id: "sm2", name: "Guardians Rising"
    }, {id: "sm3", name: "Burning Shadows"}, {id: "sm35", name: "Shining Legends"}, {
        id: "sm4", name: "Crimson Invasion"
    }, {id: "sm5", name: "Ultra Prism"}, {id: "sm6", name: "Forbidden Light"}, {
        id: "sm7", name: "Celestial Storm"
    }, {id: "sm8", name: "Lost Thunder"}, {id: "sm9", name: "Team Up"}, {
        id: "det1", name: "Detective Pikachu"
    }, {id: "sm10", name: "Unbroken Bonds"}, {id: "sm11", name: "Unified Minds"}, {
        id: "sm115", name: "Hidden Fates"
    }, {id: "sm12", name: "Cosmic Eclipse"},]

const SETS_DATA = {
    base1: base1Cards,
    base2: base2Cards,
    base3: base3Cards,
    base4: base4Cards,
    base5: base5Cards,
    gym1: gym1Cards,
}

const cache = {}

function App() {
    const [selectedSet, setSelectedSet] = useState("base1")
    const [showPicker, setShowPicker] = useState(false)
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCard, setSelectedCard] = useState(null)

    useEffect(() => {
        if (cache[selectedSet]) {
            setCards(cache[selectedSet])
            setLoading(false)
            return
        }

        setLoading(true)
        setCards([])

        const cardsData = SETS_DATA[selectedSet] || []
        cache[selectedSet] = cardsData
        setCards(cardsData)
        setLoading(false)
    }, [selectedSet])

    return (<div>
        <h1>Pokemon TCG Gallery</h1>
        <button className="open-picker-btn" onClick={() => setShowPicker(true)}>
            {SETS.find(s => s.id === selectedSet)?.name || 'Choose Set'} ▾
        </button>

        {showPicker && (<SetPicker
            sets={SETS}
            selectedSet={selectedSet}
            onSelect={setSelectedSet}
            onClose={() => setShowPicker(false)}
        />)}

        {loading && <p>Loading cards...</p>}

        <CardGrid
            cards={cards}
            selectedSet={selectedSet}
            onCardClick={setSelectedCard}
        />
        <CardModal card={selectedCard} selectedSet={selectedSet} onClose={() => setSelectedCard(null)}/>
    </div>)
}

export default App