import React, {useEffect, useState} from 'react';
import "./ChangeLevel.css"

const ChangeLevel = ({chooseLevel}) => {
    const [isRadioSelected, setIsRadioSelected] = useState("medium")

    useEffect(()=>{
        chooseLevel(isRadioSelected)
    },[isRadioSelected])

    const handleChecked = (value) => {
        if (isRadioSelected===value){
            return true
        }else return  false
    }
    return (
        <form className="levels">
            <label>
                <span>Easy</span>
                <input type="radio"
                value="easy"
                onChange={()=>setIsRadioSelected("easy")}
                checked={handleChecked("easy")}
                />
            </label>
            <label>
                <span>Medium</span>
                <input type="radio"
                value="medium"
                 onChange={()=>setIsRadioSelected("medium")}
                       checked={handleChecked("medium")}

                />
            </label>
            <label>
                <span>Hard</span>
                <input type="radio"
                value="hard"
                 onChange={()=>setIsRadioSelected("hard")}
                       checked={handleChecked("hard")}

                />
            </label>
            <label>
                <span>Extreme</span>
                <input type="radio"
                value="extreme"
                onChange={()=>setIsRadioSelected("extreme")}
                       checked={handleChecked("extreme")}

                />
            </label>

        </form>
    );
};

export default ChangeLevel;