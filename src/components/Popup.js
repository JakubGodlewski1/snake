import "./Popup.css"

const Popup = ({handleNewGame}) => {
    return (
        <div className="popup">
            <p>YOU LOST</p>
            <button onClick={handleNewGame}>Play again</button>
        </div>
    );
};

export default Popup;