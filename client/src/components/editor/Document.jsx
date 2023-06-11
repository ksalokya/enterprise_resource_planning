import { useState, useEffect, useContext, forwardRef } from "react";
import { UserContext } from '../../App';
import {
    DocumentEditorContainerComponent,
    Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import axios from "axios";
import { debounce } from "../../utils/debounce"
import Header from '../header/Header'
import ComponentLoader from "../loader/ComponentLoader"
import useMediaQuery from '@mui/material/useMediaQuery';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './document.css'
import { metadata } from "./metadata";

DocumentEditorContainerComponent.Inject(Toolbar);

function Document() {
    let container;
    const userContext = useContext(UserContext);
    const matches = useMediaQuery('(max-width:900px)');
    const [loader, setLoader] = useState(true);
    const [displayPropertiesPane, setDisplayPropertiesPane] = useState(true);

    useEffect(() => {
        if (matches) setDisplayPropertiesPane(false);
        else setDisplayPropertiesPane(true);
    }, [matches])

    // TODO :: Handle username
    let baseUrl = process.env.REACT_APP_APPLICATION_SERVICE_URL;
    function fetchData() {
        axios.get(`${baseUrl}/editor/get/${userContext?.username}`)
            .then((res) => {
                if (res.status === 200) {
                    container.documentEditor.open(res?.data.content);
                } else {
                    container.documentEditor.open(metadata)
                }
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const saveEditorToDB = debounce(() => {
        let requestObj = { email: userContext?.username, content: container.documentEditor.serialize() };
        axios.post(`${baseUrl}/editor/update`, JSON.stringify(requestObj), {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(() => {
            openSnackBar();
        });
    }, 2000);


    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const openSnackBar = () => setState({ ...state, open: true });
    const cloeseSnackBar = () => setState({ ...state, open: false });

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const CustomSnackBar = (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={cloeseSnackBar} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={cloeseSnackBar} severity="success" sx={{ width: '100%' }}>
                    Saved Successfully...
                </Alert>
            </Snackbar>
        </div>
    )

    return (
        <div className='document'>
            <Header title='Editor' />
            <ComponentLoader style={{ display: !loader ? 'none' : '' }} />
            <DocumentEditorContainerComponent
                style={{ visibility: loader ? 'hidden' : '' }}
                height={'82%'}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                enableToolbar={true}
                showPropertiesPane={displayPropertiesPane}
                enableAutoFocus={false}
                ref={(scope) => { container = scope; }}
                created={fetchData.bind(this)}
                contentChange={saveEditorToDB}
            />
            {CustomSnackBar}
        </div>
    )
}

export default Document