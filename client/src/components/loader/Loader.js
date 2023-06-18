import { XlviLoader } from "react-awesome-loaders";

export default function Loader() {
    return (
        <>
            <XlviLoader
                boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                desktopSize={"128px"}
                mobileSize={"100px"}
                className="box"
            />
        </>
    );
};