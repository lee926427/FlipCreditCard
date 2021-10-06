import { Dispatch, SetStateAction} from "react";
import CreditCard,{CardStateProps} from "./components/CreaditCard"
import FrontfaceBg from "./assets/images/phposr0d7.jpg";
function CardFrontFace(card:CardStateProps,setCard:Dispatch<SetStateAction<CardStateProps>>){
  return (
    <div className="relative">
      <img src={FrontfaceBg} className="absolute transform scale-110"/>
      <div className="grid grid-cols-2 h-full p-4 absolute">
        <div>Visa</div>
        <label className="col-span-2 text-base py-6">
          <div className="input-field px-4 py-2 mb-4 bg-gray-700 bg-opacity-80 rounded-lg">
            <input className="bg-transparent outline-none text-xl font-bold " type="tel" name="number" placeholder="Card Number" value={card.number.replace(/(\d{4}(?!\s))/g, "$1 ").trim()} onChange={e=>setCard({...card,number:e.target.value})} required/>
          </div>
        </label>
        <label>
          <div className="input-field text-base px-2 py-1 bg-gray-700 bg-opacity-80 rounded-lg">
            <span className="text-xs block">Holder Name</span>
            <input className="bg-transparent outline-none" type="text" name="holder" placeholder="Holder" value={card.holder} onChange={e=>setCard({...card,holder:e.target.value})} required/>
          </div>
        </label>
        <label className="flex">
          <div className="input-field text-base ml-auto px-2 py-1 bg-gray-700 bg-opacity-80 rounded-lg">
            <span className="text-xs block">Expiry</span>
            <input className="bg-transparent outline-none w-20" type="text" name="expiry" placeholder="MM/YY" value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} required/>
          </div>
        </label>
      </div>
    </div>
  )
}

function CardBackFace(card:CardStateProps,setCard:Dispatch<SetStateAction<CardStateProps>>){
  return (
    <div className="flex flex-col h-full p-4 bg-indigo-200">
      <label>
        <div className="input-field px-2 py-1 w-20">
          <input className="bg-transparent outline-none" type="text" name="expiry" placeholder="CVC" value={card.cvc} onChange={e=>setCard({...card,cvc:e.target.value})} required/>
        </div>
      </label>
    </div>
  )
}

function App() {
  return (
    <div className="App w-screen h-screen flex justify-center items-center">
      <CreditCard className="border rounded-lg text-white " frontFace={CardFrontFace} backFace={CardBackFace}/>
    </div>
  )
}

export default App
