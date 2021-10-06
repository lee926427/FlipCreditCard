import {ReactNode, Dispatch, SetStateAction, HTMLAttributes} from "react";
import clsx from "clsx"
import {useCreditCard} from "./hooks"
import {animated} from "@react-spring/web"
export type CardStateProps = {
    number: string;
    holder: string;
    expiry: string;
    cvc: string;
}

export interface CreditCardProps extends HTMLAttributes<HTMLFormElement>{
    frontFace:(card:CardStateProps,setCard:Dispatch<SetStateAction<CardStateProps>>)=>ReactNode,
    backFace:(card:CardStateProps,setCard:Dispatch<SetStateAction<CardStateProps>>)=>ReactNode,
}

function CreditCard({className,frontFace,backFace}:CreditCardProps){
    const {outlineStyles,card,setCard,isFlip,setFlip,focusCapture,blurCapture} = useCreditCard();
    return(
        <div 
            className={clsx(
            "creditCard-field",
            " w-96 h-56 relative",
            "font-bold text-lg",
            "transition duration-300 delay-100 transform-preserve",
            {"rotate-y-180":isFlip}
            )}
        >
            <animated.div 
                style={{...outlineStyles,pointerEvents:'none'}} 
                className={clsx(
                    className,
                    "outline border border-yellow-500 border-solid absolute z-10"
                )}/>
            <form onFocusCapture={focusCapture} onBlurCapture={blurCapture}>
                <fieldset className={clsx(
                    className,
                    "frontSide w-full h-full",
                    "absolute backface-hidden overflow-hidden"
                )}>
                    {frontFace(card,setCard)}
                </fieldset>
                <fieldset className={clsx(
                    className,
                    "backSide w-full h-full",
                    "w-full absolute overflow-hidden",
                    "translate-x-1 rotate-y-180",
                    {"backface-hidden":!isFlip}
                )}>
                    {backFace(card,setCard)}
                </fieldset>
            </form>
        </div>
    )
}

export default CreditCard;