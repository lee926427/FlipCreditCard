import { FocusEvent, useState, useEffect} from "react";
import {useSpring} from "@react-spring/web"
import {lte,gte,equals} from "ramda"
const verifyContent = (regex:RegExp,content:string) =>  regex.test(content)
const getNumber = (numbers:string,min:number|0, max:number|1) => parseInt(numbers.slice(min,max))
function verifyPublisher(numbers:string){
    if(numbers && numbers.length > 0){
        const units = getNumber(numbers,0,1);
        const tens = getNumber(numbers,0,2);
        const hundreds = getNumber(numbers,0,3);
        const isVisa = equals(units,4)
        const isMaster = gte(tens,51) && lte(tens,55);
        const isAmericanExpress = gte(hundreds,340) && lte(hundreds,379);
        const isJCB = gte(hundreds,528) && lte(hundreds,589);


    }
}

export function useCreditCard(){
    const [outline,setOutline] = useState({
        transform: `translate(0px,0px)`,
        width: 0,
        height: 0,
    })
    const outlineStyles = useSpring(outline)
    const [card,setCard] = useState({
        number:"",
        holder: "",
        expiry: "",
        cvc: ""
    });
    const [isFlip,setFlip] = useState<Boolean>(false);

    useEffect(()=>{
        const isAccess = verifyContent(/\d{4}(?!\s)/,card.number) && verifyContent(/\w{3,}/,card.holder) && verifyContent(/\d{2}\/\d{2}/,card.expiry);
        if(isAccess){
            setFlip(true);
        }
        verifyPublisher(card.number);
    },[card])
    const focusCapture = (e:FocusEvent)=>{
        const element = e.target.closest<HTMLElement>('.input-field');
        if(element){
            setOutline({
                transform: `translate(${element.offsetLeft}px,${element.offsetTop}px)`, 
                width:element.offsetWidth, 
                height:element.offsetHeight
            });
        }
    };
    const blurCapture = (e:FocusEvent) =>{
        const container = e.target.closest<HTMLElement>(".creditCard-field");
        if(container){
            setOutline({ 
                transform: `translate(${container.clientLeft}px,${container.clientTop}px)`,
                width: container.clientWidth,
                height: container.clientHeight
            });
        }
    }
    return {outlineStyles,card,setCard,focusCapture,blurCapture,isFlip,setFlip}
}