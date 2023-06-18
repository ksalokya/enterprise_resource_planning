import React from "react";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const ProgressProvider = ({ valueStart, valueEnd, children }) => {
    const [value, setValue] = React.useState(valueStart);
    React.useEffect(() => {
        setValue(valueEnd);
    }, [valueEnd]);

    return children(value);
};

function TinyChart(props) {
    const [valueEnd, setValueEnd] = React.useState(props.value);

    useEffect(() => {
        setValueEnd(props.value)
    }, [props.value])

    return (
        <div className="featuredChart">
            <ProgressProvider valueStart={10} valueEnd={valueEnd}>
                {value => <CircularProgressbar
                    strokeWidth={5}
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        pathColor: props.color
                    })}
                />}
            </ProgressProvider>
        </div>
    )
}

export default TinyChart